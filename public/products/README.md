# Drop your real product photos here

Each product has its own folder below. **Drop image files into the matching
folder and they appear automatically** — no code changes needed. The site
rebuilds them into that product's editorial hero, gallery thumbnails, and every
card across the site (homepage, collections, related products).

## How it works

- Put files in `public/products/<product-slug>/`
- Supported: `.jpg` `.jpeg` `.png` `.webp` `.avif`
- Files are used in **alphabetical/numeric order**, so name them `01.jpg`,
  `02.jpg`, `03.jpg` … The **first image** becomes the hero + card image.
- If a folder is empty, the curated placeholder photography is shown instead, so
  the site never looks broken while you fill it in.

## Recommended specs

- Hero / first image: landscape or 4:5, at least **1600px** on the long edge
- High quality JPEG/WebP (Next.js optimises and serves AVIF/WebP automatically)

## Product folders (slug → page)

| Drop photos in…                | Product page                            |
| ------------------------------ | --------------------------------------- |
| `sage-boucle-lounge-chair/`    | /products/sage-boucle-lounge-chair      |
| `serpentine-boucle-sofa/`      | /products/serpentine-boucle-sofa        |
| `sphere-marble-side-table/`    | /products/sphere-marble-side-table      |
| `apex-pyramid-side-table/`     | /products/apex-pyramid-side-table       |
| `dune-two-tone-sideboard/`     | /products/dune-two-tone-sideboard       |

The first image (e.g. `01.webp`) is the hero. Add `02`, `03`, … for the gallery.
Higher-resolution files than the current Instagram exports will look crisper in
the full-screen hero — drop in larger versions any time to replace them.

## Adding a brand-new product from an Instagram post

1. Add an entry to `lib/data.ts` (copy an existing product block, change the
   `slug`, `name`, `price`, `story`, etc.).
2. Create a folder here matching the new `slug` and drop the photos in.

That's it — a new individual hero product page is generated at
`/products/<slug>`.
