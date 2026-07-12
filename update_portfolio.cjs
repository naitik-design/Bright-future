const fs = require('fs');

let content = fs.readFileSync('src/components/PortfolioSection.tsx', 'utf-8');

const newImages = [
  "\"/src/assets/images/sports_car_nebula_red_1783847943784.jpg\"",
  "\"/src/assets/images/cyberpunk_hypercar_1783847976542.jpg\"",
  "\"/src/assets/images/classic_sports_car_nebula_1783848037365.jpg\""
];

let matchCount = 0;
content = content.replace(/image: "https:\/\/images\.unsplash\.com.*?\.jpg"/g, (match) => {
    return 'image: ' + newImages[matchCount++ % newImages.length];
});

// Since the original was just unsplash URLs without .jpg sometimes:
content = content.replace(/image: "https:\/\/images\.unsplash\.com.*?"/g, (match) => {
    return 'image: ' + newImages[matchCount++ % newImages.length];
});

fs.writeFileSync('src/components/PortfolioSection.tsx', content, 'utf-8');
console.log("Portfolio images updated");
