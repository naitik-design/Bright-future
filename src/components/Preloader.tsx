import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [telemetry, setTelemetry] = useState('INITIATING CORE SYSTEMS...');
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    // Progress interval - much faster on reduced motion
    const duration = prefersReduced ? 500 : 2200;
    const startTime = performance.now();

    const telemetryPhrases = [
      'INITIATING QUANTUM ENGINE...',
      'CALIBRATING GRAVITATIONAL LENSES...',
      'SYNCHRONIZING WARP VECTOR...',
      'CHARGING CRYSTALLINE MATRIX...',
      'ESTABLISHING DEEP-SPACE LINK...',
      'READY FOR LIFTOFF'
    ];

    const updateProgress = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const currentProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(Math.floor(currentProgress));

      // Telemetry shifting
      const phraseIndex = Math.min(
        Math.floor((currentProgress / 100) * telemetryPhrases.length),
        telemetryPhrases.length - 1
      );
      setTelemetry(telemetryPhrases[phraseIndex]);

      if (elapsed < duration) {
        requestAnimationFrame(updateProgress);
      } else {
        // Fade out animation
        const preloader = document.getElementById('preloader-container');
        if (preloader) {
          gsap.to(preloader, {
            opacity: 0,
            scale: prefersReduced ? 1.0 : 1.05,
            filter: 'none',
            duration: prefersReduced ? 0.35 : 0.8,
            ease: 'power3.inOut',
            onComplete: onComplete
          });
        } else {
          onComplete();
        }
      }
    };

    requestAnimationFrame(updateProgress);
  }, [onComplete, prefersReduced]);

  return (
    <div
      id="preloader-container"
      className="fixed inset-0 bg-bg-primary z-[9999] flex flex-col items-center justify-center font-mono overflow-hidden select-none"
    >
      {/* Volumetric glow */}
      <div className="absolute w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse" />
      <div className="absolute w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-[100px] top-1/3 left-1/3 pointer-events-none" />

      {/* Futuristic corner borders */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-white/20" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-white/20" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-white/20" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-white/20" />

      {/* Main progress visual */}
      <div className="relative flex flex-col items-center">
        {/* Glowing circular loader */}
        <div className="relative w-40 h-40 flex items-center justify-center">
          <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-white/5 fill-none"
              strokeWidth="2"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-brand-orange fill-none"
              strokeWidth="2"
              strokeDasharray={`${2 * Math.PI * 44}`}
              strokeDashoffset={`${2 * Math.PI * 44 * (1 - progress / 100)}`}
              style={{
                filter: 'drop-shadow(0 0 8px rgba(255, 90, 54, 0.6))',
                transition: 'stroke-dashoffset 0.05s linear'
              }}
            />
          </svg>
          
          <div className="text-center">
            <div className="text-4xl font-light text-white tracking-widest">{progress}%</div>
            <div className="text-[9px] text-brand-gold tracking-[0.2em] mt-1">SYS_LOAD</div>
          </div>
        </div>

        {/* Telemetry log lines */}
        <div className="mt-12 text-center max-w-sm px-4">
          <div className="text-white/40 text-[10px] tracking-widest uppercase mb-1">
            ANTIGRAVITY DEEP VOYAGER // V.2026
          </div>
          <div className="text-xs text-brand-orange font-semibold tracking-wider min-h-[20px] select-none uppercase">
            {telemetry}
          </div>
          <div className="text-[9px] text-white/20 mt-4 font-mono leading-relaxed max-w-[280px] mx-auto">
            TERA-FORM LINK ACQUISITION // LATENCY 4.2ms // SECURE LINK ACTIVE
          </div>
        </div>
      </div>
    </div>
  );
}
