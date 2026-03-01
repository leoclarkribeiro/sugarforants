# Sugar for Ants — Psyjazz Project

A modern, atmospheric single-page website for the Sugar for Ants electronic music project.

## Preview

Open `index.html` in your browser or run a local server:

```bash
npx serve .
# or
python -m http.server 8000
```

## Adding Your Logo

1. Place your logo image in the project (e.g. `logo.png`)
2. In `index.html`, uncomment the logo line and comment out the text fallback:

```html
<div class="logo-container">
  <img src="logo.png" alt="Sugar for Ants" class="logo">
  <!-- <h1 class="logo-text">...</h1> -->
</div>
```

## Deploy

Static files—upload `index.html`, `styles.css`, `script.js` (and `logo.png` if used) to any web host. Works with GitHub Pages, Netlify, Vercel, etc.
