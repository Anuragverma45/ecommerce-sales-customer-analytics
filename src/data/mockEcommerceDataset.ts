import { 
  Customer, 
  Product, 
  Order, 
  CategoryMetric, 
  MonthlyTrend, 
  StateMetric,
  DaxMeasureItem,
  SqlQueryItem 
} from '../types/analytics';

export const CATEGORIES_LIST = [
  'All Categories',
  'Electronics',
  'Computers & Office',
  'Home & Kitchen',
  'Apparel & Fashion',
  'Fitness & Outdoors',
  'Beauty & Personal Care'
];

export const STATES_LIST = [
  'All States',
  'California',
  'New York',
  'Texas',
  'Washington',
  'Illinois',
  'Florida',
  'Colorado',
  'Massachusetts'
];

export const SEGMENTS_LIST = [
  'All Segments',
  'Champions',
  'Loyal Customers',
  'Potential Loyalists',
  'New Customers',
  'At Risk',
  'Cannot Lose Them',
  'Hibernating'
];

export const PAYMENT_METHODS_LIST = [
  'All Methods',
  'Credit Card',
  'Debit Card',
  'PayPal',
  'UPI / NetBanking',
  'Cash on Delivery'
];

export const ORDER_STATUS_LIST = [
  'All Statuses',
  'Delivered',
  'Shipped',
  'Processing',
  'Cancelled',
  'Returned'
];

export const MONTHLY_TRENDS_DATA: MonthlyTrend[] = [
  { month: '2023-01', label: 'Jan 23', revenue: 245000, profit: 81200, orders: 1680, aov: 145.83 },
  { month: '2023-02', label: 'Feb 23', revenue: 260000, profit: 86500, orders: 1750, aov: 148.57 },
  { month: '2023-03', label: 'Mar 23', revenue: 285000, profit: 95400, orders: 1910, aov: 149.21 },
  { month: '2023-04', label: 'Apr 23', revenue: 278000, profit: 92800, orders: 1840, aov: 151.09 },
  { month: '2023-05', label: 'May 23', revenue: 310000, profit: 104500, orders: 2020, aov: 153.46 },
  { month: '2023-06', label: 'Jun 23', revenue: 325000, profit: 110200, orders: 2110, aov: 154.03 },
  { month: '2023-07', label: 'Jul 23', revenue: 360000, profit: 122400, orders: 2320, aov: 155.17 },
  { month: '2023-08', label: 'Aug 23', revenue: 340000, profit: 114800, orders: 2200, aov: 154.54 },
  { month: '2023-09', label: 'Sep 23', revenue: 355000, profit: 120500, orders: 2280, aov: 155.70 },
  { month: '2023-10', label: 'Oct 23', revenue: 390000, profit: 132000, orders: 2490, aov: 156.62 },
  { month: '2023-11', label: 'Nov 23', revenue: 580000, profit: 185600, orders: 3650, aov: 158.90 },
  { month: '2023-12', label: 'Dec 23', revenue: 640000, profit: 204800, orders: 3980, aov: 160.80 },
  { month: '2024-01', label: 'Jan 24', revenue: 312000, profit: 106000, orders: 2010, aov: 155.22, yoy_growth_pct: 27.3 },
  { month: '2024-02', label: 'Feb 24', revenue: 335000, profit: 113900, orders: 2140, aov: 156.54, yoy_growth_pct: 28.8 },
  { month: '2024-03', label: 'Mar 24', revenue: 370000, profit: 125800, orders: 2340, aov: 158.12, yoy_growth_pct: 29.8 },
  { month: '2024-04', label: 'Apr 24', revenue: 358000, profit: 121700, orders: 2250, aov: 159.11, yoy_growth_pct: 28.8 },
  { month: '2024-05', label: 'May 24', revenue: 405000, profit: 138000, orders: 2510, aov: 161.35, yoy_growth_pct: 30.6 },
  { month: '2024-06', label: 'Jun 24', revenue: 420000, profit: 143200, orders: 2590, aov: 162.16, yoy_growth_pct: 29.2 },
  { month: '2024-07', label: 'Jul 24', revenue: 475000, profit: 162000, orders: 2910, aov: 163.23, yoy_growth_pct: 31.9 },
  { month: '2024-08', label: 'Aug 24', revenue: 445000, profit: 151300, orders: 2710, aov: 164.20, yoy_growth_pct: 30.9 },
  { month: '2024-09', label: 'Sep 24', revenue: 462000, profit: 157500, orders: 2800, aov: 165.00, yoy_growth_pct: 30.1 },
  { month: '2024-10', label: 'Oct 24', revenue: 510000, profit: 174000, orders: 3060, aov: 166.67, yoy_growth_pct: 30.8 },
  { month: '2024-11', label: 'Nov 24', revenue: 760000, profit: 247000, orders: 4520, aov: 168.14, yoy_growth_pct: 31.0 },
  { month: '2024-12', label: 'Dec 24', revenue: 840000, profit: 273000, orders: 4950, aov: 169.70, yoy_growth_pct: 31.2 },
];

