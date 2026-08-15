import React from 'react';
import { ArrowRight } from 'lucide-react';

export interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  ariaLabel?: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  icon,
  fullWidth = false,
  size = 'md',
  ariaLabel,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'h-10 px-4 text-xs',
    md: 'h-12 sm:h-13 px-6 text-xs sm:text-sm',
    lg: 'h-14 sm:h-15 px-8 text-sm sm:text-base'
  }[size];

  return (
    <button
      type={props.type || 'button'}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      className={`
        btn-primary
        bg-[#080808] hover:bg-neutral-900 active:bg-black
        text-white font-semibold tracking-wider uppercase rounded-xl
        shadow-sm flex items-center justify-center gap-2
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#080808] focus-visible:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${fullWidth ? 'w-full' : 'w-auto'}
        ${sizeClasses}
        ${className}
      `}
      {...props}
    >
      <span>{children}</span>
      {icon !== undefined ? icon : <ArrowRight className="w-4 h-4" />}
    </button>
  );
};
