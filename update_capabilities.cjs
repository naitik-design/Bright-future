const fs = require('fs');

let content = fs.readFileSync('src/components/CapabilitiesSection.tsx', 'utf-8');

const capabilitiesImages = [
  "\"/src/assets/images/hypercar_nebula_orange_1783847902749.jpg\"",
  "\"/src/assets/images/grand_tourer_cosmic_1783847920421.jpg\"",
  "\"/src/assets/images/supercar_space_violet_1783847932948.jpg\"",
  "\"/src/assets/images/sports_car_nebula_red_1783847943784.jpg\"",
  "\"/src/assets/images/cyberpunk_hypercar_1783847976542.jpg\"",
  "\"/src/assets/images/luxury_suv_space_1783847989384.jpg\""
];

let matchCount = 0;
content = content.replace(/image: "https:\/\/images\.unsplash\.com.*?"/g, (match) => {
    return 'image: ' + capabilitiesImages[matchCount++ % capabilitiesImages.length];
});

fs.writeFileSync('src/components/CapabilitiesSection.tsx', content, 'utf-8');
console.log("Capabilities images updated");
