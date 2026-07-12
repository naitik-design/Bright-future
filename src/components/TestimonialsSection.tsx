import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Star, ArrowLeft, ArrowRight, Play, Video } from 'lucide-react';
import { PremiumImage } from './PremiumImage';

export function TestimonialsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const testimonials = [
    {
      quote: "He designed a WebGL car configurator for our luxury showroom that was absolutely flawless. The 3D interactions and frame rates are incredibly smooth, yielding a 42% increase in custom customer configurations.",
      author: "Stefano Rosso",
      role: "VP of Digital Design, Maranello Concepts",
      destination: "AeroRevuelto & SF90 Showroom Projects",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "Our landing page launch was critical, and he completely overdelivered. He integrated video scroll-scrubbing with custom GSAP transitions that felt as smooth and precise as active air suspension. Truly an elite developer.",
      author: "Christian von Koenig",
      role: "Brand Director, Apex Velocity",
      destination: "Chiron Super Sport Campaign Hub",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "I've never worked with a designer-developer who has such a strong visual eye. He captured our brand prestige perfectly. From the fluid micro-interactions to the 100% lighthouse performance scores, he is a true master.",
      author: "Alistair Sterling",
      role: "Founder, Spectre Design Network",
      destination: "Interactive Brand Showcase",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
    }
  ];

  useEffect(() => {
    if (isAutoplay) {
      timerRef.current = setInterval(() => {
        setActiveIdx((prev) => (prev + 1) % testimonials.length);
      }, 7000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoplay, testimonials.length]);

  const handleNext = () => {
    setIsAutoplay(false);
    setActiveIdx((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setIsAutoplay(false);
    setActiveIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative py-24 md:py-32 bg-bg-secondary border-b border-white/5 overflow-hidden">
      {/* Background spotlights */}
      <div className="absolute w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[140px] -right-32 top-10 pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-[110px] -left-20 bottom-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* Header section */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <div className="text-xs font-bold text-brand-orange tracking-widest uppercase mb-4 flex items-center justify-center gap-1.5">
            <Quote className="w-4 h-4 text-brand-orange" />
            <span>// SUCCESS STORIES</span>
          </div>
          <h2 className="font-heading italic text-white text-5xl md:text-6xl lg:text-7xl leading-none tracking-[-2px]">
            Client <span className="text-brand-orange">Reviews</span>
          </h2>
          <p className="text-text-secondary text-sm md:text-base font-body font-light leading-relaxed mt-4 max-w-md mx-auto">
            Read first-hand accounts from luxury brand leaders and automotive marketing teams who transformed their user experiences.
          </p>
        </div>

        {/* Carousel slide layout */}
        <div className="max-w-4xl mx-auto relative min-h-[340px] flex items-center">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -15 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="w-full"
            >
              <div className="rounded-[2rem] p-8 md:p-12 border border-white/10 bg-[#0D1117] shadow-2xl relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                
                {/* Embedded dynamic quote graphic */}
                <Quote className="absolute right-10 top-10 w-24 h-24 text-white/5 pointer-events-none" />

                {/* Left side: Profile & Star details */}
                <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-brand-orange/40 p-1 mb-4 shadow-[0_0_15px_rgba(255,90,54,0.15)]">
                    <div className="w-full h-full rounded-full overflow-hidden relative">
                      <PremiumImage 
                        src={testimonials[activeIdx].avatar} 
                        alt={testimonials[activeIdx].author}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                  
                  <h4 className="font-heading text-lg text-white font-semibold leading-tight">{testimonials[activeIdx].author}</h4>
                  <p className="text-xs text-brand-gold-light font-body font-light mt-1">{testimonials[activeIdx].role}</p>
                  <p className="text-[10px] text-text-muted mt-3 font-mono border-t border-white/5 pt-2 w-full uppercase">
                    {testimonials[activeIdx].destination}
                  </p>
                </div>

                {/* Right side: actual quote text */}
                <div className="md:col-span-8">
                  {/* Glowing 5-Star Indicator */}
                  <div className="flex gap-1 mb-6 justify-center md:justify-start">
                    {[...Array(testimonials[activeIdx].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-brand-gold fill-current drop-shadow-[0_0_6px_rgba(246,196,83,0.4)] animate-pulse" />
                    ))}
                  </div>

                  <p className="text-white text-base md:text-lg lg:text-xl font-body font-light italic leading-relaxed text-center md:text-left">
                    "{testimonials[activeIdx].quote}"
                  </p>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

        </div>

        {/* Manual controls footer */}
        <div className="flex justify-center gap-4 mt-8">
          <button 
            onClick={handlePrev}
            className="w-12 h-12 rounded-full bg-[#0D1117] border border-white/10 flex items-center justify-center hover:border-brand-orange text-white hover:text-brand-orange transition-all cursor-pointer animate-none"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={handleNext}
            className="w-12 h-12 rounded-full bg-[#0D1117] border border-white/10 flex items-center justify-center hover:border-brand-orange text-white hover:text-brand-orange transition-all cursor-pointer animate-none"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
