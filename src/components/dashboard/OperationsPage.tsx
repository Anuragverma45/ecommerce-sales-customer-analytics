import React from 'react';
import { 
  Truck, 
  CheckCircle2, 
  RotateCcw, 
  XCircle, 
  Clock, 
  ShieldCheck 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  SHIPPING_PERFORMANCE_DATA, 
  STATE_METRICS_DATA 
} from '../../data/mockEcommerceDataset';

export const OperationsPage: React.FC = () => {
  const statusData = [
    { name: 'Delivered', value: 42000, pct: 84, color: '#10b981' },
    { name: 'Shipped', value: 3000, pct: 6, color: '#3b82f6' },
    { name: 'Processing', value: 2500, pct: 5, color: '#6366f1' },
    { name: 'Returned', value: 1500, pct: 3, color: '#f59e0b' },
    { name: 'Cancelled', value: 1000, pct: 2, color: '#ef4444' },
  ];

  return (
    <div className="space-y-6">
      {/* 4 Core Operational KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">On-Time SLA Delivery</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">94.8%</div>
          <p className="text-xs text-slate-500 mt-1">47,400 orders within carrier SLA window</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Average Transit Time</span>
            <Clock className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">3.2 Days</div>
          <p className="text-xs text-slate-500 mt-1">From order dispatch to doorstep delivery</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Reverse Logistics / Return</span>
            <RotateCcw className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">3.0%</div>
          <p className="text-xs text-slate-500 mt-1">Primarily in Apparel size mismatches</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Checkout Cancellation</span>
            <XCircle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">2.0%</div>
          <p className="text-xs text-slate-500 mt-1">1,000 cancelled prior to shipping label</p>
        </div>
      </div>

      {/* Row 2: Status Breakdown & Shipping Methods SLA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Status Distribution */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
            Order Fulfillment Pipeline Status
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Current status breakdown across all 50,000 recorded orders
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-44 h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={68}
                    paddingAngle={3}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(v: any) => [`${Number(v).toLocaleString()} orders`, '']}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex-1 space-y-2 w-full">
              {statusData.map((st) => (
                <div key={st.name} className="flex items-center justify-between text-xs py-1 border-b border-slate-100 dark:border-slate-800/60 last:border-none">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: st.color }}></span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">{st.name}</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-slate-500">{st.value.toLocaleString()}</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{st.pct}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Shipping Method Performance */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Carrier & Shipping Method Benchmark
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Transit latency, on-time percentage, and return rate
              </p>
            </div>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>

          <div className="overflow-x-auto mt-3">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
                  <th className="pb-2">Shipping Type</th>
                  <th className="pb-2 text-right">Volume</th>
                  <th className="pb-2 text-right">Avg Days</th>
                  <th className="pb-2 text-right">On-Time %</th>
                  <th className="pb-2 text-right">Return %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {SHIPPING_PERFORMANCE_DATA.map((ship) => (
                  <tr key={ship.type} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="py-2.5 font-medium text-slate-900 dark:text-white">
                      {ship.type}
                    </td>
                    <td className="py-2.5 text-right font-mono text-slate-600 dark:text-slate-300">
                      {ship.volume.toLocaleString()}
                    </td>
                    <td className="py-2.5 text-right font-mono font-bold text-slate-900 dark:text-white">
                      {ship.avgDays}d
                    </td>
                    <td className="py-2.5 text-right">
                      <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                        {ship.onTimePct}%
                      </span>
                    </td>
                    <td className="py-2.5 text-right font-mono text-slate-500">
                      {ship.returnRate}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Row 3: Regional Delivery Latency by State */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
          Average Delivery Days by State (SQL Query #19)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          West Coast hub delivery is fastest (California: 2.3d); Mountain regions face longest transit times (Colorado: 4.2d)
        </p>

        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={STATE_METRICS_DATA} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
              <XAxis dataKey="state" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={[0, 5]} unit="d" />
              <Tooltip 
                formatter={(v: any) => [`${v} days average transit`, 'Delivery Latency']}
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
              />
              <Bar dataKey="avg_delivery_days" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
