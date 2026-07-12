import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { TiltCard } from './TiltCard';
import { Gauge, Zap, Timer, Flame, Eye, Compass } from 'lucide-react';
import { PremiumImage } from './PremiumImage';

interface CarSpec {
  name: string;
  engine: string;
  horsepower: string;
  topSpeed: string;
  acceleration: string;
  desc: string;
  image: string;
  accentColor: string;
  bgGlow: string;
}

export function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedCar, setSelectedCar] = useState<number | null>(null);

  const cars: CarSpec[] = [
    {
      name: "Lamborghini Revuelto",
      engine: "6.5L V12 Hybrid",
      horsepower: "1,015 HP",
      topSpeed: "350 km/h",
      acceleration: "2.5s",
      desc: "The pinnacle of Sant'Agata: Maranello's ultimate rival introduces the V12 plug-in hybrid HPEV, setting a futuristic paradigm of performance and luxury.",
      image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80",
      accentColor: "from-orange-500 to-amber-600",
      bgGlow: "rgba(249,115,22,0.15)"
    },
    {
      name: "Ferrari SF90 Stradale",
      engine: "4.0L Twin-Turbo V8 PHEV",
      horsepower: "1,000 HP",
      topSpeed: "340 km/h",
      acceleration: "2.5s",
      desc: "Maranello's engineering triumph, combining a potent twin-turbo V8 with three electric motors to unleash absolute, state-of-the-art racetrack dominance.",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80",
      accentColor: "from-red-600 to-rose-700",
      bgGlow: "rgba(220,38,38,0.15)"
    },
    {
      name: "Porsche 911 GT3 RS",
      engine: "4.0L Naturally Aspirated Flat-6",
      horsepower: "525 HP",
      topSpeed: "296 km/h",
      acceleration: "3.2s",
      desc: "A pure racing machine designed for public roads. Optimized with active motorsport aerodynamics, adjustable suspension, and a high-revving soul.",
      image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1200&q=80",
      accentColor: "from-emerald-500 to-teal-600",
      bgGlow: "rgba(16,185,129,0.15)"
    },
    {
      name: "Rolls-Royce Spectre",
      engine: "Dual-Motor Electric",
      horsepower: "584 HP",
      topSpeed: "250 km/h",
      acceleration: "4.5s",
      desc: "An all-electric masterpiece. Gliding on an illuminated magic carpet ride, Spectre merges whisper-quiet performance with the absolute pinnacle of luxury.",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80",
      accentColor: "from-purple-600 to-fuchsia-700",
      bgGlow: "rgba(147,51,234,0.15)"
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      id="voyages" 
      className="relative min-h-screen overflow-hidden bg-bg-primary py-24 md:py-32 border-b border-white/5"
    >
      {/* Background Glows */}
      <div className="absolute w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[140px] -left-20 top-1/4 pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-[120px] -right-20 bottom-1/4 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full">
        
        {/* Header section */}
        <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-brand-orange tracking-widest uppercase mb-4">
              <Compass className="w-4 h-4 animate-spin-slow text-brand-orange" />
              <span>// HIGH-PERFORMANCE FLEET</span>
            </div>
            <h2 className="font-heading italic text-white text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-[-3px]">
              Featured <span className="text-brand-orange">Sports Cars</span>
            </h2>
          </div>
          <p className="text-text-secondary text-sm md:text-base font-body font-light leading-relaxed max-w-md">
            An elite selection of world-class automotive marvels that inspire my high-fidelity digital interactions, micro-animations, and luxury web designs.
          </p>
        </div>

        {/* Cars Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: 'easeOut' }}
              onMouseEnter={() => setSelectedCar(idx)}
              onMouseLeave={() => setSelectedCar(null)}
              className="relative h-full"
            >
              <TiltCard className="h-full rounded-3xl overflow-hidden flex flex-col justify-between border border-white/10 hover:border-brand-orange/30 bg-[#0D1117] group transition-all duration-500 hover:-translate-y-2">
                
                {/* Visual Image container */}
                <div className="relative aspect-[16/9] overflow-hidden w-full rounded-t-3xl shrink-0">
                  {/* Zooming background image */}
                  <PremiumImage 
                    src={car.image} 
                    alt={car.name} 
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000 filter brightness-90 group-hover:brightness-100"
                  />
                  {/* Subtle color overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-transparent to-transparent opacity-80" />
                  
                  {/* Floating spec indicator */}
                  <div className="absolute top-4 right-4 bg-[#050608]/90 border border-white/10 px-3 py-1 rounded-full text-[10px] font-mono text-brand-gold backdrop-blur-md">
                    {car.acceleration} (0-100)
                  </div>
                </div>

                {/* Card Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Brand gradient line */}
                    <div className={`w-12 h-1 rounded-full bg-gradient-to-r ${car.accentColor} mb-4 opacity-70 group-hover:opacity-100 transition-opacity`} />
                    <h3 className="font-heading italic text-white text-2xl tracking-tight mb-3 group-hover:text-brand-orange transition-colors">
                      {car.name}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed font-body font-light mb-6 line-clamp-3">
                      {car.desc}
                    </p>
                  </div>

                  {/* High performance specifications grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/5 pt-5 mt-auto">
                    {/* Spec Item 1 */}
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <Flame className="w-4 h-4 text-brand-orange" />
                      </div>
                      <div>
                        <div className="text-[9px] font-mono text-text-muted uppercase tracking-wider">Engine</div>
                        <div className="text-xs font-semibold text-white truncate max-w-[120px]">{car.engine}</div>
                      </div>
                    </div>

                    {/* Spec Item 2 */}
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <Zap className="w-4 h-4 text-brand-gold" />
                      </div>
                      <div>
                        <div className="text-[9px] font-mono text-text-muted uppercase tracking-wider">Power</div>
                        <div className="text-xs font-semibold text-white">{car.horsepower}</div>
                      </div>
                    </div>

                    {/* Spec Item 3 */}
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <Gauge className="w-4 h-4 text-brand-orange" />
                      </div>
                      <div>
                        <div className="text-[9px] font-mono text-text-muted uppercase tracking-wider">Top Speed</div>
                        <div className="text-xs font-semibold text-white">{car.topSpeed}</div>
                      </div>
                    </div>

                    {/* Spec Item 4 */}
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <Timer className="w-4 h-4 text-brand-gold" />
                      </div>
                      <div>
                        <div className="text-[9px] font-mono text-text-muted uppercase tracking-wider">0-100 km/h</div>
                        <div className="text-xs font-semibold text-white">{car.acceleration}</div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Neon glow hover effect */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                  style={{
                    boxShadow: `inset 0 0 30px ${car.bgGlow}, 0 0 20px ${car.bgGlow}`
                  }}
                />

              </TiltCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
