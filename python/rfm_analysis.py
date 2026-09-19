"""
E-Commerce Sales & Customer Analytics
Module: rfm_analysis.py
Description: Customer Segmentation via Recency, Frequency, and Monetary (RFM) modeling.
             Calculates quintiles (1-5) and segments customers into actionable marketing cohorts:
             - Champions (R: 4-5, F: 4-5, M: 4-5)
             - Loyal Customers (R: 3-5, F: 3-5, M: 3-5)
             - Potential Loyalists (R: 4-5, F: 1-3, M: 1-3)
             - New Customers (R: 4-5, F: 1, M: 1-2)
             - At Risk (R: 1-2, F: 3-5, M: 3-5)
             - Cannot Lose Them (R: 1, F: 4-5, M: 4-5)
             - Hibernating (R: 1-2, F: 1-2, M: 1-2)
"""

import os
import datetime
import pandas as pd
import numpy as np

CLEAN_DIR = os.path.join(os.path.dirname(__file__), "..", "data", "cleaned")

def run_rfm_analysis(snapshot_date=None):
    orders_path = os.path.join(CLEAN_DIR, "cleaned_orders.csv")
    items_path = os.path.join(CLEAN_DIR, "cleaned_order_items.csv")
    customers_path = os.path.join(CLEAN_DIR, "cleaned_customers.csv")

    if not all(os.path.exists(p) for p in [orders_path, items_path, customers_path]):
        print("Required clean data files missing. Please run data_cleaning.py first.")
        return

    orders_df = pd.read_csv(orders_path)
    items_df = pd.read_csv(items_path)
    customers_df = pd.read_csv(customers_path)

    # Exclude cancelled orders
    valid_orders = orders_df[orders_df["order_status"] != "Cancelled"]
    merged = valid_orders.merge(items_df, on="order_id")
    merged["order_date"] = pd.to_datetime(merged["order_date"])

    if snapshot_date is None:
        snapshot_date = merged["order_date"].max() + datetime.timedelta(days=1)
    else:
        snapshot_date = pd.to_datetime(snapshot_date)

    print(f"Executing RFM Analysis with Snapshot Date: {snapshot_date.date()}")

    # Group by customer
    rfm_table = merged.groupby("customer_id").agg({
        "order_date": lambda dates: (snapshot_date - dates.max()).days,
        "order_id": "nunique",
        "total_amount": "sum"
    }).reset_index()

    rfm_table.columns = ["customer_id", "recency", "frequency", "monetary"]
    rfm_table["monetary"] = rfm_table["monetary"].round(2)

    # Quantile ranking (1 to 5)
    # Note: Lower recency days = higher score (5 is best)
    rfm_table["r_score"] = pd.qcut(rfm_table["recency"], q=5, labels=[5, 4, 3, 2, 1]).astype(int)
    
    # Frequency: rank based on rank method for discrete distributions
    rfm_table["f_score"] = pd.qcut(rfm_table["frequency"].rank(method="first"), q=5, labels=[1, 2, 3, 4, 5]).astype(int)
    rfm_table["m_score"] = pd.qcut(rfm_table["monetary"], q=5, labels=[1, 2, 3, 4, 5]).astype(int)

    rfm_table["rfm_score"] = (
        rfm_table["r_score"].astype(str) +
        rfm_table["f_score"].astype(str) +
        rfm_table["m_score"].astype(str)
    )

    # Business Segment Classification Logic
    def assign_segment(row):
        r, f, m = row["r_score"], row["f_score"], row["m_score"]
        
        if r >= 4 and f >= 4 and m >= 4:
            return "Champions"
        elif r >= 3 and f >= 3 and m >= 3:
            return "Loyal Customers"
        elif r >= 4 and f <= 3:
            if f == 1:
                return "New Customers"
            return "Potential Loyalists"
        elif r <= 2 and f >= 4 and m >= 4:
            return "Cannot Lose Them"
        elif r <= 2 and f >= 3:
            return "At Risk"
        else:
            return "Hibernating"

    rfm_table["customer_segment"] = rfm_table.apply(assign_segment, axis=1)

    # Summary table
    segment_summary = rfm_table.groupby("customer_segment").agg(
        customer_count=("customer_id", "count"),
        avg_recency=("recency", "mean"),
        avg_frequency=("frequency", "mean"),
        avg_monetary=("monetary", "mean"),
        total_revenue=("monetary", "sum")
    ).reset_index()

    segment_summary["pct_customers"] = (
        (segment_summary["customer_count"] / len(rfm_table)) * 100
    ).round(1)
    segment_summary["pct_revenue"] = (
        (segment_summary["total_revenue"] / rfm_table["monetary"].sum()) * 100
    ).round(1)

    # Merge segment into customer table
    customers_df = customers_df.drop(columns=["customer_segment"], errors="ignore")
    customers_enriched = customers_df.merge(
        rfm_table[["customer_id", "recency", "frequency", "monetary", "rfm_score", "customer_segment"]],
        on="customer_id",
        how="left"
    )
    customers_enriched["customer_segment"] = customers_enriched["customer_segment"].fillna("Hibernating")

    out_rfm = os.path.join(CLEAN_DIR, "customer_rfm_segments.csv")
    rfm_table.to_csv(out_rfm, index=False)
    customers_enriched.to_csv(os.path.join(CLEAN_DIR, "cleaned_customers.csv"), index=False)

    print("\n=== RFM Customer Segmentation Summary ===")
    print(segment_summary.to_string(index=False))
    print(f"\nSaved RFM results to: {out_rfm}")
    return rfm_table, segment_summary

if __name__ == "__main__":
    run_rfm_analysis()
