-- ====================================================================
-- E-Commerce Sales & Customer Analytics — 25 Business SQL Queries
-- Tech Stack: PostgreSQL (Advanced CTEs, Window Functions, Aggregations)
-- ====================================================================

-- --------------------------------------------------------------------
-- 1. What is total revenue generated across all valid completed/delivered orders?
-- --------------------------------------------------------------------
SELECT 
    ROUND(SUM(total_amount), 2) AS total_revenue,
    ROUND(SUM(profit), 2) AS total_profit,
    COUNT(DISTINCT order_id) AS total_orders
FROM order_items oi
JOIN orders o ON oi.order_id = o.order_id
WHERE o.order_status NOT IN ('Cancelled');

-- --------------------------------------------------------------------
-- 2. What is total profit and overall profit margin percentage?
-- --------------------------------------------------------------------
SELECT 
    ROUND(SUM(profit), 2) AS total_net_profit,
    ROUND(SUM(total_amount), 2) AS gross_revenue,
    ROUND((SUM(profit) / NULLIF(SUM(total_amount), 0)) * 100, 2) AS overall_profit_margin_pct
FROM order_items oi
JOIN orders o ON oi.order_id = o.order_id
WHERE o.order_status IN ('Delivered', 'Shipped');

-- --------------------------------------------------------------------
-- 3. What is monthly revenue and month-over-month trend?
-- --------------------------------------------------------------------
WITH monthly_sales AS (
    SELECT 
        DATE_TRUNC('month', o.order_date)::DATE AS sales_month,
        ROUND(SUM(oi.total_amount), 2) AS monthly_revenue,
        COUNT(DISTINCT o.order_id) AS total_orders
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    WHERE o.order_status NOT IN ('Cancelled')
    GROUP BY DATE_TRUNC('month', o.order_date)
)
SELECT 
    sales_month,
    monthly_revenue,
    total_orders,
    LAG(monthly_revenue, 1) OVER (ORDER BY sales_month) AS previous_month_revenue,
    ROUND(
        ((monthly_revenue - LAG(monthly_revenue, 1) OVER (ORDER BY sales_month)) 
        / NULLIF(LAG(monthly_revenue, 1) OVER (ORDER BY sales_month), 0)) * 100, 2
    ) AS mom_growth_pct
FROM monthly_sales
ORDER BY sales_month ASC;

-- --------------------------------------------------------------------
-- 4. Which top 10 products generate the highest revenue?
-- --------------------------------------------------------------------
SELECT 
    p.product_id,
    p.product_name,
    c.category_name,
    p.brand,
    SUM(oi.quantity) AS total_units_sold,
    ROUND(SUM(oi.total_amount), 2) AS total_revenue,
    ROUND(SUM(oi.profit), 2) AS total_profit,
    DENSE_RANK() OVER (ORDER BY SUM(oi.total_amount) DESC) AS revenue_rank
FROM order_items oi
JOIN products p ON oi.product_id = p.product_id
JOIN categories c ON p.category_id = c.category_id
JOIN orders o ON oi.order_id = o.order_id
WHERE o.order_status NOT IN ('Cancelled')
GROUP BY p.product_id, p.product_name, c.category_name, p.brand
ORDER BY total_revenue DESC
LIMIT 10;

-- --------------------------------------------------------------------
-- 5. Which products generate the highest net profit?
-- --------------------------------------------------------------------
SELECT 
    p.product_id,
    p.product_name,
    c.category_name,
    ROUND(SUM(oi.profit), 2) AS total_profit,
    ROUND(SUM(oi.total_amount), 2) AS total_revenue,
    ROUND((SUM(oi.profit) / NULLIF(SUM(oi.total_amount), 0)) * 100, 2) AS profit_margin_pct,
    RANK() OVER (ORDER BY SUM(oi.profit) DESC) AS profit_rank
FROM order_items oi
JOIN products p ON oi.product_id = p.product_id
JOIN categories c ON p.category_id = c.category_id
JOIN orders o ON oi.order_id = o.order_id
WHERE o.order_status NOT IN ('Cancelled')
GROUP BY p.product_id, p.product_name, c.category_name
ORDER BY total_profit DESC
LIMIT 10;

