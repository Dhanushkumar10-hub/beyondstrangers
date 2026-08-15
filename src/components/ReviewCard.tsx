import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Testimonial } from '../types';

interface ReviewCardProps {
  testimonial: Testimonial;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ testimonial }) => {
  return (
    <div
      id={`review-card-${testimonial.id}`}
      className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl relative flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-amber-400">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400" />
            ))}
          </div>
          <span className="text-[10px] font-bold bg-amber-950/80 text-amber-300 border border-amber-800/80 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Demo Testimonial
          </span>
        </div>

        <Quote className="w-8 h-8 text-emerald-900/60 mb-2" />
        <p className="text-sm text-stone-200 leading-relaxed italic">
          "{testimonial.quote}"
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-stone-800 flex items-center gap-3">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-600/50"
        />
        <div>
          <h4 className="text-xs font-bold text-stone-100">{testimonial.name}</h4>
          <p className="text-[11px] text-stone-400">
            {testimonial.city} • <span className="text-emerald-400 font-medium">{testimonial.tripName}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
