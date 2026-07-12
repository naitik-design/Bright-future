import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, ShieldCheck, Star, Award, Zap } from 'lucide-react';

export function PricingSection({ onLaunch }: { onLaunch: () => void }) {
  const [billingCycle, setBillingCycle] = useState<'fixed' | 'monthly'>('fixed');

  const packages = [
    {
      name: "Prestige Landing Page",
      tag: "CAMPAIGN LAUNCHER",
      price: { fixed: "$4,500", monthly: "$450" },
      desc: "A stunning, single-page campaign hub engineered with high-impact GSAP animations to highlight premium vehicle launches.",
      features: [
        "100% Bespoke cinematic design layout",
        "GSAP scroll-driven kinetic timelines",
        "Lenis momentum smooth-scrolling setup",
        "Ultra-responsive fluid mobile adapters",
        "Performance optimization (Lighthouse > 95)",
        "Basic SEO metadata configurations"
      ],
      popular: false,
      color: "border-white/10"
    },
    {
      name: "3D Web Showroom",
      tag: "WebGL IMMERSION",
      price: { fixed: "$9,500", monthly: "$950" },
      desc: "Immersive 3D WebGL vehicle showroom enabling luxury buyers to rotate hyper-realistic models and configure custom materials.",
      features: [
        "Includes everything in Campaign Launcher",
        "Three.js / React Three Fiber setup",
        "Interactive 3D asset loader & camera controls",
        "Dynamic custom GLSL light/reflection shaders",
        "Interactive material config (paint, wheels, interior)",
        "Lazy-loaded asset pipelines supporting heavy meshes"
      ],
      popular: true,
      color: "border-brand-orange/40"
    },
    {
      name: "Elite Enterprise Ecosystem",
      tag: "SOVEREIGN SYSTEM",
      price: { fixed: "$18,000", monthly: "$1,800" },
      desc: "Full-stack client-facing software containing secure user auth, design configuration registries, and context-aware AI chatbot support.",
      features: [
        "Includes everything in 3D Web Showroom",
        "Secure Database setup (Supabase / Firestore)",
        "Google & email secure Auth integration",
        "Configuration persistence & checkout forms",
        "Gemini API context-aware AI Sales Assistant",
        "High-priority design briefs & ongoing SLA support"
      ],
      popular: false,
      color: "border-brand-gold/40"
    }
  ];

  return (
    <section id="pricing" className="relative py-24 md:py-32 bg-bg-primary border-b border-white/5 overflow-hidden">
      {/* Background radial effects */}
      <div className="absolute w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[150px] right-1/4 top-1/3 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] left-1/4 bottom-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* Section Heading & Cycle Switcher */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="text-xs font-bold text-brand-orange tracking-widest uppercase mb-4 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-brand-gold" />
            <span>// DEPLOYMENT INVESTMENTS</span>
          </div>
          <h2 className="font-heading italic text-white text-5xl md:text-6xl lg:text-7xl leading-none tracking-[-2px]">
            Configure Your <span className="text-brand-orange">Investment</span>
          </h2>
          <p className="text-text-secondary text-sm md:text-base font-body font-light leading-relaxed mt-4 max-w-md">
            Acquire elite front-end craftsmanship to elevate your brand presence. Pricing structures fit single releases or continuous engineering retainers.
          </p>

          {/* Luxury Cycle Switcher Button */}
          <div className="mt-8 p-1 rounded-full flex gap-1 border border-white/15 bg-[#0B0E13]">
            <button
              onClick={() => setBillingCycle('fixed')}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${billingCycle === 'fixed' ? 'bg-brand-orange text-white shadow-[0_0_12px_rgba(255,90,54,0.3)]' : 'text-text-secondary hover:text-white'}`}
            >
              PROJECT FIXED BID
            </button>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${billingCycle === 'monthly' ? 'bg-brand-orange text-white shadow-[0_0_12px_rgba(255,90,54,0.3)]' : 'text-text-secondary hover:text-white'}`}
            >
              MONTHLY RETAINER
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch">
          {packages.map((pkg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className={`relative flex flex-col justify-between rounded-[2rem] p-8 md:p-10 border ${pkg.color} bg-[#0D1117] transition-all duration-500 hover:-translate-y-2 group`}
            >
              {/* Highlight Ribbon for Popular Tier */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-orange text-white text-[9px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(255,90,54,0.4)] flex items-center gap-1">
                  <Star className="w-3 h-3 text-brand-gold fill-current" />
                  <span>MOST IN-DEMAND</span>
                </div>
              )}

              <div>
                {/* Header detail */}
                <div className="text-[9px] font-bold text-brand-gold tracking-widest uppercase mb-2">
                  {pkg.tag}
                </div>
                <h3 className="font-heading italic text-white text-3xl tracking-[-1px] leading-none mb-4 group-hover:text-brand-orange transition-colors">
                  {pkg.name}
                </h3>
                <p className="text-xs text-text-secondary font-body font-light leading-relaxed mb-6 h-[48px] overflow-hidden">
                  {pkg.desc}
                </p>

                {/* Price Display */}
                <div className="my-6 border-b border-t border-white/5 py-6">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tighter">
                      {billingCycle === 'fixed' ? pkg.price.fixed : pkg.price.monthly}
                    </span>
                    <span className="text-xs text-text-muted font-mono uppercase">
                      {billingCycle === 'fixed' ? "/ FLAT FEE" : "/ MONTH"}
                    </span>
                  </div>
                  <div className="text-[10px] text-success font-semibold tracking-wide mt-2 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-success" />
                    <span>GUARANTEED 100% SECURE INTRO BRIEF</span>
                  </div>
                </div>

                {/* Bullets List */}
                <div className="space-y-3.5 mb-8">
                  {pkg.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-text-secondary font-body font-light leading-tight">
                      <Check className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call-to-Action button */}
              <a
                href="#contact"
                className={`w-full py-4 rounded-xl text-xs font-bold tracking-widest uppercase cursor-pointer transform transition-all active:scale-95 duration-300 flex items-center justify-center gap-2 ${pkg.popular ? 'btn-luxury-gradient text-white shadow-[0_0_15px_rgba(255,90,54,0.25)]' : 'bg-white/5 border border-white/15 text-white hover:bg-brand-orange hover:border-brand-orange hover:shadow-[0_0_15px_rgba(255,90,54,0.15)]'}`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>SELECT PACKAGE</span>
              </a>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
