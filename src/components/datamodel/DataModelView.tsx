import React, { useState } from 'react';
import { 
  Network, 
  FileSpreadsheet, 
  Copy, 
  Check, 
  Search, 
  ArrowRight,
  Database,
  Calculator
} from 'lucide-react';
import { DAX_MEASURES_DATA } from '../../data/mockEcommerceDataset';
import { DaxMeasureItem } from '../../types/analytics';

export const DataModelView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const categories = ['All', 'Sales', 'Profitability', 'Time-Intelligence', 'Customer & Retention', 'Operations'];

  const filteredMeasures = DAX_MEASURES_DATA.filter(m => {
    const matchesCat = selectedCategory === 'All' || m.category === selectedCategory;
    const matchesSearch = 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.formula.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.explanation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopy = (formula: string, index: number) => {
    navigator.clipboard.writeText(formula);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
            <Network className="w-4 h-4" />
          </span>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Star Schema Data Model & DAX Formulas Library
          </h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Kimball-methodology dimensional model featuring central Fact tables, 4 Dimension tables, and 15+ production DAX measures
        </p>
      </div>

      {/* Visual Star Schema Architecture Diagram */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-blue-500" />
            <span>Star Schema Entity-Relationship Diagram</span>
          </h3>
          <span className="text-xs text-slate-500 font-mono">1-to-Many (1 : *) Filter Propagation</span>
        </div>

        {/* Schema Diagram Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* DimCustomer */}
          <div className="border border-blue-200 dark:border-blue-900/60 bg-blue-50/30 dark:bg-blue-950/20 rounded-xl p-3 text-xs space-y-2">
            <div className="flex items-center justify-between font-bold text-blue-900 dark:text-blue-200 border-b border-blue-200 dark:border-blue-800/60 pb-1.5">
              <span>DimCustomer</span>
              <span className="px-1.5 py-0.5 rounded bg-blue-200/60 dark:bg-blue-800 text-[10px]">DIM</span>
            </div>
            <ul className="space-y-1 font-mono text-[11px] text-slate-600 dark:text-slate-300">
              <li className="font-semibold text-blue-700 dark:text-blue-300">🔑 customer_id (PK)</li>
              <li>first_name, last_name</li>
              <li>email, phone</li>
              <li>city, state</li>
              <li>customer_segment</li>
              <li>rfm_score</li>
            </ul>
          </div>

          {/* FactOrders (Center 1) */}
          <div className="border-2 border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/20 rounded-xl p-3 text-xs space-y-2">
            <div className="flex items-center justify-between font-bold text-emerald-900 dark:text-emerald-200 border-b border-emerald-200 dark:border-emerald-800/60 pb-1.5">
              <span>FactOrders</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-200/60 dark:bg-emerald-800 text-[10px]">FACT</span>
            </div>
            <ul className="space-y-1 font-mono text-[11px] text-slate-600 dark:text-slate-300">
              <li className="font-semibold text-emerald-700 dark:text-emerald-300">🔑 order_id (PK)</li>
              <li>🔗 customer_id (FK &rarr; DimCustomer)</li>
              <li>📅 order_date (FK &rarr; DimDate)</li>
              <li>order_status</li>
              <li>payment_method</li>
              <li>shipping_type, cost</li>
              <li>delivery_date</li>
            </ul>
          </div>

          {/* FactOrderItems (Center 2) */}
          <div className="border-2 border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/20 rounded-xl p-3 text-xs space-y-2">
            <div className="flex items-center justify-between font-bold text-emerald-900 dark:text-emerald-200 border-b border-emerald-200 dark:border-emerald-800/60 pb-1.5">
              <span>FactOrderItems</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-200/60 dark:bg-emerald-800 text-[10px]">FACT</span>
            </div>
            <ul className="space-y-1 font-mono text-[11px] text-slate-600 dark:text-slate-300">
              <li className="font-semibold text-emerald-700 dark:text-emerald-300">🔑 order_item_id (PK)</li>
              <li>🔗 order_id (FK &rarr; FactOrders)</li>
              <li>🔗 product_id (FK &rarr; DimProduct)</li>
              <li>quantity</li>
              <li>unit_price</li>
              <li>discount_amount</li>
              <li>total_amount, profit</li>
            </ul>
          </div>

          {/* DimProduct */}
          <div className="border border-purple-200 dark:border-purple-900/60 bg-purple-50/30 dark:bg-purple-950/20 rounded-xl p-3 text-xs space-y-2">
            <div className="flex items-center justify-between font-bold text-purple-900 dark:text-purple-200 border-b border-purple-200 dark:border-purple-800/60 pb-1.5">
              <span>DimProduct</span>
              <span className="px-1.5 py-0.5 rounded bg-purple-200/60 dark:bg-purple-800 text-[10px]">DIM</span>
            </div>
            <ul className="space-y-1 font-mono text-[11px] text-slate-600 dark:text-slate-300">
              <li className="font-semibold text-purple-700 dark:text-purple-300">🔑 product_id (PK)</li>
              <li>product_name</li>
              <li>category_name</li>
              <li>subcategory</li>
              <li>brand</li>
              <li>cost_price</li>
              <li>selling_price</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-[11px] text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-200">Relationships:</span>
            <span>DimCustomer (1) &rarr; (*) FactOrders</span>
            <span>•</span>
            <span>DimProduct (1) &rarr; (*) FactOrderItems</span>
            <span>•</span>
            <span>FactOrders (1) &rarr; (*) FactOrderItems</span>
          </div>
          <span className="font-mono text-emerald-600 dark:text-emerald-400 font-medium">
            Single-Direction Filtering
          </span>
        </div>
      </div>

      {/* DAX Measures Search & Formula Cards */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-500" />
              <span>DAX Measures Library & Explanations</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Copy production-tested DAX calculations directly into Power BI Desktop
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search DAX measures..."
                className="text-xs pl-8 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-1 focus:ring-blue-500 w-44"
              />
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Measures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMeasures.map((m, idx) => (
            <div 
              key={m.name} 
              className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/40 dark:bg-slate-800/30 flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {m.name}
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-medium">
                    {m.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                  {m.explanation}
                </p>
              </div>

              {/* Code Box */}
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-xs text-emerald-300 relative group">
                <button
                  onClick={() => handleCopy(m.formula, idx)}
                  className="absolute right-2 top-2 p-1 rounded bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                  title="Copy DAX"
                >
                  {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <pre className="overflow-x-auto whitespace-pre leading-relaxed pr-8">
                  {m.formula}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
