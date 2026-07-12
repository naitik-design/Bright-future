import { motion } from 'motion/react';
import { 
  Cpu, 
  Code2, 
  Layout, 
  Layers, 
  Database, 
  GitBranch, 
  Globe, 
  Cloud, 
  Flame, 
  Gauge, 
  Monitor, 
  Zap,
  Infinity
} from 'lucide-react';

export function TechnologiesSection() {
  const techsRow1 = [
    {
      name: "React",
      desc: "Modular component architectures facilitating fast client state changes.",
      icon: <Monitor className="w-5 h-5 text-brand-orange" />
    },
    {
      name: "Next.js",
      desc: "Elite server-side rendering and rapid static generation.",
      icon: <Layers className="w-5 h-5 text-brand-gold" />
    },
    {
      name: "Three.js",
      desc: "High-octane WebGL scenes, custom matrices, and dynamic light shaders.",
      icon: <Cpu className="w-5 h-5 text-brand-orange" />
    },
    {
      name: "GSAP",
      desc: "Precision timelines, kinetic scroll triggers, and display morphs.",
      icon: <Flame className="w-5 h-5 text-brand-gold" />
    },
    {
      name: "Lenis Scrolling",
      desc: "Silky smooth momentum scrolling mimicking luxury air suspension.",
      icon: <Infinity className="w-5 h-5 text-brand-orange" />
    },
    {
      name: "Firebase",
      desc: "Secure cloud database persistence and swift authentication.",
      icon: <Database className="w-5 h-5 text-brand-gold" />
    },
    {
      name: "Supabase",
      desc: "Open-source PostgreSQL tables with instant REST and real-time APIs.",
      icon: <Database className="w-5 h-5 text-brand-orange" />
    }
  ];

  const techsRow2 = [
    {
      name: "GitHub",
      desc: "Professional version control matrices ensuring strict code integrity.",
      icon: <GitBranch className="w-5 h-5 text-brand-gold" />
    },
    {
      name: "Vercel",
      desc: "Zero-latency deployments on lightning-fast edge networks.",
      icon: <Cloud className="w-5 h-5 text-brand-orange" />
    },
    {
      name: "Netlify",
      desc: "Globally redundant CDNs securing instant page-load benchmarks.",
      icon: <Globe className="w-5 h-5 text-brand-gold" />
    },
    {
      name: "HTML5",
      desc: "Semantic, accessible layouts engineered for seamless crawlers.",
      icon: <Code2 className="w-5 h-5 text-brand-orange" />
    },
    {
      name: "CSS3 & Tailwind",
      desc: "High-fidelity, utility-first styling delivering responsive sheets.",
      icon: <Layout className="w-5 h-5 text-brand-gold" />
    },
    {
      name: "TypeScript",
      desc: "Strongly typed reactive codebases preventing interface regressions.",
      icon: <Zap className="w-5 h-5 text-brand-orange animate-pulse" />
    }
  ];

  return (
    <section className="relative py-24 bg-bg-primary border-b border-white/5 overflow-hidden">
      {/* Background glowing mesh */}
      <div className="absolute w-[400px] h-[400px] bg-brand-orange/5 rounded-full blur-[100px] -right-20 top-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10 mb-12 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-bold text-brand-orange tracking-widest uppercase mb-3"
        >
          // PERFORMANCE ENGINE
        </motion.div>
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading italic text-white text-3xl md:text-4xl lg:text-5xl tracking-tight leading-none"
        >
          My High-Performance <span className="text-brand-gold">Tech Stack</span>
        </motion.h3>
      </div>

      {/* Infinite Horizontal Scrolling Marquee */}
      <div className="relative w-full overflow-hidden py-4 flex flex-col gap-4">
        
        {/* Row 1: Left scrolling */}
        <div className="flex w-[200%] gap-6 animate-marquee-left hover:[animation-play-state:paused]">
          {[...techsRow1, ...techsRow1].map((tech, idx) => (
            <div 
              key={idx}
              className="w-[280px] md:w-[320px] shrink-0 liquid-glass rounded-2xl p-5 border-white/10 hover:border-brand-orange/40 bg-[#12161D]/30 backdrop-blur-md flex items-start gap-4 transition-all duration-300 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl liquid-glass border-white/10 flex items-center justify-center shrink-0 group-hover:border-brand-orange/30 transition-colors bg-bg-secondary">
                {tech.icon}
              </div>
              <div>
                <h4 className="font-heading text-sm text-white font-semibold mb-1 group-hover:text-brand-orange transition-colors">
                  {tech.name}
                </h4>
                <p className="text-[11px] text-text-muted leading-relaxed font-body font-light">
                  {tech.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: Right scrolling */}
        <div className="flex w-[200%] gap-6 animate-marquee-right hover:[animation-play-state:paused]">
          {[...techsRow2, ...techsRow2].map((tech, idx) => (
            <div 
              key={idx}
              className="w-[280px] md:w-[320px] shrink-0 liquid-glass rounded-2xl p-5 border-white/10 hover:border-brand-gold/40 bg-[#12161D]/30 backdrop-blur-md flex items-start gap-4 transition-all duration-300 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl liquid-glass border-white/10 flex items-center justify-center shrink-0 group-hover:border-brand-gold/30 transition-colors bg-bg-secondary">
                {tech.icon}
              </div>
              <div>
                <h4 className="font-heading text-sm text-white font-semibold mb-1 group-hover:text-brand-gold transition-colors">
                  {tech.name}
                </h4>
                <p className="text-[11px] text-text-muted leading-relaxed font-body font-light">
                  {tech.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Styled Custom Tailwind Marquee animations */}
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left 40s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 40s linear infinite;
        }
      `}</style>

    </section>
  );
}
