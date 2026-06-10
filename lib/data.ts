import { IMAGES } from './images';

export type Collection = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  count: number;
};

export type Fabric = {
  name: string;
  hex: string;
  note: string;
};

export type Material = {
  name: string;
  note: string;
};

export type Product = {
  slug: string;
  name: string;
  collection: string;
  category: string;
  price: number;
  priceFrom?: boolean;
  badge?: string;
  bestseller?: boolean;
  newArrival?: boolean;
  /** Catalog filter facets */
  materialTags?: string[];
  colorTags?: { name: string; hex: string }[];
  images: string[];
  shortDescription: string;
  story: string;
  designerNote: string;
  fabrics: Fabric[];
  materials: Material[];
  dimensions: { label: string; value: string }[];
  sizes: string[];
  care: string[];
  leadTime: string;
};

export const collections: Collection[] = [
  {
    slug: 'living-room',
    name: 'Living Room',
    tagline: 'Sink-in sofas & sculptural seating',
    description:
      'Deep, hand-tied seating and sculptural occasional pieces composed for rooms made for lingering.',
    image: IMAGES.livingRoom,
    count: 48,
  },
  {
    slug: 'dining-room',
    name: 'Dining Room',
    tagline: 'Tables that hold a lifetime of gatherings',
    description:
      'Solid-timber dining tables, hand-finished and built to gather generations around them.',
    image: IMAGES.diningRoom,
    count: 32,
  },
  {
    slug: 'bedroom',
    name: 'Bedroom',
    tagline: 'Sanctuaries of rest & quiet luxury',
    description:
      'Upholstered beds and bedside companions designed to soften the close of every day.',
    image: IMAGES.bedroom,
    count: 27,
  },
  {
    slug: 'office',
    name: 'Office',
    tagline: 'Desks & quiet focus',
    description:
      'Considered desks, seating and storage for rooms where work is done beautifully.',
    image: IMAGES.story,
    count: 0,
  },
  {
    slug: 'outdoor',
    name: 'Outdoor',
    tagline: 'Weathered elegance for open air',
    description:
      'All-season teak and performance textiles that age beautifully beneath the sky.',
    image: IMAGES.outdoor,
    count: 19,
  },
  {
    slug: 'lighting',
    name: 'Lighting',
    tagline: 'Hand-finished brass & blown glass',
    description:
      'Sculptural lighting in patinated brass and mouth-blown glass to warm every interior.',
    image: IMAGES.lighting,
    count: 24,
  },
  {
    slug: 'decor',
    name: 'Decor',
    tagline: 'The finishing, considered details',
    description:
      'Objects, textiles and vessels — the closing notes that make a house feel like yours.',
    image: IMAGES.decor,
    count: 56,
  },
];

const boucleFabrics: Fabric[] = [
  { name: 'Sage Bouclé', hex: '#9CA982', note: 'Soft, plush looped texture' },
  { name: 'Ivory Bouclé', hex: '#EFE9DD', note: 'Plush, looped texture' },
  { name: 'Oat Linen', hex: '#E3D9C6', note: 'Stonewashed, relaxed weave' },
  { name: 'Clay Velvet', hex: '#B08763', note: 'Cotton-blend, matte sheen' },
  { name: 'Fog Wool', hex: '#A9A89E', note: 'Dense, hard-wearing weave' },
  { name: 'Midnight Velvet', hex: '#33373F', note: 'Cotton-blend, matte sheen' },
];

const woodMaterials: Material[] = [
  { name: 'American Walnut', note: 'Kiln-dried, oil-finished solid timber' },
  { name: 'European Oak', note: 'Fumed & soaped for a soft matte grain' },
  { name: 'Blackened Ash', note: 'Hand-ebonised, low-sheen seal' },
];

