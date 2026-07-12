import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export function FaqSection() {
  const faqs = [
    {
      question: "How long does it take to deliver a custom 3D vehicle visualizer?",
      answer: "A bespoke, high-fidelity WebGL 3D vehicle showroom typically takes between 4 to 8 weeks. This timeline covers model polygon optimization, material shader writing, reactive option-binding (for paint, rims, and accents), and thorough multi-device testing."
    },
    {
      question: "Are the WebGL 3D showrooms optimized for fluid mobile phone rendering?",
      answer: "Absolutely. I implement strict asset chunking, texture compression (such as KTX2 formats), dynamic level-of-detail (LOD) mesh swappers, and low-complexity light maps. This ensures your luxury showroom loads instantly and sustains a smooth 60 FPS on modern smartphones."
    },
    {
      question: "Can you sync my interactive configurator with custom CRM platforms?",
      answer: "Yes. I write robust API request pipelines and clean state-synchronizers that securely export selected paint codes, wheel styles, custom additions, and lead contact forms directly into systems like Salesforce, HubSpot, or bespoke database backends."
    },
    {
      question: "Do you offer post-launch support and future vehicle integration?",
      answer: "Yes, I offer monthly design and engineering retainers. Under these agreements, I monitor active core metrics, perform library and security patches, and quickly integrate new sports car models or customized component options into your existing WebGL grid."
    }
  ];

  const [openedIdx, setOpenedIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenedIdx(openedIdx === idx ? null : idx);
  };

  return (
    <section className="relative py-24 md:py-32 bg-bg-secondary border-b border-white/5 overflow-hidden">
      {/* Background spotlights */}
      <div className="absolute w-[400px] h-[400px] bg-brand-orange/5 rounded-full blur-[110px] right-20 top-1/4 pointer-events-none" />
      <div className="absolute w-[450px] h-[450px] bg-brand-gold/5 rounded-full blur-[130px] -left-20 bottom-1/4 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-20">
          <div className="text-xs font-bold text-brand-orange tracking-widest uppercase mb-4 flex items-center justify-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-brand-orange" />
            <span>// TECHNICAL INTELLIGENCE</span>
          </div>
          <h2 className="font-heading italic text-white text-5xl md:text-6xl lg:text-7xl leading-none tracking-[-2px]">
            Development <span className="text-brand-orange">FAQs</span>
          </h2>
          <p className="text-text-secondary text-sm md:text-base font-body font-light leading-relaxed mt-4 max-w-md mx-auto">
            Discover technical insights regarding delivery cadences, assets, optimizations, and API connections.
          </p>
        </div>

        {/* FAQs Accordion Grid */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openedIdx === idx;
            return (
              <div 
                key={idx}
                className="liquid-glass rounded-[1.25rem] border-white/10 bg-[#12161D]/50 hover:border-brand-orange/30 transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-6 md:p-8 flex justify-between items-center gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-heading italic text-lg md:text-xl text-white font-semibold transition-colors duration-200">
                    {faq.question}
                  </span>
                  <div className="w-8 h-8 rounded-full liquid-glass border-white/10 flex items-center justify-center text-text-secondary shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-brand-orange" /> : <ChevronDown className="w-4 h-4 text-brand-gold" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-8 text-xs md:text-sm text-text-secondary font-body font-light leading-relaxed border-t border-white/5 pt-5">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
