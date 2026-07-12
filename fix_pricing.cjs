const fs = require('fs');

let content = fs.readFileSync('src/components/PricingSection.tsx', 'utf-8');

content = content.replace(/color: "(.*?)"\s*image: "(.*?)"/g, 'color: "$1",\n      image: "$2"');

fs.writeFileSync('src/components/PricingSection.tsx', content, 'utf-8');
console.log("Fixed PricingSection");
