import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Compass, Mail, Phone, MapPin, Send, MessageSquareCode, Globe, Cpu } from 'lucide-react';

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    projectType: '3D Web Visualizer',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', projectType: '3D Web Visualizer', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-bg-primary border-b border-white/5 overflow-hidden">
      {/* Background ambient halos */}
      <div className="absolute w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[130px] -right-20 top-1/4 pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-[110px] -left-20 bottom-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Panel: Contact Info & Interactive Design Matrix */}
          <div className="lg:col-span-5 flex flex-col justify-center h-full">
            <div className="text-xs font-bold text-brand-orange tracking-widest uppercase mb-4 flex items-center gap-1.5">
              <MessageSquareCode className="w-4 h-4 text-brand-orange" />
              <span>// SECURED DESIGN PORTAL</span>
            </div>
            
            <h2 className="font-heading italic text-white text-5xl md:text-6xl leading-[0.95] tracking-[-2px] mb-8">
              Start Your <span className="text-brand-orange">Interactive Journey</span>.
            </h2>

            <p className="text-text-secondary text-sm md:text-base font-body font-light leading-relaxed mb-8">
              Ready to elevate your digital presence to supercar-grade? Submit your project details below to schedule an initial design briefing and lock in developmental availability.
            </p>

            {/* Business Contact Cards */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4 p-4 rounded-xl liquid-glass border-white/5 bg-[#12161D]/30">
                <div className="w-10 h-10 rounded-lg bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[9px] font-mono text-text-muted uppercase">CREATIVE STUDIO</div>
                  <div className="text-white text-xs font-semibold">Silicon Coast, USA // Remote Worldwide</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl liquid-glass border-white/5 bg-[#12161D]/30">
                <div className="w-10 h-10 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[9px] font-mono text-text-muted uppercase">SECURED COMLINE</div>
                  <div className="text-white text-xs font-semibold">+1 (800) VELOCITY-WEB</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl liquid-glass border-white/5 bg-[#12161D]/30">
                <div className="w-10 h-10 rounded-lg bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[9px] font-mono text-text-muted uppercase">SECURE TRANSMISSIONS</div>
                  <div className="text-white text-xs font-semibold">develop@antigravity-studio.com</div>
                </div>
              </div>
            </div>

            {/* Interactive Vector Route Map Simulation */}
            <div className="relative rounded-2xl border border-white/10 p-5 overflow-hidden h-[160px] bg-black/45 group">
              <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                {/* Path lines */}
                <div className="w-40 h-40 rounded-full border border-dashed border-brand-orange/30 animate-spin-slow" />
                <div className="absolute w-28 h-28 rounded-full border border-white/15" />
                <div className="absolute w-full h-[1px] bg-white/5" />
                <div className="absolute h-full w-[1px] bg-white/5" />
              </div>

              <div className="relative z-10 flex justify-between items-start">
                <span className="text-[9px] font-mono text-brand-gold uppercase tracking-widest flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-brand-gold animate-spin-slow" />
                  <span>FRAME STACK VECTORS</span>
                </span>
                <span className="text-[9px] font-mono text-text-muted">ENGINE ACTIVE</span>
              </div>

              <div className="mt-6 flex justify-around items-center text-center">
                <div>
                  <div className="text-white text-xs font-mono font-bold tracking-tight">DESIGN MODEL</div>
                  <div className="text-[10px] text-text-secondary font-mono mt-1">120HZ COMPRESSION</div>
                </div>
                <div className="h-[1px] w-12 bg-gradient-to-r from-brand-orange to-brand-gold animate-pulse" />
                <div>
                  <div className="text-brand-orange text-xs font-mono font-bold tracking-tight">DEPLOY PROTOCOL</div>
                  <div className="text-[10px] text-brand-gold font-mono mt-1">VERCEL EDGE CORE</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Panel: High-End Contact Form */}
          <div className="lg:col-span-7 w-full">
            <div className="liquid-glass rounded-[2rem] p-8 md:p-10 border border-white/10 bg-[#12161D]/50 backdrop-blur-xl shadow-2xl relative">
              
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-success/10 border border-success/30 flex items-center justify-center text-success mb-6 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                    <Send className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading italic text-white text-3xl leading-none mb-3">Briefing Transmitted</h3>
                  <p className="text-text-secondary text-xs md:text-sm font-body font-light max-w-sm">
                    Your digital spec request has been logged. I will contact you on secure frequency to map out project specifics within 12 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-mono text-brand-gold tracking-widest uppercase mb-2">PARTNER NAME</label>
                      <input 
                        type="text" 
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Christian von Koenig" 
                        className="w-full bg-[#0B0E13]/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-brand-orange/60 placeholder-white/20 font-body font-light"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-brand-gold tracking-widest uppercase mb-2">GATEWAY EMAIL</label>
                      <input 
                        type="email" 
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="e.g. showroom@brand.com" 
                        className="w-full bg-[#0B0E13]/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-brand-orange/60 placeholder-white/20 font-body font-light"
                      />
                    </div>
                  </div>

                  {/* Dropdown: Project preferences */}
                  <div>
                    <label className="block text-[10px] font-mono text-brand-gold tracking-widest uppercase mb-2">TARGET EXPERIMENTAL SYSTEM</label>
                    <select 
                      value={formState.projectType}
                      onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                      className="w-full bg-[#0B0E13]/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-brand-orange/60 font-body font-light cursor-pointer"
                    >
                      <option className="bg-[#0B0E13] text-white" value="3D Web Visualizer">3D Web Visualizer (Three.js/WebGL)</option>
                      <option className="bg-[#0B0E13] text-white" value="Luxury Brand Landing Page">Luxury Brand Landing Page (GSAP/Lenis)</option>
                      <option className="bg-[#0B0E13] text-white" value="Full-Stack Campaign System">Full-Stack Campaign System (Supabase/Auth)</option>
                      <option className="bg-[#0B0E13] text-white" value="General Collaboration">General Collaborative Partnership</option>
                    </select>
                  </div>

                  {/* Textarea: Transmission */}
                  <div>
                    <label className="block text-[10px] font-mono text-brand-gold tracking-widest uppercase mb-2">SPECIFICATION DETAILS</label>
                    <textarea 
                      rows={5}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Outline target release dates, performance demands, dynamic visual goals, or key models to feature..." 
                      className="w-full bg-[#0B0E13]/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-brand-orange/60 placeholder-white/20 font-body font-light resize-none"
                    />
                  </div>

                  {/* Submit CTA */}
                  <button 
                    type="submit"
                    className="w-full btn-luxury-gradient text-white py-4 rounded-xl text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer transform hover:scale-[1.01] active:scale-95 transition-all"
                  >
                    <Send className="w-4 h-4 animate-pulse" />
                    <span>TRANSMIT SPEC BRIEFING</span>
                  </button>

                  <div className="text-center">
                    <span className="text-[9px] font-mono text-text-muted">
                      SECURED COVENANT REGISTRY // ENCRYPTED SHA-256
                    </span>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