export const CATEGORY_METRICS_DATA: CategoryMetric[] = [
  {
    category_name: 'Electronics',
    revenue: 3380000,
    profit: 757000,
    orders: 14200,
    units_sold: 18500,
    profit_margin_pct: 22.4,
    revenue_share_pct: 34.6
  },
  {
    category_name: 'Computers & Office',
    revenue: 2050000,
    profit: 574000,
    orders: 8600,
    units_sold: 11200,
    profit_margin_pct: 28.0,
    revenue_share_pct: 21.0
  },
  {
    category_name: 'Home & Kitchen',
    revenue: 1650000,
    profit: 594000,
    orders: 9800,
    units_sold: 14100,
    profit_margin_pct: 36.0,
    revenue_share_pct: 16.9
  },
  {
    category_name: 'Apparel & Fashion',
    revenue: 1420000,
    profit: 636000,
    orders: 11400,
    units_sold: 21000,
    profit_margin_pct: 44.8,
    revenue_share_pct: 14.5
  },
  {
    category_name: 'Fitness & Outdoors',
    revenue: 880000,
    profit: 360000,
    orders: 6200,
    units_sold: 9400,
    profit_margin_pct: 40.9,
    revenue_share_pct: 9.0
  },
  {
    category_name: 'Beauty & Personal Care',
    revenue: 390000,
    profit: 191000,
    orders: 4100,
    units_sold: 8600,
    profit_margin_pct: 49.0,
    revenue_share_pct: 4.0
  }
];

export const STATE_METRICS_DATA: StateMetric[] = [
  { state: 'California', revenue: 2680000, orders: 15400, customers: 3120, avg_delivery_days: 2.3 },
  { state: 'New York', revenue: 1950000, orders: 11200, customers: 2450, avg_delivery_days: 2.7 },
  { state: 'Texas', revenue: 1480000, orders: 8900, customers: 1890, avg_delivery_days: 3.4 },
  { state: 'Washington', revenue: 980000, orders: 5800, customers: 1210, avg_delivery_days: 2.6 },
  { state: 'Illinois', revenue: 920000, orders: 5400, customers: 1150, avg_delivery_days: 3.1 },
  { state: 'Florida', revenue: 840000, orders: 4900, customers: 1040, avg_delivery_days: 3.6 },
  { state: 'Colorado', revenue: 520000, orders: 3100, customers: 680, avg_delivery_days: 4.2 },
  { state: 'Massachusetts', revenue: 400000, orders: 2500, customers: 560, avg_delivery_days: 2.8 }
];