-- --------------------------------------------------------------------
-- 6. Which categories generate the highest sales and volume?
-- --------------------------------------------------------------------
SELECT 
    c.category_name,
    COUNT(DISTINCT o.order_id) AS total_orders_placed,
    SUM(oi.quantity) AS total_units_sold,
    ROUND(SUM(oi.total_amount), 2) AS category_revenue,
    ROUND(SUM(oi.profit), 2) AS category_profit,
    ROUND((SUM(oi.profit) / NULLIF(SUM(oi.total_amount), 0)) * 100, 2) AS profit_margin_pct
FROM order_items oi
JOIN products p ON oi.product_id = p.product_id
JOIN categories c ON p.category_id = c.category_id
JOIN orders o ON oi.order_id = o.order_id
WHERE o.order_status NOT IN ('Cancelled')
GROUP BY c.category_name
ORDER BY category_revenue DESC;

-- --------------------------------------------------------------------
-- 7. Which states generate the highest revenue and order density?
-- --------------------------------------------------------------------
SELECT 
    o.state,
    COUNT(DISTINCT o.order_id) AS total_orders,
    COUNT(DISTINCT o.customer_id) AS unique_customers,
    ROUND(SUM(oi.total_amount), 2) AS state_revenue,
    ROUND(AVG(oi.total_amount), 2) AS avg_item_spend
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
WHERE o.order_status NOT IN ('Cancelled')
GROUP BY o.state
ORDER BY state_revenue DESC
LIMIT 10;

-- --------------------------------------------------------------------
-- 8. Who are the top 10 customers by total spend?
-- --------------------------------------------------------------------
SELECT 
    c.customer_id,
    c.first_name || ' ' || c.last_name AS customer_name,
    c.city,
    c.state,
    c.customer_segment,
    COUNT(DISTINCT o.order_id) AS total_orders_count,
    ROUND(SUM(oi.total_amount), 2) AS total_spend,
    ROUND(AVG(oi.total_amount), 2) AS avg_spend_per_item
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
WHERE o.order_status NOT IN ('Cancelled')
GROUP BY c.customer_id, customer_name, c.city, c.state, c.customer_segment
ORDER BY total_spend DESC
LIMIT 10;

-- --------------------------------------------------------------------
-- 9. What percentage of customers are repeat customers?
-- --------------------------------------------------------------------
WITH customer_order_counts AS (
    SELECT 
        customer_id,
        COUNT(order_id) AS order_count
    FROM orders
    WHERE order_status NOT IN ('Cancelled')
    GROUP BY customer_id
)
SELECT 
    COUNT(*) AS total_purchasing_customers,
    COUNT(CASE WHEN order_count > 1 THEN 1 END) AS repeat_customers_count,
    ROUND(
        (COUNT(CASE WHEN order_count > 1 THEN 1 END)::NUMERIC / NULLIF(COUNT(*), 0)) * 100, 
        2
    ) AS repeat_customer_percentage
FROM customer_order_counts;

-- --------------------------------------------------------------------
-- 10. What is the Average Order Value (AOV)?
-- --------------------------------------------------------------------
WITH order_values AS (
    SELECT 
        o.order_id,
        SUM(oi.total_amount) AS order_total
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    WHERE o.order_status NOT IN ('Cancelled')
    GROUP BY o.order_id
)
SELECT 
    ROUND(AVG(order_total), 2) AS average_order_value,
    ROUND(MIN(order_total), 2) AS minimum_order_value,
    ROUND(MAX(order_total), 2) AS maximum_order_value
FROM order_values;

-- --------------------------------------------------------------------
-- 11. Which single month recorded the highest historical sales peak?
-- --------------------------------------------------------------------
SELECT 
    TO_CHAR(o.order_date, 'YYYY-MM') AS year_month,
    ROUND(SUM(oi.total_amount), 2) AS monthly_revenue,
    COUNT(DISTINCT o.order_id) AS order_volume
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
WHERE o.order_status NOT IN ('Cancelled')
GROUP BY TO_CHAR(o.order_date, 'YYYY-MM')
ORDER BY monthly_revenue DESC
LIMIT 1;

