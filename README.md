# Buoyant Psyche

A calm, conversion-focused single-page website for a psychology private practice. Hosted on GitHub Pages.

## Structure

```
├── index.html      # Single-page site (all sections)
├── styles.css      # Design system + components
├── main.js         # Mobile nav + FAQ accordion
├── favicon.svg
├── robots.txt
└── sitemap.xml
```

## Before launch

1. Replace the Google Form URL in `index.html` (search for `1FAIpQLSc-placeholder`)
2. Replace placeholder contact details (email, phone, city, license)
3. Replace `assets/images/shruti-headshot.svg` with a professional WebP/JPG photo
4. Export `assets/images/og-image.png` (1200×630) from the SVG or create a branded version
5. Add `apple-touch-icon.png` (180×180) to `assets/images/`
6. Update `sitemap.xml` and meta tags with your live domain

See [CONTENT.md](CONTENT.md) for the full placeholder checklist.

## Local preview

Open `index.html` in a browser, or run a local server:

```bash
python3 -m http.server 8080
```

Then visit http://localhost:8080

## GitHub Pages

1. Push this repo to GitHub
2. Settings → Pages → Source: `main` branch, `/ (root)`
3. Optional: add `CNAME` file for custom domain (e.g. `buoyantpsyche.com`)
4. Enable "Enforce HTTPS"

## Design system

All visual tokens (colors, typography, spacing, components) are defined in `styles.css` under `:root`. Refer to the project plan for the full design specification.

