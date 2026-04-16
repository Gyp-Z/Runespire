# Runespire

**Hytale server website for MAC's Runespire server.**

**Domain:** runespire.net  
**Server IP:** 66.45.235.138  
**Status:** Phase 1 — Coming Soon page (live on Vercel)

---

## Phases

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | Coming Soon page — email capture, server IP, Discord CTA | In Progress |
| 2 | Full Wynncraft-style one-pager — hero, features, community, news | This Weekend |
| 3 | Full site — pages, CMS, store, player stats, scalable | Ongoing |

## Tech Stack

- Static HTML + CSS + vanilla JS (Phase 1-2)
- Formspree for email capture
- Vercel for hosting
- Next.js potential migration for Phase 3

## Notes

- MAC is non-technical — Zach handles all deployment and DNS
- Domain DNS → Vercel: Zach manages this on MAC's behalf
- Design inspiration: wynncraft.com (dark fantasy MMO aesthetic)
- Formspree form ID needs to be set before going live (see index.html)

## Contacts

- **Client:** MAC (Zach's friend)
- **Dev:** Zach Jones

## Deploy

```bash
# Local dev
python -m http.server 3000

# Deploy to Vercel (from this directory)
vercel --prod
```
