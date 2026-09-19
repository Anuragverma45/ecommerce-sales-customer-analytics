import React, { useState } from 'react';
import { 
  Users, 
  Award, 
  TrendingUp, 
  AlertTriangle, 
  Search, 
  Filter, 
  ExternalLink,
  Zap
} from 'lucide-react';
import { 
  CUSTOMER_SEGMENTS_SUMMARY, 
  REPRESENTATIVE_CUSTOMERS 
} from '../../data/mockEcommerceDataset';
import { Customer } from '../../types/analytics';

export const CustomerPage: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredCustomers = REPRESENTATIVE_CUSTOMERS.filter(c => {
    const matchesSegment = selectedSegment === 'All' || c.customer_segment === selectedSegment;
    const matchesSearch = 
      c.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.customer_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSegment && matchesSearch;
  });

  const getSegmentBadgeColor = (segment: string) => {
    switch (segment) {
      case 'Champions':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300';
      case 'Loyal Customers':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-300';
      case 'Potential Loyalists':
        return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300 border-cyan-300';
      case 'New Customers':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-300';
      case 'At Risk':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300';
      case 'Cannot Lose Them':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* 4 Core Customer KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Customer Base</span>
            <Users className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">10,000</div>
          <p className="text-xs text-slate-500 mt-1">100% deduplicated unique profiles</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Repeat Purchase Rate</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">32.4%</div>
          <p className="text-xs text-slate-500 mt-1">3,240 accounts with &ge;2 purchases</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Average Customer CLV</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">$762.43</div>
          <p className="text-xs text-slate-500 mt-1">Calculated across 24 months</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Pareto Concentration</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">72.7%</div>
          <p className="text-xs text-slate-500 mt-1">Top 20% buyers produce 72.7% revenue</p>
        </div>
      </div>

      {/* RFM Segmentation Grid */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Customer RFM Segmentation Breakdown</span>
              <span className="text-xs font-normal text-slate-500">(1-5 Quintile Scoring Model)</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Click any segment card below to filter the customer list and see targeted marketing strategies
            </p>
          </div>
          {selectedSegment !== 'All' && (
            <button
              onClick={() => setSelectedSegment('All')}
              className="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline self-start cursor-pointer"
            >
              Clear filter (Show All)
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {CUSTOMER_SEGMENTS_SUMMARY.map((seg) => {
            const isSelected = selectedSegment === seg.segment;
            return (
              <div
                key={seg.segment}
                onClick={() => setSelectedSegment(isSelected ? 'All' : seg.segment)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected 
                    ? 'ring-2 ring-blue-500 border-blue-500 bg-blue-50/50 dark:bg-blue-950/30' 
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold border ${getSegmentBadgeColor(seg.segment)}`}>
                    {seg.segment}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                    {seg.count.toLocaleString()} ({seg.pct}%)
                  </span>
                </div>

                <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 min-h-[32px] mb-3">
                  {seg.description}
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-600 dark:text-slate-400 block text-[10px]">Avg Spend</span>
                    <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">${seg.avgSpend}</span>
                  </div>
                  <div>
                    <span className="text-slate-600 dark:text-slate-400 block text-[10px]">Revenue Share</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{seg.revenueShare}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Customer Explorer Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Customer Profiles & Behavioral RFM Metrics
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Showing {filteredCustomers.length} sample records matching active filter criteria
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, ID, city..."
                className="text-xs pl-8 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-1 focus:ring-blue-500 w-48"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-semibold bg-slate-50/50 dark:bg-slate-800/50">
                <th className="py-2.5 px-3">Customer ID</th>
                <th className="py-2.5 px-3">Customer Name</th>
                <th className="py-2.5 px-3">Location</th>
                <th className="py-2.5 px-3">Segment</th>
                <th className="py-2.5 px-3 text-center">RFM Score</th>
                <th className="py-2.5 px-3 text-right">Recency</th>
                <th className="py-2.5 px-3 text-right">Frequency</th>
                <th className="py-2.5 px-3 text-right">Total Spend</th>
                <th className="py-2.5 px-3">Strategic Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredCustomers.map((c) => (
                <tr key={c.customer_id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-medium text-slate-500">
                    {c.customer_id}
                  </td>
                  <td className="py-2.5 px-3 font-medium text-slate-900 dark:text-white">
                    {c.first_name} {c.last_name}
                    <div className="text-[10px] text-slate-600 dark:text-slate-400 font-normal">{c.email}</div>
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">
                    {c.city}, {c.state}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-bold border ${getSegmentBadgeColor(c.customer_segment)}`}>
                      {c.customer_segment}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono font-bold text-blue-600 dark:text-blue-400">
                    {c.rfm_score}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-600 dark:text-slate-400">
                    {c.recency}d ago
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-semibold text-slate-800 dark:text-slate-200">
                    {c.frequency} orders
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900 dark:text-white">
                    ${c.monetary.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-3">
                    {c.customer_segment === 'Champions' && (
                      <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">VIP Early Access & Loyalty Perks</span>
                    )}
                    {c.customer_segment === 'Loyal Customers' && (
                      <span className="text-[11px] text-blue-700 dark:text-blue-400 font-medium">Upsell premium tier + reviews</span>
                    )}
                    {c.customer_segment === 'At Risk' && (
                      <span className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">Automated Win-Back 15% discount</span>
                    )}
                    {c.customer_segment === 'Cannot Lose Them' && (
                      <span className="text-[11px] text-rose-700 dark:text-rose-400 font-medium font-bold">Personalized CS Outreach</span>
                    )}
                    {c.customer_segment === 'Potential Loyalists' && (
                      <span className="text-[11px] text-cyan-700 dark:text-cyan-400 font-medium">Recommend category cross-sells</span>
                    )}
                    {c.customer_segment === 'New Customers' && (
                      <span className="text-[11px] text-purple-700 dark:text-purple-400 font-medium">Onboarding email sequence</span>
                    )}
                    {c.customer_segment === 'Hibernating' && (
                      <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">Low-cost re-engagement newsletter</span>
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
