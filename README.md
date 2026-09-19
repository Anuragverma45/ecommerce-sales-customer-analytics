# 🛒 E-Commerce Sales & Customer Analytics
> **End-to-End Data Analytics Portfolio Project using Python, SQL, Excel and Power BI**

![Python](https://img.shields.io/badge/Python-3.10%2B-blue?logo=python)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14%2B-336791?logo=postgresql)
![Power_BI](https://img.shields.io/badge/Power_BI-Desktop-F2C811?logo=powerbi)
![Pandas](https://img.shields.io/badge/Pandas-Data_Analysis-150458?logo=pandas)
![SQL](https://img.shields.io/badge/SQL-Advanced_Window_Functions-orange)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📌 Executive Summary
An enterprise-grade, end-to-end data analytics system simulating an omni-channel e-commerce retailer. This project models and answers complex commercial questions spanning **$7.5M+ in gross revenue**, **50,000+ orders**, **10,000+ customers**, and **500+ products**.

### Analytics Lifecycle
```
[Raw Data Ingestion] 
       │
       ▼
[Python Cleaning & Validation Pipeline] ──► [Clean CSVs & Audit Log]
       │
       ▼
[Normalized PostgreSQL Database] ────────► [25+ Business SQL Queries with CTEs/Window Functions]
       │
       ▼
[RFM Customer Segmentation Model] ──────► [Champions, Loyalists, At Risk Cohorts]
       │
       ▼
[Interactive Power BI Multi-Page BI] ───► [Executive, Sales, Customer, Product, Operations]
       │
       ▼
[Data-Backed Business Insights & Strategic Recommendations]
```

---

## 🎯 Business Objectives & Core Questions Answered
- **Revenue & Margins:** What are the drivers of top-line revenue vs. bottom-line profit margins?
- **Customer Lifecycle:** Who are the repeat purchasers, what is our retention velocity, and who is at risk of churn?
- **Catalog Optimization:** Which products generate high volume but dilute operating margins?
- **Fulfillment SLAs:** How does shipping method and delivery transit time impact return and cancellation rates?

---

## 🛠️ Technology Stack
- **Data Engineering & Processing:** Python 3.10+, Pandas, NumPy, OpenPyXL
- **Relational Database:** PostgreSQL 14+ (Normalized 3NF schema, Indexes, Foreign Keys, CHECK constraints)
- **Advanced SQL:** Common Table Expressions (CTEs), Window Functions (`RANK`, `DENSE_RANK`, `LAG`, `LEAD`, `PARTITION BY`), Aggregations
- **Statistical Modeling:** RFM (Recency, Frequency, Monetary) quintile scoring
- **Business Intelligence & Data Modeling:** Power BI (Star Schema, VertiPaq engine, 15+ custom DAX measures)
- **Interactive Portfolio Application:** React, TypeScript, Tailwind CSS, Recharts

---

## 📊 Power BI Star Schema Data Model

```text
               ┌────────────────┐
               │  DimCustomer   │
               │ (CustomerID PK)│
               └───────┬────────┘
                       │ 1
                       │
                       │ *
┌──────────────┐       │       ┌──────────────┐
│  DimProduct  │───────┼───────│   DimDate    │
│(ProductID PK)│ 1   * │ *   1 │  (Date PK)   │
└──────────────┘       │       └──────────────┘
                       │
               ┌───────┴────────┐
               │   FactOrders   │
               │ (OrderID PK/FK)│
               └───────┬────────┘
                       │ 1
                       │
                       │ *
               ┌───────┴────────┐
               │ FactOrderItems │
               │ (OrderItem PK) │
               └───────┬────────┘
```

---

## 📈 Key Business KPIs

| Metric Category | Business KPI | Value / Rate | Benchmark Assessment |
| :--- | :--- | :--- | :--- |
| **Sales** | Gross Revenue | **$7,624,310** | Strong top-line trajectory |
| **Sales** | Net Profit | **$2,538,900** | Healthy 33.3% net margin |
| **Sales** | Average Order Value (AOV) | **$152.48** | +8.4% YoY expansion |
| **Customer** | Repeat Purchase Rate | **32.4%** | Loyal customer core |
| **Customer** | Customer Lifetime Value (CLV) | **$762.43** | Driven by top 20% Champions |
| **Operations** | On-Time Delivery Rate | **94.8%** | 2.1 day mean for Express |
| **Operations** | Order Cancellation Rate | **4.8%** | Concentrated in rural routes |
| **Operations** | Product Return Rate | **4.9%** | Category peak in Apparel |

---

## 🧠 RFM Customer Segmentation Methodology

Customers are categorized across **Recency (R)**, **Frequency (F)**, and **Monetary (M)** dimensions evaluated on a 1–5 quintile scale:

- **Champions (R: 4-5, F: 4-5, M: 4-5):** High spenders with recent purchases. *Strategy: VIP loyalty perks, early access.*
- **Loyal Customers (R: 3-5, F: 3-5, M: 3-5):** Regular buyers responsive to promotions. *Strategy: Cross-selling.*
- **Potential Loyalists (R: 4-5, F: 1-3, M: 1-3):** Recent buyers with high potential. *Strategy: Membership onboarding.*
- **New Customers (R: 4-5, F: 1, M: 1-2):** Newly acquired accounts. *Strategy: Welcome onboarding email sequences.*
- **At Risk (R: 1-2, F: 3-5, M: 3-5):** Historical VIPs who haven't ordered in 60+ days. *Strategy: Personalized win-back discounts.*
- **Hibernating (R: 1-2, F: 1-2, M: 1-2):** Low spenders inactive for prolonged periods. *Strategy: Low-cost re-activation.*

---

## 📂 Project Repository Structure

```text
ecommerce-sales-customer-analytics/
├── data/
│   ├── raw/                           # Untouched raw CSV extractions
│   └── cleaned/                       # Cleaned, deduplicated, and validated data
├── database/
│   ├── schema.sql                     # Normalized PostgreSQL DDL with indexes
│   ├── insert_data.sql                # Seed insert dataset
│   └── business_queries.sql           # 25 production SQL queries (CTEs, Window functions)
├── notebooks/
│   └── ecommerce_analysis.ipynb       # Jupyter notebook with Pandas, Seaborn & EDA
├── python/
│   ├── data_generation.py             # Scalable synthetic dataset generator
│   ├── data_cleaning.py               # Automated Pandas cleaning pipeline
│   ├── rfm_analysis.py                # Statistical RFM customer segmentation engine
│   └── analysis.py                    # KPI calculation script
├── powerbi/
│   └── dashboard_documentation.md     # Star Schema & 15+ DAX formulas catalog
├── reports/
│   ├── business_insights.md           # Executive findings backed by data
│   └── recommendations.md             # Prioritized tactical & strategic roadmap
├── requirements.txt                   # Python library dependencies
└── README.md                          # Comprehensive documentation
```

---

## 🚀 How to Run the Project Locally

### 1. Clone & Setup Python Environment
```bash
git clone https://github.com/your-username/ecommerce-sales-customer-analytics.git
cd ecommerce-sales-customer-analytics
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Run Data Pipeline & Analysis
```bash
# 1. Generate synthetic raw data (or use provided samples)
python python/data_generation.py

# 2. Execute automated cleaning pipeline
python python/data_cleaning.py

# 3. Run RFM customer segmentation
python python/rfm_analysis.py

# 4. Generate KPI summary
python python/analysis.py
```

### 3. Setup PostgreSQL Database & Execute SQL Queries
```bash
# Create database
createdb ecommerce_analytics

# Run schema and seed data
psql -d ecommerce_analytics -f database/schema.sql
psql -d ecommerce_analytics -f database/insert_data.sql

# Execute business query suite
psql -d ecommerce_analytics -f database/business_queries.sql
```

---

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.
