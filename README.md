# WOW Media website

Static multi-page website files for the refreshed WOW Media AI-first brand direction.

## Files

- `index.html` - Home page with hero, ecosystem strip, overview, proof, navigators and clients
- `services.html` - Services page
- `portfolio.html` - Portfolio and recent projects page
- `csr.html` - CSR page
- `contact.html` - Contact page
- `privacy-policy.html` - Privacy policy page
- `styles.css` - responsive dark technical theme
- `script.js` - mobile navigation, sticky header state and animated biometric signal

## Media slots

The page includes styled `.media-slot` placeholders for future images, video thumbnails, client logo artwork, portraits, CSR photos and map/location media. Replace a slot with an `<img>` or `<video>` inside the same container, or keep the class on the media wrapper to preserve sizing.

## Hero video

The Home hero is wired for a full-cover background video. Add one or both files:

- `media/wow-hero-bg.webm`
- `media/wow-hero-bg.mp4`

The video should be muted, loopable, dark/technical, and at least 1920px wide for desktop quality. Until the file is added, the animated signal canvas remains visible as the fallback visual.

## Run locally

Open `index.html` directly in a browser, or run:

```powershell
python -m http.server 5173
```

Then visit `http://localhost:5173`.
