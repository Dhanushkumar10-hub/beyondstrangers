import React from 'react';

export interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  ariaLabel?: string;
  variant?: 'outline' | 'tint';
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  icon,
  fullWidth = false,
  size = 'md',
  ariaLabel,
  variant = 'outline',
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'h-10 px-3.5 text-xs',
    md: 'h-12 sm:h-13 px-5 text-xs sm:text-sm',
    lg: 'h-14 sm:h-15 px-6 text-sm'
  }[size];

  const variantClasses = variant === 'tint'
    ? 'bg-[#D4CADF]/30 hover:bg-[#D4CADF]/60 text-[#080808] border border-[#D5D1D7]'
    : 'bg-transparent hover:bg-[#D4CADF]/25 text-[#080808] border border-[#D6D1D7] hover:border-[#080808]';

  return (
    <button
      type={props.type || 'button'}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      className={`
        btn-secondary
        ${variantClasses}
        font-medium rounded-xl transition-all
        flex items-center justify-center gap-2
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#080808] focus-visible:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${fullWidth ? 'w-full' : 'w-auto'}
        ${sizeClasses}
        ${className}
      `}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
};
