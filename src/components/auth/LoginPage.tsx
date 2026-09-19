import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  BarChart3, 
  Database, 
  ShieldCheck, 
  Sparkles, 
  UserCheck, 
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { AuthUser } from '../../types/analytics';

interface LoginPageProps {
  onLogin: (user: AuthUser) => void;
}

export const DEMO_USERS: AuthUser[] = [
  {
    id: 'USR-001',
    name: 'Anurag Verma',
    email: 'vermaanurag5003@gmail.com',
    role: 'Lead Data Analyst',
    department: 'Business Intelligence & BI Engineering',
    avatarInitials: 'AV',
    accessLevel: 'Admin'
  },
  {
    id: 'USR-002',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@ecommerce-bi.com',
    role: 'VP of E-Commerce & Merchandising',
    department: 'Executive Leadership',
    avatarInitials: 'SJ',
    accessLevel: 'Executive'
  },
  {
    id: 'USR-003',
    name: 'Marcus Chen',
    email: 'marcus.chen@ecommerce-bi.com',
    role: 'Operations & Logistics Manager',
    department: 'Supply Chain Analytics',
    avatarInitials: 'MC',
    accessLevel: 'Analyst'
  }
];

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState<string>('vermaanurag5003@gmail.com');
  const [password, setPassword] = useState<string>('DataAnalyst@2025');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please provide both your registered email and password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // Find matching demo user or create custom user profile
      const matchedUser = DEMO_USERS.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
      
      const loggedUser: AuthUser = matchedUser || {
        id: `USR-${Math.floor(100 + Math.random() * 900)}`,
        name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        email: email.trim(),
        role: 'Data Analyst Specialist',
        department: 'E-Commerce Analytics',
        avatarInitials: email.substring(0, 2).toUpperCase(),
        accessLevel: 'Analyst'
      };

      if (rememberMe) {
        localStorage.setItem('ecommerce_analytics_auth', JSON.stringify(loggedUser));
      }

      setIsLoading(false);
      onLogin(loggedUser);
    }, 600);
  };

  const handleQuickLogin = (demoUser: AuthUser) => {
    setEmail(demoUser.email);
    setPassword('AnalyticsPro@2025');
    setIsLoading(true);

    setTimeout(() => {
      if (rememberMe) {
        localStorage.setItem('ecommerce_analytics_auth', JSON.stringify(demoUser));
      }
      setIsLoading(false);
      onLogin(demoUser);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Background Subtle Gradient Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Enterprise Analytics Portal</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          🛒 E-Commerce Analytics
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-400">
          Sign in to access the PostgreSQL warehouse, RFM segmentation lab, and Power BI dashboards
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-xl relative z-10">
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 shadow-2xl rounded-2xl p-6 sm:p-8 space-y-6">
          
          {/* Quick 1-Click Role Login Selector */}
          <div>
            <div className="flex items-center justify-between text-xs mb-2.5">
              <span className="font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Quick Demo Login Profiles:</span>
              </span>
              <span className="text-[11px] text-slate-500">1-Click Access</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {DEMO_USERS.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => handleQuickLogin(u)}
                  className="p-2.5 rounded-xl border border-slate-800 hover:border-blue-500/60 bg-slate-800/40 hover:bg-slate-800/90 text-left transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-6 h-6 rounded-full bg-blue-600/30 text-blue-300 text-[10px] font-bold flex items-center justify-center border border-blue-500/40">
                      {u.avatarInitials}
                    </span>
                    <span className="text-xs font-semibold text-slate-200 group-hover:text-blue-400 truncate">
                      {u.name}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">{u.role}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="grow border-t border-slate-800"></div>
            <span className="shrink mx-3 text-[11px] text-slate-500 uppercase tracking-wider font-mono">
              Or sign in with credentials
            </span>
            <div className="grow border-t border-slate-800"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Work Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="analyst@company.com"
                  className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-950/60 border border-slate-700/80 rounded-lg text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-slate-300">
                  Password
                </label>
                <span className="text-[11px] text-slate-500">
                  Default: DataAnalyst@2025
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full text-xs pl-9 pr-10 py-2.5 bg-slate-950/60 border border-slate-700/80 rounded-lg text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer"
                />
                <span>Remember session on this device</span>
              </label>

              <span className="text-slate-500 hover:text-blue-400 cursor-pointer text-[11px]">
                Forgot password?
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 shadow-md shadow-blue-600/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Authenticating Workspace...</span>
                </div>
              ) : (
                <>
                  <span>Sign In to Analytics Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Highlights & Security Badges */}
          <div className="pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center text-[10px] text-slate-400">
            <div className="flex flex-col items-center gap-1">
              <Database className="w-3.5 h-3.5 text-blue-400" />
              <span>50,000+ PostgreSQL Records</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Power BI Star Schema</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>Role-Based Access Control</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
