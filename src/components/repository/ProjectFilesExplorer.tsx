import React, { useState } from 'react';
import { 
  FolderGit2, 
  FileCode, 
  FileText, 
  Download, 
  Copy, 
  Check, 
  Terminal, 
  ChevronRight,
  Database,
  Code2
} from 'lucide-react';

interface RepoFile {
  path: string;
  name: string;
  type: 'sql' | 'python' | 'markdown' | 'config';
  description: string;
  preview: string;
}

const REPO_FILES: RepoFile[] = [
  {
    path: 'database/schema.sql',
    name: 'schema.sql',
    type: 'sql',
    description: 'PostgreSQL Relational Schema with tables, PK/FK constraints, indexes & analytical views',
    preview: `-- E-Commerce Relational Database Schema (PostgreSQL)
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS sellers CASCADE;

CREATE TABLE customers (
    customer_id VARCHAR(20) PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    gender VARCHAR(10),
    age INT CHECK (age >= 18),
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    city VARCHAR(50),
    state VARCHAR(50),
    signup_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    customer_segment VARCHAR(30)
);

CREATE TABLE categories (
    category_id VARCHAR(20) PRIMARY KEY,
    category_name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT
);

CREATE TABLE products (
    product_id VARCHAR(20) PRIMARY KEY,
    product_name VARCHAR(150) NOT NULL,
    category_id VARCHAR(20) REFERENCES categories(category_id),
    subcategory VARCHAR(50),
    brand VARCHAR(50),
    cost_price NUMERIC(10, 2) NOT NULL CHECK (cost_price >= 0),
    selling_price NUMERIC(10, 2) NOT NULL CHECK (selling_price >= cost_price),
    stock_quantity INT DEFAULT 0
);`
  },
  {
    path: 'database/business_queries.sql',
    name: 'business_queries.sql',
    type: 'sql',
    description: '25 Advanced SQL Business Queries (CTEs, Window Functions, DENSE_RANK, LAG, Aggregations)',
    preview: `-- 25 Production Business Queries for E-Commerce Analytics
-- 1. Total Revenue, Net Profit & Orders
SELECT 
    ROUND(SUM(total_amount), 2) AS total_revenue,
    ROUND(SUM(profit), 2) AS total_profit,
    COUNT(DISTINCT order_id) AS total_orders
FROM order_items oi
JOIN orders o ON oi.order_id = o.order_id
WHERE o.order_status NOT IN ('Cancelled');

-- 3. Monthly Revenue Trend & MoM Growth (LAG)
WITH monthly_sales AS (
    SELECT 
        DATE_TRUNC('month', o.order_date)::DATE AS sales_month,
        ROUND(SUM(oi.total_amount), 2) AS monthly_revenue
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    WHERE o.order_status NOT IN ('Cancelled')
    GROUP BY DATE_TRUNC('month', o.order_date)
)
SELECT 
    sales_month,
    monthly_revenue,
    LAG(monthly_revenue, 1) OVER (ORDER BY sales_month) AS prev_month_revenue,
    ROUND(((monthly_revenue - LAG(monthly_revenue, 1) OVER (ORDER BY sales_month)) 
    / NULLIF(LAG(monthly_revenue, 1) OVER (ORDER BY sales_month), 0)) * 100, 2) AS mom_growth_pct
FROM monthly_sales;`
  },
  {
    path: 'python/data_cleaning.py',
    name: 'data_cleaning.py',
    type: 'python',
    description: 'Pandas Data Cleaning Pipeline with deduplication, date validation, and domain constraints',
    preview: `import pandas as pd
import numpy as np

def clean_ecommerce_data():
    print("Starting Automated Data Cleaning Pipeline...")
    
    # 1. Deduplication
    orders_df = pd.read_csv('data/raw/orders_raw.csv')
    init_orders = len(orders_df)
    orders_df.drop_duplicates(subset=['order_id'], keep='first', inplace=True)
    print(f"Removed {init_orders - len(orders_df)} duplicate orders.")
    
    # 2. Date parsing & consistency
    orders_df['order_date'] = pd.to_datetime(orders_df['order_date'])
    orders_df['delivery_date'] = pd.to_datetime(orders_df['delivery_date'])
    
    invalid_delivery = orders_df['delivery_date'] < orders_df['order_date']
    orders_df.loc[invalid_delivery, 'delivery_date'] = np.nan
    
    # 3. Domain constraints
    products_df = pd.read_csv('data/raw/products_raw.csv')
    products_df['cost_price'] = np.minimum(products_df['cost_price'], products_df['selling_price'] * 0.90)
    
    orders_df.to_csv('data/cleaned/orders_clean.csv', index=False)
    products_df.to_csv('data/cleaned/products_clean.csv', index=False)
    print("Cleaning pipeline executed successfully.")`
  },
  {
    path: 'python/rfm_analysis.py',
    name: 'rfm_analysis.py',
    type: 'python',
    description: 'RFM Customer Segmentation Engine using 1-5 Quintile Scoring in Pandas',
    preview: `import pandas as pd

def compute_rfm_segments():
    orders = pd.read_csv('data/cleaned/orders_clean.csv')
    orders['order_date'] = pd.to_datetime(orders['order_date'])
    
    ref_date = orders['order_date'].max() + pd.Timedelta(days=1)
    
    rfm = orders.groupby('customer_id').agg({
        'order_date': lambda x: (ref_date - x.max()).days,
        'order_id': 'nunique',
        'total_amount': 'sum'
    }).rename(columns={'order_date': 'recency', 'order_id': 'frequency', 'total_amount': 'monetary'})
    
    rfm['r_score'] = pd.qcut(rfm['recency'].rank(method='first'), 5, labels=[5,4,3,2,1])
    rfm['f_score'] = pd.qcut(rfm['frequency'].rank(method='first'), 5, labels=[1,2,3,4,5])
    rfm['m_score'] = pd.qcut(rfm['monetary'].rank(method='first'), 5, labels=[1,2,3,4,5])
    
    rfm['rfm_score'] = rfm['r_score'].astype(str) + rfm['f_score'].astype(str) + rfm['m_score'].astype(str)
    return rfm`
  },
  {
    path: 'powerbi/dashboard_documentation.md',
    name: 'dashboard_documentation.md',
    type: 'markdown',
    description: 'Full Power BI Technical Specifications, Star Schema relations, and DAX calculations',
    preview: `# Power BI Dashboard Documentation

## Data Architecture
* Model Type: Star Schema
* Primary Fact Tables: FactOrders, FactOrderItems
* Dimension Tables: DimCustomer, DimProduct, DimDate, DimLocation

## Core DAX Measures
1. Total Revenue = SUM(FactOrderItems[total_amount])
2. Total Profit = SUM(FactOrderItems[profit])
3. Profit Margin % = DIVIDE([Total Profit], [Total Revenue], 0)
4. Average Order Value = DIVIDE([Total Revenue], [Total Orders], 0)
5. YoY Revenue Growth % = 
   VAR CurrentRev = [Total Revenue]
   VAR PriorRev = CALCULATE([Total Revenue], SAMEPERIODLASTYEAR(DimDate[Date]))
   RETURN DIVIDE(CurrentRev - PriorRev, PriorRev, 0)`
  },
  {
    path: 'README.md',
    name: 'README.md',
    type: 'markdown',
    description: 'Complete GitHub Repository README with pipeline walkthrough and interview talking points',
    preview: `# 🛒 E-Commerce Sales & Customer Analytics

An end-to-end data analytics project simulating an enterprise e-commerce analytics warehouse.

## Tech Stack
* Python 3.10+ (Pandas, NumPy, Matplotlib, Seaborn)
* PostgreSQL 16 (CTEs, Window Functions, DENSE_RANK, LAG)
* Power BI Desktop (Star Schema, 15+ DAX Measures)

## Project Workflow
1. Raw Data Generation (50k orders, seasonal spikes)
2. Data Cleaning & Automated Audit
3. PostgreSQL Relational Database
4. RFM Customer Segmentation
5. 5-Page Interactive Power BI Dashboard
6. Business Insights & Strategic Recommendations`
  }
];

