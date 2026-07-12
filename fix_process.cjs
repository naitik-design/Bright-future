const fs = require('fs');

let content = fs.readFileSync('src/components/ProcessSection.tsx', 'utf-8');

content = content.replace(/icon: (.*?)\n\s*image: "(.*?)"/g, 'icon: $1,\n      image: "$2"');

fs.writeFileSync('src/components/ProcessSection.tsx', content, 'utf-8');
console.log("Fixed ProcessSection");
