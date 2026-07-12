const fs = require('fs');

// UPDATE PROCESS SECTION
let processContent = fs.readFileSync('src/components/ProcessSection.tsx', 'utf-8');
processContent = processContent.replace("import { motion", "import { PremiumImage } from './PremiumImage';\nimport { motion");

const processImages = [
  "/src/assets/images/hypercar_nebula_orange_1783847902749.jpg",
  "/src/assets/images/grand_tourer_cosmic_1783847920421.jpg",
  "/src/assets/images/supercar_space_violet_1783847932948.jpg",
  "/src/assets/images/sports_car_nebula_red_1783847943784.jpg",
  "/src/assets/images/cyberpunk_hypercar_1783847976542.jpg",
  "/src/assets/images/luxury_suv_space_1783847989384.jpg"
];

let pIndex = 0;
processContent = processContent.replace(/icon: <.*?>\n\s*\}/g, (match) => {
  const img = processImages[pIndex % processImages.length];
  pIndex++;
  return `${match.slice(0, -1)}  image: "${img}"\n    }`;
});

const oldProcessCardRegex = /<motion\.div\s+initial=\{\{ opacity: 0.*?className="liquid-glass p-6 md:p-8 rounded-\[1\.75rem\] border-white\/10 hover:border-brand-orange\/30 bg-\[#12161D\]\/50 w-full relative group transition-all"\s*>/s;

const newProcessCardStructure = `<motion.div
                      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                      className="liquid-glass rounded-[1.75rem] border-white/10 hover:border-brand-orange/30 bg-[#12161D]/50 w-full relative group transition-all overflow-hidden flex flex-col"
                    >
                      <div className="relative aspect-[21/9] w-full overflow-hidden shrink-0 border-b border-white/5">
                        <PremiumImage src={step.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#12161D]/80 via-transparent to-transparent opacity-90" />
                        {/* Holographic background number */}
                        <span className="absolute right-6 bottom-4 font-heading italic text-white/20 text-5xl md:text-6xl leading-none font-bold select-none pointer-events-none group-hover:text-brand-orange/30 transition-colors z-10">
                          {step.num}
                        </span>
                      </div>
                      <div className="p-6 md:p-8 relative z-10 flex-grow">`;

processContent = processContent.replace(
  /<motion\.div\s+initial=\{\{ opacity: 0, x: isEven \? -40 : 40 \}\}\s+whileInView=\{\{ opacity: 1, x: 0 \}\}\s+viewport=\{\{ once: true, margin: "-100px" \}\}\s+transition=\{\{ duration: 0\.8, delay: 0\.1 \}\}\s+className="liquid-glass p-6 md:p-8 rounded-\[1\.75rem\] border-white\/10 hover:border-brand-orange\/30 bg-\[#12161D\]\/50 w-full relative group transition-all"\s*>/g,
  newProcessCardStructure
);

// We need to remove the old holographic number from inside the p-6 div
processContent = processContent.replace(
  /<span className="absolute right-6 top-4 font-heading italic text-white\/5 text-7xl md:text-8xl leading-none font-bold select-none pointer-events-none group-hover:text-brand-orange\/5 transition-colors">\s*\{step\.num\}\s*<\/span>/g,
  ''
);
// Also need to close the extra div
processContent = processContent.replace(
  /<\/p>\s*<\/motion\.div>/g,
  '</p>\n                      </div>\n                    </motion.div>'
);

fs.writeFileSync('src/components/ProcessSection.tsx', processContent, 'utf-8');

// UPDATE PRICING SECTION
let pricingContent = fs.readFileSync('src/components/PricingSection.tsx', 'utf-8');
pricingContent = pricingContent.replace("import { motion } from 'motion/react';", "import { motion } from 'motion/react';\nimport { PremiumImage } from './PremiumImage';");

const pricingImages = [
  "/src/assets/images/hypercar_red_nebula_1783848002735.jpg",
  "/src/assets/images/classic_sports_car_nebula_1783848037365.jpg",
  "/src/assets/images/cyberpunk_hypercar_1783847976542.jpg"
];

let prIndex = 0;
pricingContent = pricingContent.replace(/popular: (true|false),\s*color: "(.*?)"\s*\}/g, (match) => {
  const img = pricingImages[prIndex % pricingImages.length];
  prIndex++;
  return `${match.slice(0, -1)}  image: "${img}"\n    }`;
});

const oldPricingCardStart = /className={`relative flex flex-col justify-between rounded-\[2rem\] p-8 md:p-10 border \$\{pkg\.color\} bg-\[#0D1117\] transition-all duration-500 hover:-translate-y-2 group`}\s*>/g;

const newPricingCardStart = `className={\`relative flex flex-col justify-between rounded-[2rem] border \${pkg.color} bg-[#0D1117] transition-all duration-500 hover:-translate-y-2 group overflow-hidden\`}>
              <div className="relative aspect-[16/9] w-full overflow-hidden shrink-0 border-b border-white/5">
                <PremiumImage src={pkg.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-[#0D1117]/50 to-transparent opacity-90" />
              </div>
              <div className="p-8 md:p-10 pt-6 flex flex-col flex-grow relative z-10">`;

pricingContent = pricingContent.replace(oldPricingCardStart, newPricingCardStart);
pricingContent = pricingContent.replace(
  /<\/a>\s*<\/motion\.div>/g,
  '</a>\n              </div>\n            </motion.div>'
);

fs.writeFileSync('src/components/PricingSection.tsx', pricingContent, 'utf-8');

console.log("Process and Pricing sections updated");
