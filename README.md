# Navnit Kumar — Portfolio

A fast, single-page portfolio website. Sleek minimal dark theme, no build step,
no frameworks — just HTML, CSS and JavaScript. Works straight from the file system.

Navnit-Portfolio/
├── index.html
├── style.css
├── script.js
├── favicon.svg
├── images/
│   ├── README.md
│   ├── profile.jpg
│   ├── traffic.jpg
│   ├── oa-screening.jpg
│   ├── drone.jpg
│   ├── rc-car.jpg
│   ├── ultrasonic.jpg
│   └── python.jpg
└── resume/
    ├── README.md
    └── Navnit_Kumar_Resume.pdf

## 1. See it locally
Just double-click `index.html`, or serve the folder:

```bash
# Python (any OS with Python installed)
python -m http.server 8000
# then open http://localhost:8000
```

## 2. Add your content
- **Images** — drop files into `images/` using the names in `images/README.md`.
- **Résumé** — add `resume/Navnit_Kumar_Resume.pdf`.
- **Text** — edit `index.html`. Sections are clearly commented (`<!-- PROJECTS -->`, etc.).

## 3. Publish it free

### Option A — GitHub Pages
1. Create a GitHub repo (e.g. `navnit-portfolio`) and push these files to it.
2. Repo **Settings → Pages → Build and deployment → Source: Deploy from a branch**.
3. Choose branch `main`, folder `/root`, then **Save**.
4. Your site goes live at `https://<your-username>.github.io/navnit-portfolio/`.

```bash
git init
git add .
git commit -m "Portfolio site"
git branch -M main
git remote add origin https://github.com/navnit919/navnit-portfolio.git
git push -u origin main
```

### Option B — Vercel (drag & drop)
1. Go to vercel.com and sign in with GitHub.
2. **Add New → Project**, import the repo (or drag the folder onto the dashboard).
3. No framework, no build command — just deploy. You get a `*.vercel.app` URL.

## Customising the look
Almost everything lives in the `:root { ... }` block at the top of `style.css`:
change `--accent` to switch the signal colour, or the `--bg*` variables for the
background. Fonts are set with `--f-display`, `--f-body`, `--f-mono`.

## Notes
- The contact form opens the visitor's email app pre-filled (no server needed).
- Verify your exact B.Tech graduation year in `index.html` (Education section) before publishing.
