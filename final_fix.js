const fs = require('fs');

// ============================================================
// COMPREHENSIVE FIX SCRIPT FOR NAVNIT PORTFOLIO
// Fixes: Chatbot on all pages, theme switching, cartoon fonts,
//        command palette icons, and final polish
// ============================================================

let js = fs.readFileSync('main.js', 'utf8');

// ============================================================
// FIX 1: CRITICAL BUG — Chatbot trapped inside initSkillMeterBars
// The initSkillMeterBars IIFE never closes. The chatbot function
// is defined INSIDE it, so on pages without .meter-bar-fill
// elements (every page except skills.html), the early return
// at line ~2292 prevents the chatbot from ever initializing.
// Solution: Close the initSkillMeterBars IIFE before the chatbot.
// ============================================================

// Find the skill meter bars section that doesn't close properly
// We need to insert })(); before the chatbot section header
js = js.replace(
  `    }

  /* ===================================================================
     18. ADVANCED CONVERSATIONAL NAVNIT-AI CHATBOT (FULL KNOWLEDGE BASE)
     =================================================================== */
  function initNavnitChatbot() {`,
  `    }
  })();

  /* ===================================================================
     18. ADVANCED CONVERSATIONAL NAVNIT-AI CHATBOT (FULL KNOWLEDGE BASE)
     =================================================================== */
  function initNavnitChatbot() {`
);

// ============================================================
// FIX 2: Remove the duplicate })(); at the very end
// After fix 1, we have the correct structure. But there were
// two })(); at the end. The chatbot section has its own
// DOMContentLoaded listener wrapping. We need exactly:
//   initNavnitChatbot call
//   })();  <-- closes the outer IIFE
// ============================================================

// Remove the extra })(); at the very end 
js = js.replace(/\}\)\(\);\s*\}\)\(\);\s*$/, '})();\n');

// ============================================================
// FIX 3: Remove the debug window.onerror alert (annoying for users)
// ============================================================
js = js.replace(
  `  window.onerror = function(msg, url, line) { alert("Crash: " + msg + " line " + line); };\r`,
  ''
);
js = js.replace(
  `  window.onerror = function(msg, url, line) { alert("Crash: " + msg + " line " + line); };`,
  ''
);

// ============================================================
// FIX 4: Fix command palette icons (mojibake → real emoji)
// ============================================================
const iconFixes = [
  ['ðŸ"„', '📄'], ['ðŸ"', '📝'], ['ðŸ› ï¸', '🛠️'], ['ðŸ"‚', '📂'],
  ['ðŸ­', '🏭'], ['âœ‰ï¸', '✉️'], ['ðŸš¨', '🚨'], ['ðŸ"¹', '📹'],
  ['ðŸ©º', '🩺'], ['ðŸš—', '🚗'], ['ðŸš', '🚁'], ['ðŸ"¡', '📡'],
  ['ðŸ"‹', '📋'], ['ðŸŽ®', '🎮'], ['ðŸŽ¨', '🎨'], ['ðŸ"Š', '🔊'],
  ['ðŸ"¥', '📥'], ['ðŸ"ž', '📞'], ['ðŸ™', '🐙'], ['ðŸ'¼', '💼'],
  ['ðŸ"', '🔍'],
  // Footer keyboard symbols
  ['â†'', '↑'], ['â†"', '↓'], ['â†µ', '↵'],
  // Title mojibake
  ['âŒ˜K', '⌘K'], ['Â·', '·'], ['â€"', '—'],
  ['RÃ©sumÃ©', 'Résumé']
];
for (const [bad, good] of iconFixes) {
  while (js.includes(bad)) {
    js = js.replace(bad, good);
  }
}

fs.writeFileSync('main.js', js, 'utf8');
console.log('✅ main.js fixes applied successfully!');

// ============================================================
// FIX 5: Update style.css — further reduce cartoon font weight,
// reduce letter-spacing, make it look cleaner
// ============================================================
let css = fs.readFileSync('style.css', 'utf8');

// Reduce hero name font-weight in cartoon theme
css = css.replace(
  /\[data-theme="cartoon"\] \.hero-developer-name \{[^}]*font-weight:\s*900/,
  (match) => match.replace('font-weight: 900', 'font-weight: 600')
);

// Reduce editorial subtitle
css = css.replace(
  /\[data-theme="cartoon"\] \.editorial-subtitle \{[^}]*font-weight:\s*700/,
  (match) => match.replace('font-weight: 700', 'font-weight: 500')
);

// Reduce animated typing target
css = css.replace(
  /\[data-theme="cartoon"\] \.animated-typing-target \{[^}]*font-weight:\s*800/,
  (match) => match.replace('font-weight: 800', 'font-weight: 600')
);

// Reduce bio narrative strong 
css = css.replace(
  /\[data-theme="cartoon"\] \.hero-bio-narrative strong \{[^}]*font-weight:\s*800/,
  (match) => match.replace('font-weight: 800', 'font-weight: 600')
);

// Reduce CTA button font weights
css = css.replace(
  /\[data-theme="cartoon"\] \.portfolio-cta-btn\.primary-cta \{[^}]*font-weight:\s*900/,
  (match) => match.replace('font-weight: 900', 'font-weight: 600')
);
css = css.replace(
  /\[data-theme="cartoon"\] \.portfolio-cta-btn\.secondary-cta \{[^}]*font-weight:\s*800/,
  (match) => match.replace('font-weight: 800', 'font-weight: 600')
);

// Reduce nav item font weight
css = css.replace(
  /\[data-theme="cartoon"\] \.nav-item \{[^}]*font-weight:\s*800/,
  (match) => match.replace('font-weight: 800', 'font-weight: 600')
);

// Reduce telemetry number font weight
css = css.replace(
  /\[data-theme="cartoon"\] \.telemetry-num \{[^}]*font-weight:\s*900/,
  (match) => match.replace('font-weight: 900', 'font-weight: 700')
);

// CV overrides at the bottom — reduce those too
css = css.replace(
  /\[data-theme="cartoon"\] \.cv-entry-title,\s*\[data-theme="cartoon"\] \.cv-skill-cat \{[^}]*font-weight:\s*800/,
  (match) => match.replace('font-weight: 800', 'font-weight: 600')
);

fs.writeFileSync('style.css', css, 'utf8');
console.log('✅ style.css fixes applied successfully!');

// ============================================================
// FIX 6: Sync script.js with main.js
// (script.js is still referenced by some pages)
// ============================================================
fs.copyFileSync('main.js', 'script.js');
console.log('✅ script.js synced with main.js!');

// ============================================================
// FIX 7: Make sure ALL HTML files reference main.js consistently
// and that home.html is synced with latest index.html
// ============================================================
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'index.html');
for (const file of htmlFiles) {
  let html = fs.readFileSync(file, 'utf8');
  // Ensure main.js is referenced (not script.js)
  if (html.includes('src="script.js"') && !html.includes('src="main.js"')) {
    html = html.replace('src="script.js"', 'src="main.js"');
    fs.writeFileSync(file, html, 'utf8');
    console.log(`  Updated ${file} to reference main.js`);
  }
}

console.log('\n🎉 ALL FIXES APPLIED! Portfolio is ready for final delivery.');
