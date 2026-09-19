import React, { useState } from 'react';
import { 
  Database, 
  Play, 
  Copy, 
  Check, 
  Clock, 
  Search, 
  Sparkles,
  Terminal,
  Table as TableIcon
} from 'lucide-react';
import { SQL_BUSINESS_QUERIES } from '../../data/mockEcommerceDataset';
import { executeSqlQuery, QueryResult } from '../../utils/sqlEngine';
import { SqlQueryItem } from '../../types/analytics';

export const SqlStudio: React.FC = () => {
  const [selectedQueryId, setSelectedQueryId] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [queryResult, setQueryResult] = useState<QueryResult>(() => executeSqlQuery(1));
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const categories = [
    'All',
    'Overview',
    'Sales Trends',
    'Products',
    'Customers & RFM',
    'Logistics & Operations',
    'Advanced Window'
  ];

  const currentQuery: SqlQueryItem = 
    SQL_BUSINESS_QUERIES.find(q => q.id === selectedQueryId) || SQL_BUSINESS_QUERIES[0];

  const filteredQueries = SQL_BUSINESS_QUERIES.filter(q => {
    const matchesCat = selectedCategory === 'All' || q.category === selectedCategory;
    const matchesSearch = 
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.sql.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSelectQuery = (id: number) => {
    setSelectedQueryId(id);
    setQueryResult(executeSqlQuery(id));
  };

  const handleRunQuery = () => {
    setIsRunning(true);
    setTimeout(() => {
      setQueryResult(executeSqlQuery(selectedQueryId));
      setIsRunning(false);
    }, 120);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(currentQuery.sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Studio Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
                <Database className="w-4 h-4" />
              </span>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Interactive SQL Studio & Warehouse Query Engine
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              25 Production-grade analytical PostgreSQL queries utilizing CTEs, Window Functions (RANK, DENSE_RANK, LAG), and Aggregations
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-mono bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700">
              PostgreSQL 16 Compatible
            </span>
          </div>
        </div>
      </div>

      {/* Main Studio Grid: Left Sidebar (Query Explorer) + Right Workspace (Code & Execution) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Query Navigator (4 Cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Business Queries ({filteredQueries.length}/25)
            </span>
            <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">
              Live Runner
            </span>
          </div>

          {/* Search input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 25 SQL queries..."
              className="w-full text-xs pl-8 pr-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-[11px] px-2 py-0.5 rounded-full whitespace-nowrap font-medium transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Queries List */}
          <div className="space-y-1.5 max-h-[560px] overflow-y-auto pr-1">
            {filteredQueries.map((q) => {
              const isSelected = selectedQueryId === q.id;
              return (
                <button
                  key={q.id}
                  onClick={() => handleSelectQuery(q.id)}
                  className={`w-full text-left p-2.5 rounded-lg text-xs transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 text-blue-900 dark:text-blue-100 shadow-xs'
                      : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-semibold truncate">{q.title}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span className="px-1.5 py-0.2 rounded bg-slate-200/60 dark:bg-slate-800 font-mono">
                      {q.category}
                    </span>
                    <span>~{q.executionMs}ms</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Code Editor & Result Pane (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Query Code Panel */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xs">
            {/* Action Bar */}
            <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-medium text-slate-200">
                  {currentQuery.title}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopySql}
                  className="flex items-center gap-1 text-xs text-slate-300 hover:text-white px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
                  title="Copy SQL code"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>

                <button
                  onClick={handleRunQuery}
                  disabled={isRunning}
                  className="flex items-center gap-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-md transition-colors cursor-pointer shadow-sm disabled:opacity-50"
                >
                  <Play className={`w-3 h-3 fill-current ${isRunning ? 'animate-spin' : ''}`} />
                  <span>{isRunning ? 'Executing...' : 'Run Query'}</span>
                </button>
              </div>
            </div>

            {/* SQL Code Block */}
            <div className="p-4 font-mono text-xs text-emerald-300/90 overflow-x-auto max-h-64 leading-relaxed whitespace-pre selection:bg-blue-600">
              {currentQuery.sql}
            </div>

            {/* Query Metadata / Business Objective */}
            <div className="bg-slate-900/80 px-4 py-2 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <div>
                <span className="font-semibold text-slate-300">Objective:</span> {currentQuery.description}
              </div>
              <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 shrink-0 ml-2">
                <Clock className="w-3 h-3 text-emerald-400" />
                <span>{queryResult.executionTimeMs} ms</span>
              </div>
            </div>
          </div>

          {/* Results Tabular View */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TableIcon className="w-4 h-4 text-blue-500" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Execution Output ({queryResult.rowCount} rows returned)
                </h3>
              </div>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono font-medium">
                SUCCESS (200 OK)
              </span>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800 max-h-72">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-semibold font-mono">
                    {queryResult.columns.map((col) => (
                      <th key={col} className="py-2 px-3 whitespace-nowrap">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono text-[11px]">
                  {queryResult.rows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      {queryResult.columns.map((col) => (
                        <td key={col} className="py-2 px-3 text-slate-800 dark:text-slate-200 whitespace-nowrap">
                          {String(row[col] ?? '')}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
