import React from 'react';
import { 
  BarChart3, 
  Database, 
  Code2, 
  Network, 
  FileText, 
  FolderGit2, 
  Sparkles,
  Download,
  LogOut,
  UserCheck
} from 'lucide-react';
import { TabType, AuthUser } from '../types/analytics';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onExportAll: () => void;
  currentUser?: AuthUser | null;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  setActiveTab, 
  onExportAll,
  currentUser,
  onLogout
}) => {
  const tabs = [
    { id: 'dashboard' as TabType, label: 'Power BI Dashboard', icon: BarChart3, badge: '5 Pages' },
    { id: 'sql' as TabType, label: 'SQL Studio', icon: Database, badge: '25 Queries' },
    { id: 'python' as TabType, label: 'Python & RFM Lab', icon: Code2, badge: 'EDA & Audit' },
    { id: 'datamodel' as TabType, label: 'Star Schema & DAX', icon: Network, badge: '15+ Measures' },
    { id: 'reports' as TabType, label: 'Business Insights', icon: FileText, badge: 'Strategic' },
    { id: 'files' as TabType, label: 'Project Files & Code', icon: FolderGit2, badge: 'Repo' },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <Sparkles className="w-3 h-3 mr-1" /> Portfolio Ready
              </span>
              <span className="text-xs text-slate-400 font-mono">PostgreSQL • Python • Power BI • DAX</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
              🛒 E-Commerce Sales & Customer Analytics
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              End-to-End Data Analytics System • Raw Data ➔ Cleaning ➔ SQL Warehouse ➔ RFM Segmentation ➔ Power BI
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* User Profile Chip */}
            {currentUser && (
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-800/90 border border-slate-700 text-xs">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                  {currentUser.avatarInitials}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-slate-200 leading-tight truncate max-w-[120px]">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-blue-400 font-medium">
                    {currentUser.accessLevel}
                  </div>
                </div>
                {onLogout && (
                  <button
                    onClick={onLogout}
                    title="Sign Out of Portal"
                    className="ml-1 p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}

            <button
              onClick={onExportAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-colors cursor-pointer"
              title="Download full project portfolio zip / scripts"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Portfolio</span>
            </button>

            <div className="hidden lg:flex items-center text-xs text-slate-400 border border-slate-700 rounded-lg px-2.5 py-1.5 bg-slate-800/60 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2"></span>
              7.6M+ Rev
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 mt-4 overflow-x-auto pb-1 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                      isActive
                        ? 'bg-blue-800 text-blue-100'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
