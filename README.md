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
| **Store** | Tebex (planned — not yet configured) |
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
- **Hardcore SMP launch banner (hero)** — a pill-shaped launch callout below the hero CTAs announcing **"Hardcore SMP — Launching Saturday at 12:00 PM EST"**, styled **gold** to blend with the hero, but with a **red shine sweep**, red pulse dot, and a glow that breathes gold→red (red intent without breaking the gold palette). Hover lift + chevron. Clicking it smooth-scrolls to the **countdown section**.
- **Hardcore countdown section (`#hardcore`)** — first section under the hero. Edge-blended red/purple **war-drum atmosphere** (no hard borders): an animated `::before` layer with a heartbeat (lub-dub) pulse over a purple undertone, fading into the hero above and About below. Intensity is **scroll-driven** via a `--heat` CSS var (`initHardcoreHeat` in main.js) that swells the red glow as the section fills the viewport. Contains the live countdown (DAYS/HOURS/MINUTES/SECONDS) to **2026-06-14 12:00 PM EST**, animated progress bar (June 1 → launch), pulsing seconds block, "THE LAST SERVER STANDING" teaser card with skull watermark and a red Discord button. At zero, `js/launch-event.js` switches the site to launched mode (see Jarvis Sync).
- **About section** — four cards: *The Server*, *Connect* (IP badge + Discord + YouTube-soon), *Reference Worlds*, and **Hardcore SMP**.
- **Hardcore SMP about card** — 💀 card (id `#hardcore-smp`) explaining the mode: *"No second chances. Runespire's Hardcore SMP features a 24-hour death ban — if you die, you're out for a full day. Ranks are available but won't save you. Skill is the only currency that matters."* The about grid was changed from 3 to 4 columns (2×2) so the new card balances.
- **Key art showcase** — full-bleed banner between About and Store using `img/runespire-keyart.jpg`, with a scroll-driven "purple cavern opening" reveal whose wall gradients blend into the neighboring section backgrounds.
- **Store / Ranks** — seven rank tiers, lowest → highest: **Default** (free baseline — dashed card, "Free", no buy button, "Everyone starts here"), **Traveler**, **Explorer**, **Guardian**, **Overlord**, **Celestial**, and **RuneKeeper** (top tier — gold "LEGENDARY" featured card with pulsing badge). Each tier lists: a custom in-game tag (all paid tiers), a **deathban** time that shrinks with rank (Default 24h → Traveler 21h → Explorer 18h → Guardian 15h → Overlord 12h → Celestial 9h → RuneKeeper 6h), **homes** (1/2/3/4/5/7/10), and **market slots** (3/4/5/7/9/12/15). No prices shown — paid tiers read **"Available on Store Launch"** pending Tebex. Grid renders 3-3-1 with RuneKeeper centered on desktop, collapses responsively (2-wide tablet, stacked mobile). Each tier badge has its own accent color + hover glow.
- **Events** — a featured, gold-highlighted **Hardcore SMP Launch** card (full-width top row, pulsing "Launching" chip, "Saturday · 12:00 PM EST") above three Coming Soon event cards.
- **One-page site** — the Explore page's content was merged into the homepage: **The Hub** (`#servers`: SMP / Kitmap / MMO cards — "Factions" renamed to "SMP" per Darth), **Roadmap** (`#roadmap`), and the **SMP Map** (`#map`). The **Kits section was removed** per Darth (markup survives in the unlinked `explore.html`). Nav/footer use section anchors; `explore.html` still exists but is unlinked.
- **Live SMP map** (`#map`) — embeds `https://map.runespire.net` (DNS + Caddy reverse proxy on the game VM, set up by Darth). MMORPG-style presentation: gold corner-bracket frame, LIVE status toolbar with pulsing dot, "Open Full Map ↗" button, edge vignette, one-shot gold scan sweep on scroll-in.
- **Site-wide polish** — scroll-reveal fade-ins with staggered cards, ambient drifting color orbs per section, icon pop on card hover, light-sweep on buttons, all gated behind `prefers-reduced-motion`.

