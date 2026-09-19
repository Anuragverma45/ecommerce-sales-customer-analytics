-- ====================================================================
-- E-Commerce Sales & Customer Analytics Seed Insert Data
-- Realistic sample records representing normalized entities
-- ====================================================================

-- 1. Insert Categories
INSERT INTO categories (category_id, category_name, description) VALUES
('CAT-001', 'Electronics', 'Consumer electronic devices, wearables, and audio'),
('CAT-002', 'Computers & Office', 'Laptops, monitors, desktop peripherals, and networking'),
('CAT-003', 'Home & Kitchen', 'Modern cookware, appliances, and kitchen storage'),
('CAT-004', 'Apparel & Fashion', 'Men and women designer clothing, footwear, and activewear'),
('CAT-005', 'Fitness & Outdoors', 'Gym equipment, camping gear, and athletic accessories'),
('CAT-006', 'Beauty & Personal Care', 'Skincare, haircare, cosmetics, and wellness products');

-- 2. Insert Sellers
INSERT INTO sellers (seller_id, seller_name, city, state, rating, onboarding_date) VALUES
('SEL-101', 'Apex Tech Global', 'San Francisco', 'California', 4.85, '2022-01-15'),
('SEL-102', 'LuxeStyle Apparel Co.', 'New York', 'New York', 4.70, '2022-03-20'),
('SEL-103', 'Nordic Living Direct', 'Austin', 'Texas', 4.92, '2022-02-10'),
('SEL-104', 'Titan Dynamics Corp', 'Seattle', 'Washington', 4.65, '2022-05-01'),
('SEL-105', 'PulseFit Athletics', 'Miami', 'Florida', 4.78, '2022-04-18');

-- 3. Insert Products
INSERT INTO products (product_id, product_name, category_id, subcategory, brand, cost_price, selling_price, stock_quantity, supplier_id) VALUES
('PRD-1001', 'AeroPro Noise-Cancelling Wireless Headphones', 'CAT-001', 'Headphones', 'SonicWave', 145.00, 299.99, 420, 'SEL-101'),
('PRD-1002', 'UltraVision 34-Inch Curved Gaming Monitor', 'CAT-002', 'Monitors', 'Titan', 320.00, 549.99, 185, 'SEL-104'),
('PRD-1003', 'SmartPulse Health & Fitness Smartwatch', 'CAT-001', 'Wearables', 'PulseTech', 78.50, 189.99, 610, 'SEL-101'),
('PRD-1004', 'Artisan Espresso & Cappuccino Maker', 'CAT-003', 'Appliances', 'BaristaCraft', 180.00, 379.99, 140, 'SEL-103'),
('PRD-1005', 'Merino Wool Ergonomic Tech Hoodie', 'CAT-004', 'Outerwear', 'AlpineThread', 42.00, 119.50, 850, 'SEL-102'),
('PRD-1006', 'Apex Pro Mechanical Keyboard (Hot-Swap)', 'CAT-002', 'Keyboards', 'KeyMatrix', 55.00, 149.99, 390, 'SEL-104'),
('PRD-1007', 'HydroGrip Insulated Stainless Water Bottle', 'CAT-005', 'Hydration', 'SummitGear', 8.20, 34.99, 1200, 'SEL-105'),
('PRD-1008', 'Luxe Radiant Night Repair Face Serum', 'CAT-006', 'Skincare', 'GlowBotanics', 14.50, 68.00, 750, 'SEL-102'),
('PRD-1009', 'PureBreeze HEPA True Air Purifier', 'CAT-003', 'Home Tech', 'CleanAir Co', 95.00, 229.00, 215, 'SEL-103'),
('PRD-1010', 'Velocity Carbon-Plate Running Shoes', 'CAT-005', 'Footwear', 'Strider', 62.00, 175.00, 430, 'SEL-105');

