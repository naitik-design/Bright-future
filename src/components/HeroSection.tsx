import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { BlurText } from './BlurText';

interface HeroSectionProps {
  onLaunch?: () => void;
}

export function HeroSection({ onLaunch }: HeroSectionProps) {
  const [videoStatus, setVideoStatus] = useState<'loading' | 'playing' | 'error'>('loading');
  const [prefersReduced, setPrefersReduced] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setVideoStatus('playing');
    };

    const handleError = (e: Event) => {
      setVideoStatus('error');
      const target = e.target as HTMLVideoElement;
      console.error("Hero video failed to load:", target.error);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);

    if (video.readyState >= 3) {
      setVideoStatus('playing');
    }

    let hasLeft = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (hasLeft && video.currentTime > 0) {
              video.currentTime = 0;
            }
            hasLeft = false;
            video.play().catch((err) => {
              console.warn("Hero video play prevented:", err);
            });
          } else {
            video.pause();
            hasLeft = true;
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(video);

    const handleEnded = () => {
      video.pause();
    };
    video.addEventListener('ended', handleEnded);

    return () => {
      observer.disconnect();
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const PlayIcon = () => (
    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
      <polygon points="6 4 20 12 6 20 6 4" />
    </svg>
  );

  const ArrowUpRight = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      <div className="hero-bg-video absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
        {videoStatus === 'loading' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
          </div>
        )}
        <video
          ref={videoRef}
          src="https://res.cloudinary.com/jmoelmzp/video/upload/934b7ed8-6bd6-4bf3-8ee8-987464e4d664_atg7sg.mp4"
          poster="https://res.cloudinary.com/jmoelmzp/video/upload/934b7ed8-6bd6-4bf3-8ee8-987464e4d664_atg7sg.jpg"
          className="absolute inset-0 object-cover"
          style={{ width: "100%", height: "100%" }}
          autoPlay
          muted
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/50" />
      </div>

      <div className="hero-text-container relative z-10 flex-1 flex flex-col items-center justify-center pt-24 px-4">
        <motion.div
          initial={prefersReduced ? { opacity: 0 } : { filter: 'blur(8px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: prefersReduced ? 0.4 : 0.8, delay: prefersReduced ? 0.2 : 0.4, ease: 'easeOut' }}
          className="liquid-glass rounded-full p-1 pr-4 flex items-center gap-3 mb-8 border-brand-orange/30 bg-[#0B0E13]/50"
          style={{ willChange: 'transform, opacity' }}
        >
          <span className="bg-brand-orange text-white px-3 py-1 text-xs font-bold rounded-full tracking-wide shadow-[0_0_10px_rgba(255,90,54,0.4)]">PORTFOLIO</span>
          <span className="text-xs md:text-sm text-text-secondary font-medium">Interactive Automotive Web Experiences &bull; Edition 2026</span>
        </motion.div>

        <BlurText
          text="Crafting Next-Generation Digital Experiences"
          className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.8] max-w-4xl text-center tracking-[-4px]"
          delay={0}
        />

        <motion.p
          initial={prefersReduced ? { opacity: 0 } : { filter: 'blur(8px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: prefersReduced ? 0.4 : 0.8, delay: prefersReduced ? 0.4 : 0.8, ease: 'easeOut' }}
          className="mt-6 text-sm md:text-base text-text-secondary max-w-2xl text-center font-body font-light leading-relaxed"
          style={{ willChange: 'transform, opacity' }}
        >
          I design immersive, high-performance websites with cinematic animations, 3D interactions, AI integrations, and luxury user experiences.
        </motion.p>

        <motion.div
          initial={prefersReduced ? { opacity: 0 } : { filter: 'blur(8px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: prefersReduced ? 0.4 : 0.8, delay: prefersReduced ? 0.6 : 1.1, ease: 'easeOut' }}
          className="flex items-center justify-center gap-6 mt-8"
          style={{ willChange: 'transform, opacity' }}
        >
          <a
            href="#projects"
            className="btn-luxury-gradient rounded-full px-6 py-3 text-sm font-semibold text-white flex items-center gap-2 cursor-pointer transform hover:scale-105 active:scale-95 transition-all"
          >
            View Projects <ArrowUpRight />
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-brand-gold transition-colors cursor-pointer group"
          >
            Hire Me <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3, ease: 'easeOut' }}
          className="flex items-stretch justify-center gap-4 mt-12 flex-wrap"
        >
          <div className="liquid-glass p-5 w-[220px] rounded-[1.25rem] flex flex-col justify-between border-white/10 hover:border-brand-gold/30 bg-[#12161D]/40 transition-all">
            <svg className="w-7 h-7 text-brand-orange mb-8 drop-shadow-[0_0_5px_rgba(255,90,54,0.3)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <div className="font-heading italic text-brand-gold text-4xl tracking-[-1px] leading-none drop-shadow-[0_0_8px_rgba(246,196,83,0.25)]">300 FPS</div>
              <div className="text-xs text-text-muted font-body font-light mt-2">Silky Smooth Web GL Rendering</div>
            </div>
          </div>
          <div className="liquid-glass p-5 w-[220px] rounded-[1.25rem] flex flex-col justify-between border-white/10 hover:border-brand-gold/30 bg-[#12161D]/40 transition-all">
            <svg className="w-7 h-7 text-brand-orange mb-8 drop-shadow-[0_0_5px_rgba(255,90,54,0.3)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.958 17.958 0 0112 21a17.958 17.958 0 01-8.716-6.747M3 12c0-.778.099-1.533.284-2.253" />
            </svg>
            <div>
              <div className="font-heading italic text-brand-gold text-4xl tracking-[-1px] leading-none drop-shadow-[0_0_8px_rgba(246,196,83,0.25)]">40+</div>
              <div className="text-xs text-text-muted font-body font-light mt-2">Premium Digital Showcases</div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
        animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center gap-5 pb-10 pt-8"
      >
        <div className="liquid-glass rounded-full px-5 py-2 text-xs font-semibold text-brand-gold-light border-brand-gold/20 bg-[#0B0E13]/30 tracking-wide">
          SPECIALIZING IN HIGH-PERFORMANCE LUXURY INDUSTRIES
        </div>
        <div className="flex flex-wrap justify-center font-heading italic text-text-secondary text-2xl md:text-3xl tracking-tight gap-8 md:gap-16 opacity-75">
          <span className="hover:text-brand-orange transition-colors duration-300">Ferrari</span>
          <span className="hover:text-brand-gold transition-colors duration-300">Porsche</span>
          <span className="hover:text-brand-orange transition-colors duration-300">Bugatti</span>
          <span className="hover:text-brand-gold transition-colors duration-300">McLaren</span>
          <span className="hover:text-brand-orange transition-colors duration-300">Lamborghini</span>
        </div>
      </motion.div>
    </section>
  );
}