-- --------------------------------------------------------------------
-- 12. Which products have declining sales comparing recent periods? (Window Function)
-- --------------------------------------------------------------------
WITH quarterly_product_sales AS (
    SELECT 
        p.product_id,
        p.product_name,
        DATE_TRUNC('quarter', o.order_date)::DATE AS sales_quarter,
        SUM(oi.total_amount) AS quarter_revenue
    FROM products p
    JOIN order_items oi ON p.product_id = oi.product_id
    JOIN orders o ON oi.order_id = o.order_id
    WHERE o.order_status NOT IN ('Cancelled')
    GROUP BY p.product_id, p.product_name, DATE_TRUNC('quarter', o.order_date)
),
sales_with_lag AS (
    SELECT 
        product_id,
        product_name,
        sales_quarter,
        quarter_revenue,
        LAG(quarter_revenue, 1) OVER (PARTITION BY product_id ORDER BY sales_quarter) AS prev_quarter_revenue
    FROM quarterly_product_sales
)
SELECT 
    product_id,
    product_name,
    sales_quarter,
    ROUND(quarter_revenue, 2) AS current_quarter_revenue,
    ROUND(prev_quarter_revenue, 2) AS previous_quarter_revenue,
    ROUND(((quarter_revenue - prev_quarter_revenue) / NULLIF(prev_quarter_revenue, 0)) * 100, 2) AS decline_pct
FROM sales_with_lag
WHERE prev_quarter_revenue IS NOT NULL AND quarter_revenue < prev_quarter_revenue
ORDER BY decline_pct ASC
LIMIT 15;

-- --------------------------------------------------------------------
-- 13. Which valuable customers have not purchased recently? (Churn Risk > 90 Days)
-- --------------------------------------------------------------------
WITH customer_recency AS (
    SELECT 
        c.customer_id,
        c.first_name || ' ' || c.last_name AS customer_name,
        c.email,
        c.customer_segment,
        MAX(o.order_date) AS last_order_date,
        SUM(oi.total_amount) AS historical_lifetime_value,
        DATE_PART('day', CURRENT_DATE - MAX(o.order_date)) AS days_since_last_order
    FROM customers c
    JOIN orders o ON c.customer_id = o.customer_id
    JOIN order_items oi ON o.order_id = oi.order_id
    WHERE o.order_status NOT IN ('Cancelled')
    GROUP BY c.customer_id, customer_name, c.email, c.customer_segment
)
SELECT 
    customer_id,
    customer_name,
    customer_segment,
    last_order_date::DATE,
    days_since_last_order,
    ROUND(historical_lifetime_value, 2) AS lifetime_spend
FROM customer_recency
WHERE days_since_last_order > 90 AND historical_lifetime_value > 500
ORDER BY lifetime_spend DESC
LIMIT 15;

-- --------------------------------------------------------------------
-- 14. What is the quarterly customer retention rate?
-- --------------------------------------------------------------------
WITH customer_quarters AS (
    SELECT DISTINCT 
        customer_id,
        DATE_TRUNC('quarter', order_date)::DATE AS order_quarter
    FROM orders
    WHERE order_status NOT IN ('Cancelled')
),
retention_cte AS (
    SELECT 
        cq1.order_quarter AS base_quarter,
        COUNT(DISTINCT cq1.customer_id) AS active_in_base,
        COUNT(DISTINCT cq2.customer_id) AS retained_next_quarter
    FROM customer_quarters cq1
    LEFT JOIN customer_quarters cq2 
        ON cq1.customer_id = cq2.customer_id 
        AND cq2.order_quarter = (cq1.order_quarter + INTERVAL '3 months')::DATE
    GROUP BY cq1.order_quarter
)
SELECT 
    base_quarter,
    active_in_base,
    retained_next_quarter,
    ROUND((retained_next_quarter::NUMERIC / NULLIF(active_in_base, 0)) * 100, 2) AS retention_rate_pct
FROM retention_cte
ORDER BY base_quarter ASC;

-- --------------------------------------------------------------------
-- 15. What is the order cancellation rate overall and by state?
-- --------------------------------------------------------------------
SELECT 
    state,
    COUNT(order_id) AS total_orders,
    COUNT(CASE WHEN order_status = 'Cancelled' THEN 1 END) AS cancelled_orders,
    ROUND((COUNT(CASE WHEN order_status = 'Cancelled' THEN 1 END)::NUMERIC / NULLIF(COUNT(order_id), 0)) * 100, 2) AS cancellation_rate_pct
FROM orders
GROUP BY state
HAVING COUNT(order_id) >= 50
ORDER BY cancellation_rate_pct DESC
LIMIT 10;

