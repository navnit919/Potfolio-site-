const fs = require('fs');
let code = fs.readFileSync('main.js', 'utf8');
code = code.replace(
  /(\s+var w = bar\.getAttribute\("data-target-width"\);\s+if \(w\) bar\.style\.width = w;\s+\}\);\s+\})(\s+\/\* ===================================================================\s+18\. ADVANCED CONVERSATIONAL NAVNIT-AI)/,
  '$1\n  })();$2'
);
fs.writeFileSync('main.js', code);
fs.copyFileSync('main.js', 'script.js');
console.log('Fixed IIFE closure');
