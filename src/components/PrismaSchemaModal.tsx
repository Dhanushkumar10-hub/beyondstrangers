import React, { useState } from 'react';
import { X, Code2, Copy, Check, Database, Server } from 'lucide-react';
import { PRISMA_SCHEMA_STRING } from '../data/mockData';

interface PrismaSchemaModalProps {
  onClose: () => void;
}

export const PrismaSchemaModal: React.FC<PrismaSchemaModalProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PRISMA_SCHEMA_STRING);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div 
        id="prisma-schema-dialog"
        className="relative w-full max-w-3xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5 max-h-[85vh] flex flex-col"
      >
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-950/80 text-amber-300 border border-amber-800 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-100 flex items-center gap-2">
                PostgreSQL & Prisma Schema
                <span className="text-[10px] bg-emerald-950 text-emerald-300 font-mono px-2 py-0.5 rounded border border-emerald-800">
                  Production-Ready
                </span>
              </h3>
              <p className="text-xs text-stone-400">
                Database models for Users, Trips, Bookings, Leaders, and Community Posts.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-200 px-3 py-1.5 rounded-xl border border-stone-700 flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Schema'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white rounded-xl hover:bg-stone-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Code View */}
        <div className="flex-1 bg-stone-950 border border-stone-800 rounded-2xl p-4 overflow-y-auto font-mono text-xs text-emerald-300 leading-relaxed shadow-inner">
          <pre>{PRISMA_SCHEMA_STRING}</pre>
        </div>

        <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
          <span className="flex items-center gap-1.5 text-stone-400">
            <Server className="w-4 h-4 text-emerald-400" />
            <span>PostgreSQL 16 compliant • UUID PKs • Index-optimized</span>
          </span>
          <button
            onClick={onClose}
            className="text-xs font-bold bg-stone-800 hover:bg-stone-700 text-stone-200 px-4 py-2 rounded-xl"
          >
            Close Schema View
          </button>
        </div>

      </div>
    </div>
  );
};
