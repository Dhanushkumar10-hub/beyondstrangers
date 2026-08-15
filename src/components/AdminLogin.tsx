import React, { useState } from 'react';
import { Shield, Lock, ArrowRight, ArrowLeft } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBackToSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToSite }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: 1234
    if (pin === '1234' || pin === 'admin') {
      onLoginSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-[#F7F5EF]">
      <div className="w-full max-w-md bg-[#F7F5EF] border border-[#A8BFA3] rounded-3xl p-8 shadow-xl space-y-6 text-[#202622]">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#183A2A] text-[#D8C3A5] flex items-center justify-center mx-auto shadow-md">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold font-serif text-[#183A2A]">
            Operator Portal
          </h2>
          <p className="text-xs text-[#202622]/70 font-mono">
            Beyond Strangers Cohort Management
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-mono font-semibold text-[#202622] block mb-1.5">
              Access PIN / Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="Enter 4-digit PIN (1234)"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className={`w-full bg-white border ${
                  error ? 'border-[#9E3A3A]' : 'border-[#A8BFA3]'
                } rounded-xl px-4 py-3 text-sm text-[#202622] focus:border-[#183A2A] outline-none font-mono tracking-widest`}
              />
              <Lock className="w-4 h-4 text-[#183A2A]/50 absolute right-3.5 top-3.5" />
            </div>
            {error && (
              <p className="text-xs text-[#9E3A3A] font-mono mt-1">
                Invalid PIN code. Use demo PIN: 1234
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn-primary text-xs py-3 w-full flex items-center justify-center gap-2"
          >
            <span>AUTHENTICATE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-[#A8BFA3]/40 text-center">
          <button
            onClick={onBackToSite}
            className="text-xs font-mono text-[#183A2A] hover:text-[#2F6B45] inline-flex items-center gap-1.5 font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Site</span>
          </button>
        </div>

      </div>
    </div>
  );
};
