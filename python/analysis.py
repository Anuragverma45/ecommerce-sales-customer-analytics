"""
E-Commerce Sales & Customer Analytics
Module: analysis.py
Description: Computes comprehensive business KPIs across Sales, Customers, Products,
             and Logistics / Operations. Generates summary metric tables.
"""

import os
import pandas as pd
import numpy as np

CLEAN_DIR = os.path.join(os.path.dirname(__file__), "..", "data", "cleaned")

def calculate_kpis():
    orders_df = pd.read_csv(os.path.join(CLEAN_DIR, "cleaned_orders.csv"))
    items_df = pd.read_csv(os.path.join(CLEAN_DIR, "cleaned_order_items.csv"))
    customers_df = pd.read_csv(os.path.join(CLEAN_DIR, "cleaned_customers.csv"))
    products_df = pd.read_csv(os.path.join(CLEAN_DIR, "cleaned_products.csv"))

    # Merged transactions
    tx = orders_df.merge(items_df, on="order_id")
    valid_tx = tx[tx["order_status"] != "Cancelled"]

    print("================================================================")
    print("      E-COMMERCE SALES & CUSTOMER ANALYTICS — EXECUTIVE KPIS     ")
    print("================================================================")

    # 1. SALES KPIS
    total_revenue = valid_tx["total_amount"].sum()
    total_profit = valid_tx["profit"].sum()
    total_orders = orders_df[orders_df["order_status"] != "Cancelled"]["order_id"].nunique()
    total_customers = customers_df["customer_id"].nunique()
    total_products = products_df["product_id"].nunique()
    profit_margin = (total_profit / total_revenue) * 100 if total_revenue else 0
    aov = total_revenue / total_orders if total_orders else 0
    avg_items_per_order = items_df.groupby("order_id")["quantity"].sum().mean()
    avg_selling_price = items_df["unit_price"].mean()

    print("\n--- 1. SALES KPIS ---")
    print(f"Total Revenue:               ${total_revenue:,.2f}")
    print(f"Total Net Profit:            ${total_profit:,.2f}")
    print(f"Profit Margin:               {profit_margin:.2f}%")
    print(f"Total Valid Orders:          {total_orders:,}")
    print(f"Total Customers:             {total_customers:,}")
    print(f"Total Active SKUs:           {total_products:,}")
    print(f"Average Order Value (AOV):   ${aov:.2f}")
    print(f"Avg Items per Order:         {avg_items_per_order:.2f}")
    print(f"Average Unit Selling Price:  ${avg_selling_price:.2f}")

    # 2. CUSTOMER KPIS
    cust_orders = valid_tx.groupby("customer_id")["order_id"].nunique()
    repeat_customers = (cust_orders > 1).sum()
    repeat_rate = (repeat_customers / len(cust_orders)) * 100
    avg_customer_spend = valid_tx.groupby("customer_id")["total_amount"].sum().mean()

    print("\n--- 2. CUSTOMER KPIS ---")
    print(f"Total Purchasing Customers:  {len(cust_orders):,}")
    print(f"Repeat Customers (>1 order): {repeat_customers:,}")
    print(f"Repeat Purchase Rate:        {repeat_rate:.2f}%")
    print(f"Average Customer Spend:      ${avg_customer_spend:.2f}")

    # 3. OPERATIONAL KPIS
    total_all_orders = len(orders_df)
    delivered_orders = (orders_df["order_status"] == "Delivered").sum()
    cancelled_orders = (orders_df["order_status"] == "Cancelled").sum()
    returned_orders = (orders_df["order_status"] == "Returned").sum()
    cancellation_rate = (cancelled_orders / total_all_orders) * 100
    return_rate = (returned_orders / total_all_orders) * 100

    # Calculate delivery duration in days
    delivered_df = orders_df[(orders_df["order_status"] == "Delivered") & orders_df["delivery_date"].notna()].copy()
    delivered_df["order_dt"] = pd.to_datetime(delivered_df["order_date"])
    delivered_df["deliv_dt"] = pd.to_datetime(delivered_df["delivery_date"])
    delivered_df["fulfillment_days"] = (delivered_df["deliv_dt"] - delivered_df["order_dt"]).dt.total_seconds() / 86400.0
    avg_delivery_time = delivered_df["fulfillment_days"].mean()

    print("\n--- 3. OPERATIONAL & LOGISTICS KPIS ---")
    print(f"Total Orders Placed:         {total_all_orders:,}")
    print(f"Delivered Orders:            {delivered_orders:,} ({(delivered_orders/total_all_orders)*100:.1f}%)")
    print(f"Cancelled Orders:            {cancelled_orders:,} (Cancellation Rate: {cancellation_rate:.2f}%)")
    print(f"Returned Orders:             {returned_orders:,} (Return Rate: {return_rate:.2f}%)")
    print(f"Average Delivery Time:       {avg_delivery_time:.2f} days")

    # 4. TOP PRODUCTS & CATEGORIES
    print("\n--- 4. TOP CATEGORIES BY REVENUE ---")
    cat_summary = valid_tx.groupby("category_name").agg(
        revenue=("total_amount", "sum"),
        profit=("profit", "sum"),
        units_sold=("quantity", "sum")
    ).reset_index()
    cat_summary["margin_pct"] = (cat_summary["profit"] / cat_summary["revenue"]) * 100
    cat_summary = cat_summary.sort_values(by="revenue", ascending=False)
    print(cat_summary.to_string(index=False))

    print("\n================================================================")

if __name__ == "__main__":
    calculate_kpis()
