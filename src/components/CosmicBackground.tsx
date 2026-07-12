import React, { useMemo, useRef, useEffect } from 'react';

export function CosmicBackground() {
  // Generate stable coordinates for background stars to prevent layout recalculations
  const stars = useMemo(() => {
    const starList = [];
    const count = 55;
    for (let i = 0; i < count; i++) {
      starList.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.65 + 0.2,
        delay: Math.random() * 6,
        duration: Math.random() * 5 + 3,
      });
    }
    return starList;
  }, []);

  // Refs for high-performance direct style manipulation (No React re-renders on scroll!)
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const layer4Ref = useRef<HTMLDivElement>(null);
  const layer5Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scrollRafId: number | null = null;

    const handleScroll = () => {
      if (scrollRafId !== null) return;

      scrollRafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = docHeight > 0 ? scrollY / docHeight : 0;

        // Calculate parallax values matching previous design ratios
        const parallaxBaseY = -scrollProgress * 150;
        const parallaxMidY = -scrollProgress * 280;

        if (layer1Ref.current) {
          layer1Ref.current.style.transform = `translate3d(0, ${parallaxBaseY * 0.3}px, 0)`;
        }
        if (layer2Ref.current) {
          layer2Ref.current.style.transform = `translate3d(0, ${parallaxMidY * 0.6}px, 0)`;
        }
        if (layer3Ref.current) {
          layer3Ref.current.style.transform = `translate3d(0, ${parallaxBaseY * 0.5}px, 0)`;
        }
        if (layer4Ref.current) {
          layer4Ref.current.style.transform = `translate3d(0, ${parallaxMidY * 0.4}px, 0)`;
        }
        if (layer5Ref.current) {
          layer5Ref.current.style.transform = `translate3d(0, ${parallaxBaseY * 0.25}px, 0)`;
        }

        scrollRafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once initially to establish correct positions
    handleScroll();

    return () => {
      if (scrollRafId !== null) cancelAnimationFrame(scrollRafId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div id="cosmic-bg" className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0 bg-[#050608]">
      
      {/* 1. Base Continuous Deep Space Blue Gradient */}
      <div 
        ref={layer1Ref}
        className="absolute inset-0 w-full h-[140%] will-change-transform"
        style={{
          background: 'radial-gradient(ellipse at 50% 20%, #111827 0%, #050608 70%)',
        }}
      />

      {/* 2. Massive Colorful Nebula Clouds and Cosmic Energy */}
      <div 
        ref={layer2Ref}
        className="absolute inset-0 w-full h-[150%] will-change-transform"
      >
        {/* Nebula Violet Cloud */}
        <div 
          className="absolute w-[65vw] h-[65vw] rounded-full bg-[#7c3aed]/10 blur-[130px] md:blur-[180px] -left-[10%] top-[10%] pointer-events-none"
          style={{
            animation: 'cosmicDrift 35s ease-in-out infinite alternate',
          }}
        />

        {/* Nebula Cyan Cloud */}
        <div 
          className="absolute w-[70vw] h-[70vw] rounded-full bg-[#22d3ee]/8 blur-[150px] md:blur-[220px] -right-[15%] top-[35%] pointer-events-none"
          style={{
            animation: 'cosmicDrift 40s ease-in-out infinite alternate-reverse',
          }}
        />

        {/* Nebula Orange Cloud (Kept for contrast) */}
        <div 
          className="absolute w-[50vw] h-[50vw] rounded-full bg-[#FF5A36]/8 blur-[150px] md:blur-[220px] right-[25%] top-[25%] pointer-events-none"
          style={{
            animation: 'cosmicDrift 40s ease-in-out infinite alternate',
          }}
        />

        {/* Soft Volumetric Light Rays */}
        <div className="absolute top-[15%] left-[5%] w-[80%] h-[400px] bg-gradient-to-tr from-transparent via-[#22d3ee]/3 to-transparent blur-[120px] rotate-35 pointer-events-none" />
        <div className="absolute top-[50%] right-[5%] w-[70%] h-[500px] bg-gradient-to-bl from-transparent via-[#7c3aed]/3 to-transparent blur-[130px] -rotate-25 pointer-events-none" />
      </div>

      {/* 3. Subtle Space Fog / Dust Overlay */}
      <div 
        ref={layer3Ref}
        className="absolute inset-0 w-full h-[130%] opacity-20 bg-gradient-to-b from-[#111827]/10 via-[#7c3aed]/5 to-transparent mix-blend-screen will-change-transform"
      />

      {/* 4. Distant Moon / Planets */}
      <div 
        ref={layer4Ref}
        className="absolute inset-0 w-full h-[150%] will-change-transform"
      >
        {/* Hero Planet */}
        <div className="absolute left-[5%] top-[5%] w-24 h-24 rounded-full bg-gradient-to-br from-[#22d3ee]/40 via-[#111827] to-[#050414] border border-white/5 shadow-[0_0_20px_rgba(34,211,238,0.15)] opacity-60">
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>
        <div className="absolute left-[2%] top-[6.5%] w-48 h-8 border-t-2 border-r-2 border-[#22d3ee]/20 rounded-full rotate-[25deg] opacity-40 blur-[0.5px]" />

        {/* Mid Cinematic Distant Planet */}
        <div className="absolute right-[12%] top-[18%] w-16 h-16 rounded-full bg-gradient-to-br from-[#FF5A36]/40 via-[#111827] to-[#050414] border border-white/5 shadow-[0_0_20px_rgba(255,90,54,0.15)] opacity-85">
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>
        <div className="absolute right-[9%] top-[19.5%] w-32 h-6 border-t-2 border-r-2 border-[#F6C453]/15 rounded-full rotate-15 opacity-50 blur-[0.5px]" />

        {/* Footer/Lower Planet */}
        <div className="absolute left-[15%] top-[85%] w-20 h-20 rounded-full bg-gradient-to-br from-[#7c3aed]/40 via-[#111827] to-[#050414] border border-white/5 shadow-[0_0_20px_rgba(124,58,237,0.15)] opacity-70">
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>
        <div className="absolute left-[12%] top-[86.5%] w-40 h-8 border-t-2 border-r-2 border-[#7c3aed]/20 rounded-full rotate-[-15deg] opacity-50 blur-[0.5px]" />

        {/* Frozen Moon */}
        <div className="absolute left-[8%] top-[65%] w-10 h-10 rounded-full bg-gradient-to-tl from-[#5B21B6]/30 via-[#111827] to-black border border-white/5 shadow-[0_0_15px_rgba(91,33,182,0.1)] opacity-70">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black via-transparent to-transparent" />
        </div>
      </div>

      {/* 5. Starfield & Twinkling Stars */}
      <div 
        ref={layer5Ref}
        className="absolute inset-0 w-full h-[140%] will-change-transform"
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {stars.map((star) => (
            <circle
              key={star.id}
              cx={`${star.x}%`}
              cy={`${star.y}%`}
              r={star.size}
              fill={star.id % 3 === 0 ? "rgba(186,230,253,0.75)" : "rgba(255,255,255,0.75)"}
              opacity={star.opacity}
              style={{
                animation: `twinkle ${star.duration}s infinite ease-in-out`,
                animationDelay: `${star.delay}s`,
                transformOrigin: `${star.x}% ${star.y}%`,
              }}
            />
          ))}
        </svg>
      </div>

      {/* Embedded CSS for custom keyframes and shooting star aesthetics */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.8); }
          50% { opacity: 0.85; transform: scale(1.2); }
        }
        @keyframes cosmicDrift {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(2.5%, 1.5%, 0); }
          100% { transform: translate3d(-1.5%, -2%, 0); }
        }
      `}</style>

    </div>
  );
}
