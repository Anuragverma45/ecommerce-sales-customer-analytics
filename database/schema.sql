-- ====================================================================
-- E-Commerce Sales & Customer Analytics Database Schema
-- Database: PostgreSQL 14+
-- Normalized Relational Star/Snowflake Foundation
-- ====================================================================

-- Drop existing tables if re-initializing
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS sellers CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS customers CASCADE;

-- 1. CUSTOMERS TABLE (DimCustomer)
CREATE TABLE customers (
    customer_id VARCHAR(20) PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    gender VARCHAR(10) CHECK (gender IN ('Male', 'Female', 'Non-Binary', 'Other')),
    age INT CHECK (age >= 18 AND age <= 100),
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(25),
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    country VARCHAR(50) DEFAULT 'United States',
    signup_date DATE NOT NULL,
    customer_segment VARCHAR(30) DEFAULT 'New Customers'
);

-- 2. CATEGORIES TABLE (DimCategory)
CREATE TABLE categories (
    category_id VARCHAR(20) PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);

-- 3. SELLERS TABLE (DimSeller)
CREATE TABLE sellers (
    seller_id VARCHAR(20) PRIMARY KEY,
    seller_name VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    rating NUMERIC(3, 2) CHECK (rating >= 1.00 AND rating <= 5.00),
    onboarding_date DATE NOT NULL
);

-- 4. PRODUCTS TABLE (DimProduct)
CREATE TABLE products (
    product_id VARCHAR(20) PRIMARY KEY,
    product_name VARCHAR(150) NOT NULL,
    category_id VARCHAR(20) REFERENCES categories(category_id) ON DELETE RESTRICT,
    subcategory VARCHAR(50) NOT NULL,
    brand VARCHAR(50) NOT NULL,
    cost_price NUMERIC(10, 2) NOT NULL CHECK (cost_price >= 0),
    selling_price NUMERIC(10, 2) NOT NULL CHECK (selling_price >= cost_price),
    stock_quantity INT NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    supplier_id VARCHAR(20) REFERENCES sellers(seller_id)
);

-- 5. ORDERS TABLE (FactOrders Header)
CREATE TABLE orders (
    order_id VARCHAR(20) PRIMARY KEY,
    customer_id VARCHAR(20) NOT NULL REFERENCES customers(customer_id) ON DELETE CASCADE,
    order_date TIMESTAMP NOT NULL,
    order_status VARCHAR(20) NOT NULL CHECK (order_status IN ('Delivered', 'Shipped', 'Processing', 'Cancelled', 'Returned')),
    payment_method VARCHAR(30) NOT NULL CHECK (payment_method IN ('Credit Card', 'Debit Card', 'PayPal', 'UPI / NetBanking', 'Cash on Delivery')),
    shipping_type VARCHAR(30) NOT NULL CHECK (shipping_type IN ('Standard Shipping', 'Express Delivery', 'Same Day', 'Overnight Delivery')),
    shipping_cost NUMERIC(8, 2) DEFAULT 0.00 CHECK (shipping_cost >= 0),
    delivery_date TIMESTAMP,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    CONSTRAINT valid_delivery_date CHECK (delivery_date IS NULL OR delivery_date >= order_date)
);

-- 6. ORDER ITEMS TABLE (FactOrderItems Grain)
CREATE TABLE order_items (
    order_item_id VARCHAR(25) PRIMARY KEY,
    order_id VARCHAR(20) NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
    product_id VARCHAR(20) NOT NULL REFERENCES products(product_id) ON DELETE RESTRICT,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0),
    discount_pct NUMERIC(5, 2) DEFAULT 0.00 CHECK (discount_pct >= 0 AND discount_pct <= 100),
    total_amount NUMERIC(10, 2) GENERATED ALWAYS AS (quantity * unit_price * (1 - (discount_pct / 100.0))) STORED,
    profit NUMERIC(10, 2) NOT NULL
);

-- 7. PAYMENTS TABLE (FactPayments)
CREATE TABLE payments (
    payment_id VARCHAR(25) PRIMARY KEY,
    order_id VARCHAR(20) NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
    payment_status VARCHAR(20) CHECK (payment_status IN ('Completed', 'Pending', 'Failed', 'Refunded')),
    payment_amount NUMERIC(10, 2) NOT NULL CHECK (payment_amount >= 0),
    transaction_date TIMESTAMP NOT NULL
);

-- ====================================================================
-- PERFORMANCE INDEXES (Optimized for BI Queries & Reporting)
-- ====================================================================
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_order_date ON orders(order_date);
CREATE INDEX idx_orders_order_status ON orders(order_status);
CREATE INDEX idx_orders_state ON orders(state);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_brand ON products(brand);

CREATE INDEX idx_customers_signup_date ON customers(signup_date);
CREATE INDEX idx_customers_state ON customers(state);
CREATE INDEX idx_customers_segment ON customers(customer_segment);

-- ====================================================================
-- ANALYTICAL VIEWS
-- ====================================================================
CREATE OR REPLACE VIEW v_order_financial_summary AS
SELECT 
    o.order_id,
    o.customer_id,
    o.order_date,
    o.order_status,
    o.payment_method,
    o.shipping_type,
    o.state,
    COUNT(oi.order_item_id) AS total_items,
    SUM(oi.quantity) AS total_units,
    SUM(oi.total_amount) AS order_subtotal,
    o.shipping_cost,
    SUM(oi.total_amount) + o.shipping_cost AS final_order_revenue,
    SUM(oi.profit) AS total_order_profit,
    ROUND((SUM(oi.profit) / NULLIF(SUM(oi.total_amount), 0)) * 100, 2) AS profit_margin_pct
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
GROUP BY o.order_id, o.customer_id, o.order_date, o.order_status, o.payment_method, o.shipping_type, o.shipping_cost, o.state;
