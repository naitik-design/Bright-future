import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Award, Compass, Sparkles, ExternalLink } from 'lucide-react';
import { PremiumImage } from './PremiumImage';

export function PortfolioSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      name: "AeroRevuelto Configurator",
      platform: "THREE.JS // WEBGL EXPERIENCES",
      framework: "Next.js + R3F + GSAP",
      performance: "120 FPS Rendering Speed",
      conversions: "+42% Brand Engagement",
      desc: "A full-throttle WebGL-powered 3D vehicle configurator experience. Users can modify colors, carbon trim, and active aerodynamics in real-time, accompanied by spatial engine audio and fluid cinematic camera movements.",
      image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80",
      stats: { rating: "Awwwards Site of the Day", tech: "GLSL Shaders & Raycasting" }
    },
    {
      name: "Scuderia SF90 Showroom",
      platform: "INTERACTIVE SHOWCASE // CINEMATIC",
      framework: "React + Tailwind + Lenis",
      performance: "98 Lighthouse Performance",
      conversions: "+31% Test Drive Bookings",
      desc: "A luxury digital showroom designed to present Ferrari's hybrid masterpiece. Features complex scroll-bound video scrubbing, state-of-the-art layout grids, and slick transitions matching the vehicle's aerodynamic curves.",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80",
      stats: { rating: "CSSDA Best UI/UX Design", tech: "Video Scrub & ScrollTrigger" }
    },
    {
      name: "Chiron Super Sport Landing",
      platform: "HIGH-SPEED DIGITAL CAMPAIGN",
      framework: "Next.js + Vanilla Extract",
      performance: "99 Core Web Vitals Score",
      conversions: "Seamless High-Net-Worth Leads",
      desc: "An immersive ultra-premium launch hub celebrating Bugatti's legendary speed records. Showcases beautiful typography, seamless preloading triggers, fluid canvas effects, and an interactive horsepower power-curve chart.",
      image: "https://images.unsplash.com/photo-1600706432502-75a0e2b34457?auto=format&fit=crop&w=1200&q=80",
      stats: { rating: "Red Dot Design Award Winner", tech: "Dynamic SVG Draw & Canvas" }
    }
  ];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section id="projects" className="relative py-24 md:py-32 bg-bg-primary border-b border-white/5 overflow-hidden">
      {/* Dynamic Background Spotlight based on active index */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#050608] pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[160px] right-10 top-1/4 pointer-events-none transition-transform duration-1000" style={{ transform: `translateY(${activeIdx * 100}px)` }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* Section Heading with subtle counter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16">
          <div>
            <div className="text-xs font-bold text-brand-orange tracking-widest uppercase mb-4">// PREMIUM CASE STUDIES</div>
            <h2 className="font-heading italic text-white text-5xl md:text-6xl lg:text-7xl leading-none tracking-[-2px]">
              Interactive <span className="text-brand-orange">Web Showcases</span>
            </h2>
          </div>
          <div className="flex items-center gap-4 mt-6 md:mt-0">
            <span className="font-mono text-xs text-text-muted">
              <span className="text-white font-bold">{String(activeIdx + 1).padStart(2, '0')}</span> / {String(projects.length).padStart(2, '0')}
            </span>
            <div className="flex gap-2">
              <button 
                onClick={handlePrev}
                className="w-12 h-12 rounded-full bg-[#0D1117] border border-white/10 flex items-center justify-center hover:border-brand-orange text-white hover:text-brand-orange transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={handleNext}
                className="w-12 h-12 rounded-full bg-[#0D1117] border border-white/10 flex items-center justify-center hover:border-brand-orange text-white hover:text-brand-orange transition-all cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Cinematic Active Project Carousel View */}
        <div ref={containerRef} className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch min-h-[500px]">
          
          {/* Active Image Showcase Pane */}
          <div className="lg:col-span-7 relative rounded-[2rem] overflow-hidden group border border-white/10 shadow-2xl h-[320px] md:h-[450px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <PremiumImage 
                  src={projects[activeIdx].image} 
                  alt={projects[activeIdx].name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-85" />
                <div className="absolute inset-0 bg-brand-orange/5 mix-blend-color-burn" />
                
                {/* Embedded holographic coordinates badge */}
                <div className="absolute top-6 left-6 rounded-full px-4 py-1.5 text-[10px] font-mono text-brand-gold border border-brand-gold/20 flex items-center gap-1.5 bg-[#050608]/90">
                  <Compass className="w-3 h-3 text-brand-gold animate-spin-slow" />
                  <span>Interactive Engine Activated</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Details Column with custom transition fields */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-[2rem] p-8 border border-white/10 bg-[#0D1117]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col h-full justify-between gap-6"
              >
                <div>
                  <div className="text-xs font-bold text-brand-gold tracking-widest uppercase mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
                    <span>{projects[activeIdx].platform}</span>
                  </div>
                  
                  <h3 className="font-heading italic text-white text-4xl tracking-[-1.5px] leading-tight mb-4">
                    {projects[activeIdx].name}
                  </h3>
                  
                  <p className="text-text-secondary text-sm md:text-base font-body font-light leading-relaxed mb-6">
                    {projects[activeIdx].desc}
                  </p>

                  {/* High fidelity statistics */}
                  <div className="grid grid-cols-2 gap-4 border-t border-b border-white/5 py-5 mb-4 font-mono text-xs text-text-secondary">
                    <div>
                      <div className="text-[10px] text-text-muted uppercase mb-1">Stack</div>
                      <div className="text-white font-semibold">{projects[activeIdx].framework}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-text-muted uppercase mb-1">Performance</div>
                      <div className="text-white font-semibold">{projects[activeIdx].performance}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-text-muted uppercase mb-1">Conversions</div>
                      <div className="text-brand-gold font-semibold">{projects[activeIdx].conversions}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-text-muted uppercase mb-1">Key Innovation</div>
                      <div className="text-brand-orange font-semibold">{projects[activeIdx].stats.tech}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success animate-ping" />
                    <span className="text-[10px] font-mono text-success uppercase tracking-widest font-semibold">Live Production</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-brand-gold font-bold uppercase tracking-wider bg-brand-gold/10 px-3.5 py-1.5 rounded-full border border-brand-gold/20">
                    <Award className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{projects[activeIdx].stats.rating}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
