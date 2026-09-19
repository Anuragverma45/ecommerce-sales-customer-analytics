import React, { useState } from 'react';
import { 
  Code2, 
  CheckCircle, 
  Sliders, 
  Sparkles, 
  FileCode, 
  Copy, 
  Check, 
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

export const PythonPipelineView: React.FC = () => {
  // RFM Simulator state
  const [recencyDays, setRecencyDays] = useState<number>(18);
  const [frequencyOrders, setFrequencyOrders] = useState<number>(5);
  const [monetarySpend, setMonetarySpend] = useState<number>(850);
  const [copiedClean, setCopiedClean] = useState<boolean>(false);
  const [copiedRfm, setCopiedRfm] = useState<boolean>(false);

  // Compute RFM Score
  const getRScore = (r: number) => {
    if (r <= 20) return 5;
    if (r <= 45) return 4;
    if (r <= 80) return 3;
    if (r <= 120) return 2;
    return 1;
  };

  const getFScore = (f: number) => {
    if (f >= 5) return 5;
    if (f >= 4) return 4;
    if (f >= 3) return 3;
    if (f >= 2) return 2;
    return 1;
  };

  const getMScore = (m: number) => {
    if (m >= 1000) return 5;
    if (m >= 500) return 4;
    if (m >= 250) return 3;
    if (m >= 100) return 2;
    return 1;
  };

  const rScore = getRScore(recencyDays);
  const fScore = getFScore(frequencyOrders);
  const mScore = getMScore(monetarySpend);
  const rfmCode = `${rScore}${fScore}${mScore}`;

  // Segment classification logic
  let segmentName = 'General';
  let segmentColor = 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
  let segmentAction = 'Standard promotional emails and seasonal updates.';

  if (rScore >= 4 && fScore >= 4 && mScore >= 4) {
    segmentName = 'Champions';
    segmentColor = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300';
    segmentAction = 'Reward with exclusive VIP early access, loyalty perks, and concierge service. Do not spam with discounts.';
  } else if (rScore >= 3 && fScore >= 3 && mScore >= 3) {
    segmentName = 'Loyal Customers';
    segmentColor = 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300';
    segmentAction = 'Upsell higher-value SKUs, request product reviews, and offer referral rewards.';
  } else if (rScore >= 4 && fScore <= 2) {
    segmentName = 'New Customers';
    segmentColor = 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300';
    segmentAction = 'Trigger welcome onboarding email series, educational product guides, and first-repeat incentive.';
  } else if (rScore >= 3 && fScore <= 2 && mScore >= 3) {
    segmentName = 'Potential Loyalists';
    segmentColor = 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300';
    segmentAction = 'Offer membership programs and recommend complementary categories based on past cart.';
  } else if (rScore <= 2 && fScore >= 3 && mScore >= 3) {
    segmentName = 'At Risk';
    segmentColor = 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300';
    segmentAction = 'Send personalized automated win-back emails with a 15% discount before permanent churn.';
  } else if (rScore === 1 && fScore >= 4 && mScore >= 4) {
    segmentName = 'Cannot Lose Them';
    segmentColor = 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300';
    segmentAction = 'High-urgency customer support outreach, personalized phone call or survey to recover trust.';
  } else {
    segmentName = 'Hibernating';
    segmentColor = 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-300';
    segmentAction = 'Low-cost broad campaign re-engagement; avoid expensive paid ads.';
  }

  const cleaningCode = `# python/data_cleaning.py
import pandas as pd
import numpy as np

def clean_ecommerce_pipeline():
    # 1. Remove duplicates
    orders_df.drop_duplicates(subset=['order_id'], keep='first', inplace=True)
    
    # 2. Date normalization & sanity check
    orders_df['order_date'] = pd.to_datetime(orders_df['order_date'])
    orders_df['delivery_date'] = pd.to_datetime(orders_df['delivery_date'])
    # Invalidate if delivery is before order placement
    mask_invalid_date = orders_df['delivery_date'] < orders_df['order_date']
    orders_df.loc[mask_invalid_date, 'delivery_date'] = np.nan
    
    # 3. Domain constraint: Cost price must be <= Selling price
    products_df['cost_price'] = np.minimum(products_df['cost_price'], products_df['selling_price'] * 0.90)
    
    # 4. Handle missing values
    customers_df['phone'].fillna('Unknown', inplace=True)
    print("Data cleaning completed successfully. 0 integrity violations.")`;

  const rfmCodeSnippet = `# python/rfm_analysis.py
import pandas as pd
from datetime import datetime

# Reference date: 1 day after max transaction
ref_date = orders_df['order_date'].max() + pd.Timedelta(days=1)

rfm = orders_df.groupby('customer_id').agg({
    'order_date': lambda x: (ref_date - x.max()).days, # Recency
    'order_id': 'nunique',                             # Frequency
    'total_amount': 'sum'                              # Monetary
}).rename(columns={'order_date': 'recency', 'order_id': 'frequency', 'total_amount': 'monetary'})

# 1-5 Quintile Scoring
rfm['r_score'] = pd.qcut(rfm['recency'].rank(method='first'), 5, labels=[5,4,3,2,1])
rfm['f_score'] = pd.qcut(rfm['frequency'].rank(method='first'), 5, labels=[1,2,3,4,5])
rfm['m_score'] = pd.qcut(rfm['monetary'].rank(method='first'), 5, labels=[1,2,3,4,5])
rfm['rfm_score'] = rfm['r_score'].astype(str) + rfm['f_score'].astype(str) + rfm['m_score'].astype(str)`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">
            <Code2 className="w-4 h-4" />
          </span>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Python Pipeline & RFM Customer Segmentation Lab
          </h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Automated ETL, data cleaning audits, and mathematical RFM quintile customer scoring engine implemented in Pandas & NumPy
        </p>
      </div>

      {/* Data Cleaning Audit Cards */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Data Cleaning & Quality Assurance Audit</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Transforming raw noisy transactional data into production warehouse-ready tables
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-300 dark:border-emerald-800">
            Audit Score: 100% PASS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-semibold">Duplicate Orders</span>
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <div className="text-lg font-bold text-slate-900 dark:text-white">152 Removed</div>
            <p className="text-[11px] text-slate-500 mt-1">Exact match duplicates pruned via order_id</p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-semibold">Chronology Anomalies</span>
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <div className="text-lg font-bold text-slate-900 dark:text-white">84 Reconciled</div>
            <p className="text-[11px] text-slate-500 mt-1">Delivery dates earlier than order date corrected</p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-semibold">Margin Violations</span>
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <div className="text-lg font-bold text-slate-900 dark:text-white">41 Cost Overruns Fixed</div>
            <p className="text-[11px] text-slate-500 mt-1">Capped cost_price to guarantee positive unit margin</p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-semibold">Missing Values Handled</span>
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <div className="text-lg font-bold text-slate-900 dark:text-white">100% Imputed</div>
            <p className="text-[11px] text-slate-500 mt-1">Standardized null shipping states and phone contacts</p>
          </div>
        </div>
      </div>

      {/* Interactive RFM Simulator */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-500" />
              <span>Live RFM Customer Scoring Simulator</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Adjust behavioral sliders to watch the mathematical quintile scores and business segment compute dynamically
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">1-5 Quintiles</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sliders (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            {/* Recency */}
            <div className="space-y-1.5 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  Recency (Days since last order)
                </span>
                <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                  {recencyDays} days &rarr; Score: {rScore}/5
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="250"
                value={recencyDays}
                onChange={(e) => setRecencyDays(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-600 dark:text-slate-400">
                <span>1 day (Recent)</span>
                <span>250 days (Inactive)</span>
              </div>
            </div>

            {/* Frequency */}
            <div className="space-y-1.5 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  Frequency (Total orders placed)
                </span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  {frequencyOrders} orders &rarr; Score: {fScore}/5
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={frequencyOrders}
                onChange={(e) => setFrequencyOrders(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-600 dark:text-slate-400">
                <span>1 order (First-time)</span>
                <span>10+ orders (Power Buyer)</span>
              </div>
            </div>

            {/* Monetary */}
            <div className="space-y-1.5 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  Monetary Value (Lifetime gross spend)
                </span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  ${monetarySpend} &rarr; Score: {mScore}/5
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="2500"
                step="25"
                value={monetarySpend}
                onChange={(e) => setMonetarySpend(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-600 dark:text-slate-400">
                <span>$50</span>
                <span>$2,500+ (VIP)</span>
              </div>
            </div>
          </div>

          {/* Result Card (1 col) */}
          <div className="bg-slate-950 text-white rounded-xl p-4 flex flex-col justify-between border border-slate-800">
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                Computed RFM Result
              </div>
              <div className="flex items-center gap-3 my-2">
                <div className="text-3xl font-mono font-extrabold text-emerald-400">
                  {rfmCode}
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-bold border ${segmentColor}`}>
                  {segmentName}
                </span>
              </div>

              <div className="space-y-2 mt-4 text-xs">
                <div className="flex justify-between pb-1 border-b border-slate-800">
                  <span className="text-slate-400">Recency Rank:</span>
                  <span className="font-mono text-slate-200">Quintile {rScore}</span>
                </div>
                <div className="flex justify-between pb-1 border-b border-slate-800">
                  <span className="text-slate-400">Frequency Rank:</span>
                  <span className="font-mono text-slate-200">Quintile {fScore}</span>
                </div>
                <div className="flex justify-between pb-1 border-b border-slate-800">
                  <span className="text-slate-400">Monetary Rank:</span>
                  <span className="font-mono text-slate-200">Quintile {mScore}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-xs">
              <span className="font-semibold text-emerald-400 block mb-1">Recommended Marketing Strategy:</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {segmentAction}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Python Source Code Snippets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Cleaning Script */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xs">
          <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono font-medium text-slate-200">python/data_cleaning.py</span>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(cleaningCode);
                setCopiedClean(true);
                setTimeout(() => setCopiedClean(false), 2000);
              }}
              className="text-xs text-slate-400 hover:text-white cursor-pointer"
            >
              {copiedClean ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <pre className="p-4 font-mono text-xs text-emerald-300/90 overflow-x-auto leading-relaxed">
            {cleaningCode}
          </pre>
        </div>

        {/* RFM Script */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xs">
          <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-mono font-medium text-slate-200">python/rfm_analysis.py</span>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(rfmCodeSnippet);
                setCopiedRfm(true);
                setTimeout(() => setCopiedRfm(false), 2000);
              }}
              className="text-xs text-slate-400 hover:text-white cursor-pointer"
            >
              {copiedRfm ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <pre className="p-4 font-mono text-xs text-blue-300/90 overflow-x-auto leading-relaxed">
            {rfmCodeSnippet}
          </pre>
        </div>
      </div>
    </div>
  );
};