// Real Savya pieces — photography from the brand's own studio & Instagram.
export const products: Product[] = [
  {
    slug: 'sage-boucle-lounge-chair',
    name: 'Sage Bouclé Lounge Chair',
    collection: 'living-room',
    category: 'Chairs',
    price: 1980,
    priceFrom: true,
    badge: 'Signature',
    bestseller: true,
    materialTags: ['Fabric', 'Wood'],
    colorTags: [
      { name: 'Sage Green', hex: '#9CA982' },
      { name: 'Walnut', hex: '#6A5440' },
    ],
    images: [
      '/products/sage-boucle-lounge-chair/01.webp',
      '/products/sage-boucle-lounge-chair/02.webp',
    ],
    shortDescription:
      'A sculptural, open-ring lounge chair in soft sage bouclé, paired with a matching fluted-base ottoman.',
    story:
      'The Sage Bouclé is an exercise in sculpture you can sink into. Its open, looping silhouette is built over a hand-shaped hardwood frame, wrapped in dense high-resilience foam, and upholstered entirely by hand in a plush bouclé the colour of garden sage. The seat and ottoman rest on hand-turned, fluted walnut plinths — a quiet nod to classical columns beneath an unmistakably modern form.',
    designerNote:
      'We wanted a chair that reads as art from across the room and feels like an embrace up close. The sage bouclé is our signature, but it is stunning in ivory or clay too.',
    fabrics: boucleFabrics,
    materials: woodMaterials,
    dimensions: [
      { label: 'Width', value: '33 in / 84 cm' },
      { label: 'Depth', value: '30 in / 76 cm' },
      { label: 'Height', value: '29 in / 74 cm' },
      { label: 'Ottoman', value: '17 in dia / 16 in H' },
    ],
    sizes: ['Chair + Ottoman', 'Chair Only'],
    care: [
      'Vacuum the bouclé gently with a soft brush head to lift dust.',
      'Blot spills immediately with a clean, dry white cloth — never rub.',
      'Wipe the walnut plinth with a dry, lint-free cloth.',
      'Keep out of prolonged direct sunlight to preserve the sage tone.',
    ],
    leadTime: '8–10 weeks, handmade to order',
  },
  {
    slug: 'serpentine-boucle-sofa',
    name: 'Serpentine Bouclé Sofa',
    collection: 'living-room',
    category: 'Sofas',
    price: 4250,
    priceFrom: true,
    badge: 'Signature',
    bestseller: true,
    materialTags: ['Fabric', 'Metal'],
    colorTags: [
      { name: 'Ivory', hex: '#EFE9DD' },
      { name: 'Brushed Gold', hex: '#A98E63' },
    ],
    images: ['/products/serpentine-boucle-sofa/01.webp'],
    shortDescription:
      'A free-flowing, curved sofa in premium ivory bouclé, floating on a brushed-gold metal base.',
    story:
      'The Serpentine takes its name from its single, uninterrupted curve — a sweeping silhouette designed to soften a room and invite conversation. Built on a kiln-dried hardwood frame and finished in a soft, textured ivory bouclé, it appears to float above a slender brushed-gold base. Fully customisable in length and fabric, it is as at home in a grand drawing room as a city apartment.',
    designerNote:
      'Place it floating in the room rather than against a wall — the Serpentine is designed to be seen in the round, its curve drawing the eye from every angle.',
    fabrics: boucleFabrics,
    materials: [
      { name: 'Brushed Gold Steel Base', note: 'Hand-finished, warm brushed lacquer' },
      { name: 'Hardwood Frame', note: 'Kiln-dried, hand-built' },
    ],
    dimensions: [
      { label: 'Length', value: '84 in / 213 cm' },
      { label: 'Depth', value: '36 in / 91 cm' },
      { label: 'Height', value: '30 in / 76 cm' },
      { label: 'Bespoke', value: 'Length customizable' },
    ],
    sizes: ['84 in — 3 Seat', 'Bespoke length'],
    care: [
      'Vacuum upholstery on low suction with a soft brush head.',
      'Treat spills immediately by blotting — never rub the weave.',
      'Buff the gold base with a dry microfibre cloth.',
      'Rotate and plump cushions weekly for even wear.',
    ],
    leadTime: '10–12 weeks, handmade to order',
  },
  {
    slug: 'sphere-marble-side-table',
    name: 'Sphere Marble Side Table',
    collection: 'living-room',
    category: 'Tables',
    price: 890,
    newArrival: true,
    badge: 'New',
    materialTags: ['Stone', 'Metal'],
    colorTags: [
      { name: 'Marble White', hex: '#F0EDE6' },
      { name: 'Brushed Gold', hex: '#A98E63' },
    ],
    images: ['/products/sphere-marble-side-table/01.webp'],
    shortDescription:
      'A round marble-topped side table balanced on a stacked-sphere base in antique gold.',
    story:
      'A study in contrast — cool, honed marble resting on a column of hand-gilded spheres. The Sphere slips effortlessly between styles: beside a velvet sofa it turns opulent, against pale linen it turns serene. Each marble top is cut from natural stone, so the veining is entirely its own.',
    designerNote:
      'One table, endless rooms. We styled it against deep green, warm beige and soft grey — it belonged in every one. Buy a pair and let them roam the house.',
    fabrics: [],
    materials: [
      { name: 'Italian Marble Top', note: 'Honed natural stone — veining unique to each' },
      { name: 'Antique Gold Base', note: 'Hand-applied gilt over stacked spheres' },
    ],
    dimensions: [
      { label: 'Diameter', value: '18 in / 45 cm' },
      { label: 'Height', value: '22 in / 56 cm' },
    ],
    sizes: ['One Size'],
    care: [
      'Use coasters — marble is porous and can mark with acids and oils.',
      'Wipe with a soft, barely-damp cloth and dry immediately.',
      'Buff the gold base gently with a dry microfibre cloth.',
    ],
    leadTime: '6–8 weeks, handmade to order',
  },
  {
    slug: 'apex-pyramid-side-table',
    name: 'Apex Pyramid Side Table',
    collection: 'living-room',
    category: 'Tables',
    price: 940,
    newArrival: true,
    badge: 'New',
    materialTags: ['Wood', 'Metal'],
    colorTags: [
      { name: 'Honey Wood', hex: '#B07A3F' },
      { name: 'Brushed Gold', hex: '#A98E63' },
    ],
    images: ['/products/apex-pyramid-side-table/01.webp'],
    shortDescription:
      'A sculptural inverted-pyramid table in warm wood, cradled by a brushed-brass X-frame.',
    story:
      'The Apex turns a side table into a sculpture. A solid wood vessel is hand-shaped into a crisp inverted pyramid, its warm grain catching the light, then cradled within a cross-braced brushed-brass frame that lifts it just off the floor. Architectural, precise, and quietly arresting.',
    designerNote:
      'It rewards a clean corner and good lighting — set it where the brass can catch a low evening lamp and the geometry can breathe.',
    fabrics: [],
    materials: [
      { name: 'Solid Wood Vessel', note: 'Hand-shaped inverted pyramid, oil-finished' },
      { name: 'Brushed Brass Frame', note: 'Cross-braced gilt steel' },
    ],
    dimensions: [
      { label: 'Width', value: '24 in / 60 cm' },
      { label: 'Depth', value: '20 in / 50 cm' },
      { label: 'Height', value: '22 in / 56 cm' },
    ],
    sizes: ['One Size'],
    care: [
      'Wipe the wood with a dry, lint-free cloth following the grain.',
      'Buff the brass frame with a dry microfibre cloth.',
      'Re-oil the timber every 12–18 months to maintain depth.',
    ],
    leadTime: '6–8 weeks, handmade to order',
  },
  {
    slug: 'dune-two-tone-sideboard',
    name: 'Dune Two-Tone Sideboard',
    collection: 'dining-room',
    category: 'Storage',
    price: 3680,
    priceFrom: true,
    badge: 'Artisan',
    bestseller: true,
    materialTags: ['Wood'],
    colorTags: [
      { name: 'Ivory', hex: '#EFE9DD' },
      { name: 'Walnut', hex: '#6A5440' },
    ],
    images: [
      '/products/dune-two-tone-sideboard/01.webp',
      '/products/dune-two-tone-sideboard/02.webp',
    ],
    shortDescription:
      'A four-door sideboard pairing ivory-lacquered fluting with sculpted walnut inlays.',
    story:
      'The Dune is where two materials meet and flow. Sweeping walnut inlays are hand-cut and book-matched across four doors, dissolving into vertical ivory fluting like a tide drawing back over sand. Built from solid timber on hand-turned tapered legs, with fully adjustable interior shelving, it is as composed in a hallway as it is in the dining room.',
    designerNote:
      'The curved walnut grain is laid out by hand across all four doors so the pattern reads as one continuous gesture. No two Dunes are ever quite identical.',
    fabrics: [],
    materials: [
      { name: 'American Walnut Inlay', note: 'Hand-cut, book-matched solid timber' },
      { name: 'Ivory Lacquer & Fluting', note: 'Hand-sanded reeded fronts' },
      { name: 'Solid Wood Legs', note: 'Hand-turned, tapered' },
    ],
    dimensions: [
      { label: 'Width', value: '63 in / 160 cm' },
      { label: 'Depth', value: '15.7 in / 40 cm' },
      { label: 'Height', value: '30.7 in / 78 cm' },
    ],
    sizes: ['160 cm', 'Bespoke'],
    care: [
      'Dust with a dry, soft cloth following the grain.',
      'Wipe the lacquer with a barely-damp cloth, then dry.',
      'Avoid placing directly beneath heating vents or in direct sun.',
      'Re-oil the walnut every 12–18 months to maintain depth.',
    ],
    leadTime: '12–14 weeks, handmade to order',
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      'Savya understood our home before we did. The pieces feel as though they have always belonged here — quietly extraordinary.',
    name: 'Anaïs Béringer',
    role: 'Private Client, Geneva',
  },
  {
    quote:
      'I specify Savya for clients who want furniture with a soul. The craftsmanship survives the closest inspection — every joint, every seam.',
    name: 'Marcus Hale',
    role: 'Interior Designer, Hale & Co.',
  },
  {
    quote:
      'The Meridian table is the heart of our home now. Three generations gathered around it last Sunday. It will outlast all of us.',
    name: 'Priya Raghunathan',
    role: 'Private Client, Mumbai',
  },
  {
    quote:
      'From the first consultation to the white-glove delivery, the experience was flawless. This is how luxury should feel.',
    name: 'Elena Vasquez',
    role: 'Creative Director & Stylist',
  },
];

