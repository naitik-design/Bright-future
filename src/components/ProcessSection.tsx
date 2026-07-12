import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Milestone, CheckCircle2, Search, Edit3, Paintbrush, Cpu, Zap, Rocket } from 'lucide-react';

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Calculate the height of the timeline track filling based on scroll
  const scaleY = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  const steps = [
    {
      num: "01",
      title: "Research",
      subtitle: "AUDITING & COMPETITOR INTEL",
      desc: "Diving deep into your brand's unique legacy, vehicle aerodynamics, and luxury demographics. I architect custom interface milestones and specify strict high-performance benchmarks.",
      icon: <Search className="w-5 h-5 text-brand-orange" />
    },
    {
      num: "02",
      title: "Wireframe",
      subtitle: "SCHEMATICS & USER FLOWS",
      desc: "Mapping out complex digital cockpit wireframes and navigation hierarchies. Ensuring every interactive viewport behaves intuitively and directs user focus to focal vehicle lines.",
      icon: <Edit3 className="w-5 h-5 text-brand-gold" />
    },
    {
      num: "03",
      title: "UI Design",
      subtitle: "LUXURY VISUAL AESTHETICS",
      desc: "Injecting sports car inspiration, sleek typography, dynamic glowing accents, and premium textures. I draft bespoke mockups designed to evoke high-end automotive prestige.",
      icon: <Paintbrush className="w-5 h-5 text-brand-orange" />
    },
    {
      num: "04",
      title: "Development",
      subtitle: "ENGINE INTEGRATION & WEBGL",
      desc: "Translating static visual vectors into production-grade React code, rich CSS properties, custom GSAP triggers, and hardware-accelerated Three.js scenes that perform effortlessly.",
      icon: <Cpu className="w-5 h-5 text-brand-gold" />
    },
    {
      num: "05",
      title: "Optimization",
      subtitle: "DYNO-TUNING & STRESS TESTS",
      desc: "Rigorously auditing core scripts, compressing high-resolution assets, and stabilizing WebGL shaders. We fine-tune each interactive element to guarantee buttery-smooth 120 FPS performance.",
      icon: <Zap className="w-5 h-5 text-brand-orange animate-pulse" />
    },
    {
      num: "06",
      title: "Deployment",
      subtitle: "GREEN-LIGHT WORLDWIDE RELEASE",
      desc: "Launching your high-prestige web platform on global edge networks with strict SSR headers, making sure prospective high-net-worth buyers experience instant loading speeds worldwide.",
      icon: <Rocket className="w-5 h-5 text-success" />
    }
  ];

  return (
    <section ref={containerRef} id="innovation" className="relative py-24 md:py-32 bg-bg-secondary border-b border-white/5 overflow-hidden">
      {/* Background Volumetric Highlights */}
      <div className="absolute w-[450px] h-[450px] bg-brand-gold/5 rounded-full blur-[120px] left-10 top-1/4 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[140px] right-5 bottom-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-20 md:mb-24">
          <div className="text-xs font-bold text-brand-orange tracking-widest uppercase mb-4 flex items-center justify-center gap-1.5">
            <Milestone className="w-4 h-4 text-brand-orange animate-bounce" />
            <span>// THE ROAD TO LAUNCH</span>
          </div>
          <h2 className="font-heading italic text-white text-5xl md:text-6xl lg:text-7xl leading-none tracking-[-2.3px]">
            My Design <span className="text-brand-orange">Process</span>
          </h2>
          <p className="text-text-secondary text-sm md:text-base font-body font-light leading-relaxed mt-6 max-w-lg mx-auto">
            A meticulous, high-performance workflow designed to build digital spaces that reflect the exact craftsmanship and prestige of luxury supercars.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Central Glowing Vertical Track (Desktop only) */}
          <div className="absolute left-[30px] md:left-1/2 top-4 bottom-4 w-[2px] bg-white/5 -translate-x-1/2 hidden md:block">
            {/* Animated glowing fill */}
            <motion.div 
              style={{ scaleY, transformOrigin: "top" }}
              className="absolute inset-0 w-full bg-gradient-to-b from-brand-orange via-brand-gold to-success"
            />
          </div>

          <div className="space-y-12 md:space-y-20 relative z-10">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className="flex flex-col md:flex-row items-stretch gap-6 md:gap-0 relative">
                  
                  {/* Left content block */}
                  <div className={`w-full md:w-1/2 flex justify-start md:justify-end ${isEven ? 'md:order-1' : 'md:order-3 md:text-left'} md:pr-12 md:pl-0 pl-16`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                      className="liquid-glass p-6 md:p-8 rounded-[1.75rem] border-white/10 hover:border-brand-orange/30 bg-[#12161D]/50 w-full relative group transition-all"
                    >
                      {/* Holographic background number */}
                      <span className="absolute right-6 top-4 font-heading italic text-white/5 text-7xl md:text-8xl leading-none font-bold select-none pointer-events-none group-hover:text-brand-orange/5 transition-colors">
                        {step.num}
                      </span>

                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl liquid-glass border-white/10 flex items-center justify-center bg-bg-secondary shrink-0">
                          {step.icon}
                        </div>
                        <div>
                          <div className="text-[9px] font-bold text-brand-gold tracking-widest">{step.subtitle}</div>
                          <h4 className="font-heading text-lg md:text-xl text-white font-semibold leading-none mt-1">{step.title}</h4>
                        </div>
                      </div>

                      <p className="text-text-secondary text-xs md:text-sm font-body font-light leading-relaxed relative z-10">
                        {step.desc}
                      </p>
                    </motion.div>
                  </div>

                  {/* Mid Dot (Central tracking indicator) */}
                  <div className="absolute left-[30px] md:left-1/2 top-6 md:top-8 -translate-x-1/2 z-20 md:order-2 flex items-center justify-center">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      className="w-10 h-10 rounded-full bg-bg-primary border-2 border-brand-orange flex items-center justify-center shadow-[0_0_15px_rgba(255,90,54,0.3)] hover:border-brand-gold transition-colors"
                    >
                      <span className="text-xs font-mono font-bold text-white">{step.num}</span>
                    </motion.div>
                  </div>

                  {/* Right layout empty column for symmetrical spacing */}
                  <div className={`w-full md:w-1/2 hidden md:block ${isEven ? 'md:order-3' : 'md:order-1'}`} />

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
