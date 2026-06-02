<div align="center">

# SAVYA

### The Design of Life

A world-class, editorial e-commerce experience for **Savya** — handcrafted luxury
furniture and bespoke interiors. Built to feel like browsing an *Architectural
Digest* feature rather than a typical furniture store.

[Instagram → @savya_thedesignoflife](https://www.instagram.com/savya_thedesignoflife)

</div>

---

## ✦ Overview

Savya is a premium furniture brand focused on handcrafted pieces, bespoke
customization, artisan craftsmanship and timeless, sustainable design. This is
its marketing + commerce front end: a luxury-minimalist, editorial site with
large immersive photography, premium serif/sans typography and subtle, tasteful
motion.

**Design language:** soft beige, ivory, walnut, taupe and charcoal · Cormorant
Garamond headings · Jost body · generous white space · slow, cinematic reveals.

## ✦ Tech Stack

| | |
| --- | --- |
| Framework | **Next.js 15** (App Router, Server Components, SSG) |
| Language | **TypeScript** (strict) |
| Styling | **Tailwind CSS** v3 with a custom luxury design system |
| Motion | **Framer Motion** (scroll reveals, parallax, hero animations) |
| Icons | **lucide-react** |
| Fonts | `next/font` — Cormorant Garamond + Jost |
| Images | `next/image` (AVIF/WebP, local + remote) |

Mobile-first, responsive, SEO-optimised (per-page metadata, OpenGraph) and
Core-Web-Vitals conscious. Structured to be Shopify- and CMS-integration ready.

## ✦ Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev          # http://localhost:3000

# 3. Production build
npm run build
npm run start
```

Requires **Node 18.18+** (developed on Node 24).

## ✦ Project Structure

```
app/                      # App Router routes
  page.tsx                # Homepage (hero, collections, story, bestsellers, …)
  collections/            # Collections index + /collections/[slug]
  products/[slug]/        # Individual editorial hero product pages
  consultation/           # Design-consultation booking
  about/ journal/ projects/
  not-found.tsx           # Branded 404
  layout.tsx globals.css  # Root layout, fonts, design tokens
components/
  layout/                 # Navbar (mega menu + mobile drawer), Footer
  home/                   # Homepage sections
  product/                # ProductHero, ProductGallery, ProductConfigurator, …
  ui/                     # Reveal, RevealImage, Accordion, PageHeader
lib/
  data.ts                 # Collections, products, testimonials, journal
  images.ts               # Image helper + curated photography ids
  productImages.ts        # Auto-discovery of real product photos (build-time)
public/products/<slug>/   # Drop real product photos here (see its README)
```

## ✦ Managing the Catalog

Products live in [`lib/data.ts`](lib/data.ts). Each product generates its own
editorial hero page at `/products/<slug>`.

**Adding real product photos** — drop image files into
`public/products/<slug>/` (named `01.webp`, `02.webp`, …). They are
auto-discovered at build time and used across the hero, gallery and every
product card; the first image becomes the hero. See
[`public/products/README.md`](public/products/README.md).

**Adding a new product** — copy a block in `lib/data.ts`, change the `slug`,
`name`, `price`, `dimensions`, `story`, etc., then create a matching
`public/products/<slug>/` folder.

## ✦ Deployment

Optimised for **Vercel** (zero-config for Next.js):

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Add any environment variables from [`.env.example`](.env.example) (none are
   required for the static site to build).

Any Node host that runs `next build && next start` also works.

## ✦ Roadmap

Scaffolded UI / hooks ready for: Shopify Storefront checkout, headless-CMS
Journal, live consultation-form submissions, wishlist & cart persistence,
Instagram feed, AR / room-visualizer and product configurator.

## ✦ License

© Savya — The Design of Life. All rights reserved. This codebase is proprietary;
see [LICENSE](LICENSE).
