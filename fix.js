const fs = require('fs');

// Fix main.js
let js = fs.readFileSync('main.js', 'utf8');

// 1. Fix the IIFE closure for the chatbot
js = js.replace(
  `      meterFills.forEach(function (bar) {
        var w = bar.getAttribute("data-target-width");
        if (w) bar.style.width = w;
      });
    }

  /* ===================================================================
     18. ADVANCED CONVERSATIONAL NAVNIT-AI CHATBOT (FULL KNOWLEDGE BASE)`,
  `      meterFills.forEach(function (bar) {
        var w = bar.getAttribute("data-target-width");
        if (w) bar.style.width = w;
      });
    }
  })();

  /* ===================================================================
     18. ADVANCED CONVERSATIONAL NAVNIT-AI CHATBOT (FULL KNOWLEDGE BASE)`
);

// 2. Fix the mojibake icons in the command palette
const iconFixes = [
  ['ðŸ"„', '📄'], ['ðŸ"', '📝'], ['ðŸ› ï¸', '🛠️'], ['ðŸ"‚', '📂'],
  ['ðŸ ', '🏭'], ['âœ‰ï¸', '✉️'], ['ðŸš¨', '🚨'], ['ðŸ"¹', '📹'],
  ['ðŸ©º', '🩺'], ['ðŸš—', '🚗'], ['ðŸš', '🚁'], ['ðŸ"¡', '📡'],
  ['ðŸ"‹', '📋'], ['ðŸŽ®', '🎮'], ['ðŸŽ¨', '🎨'], ['ðŸ"Š', '🔊'],
  ['ðŸ"¥', '📥'], ['ðŸ"ž', '📞'], ['ðŸ™', '🐙'], ['ðŸ¼', '💼'],
  ['ðŸ"', '🔍'],
  ['â†', '↑'], ['â†"', '↓'], ['â†µ', '↵'],
  ['âŒ˜K', '⌘K'], ['Â·', '·'], ['â€"', '—'],
  ['RÃ©sumÃ©', 'Résumé']
];

for (const [bad, good] of iconFixes) {
  js = js.split(bad).join(good); // replaceAll
}

fs.writeFileSync('main.js', js, 'utf8');
console.log('main.js fixed');

// Fix script.js (just copy main.js to script.js to be safe)
fs.copyFileSync('main.js', 'script.js');
console.log('script.js synced with main.js');

// Fix style.css for cartoon theme fonts
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(
  /\[data-theme="cartoon"\] \.hero-developer-name \{[\s\S]*?font-weight:\s*900/g,
  (match) => match.replace('font-weight: 900', 'font-weight: 500')
);

css = css.replace(
  /\[data-theme="cartoon"\] \.editorial-subtitle \{[\s\S]*?font-weight:\s*700/g,
  (match) => match.replace('font-weight: 700', 'font-weight: 400')
);

css = css.replace(
  /\[data-theme="cartoon"\] \.animated-typing-target \{[\s\S]*?font-weight:\s*800/g,
  (match) => match.replace('font-weight: 800', 'font-weight: 500')
);

fs.writeFileSync('style.css', css, 'utf8');
console.log('style.css fixed');
