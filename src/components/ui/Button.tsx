// src/components/ui/Button.tsx
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'ghost' | 'accent';
  children: React.ReactNode;
}

export default function Button({ variant = 'ghost', children, className = '', ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center px-8 py-4 text-[11px] tracking-[3px] uppercase font-body transition-all duration-300 cursor-pointer';

  const variants = {
    ghost: 'border border-text/30 text-text hover:bg-text hover:text-bg-deep',
    accent: 'bg-bg-deep text-text border border-line hover:bg-gradient-to-br hover:from-gold-deep hover:to-gold hover:text-bg-deep hover:border-gold',
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
