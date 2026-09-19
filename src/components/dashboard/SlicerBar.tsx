import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { GlobalFilterState } from '../../types/analytics';
import { 
  CATEGORIES_LIST, 
  STATES_LIST, 
  SEGMENTS_LIST, 
  PAYMENT_METHODS_LIST, 
  ORDER_STATUS_LIST 
} from '../../data/mockEcommerceDataset';

interface SlicerBarProps {
  filters: GlobalFilterState;
  setFilters: React.Dispatch<React.SetStateAction<GlobalFilterState>>;
}

export const SlicerBar: React.FC<SlicerBarProps> = ({ filters, setFilters }) => {
  const handleReset = () => {
    setFilters({
      dateRange: 'all',
      category: 'All Categories',
      state: 'All States',
      segment: 'All Segments',
      paymentMethod: 'All Methods',
      orderStatus: 'All Statuses'
    });
  };

  const hasActiveFilters = 
    filters.dateRange !== 'all' ||
    filters.category !== 'All Categories' ||
    filters.state !== 'All States' ||
    filters.segment !== 'All Segments' ||
    filters.paymentMethod !== 'All Methods' ||
    filters.orderStatus !== 'All Statuses';

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-3.5 shadow-xs mb-5">
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <Filter className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>Interactive Power BI Global Slicers</span>
          <span className="text-[11px] text-slate-600 dark:text-slate-400 font-normal">
            (Cross-filters all pages & DAX measures)
          </span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-[11px] text-blue-600 dark:text-blue-400 hover:underline font-medium cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Reset Slicers
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {/* Date Period */}
        <div>
          <label className="block text-[10px] font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Date Period
          </label>
          <select
            value={filters.dateRange}
            onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value as GlobalFilterState['dateRange'] }))}
            className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-2 py-1.5 text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-blue-500 focus:outline-hidden cursor-pointer"
          >
            <option value="all">Full Timeline (2023-2024)</option>
            <option value="2024">Year 2024 Only</option>
            <option value="2023">Year 2023 Only</option>
            <option value="q4_2023">Q4 Holiday Peak (2023)</option>
            <option value="q1_2024">Q1 Performance (2024)</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-[10px] font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
            className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-2 py-1.5 text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-blue-500 focus:outline-hidden cursor-pointer"
          >
            {CATEGORIES_LIST.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* State */}
        <div>
          <label className="block text-[10px] font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Region / State
          </label>
          <select
            value={filters.state}
            onChange={(e) => setFilters(prev => ({ ...prev, state: e.target.value }))}
            className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-2 py-1.5 text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-blue-500 focus:outline-hidden cursor-pointer"
          >
            {STATES_LIST.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Customer Segment */}
        <div>
          <label className="block text-[10px] font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            RFM Segment
          </label>
          <select
            value={filters.segment}
            onChange={(e) => setFilters(prev => ({ ...prev, segment: e.target.value }))}
            className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-2 py-1.5 text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-blue-500 focus:outline-hidden cursor-pointer"
          >
            {SEGMENTS_LIST.map(seg => (
              <option key={seg} value={seg}>{seg}</option>
            ))}
          </select>
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-[10px] font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Payment Method
          </label>
          <select
            value={filters.paymentMethod}
            onChange={(e) => setFilters(prev => ({ ...prev, paymentMethod: e.target.value }))}
            className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-2 py-1.5 text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-blue-500 focus:outline-hidden cursor-pointer"
          >
            {PAYMENT_METHODS_LIST.map(pm => (
              <option key={pm} value={pm}>{pm}</option>
            ))}
          </select>
        </div>

        {/* Order Status */}
        <div>
          <label className="block text-[10px] font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Order Status
          </label>
          <select
            value={filters.orderStatus}
            onChange={(e) => setFilters(prev => ({ ...prev, orderStatus: e.target.value }))}
            className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-2 py-1.5 text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-blue-500 focus:outline-hidden cursor-pointer"
          >
            {ORDER_STATUS_LIST.map(st => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