export type JournalEntry = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  readTime: string;
  date: string;
};

export const journal: JournalEntry[] = [
  {
    slug: 'inside-the-atelier',
    title: 'Inside the Atelier: How a Soriano Sofa Is Made',
    category: 'Craftsmanship',
    excerpt:
      'Eighty-four hours, eleven pairs of hands, and a frame tied by a craftsman who has done it for thirty years.',
    image: IMAGES.journal1,
    readTime: '6 min read',
    date: 'May 2026',
  },
  {
    slug: 'the-quiet-palette',
    title: 'The Quiet Palette: Designing Rooms That Breathe',
    category: 'Interiors',
    excerpt:
      'On oat, ivory and walnut — and why the most considered rooms are the ones you barely notice.',
    image: IMAGES.journal2,
    readTime: '4 min read',
    date: 'April 2026',
  },
  {
    slug: 'sustainable-by-hand',
    title: 'Sustainable by Hand: Our Sourcing Promise',
    category: 'Materials',
    excerpt:
      'From FSC-certified timber to natural latex and vegetable-tanned leather — the story behind our materials.',
    image: IMAGES.journal3,
    readTime: '5 min read',
    date: 'March 2026',
  },
];

export const whyChooseUs = [
  {
    title: 'Handcrafted Excellence',
    body: 'Every piece is made to order by master artisans — never mass-produced, never rushed.',
  },
  {
    title: 'Premium Materials',
    body: 'Kiln-dried hardwoods, Belgian linen, full-grain leather and mouth-blown glass.',
  },
  {
    title: 'Bespoke Customization',
    body: 'Choose your fabric, finish and dimensions. Your piece is configured to your room.',
  },
  {
    title: 'White Glove Delivery',
    body: 'Hand-delivered, unpacked, assembled and placed — with nothing left behind.',
  },
  {
    title: 'Lifetime Craftsmanship',
    body: 'Built to be repaired, not replaced. Our frames carry a lifetime guarantee.',
  },
  {
    title: 'Sustainable Sourcing',
    body: 'FSC-certified timber and responsibly sourced textiles, traceable to origin.',
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function productsByCollection(slug: string): Product[] {
  return products.filter((p) => p.collection === slug);
}

export function formatPrice(value: number): string {
  return '$' + value.toLocaleString('en-US');
}
