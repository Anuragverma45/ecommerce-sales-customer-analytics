import React, { useState, useEffect } from 'react';
import { TabType, AuthUser } from './types/analytics';
import { Navbar } from './components/Navbar';
import { PowerBIDashboard } from './components/dashboard/PowerBIDashboard';
import { SqlStudio } from './components/sql/SqlStudio';
import { PythonPipelineView } from './components/python/PythonPipelineView';
import { DataModelView } from './components/datamodel/DataModelView';
import { InsightsReportsView } from './components/reports/InsightsReportsView';
import { ProjectFilesExplorer } from './components/repository/ProjectFilesExplorer';
import { LoginPage } from './components/auth/LoginPage';
import { 
  CheckCircle2, 
  Sparkles, 
  ExternalLink, 
  FolderGit2, 
  Award, 
  Briefcase
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const cached = localStorage.getItem('ecommerce_analytics_auth');
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });

  const handleLogout = () => {
    localStorage.removeItem('ecommerce_analytics_auth');
    setUser(null);
  };

  const handleExportAll = () => {
    const portfolioSummary = `# 🛒 E-Commerce Sales & Customer Analytics Portfolio
## Complete Data Analytics Project: Python • SQL • Power BI • DAX

### Executive KPIs
- Total Gross Revenue: $7,624,310.00 (+30.4% YoY)
- Total Net Profit: $2,538,900.00 (33.3% Margin)
- Total Fulfilled Orders: 50,000 (94.8% SLA on-time)
- Active Customers: 10,000 (32.4% Repeat Purchase Rate)
- Average Order Value (AOV): $152.48

### Tech Stack & Deliverables
1. PostgreSQL 16 Warehouse: Star Schema with FactOrders, FactOrderItems, and 4 Dimension tables
2. 25 Production SQL Business Queries: CTEs, Window Functions (RANK, DENSE_RANK, LAG)
3. Python ETL & RFM Engine: Deduplication, date validation, and 1-5 quintile customer scoring
4. 5-Page Power BI Interactive Dashboard: Executive Overview, Sales, Customer & RFM, Products, Operations
5. Strategic Business Recommendations: 4 high-ROI initiatives with projected +$1M+ annual lift

### Resume Bullet Points
- Engineered an end-to-end e-commerce analytics warehouse processing 50,000+ orders and $7.6M in revenue using PostgreSQL, Python (Pandas/NumPy), and Power BI.
- Architected an optimized Kimball Star Schema data model and authored 15+ complex DAX measures (SAMEPERIODLASTYEAR, DIVIDE, AVERAGEX, CLV).
- Developed 25 advanced analytical SQL queries utilizing CTEs and Window Functions (DENSE_RANK, LAG, SUM OVER) to uncover seasonality and regional sales bottlenecks.
- Implemented mathematical RFM customer segmentation in Python, classifying 10,000 accounts and identifying that the top 20% generate 72.7% of total revenue.
`;

    const element = document.createElement('a');
    const blob = new Blob([portfolioSummary], { type: 'text/markdown;charset=utf-8' });
    element.href = URL.createObjectURL(blob);
    element.download = 'ecommerce_analytics_portfolio_summary.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (!user) {
    return <LoginPage onLogin={(loggedUser) => setUser(loggedUser)} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans antialiased">
      {/* Top Header & Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onExportAll={handleExportAll} 
        currentUser={user}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && <PowerBIDashboard />}
        {activeTab === 'sql' && <SqlStudio />}
        {activeTab === 'python' && <PythonPipelineView />}
        {activeTab === 'datamodel' && <DataModelView />}
        {activeTab === 'reports' && <InsightsReportsView />}
        {activeTab === 'files' && <ProjectFilesExplorer />}

        {/* Resume & Interview Portfolio Guide Callout */}
        <section className="mt-8 bg-linear-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-5 shadow-lg border border-blue-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Briefcase className="w-4 h-4 text-blue-300" />
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                  Data Analyst Fresher Portfolio & Interview Guide
                </span>
              </div>
              <h3 className="text-base font-bold text-white">
                How to Talk About This Project in Interviews
              </h3>
              <p className="text-xs text-blue-200 mt-1 max-w-2xl leading-relaxed">
                Highlight the end-to-end data lifecycle: how you generated realistic raw data with anomalies, cleaned it using rigorous Pandas assertions, designed a Kimball Star Schema with referential integrity, queried metrics using advanced SQL CTEs/Window functions, and delivered business value through RFM segmentation and Power BI.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => setActiveTab('sql')}
                className="px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-600 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                Inspect 25 SQL Queries
              </button>
              <button
                onClick={() => setActiveTab('datamodel')}
                className="px-3 py-1.5 rounded-lg bg-indigo-700 hover:bg-indigo-600 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                View DAX & Schema
              </button>
              <button
                onClick={() => setActiveTab('files')}
                className="px-3 py-1.5 rounded-lg bg-white text-blue-950 hover:bg-blue-50 text-xs font-semibold transition-colors cursor-pointer shadow-sm"
              >
                Browse Codebase
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-6 text-xs mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-slate-200">
              E-Commerce Sales & Customer Analytics
            </span>
            <span>• Full-Stack Portfolio System</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>PostgreSQL 16</span>
            <span>•</span>
            <span>Python 3.10+</span>
            <span>•</span>
            <span>Power BI & DAX</span>
            <span>•</span>
            <span>Star Schema (3NF/Kimball)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
