import React, { useState } from 'react';
import { Lock, Mail, ShieldAlert, ArrowLeft, KeyRound, Sparkles } from 'lucide-react';
import { AdminUser } from '../types';
import { DEMO_ADMIN_USER } from '../data/mockData';

interface AdminLoginProps {
  onLoginSuccess: (user: AdminUser) => void;
  onBackToSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToSite }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      // Validate credentials
      if (
        (email.trim().toLowerCase() === 'dharsh@beyondstrangers.in' || email.trim().toLowerCase() === 'admin@beyondstrangers.in') &&
        password.length >= 6
      ) {
        onLoginSuccess(DEMO_ADMIN_USER);
      } else {
        setError('Invalid admin credentials. Use dharsh@beyondstrangers.in or click "Fill Demo Admin" below.');
      }
      setIsLoading(false);
    }, 600);
  };

  const handleFillDemo = () => {
    setEmail('dharsh@beyondstrangers.in');
    setPassword('strangers2026');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#070A08] text-[#E2E8F0] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#163625]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Back to Public Site link */}
      <button
        onClick={onBackToSite}
        className="absolute top-6 left-6 flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to public website</span>
      </button>

      <div className="w-full max-w-md bg-[#0F1411] border border-[#1E2E23] rounded-2xl p-8 shadow-2xl relative z-10">
        <div className="flex items-center justify-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#14291D] border border-[#26533B] flex items-center justify-center text-[#52B788]">
            <Lock className="w-6 h-6" />
          </div>
        </div>

        <div className="text-center mb-8">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#52B788] bg-[#112419] px-2.5 py-1 rounded-full border border-[#204732]">
            Restricted Access
          </span>
          <h1 className="text-2xl font-bold text-white mt-3 font-serif-editorial">
            Society CMS Portal
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Beyond Strangers administrative control center
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-lg bg-red-950/40 border border-red-800/60 flex items-start gap-2.5 text-xs text-red-200">
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@beyondstrangers.in"
                className="w-full bg-[#151D18] border border-[#23352B] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#438863] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#151D18] border border-[#23352B] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#438863] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 bg-[#1C4D35] hover:bg-[#256345] text-white font-medium py-3 rounded-xl text-xs tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="inline-block animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span>AUTHENTICATE & ENTER</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Fast Fill Button */}
        <div className="mt-6 pt-6 border-t border-[#1C2C22] text-center">
          <p className="text-[11px] text-neutral-400 mb-2.5">
            Testing portal credentials:
          </p>
          <button
            type="button"
            onClick={handleFillDemo}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#14231B] border border-[#224030] text-[11px] text-[#71C497] hover:bg-[#1A3025] transition-colors"
          >
            <Sparkles className="w-3 h-3 text-[#D4A373]" />
            <span>Use Founder Demo Login (dharsh@beyondstrangers.in)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
