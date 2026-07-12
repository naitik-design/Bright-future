import { motion } from 'motion/react';
import { TiltCard } from './TiltCard';
import { 
  Palette, 
  Box, 
  Bot, 
  Crown, 
  Smartphone, 
  Target, 
  Zap, 
  Search, 
  ArrowRight, 
  Sparkles,
  Award
} from 'lucide-react';

export function ServicesSection({ onLaunch }: { onLaunch?: () => void }) {
  const services = [
    {
      title: "Premium Website Design",
      desc: "Bespoke visual directions tailored around prestigious automotive identities, utilizing display typography, custom color maps, and a pristine balance of negative space.",
      icon: <Palette className="w-5 h-5 text-brand-orange" />,
      tag: "BRAND IDENTITY",
      highlights: ["Luxury Typography", "Tailored Colorways", "Asymmetrical Layouts"]
    },
    {
      title: "3D Website Development",
      desc: "Immersive, hardware-accelerated 3D user interfaces built using Three.js and WebGL. Enabling interactive product rotations, ambient light shaders, and flawless canvas-layering.",
      icon: <Box className="w-5 h-5 text-brand-gold" />,
      tag: "WEBGL & SHADERS",
      highlights: ["Three.js / React Three Fiber", "Custom GLSL Shaders", "Fluid Camera Controls"]
    },
    {
      title: "AI Chatbot Integration",
      desc: "Context-aware luxury sales assistants powered by advanced LLMs, allowing prospective buyers to explore high-end car specs and book custom briefings through natural speech.",
      icon: <Bot className="w-5 h-5 text-brand-orange" />,
      tag: "INTELLIGENT UX",
      highlights: ["Gemini API Integration", "Custom Chat Interfaces", "Automated Lead Capturing"]
    },
    {
      title: "Luxury UI/UX Design",
      desc: "Immersive user journeys emphasizing micro-interactions and tactile visual feedback. Replicating the sensory, ultra-responsive feeling of sitting inside a hypercar cockpit.",
      icon: <Crown className="w-5 h-5 text-brand-gold" />,
      tag: "HIGH PRESTIGE",
      highlights: ["Bespoke Micro-Animations", "Tactile Hover feedback", "Lenis Smooth Scrolling"]
    },
    {
      title: "Responsive Websites",
      desc: "Flawless fluid layouts engineered from the ground up, guaranteeing that your high-end brand experience remains immaculate on massive 8K displays and mobile phones alike.",
      icon: <Smartphone className="w-5 h-5 text-brand-orange" />,
      tag: "CROSS-PLATFORM",
      highlights: ["Mobile-First Fluidity", "High-PPI Retina Asset Scaling", "Adaptive Touch Controls"]
    },
    {
      title: "Landing Pages",
      desc: "Razor-sharp campaign hubs designed to showcase single hypercar launches. Engineered with preloaded cinematic transitions that hold prospective buyers' attention from the first second.",
      icon: <Target className="w-5 h-5 text-brand-gold" />,
      tag: "LAUNCH SYSTEMS",
      highlights: ["Cinematic Intros", "Preloaded Asset Pipelines", "Hyper-Focused CTAs"]
    },
    {
      title: "Performance Optimization",
      desc: "Tuning scripts, assets, and canvas renders to sustain up to 120 FPS. We guarantee instant response metrics and absolute performance benchmarks that load in a heartbeat.",
      icon: <Zap className="w-5 h-5 text-brand-orange" />,
      tag: "SPEED ENGINES",
      highlights: ["Core Web Vitals Maxing", "Optimized Code Bundling", "Hardware-Accelerated Code"]
    },
    {
      title: "SEO Ready Websites",
      desc: "Adopting advanced semantic markup schemas, lightning-fast SSR architectures, and meticulous meta tags, placing your high-performance showcase at the very top of search grids.",
      icon: <Search className="w-5 h-5 text-brand-gold" />,
      tag: "SEARCH VISIBILITY",
      highlights: ["JSON-LD Schema Markup", "Dynamic Meta Optimization", "Advanced Google Crawl Ratios"]
    }
  ];

  return (
    <section id="services" className="relative py-24 md:py-32 bg-bg-secondary border-b border-white/5 overflow-hidden">
      {/* Background Volumetric Highlights */}
      <div className="absolute w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[140px] -left-36 top-1/3 pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-[120px] -right-20 bottom-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 text-xs font-bold text-brand-orange tracking-widest uppercase mb-4"
            >
              <Sparkles className="w-4 h-4 text-brand-orange" />
              <span>// PROFESSIONAL SERVICES</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-heading italic text-white text-5xl md:text-6xl lg:text-7xl leading-none tracking-[-2px]"
            >
              Elite Digital <span className="text-brand-orange">Capabilities</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-text-secondary text-sm md:text-base font-body font-light leading-relaxed max-w-md"
          >
            I deliver end-to-end frontend craftsmanship, translating raw horsepower and premium automotive engineering principles into interactive web masterpieces.
          </motion.p>
        </div>

        {/* Services Grid using dynamic TiltCards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((srv, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: idx * 0.05, ease: 'easeOut' }}
            >
              <TiltCard className="liquid-glass rounded-[1.5rem] p-6 flex flex-col justify-between h-full min-h-[380px] border-white/10 hover:border-brand-orange/30 bg-[#12161D]/50 backdrop-blur-xl group">
                <div>
                  {/* Top row with custom brand indicators */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <span className="text-[9px] font-bold text-brand-gold tracking-widest uppercase bg-brand-gold/5 border border-brand-gold/15 rounded-full px-2.5 py-1">
                      {srv.tag}
                    </span>
                    <div className="w-10 h-10 rounded-xl liquid-glass flex items-center justify-center border-white/10 group-hover:border-brand-orange/40 transition-colors">
                      {srv.icon}
                    </div>
                  </div>

                  {/* Main service details */}
                  <h3 className="font-heading italic text-white text-xl md:text-2xl tracking-tight mb-3 group-hover:text-brand-orange transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-text-secondary text-xs md:text-sm font-body font-light leading-relaxed mb-6">
                    {srv.desc}
                  </p>
                </div>

                {/* Bullets & Action CTA row */}
                <div className="border-t border-white/5 pt-4 mt-auto">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {srv.highlights.map((hl, i) => (
                      <span key={i} className="text-[9px] font-mono text-text-muted bg-white/5 rounded-full px-2 py-0.5 whitespace-nowrap">
                        {hl}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Global capability banner CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-brand-orange/10 to-brand-gold/5 border border-brand-orange/20 rounded-[1.5rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-md"
        >
          <div className="max-w-xl">
            <h4 className="font-heading text-white text-xl md:text-2xl font-semibold mb-2">
              Have a premium automotive campaign in the pipeline?
            </h4>
            <p className="text-xs md:text-sm text-text-secondary font-body font-light">
              Let's craft an awe-inspiring, custom-designed interactive experience that drives brand excitement, enhances metrics, and leaves a lasting high-performance impression.
            </p>
          </div>
          <a 
            href="#contact"
            className="btn-luxury-gradient text-white px-6 py-3.5 rounded-full font-semibold text-sm flex items-center gap-2 cursor-pointer transform hover:scale-105 active:scale-95 transition-all shrink-0"
          >
            Start Premium Briefing <Award className="w-4 h-4 text-brand-gold" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