export const TOP_PRODUCTS_DATA: Product[] = [
  {
    product_id: 'PRD-1001',
    product_name: 'AeroPro Noise-Cancelling Headphones',
    category_id: 'CAT-001',
    category_name: 'Electronics',
    subcategory: 'Headphones',
    brand: 'SonicWave',
    cost_price: 145.00,
    selling_price: 299.99,
    stock_quantity: 420,
    supplier_id: 'SEL-101',
    units_sold: 2150,
    revenue: 644978,
    profit: 333228,
    profit_margin_pct: 51.7
  },
  {
    product_id: 'PRD-1002',
    product_name: 'UltraVision 34-Inch Curved Gaming Monitor',
    category_id: 'CAT-002',
    category_name: 'Computers & Office',
    subcategory: 'Monitors',
    brand: 'Titan',
    cost_price: 320.00,
    selling_price: 549.99,
    stock_quantity: 185,
    supplier_id: 'SEL-104',
    units_sold: 940,
    revenue: 516990,
    profit: 216190,
    profit_margin_pct: 41.8
  },
  {
    product_id: 'PRD-1004',
    product_name: 'Artisan Espresso & Cappuccino Maker',
    category_id: 'CAT-003',
    category_name: 'Home & Kitchen',
    subcategory: 'Appliances',
    brand: 'BaristaCraft',
    cost_price: 180.00,
    selling_price: 379.99,
    stock_quantity: 140,
    supplier_id: 'SEL-103',
    units_sold: 1120,
    revenue: 425588,
    profit: 223988,
    profit_margin_pct: 52.6
  },
  {
    product_id: 'PRD-1003',
    product_name: 'SmartPulse Health & Fitness Smartwatch',
    category_id: 'CAT-001',
    category_name: 'Electronics',
    subcategory: 'Wearables',
    brand: 'PulseTech',
    cost_price: 78.50,
    selling_price: 189.99,
    stock_quantity: 610,
    supplier_id: 'SEL-101',
    units_sold: 2100,
    revenue: 398979,
    profit: 234129,
    profit_margin_pct: 58.7
  },
  {
    product_id: 'PRD-1006',
    product_name: 'Apex Pro Mechanical Keyboard (Hot-Swap)',
    category_id: 'CAT-002',
    category_name: 'Computers & Office',
    subcategory: 'Keyboards',
    brand: 'KeyMatrix',
    cost_price: 55.00,
    selling_price: 149.99,
    stock_quantity: 390,
    supplier_id: 'SEL-104',
    units_sold: 1850,
    revenue: 277481,
    profit: 175731,
    profit_margin_pct: 63.3
  },
  {
    product_id: 'PRD-1005',
    product_name: 'Merino Wool Ergonomic Tech Hoodie',
    category_id: 'CAT-004',
    category_name: 'Apparel & Fashion',
    subcategory: 'Outerwear',
    brand: 'AlpineThread',
    cost_price: 42.00,
    selling_price: 119.50,
    stock_quantity: 850,
    supplier_id: 'SEL-102',
    units_sold: 2180,
    revenue: 260510,
    profit: 168950,
    profit_margin_pct: 64.9
  },
  {
    product_id: 'PRD-1009',
    product_name: 'PureBreeze HEPA True Air Purifier',
    category_id: 'CAT-003',
    category_name: 'Home & Kitchen',
    subcategory: 'Home Tech',
    brand: 'CleanAir Co',
    cost_price: 95.00,
    selling_price: 229.00,
    stock_quantity: 215,
    supplier_id: 'SEL-103',
    units_sold: 1040,
    revenue: 238160,
    profit: 139360,
    profit_margin_pct: 58.5
  },
  {
    product_id: 'PRD-1010',
    product_name: 'Velocity Carbon-Plate Running Shoes',
    category_id: 'CAT-005',
    category_name: 'Fitness & Outdoors',
    subcategory: 'Footwear',
    brand: 'Strider',
    cost_price: 62.00,
    selling_price: 175.00,
    stock_quantity: 430,
    supplier_id: 'SEL-105',
    units_sold: 1290,
    revenue: 225750,
    profit: 145770,
    profit_margin_pct: 64.6
  },
  {
    product_id: 'PRD-1008',
    product_name: 'Luxe Radiant Night Repair Face Serum',
    category_id: 'CAT-006',
    category_name: 'Beauty & Personal Care',
    subcategory: 'Skincare',
    brand: 'GlowBotanics',
    cost_price: 14.50,
    selling_price: 68.00,
    stock_quantity: 750,
    supplier_id: 'SEL-102',
    units_sold: 2450,
    revenue: 166600,
    profit: 131075,
    profit_margin_pct: 78.7
  },
  {
    product_id: 'PRD-1007',
    product_name: 'HydroGrip Insulated Titanium Water Bottle',
    category_id: 'CAT-005',
    category_name: 'Fitness & Outdoors',
    subcategory: 'Hydration',
    brand: 'SummitGear',
    cost_price: 8.20,
    selling_price: 34.99,
    stock_quantity: 1200,
    supplier_id: 'SEL-105',
    units_sold: 3400,
    revenue: 118966,
    profit: 91086,
    profit_margin_pct: 76.6
  }
];

export const BOTTOM_PRODUCTS_DATA: Product[] = [
  {
    product_id: 'PRD-1031',
    product_name: 'Basic USB-C 1m Nylon Cord',
    category_id: 'CAT-002',
    category_name: 'Computers & Office',
    subcategory: 'Cables',
    brand: 'HyperPort',
    cost_price: 5.50,
    selling_price: 8.99,
    stock_quantity: 45,
    supplier_id: 'SEL-104',
    units_sold: 28,
    revenue: 251.72,
    profit: 97.72,
    profit_margin_pct: 38.8
  },
  {
    product_id: 'PRD-1032',
    product_name: 'Standard Cotton Crew Socks (Single Pack)',
    category_id: 'CAT-004',
    category_name: 'Apparel & Fashion',
    subcategory: 'Accessories',
    brand: 'UrbanKnit',
    cost_price: 3.20,
    selling_price: 5.00,
    stock_quantity: 80,
    supplier_id: 'SEL-102',
    units_sold: 42,
    revenue: 210.00,
    profit: 75.60,
    profit_margin_pct: 36.0
  },
  {
    product_id: 'PRD-1033',
    product_name: 'Microfiber Lens Cleaning Cloth (2-Pack)',
    category_id: 'CAT-001',
    category_name: 'Electronics',
    subcategory: 'Accessories',
    brand: 'OptiView',
    cost_price: 2.10,
    selling_price: 4.50,
    stock_quantity: 110,
    supplier_id: 'SEL-101',
    units_sold: 35,
    revenue: 157.50,
    profit: 84.00,
    profit_margin_pct: 53.3
  }
];

