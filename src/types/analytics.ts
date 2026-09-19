export type TabType = 'dashboard' | 'sql' | 'python' | 'datamodel' | 'reports' | 'files';

export type DashboardPage = 'executive' | 'sales' | 'customer' | 'product' | 'operations';
export type DashboardSubPage = 'executive' | 'sales' | 'customers' | 'products' | 'operations';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  avatarInitials: string;
  accessLevel: 'Admin' | 'Analyst' | 'Executive';
}

export interface Customer {
  customer_id: string;
  first_name: string;
  last_name: string;
  gender: string;
  age: number;
  email: string;
  phone: string;
  city: string;
  state: string;
  signup_date: string;
  customer_segment: CustomerSegment;
  recency: number;
  frequency: number;
  monetary: number;
  rfm_score: string;
}

export type CustomerSegment = 
  | 'Champions'
  | 'Loyal Customers'
  | 'Potential Loyalists'
  | 'New Customers'
  | 'At Risk'
  | 'Cannot Lose Them'
  | 'Hibernating';

export interface Product {
  product_id: string;
  product_name: string;
  category_id: string;
  category_name: string;
  subcategory: string;
  brand: string;
  cost_price: number;
  selling_price: number;
  stock_quantity: number;
  supplier_id: string;
  units_sold: number;
  revenue: number;
  profit: number;
  profit_margin_pct: number;
}

export interface OrderItem {
  order_item_id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  category_name: string;
  quantity: number;
  unit_price: number;
  discount_pct: number;
  total_amount: number;
  profit: number;
}

export interface Order {
  order_id: string;
  customer_id: string;
  customer_name: string;
  order_date: string;
  order_status: 'Delivered' | 'Shipped' | 'Processing' | 'Cancelled' | 'Returned';
  payment_method: 'Credit Card' | 'Debit Card' | 'PayPal' | 'UPI / NetBanking' | 'Cash on Delivery';
  shipping_type: 'Standard Shipping' | 'Express Delivery' | 'Same Day' | 'Overnight Delivery';
  shipping_cost: number;
  delivery_date: string | null;
  delivery_days: number | null;
  city: string;
  state: string;
  total_amount: number;
  total_profit: number;
  item_count: number;
}

export interface CategoryMetric {
  category_name: string;
  revenue: number;
  profit: number;
  orders: number;
  units_sold: number;
  profit_margin_pct: number;
  revenue_share_pct: number;
}

export interface MonthlyTrend {
  month: string; // e.g. "2023-01"
  label: string; // e.g. "Jan 2023"
  revenue: number;
  profit: number;
  orders: number;
  aov: number;
  yoy_growth_pct?: number;
}

export interface StateMetric {
  state: string;
  revenue: number;
  orders: number;
  customers: number;
  avg_delivery_days: number;
}

export interface GlobalFilterState {
  dateRange: 'all' | '2023' | '2024' | 'q4_2023' | 'q1_2024';
  category: string;
  state: string;
  segment: string;
  paymentMethod: string;
  orderStatus: string;
}

export interface SqlQueryItem {
  id: number;
  title: string;
  category: 'Overview' | 'Sales Trends' | 'Products' | 'Customers & RFM' | 'Logistics & Operations' | 'Advanced Window';
  sql: string;
  description: string;
  executionMs: number;
}

export interface DaxMeasureItem {
  name: string;
  category: 'Sales' | 'Profitability' | 'Time-Intelligence' | 'Customer & Retention' | 'Operations';
  formula: string;
  explanation: string;
}
