import React from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  Percent, 
  CreditCard,
  ArrowUpRight,
  Truck
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Cell
} from 'recharts';
import { GlobalFilterState } from '../../types/analytics';
import { 
  MONTHLY_TRENDS_DATA, 
  CATEGORY_METRICS_DATA, 
  STATE_METRICS_DATA, 
  TOP_PRODUCTS_DATA 
} from '../../data/mockEcommerceDataset';

interface ExecutivePageProps {
  filters: GlobalFilterState;
}

export const ExecutivePage: React.FC<ExecutivePageProps> = ({ filters }) => {
  // Apply slicer multipliers
  const categoryFilterActive = filters.category !== 'All Categories';
  const stateFilterActive = filters.state !== 'All States';
  
  // Calculate dynamic totals based on filters
  let filteredRevenue = 7624310;
  let filteredProfit = 2538900;
  let filteredOrders = 50000;
  let filteredCustomers = 10000;

  if (categoryFilterActive) {
    const cat = CATEGORY_METRICS_DATA.find(c => c.category_name === filters.category);
    if (cat) {
      filteredRevenue = cat.revenue;
      filteredProfit = cat.profit;
      filteredOrders = cat.orders;
      filteredCustomers = Math.round(cat.orders * 0.7);
    }
  } else if (stateFilterActive) {
    const st = STATE_METRICS_DATA.find(s => s.state === filters.state);
    if (st) {
      filteredRevenue = st.revenue;
      filteredProfit = Math.round(st.revenue * 0.33);
      filteredOrders = st.orders;
      filteredCustomers = st.customers;
    }
  }

  const profitMarginPct = ((filteredProfit / filteredRevenue) * 100).toFixed(1);
  const aov = (filteredRevenue / filteredOrders).toFixed(2);

  // Filter monthly data if year selected
  const displayTrends = MONTHLY_TRENDS_DATA.filter(m => {
    if (filters.dateRange === '2023') return m.month.startsWith('2023');
    if (filters.dateRange === '2024') return m.month.startsWith('2024');
    if (filters.dateRange === 'q4_2023') return ['2023-10', '2023-11', '2023-12'].includes(m.month);
    if (filters.dateRange === 'q1_2024') return ['2024-01', '2024-02', '2024-03'].includes(m.month);
    return true;
  });

  const categoryColors = ['#2563eb', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ec4899'];

  return (
    <div className="space-y-6">
      {/* 6 Core Executive KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Total Revenue */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Total Revenue</span>
            <div className="p-1.5 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white">
            ${(filteredRevenue / 1000000).toFixed(2)}M
          </div>
          <div className="flex items-center text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            <span>+30.4% YoY</span>
            <span className="text-slate-600 dark:text-slate-400 font-normal ml-1">(vs LY)</span>
          </div>
        </div>

        {/* Total Profit */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Net Profit</span>
            <div className="p-1.5 rounded-md bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white">
            ${(filteredProfit / 1000000).toFixed(2)}M
          </div>
          <div className="flex items-center text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            <span>+28.9% YoY</span>
            <span className="text-slate-600 dark:text-slate-400 font-normal ml-1">EBITDA</span>
          </div>
        </div>

        {/* Profit Margin */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Profit Margin</span>
            <div className="p-1.5 rounded-md bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
              <Percent className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white">
            {profitMarginPct}%
          </div>
          <div className="flex items-center text-[11px] text-slate-600 dark:text-slate-400 mt-1">
            <span className="font-semibold text-purple-700 dark:text-purple-400">Healthy</span>
            <span className="ml-1">Retail Target &gt;25%</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Total Orders</span>
            <div className="p-1.5 rounded-md bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white">
            {filteredOrders.toLocaleString()}
          </div>
          <div className="flex items-center text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            <span>94.8%</span>
            <span className="text-slate-600 dark:text-slate-400 font-normal ml-1">Delivered</span>
          </div>
        </div>

        {/* Total Customers */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Active Buyers</span>
            <div className="p-1.5 rounded-md bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white">
            {filteredCustomers.toLocaleString()}
          </div>
          <div className="flex items-center text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold mt-1">
            <span>32.4% Repeat</span>
            <span className="text-slate-600 dark:text-slate-400 font-normal ml-1">Rate</span>
          </div>
        </div>

        {/* Average Order Value (AOV) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Avg Order Value</span>
            <div className="p-1.5 rounded-md bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white">
            ${aov}
          </div>
          <div className="flex items-center text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            <span>+$12.10</span>
            <span className="text-slate-600 dark:text-slate-400 font-normal ml-1">Expansion</span>
          </div>
        </div>
      </div>

      {/* Row 2: Revenue & Profit Trend Chart + Category Share */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main Monthly Revenue Trajectory */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Monthly Revenue & Net Profit Trajectory
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Visualizing top-line revenue versus net earnings with holiday Q4 demand spike
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                <span className="text-slate-600 dark:text-slate-300 font-medium">Gross Revenue</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-slate-600 dark:text-slate-300 font-medium">Net Profit</span>
              </div>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={displayTrends} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="label" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis 
                  stroke="#94a3b8" 
                  fontSize={11} 
                  tickLine={false} 
                  tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`} 
                />
                <Tooltip 
                  formatter={(value: any) => [`$${Number(value).toLocaleString()}`, '']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#2563eb" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="profit" name="Profit" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorProfit)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Contribution */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              Revenue by Product Category
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              Sales volume vs operating margin contribution
            </p>

            <div className="space-y-3 mt-2">
              {CATEGORY_METRICS_DATA.map((cat, i) => (
                <div key={cat.category_name} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-700 dark:text-slate-200">
                      {cat.category_name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-slate-900 dark:text-white font-bold">
                        ${(cat.revenue / 1000000).toFixed(2)}M
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">
                        {cat.profit_margin_pct}% margin
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${cat.revenue_share_pct * 2.5}%`,
                        backgroundColor: categoryColors[i % categoryColors.length]
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Portfolio Margin Range:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">22.4% – 49.0%</span>
          </div>
        </div>
      </div>

      {/* Row 3: Regional State Distribution & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Top States Revenue */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Regional Performance (Top States)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Revenue generated & average delivery latency in days
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 font-medium">
              <Truck className="w-3.5 h-3.5" /> SLAs Tracked
            </span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={STATE_METRICS_DATA} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                <XAxis type="number" tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`} stroke="#94a3b8" fontSize={11} />
                <YAxis dataKey="state" type="category" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip 
                  formatter={(val: any) => [`$${Number(val).toLocaleString()}`, 'State Revenue']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
                  {STATE_METRICS_DATA.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.state === 'California' ? '#2563eb' : entry.state === 'New York' ? '#3b82f6' : '#64748b'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top 5 Products Leaderboard */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Top Revenue Products (SKU Velocity)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Highest grossing products across all online channels
              </p>
            </div>
            <span className="text-xs text-slate-400 font-mono">DENSE_RANK()</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                  <th className="pb-2">Product Name</th>
                  <th className="pb-2">Category</th>
                  <th className="pb-2 text-right">Units</th>
                  <th className="pb-2 text-right">Revenue</th>
                  <th className="pb-2 text-right">Margin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {TOP_PRODUCTS_DATA.slice(0, 5).map((prod) => (
                  <tr key={prod.product_id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 pr-2 font-medium text-slate-900 dark:text-white truncate max-w-[160px]">
                      {prod.product_name}
                    </td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400">
                      {prod.category_name}
                    </td>
                    <td className="py-2.5 text-right font-mono text-slate-600 dark:text-slate-300">
                      {prod.units_sold.toLocaleString()}
                    </td>
                    <td className="py-2.5 text-right font-mono font-semibold text-slate-900 dark:text-white">
                      ${(prod.revenue / 1000).toFixed(1)}k
                    </td>
                    <td className="py-2.5 text-right">
                      <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                        {prod.profit_margin_pct}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
