# Runespire

**Official website for the Runespire Hytale server.**

---

## Project Overview

| Field | Details |
|-------|---------|
| **Domain** | runespire.net |
| **Server IP** | play.runespire.net |
| **Design ref** | [wynncraft.com](https://wynncraft.com/) — dark fantasy MMO aesthetic |
| **Stack** | Static HTML + CSS + vanilla JS (Phase 1–2); potential Next.js (Phase 3) |
| **Hosting** | Vercel (free tier) |
| **Email capture** | Formspree (free tier, 50 submissions/month) |
| **Dev** | Zachary Jones |

---

## Phases

| Phase | Description | Status |
|-------|-------------|--------|
| **1** | Coming Soon page — animated background, email capture, server IP badge, Discord CTA | ✅ Complete |
| **2** | Full landing page — hero, features/world, community, news, store teaser, footer | ✅ Complete |
| **3** | Full fledged site — multiple pages, CMS, store, player stats, scalable + secure | Ongoing |

---

## File Structure

```
runespire/
├── index.html          ← main landing page
├── explore.html        ← explore/world page
├── css/
│   └── styles.css      ← all styles (dark fantasy design system)
├── js/
│   └── main.js         ← particles, IP copy-to-clipboard, form submit
├── assets/
│   ├── images/
│   └── icons/
└── README.md
```

---

## Design System

| Element | Value |
|---------|-------|
| Background | `#0a0a0f` near-black |
| Gold accent | `#c9a84c` |
| Purple accent | `#6b21a8` |
| Heading font | Cinzel (Google Fonts) |
| Body font | Inter |
| Buttons | Amber border, glow on hover |
| Animations | Floating crest, pulsing title glow, drifting particles (canvas) |

---

## Setup & Deploy

### View locally
```bash
python -m http.server 3000
# Open http://localhost:3000
```

### Formspree (email capture)
1. Go to [formspree.io](https://formspree.io) — sign in with Gmail, free
2. Create a new form → copy the form ID (e.g. `xpwzabcd`)
3. In `index.html`, replace the form ID:
```html
action="https://formspree.io/f/xpwzabcd"
```

### Deploy to Vercel
```bash
npm i -g vercel
vercel --prod
```
- Vercel is free for static sites (hobby tier)
- Point `runespire.net` → Vercel: add domain in Vercel dashboard, update DNS at your registrar

---

## Phase 3 Considerations

- Migrate to Next.js for SEO, routing, and scalability
- CMS integration (Contentful or Sanity) for news/content management
- Secure form handling (move off Formspree to own backend if volume grows)
- Player stats / leaderboard API integration
- Store integration via Tebex (standard for Hytale/Minecraft servers)
- HTTPS enforced via Vercel (automatic on custom domain)
- Rate limiting on any API routes