export const ProjectFilesExplorer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<RepoFile>(REPO_FILES[0]);
  const [copied, setCopied] = useState<boolean>(false);

  const handleDownload = (file: RepoFile) => {
    const element = document.createElement('a');
    const blob = new Blob([file.preview], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(blob);
    element.download = file.name;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.preview);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
            <FolderGit2 className="w-4 h-4" />
          </span>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Project Repository & Portfolio Code Explorer
          </h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Browse, copy, and export production SQL schemas, Python scripts, RFM engines, and DAX measures
        </p>
      </div>

      {/* Grid: Files Sidebar + Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* File Navigator (4 cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block px-2 mb-2">
            Repository Files
          </span>

          <div className="space-y-1">
            {REPO_FILES.map((f) => {
              const isSelected = selectedFile.path === f.path;
              return (
                <button
                  key={f.path}
                  onClick={() => setSelectedFile(f)}
                  className={`w-full text-left p-2.5 rounded-lg text-xs transition-all cursor-pointer border flex items-center justify-between ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 text-blue-900 dark:text-blue-100 font-semibold shadow-xs'
                      : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {f.type === 'sql' ? (
                      <Database className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    ) : f.type === 'python' ? (
                      <Code2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    ) : (
                      <FileText className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                    )}
                    <span className="truncate">{f.path}</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Code Preview Pane (8 cols) */}
        <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xs flex flex-col justify-between">
          <div>
            <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-medium text-slate-200 block">
                  {selectedFile.path}
                </span>
                <span className="text-[11px] text-slate-400">
                  {selectedFile.description}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-xs text-slate-300 hover:text-white px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={() => handleDownload(selectedFile)}
                  className="flex items-center gap-1 text-xs text-white px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            <pre className="p-4 font-mono text-xs text-emerald-300/90 overflow-x-auto max-h-[500px] leading-relaxed">
              {selectedFile.preview}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
