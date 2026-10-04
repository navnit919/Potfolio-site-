const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const keywordsTag = '<meta name="keywords" content="Navnit Kumar, Navnit Portfolio, Navnit NIT Nagaland, Navnit Kumar NIT Nagaland, Electrical Engineering, Software Developer, EEE NIT Nagaland" />';

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('name="keywords"')) {
    content = content.replace('<meta name="description"', keywordsTag + '\n  <meta name="description"');
    fs.writeFileSync(file, content);
  }
}
console.log('SEO keywords injected successfully!');