-- 4. Insert Customers
INSERT INTO customers (customer_id, first_name, last_name, gender, age, email, phone, city, state, signup_date, customer_segment) VALUES
('CUST-2001', 'Eleanor', 'Vance', 'Female', 34, 'eleanor.vance@example.com', '+1-415-555-0142', 'San Francisco', 'California', '2023-01-12', 'Champions'),
('CUST-2002', 'Marcus', 'Chen', 'Male', 29, 'marcus.chen@example.com', '+1-206-555-0189', 'Seattle', 'Washington', '2023-02-04', 'Loyal Customers'),
('CUST-2003', 'Sarah', 'Jenkins', 'Female', 42, 'sarah.j@example.com', '+1-512-555-0111', 'Austin', 'Texas', '2023-03-18', 'Champions'),
('CUST-2004', 'David', 'Kowalski', 'Male', 51, 'dkowalski@example.com', '+1-312-555-0177', 'Chicago', 'Illinois', '2023-04-22', 'Potential Loyalists'),
('CUST-2005', 'Amina', 'Diallo', 'Female', 27, 'amina.d@example.com', '+1-212-555-0163', 'New York', 'New York', '2023-05-30', 'Champions'),
('CUST-2006', 'Liam', 'O''Connor', 'Male', 38, 'liam.oc@example.com', '+1-617-555-0194', 'Boston', 'Massachusetts', '2023-07-14', 'At Risk'),
('CUST-2007', 'Priya', 'Sharma', 'Female', 31, 'priya.sharma@example.com', '+1-408-555-0133', 'San Jose', 'California', '2023-08-09', 'Loyal Customers'),
('CUST-2008', 'James', 'Wilson', 'Male', 45, 'jwilson@example.com', '+1-305-555-0155', 'Miami', 'Florida', '2023-09-21', 'Hibernating'),
('CUST-2009', 'Elena', 'Rostova', 'Female', 24, 'elena.r@example.com', '+1-720-555-0128', 'Denver', 'Colorado', '2023-11-05', 'New Customers'),
('CUST-2010', 'Carlos', 'Mendoza', 'Male', 36, 'carlos.m@example.com', '+1-602-555-0199', 'Phoenix', 'Arizona', '2023-12-19', 'Potential Loyalists');

-- 5. Insert Orders
INSERT INTO orders (order_id, customer_id, order_date, order_status, payment_method, shipping_type, shipping_cost, delivery_date, city, state) VALUES
('ORD-9001', 'CUST-2001', '2024-01-14 10:24:00', 'Delivered', 'Credit Card', 'Express Delivery', 14.99, '2024-01-16 14:10:00', 'San Francisco', 'California'),
('ORD-9002', 'CUST-2002', '2024-01-19 15:40:00', 'Delivered', 'PayPal', 'Standard Shipping', 5.99, '2024-01-23 11:30:00', 'Seattle', 'Washington'),
('ORD-9003', 'CUST-2003', '2024-02-02 09:15:00', 'Delivered', 'Credit Card', 'Same Day', 24.99, '2024-02-02 19:45:00', 'Austin', 'Texas'),
('ORD-9004', 'CUST-2004', '2024-02-14 18:22:00', 'Delivered', 'Debit Card', 'Standard Shipping', 5.99, '2024-02-18 13:00:00', 'Chicago', 'Illinois'),
('ORD-9005', 'CUST-2005', '2024-03-01 11:05:00', 'Delivered', 'Credit Card', 'Express Delivery', 14.99, '2024-03-03 16:20:00', 'New York', 'New York'),
('ORD-9006', 'CUST-2006', '2024-03-12 14:50:00', 'Returned', 'Credit Card', 'Standard Shipping', 5.99, '2024-03-16 10:15:00', 'Boston', 'Massachusetts'),
('ORD-9007', 'CUST-2001', '2024-03-25 16:30:00', 'Delivered', 'Credit Card', 'Express Delivery', 14.99, '2024-03-27 12:45:00', 'San Francisco', 'California'),
('ORD-9008', 'CUST-2007', '2024-04-05 13:10:00', 'Delivered', 'UPI / NetBanking', 'Standard Shipping', 5.99, '2024-04-09 15:00:00', 'San Jose', 'California'),
('ORD-9009', 'CUST-2008', '2024-04-18 08:40:00', 'Cancelled', 'Credit Card', 'Standard Shipping', 0.00, NULL, 'Miami', 'Florida'),
('ORD-9010', 'CUST-2009', '2024-05-02 20:10:00', 'Delivered', 'Debit Card', 'Standard Shipping', 5.99, '2024-05-06 17:30:00', 'Denver', 'Colorado');

-- 6. Insert Order Items
INSERT INTO order_items (order_item_id, order_id, product_id, quantity, unit_price, discount_pct, profit) VALUES
('ITEM-8001', 'ORD-9001', 'PRD-1001', 1, 299.99, 10.0, 124.99),
('ITEM-8002', 'ORD-9002', 'PRD-1002', 1, 549.99, 5.0, 202.49),
('ITEM-8003', 'ORD-9003', 'PRD-1004', 1, 379.99, 0.0, 199.99),
('ITEM-8004', 'ORD-9003', 'PRD-1007', 2, 34.99, 0.0, 53.58),
('ITEM-8005', 'ORD-9004', 'PRD-1006', 1, 149.99, 15.0, 72.49),
('ITEM-8006', 'ORD-9005', 'PRD-1008', 3, 68.00, 10.0, 144.60),
('ITEM-8007', 'ORD-9006', 'PRD-1005', 2, 119.50, 0.0, 155.00),
('ITEM-8008', 'ORD-9007', 'PRD-1003', 1, 189.99, 5.0, 101.99),
('ITEM-8009', 'ORD-9008', 'PRD-1009', 1, 229.00, 0.0, 134.00),
('ITEM-8010', 'ORD-9010', 'PRD-1010', 1, 175.00, 10.0, 95.50);
