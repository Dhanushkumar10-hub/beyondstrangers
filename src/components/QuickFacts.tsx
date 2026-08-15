import React from 'react';
import { Users, ShieldCheck, Coffee, Mountain, Sparkles, HeartHandshake } from 'lucide-react';

export const QuickFacts: React.FC = () => {
  const facts = [
    {
      icon: Users,
      title: 'Solo Friendly',
      subtitle: '90% join alone'
    },
    {
      icon: Mountain,
      title: 'Local Guides',
      subtitle: 'Native wilderness experts'
    },
    {
      icon: ShieldCheck,
      title: 'Verified Stays',
      subtitle: 'Private curated estates'
    },
    {
      icon: HeartHandshake,
      title: 'Safe Cohorts',
      subtitle: 'Pre-screened travelers'
    }
  ];

  return (
    <section className="py-12 bg-[#F7F5EF] border-y border-[#A8BFA3]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {facts.map((fact, idx) => {
            const Icon = fact.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#D8C3A5]/30 border border-[#A8BFA3]/60 flex items-center gap-3.5"
              >
                <div className="p-2.5 rounded-lg bg-[#183A2A] text-[#F7F5EF] shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-sm font-serif font-bold text-[#202622]">
                    {fact.title}
                  </h4>
                  <p className="text-xs text-[#202622]/70 font-mono">
                    {fact.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
