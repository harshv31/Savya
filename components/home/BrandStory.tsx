import Link from 'next/link';
import { img, IMAGES } from '@/lib/images';
import Reveal from '@/components/ui/Reveal';
import RevealImage from '@/components/ui/RevealImage';

const pillars = [
  { value: '84 hrs', label: 'Of handwork in every sofa' },
  { value: '40+', label: 'Master artisans in our atelier' },
  { value: 'Lifetime', label: 'Craftsmanship guarantee' },
];

export default function BrandStory() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="container-editorial grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative">
          <RevealImage
            src={img(IMAGES.story, 1100)}
            alt="An artisan hand-finishing a solid walnut frame"
            className="aspect-[4/5] w-full"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
          {/* Inset secondary image */}
          <div className="absolute -bottom-10 -right-4 hidden w-44 md:block lg:w-52">
            <RevealImage
              src={img(IMAGES.craft, 500)}
              alt="Detail of hand-stitched upholstery"
              className="aspect-square w-full border-8 border-cream"
              sizes="200px"
              delay={0.2}
            />
          </div>
        </div>

        <div>
          <Reveal>
            <p className="eyebrow">Our Story</p>
            <h2 className="heading-serif mt-4 text-4xl md:text-5xl">
              Crafted by Artisans.
              <br />
              Inspired by Timeless Design.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-7 text-base leading-relaxed text-cocoa">
              Savya began with a simple conviction — that furniture should be
              made slowly, by hand, from materials worth keeping. In our atelier,
              kiln-dried hardwoods are joined the traditional way, frames are
              hand-tied, and every seam is stitched by a craftsman who signs their
              work.
            </p>
            <p className="mt-5 text-base leading-relaxed text-cocoa">
              We source responsibly — FSC-certified timber, Belgian linen,
              full-grain leather, natural latex — and we finish with patience. The
              result is furniture with quiet presence: pieces designed to be
              repaired, never replaced, and to grow more beautiful with the years.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 grid grid-cols-3 gap-6 border-y border-charcoal/10 py-8">
              {pillars.map((p) => (
                <div key={p.label}>
                  <p className="font-serif text-3xl text-walnut md:text-4xl">{p.value}</p>
                  <p className="mt-2 text-xs leading-snug text-stone">{p.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <Link href="/about" className="btn-outline mt-10">
              Discover the Atelier
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
