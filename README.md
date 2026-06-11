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

## What's Built (Phase 2)

- **Hero** — animated crest, particle canvas, glowing title, server IP copy-badge, View Ranks + Discord CTAs.
- **Hardcore SMP launch banner (hero)** — a pill-shaped launch callout below the hero CTAs announcing **"Hardcore SMP — Launching Friday at 7:00 PM"**. Pulsing status dot, periodic gold sheen sweep, hover lift, and a chevron hint. Clicking it smooth-scrolls to the Hardcore SMP about card and flashes it gold. Styled to match the hero's outlined-gold / Cinzel design language.
- **About section** — four cards: *The Server*, *Connect* (IP badge + Discord + YouTube-soon), *Reference Worlds*, and **Hardcore SMP**.
- **Hardcore SMP about card** — 💀 card (id `#hardcore-smp`) explaining the mode: *"No second chances. Runespire's Hardcore SMP features a 24-hour death ban — if you die, you're out for a full day. Ranks are available but won't save you. Skill is the only currency that matters."* The about grid was changed from 3 to 4 columns (2×2) so the new card balances.
- **Key art showcase** — full-bleed banner between About and Store using `img/runespire-keyart.jpg`, with a scroll-driven "purple cavern opening" reveal whose wall gradients blend into the neighboring section backgrounds.
- **Store / Ranks** — six rank tiers (Explorer → Ascendant) with tier-colored hover glows; Tebex noted as "opening soon."
- **Events** — three Coming Soon event cards.
- **Site-wide polish** — scroll-reveal fade-ins with staggered cards, ambient drifting color orbs per section, icon pop on card hover, light-sweep on buttons, all gated behind `prefers-reduced-motion`.

---

## Latest Changes

This session added the **Hardcore SMP** promotion ahead of its launch:

- **Why:** Hardcore SMP is launching **Friday at 7:00 PM** and needed a prominent hype callout on the landing page plus a permanent explainer.
- **Hero launch banner** announcing the Friday 7:00 PM launch; click-through scrolls to the explainer card.
- **Hardcore SMP about card** documenting the **24-hour death ban** rule (die → banned for a full day; ranks don't save you; skill-only).
- **Supporting work:** key art banner + cavern reveal, a full site-wide animation/polish pass, the Explore-page world map swapped to a styled **"Coming Soon"** placeholder (Dynmap iframe commented out, ready to restore), **clean URLs** on Vercel (`/explore`, bare `/` for home), and scroll-synced URL hashes (`/#about`, `/#store`, `/#events`) that clear at the top.

---

## Priority Action Items (with MAC)

The real near-term Phase 2 work is unblocking two integrations that both depend on MAC:

1. **Tebex setup** — get the store configured **with MAC** so the six rank tiers (Explorer → Ascendant) can actually be purchased. The Store section currently shows "opening soon"; Tebex is the standard processor for Hytale/Minecraft servers and handles payments + instant rank delivery.
2. **SMP world map (GoDaddy)** — ask MAC for the **GoDaddy login** so the `map.runespire.net` subdomain / DNS can be set up properly and the live Dynmap can be wired into the Explore page (currently a "Coming Soon" placeholder with the iframe commented out).

---

## Open Questions / Deploy Notes

- **Launch timezone** — the banner says "Friday at 7:00 PM" with no timezone. Confirm the intended zone (EST/local) and whether to display it.
- **Banner lifecycle** — decide whether the hero launch banner is removed (or changed to "Live now / Join") **after** Friday's launch, so it doesn't sit stale.
- **Discord link mismatch** — the hero CTA links to `discord.gg/2XmKXSfn` while the About/footer links use `discord.gg/47PJvtFb`. Confirm which invite is canonical and unify.
- **World map** — Explore page currently shows a "Coming Soon" placeholder; the live Dynmap iframe (`map.runespire.net`) is commented out in `explore.html`, ready to re-enable when the map is live.
- **MAC's YouTube** — the Connect card's YouTube link is still a `#` placeholder pending MAC's channel URL (see comment in `index.html`).

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
npx serve
# Open the printed http://localhost:3000 URL
```
> **Note:** don't open the `.html` files directly (`file://`) and don't use `python -m http.server` — the site uses clean URLs (`/explore` instead of `explore.html`), which need a server that supports them. `npx serve` reads `serve.json` and matches Vercel's behavior exactly.

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

---

## Jarvis Sync

**Session summary (2026-06-11).** This session focused on promoting the **Hardcore SMP** launch and a broad visual polish pass, all shipped to production via the dev → main → Vercel flow (commits `5a6dde0` through `d9bb3a9`).

**What was added:**
1. **Hardcore SMP launch banner** in the hero (`#launchCallout`) announcing "Launching Friday at 7:00 PM," with a pulsing dot, gold sheen, hover lift, and click-to-scroll that flashes the target card gold.
2. **Hardcore SMP about card** (`#hardcore-smp`, 💀) describing the 24-hour death ban; about grid rebalanced to 2×2.
3. **Key art showcase banner** (`img/runespire-keyart.jpg`) between About and Store, with a scroll-driven purple "cavern opening" reveal tuned to blend into adjacent section backgrounds (timing slowed/delayed after first pass so the reveal is fully visible).
4. **Site-wide life pass** — IntersectionObserver scroll reveals with staggered cards, ambient drifting color orbs, hover-glow on cards/rank tiers, icon pops, button light-sweeps; `prefers-reduced-motion` respected throughout.
5. **Explore world map → "Coming Soon"** placeholder (live Dynmap iframe commented out for easy restore).
6. **Clean URLs** via `vercel.json` (`cleanUrls: true`): `/explore` and bare `/`; internal links rewritten.
7. **Scroll-synced URL hash** — `/#about`/`/#store`/`/#events` update as sections enter the viewport via `history.replaceState`; hash clears to bare `/` at the hero, and clicking the logo scrolls to top without stamping `#hero`.

**What was requested:** the hero launch banner + about card (core ask); making the banner interactive (scroll + highlight on click); adding the provided key art and the cavern-open effect; matching the banner's fonts/colors to the rest of the hero (the solid-gold chip was toned down to an outlined chip); the map "Coming Soon"; and clean URLs without `.html`/`#hero` showing. **Pending from MAC:** the YouTube channel URL for the Connect card (still a `#` placeholder).

**Incident:** a PowerShell `Get-Content`/`Set-Content` find-replace double-encoded the UTF-8 emoji icons into mojibake (💀 → `ðŸ’€`) at commit `eb1b018`; reverted and redone byte-safely with `sed` at `4cf54b1`. A memory note was saved to use Edit/`sed` (never PS Get/Set-Content) for bulk edits on these emoji-heavy files.

**Next steps (real Phase 2 priorities, both need MAC):** (A) **Tebex setup with MAC** so the rank tiers are actually purchasable; (B) **get MAC's GoDaddy login** to set up the `map.runespire.net` DNS/subdomain and wire the live SMP Dynmap into Explore (currently a "Coming Soon" placeholder). See **Priority Action Items** above.

**Smaller open items:** (1) confirm the launch **timezone** and whether to show it; (2) decide the **post-Friday lifecycle** of the hero banner (remove vs. switch to "Live now"); (3) unify the **mismatched Discord invites** (`2XmKXSfn` in hero vs. `47PJvtFb` in About/footer); (4) drop in **MAC's YouTube URL**. Note: the README's "Email capture / Formspree" references predate this session and are now stale — the email signup section was removed in commit `8148e68` (left unedited here per scope).
