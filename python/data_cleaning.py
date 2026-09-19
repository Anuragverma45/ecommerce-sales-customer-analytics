"""
E-Commerce Sales & Customer Analytics
Module: data_cleaning.py
Description: Production data cleaning & validation pipeline.
             1. Ingests raw data from data/raw/ without mutating raw sources.
             2. Handles missing values, deduplication, type casting, date normalization.
             3. Enforces domain constraints (e.g. positive quantity, valid delivery >= order date).
             4. Generates data audit metrics and outputs to data/cleaned/.
"""

import os
import pandas as pd
import numpy as np

BASE_DIR = os.path.join(os.path.dirname(__file__), "..")
RAW_DIR = os.path.join(BASE_DIR, "data", "raw")
CLEAN_DIR = os.path.join(BASE_DIR, "data", "cleaned")
os.makedirs(CLEAN_DIR, exist_ok=True)

class DataCleaningPipeline:
    def __init__(self):
        self.audit_log = []

    def log(self, step, details):
        entry = f"[{step}] {details}"
        self.audit_log.append(entry)
        print(entry)

    def clean_customers(self):
        self.log("CUSTOMERS", "Starting Customer data cleaning...")
        raw_path = os.path.join(RAW_DIR, "raw_customers.csv")
        if not os.path.exists(raw_path):
            self.log("ERROR", f"File not found: {raw_path}")
            return None
            
        df = pd.read_csv(raw_path)
        initial_len = len(df)
        
        # 1. Deduplicate by customer_id
        df = df.drop_duplicates(subset=["customer_id"], keep="first")
        self.log("CUSTOMERS", f"Dropped {initial_len - len(df)} duplicate customer records.")

        # 2. Impute missing emails with synthetic standard
        missing_emails = df["email"].isna().sum()
        if missing_emails > 0:
            df["email"] = df.apply(
                lambda r: f"{str(r['first_name']).lower()}.{str(r['last_name']).lower()}{str(r['customer_id'])[-4:]}@example.com"
                if pd.isna(r["email"]) else r["email"],
                axis=1
            )
            self.log("CUSTOMERS", f"Imputed {missing_emails} missing email addresses.")

        # 3. Clean string white-spaces and normalize casing
        for col in ["first_name", "last_name", "city", "state", "gender"]:
            if col in df.columns:
                df[col] = df[col].astype(str).str.strip().str.title()

        # 4. Enforce proper types
        df["age"] = pd.to_numeric(df["age"], errors="coerce").fillna(35).astype(int)
        df["signup_date"] = pd.to_datetime(df["signup_date"], errors="coerce").dt.date

        out_path = os.path.join(CLEAN_DIR, "cleaned_customers.csv")
        df.to_csv(out_path, index=False)
        self.log("CUSTOMERS", f"Saved {len(df)} validated customer records to {out_path}")
        return df

    def clean_products(self):
        self.log("PRODUCTS", "Starting Products data cleaning...")
        raw_path = os.path.join(RAW_DIR, "raw_products.csv")
        if not os.path.exists(raw_path):
            self.log("ERROR", f"File not found: {raw_path}")
            return None

        df = pd.read_csv(raw_path)
        initial_len = len(df)
        df = df.drop_duplicates(subset=["product_id"], keep="first")
        self.log("PRODUCTS", f"Dropped {initial_len - len(df)} duplicate product entries.")

        # Ensure cost <= selling_price
        invalid_cost = (df["cost_price"] > df["selling_price"]).sum()
        if invalid_cost > 0:
            df.loc[df["cost_price"] > df["selling_price"], "cost_price"] = df["selling_price"] * 0.70
            self.log("PRODUCTS", f"Corrected {invalid_cost} records where cost exceeded selling price.")

        # Ensure non-negative stock
        df["stock_quantity"] = df["stock_quantity"].clip(lower=0)

        out_path = os.path.join(CLEAN_DIR, "cleaned_products.csv")
        df.to_csv(out_path, index=False)
        self.log("PRODUCTS", f"Saved {len(df)} products to {out_path}")
        return df

    def clean_orders_and_items(self, valid_customer_ids, valid_product_ids):
        self.log("ORDERS", "Starting Orders & Order Items data cleaning...")
        orders_path = os.path.join(RAW_DIR, "raw_orders.csv")
        items_path = os.path.join(RAW_DIR, "raw_order_items.csv")

        orders_df = pd.read_csv(orders_path)
        items_df = pd.read_csv(items_path)

        # 1. Deduplicate orders
        init_orders = len(orders_df)
        orders_df = orders_df.drop_duplicates(subset=["order_id"], keep="first")
        self.log("ORDERS", f"Removed {init_orders - len(orders_df)} duplicate order headers.")

        # 2. Filter referential integrity: Keep orders with valid customers
        orders_df = orders_df[orders_df["customer_id"].isin(valid_customer_ids)]

        # 3. Clean and parse datetime
        orders_df["order_date"] = pd.to_datetime(orders_df["order_date"], errors="coerce")
        orders_df["delivery_date"] = pd.to_datetime(orders_df["delivery_date"], errors="coerce")

        # Invalidate delivery dates prior to order date
        bad_delivery_mask = (orders_df["delivery_date"] < orders_df["order_date"]) & orders_df["delivery_date"].notna()
        if bad_delivery_mask.sum() > 0:
            orders_df.loc[bad_delivery_mask, "delivery_date"] = orders_df.loc[bad_delivery_mask, "order_date"] + pd.Timedelta(days=3)
            self.log("ORDERS", f"Fixed {bad_delivery_mask.sum()} anomalous delivery dates earlier than order placement.")

        # 4. Clean Order Items
        init_items = len(items_df)
        items_df = items_df.drop_duplicates(subset=["order_item_id"], keep="first")

        # Fix/drop negative quantities
        negative_qty = (items_df["quantity"] <= 0).sum()
        if negative_qty > 0:
            items_df["quantity"] = items_df["quantity"].apply(lambda q: abs(q) if q != 0 else 1)
            self.log("ORDER_ITEMS", f"Corrected {negative_qty} negative or zero quantity item entries to positive values.")

        # Keep only items belonging to valid orders and valid products
        valid_orders = set(orders_df["order_id"])
        items_df = items_df[items_df["order_id"].isin(valid_orders)]
        items_df = items_df[items_df["product_id"].isin(valid_product_ids)]

        # Recalculate total_amount and profit for 100% mathematical consistency
        items_df["discount_pct"] = items_df["discount_pct"].clip(lower=0.0, upper=50.0)
        items_df["total_amount"] = (
            items_df["quantity"] * items_df["unit_price"] * (1.0 - (items_df["discount_pct"] / 100.0))
        ).round(2)

        # Save cleaned
        clean_orders_path = os.path.join(CLEAN_DIR, "cleaned_orders.csv")
        clean_items_path = os.path.join(CLEAN_DIR, "cleaned_order_items.csv")

        orders_df.to_csv(clean_orders_path, index=False)
        items_df.to_csv(clean_items_path, index=False)

        self.log("ORDERS", f"Saved {len(orders_df)} cleaned orders to {clean_orders_path}")
        self.log("ORDER_ITEMS", f"Saved {len(items_df)} cleaned order items to {clean_items_path}")

    def run_all(self):
        print("=== Initiating Data Cleaning Pipeline ===")
        cust_df = self.clean_customers()
        prod_df = self.clean_products()
        if cust_df is not None and prod_df is not None:
            self.clean_orders_and_items(
                set(cust_df["customer_id"]),
                set(prod_df["product_id"])
            )
        print("=== Data Cleaning Completed. Audit Log Summary: ===")
        for log in self.audit_log:
            print(f"  • {log}")

if __name__ == "__main__":
    pipeline = DataCleaningPipeline()
    pipeline.run_all()
