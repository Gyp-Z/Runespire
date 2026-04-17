# Runespire

**Hytale server website for MAC's Runespire server.**

> This is a standalone project — codebase lives at `scratch/runespire/`. It is referenced in Jarvis (`CLAUDE.md` and memory) so Jarvis can assist, but it is **not** inside the Jarvis repo.

---

## Project Overview

| Field | Details |
|-------|---------|
| **Client** | MAC (Zach's friend) |
| **Domain** | runespire.net |
| **Server IP** | 66.45.235.138 |
| **Design ref** | [wynncraft.com](https://wynncraft.com/) — dark fantasy MMO aesthetic |
| **Stack** | Static HTML + CSS + vanilla JS (Phase 1-2); potential Next.js (Phase 3) |
| **Hosting** | Vercel (free tier) |
| **Email capture** | Formspree (free tier, 50 submissions/month) |
| **Dev** | Zachary Jones |
| **Note** | MAC is non-technical — Zach handles all deploys, DNS, and hosting |

---

## Phases

| Phase | Description | Status |
|-------|-------------|--------|
| **1** | Coming Soon page — animated background, email capture, server IP badge, Discord CTA | ✅ Complete — live on Vercel (dev branch), pending DNS switch from GoDaddy |
| **2** | Full Wynncraft-style one-pager — hero, features/world, community, news, store teaser, footer | This Weekend |
| **3** | Full fledged site — multiple pages, CMS, store, player stats, scalable + secure | Ongoing |

---

## File Structure

```
runespire/
├── index.html          ← main page (Coming Soon)
├── css/
│   └── styles.css      ← all styles (dark fantasy design system)
├── js/
│   └── main.js         ← particles, IP copy-to-clipboard, form submit
├── assets/
│   ├── images/         ← placeholder art (swap with MAC's assets in Phase 2)
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
# From the runespire directory
python -m http.server 3000
# Open http://localhost:3000
```

### Formspree (email capture)
1. Go to [formspree.io](https://formspree.io) — sign in with Gmail, free
2. Create a new form → copy the form ID (looks like `xpwzabcd`)
3. In `index.html`, replace `YOUR_FORM_ID`:
```html
action="https://formspree.io/f/xpwzabcd"
```

### Deploy to Vercel
```bash
# Install Vercel CLI if needed
npm i -g vercel

# Deploy from project root
vercel --prod
```
- Vercel is free for static sites (hobby tier)
- After first deploy, subsequent updates: `vercel --prod` from the project dir
- Point runespire.net → Vercel: add domain in Vercel dashboard, update DNS at MAC's registrar (Zach handles this for MAC)

---

## Content Placeholders (Waiting on MAC)

These are placeholder values in the current build. Swap them when MAC provides:

| Placeholder | Location | Status |
|-------------|----------|--------|
| Tagline | `index.html` | "A New Adventure Awaits" — swap when MAC provides |
| Discord link | `index.html` | ✅ `discord.gg/z5cxKymK` — may expire, get permanent link from MAC |
| Formspree ID | `index.html` | ✅ `mzdyejod` — wired in |
| Copyright year | `index.html` footer | ✅ 2026 |
| Hero background | CSS gradient | Swap when MAC provides proper wide banner art |
| Logo/icon | Discord CDN URL | ✅ Circular icon wired in; R shield logo → save to `assets/images/logo.png` when ready |

---

## Phase 2 Expansion Plan (This Weekend)

Expanding the Coming Soon page into a full Wynncraft-style landing page:

1. **Nav bar** — fixed/sticky, links: Home | Play | Classes | Quests | Community | Store
2. **Hero** — full-viewport, cinematic background, server IP, player count, CTA
3. **Features/World** — 3-column card grid (classes, quests, PvP — content from MAC)
4. **Latest News** — 2-3 update cards
5. **Community** — Discord CTA section, member count
6. **Store teaser** — "Coming Soon" or basic tier cards (if MAC wants it)
7. **Footer** — logo, links, socials, legal disclaimer

---

## Phase 3 Considerations (Scalable & Secure)

- Migrate to Next.js for SEO, routing, and scalability
- CMS integration (Contentful or Sanity) so MAC can post news without touching code
- Secure form handling (move off Formspree to own backend if volume grows)
- Player stats / leaderboard API integration
- Store integration (Tebex is standard for Minecraft/Hytale servers)
- HTTPS enforced via Vercel (automatic on custom domain)
- Rate limiting on any API routes

---

## Notes for Jarvis

- **When asked to work on Runespire**: open files in `scratch/runespire/`, not inside the Jarvis repo
- **MAC's requests come through Zach** — MAC doesn't interact with the codebase directly
- **Log decisions** in Jarvis `decisions/log.md` for anything architectural
- **Design inspiration**: wynncraft.com — always reference that aesthetic when adding new sections
- **Phase 2 starts this weekend** — expect Zach to provide MAC's content (tagline, Discord, logo) before starting