export const CUSTOMER_SEGMENTS_SUMMARY = [
  { segment: 'Champions', count: 1640, pct: 16.4, avgSpend: 1120.40, revenueShare: 48.2, recencyAvg: 14, frequencyAvg: 5.4, description: 'Bought recently, buy often, spend the most' },
  { segment: 'Loyal Customers', count: 2180, pct: 21.8, avgSpend: 540.20, revenueShare: 24.5, recencyAvg: 32, frequencyAvg: 3.2, description: 'Regular buyers, responsive to promotions' },
  { segment: 'Potential Loyalists', count: 1850, pct: 18.5, avgSpend: 280.60, revenueShare: 11.2, recencyAvg: 22, frequencyAvg: 1.8, description: 'Recent customers with average spend' },
  { segment: 'New Customers', count: 1250, pct: 12.5, avgSpend: 165.00, revenueShare: 4.8, recencyAvg: 11, frequencyAvg: 1.0, description: 'Bought recently for the first time' },
  { segment: 'At Risk', count: 1240, pct: 12.4, avgSpend: 490.10, revenueShare: 7.6, recencyAvg: 95, frequencyAvg: 3.1, description: 'Purchased often but inactive for 60+ days' },
  { segment: 'Cannot Lose Them', count: 380, pct: 3.8, avgSpend: 920.00, revenueShare: 2.8, recencyAvg: 135, frequencyAvg: 4.6, description: 'Made big purchases long ago, needs winback' },
  { segment: 'Hibernating', count: 1460, pct: 14.6, avgSpend: 78.50, revenueShare: 0.9, recencyAvg: 180, frequencyAvg: 1.1, description: 'Low frequency, low spend, inactive' },
];

export const REPRESENTATIVE_CUSTOMERS: Customer[] = [
  {
    customer_id: 'CUST-00101',
    first_name: 'Eleanor',
    last_name: 'Vance',
    gender: 'Female',
    age: 34,
    email: 'eleanor.vance@example.com',
    phone: '+1-415-555-0142',
    city: 'San Francisco',
    state: 'California',
    signup_date: '2023-01-12',
    customer_segment: 'Champions',
    recency: 8,
    frequency: 7,
    monetary: 2140.50,
    rfm_score: '555'
  },
  {
    customer_id: 'CUST-00102',
    first_name: 'Marcus',
    last_name: 'Chen',
    gender: 'Male',
    age: 29,
    email: 'marcus.chen@example.com',
    phone: '+1-206-555-0189',
    city: 'Seattle',
    state: 'Washington',
    signup_date: '2023-02-04',
    customer_segment: 'Loyal Customers',
    recency: 24,
    frequency: 4,
    monetary: 920.00,
    rfm_score: '444'
  },
  {
    customer_id: 'CUST-00103',
    first_name: 'Sarah',
    last_name: 'Jenkins',
    gender: 'Female',
    age: 42,
    email: 'sarah.j@example.com',
    phone: '+1-512-555-0111',
    city: 'Austin',
    state: 'Texas',
    signup_date: '2023-03-18',
    customer_segment: 'Champions',
    recency: 12,
    frequency: 6,
    monetary: 1850.25,
    rfm_score: '555'
  },
  {
    customer_id: 'CUST-00104',
    first_name: 'David',
    last_name: 'Kowalski',
    gender: 'Male',
    age: 51,
    email: 'dkowalski@example.com',
    phone: '+1-312-555-0177',
    city: 'Chicago',
    state: 'Illinois',
    signup_date: '2023-04-22',
    customer_segment: 'Potential Loyalists',
    recency: 20,
    frequency: 2,
    monetary: 340.00,
    rfm_score: '423'
  },
  {
    customer_id: 'CUST-00105',
    first_name: 'Amina',
    last_name: 'Diallo',
    gender: 'Female',
    age: 27,
    email: 'amina.d@example.com',
    phone: '+1-212-555-0163',
    city: 'New York',
    state: 'New York',
    signup_date: '2023-05-30',
    customer_segment: 'Champions',
    recency: 6,
    frequency: 8,
    monetary: 2680.00,
    rfm_score: '555'
  },
  {
    customer_id: 'CUST-00106',
    first_name: 'Liam',
    last_name: "O'Connor",
    gender: 'Male',
    age: 38,
    email: 'liam.oc@example.com',
    phone: '+1-617-555-0194',
    city: 'Boston',
    state: 'Massachusetts',
    signup_date: '2023-07-14',
    customer_segment: 'At Risk',
    recency: 104,
    frequency: 4,
    monetary: 780.00,
    rfm_score: '144'
  },
  {
    customer_id: 'CUST-00107',
    first_name: 'Priya',
    last_name: 'Sharma',
    gender: 'Female',
    age: 31,
    email: 'priya.sharma@example.com',
    phone: '+1-408-555-0133',
    city: 'San Jose',
    state: 'California',
    signup_date: '2023-08-09',
    customer_segment: 'Loyal Customers',
    recency: 31,
    frequency: 3,
    monetary: 640.00,
    rfm_score: '433'
  },
  {
    customer_id: 'CUST-00108',
    first_name: 'James',
    last_name: 'Wilson',
    gender: 'Male',
    age: 45,
    email: 'jwilson@example.com',
    phone: '+1-305-555-0155',
    city: 'Miami',
    state: 'Florida',
    signup_date: '2023-09-21',
    customer_segment: 'Hibernating',
    recency: 195,
    frequency: 1,
    monetary: 65.00,
    rfm_score: '111'
  },
  {
    customer_id: 'CUST-00109',
    first_name: 'Elena',
    last_name: 'Rostova',
    gender: 'Female',
    age: 24,
    email: 'elena.r@example.com',
    phone: '+1-720-555-0128',
    city: 'Denver',
    state: 'Colorado',
    signup_date: '2024-02-05',
    customer_segment: 'New Customers',
    recency: 15,
    frequency: 1,
    monetary: 175.00,
    rfm_score: '512'
  },
  {
    customer_id: 'CUST-00110',
    first_name: 'Carlos',
    last_name: 'Mendoza',
    gender: 'Male',
    age: 36,
    email: 'carlos.m@example.com',
    phone: '+1-602-555-0199',
    city: 'Phoenix',
    state: 'Arizona',
    signup_date: '2023-12-19',
    customer_segment: 'Cannot Lose Them',
    recency: 142,
    frequency: 5,
    monetary: 1420.00,
    rfm_score: '155'
  }
];

