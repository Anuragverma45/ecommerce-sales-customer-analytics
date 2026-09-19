import React, { useState } from 'react';
import { 
  FileText, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Target, 
  DollarSign, 
  Zap, 
  Download,
  Share2
} from 'lucide-react';

export const InsightsReportsView: React.FC = () => {
  const [activeReport, setActiveReport] = useState<'insights' | 'recommendations'>('insights');

  const findings = [
    {
      id: 1,
      title: 'Extreme Q4 Holiday Revenue Surge',
      dataProof: 'November & December account for 38.2% of annual turnover ($1.60M in 2024)',
      impact: 'Supply chain stockouts occur if replenishment lead time exceeds 21 days prior to Oct 15.',
      severity: 'Critical'
    },
    {
      id: 2,
      title: 'Customer Pareto 80/20 Distribution',
      dataProof: 'Top 20.2% of customers (Champions & Loyalists) generate 72.7% of total revenue ($5.54M)',
      impact: 'Losing 50 Champions reduces monthly gross margin more than acquiring 500 one-time buyers.',
      severity: 'High'
    },
    {
      id: 3,
      title: 'Margin Disparity Between Categories',
      dataProof: 'Beauty (49.0%) & Apparel (44.8%) deliver 2x the margin efficiency of Electronics (22.4%)',
      impact: 'Electronics drives volume and traffic, but Apparel and Beauty are the profit engines.',
      severity: 'Opportunity'
    },
    {
      id: 4,
      title: 'Delivery Latency Regional Discrepancy',
      dataProof: 'California orders deliver in 2.3 days vs 4.2 days in Colorado and 3.6 days in Florida',
      impact: 'Customers experiencing >4 day transit exhibit a 35% lower 90-day repeat purchase rate.',
      severity: 'Medium'
    },
    {
      id: 5,
      title: 'Payment Method Basket Size Dynamics',
      dataProof: 'Credit Card orders average $162.40 AOV vs $112.80 for Cash on Delivery (CoD)',
      impact: 'Incentivizing prepaid card checkouts automatically expands unit basket spend by +43.9%.',
      severity: 'Opportunity'
    },
    {
      id: 6,
      title: 'At-Risk Customer Churn Vulnerability',
      dataProof: '1,240 previously high-spending customers have been inactive for >90 days',
      impact: 'Represents $607,724 in dormant annualized purchasing power.',
      severity: 'Critical'
    }
  ];

  const recommendations = [
    {
      id: 1,
      tier: 'Quick Win',
      title: 'Automated RFM Win-Back Email Sequences',
      cost: 'Low ($)',
      projectedLift: '+$180,000 / yr',
      action: 'Deploy automated 3-stage drip campaigns for "At Risk" and "Cannot Lose Them" accounts offering progressive 10%-15% time-limited vouchers at day 60, 75, and 90.'
    },
    {
      id: 2,
      tier: 'Strategic Priority',
      title: 'Cross-Category Cart Bundling (Electronics + High-Margin Beauty/Home)',
      cost: 'Medium ($$)',
      projectedLift: '+$340,000 / yr',
      action: 'Inject high-margin beauty serums, tech accessories, and ergonomic kitchen tools into checkout recommendation carousels for low-margin electronics carts.'
    },
    {
      id: 3,
      tier: 'Operational',
      title: 'Regional Fulfillment Center Expansion (Central / Mountain Hub)',
      cost: 'High ($$$)',
      projectedLift: '+$420,000 / yr',
      action: 'Partner with regional 3PL node in Texas or Colorado to compress Mountain transit times from 4.2 days down to 2.1 days, driving customer retention.'
    },
    {
      id: 4,
      tier: 'Quick Win',
      title: 'Prepaid Digital Payment Incentivization',
      cost: 'Low ($)',
      projectedLift: '+$95,000 / yr',
      action: 'Offer a 2% instant cashback discount on credit card and digital wallet checkouts to convert low-AOV Cash on Delivery buyers into high-AOV prepaid accounts.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-purple-50 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400">
                <FileText className="w-4 h-4" />
              </span>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Executive Reports & Strategic Action Plan
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Data-backed business discoveries, root-cause analyses, and prioritized commercial recommendations
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
              <button
                onClick={() => setActiveReport('insights')}
                className={`px-3 py-1 rounded-md text-xs font-semibold cursor-pointer transition-colors ${
                  activeReport === 'insights'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Key Insights (8)
              </button>
              <button
                onClick={() => setActiveReport('recommendations')}
                className={`px-3 py-1 rounded-md text-xs font-semibold cursor-pointer transition-colors ${
                  activeReport === 'recommendations'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Recommendations (4)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Report Content */}
      {activeReport === 'insights' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {findings.map((f) => (
            <div
              key={f.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 inline-flex items-center justify-center text-[10px] font-mono">
                    {f.id}
                  </span>
                  <span>{f.title}</span>
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  f.severity === 'Critical' 
                    ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                    : f.severity === 'High'
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                    : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                }`}>
                  {f.severity}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300">
                <span className="text-slate-500 block text-[10px] uppercase font-sans font-semibold">Empirical Proof:</span>
                {f.dataProof}
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Business Implication:</span> {f.impact}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                      rec.tier === 'Quick Win' 
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' 
                        : rec.tier === 'Strategic Priority'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                        : 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300'
                    }`}>
                      {rec.tier}
                    </span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-xs">
                      {rec.projectedLift}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                    {rec.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {rec.action}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Resource Requirement: <strong className="text-slate-700 dark:text-slate-300">{rec.cost}</strong></span>
                  <span className="text-blue-600 dark:text-blue-400 font-medium">Ready to Implement &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
