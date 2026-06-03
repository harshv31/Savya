import Link from 'next/link';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { img, IMAGES } from '@/lib/images';
import Reveal from '@/components/ui/Reveal';

const gallery = [
  { id: IMAGES.insp1, span: 'row-span-2', label: 'The Serpentine, in ivory bouclé' },
  { id: IMAGES.insp2, span: '', label: 'Sphere marble, styled' },
  { id: IMAGES.insp3, span: '', label: 'Sage Bouclé reading corner' },
  { id: IMAGES.insp5, span: 'row-span-2', label: 'The Dune at dusk' },
  { id: IMAGES.insp4, span: '', label: 'Apex in the corner' },
  { id: IMAGES.insp6, span: '', label: 'Serpentine, open plan' },
];

export default function Inspiration() {
  return (
    <section className="section-pad bg-cream">
      <div className="container-editorial">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Interior Inspiration</p>
            <h2 className="heading-serif mt-4 text-4xl md:text-5xl">
              Shop the Look
            </h2>
            <p className="mt-5 text-base leading-relaxed text-cocoa">
              Real rooms, styled by our design studio. Tap any space to shop the
              pieces within it.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14 grid auto-rows-[200px] grid-cols-2 gap-4 md:auto-rows-[230px] lg:grid-cols-4">
            {gallery.map((g, i) => (
              <Link
                key={i}
                href="/projects"
                className={`group relative block overflow-hidden bg-sand ${g.span}`}
              >
                <Image
                  src={img(g.id, 800)}
                  alt={g.label}
                  fill
                  sizes="(max-width:768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[1.5s] ease-luxe group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-500 group-hover:bg-charcoal/30" />
                <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-ivory/90 text-charcoal opacity-0 transition-all duration-500 ease-luxe group-hover:opacity-100">
                  <Plus size={18} strokeWidth={1.5} />
                </span>
                <p className="absolute bottom-4 left-4 right-4 text-sm text-ivory opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {g.label}
                </p>
              </Link>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 text-center">
            <Link href="/projects" className="btn-outline">
              Explore the Inspiration Journal
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
