# 📊 Power BI Dashboard Architecture & DAX Formula Reference

## 1. Data Model Architecture (Star Schema)

The analytical data model follows an industry-standard **Star Schema** optimized for high-performance Power BI VertiPaq compression, rapid DAX aggregations, and drill-down operations.

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
                       │ *
                       │
                       │ 1
               ┌───────┴────────┐
               │  DimLocation   │
               │(City,State PK) │
               └────────────────┘
```

### Table Roles & Relationships

| Relationship | Cardinality | Cross-filter Direction | Active? | Business Context |
| :--- | :--- | :--- | :--- | :--- |
| **DimCustomer → FactOrders** | 1-to-Many (`1:*`) | Single (Dim filters Fact) | Active | Customer behavior & slicing |
| **DimDate → FactOrders** | 1-to-Many (`1:*`) | Single (Dim filters Fact) | Active | Time-intelligence (Order Date) |
| **DimProduct → FactOrderItems** | 1-to-Many (`1:*`) | Single (Dim filters Fact) | Active | Product performance & SKUs |
| **FactOrders → FactOrderItems** | 1-to-Many (`1:*`) | Both | Active | Order-header to line-item grain |
| **DimLocation → FactOrders** | 1-to-Many (`1:*`) | Single (Dim filters Fact) | Active | Geographic regional reporting |
| **DimSeller → DimProduct** | 1-to-Many (`1:*`) | Single (Dim filters Dim) | Active | Seller & supplier analytics |

---

## 2. Core DAX Measures Catalog

All business calculations are centralized into a dedicated `_Measures` table.

### Sales & Profitability Measures

#### 1. Total Revenue
```dax
Total Revenue = 
SUM(FactOrderItems[total_amount])
```
*Simple Explanation:* Sums the net monetary value of all purchased line items after promotional discounts.

#### 2. Total Profit
```dax
Total Profit = 
SUM(FactOrderItems[profit])
```
*Simple Explanation:* Calculates net profit by subtracting supplier cost price from selling price.

#### 3. Profit Margin %
```dax
Profit Margin % = 
DIVIDE([Total Profit], [Total Revenue], 0)
```
*Simple Explanation:* The proportion of revenue that remains as earnings. Formatted as percentage.

#### 4. Total Orders
```dax
Total Orders = 
DISTINCTCOUNT(FactOrders[order_id])
```
*Simple Explanation:* Counts distinct order invoices placed by customers.

#### 5. Average Order Value (AOV)
```dax
Average Order Value = 
DIVIDE([Total Revenue], [Total Orders], 0)
```
*Simple Explanation:* The average monetary spend per order transaction.

---

### Time-Intelligence & Growth Measures

#### 6. Revenue Last Year (LY)
```dax
Revenue LY = 
CALCULATE(
    [Total Revenue],
    SAMEPERIODLASTYEAR(DimDate[Date])
)
```
*Simple Explanation:* Calculates total revenue for the equivalent calendar timeframe in the preceding year.

#### 7. YoY Revenue Growth %
```dax
YoY Revenue Growth % = 
VAR CurrentRev = [Total Revenue]
VAR PriorRev = [Revenue LY]
RETURN
    DIVIDE(CurrentRev - PriorRev, PriorRev, 0)
```
*Simple Explanation:* Percentage increase or contraction compared to the prior year period.

#### 8. Month-over-Month (MoM) Growth %
```dax
MoM Revenue Growth % = 
VAR CurrentMonthRev = [Total Revenue]
VAR PrevMonthRev = CALCULATE([Total Revenue], DATEADD(DimDate[Date], -1, MONTH))
RETURN
    DIVIDE(CurrentMonthRev - PrevMonthRev, PrevMonthRev, 0)
```
*Simple Explanation:* Tracks revenue velocity month over month.

---

### Customer & Retention Measures

#### 9. Total Active Customers
```dax
Total Customers = 
DISTINCTCOUNT(FactOrders[customer_id])
```
*Simple Explanation:* Unique individuals who have completed at least one transaction.

#### 10. Repeat Customers
```dax
Repeat Customers = 
COUNTROWS(
    FILTER(
        VALUES(FactOrders[customer_id]),
        CALCULATE(DISTINCTCOUNT(FactOrders[order_id])) > 1
    )
)
```
*Simple Explanation:* Number of customers who have purchased 2 or more times.

#### 11. Repeat Customer Rate %
```dax
Repeat Customer Rate % = 
DIVIDE([Repeat Customers], [Total Customers], 0)
```
*Simple Explanation:* Proportion of buyer base demonstrating customer loyalty and retention.

#### 12. Customer Lifetime Value (CLV)
```dax
Customer Lifetime Value = 
DIVIDE([Total Revenue], [Total Customers], 0)
```
*Simple Explanation:* Mean cumulative lifetime expenditure per customer.

---

### Operational & Logistics Measures

#### 13. Average Delivery Time (Days)
```dax
Average Delivery Days = 
AVERAGEX(
    FILTER(FactOrders, FactOrders[order_status] = "Delivered" && NOT(ISBLANK(FactOrders[delivery_date]))),
    DATEDIFF(FactOrders[order_date], FactOrders[delivery_date], DAY)
)
```
*Simple Explanation:* Mean number of calendar days elapsed between order timestamp and physical customer delivery.

#### 14. Order Return Rate %
```dax
Return Rate % = 
DIVIDE(
    CALCULATE(COUNTROWS(FactOrders), FactOrders[order_status] = "Returned"),
    COUNTROWS(FactOrders),
    0
)
```
*Simple Explanation:* Ratio of orders returned back to inventory.

#### 15. Cancellation Rate %
```dax
Cancellation Rate % = 
DIVIDE(
    CALCULATE(COUNTROWS(FactOrders), FactOrders[order_status] = "Cancelled"),
    COUNTROWS(FactOrders),
    0
)
```
*Simple Explanation:* Percentage of checkout attempts aborted or cancelled prior to fulfillment.

---

## 3. Power BI Multi-Page Layout Specifications

- **Page 1: Executive Overview** — High-level KPI cards with trend sparklines, monthly revenue vs target bar chart, category share donut, geographic map, and top 5 products. Slicers: Date, Segment, Region.
- **Page 2: Sales Analytics** — Deep sales trends, YoY variance water-fall, payment method distribution, and basket size histogram.
- **Page 3: Customer Analytics & RFM** — Interactive RFM scatter/matrix, segment composition treemap, customer frequency distribution, and churn risk list.
- **Page 4: Product Analytics** — Top 10 vs Bottom 10 SKUs, revenue vs profit margin quadrant, stock velocity, and category discount impact.
- **Page 5: Operations & Logistics** — Fulfillment SLAs, delivery days by carrier/shipping type, carrier performance benchmark, and return root cause analysis.
