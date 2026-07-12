const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync('dist/index.html', 'utf-8');

const dom = new JSDOM(indexHtml, {
  runScripts: "dangerously",
  resources: "usable",
  url: "http://localhost:3000/"
});

dom.window.addEventListener('error', (event) => {
  console.log("JSDOM ERROR:", event.error);
});
dom.window.addEventListener('unhandledrejection', (event) => {
  console.log("JSDOM PROMISE REJECTION:", event.reason);
});

setTimeout(() => {
  console.log("Done waiting");
  process.exit(0);
}, 3000);
