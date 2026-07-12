import React from 'react';

interface NavbarProps {
  onLaunch?: () => void;
}

export function Navbar({ onLaunch }: NavbarProps) {
  const ArrowUpRight = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 ml-1">
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );

  const handleLinkClick = (e: React.MouseEvent, link: string) => {
    e.preventDefault();
    if (link === 'Plan Launch' && onLaunch) {
      onLaunch();
    }
  };

  return (
    <nav className="fixed top-4 left-0 right-0 px-8 lg:px-16 z-50 flex items-center justify-between pointer-events-none">
      <div 
        className="w-12 h-12 rounded-full bg-[#0B0E13] flex items-center justify-center pointer-events-auto cursor-pointer border border-brand-orange/30 hover:border-brand-orange transition-all" 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <span className="font-heading italic lowercase text-2xl mt-1 text-brand-orange font-bold drop-shadow-[0_0_8px_rgba(255,90,54,0.3)]">a</span>
      </div>
      
      <div className="hidden md:flex p-1.5 rounded-full items-center gap-1 pointer-events-auto border border-white/10 bg-[#0B0E13]">
        {['Home', 'Voyages', 'Worlds', 'Innovation', 'Plan Launch'].map((link) => (
          <a
            key={link}
            href="#"
            onClick={(e) => handleLinkClick(e, link)}
            className="px-4 py-2 text-sm font-medium text-text-secondary font-body hover:text-brand-orange hover:bg-white/5 rounded-full transition-all"
          >
            {link}
          </a>
        ))}
        <button
          onClick={onLaunch}
          className="btn-luxury-gradient text-white px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-1 ml-2 whitespace-nowrap cursor-pointer transform hover:scale-105 active:scale-95 transition-all font-body"
        >
          Claim a Spot <ArrowUpRight />
        </button>
      </div>

      <div className="w-12 h-12 invisible" />
    </nav>
  );
}

