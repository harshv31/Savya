// Curated, verified luxury furniture & interior photography (Unsplash).
// Centralised so imagery stays consistent across the editorial experience.

// On GitHub Pages the site is served from a sub-path (/Savya). next/image does
// not prepend basePath to unoptimised image src, so we apply it here for local
// public files. Empty for local dev / normal builds.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function img(id: string, w = 1600, q = 80): string {
  // Absolute URLs pass through untouched.
  if (id.startsWith('http')) return id;
  // Local public files (e.g. "/products/sage/01.webp") get the base path.
  if (id.startsWith('/')) return `${BASE_PATH}${id}`;
  // Otherwise treat the value as an Unsplash photo id and build a sized URL.
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;
}

export const IMAGES = {
  heroLiving: '1586023492125-27b2c045efd7',
  heroAlt: '1618220179428-22790b461013',

  livingRoom: '1567016432779-094069958ea5',
  diningRoom: '1617104551722-3b2d51366400',
  bedroom: '1505691938895-1758d7feb511',
  outdoor: '1600210492493-0946911123ea',
  lighting: '1513506003901-1e6a229e2d15',
  decor: '1522708323590-d24dbb6b0267',

  story: '1524758631624-e2822e304c36',
  craft: '1556909114-f6e7ad7d3136',
  atelier: '1567538096630-e0c55bd6374c',

  sofa1: '1493663284031-b7e3aefcae8e',
  sofa2: '1555041469-a586c61ea9bc',
  chair1: '1567225557594-88d73e55f2cb',
  chair2: '1598300042247-d088f8ab3a91',
  table1: '1611486212557-88be5ff6f941',
  bed1: '1505693416388-ac5ce068fe85',
  bed2: '1540574163026-643ea20ade25',
  lamp1: '1567899378494-47b22a2ae96a',
  decor1: '1616486338812-3dadae4b4ace',
  credenza: '1631679706909-1844bbd07221',

  insp1: '1538688525198-9b88f6f53126',
  insp2: '1571508601891-ca5e7a713859',
  insp3: '1532372320572-cda25653a26d',
  insp4: '1513506003901-1e6a229e2d15',
  insp5: '1493857671505-72967e2e2760',
  insp6: '1604578762246-41134e37f9cc',
  insp7: '1583847268964-b28dc8f51f92',
  insp8: '1594026112284-02bb6f3352fe',

  journal1: '1600607687939-ce8a6c25118c',
  journal2: '1600566753086-00f18fb6b3ea',
  journal3: '1556702571-3e11dd2b1a92',

  consultation: '1503602642458-232111445657',
  projects: '1449247709967-d4461a6a6103',
  fabricFlat: '1542728928-1413d1894ed1',
};