---

## Latest Changes

Most recent updates (per MAC's requests):

- **Launch time corrected** to **Saturday at 12:00 PM EST** (was Friday 7:00 PM) — hero banner text and aria-label both updated.
- **Store reworked to 7 ranks** — Default (free) → Traveler → Explorer → Guardian → Overlord → Celestial → RuneKeeper, each with a deathban time, homes, and market slots (see What's Built above). Prices hidden ("Available on Store Launch") until Tebex is configured.
- **Explore map swapped** — the old reference/"World Map" section was removed and replaced with a dedicated **SMP Map** section pointing at `map.runespire.net` (placeholder until DNS is live).
- **Local-dev fix** — added `serve.json` (`cleanUrls: true`); `npx serve` now mirrors Vercel's clean URLs locally (opening files via `file://` was 404-ing on the `/explore` link).
- **Hardcore SMP Launch added to Events** — featured gold card at the top of the Events grid (full-width row, pulsing "Launching" chip, status "Saturday · 12:00 PM EST"), above the three Coming Soon cards. Remember to update/retire it alongside the hero banner post-launch.
- **Rank colors synced to in-game chat colors** (per Darth/MAC's friend): Traveler #6BCB77, Explorer #3DD9D6, Guardian #4D7CFE, Overlord #D94A4A, Celestial #F5C451, RuneKeeper gradient #9D4EDD→#FF51D1 (gradient text + matching card accents).
- **"Buy a Life" store placeholder** (MAC request) — crimson banner-card below the rank grid: buy your life back to skip the death ban. Shows "Available on Store Launch"; wire up via Tebex alongside the ranks.

Earlier this cycle (already live): Hardcore SMP hero banner + 💀 about card (24-hour death ban explainer), the key art showcase with the scroll-driven purple cavern reveal, a full site-wide animation/polish pass, clean URLs (`/explore`, bare `/`), and scroll-synced section hashes (`/#about`, `/#store`, `/#events`) that clear at the top.

---

## Priority Action Items (with MAC)

1. **Tebex setup** — get the store configured **with MAC** so the seven rank tiers (Default → RuneKeeper) and the **Buy a Life** item can actually be purchased. Paid tiers currently show "Available on Store Launch"; Tebex is the standard processor for Hytale/Minecraft servers and handles payments + instant rank delivery.
2. ~~SMP map (GoDaddy)~~ — **RESOLVED 2026-06-12**: Darth added the `map` A record and ran Caddy on the game VM; `https://map.runespire.net` is live and embedded on the homepage.

---

## Open Questions / Deploy Notes

- **Post-launch cleanup (after Sat 12:00 PM EST)** — the countdown section flips itself to "THE HARDCORE SMP IS LIVE" automatically, but the **hero callout** and the **Events launch card** still say "Launching Saturday…" and need a manual update/retire once live.
- **Discord link mismatch** — the hero CTA + nav link to `discord.gg/2XmKXSfn` while the About/footer/hardcore-card links use `discord.gg/47PJvtFb`. Confirm which invite is canonical and unify.
- **MAC's YouTube** — the Connect card's YouTube link is still a `#` placeholder pending MAC's channel URL (see comment in `index.html`).

> Resolved: launch timezone (Saturday 12:00 PM EST shown); local dev clean-URL 404 (`serve.json`); SMP map DNS/HTTPS (Darth, 2026-06-12 — live at `https://map.runespire.net` and embedded on the homepage).

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
- Secure form/backend handling if a contact or signup form is reintroduced (email capture was removed in Phase 2)
- Player stats / leaderboard API integration
- Store integration via Tebex (standard for Hytale/Minecraft servers)
- HTTPS enforced via Vercel (automatic on custom domain)
- Rate limiting on any API routes

---

## Jarvis Sync

> Status briefing for **Jarvis** (Zach's AI assistant). Last updated **2026-06-12**. All work ships via the `dev` → `main` → Vercel auto-deploy flow; pushing `main` triggers production.

### Update — 2026-06-12 (launch eve)

1. **Site is now one page.** Explore content merged into the homepage (`#servers` The Hub, `#roadmap`, `#map`); nav/footer use anchors; `explore.html` exists but is unlinked. **Kits section removed** and **Factions renamed to SMP** (Darth's requests).
2. **SMP map is LIVE** — Darth added GoDaddy DNS (`map` → `66.45.235.138`) and a Caddy reverse proxy with auto-TLS on the game VM. Homepage embeds `https://map.runespire.net` in an MMORPG-style frame (gold corner brackets, LIVE toolbar, scan-sweep reveal). CSP `frame-src` allows it.
3. **Hardcore SMP countdown + launch event system** (`#hardcore` section + `js/launch-event.js`) — crimson section under the hero counting down to **2026-06-14T12:00:00-04:00**. At zero (page open): timer swaps to a pulsing "⚔ THE HARDCORE SMP IS LIVE — JOIN NOW ⚔" banner, one-time rune flash, fire/ember canvas overlay ramps in, `body.launched` warms the palette and reddens nav/title glow, ambient particles gain fire tones. State persists in `localStorage('runespire_launched')`; post-launch visitors get everything except the rune flash. Reduced-motion users get the banner/palette only.
4. **Rank colors synced to in-game chat colors** (from Darth): Traveler #6BCB77, Explorer #3DD9D6, Guardian #4D7CFE, Overlord #D94A4A, Celestial #F5C451, RuneKeeper #9D4EDD→#FF51D1 gradient (gradient text + matching featured-card accents).
5. **"Buy a Life" store placeholder** (MAC) — crimson banner-card under the rank grid; needs Tebex wiring.
6. **Hero launch callout** retargeted to scroll to `#hardcore`; the **Hardcore nav pill is now first** in nav and footer.
7. **Mobile pass** — hamburger menu breakpoint moved 640→900px (8 nav links overflowed inline on tablets), countdown becomes an even 2×2 grid with resized numerals on phones, tighter map frame, smaller corner brackets.
8. **Favicon** added (self-hosted crest, both pages) + `serve.json` for local clean-URL preview (`npx serve`).
9. **Seamless hardcore atmosphere (final pass)** — callout reverted from solid red to **gold with a red shine sweep** + gold→red breathing glow (red intent, gold palette). The `#hardcore` section's hard crimson block was replaced with an **edge-blended, heartbeat-animated red/purple atmosphere** whose intensity is **scroll-driven** (`--heat` var via `initHardcoreHeat`), so scrolling from hero → countdown → About reads as one continuous heat swell rather than discrete colored blocks. The **Hardcore nav pill remains red** (intentional wayfinding marker).

**Still pending:** Tebex (ranks + Buy a Life purchasable); Discord invite mismatch (`2XmKXSfn` nav/hero vs `47PJvtFb` elsewhere); MAC's YouTube URL; post-launch manual cleanup (hero callout text + Events launch card after Saturday).

### What changed most recently (MAC's Discord requests)

1. **Launch time corrected** — the hero banner now reads **"Hardcore SMP — Launching Saturday at 12:00 PM EST"** (previously Friday 7:00 PM). The `#launchCallout` text and its aria-label were both updated. *Why:* MAC moved the launch from Friday evening to Saturday midday and specified the EST timezone.
2. **Store rebuilt to 7 ranks** (lowest → highest): **Default** (free baseline — dashed card, "Free", no buy button, "Everyone starts here"), **Traveler**, **Explorer**, **Guardian**, **Overlord**, **Celestial**, and **RuneKeeper** (top tier — gold "LEGENDARY" featured card). Perks per tier — custom in-game tag (all paid tiers); **deathban**: Default 24h, Traveler 21h, Explorer 18h, Guardian 15h, Overlord 12h, Celestial 9h, RuneKeeper 6h; **homes**: 1/2/3/4/5/7/10; **market slots**: 3/4/5/7/9/12/15. No prices are shown — paid tiers read **"Available on Store Launch"** until Tebex is set up. Grid renders 3-3-1 (RuneKeeper centered) on desktop and collapses responsively. *Why:* MAC supplied the finalized rank list, perks, and tier order; the old placeholder tiers (Explorer→Ascendant, with dollar prices) were replaced wholesale.
3. **Explore map swapped** — the old reference/"World Map" section was removed and replaced with a dedicated **SMP Map** section (`#smp-map`, titled "SMP Map"). It currently shows an "SMP Map — Coming Soon" placeholder; a `map.runespire.net` iframe is staged in an HTML comment, ready to enable once DNS exists. *Why:* MAC wants the live SMP world map embedded here.
4. **Local-dev fix** — added `serve.json` (`cleanUrls: true`) and updated the README's "View locally" steps so `npx serve` mirrors Vercel's clean URLs. *Why:* opening the files via `file://` threw `ERR_FILE_NOT_FOUND` on the `/explore` link, since clean URLs need a server.

### Earlier this cycle (already live)

Hardcore SMP hero banner (`#launchCallout` — pulsing dot, gold sheen, hover lift; click-scrolls to the about card with a gold flash) and the 💀 Hardcore SMP about card (`#hardcore-smp`, 24-hour death ban explainer; about grid rebalanced to 2×2). Key art showcase banner (`img/runespire-keyart.jpg`) between About and Store with a scroll-driven purple "cavern opening" reveal. A site-wide animation/polish pass (IntersectionObserver scroll reveals with staggered cards, ambient drifting color orbs, hover glows on cards/rank tiers, icon pops, button light-sweeps — all `prefers-reduced-motion`-safe). Clean URLs (`/explore`, bare `/`) via `vercel.json`. Scroll-synced section hashes (`/#about`, `/#store`, `/#events`) that clear to bare `/` at the hero; logo click scrolls to top without stamping `#hero`.

### Blocked / pending (all need MAC)

- **Tebex** — store can't take payments until configured with MAC; every paid rank shows "Available on Store Launch."
- **GoDaddy / DNS** — `map.runespire.net` does not resolve yet (verified: no DNS record exists). Need MAC's GoDaddy login to create the subdomain before the SMP Map iframe can go live.
- **Discord link mismatch** — hero CTA → `discord.gg/2XmKXSfn`; About card + footer → `discord.gg/47PJvtFb`. Need MAC to confirm the canonical invite so they can be unified.
- **MAC's YouTube URL** — the Connect card's YouTube link is still a `#` placeholder.
- **Post-launch banner plan** — undecided whether the hero launch banner is removed or switched to "Live now / Join" after the Saturday 12:00 PM EST launch.

### Next steps

1. Get the canonical **Discord invite** and **YouTube URL** from MAC; unify the Discord links and fill the YouTube placeholder (quick wins, unblocks two items).
2. With MAC: stand up **Tebex**, then wire purchase links into the 7 rank cards (replacing the "Available on Store Launch" buttons).
3. With MAC's **GoDaddy** access: create the `map.runespire.net` DNS record, then enable the SMP Map iframe — switch its `src` from `http://` to `https://` and add a `frame-src` allowance to the `vercel.json` CSP, or the embed will be blocked.
4. **After Saturday's launch:** update or retire the hero launch banner per the decision above.

### Open questions

- Which Discord invite (`2XmKXSfn` vs `47PJvtFb`) is canonical?
- Will the SMP map be Dynmap or another provider? (affects the embed URL/params and CSP entry)
- Should the launch banner auto-expire after Saturday, or will Zach swap it manually?

### Notes / gotchas

- **Emoji encoding:** never bulk-edit the HTML with PowerShell `Get-Content`/`Set-Content` — it double-encodes UTF-8 emoji into mojibake (💀 → `ðŸ’€`). Use the editor or `sed`. (Happened once; reverted and fixed byte-safely at commit `4cf54b1`.)
- **Stale docs cleaned:** the email-capture/Formspree references were removed/corrected this pass (the signup section was deleted earlier, commit `8148e68`). Phase 1's table row still lists "email capture" as a historical record of what that phase shipped.
