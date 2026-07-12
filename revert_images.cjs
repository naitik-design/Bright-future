const fs = require('fs');
const path = require('path');

const realImages = [
  "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600706432502-75a0e2b34457?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1503371060967-bd7fd4913203?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1611566141121-81373b470412?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1632245889029-e406faaa34cd?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80"
];

const componentsDir = path.join(__dirname, 'src/components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));

let imgIndex = 0;

files.forEach(file => {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  let modified = false;
  content = content.replace(/\/src\/assets\/images\/[^"]+\.jpg/g, (match) => {
    modified = true;
    return realImages[imgIndex++ % realImages.length];
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${file}`);
  }
});

