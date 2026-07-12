import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Compass, ShieldCheck, Globe, Trophy } from 'lucide-react';

export function AboutCompany() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // IntersectionObserver to control play/pause of background video and fade entry
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hasLeft = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const intersecting = entry.isIntersecting;
        setIsVisible(intersecting);

        if (intersecting) {
          if (hasLeft && video.currentTime > 0) {
            video.currentTime = 0;
          }
          hasLeft = false;
          video.play().catch((err) => {
            console.log("Background video play was interrupted or delayed gracefully:", err);
          });
        } else {
          video.pause();
          hasLeft = true;
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const handleEnded = () => {
      video.pause();
    };
    video.addEventListener('ended', handleEnded);

    return () => {
      observer.disconnect();
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Scroll parallax for luxury background glows and floating cards
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const floatY1 = useTransform(scrollYProgress, [0, 1], [-30, 40]);
  const floatY2 = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section 
      ref={containerRef} 
      id="about" 
      className="relative min-h-screen py-24 md:py-32 overflow-hidden bg-bg-primary flex items-center border-b border-white/5"
    >
      {/* High-Performance Native Background Video */}
      <div 
        className={`absolute inset-0 w-full h-full overflow-hidden transition-opacity duration-1000 ease-out pointer-events-none z-0 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <video
          ref={videoRef}
          src="https://res.cloudinary.com/jmoelmzp/video/upload/lv_0_20260712100516_fj6qdo.mp4"
          poster="https://res.cloudinary.com/jmoelmzp/video/upload/lv_0_20260712100516_fj6qdo.jpg"
          className="absolute inset-0 w-full h-full object-cover scale-105"
          autoPlay
          muted
          playsInline
          preload="auto"
        />
        {/* Dark Cinematic Overlay (60% black overlay with soft backdrop blur for readability) */}
        <div className="absolute inset-0 bg-[#06080C]/60 backdrop-blur-[2px]" />
      </div>

      {/* Cinematic Ambient Glows */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute w-[450px] h-[450px] rounded-full bg-brand-orange/10 blur-[130px] -right-20 top-20 pointer-events-none"
      />
      <motion.div 
        style={{ y: floatY1 }}
        className="absolute w-[350px] h-[350px] rounded-full bg-brand-gold/5 blur-[100px] -left-10 bottom-20 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Storytelling Text */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-2 text-xs font-bold text-brand-orange tracking-widest uppercase mb-4"
            >
              <Compass className="w-4 h-4 animate-spin-slow text-brand-orange" />
              <span>// CHRONICLES OF SPEED AND CODE</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-heading italic text-white text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-[-2px] mb-8"
            >
              The architecture of<br />
              <span className="text-brand-orange">high-octane</span> design.
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-text-secondary text-base md:text-lg leading-relaxed font-body font-light mb-8 max-w-2xl"
            >
              I am a passionate website designer and developer dedicated to creating premium, high-performance digital interfaces. Much like a bespoke sports car, my websites are engineered for breathtaking speed, pristine aesthetics, and flawless responsiveness. I fuse front-end craft with WebGL animations and fluid luxury UX.
            </motion.p>

            {/* Asymmetric Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              {[
                {
                  icon: <ShieldCheck className="w-5 h-5 text-brand-orange" />,
                  title: "Precision Engineering",
                  desc: "Meticulous, responsive code configured with modern frameworks to ensure loading times are practically instantaneous."
                },
                {
                  icon: <Globe className="w-5 h-5 text-brand-gold" />,
                  title: "Fluid Motion",
                  desc: "Leveraging custom GSAP triggers, smooth Lenis scrolling, and 3D interactions for a seamless user experience."
                }
              ].map((val, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                  className="liquid-glass p-5 rounded-2xl border-white/5 bg-bg-secondary/40 hover:border-brand-orange/30 transition-all flex gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    {val.icon}
                  </div>
                  <div>
                    <h4 className="font-heading text-lg text-white font-medium mb-1">{val.title}</h4>
                    <p className="text-xs text-text-muted leading-relaxed font-body font-light">{val.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Premium Interactive 3D Orbit Display & Luxury Card */}
          <div className="lg:col-span-5 relative flex justify-center items-center py-8">
            {/* Holographic Target Display */}
            <motion.div 
              style={{ y: floatY2 }}
              className="relative w-full aspect-square max-w-[400px] liquid-glass p-6 rounded-3xl border-white/10 flex flex-col justify-between overflow-hidden shadow-2xl bg-bg-secondary/30 backdrop-blur-xl group"
            >
              {/* Spinning compass grid simulation */}
              <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                <div className="w-72 h-72 rounded-full border border-dashed border-brand-orange/40 animate-spin-slow" />
                <div className="absolute w-56 h-56 rounded-full border border-brand-gold/30 animate-spin-reverse" />
                <div className="absolute w-40 h-40 rounded-full border border-white/10" />
                
                {/* Simulated coordinate crosshairs */}
                <div className="absolute w-full h-[1px] bg-white/5" />
                <div className="absolute h-full w-[1px] bg-white/5" />
              </div>

              {/* Floating Luxury Elements on top */}
              <div className="relative z-10 flex justify-between items-start">
                <span className="bg-brand-gold/10 text-brand-gold border border-brand-gold/20 text-[10px] font-bold tracking-widest rounded-full px-3 py-1 flex items-center gap-1">
                  <Trophy className="w-3 h-3 text-brand-gold animate-bounce" />
                  <span>2026 PORTFOLIO</span>
                </span>
                <span className="text-[10px] font-mono text-text-muted">SYS.VER.3.05</span>
              </div>

              {/* Visual mock planetary display */}
              <div className="relative z-10 flex flex-col items-center justify-center my-10 py-4">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      "0 0 40px rgba(255,90,54,0.15)",
                      "0 0 70px rgba(255,90,54,0.35)",
                      "0 0 40px rgba(255,90,54,0.15)"
                    ]
                  }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="w-28 h-28 rounded-full bg-gradient-to-br from-[#FF5A36] to-[#F6C453] relative flex items-center justify-center"
                >
                  <div className="absolute inset-0 rounded-full bg-white/10 mix-blend-overlay animate-pulse" />
                  <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center">
                    <span className="text-[10px] font-mono tracking-wider text-white">APEX-X</span>
                  </div>
                </motion.div>
                
                {/* Small orbiting node simulation */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                  className="absolute w-36 h-36 border border-white/5 rounded-full pointer-events-none flex items-start justify-center"
                >
                  <div className="w-3 h-3 bg-brand-gold rounded-full shadow-[0_0_10px_#F6C453] -mt-1.5" />
                </motion.div>
              </div>

              <div className="relative z-10 bg-black/40 border border-white/10 p-4 rounded-xl backdrop-blur-md">
                <div className="text-[10px] font-mono text-brand-orange mb-1">PERFORMANCE INDEX</div>
                <h5 className="font-heading italic text-white text-xl leading-none">Aero Dynamics</h5>
                <p className="text-[11px] text-text-secondary font-body font-light mt-2 leading-relaxed">
                  Sculpted digital vectors and ultra-responsive layout matrices optimized to yield peak aesthetic performance.
                </p>
              </div>
            </motion.div>

            {/* Additional floating small element */}
            <motion.div
              style={{ y: floatY1 }}
              className="absolute -bottom-4 right-4 md:right-12 bg-[#12161D]/80 border border-brand-orange/20 p-4 rounded-2xl backdrop-blur-xl max-w-[180px] pointer-events-none shadow-2xl hidden sm:block"
            >
              <div className="text-2xl font-bold text-brand-orange font-heading">0.12s</div>
              <div className="text-[10px] text-text-secondary uppercase tracking-widest mt-1 font-semibold">INTERACTIVE LATENCY</div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
