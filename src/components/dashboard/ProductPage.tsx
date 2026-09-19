import React, { useState } from 'react';
import { 
  Package, 
  TrendingUp, 
  AlertCircle, 
  Search, 
  Gem, 
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import { 
  TOP_PRODUCTS_DATA, 
  BOTTOM_PRODUCTS_DATA, 
  CATEGORY_METRICS_DATA,
  CATEGORIES_LIST 
} from '../../data/mockEcommerceDataset';

export const ProductPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'top' | 'hiddenGems' | 'slowMovers'>('top');

  const filteredTopProducts = TOP_PRODUCTS_DATA.filter(p => {
    const matchesCat = selectedCategory === 'All Categories' || p.category_name === selectedCategory;
    const matchesSearch = 
      p.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.product_id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* 4 Product Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Top Revenue SKU</span>
            <Package className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white truncate">AeroPro Headphones</div>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">$644.9k Revenue • 51.7% Margin</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Highest Margin Category</span>
            <Sparkles className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white">Beauty & Personal Care</div>
          <p className="text-xs text-purple-600 dark:text-purple-400 font-medium mt-1">49.0% Gross Margin ($191k Profit)</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Volume Anchor Category</span>
            <TrendingUp className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white">Electronics (34.6% Share)</div>
          <p className="text-xs text-slate-500 mt-1">18,500 units sold • $3.38M Revenue</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Catalog Health Alert</span>
            <AlertCircle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white">3 Low-Velocity SKUs</div>
          <p className="text-xs text-amber-600 dark:text-amber-400 font-medium mt-1">Slow movers recommended for clearance</p>
        </div>
      </div>

      {/* Category Margin Efficiency Breakdown */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
          Category Profit Margin & Revenue Matrix
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Evaluating margin contribution across high-volume vs high-margin categories (SQL Query #21)
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORY_METRICS_DATA.map((cat) => (
            <div 
              key={cat.category_name} 
              className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40"
            >
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate mb-1" title={cat.category_name}>
                {cat.category_name}
              </div>
              <div className="text-base font-bold font-mono text-slate-900 dark:text-white">
                ${(cat.revenue / 1000000).toFixed(2)}M
              </div>
              <div className="flex items-center justify-between text-[11px] mt-2 pt-2 border-t border-slate-200 dark:border-slate-700/60">
                <span className="text-slate-500">Margin:</span>
                <span className={`font-mono font-bold ${cat.profit_margin_pct >= 40 ? 'text-emerald-600 dark:text-emerald-400' : 'text-blue-600 dark:text-blue-400'}`}>
                  {cat.profit_margin_pct}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Products Table with View Switcher */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('top')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'top' 
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' 
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Top Performers by Revenue
            </button>
            <button
              onClick={() => setActiveTab('hiddenGems')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'hiddenGems' 
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' 
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              High Margin &quot;Hidden Gems&quot;
            </button>
            <button
              onClick={() => setActiveTab('slowMovers')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'slowMovers' 
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' 
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Slow Movers / Clearance
            </button>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1.5 text-slate-800 dark:text-slate-200"
            >
              {CATEGORIES_LIST.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter SKU or brand..."
                className="text-xs pl-8 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-1 focus:ring-blue-500 w-40"
              />
            </div>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-semibold bg-slate-50/50 dark:bg-slate-800/50">
                <th className="py-2.5 px-3">SKU ID</th>
                <th className="py-2.5 px-3">Product Name & Brand</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3 text-right">Cost Price</th>
                <th className="py-2.5 px-3 text-right">Retail Price</th>
                <th className="py-2.5 px-3 text-right">Units Sold</th>
                <th className="py-2.5 px-3 text-right">Gross Revenue</th>
                <th className="py-2.5 px-3 text-right">Net Profit</th>
                <th className="py-2.5 px-3 text-right">Margin %</th>
                <th className="py-2.5 px-3">Status / Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {(activeTab === 'slowMovers' ? BOTTOM_PRODUCTS_DATA : filteredTopProducts).map((prod, idx) => (
                <tr key={prod.product_id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-medium text-slate-500">
                    {prod.product_id}
                  </td>
                  <td className="py-2.5 px-3 font-medium text-slate-900 dark:text-white">
                    {prod.product_name}
                    <div className="text-[10px] text-slate-400 font-normal">Brand: {prod.brand}</div>
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">
                    {prod.category_name}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-500">
                    ${prod.cost_price.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-800 dark:text-slate-200">
                    ${prod.selling_price.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-semibold text-slate-700 dark:text-slate-300">
                    {prod.units_sold.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900 dark:text-white">
                    ${prod.revenue.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    ${prod.profit.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      prod.profit_margin_pct >= 60 
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' 
                        : prod.profit_margin_pct >= 40 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                        : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
                    }`}>
                      {prod.profit_margin_pct}%
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    {activeTab === 'slowMovers' ? (
                      <span className="text-[11px] text-rose-600 dark:text-rose-400 font-medium">Clearance Bundle Promo</span>
                    ) : prod.profit_margin_pct >= 65 ? (
                      <span className="inline-flex items-center gap-1 text-[11px] text-purple-600 dark:text-purple-400 font-medium">
                        <Gem className="w-3 h-3" /> High Profit Core
                      </span>
                    ) : (
                      <span className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">Scale Marketing</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