export const SAMPLE_ORDERS: Order[] = [
  {
    order_id: 'ORD-09412',
    customer_id: 'CUST-00101',
    customer_name: 'Eleanor Vance',
    order_date: '2024-11-18 14:22:00',
    order_status: 'Delivered',
    payment_method: 'Credit Card',
    shipping_type: 'Express Delivery',
    shipping_cost: 14.99,
    delivery_date: '2024-11-20 11:30:00',
    delivery_days: 1.9,
    city: 'San Francisco',
    state: 'California',
    total_amount: 349.98,
    total_profit: 178.50,
    item_count: 2
  },
  {
    order_id: 'ORD-09413',
    customer_id: 'CUST-00102',
    customer_name: 'Marcus Chen',
    order_date: '2024-11-19 16:05:00',
    order_status: 'Delivered',
    payment_method: 'PayPal',
    shipping_type: 'Standard Shipping',
    shipping_cost: 5.99,
    delivery_date: '2024-11-23 15:40:00',
    delivery_days: 4.0,
    city: 'Seattle',
    state: 'Washington',
    total_amount: 549.99,
    total_profit: 216.19,
    item_count: 1
  },
  {
    order_id: 'ORD-09414',
    customer_id: 'CUST-00105',
    customer_name: 'Amina Diallo',
    order_date: '2024-11-20 10:14:00',
    order_status: 'Delivered',
    payment_method: 'Credit Card',
    shipping_type: 'Same Day',
    shipping_cost: 24.99,
    delivery_date: '2024-11-20 19:10:00',
    delivery_days: 0.4,
    city: 'New York',
    state: 'New York',
    total_amount: 299.99,
    total_profit: 148.20,
    item_count: 1
  },
  {
    order_id: 'ORD-09415',
    customer_id: 'CUST-00106',
    customer_name: "Liam O'Connor",
    order_date: '2024-11-21 11:45:00',
    order_status: 'Returned',
    payment_method: 'Credit Card',
    shipping_type: 'Standard Shipping',
    shipping_cost: 5.99,
    delivery_date: '2024-11-26 13:20:00',
    delivery_days: 5.1,
    city: 'Boston',
    state: 'Massachusetts',
    total_amount: 119.50,
    total_profit: 74.50,
    item_count: 1
  },
  {
    order_id: 'ORD-09416',
    customer_id: 'CUST-00108',
    customer_name: 'James Wilson',
    order_date: '2024-11-22 09:30:00',
    order_status: 'Cancelled',
    payment_method: 'Credit Card',
    shipping_type: 'Standard Shipping',
    shipping_cost: 0.0,
    delivery_date: null,
    delivery_days: null,
    city: 'Miami',
    state: 'Florida',
    total_amount: 189.99,
    total_profit: 98.40,
    item_count: 1
  }
];

