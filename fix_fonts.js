const fs = require('fs');

// 1. Fix typography in style.css and add cartoon CV overrides
let css = fs.readFileSync('style.css', 'utf8');
css = css.replace('--font-sans: "Inter", "Segoe UI", system-ui, sans-serif;', '--font-sans: "Outfit", "Plus Jakarta Sans", system-ui, sans-serif;');
css = css.replace('--font-sans: \'Plus Jakarta Sans\', system-ui, -apple-system, sans-serif;', '--font-sans: "Outfit", "Plus Jakarta Sans", system-ui, sans-serif;');

const cvCartoonOverrides = `
/* ==================== CARTOON THEME CV OVERRIDES ==================== */
[data-theme="cartoon"] .cv-document {
  background: #ffffff;
  border: 4px solid #000000;
  box-shadow: 8px 8px 0px #000000;
  border-radius: 20px;
  color: #000000;
}
[data-theme="cartoon"] .cv-candidate-name {
  color: #000000;
  text-shadow: 2px 2px 0px var(--accent-cyan);
}
[data-theme="cartoon"] .cv-section-title {
  color: #000000;
  border-bottom: 4px solid #000000;
}
[data-theme="cartoon"] .cv-entry {
  border-left: 4px solid #000000 !important;
}
[data-theme="cartoon"] .cv-entry-title,
[data-theme="cartoon"] .cv-skill-cat {
  color: #000000 !important;
  font-weight: 800;
}
[data-theme="cartoon"] .cv-entry-sub {
  color: #333333;
}
[data-theme="cartoon"] .cv-text-muted {
  color: #555555;
}
`;
if (!css.includes('CARTOON THEME CV OVERRIDES')) {
  fs.writeFileSync('style.css', css + '\n' + cvCartoonOverrides);
} else {
  fs.writeFileSync('style.css', css);
}

// 2. Inject Chatbot HTML directly into home.html so it CANNOT fail to render!
let home = fs.readFileSync('home.html', 'utf8');
const chatbotHtml = `
  <!-- HARDCODED CHATBOT INJECTION -->
  <button class="chatbot-widget-btn" id="navnit-ai-assistant-toggle" title="Chat with Navnit-AI Assistant" type="button" style="position: fixed; bottom: 2.5rem; right: 2.5rem; z-index: 999999; background: #38bdf8; color: #fff; padding: 1rem 1.6rem; border-radius: 40px; border: 2px solid #000; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; font-size: 1.2rem; box-shadow: 4px 4px 0 #000;">
    <span class="widget-icon" style="font-size: 1.5rem;">🤖</span><span class="widget-text">Navnit AI</span><span class="pulse-dot"></span>
  </button>
`;
if (!home.includes('HARDCODED CHATBOT INJECTION')) {
  home = home.replace('</body>', chatbotHtml + '\n</body>');
  fs.writeFileSync('home.html', home);
}
console.log('Done fixing fonts, CV, and injecting chatbot HTML!');

