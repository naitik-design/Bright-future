import { motion } from 'motion/react';
import { Compass, ArrowUp, Send, Heart } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Vehicles", href: "#voyages" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#innovation" },
    { label: "Contact", href: "#contact" }
  ];

  const socialLinks = [
    { name: "GitHub Studio", href: "#" },
    { name: "LinkedIn Network", href: "#" },
    { name: "Quantum Twitter", href: "#" }
  ];

  return (
    <footer className="relative bg-bg-primary pt-20 pb-10 border-t border-white/5 overflow-hidden">
      
      {/* Background Volumetric Highlights */}
      <div className="absolute w-[300px] h-[300px] bg-brand-orange/5 rounded-full blur-[90px] left-1/4 -bottom-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* Upper Row: Brand info, Nav links, Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-4 flex flex-col items-start">
            {/* Animated Logo */}
            <div className="flex items-center gap-2 cursor-pointer mb-6 group">
              <Compass className="w-6 h-6 text-brand-orange animate-spin-slow group-hover:text-brand-gold transition-colors" />
              <span className="font-heading italic text-white text-xl font-bold tracking-tight">
                VELOCITY <span className="text-brand-orange">WEB GL</span>
              </span>
            </div>
            
            <p className="text-text-secondary text-xs md:text-sm font-body font-light leading-relaxed mb-6 max-w-xs">
              Engineering elite, high-performance web experiences with 3D WebGL interactions and buttery-smooth luxury design animations.
            </p>

            <span className="bg-brand-orange/5 text-brand-orange border border-brand-orange/15 rounded-full px-3 py-1 text-[10px] font-mono">
              ENGINE_RENDERER // ONLINE
            </span>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-4">
            <h5 className="text-[10px] font-mono text-brand-gold tracking-widest uppercase mb-6">PORTFOLIO INDEX</h5>
            <div className="grid grid-cols-2 gap-4">
              {navLinks.map((link, idx) => (
                <a 
                  key={idx}
                  href={link.href}
                  className="text-xs text-text-secondary hover:text-brand-orange font-body font-light transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Newsletter Registry */}
          <div className="md:col-span-4 flex flex-col items-start">
            <h5 className="text-[10px] font-mono text-brand-gold tracking-widest uppercase mb-6">NEWSLETTER MATRIX</h5>
            <p className="text-xs text-text-secondary font-body font-light mb-4">
              Subscribe to secure real-time alerts on premium development vacancies and code releases.
            </p>

            <div className="w-full flex">
              <input 
                type="email" 
                placeholder="Email address..." 
                className="w-full bg-[#0B0E13]/60 border border-white/10 rounded-l-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-orange/60 placeholder-white/20 font-body font-light"
              />
              <button 
                className="bg-brand-orange hover:bg-brand-hover text-white px-4 rounded-r-xl transition-colors cursor-pointer flex items-center justify-center shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Lower Row: Back-To-Top, Social links, Copyright */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Social Links */}
          <div className="flex gap-6">
            {socialLinks.map((soc, idx) => (
              <a 
                key={idx}
                href={soc.href}
                className="text-xs text-text-muted hover:text-white transition-colors font-mono"
              >
                {soc.name}
              </a>
            ))}
          </div>

          {/* Copyright details */}
          <div className="text-[10px] font-mono text-text-muted flex items-center gap-1.5">
            <span>© 2026 VELOCITY WEB DESIGN. ALL RIGHTS RESERVED.</span>
            <Heart className="w-3 h-3 text-brand-orange fill-current" />
          </div>

          {/* Premium Back-to-Top trigger button */}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full liquid-glass border-white/10 hover:border-brand-orange text-white hover:text-brand-orange flex items-center justify-center transition-all cursor-pointer shadow-lg hover:shadow-[0_0_15px_rgba(255,90,54,0.25)] shrink-0"
          >
            <ArrowUp className="w-4 h-4" />
          </button>

        </div>

      </div>
    </footer>
  );
}