export const SHIPPING_PERFORMANCE_DATA = [
  { type: 'Standard Shipping', volume: 29000, avgDays: 4.8, onTimePct: 92.4, returnRate: 5.8, cost: 5.99 },
  { type: 'Express Delivery', volume: 13000, avgDays: 2.1, onTimePct: 97.2, returnRate: 2.9, cost: 14.99 },
  { type: 'Same Day', volume: 4000, avgDays: 0.5, onTimePct: 98.5, returnRate: 2.1, cost: 24.99 },
  { type: 'Overnight Delivery', volume: 4000, avgDays: 1.1, onTimePct: 96.8, returnRate: 3.1, cost: 19.99 }
];

export const PAYMENT_DISTRIBUTION_DATA = [
  { method: 'Credit Card', count: 22500, share: 45.0, aov: 162.40 },
  { method: 'Debit Card', count: 11000, share: 22.0, aov: 138.50 },
  { method: 'PayPal', count: 9000, share: 18.0, aov: 154.20 },
  { method: 'UPI / NetBanking', count: 5500, share: 11.0, aov: 141.10 },
  { method: 'Cash on Delivery', count: 2000, share: 4.0, aov: 112.80 }
];

export const DAX_MEASURES_DATA: DaxMeasureItem[] = [
  {
    name: 'Total Revenue',
    category: 'Sales',
    formula: 'Total Revenue = SUM(FactOrderItems[total_amount])',
    explanation: 'Calculates the net top-line monetary revenue across all line items after deducting customer coupons and promotional discounts.'
  },
  {
    name: 'Total Profit',
    category: 'Profitability',
    formula: 'Total Profit = SUM(FactOrderItems[profit])',
    explanation: 'Calculates cumulative gross profit by taking (total_amount - (quantity * cost_price)).'
  },
  {
    name: 'Profit Margin %',
    category: 'Profitability',
    formula: 'Profit Margin % = DIVIDE([Total Profit], [Total Revenue], 0)',
    explanation: 'Safe division measure computing the percentage of revenue captured as gross margin.'
  },
  {
    name: 'Average Order Value (AOV)',
    category: 'Sales',
    formula: 'Average Order Value = DIVIDE([Total Revenue], [Total Orders], 0)',
    explanation: 'Determines the average dollar amount spent each time an individual customer places an invoice.'
  },
  {
    name: 'YoY Revenue Growth %',
    category: 'Time-Intelligence',
    formula: 'YoY Revenue Growth % =\nVAR CurrentRev = [Total Revenue]\nVAR PriorRev = CALCULATE([Total Revenue], SAMEPERIODLASTYEAR(DimDate[Date]))\nRETURN DIVIDE(CurrentRev - PriorRev, PriorRev, 0)',
    explanation: 'Evaluates year-over-year revenue expansion or contraction by comparing current period against the same calendar span in the prior year.'
  },
  {
    name: 'Repeat Customer Rate %',
    category: 'Customer & Retention',
    formula: 'Repeat Customer Rate % =\nVAR RepeatCust = COUNTROWS(FILTER(VALUES(FactOrders[customer_id]), CALCULATE(DISTINCTCOUNT(FactOrders[order_id])) > 1))\nVAR TotalCust = [Total Customers]\nRETURN DIVIDE(RepeatCust, TotalCust, 0)',
    explanation: 'Measures buyer loyalty by calculating the ratio of customers who have transacted 2 or more times.'
  },
  {
    name: 'Average Delivery Days',
    category: 'Operations',
    formula: 'Average Delivery Days =\nAVERAGEX(\n    FILTER(FactOrders, FactOrders[order_status] = "Delivered" && NOT(ISBLANK(FactOrders[delivery_date]))),\n    DATEDIFF(FactOrders[order_date], FactOrders[delivery_date], DAY)\n)',
    explanation: 'Calculates the exact average transit latency in days between order timestamp and physical customer delivery.'
  },
  {
    name: 'Return Rate %',
    category: 'Operations',
    formula: 'Return Rate % = DIVIDE(CALCULATE(COUNTROWS(FactOrders), FactOrders[order_status] = "Returned"), COUNTROWS(FactOrders), 0)',
    explanation: 'Measures order reverse-logistics rate to monitor product defect rates or customer dissatisfaction.'
  }
];

