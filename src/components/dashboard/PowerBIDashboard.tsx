import React, { useState } from 'react';
import { 
  BarChart2, 
  TrendingUp, 
  Users, 
  Package, 
  Truck,
  FileSpreadsheet
} from 'lucide-react';
import { GlobalFilterState, DashboardSubPage } from '../../types/analytics';
import { SlicerBar } from './SlicerBar';
import { ExecutivePage } from './ExecutivePage';
import { SalesPage } from './SalesPage';
import { CustomerPage } from './CustomerPage';
import { ProductPage } from './ProductPage';
import { OperationsPage } from './OperationsPage';

export const PowerBIDashboard: React.FC = () => {
  const [subPage, setSubPage] = useState<DashboardSubPage>('executive');
  const [filters, setFilters] = useState<GlobalFilterState>({
    dateRange: 'all',
    category: 'All Categories',
    state: 'All States',
    segment: 'All Segments',
    paymentMethod: 'All Methods',
    orderStatus: 'All Statuses'
  });

  const pages = [
    { id: 'executive' as DashboardSubPage, label: '1. Executive Overview', icon: BarChart2 },
    { id: 'sales' as DashboardSubPage, label: '2. Sales Analytics', icon: TrendingUp },
    { id: 'customers' as DashboardSubPage, label: '3. Customer & RFM', icon: Users },
    { id: 'products' as DashboardSubPage, label: '4. Product Analytics', icon: Package },
    { id: 'operations' as DashboardSubPage, label: '5. Logistics & Ops', icon: Truck },
  ];

  return (
    <div className="space-y-4">
      {/* Power BI Sub-Page Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {pages.map((p) => {
            const Icon = p.icon;
            const isActive = subPage === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSubPage(p.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 self-end sm:self-auto px-2">
          <FileSpreadsheet className="w-3.5 h-3.5 text-blue-500" />
          <span className="font-medium text-slate-700 dark:text-slate-300">Live Star Schema Data</span>
        </div>
      </div>

      {/* Global Slicers */}
      <SlicerBar filters={filters} setFilters={setFilters} />

      {/* Page Content */}
      <div className="min-h-[500px]">
        {subPage === 'executive' && <ExecutivePage filters={filters} />}
        {subPage === 'sales' && <SalesPage filters={filters} />}
        {subPage === 'customers' && <CustomerPage />}
        {subPage === 'products' && <ProductPage />}
        {subPage === 'operations' && <OperationsPage />}
      </div>
    </div>
  );
};
