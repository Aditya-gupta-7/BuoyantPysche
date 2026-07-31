# Launch QA Report — Buoyant Psyche MVP

Date: 2026-07-31

## Automated checks (passed)

- [x] All core assets return HTTP 200 (`index.html`, `styles.css`, `main.js`, images, favicon)
- [x] JavaScript syntax valid (`node --check main.js`)
- [x] All anchor nav targets exist (`#about`, `#services`, `#faq`)
- [x] All section IDs present (hero, recognize, about, credentials, services, journey, faq, book)
- [x] 8 Book a Session links with `target="_blank"` and `rel="noopener noreferrer"`
- [x] Skip link, semantic landmarks, ARIA on accordion
- [x] `robots.txt`, `sitemap.xml`, favicon, meta/OG tags, JSON-LD present
- [x] Git repository initialized with initial commit

## Manual steps before go-live

- [ ] Replace Google Form placeholder URL in `index.html`
- [ ] Replace therapist headshot SVG with professional photo
- [ ] Export `og-image.png` (1200×630) for best social preview compatibility
- [ ] Test Google Form submission end-to-end
- [ ] Run Lighthouse in Chrome DevTools (target: A11y 95+, SEO 90+)
- [ ] Test on iPhone Safari
- [ ] Create Google Business Profile with matching NAP
- [ ] Push to GitHub and enable Pages (see README.md)

## Deploy commands

```bash
# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/BuoyantPysche.git
git push -u origin main

# GitHub → Settings → Pages → Source: main / root → Save
```

## Placeholder content note

Contact details, credentials, and form URL are placeholders. Update per CONTENT.md before accepting real client inquiries.