export const SQL_BUSINESS_QUERIES: SqlQueryItem[] = [
  {
    id: 1,
    title: '1. Total Gross Revenue & Profit Calculation',
    category: 'Overview',
    sql: `SELECT 
    ROUND(SUM(total_amount), 2) AS total_revenue,
    ROUND(SUM(profit), 2) AS total_profit,
    COUNT(DISTINCT order_id) AS total_orders
FROM order_items oi
JOIN orders o ON oi.order_id = o.order_id
WHERE o.order_status NOT IN ('Cancelled');`,
    description: 'Calculates global revenue, net profit, and completed orders excluding cancelled checkouts.',
    executionMs: 14
  },
  {
    id: 2,
    title: '2. Total Profit and Profit Margin Percentage',
    category: 'Overview',
    sql: `SELECT 
    ROUND(SUM(profit), 2) AS total_net_profit,
    ROUND(SUM(total_amount), 2) AS gross_revenue,
    ROUND((SUM(profit) / NULLIF(SUM(total_amount), 0)) * 100, 2) AS overall_profit_margin_pct
FROM order_items oi
JOIN orders o ON oi.order_id = o.order_id
WHERE o.order_status IN ('Delivered', 'Shipped');`,
    description: 'Calculates the overall company profit margin on fulfilled and in-transit orders.',
    executionMs: 16
  },
  {
    id: 3,
    title: '3. Monthly Revenue Trend & Month-over-Month Growth (LAG)',
    category: 'Sales Trends',
    sql: `WITH monthly_sales AS (
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
ORDER BY sales_month ASC;`,
    description: 'Uses LAG() window function to calculate month-over-month growth trajectory.',
    executionMs: 22
  },
  {
    id: 4,
    title: '4. Top 10 Products by Revenue (DENSE_RANK)',
    category: 'Products',
    sql: `SELECT 
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
LIMIT 10;`,
    description: 'Ranks the highest revenue drivers across all product SKUs.',
    executionMs: 19
  },
  {
    id: 5,
    title: '5. Top 10 Most Profitable Products (RANK)',
    category: 'Products',
    sql: `SELECT 
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
LIMIT 10;`,
    description: 'Identifies the greatest contributors to net income and their margin percentage.',
    executionMs: 18
  },
  {
    id: 6,
    title: '6. Category Performance: Sales, Profit & Margin',
    category: 'Sales Trends',
    sql: `SELECT 
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
ORDER BY category_revenue DESC;`,
    description: 'Aggregates volume, top-line sales, bottom-line earnings, and margins by category.',
    executionMs: 17
  },
  {
    id: 7,
    title: '7. Regional Performance: Top States by Revenue',
    category: 'Sales Trends',
    sql: `SELECT 
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
LIMIT 10;`,
    description: 'Pinpoints geographic sales hubs and customer density across states.',
    executionMs: 15
  },
  {
    id: 8,
    title: '8. Top 10 Customers by Lifetime Spend',
    category: 'Customers & RFM',
    sql: `SELECT 
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
LIMIT 10;`,
    description: 'Extracts the highest-spending VIP accounts and their RFM segment classification.',
    executionMs: 20
  },
  {
    id: 9,
    title: '9. Repeat Customer Percentage Calculation (CTE)',
    category: 'Customers & RFM',
    sql: `WITH customer_order_counts AS (
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
FROM customer_order_counts;`,
    description: 'Computes the proportion of active accounts that placed more than one order.',
    executionMs: 16
  },
  {
    id: 10,
    title: '10. Average Order Value (AOV) Distribution',
    category: 'Overview',
    sql: `WITH order_values AS (
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
FROM order_values;`,
    description: 'Calculates mean, min, and max invoice values across all historical baskets.',
    executionMs: 14
  },
  {
    id: 11,
    title: '11. Peak Sales Month in Historical Records',
    category: 'Sales Trends',
    sql: `SELECT 
    TO_CHAR(o.order_date, 'YYYY-MM') AS year_month,
    ROUND(SUM(oi.total_amount), 2) AS monthly_revenue,
    COUNT(DISTINCT o.order_id) AS order_volume
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
WHERE o.order_status NOT IN ('Cancelled')
GROUP BY TO_CHAR(o.order_date, 'YYYY-MM')
ORDER BY monthly_revenue DESC
LIMIT 1;`,
    description: 'Pinpoints the highest grossing single month in company history.',
    executionMs: 15
  },
  {
    id: 12,
    title: '12. Declining Product Sales Detection (LAG)',
    category: 'Advanced Window',
    sql: `WITH quarterly_product_sales AS (
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
LIMIT 10;`,
    description: 'Detects SKUs with negative quarter-over-quarter sales velocity.',
    executionMs: 25
  },
  {
    id: 13,
    title: '13. High-Value Inactive Customers (Churn Risk > 90 Days)',
    category: 'Customers & RFM',
    sql: `WITH customer_recency AS (
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
LIMIT 10;`,
    description: 'Flags historical big spenders who have not placed an order in over 90 days.',
    executionMs: 21
  },
  {
    id: 14,
    title: '14. Quarterly Customer Retention Rate (Self-Join CTE)',
    category: 'Customers & RFM',
    sql: `WITH customer_quarters AS (
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
ORDER BY base_quarter ASC;`,
    description: 'Measures the proportion of active accounts retained quarter-over-quarter.',
    executionMs: 27
  },
  {
    id: 15,
    title: '15. Order Cancellation Rate by State',
    category: 'Logistics & Operations',
    sql: `SELECT 
    state,
    COUNT(order_id) AS total_orders,
    COUNT(CASE WHEN order_status = 'Cancelled' THEN 1 END) AS cancelled_orders,
    ROUND((COUNT(CASE WHEN order_status = 'Cancelled' THEN 1 END)::NUMERIC / NULLIF(COUNT(order_id), 0)) * 100, 2) AS cancellation_rate_pct
FROM orders
GROUP BY state
HAVING COUNT(order_id) >= 50
ORDER BY cancellation_rate_pct DESC
LIMIT 10;`,
    description: 'Monitors regional checkout abandonment and fulfillment cancellation rates.',
    executionMs: 15
  },
  {
    id: 16,
    title: '16. Category Return Rates Analysis',
    category: 'Logistics & Operations',
    sql: `SELECT 
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
ORDER BY return_rate_pct DESC;`,
    description: 'Identifies merchandise return rates by product vertical.',
    executionMs: 18
  },
  {
    id: 17,
    title: '17. Most Popular Payment Methods & Share of Volume',
    category: 'Overview',
    sql: `SELECT 
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
ORDER BY transaction_count DESC;`,
    description: 'Breaks down checkout preferences and transaction values.',
    executionMs: 16
  },
  {
    id: 18,
    title: '18. Shipping Method Fulfillment Speed & Volume',
    category: 'Logistics & Operations',
    sql: `SELECT 
    shipping_type,
    COUNT(order_id) AS order_volume,
    ROUND(AVG(DATE_PART('day', delivery_date - order_date)), 2) AS avg_delivery_days,
    ROUND(MIN(DATE_PART('day', delivery_date - order_date)), 1) AS min_delivery_days,
    ROUND(MAX(DATE_PART('day', delivery_date - order_date)), 1) AS max_delivery_days,
    ROUND(SUM(shipping_cost), 2) AS total_shipping_revenue
FROM orders
WHERE order_status = 'Delivered' AND delivery_date IS NOT NULL
GROUP BY shipping_type
ORDER BY avg_delivery_days ASC;`,
    description: 'Evaluates fulfillment transit times across shipping tiers.',
    executionMs: 17
  },
  {
    id: 19,
    title: '19. Average Delivery Time Across States',
    category: 'Logistics & Operations',
    sql: `SELECT 
    state,
    COUNT(order_id) AS delivered_orders,
    ROUND(AVG(DATE_PART('day', delivery_date - order_date)), 2) AS avg_fulfillment_days
FROM orders
WHERE order_status = 'Delivered' AND delivery_date IS NOT NULL
GROUP BY state
ORDER BY avg_fulfillment_days ASC
LIMIT 10;`,
    description: 'Measures state fulfillment latency to highlight regional logistics bottlenecks.',
    executionMs: 16
  },
  {
    id: 20,
    title: '20. Top Customer Lifetime Value (CLV) & Basket Size (DENSE_RANK)',
    category: 'Customers & RFM',
    sql: `SELECT 
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
LIMIT 10;`,
    description: 'Ranks customers by total historical CLV and frequency of purchase.',
    executionMs: 20
  },
  {
    id: 21,
    title: '21. Category Profit Margin Leaderboard',
    category: 'Sales Trends',
    sql: `SELECT 
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
ORDER BY profit_margin_percentage DESC;`,
    description: 'Highlights which retail categories generate the highest margin efficiency.',
    executionMs: 16
  },
  {
    id: 22,
    title: '22. High Sales Volume but Low Profit Margin Products',
    category: 'Products',
    sql: `SELECT 
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
HAVING SUM(oi.total_amount) > 5000 AND (SUM(oi.profit) / NULLIF(SUM(oi.total_amount), 0)) < 0.15
ORDER BY total_revenue DESC
LIMIT 10;`,
    description: 'Surfaces popular SKUs with margin compression needing price adjustments.',
    executionMs: 19
  },
  {
    id: 23,
    title: '23. Low Sales Volume but High Margin Products (Hidden Gems)',
    category: 'Products',
    sql: `SELECT 
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
LIMIT 10;`,
    description: 'Finds high-margin SKUs with prime promotional and cross-selling potential.',
    executionMs: 18
  },
  {
    id: 24,
    title: '24. Year-over-Year (YoY) Sales Comparison (LAG & PARTITION)',
    category: 'Advanced Window',
    sql: `WITH monthly_metrics AS (
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
ORDER BY order_month, order_year;`,
    description: 'Compares each month against the same calendar month of the previous year.',
    executionMs: 23
  },
  {
    id: 25,
    title: '25. Category Share of Total Revenue (Window SUM OVER)',
    category: 'Advanced Window',
    sql: `WITH cat_sales AS (
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
ORDER BY category_revenue DESC;`,
    description: 'Calculates overall portfolio revenue contribution using SUM() OVER() window.',
    executionMs: 17
  }
];
