import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { AboutCompany } from './components/AboutCompany';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ProcessSection } from './components/ProcessSection';
import { TechnologiesSection } from './components/TechnologiesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { PricingSection } from './components/PricingSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Lazy load heavy 3D and WebGL components
const CosmicBackground = React.lazy(() => import('./components/CosmicBackground').then(m => ({ default: m.CosmicBackground })));
const CarCanvas = React.lazy(() => import('./components/CarCanvas').then(m => ({ default: m.CarCanvas })));

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isFinalWarp, setIsFinalWarp] = useState(false);
  const [warpCompleted, setWarpCompleted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const mainContainerRef = useRef<HTMLDivElement>(null);

  // Lenis & ScrollTrigger configuration
  useEffect(() => {
    setIsMounted(true);

    // Instantiate Lenis for silky-smooth touch & scroll behavior on Android and desktops
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    // Connect Lenis with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Disable lag smoothing to prevent visual jumps
    gsap.ticker.lagSmoothing(0);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Trigger parallax animations and text reveals on scroll
    // 1. Hero text & cards parallax
    gsap.fromTo('.hero-text-container', 
      { y: 0 },
      {
        y: -120,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section-container',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      }
    );

    // 2. Background videos parallax
    gsap.fromTo('.hero-bg-video',
      { scale: 1.0, y: 0 },
      {
        scale: 1.05,
        y: 60,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section-container',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      }
    );

    // 3. Capabilities header reveal
    gsap.fromTo('.capabilities-header-reveal',
      { opacity: 0, x: -40 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.capabilities-section-container',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Master handler to trigger the grand finale sequence
  const handleLaunchInitiated = () => {
    if (isFinalWarp) return;
    setIsFinalWarp(true);
  };

  const handleWarpComplete = () => {
    // Render the flash overlay and settle back to deep-space
    setWarpCompleted(true);
    gsap.timeline()
      .to('.warp-flash-overlay', {
        opacity: 1,
        duration: 0.2,
        ease: 'power2.out'
      })
      .to('.warp-flash-overlay', {
        opacity: 0,
        duration: 2.2,
        ease: 'power2.inOut',
        delay: 0.3,
        onComplete: () => {
          setIsFinalWarp(false);
          setWarpCompleted(false);
        }
      });
  };

  return (
    <div ref={mainContainerRef} className="relative min-h-screen bg-bg-primary overflow-x-hidden font-body text-white selection:bg-brand-orange/30">
      <Suspense fallback={null}>
        {isMounted && (
          <>
            {/* Cosmic deep-space ambient environment */}
            <CosmicBackground />
            
            {/* Luxury 3D Sports Car Canvas */}
            <CarCanvas />
          </>
        )}
      </Suspense>

      {/* 2. Cinematic Warp Flash Overlay */}
      <div className="warp-flash-overlay fixed inset-0 bg-white/95 pointer-events-none z-[100] opacity-0 mix-blend-overlay" />

      {/* 3. Navigation Bar */}
      <Navbar onLaunch={handleLaunchInitiated} />

      {/* 4. Content Sections */}
      <div className="relative z-20">
        <div className="hero-section-container">
          <HeroSection onLaunch={handleLaunchInitiated} />
        </div>
        <div className="capabilities-section-container">
          <CapabilitiesSection />
        </div>
        <AboutCompany />
        <ServicesSection onLaunch={handleLaunchInitiated} />
        <PortfolioSection />
        <ProcessSection />
        <TechnologiesSection />
        <TestimonialsSection />
        <PricingSection onLaunch={handleLaunchInitiated} />
        <FaqSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}
