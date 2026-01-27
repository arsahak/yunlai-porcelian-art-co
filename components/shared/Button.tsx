'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  textColor?: string;
  bgColor?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button = ({
  children,
  href,
  onClick,
  className = '',
  textColor = 'text-white',
  bgColor = 'bg-black',
  type = 'button',
  disabled = false,
}: ButtonProps) => {
  const baseStyles = `
    inline-flex items-center justify-center 
    rounded-full px-8 py-3 
    font-medium text-lg tracking-wide
    transition-all duration-300 ease-in-out
    transform hover:-translate-y-0.5 active:translate-y-0
    shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_4px_10px_rgba(0,0,0,0.3)]
    hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_6px_15px_rgba(0,0,0,0.4)]
    ${bgColor}
    ${textColor}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  if (href) {
    return (
      <Link href={href} className={baseStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseStyles}
    >
      {children}
    </button>
  );
};

export default Button;