-- --------------------------------------------------------------------
-- 16. What is the customer return rate by category?
-- --------------------------------------------------------------------
SELECT 
    c.category_name,
    COUNT(DISTINCT o.order_id) AS total_orders,
    COUNT(DISTINCT CASE WHEN o.order_status = 'Returned' THEN o.order_id END) AS returned_orders,
    ROUND(
        (COUNT(DISTINCT CASE WHEN o.order_status = 'Returned' THEN o.order_id END)::NUMERIC 
        / NULLIF(COUNT(DISTINCT o.order_id), 0)) * 100, 2
    ) AS return_rate_pct
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p ON oi.product_id = p.product_id
JOIN categories c ON p.category_id = c.category_id
GROUP BY c.category_name
ORDER BY return_rate_pct DESC;

-- --------------------------------------------------------------------
-- 17. Which payment method is most popular and produces the highest average order value?
-- --------------------------------------------------------------------
SELECT 
    o.payment_method,
    COUNT(DISTINCT o.order_id) AS transaction_count,
    ROUND(SUM(oi.total_amount), 2) AS total_revenue_processed,
    ROUND(AVG(oi.total_amount), 2) AS avg_item_spend,
    ROUND(
        (COUNT(DISTINCT o.order_id)::NUMERIC / (SELECT COUNT(*) FROM orders WHERE order_status != 'Cancelled')) * 100, 
        2
    ) AS share_of_transactions_pct
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
WHERE o.order_status != 'Cancelled'
GROUP BY o.payment_method
ORDER BY transaction_count DESC;

-- --------------------------------------------------------------------
-- 18. Which shipping method performs best in delivery duration and volume?
-- --------------------------------------------------------------------
SELECT 
    shipping_type,
    COUNT(order_id) AS order_volume,
    ROUND(AVG(DATE_PART('day', delivery_date - order_date)), 2) AS avg_delivery_days,
    ROUND(MIN(DATE_PART('day', delivery_date - order_date)), 1) AS min_delivery_days,
    ROUND(MAX(DATE_PART('day', delivery_date - order_date)), 1) AS max_delivery_days,
    ROUND(SUM(shipping_cost), 2) AS total_shipping_revenue
FROM orders
WHERE order_status = 'Delivered' AND delivery_date IS NOT NULL
GROUP BY shipping_type
ORDER BY avg_delivery_days ASC;

-- --------------------------------------------------------------------
-- 19. What is the average delivery time across different regions/states?
-- --------------------------------------------------------------------
SELECT 
    state,
    COUNT(order_id) AS delivered_orders,
    ROUND(AVG(DATE_PART('day', delivery_date - order_date)), 2) AS avg_fulfillment_days
FROM orders
WHERE order_status = 'Delivered' AND delivery_date IS NOT NULL
GROUP BY state
ORDER BY avg_fulfillment_days ASC
LIMIT 10;

-- --------------------------------------------------------------------
-- 20. Top 10 Customers with Highest Lifetime Value (CLV) & Purchasing Frequency
-- --------------------------------------------------------------------
SELECT 
    c.customer_id,
    c.first_name || ' ' || c.last_name AS customer_name,
    c.customer_segment,
    COUNT(DISTINCT o.order_id) AS total_purchases,
    ROUND(SUM(oi.total_amount), 2) AS lifetime_value,
    ROUND(AVG(oi.total_amount), 2) AS avg_basket_size,
    DENSE_RANK() OVER (ORDER BY SUM(oi.total_amount) DESC) AS clv_rank
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
WHERE o.order_status NOT IN ('Cancelled')
GROUP BY c.customer_id, customer_name, c.customer_segment
ORDER BY lifetime_value DESC
LIMIT 10;

-- --------------------------------------------------------------------
-- 21. Which category has the highest overall profit margin?
-- --------------------------------------------------------------------
SELECT 
    c.category_name,
    ROUND(SUM(oi.total_amount), 2) AS total_revenue,
    ROUND(SUM(oi.profit), 2) AS total_profit,
    ROUND((SUM(oi.profit) / NULLIF(SUM(oi.total_amount), 0)) * 100, 2) AS profit_margin_percentage
FROM order_items oi
JOIN products p ON oi.product_id = p.product_id
JOIN categories c ON p.category_id = c.category_id
JOIN orders o ON oi.order_id = o.order_id
WHERE o.order_status NOT IN ('Cancelled')
GROUP BY c.category_name
ORDER BY profit_margin_percentage DESC;

