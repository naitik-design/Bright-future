const fs = require('fs');

let content = fs.readFileSync('src/components/ServicesSection.tsx', 'utf-8');

// 1. Add PremiumImage import
content = content.replace("import { TiltCard } from './TiltCard';", "import { TiltCard } from './TiltCard';\nimport { PremiumImage } from './PremiumImage';");

// 2. Add images to the services array
const images = [
  "/src/assets/images/hypercar_nebula_orange_1783847902749.jpg",
  "/src/assets/images/grand_tourer_cosmic_1783847920421.jpg",
  "/src/assets/images/supercar_space_violet_1783847932948.jpg",
  "/src/assets/images/sports_car_nebula_red_1783847943784.jpg",
  "/src/assets/images/cyberpunk_hypercar_1783847976542.jpg",
  "/src/assets/images/luxury_suv_space_1783847989384.jpg",
  "/src/assets/images/hypercar_red_nebula_1783848002735.jpg",
  "/src/assets/images/classic_sports_car_nebula_1783848037365.jpg"
];

let currentIndex = 0;
content = content.replace(/tag: ".*?",/g, (match) => {
  const img = images[currentIndex % images.length];
  currentIndex++;
  return `image: "${img}",\n      ${match}`;
});

// 3. Update the card structure
const oldCardStructure = `<TiltCard className="liquid-glass rounded-\\[2rem\\] p-6 flex flex-col justify-between h-full border-white/10 hover:border-brand-orange/30 bg-\\[#12161D\\]/50 backdrop-blur-xl group hover:-translate-y-2 transition-all duration-500 shadow-xl hover:shadow-brand-orange/10">
                <div>
                  {/* Top row with custom brand indicators */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <span className="text-\\[9px\\] font-bold text-brand-gold tracking-widest uppercase bg-brand-gold/5 border border-brand-gold/15 rounded-full px-2.5 py-1">
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
                <div className="border-t border-white/5 pt-5 mt-auto">
                  <div className="flex flex-wrap gap-1.5">
                    {srv.highlights.map((hl, i) => (
                      <span key={i} className="text-\\[9.5px\\] font-mono text-text-muted bg-white/5 rounded-full px-2 py-1 whitespace-nowrap">
                        {hl}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>`;

const newCardStructure = `<TiltCard className="liquid-glass rounded-[2rem] flex flex-col justify-between h-full border-white/10 hover:border-brand-orange/30 bg-[#12161D]/50 backdrop-blur-xl group hover:-translate-y-2 transition-all duration-500 shadow-xl hover:shadow-brand-orange/10 overflow-hidden">
                <div className="relative aspect-[16/9] w-full shrink-0">
                  <PremiumImage 
                    src={srv.image} 
                    alt={srv.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12161D]/90 via-transparent to-transparent opacity-90" />
                  
                  {/* Top row with custom brand indicators overlay */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-4 z-10">
                    <span className="text-[9px] font-bold text-brand-gold tracking-widest uppercase bg-black/40 border border-brand-gold/20 rounded-full px-2.5 py-1 backdrop-blur-md">
                      {srv.tag}
                    </span>
                    <div className="w-10 h-10 rounded-xl liquid-glass flex items-center justify-center border-white/20 bg-black/40 backdrop-blur-md group-hover:border-brand-orange/40 transition-colors">
                      {srv.icon}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-4 flex flex-col flex-grow">
                  {/* Main service details */}
                  <h3 className="font-heading italic text-white text-xl md:text-2xl tracking-tight mb-3 group-hover:text-brand-orange transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-text-secondary text-xs md:text-sm font-body font-light leading-relaxed mb-6">
                    {srv.desc}
                  </p>
                  
                  {/* Bullets & Action CTA row */}
                  <div className="border-t border-white/5 pt-5 mt-auto">
                    <div className="flex flex-wrap gap-1.5">
                      {srv.highlights.map((hl, i) => (
                        <span key={i} className="text-[9.5px] font-mono text-text-muted bg-white/5 rounded-full px-2 py-1 whitespace-nowrap">
                          {hl}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>`;

// Replace exact card structure, ignoring small whitespace differences by using a regex 
const cardRegex = /<TiltCard className="liquid-glass rounded-\[2rem\] p-6 flex flex-col justify-between h-full border-white\/10 hover:border-brand-orange\/30 bg-\[#12161D\]\/50 backdrop-blur-xl group hover:-translate-y-2 transition-all duration-500 shadow-xl hover:shadow-brand-orange\/10">[\s\S]*?<\/TiltCard>/m;
content = content.replace(cardRegex, newCardStructure);

fs.writeFileSync('src/components/ServicesSection.tsx', content, 'utf-8');
console.log("ServicesSection updated");
