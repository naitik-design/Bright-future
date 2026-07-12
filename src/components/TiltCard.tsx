import React from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export function TiltCard({ children, className = '' }: TiltCardProps) {
  return (
    <div
      className={`relative select-none cursor-pointer transition-all duration-300 ease-out 
        hover:-translate-y-1 hover:scale-[1.02] 
        hover:shadow-[0_12px_24px_rgba(255,90,54,0.08)] 
        ${className}`}
    >
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