-- --------------------------------------------------------------------
-- 22. Which products have high sales volume but dangerously low profit margins?
-- --------------------------------------------------------------------
SELECT 
    p.product_id,
    p.product_name,
    c.category_name,
    SUM(oi.quantity) AS units_sold,
    ROUND(SUM(oi.total_amount), 2) AS total_revenue,
    ROUND(SUM(oi.profit), 2) AS total_profit,
    ROUND((SUM(oi.profit) / NULLIF(SUM(oi.total_amount), 0)) * 100, 2) AS profit_margin_pct
FROM order_items oi
JOIN products p ON oi.product_id = p.product_id
JOIN categories c ON p.category_id = c.category_id
JOIN orders o ON oi.order_id = o.order_id
WHERE o.order_status NOT IN ('Cancelled')
GROUP BY p.product_id, p.product_name, c.category_name
HAVING SUM(oi.total_amount) > 5000 AND (SUM(oi.profit) / NULLIF(SUM(oi.total_amount), 0)) < 0.12
ORDER BY total_revenue DESC
LIMIT 10;

-- --------------------------------------------------------------------
-- 23. Which "hidden gem" products have low sales volume but exceptionally high profit margin (>40%)?
-- --------------------------------------------------------------------
SELECT 
    p.product_id,
    p.product_name,
    c.category_name,
    SUM(oi.quantity) AS units_sold,
    ROUND(SUM(oi.total_amount), 2) AS total_revenue,
    ROUND(SUM(oi.profit), 2) AS total_profit,
    ROUND((SUM(oi.profit) / NULLIF(SUM(oi.total_amount), 0)) * 100, 2) AS profit_margin_pct
FROM order_items oi
JOIN products p ON oi.product_id = p.product_id
JOIN categories c ON p.category_id = c.category_id
JOIN orders o ON oi.order_id = o.order_id
WHERE o.order_status NOT IN ('Cancelled')
GROUP BY p.product_id, p.product_name, c.category_name
HAVING (SUM(oi.profit) / NULLIF(SUM(oi.total_amount), 0)) >= 0.40 AND SUM(oi.quantity) < 50
ORDER BY profit_margin_pct DESC
LIMIT 10;

-- --------------------------------------------------------------------
-- 24. What are the Year-over-Year (YoY) sales comparisons by month? (LAG Window)
-- --------------------------------------------------------------------
WITH monthly_metrics AS (
    SELECT 
        EXTRACT(YEAR FROM o.order_date) AS order_year,
        EXTRACT(MONTH FROM o.order_date) AS order_month,
        TO_CHAR(o.order_date, 'Month') AS month_name,
        ROUND(SUM(oi.total_amount), 2) AS revenue
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    WHERE o.order_status NOT IN ('Cancelled')
    GROUP BY EXTRACT(YEAR FROM o.order_date), EXTRACT(MONTH FROM o.order_date), TO_CHAR(o.order_date, 'Month')
)
SELECT 
    order_year,
    month_name,
    revenue AS current_year_revenue,
    LAG(revenue, 1) OVER (PARTITION BY order_month ORDER BY order_year) AS prior_year_revenue,
    ROUND(
        ((revenue - LAG(revenue, 1) OVER (PARTITION BY order_month ORDER BY order_year)) 
        / NULLIF(LAG(revenue, 1) OVER (PARTITION BY order_month ORDER BY order_year), 0)) * 100, 
        2
    ) AS yoy_growth_pct
FROM monthly_metrics
ORDER BY order_month, order_year;

-- --------------------------------------------------------------------
-- 25. What is the percentage contribution of each category to total revenue? (Window Function)
-- --------------------------------------------------------------------
WITH cat_sales AS (
    SELECT 
        c.category_name,
        ROUND(SUM(oi.total_amount), 2) AS category_revenue
    FROM order_items oi
    JOIN products p ON oi.product_id = p.product_id
    JOIN categories c ON p.category_id = c.category_id
    JOIN orders o ON oi.order_id = o.order_id
    WHERE o.order_status NOT IN ('Cancelled')
    GROUP BY c.category_name
)
SELECT 
    category_name,
    category_revenue,
    ROUND(SUM(category_revenue) OVER (), 2) AS total_portfolio_revenue,
    ROUND((category_revenue / SUM(category_revenue) OVER ()) * 100, 2) AS revenue_contribution_pct,
    DENSE_RANK() OVER (ORDER BY category_revenue DESC) AS contribution_rank
FROM cat_sales
ORDER BY category_revenue DESC;
