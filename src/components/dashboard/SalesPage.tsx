import React from 'react';
import { TrendingUp, CreditCard, Percent, Layers } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';
import { GlobalFilterState } from '../../types/analytics';
import { 
  MONTHLY_TRENDS_DATA, 
  PAYMENT_DISTRIBUTION_DATA 
} from '../../data/mockEcommerceDataset';

interface SalesPageProps {
  filters: GlobalFilterState;
}

export const SalesPage: React.FC<SalesPageProps> = () => {
  // Compute YoY comparison data (2023 vs 2024 by month)
  const yoyComparison = [
    { month: 'Jan', '2023': 245000, '2024': 312000, growth: 27.3 },
    { month: 'Feb', '2023': 260000, '2024': 335000, growth: 28.8 },
    { month: 'Mar', '2023': 285000, '2024': 370000, growth: 29.8 },
    { month: 'Apr', '2023': 278000, '2024': 358000, growth: 28.8 },
    { month: 'May', '2023': 310000, '2024': 405000, growth: 30.6 },
    { month: 'Jun', '2023': 325000, '2024': 420000, growth: 29.2 },
    { month: 'Jul', '2023': 360000, '2024': 475000, growth: 31.9 },
    { month: 'Aug', '2023': 340000, '2024': 445000, growth: 30.9 },
    { month: 'Sep', '2023': 355000, '2024': 462000, growth: 30.1 },
    { month: 'Oct', '2023': 390000, '2024': 510000, growth: 30.8 },
    { month: 'Nov', '2023': 580000, '2024': 760000, growth: 31.0 },
    { month: 'Dec', '2023': 640000, '2024': 840000, growth: 31.2 },
  ];

  const paymentColors = ['#2563eb', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b'];

  return (
    <div className="space-y-6">
      {/* Top Sales Metric Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Annualized YoY Growth</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">+30.4%</div>
          <p className="text-xs text-slate-500 mt-1">Sustained quarterly expansion</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Q4 Seasonality Lift</span>
            <Layers className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">+68.5%</div>
          <p className="text-xs text-slate-500 mt-1">Nov-Dec holiday traffic peak</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Credit Card Share</span>
            <CreditCard className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">45.0%</div>
          <p className="text-xs text-slate-500 mt-1">Leading payment method ($162 AOV)</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Average Discount Depth</span>
            <Percent className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">6.2%</div>
          <p className="text-xs text-slate-500 mt-1">Strict promotional discipline maintained</p>
        </div>
      </div>

      {/* Row 2: YoY Comparison Chart & Growth Rate */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Year-over-Year (YoY) Monthly Sales Comparison
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                2023 vs 2024 revenue benchmarked month-by-month (DAX: SAMEPERIODLASTYEAR)
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-xs bg-slate-400"></span>
                <span className="text-slate-600 dark:text-slate-300">2023 Actual</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-xs bg-blue-600"></span>
                <span className="text-slate-600 dark:text-slate-300">2024 Actual</span>
              </div>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yoyComparison} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip 
                  formatter={(val: any) => [`$${Number(val).toLocaleString()}`, '']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="2023" fill="#94a3b8" radius={[3, 3, 0, 0]} />
                <Bar dataKey="2024" fill="#2563eb" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* YoY % Growth Trend */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              YoY Growth Velocity %
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              Monthly rate calculated via LAG() / SAMEPERIODLASTYEAR
            </p>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={yoyComparison} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickLine={false} />
                  <YAxis domain={[20, 35]} stroke="#94a3b8" fontSize={10} tickLine={false} tickFormatter={(v) => `${v}%`} />
                  <Tooltip 
                    formatter={(v: any) => [`${v}%`, 'YoY Growth']}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                  />
                  <Line type="monotone" dataKey="growth" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3, fill: '#10b981' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 flex justify-between">
            <span>Average YoY Expansion:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">+30.2%</span>
          </div>
        </div>
      </div>

      {/* Row 3: Payment Method Distribution & AOV Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Payment Methods */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
            Payment Method Share & Average Basket Size
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            Transaction volume share and resulting Average Order Value
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-48 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={PAYMENT_DISTRIBUTION_DATA}
                    dataKey="share"
                    nameKey="method"
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={3}
                  >
                    {PAYMENT_DISTRIBUTION_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={paymentColors[index % paymentColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(v: any) => [`${v}% share`, '']}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex-1 space-y-2 w-full">
              {PAYMENT_DISTRIBUTION_DATA.map((pm, i) => (
                <div key={pm.method} className="flex items-center justify-between text-xs py-1 border-b border-slate-100 dark:border-slate-800/60 last:border-none">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: paymentColors[i] }}></span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">{pm.method}</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-slate-500">{pm.share}%</span>
                    <span className="font-semibold text-slate-900 dark:text-white">${pm.aov} AOV</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AOV Progression */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Average Order Value (AOV) Trajectory
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Basket spend increased from $145.83 in Jan 2023 to $169.70 in Dec 2024
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
              +$23.87 Gain
            </span>
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MONTHLY_TRENDS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="label" stroke="#94a3b8" fontSize={10} tickLine={false} interval={2} />
                <YAxis domain={[140, 175]} stroke="#94a3b8" fontSize={10} tickLine={false} tickFormatter={(v) => `$${v}`} />
                <Tooltip 
                  formatter={(v: any) => [`$${v}`, 'Average Order Value']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="aov" stroke="#8b5cf6" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
