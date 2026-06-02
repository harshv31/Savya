import type { Metadata } from 'next';
import Image from 'next/image';
import { img, IMAGES } from '@/lib/images';
import PageHeader from '@/components/ui/PageHeader';
import Reveal from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Featured Projects',
  description:
    'A selection of homes and interiors realised with Savya furniture and our in-house design studio.',
};

const projects = [
  { id: IMAGES.insp1, title: 'The Hillside Residence', place: 'Lake Como, Italy', tag: 'Full-home project', tall: true },
  { id: IMAGES.insp5, title: 'A Collector’s Apartment', place: 'Mayfair, London', tag: 'Living & dining' },
  { id: IMAGES.insp3, title: 'Coastal Retreat', place: 'Amalfi, Italy', tag: 'Bedroom suite' },
  { id: IMAGES.insp6, title: 'Garden House', place: 'Provence, France', tag: 'Outdoor living', tall: true },
  { id: IMAGES.insp4, title: 'The Townhouse', place: 'Brooklyn, USA', tag: 'Whole-home' },
  { id: IMAGES.insp2, title: 'Penthouse 12', place: 'Mumbai, India', tag: 'Lighting & decor' },
];

export default function ProjectsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Featured Projects"
        title="Homes We’ve Helped Shape"
        description="A selection of interiors realised with Savya pieces and our in-house design studio — proof of what considered furniture can do for a room."
        image={IMAGES.projects}
      />

      <section className="bg-ivory py-20 md:py-28">
        <div className="container-editorial grid auto-rows-[260px] grid-cols-1 gap-6 sm:grid-cols-2 md:auto-rows-[300px] lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal
              key={i}
              delay={(i % 3) * 0.07}
              className={p.tall ? 'sm:row-span-2' : ''}
            >
              <article className="group relative h-full overflow-hidden bg-cream">
                <Image
                  src={img(p.id, 1000)}
                  alt={p.title}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[1.6s] ease-luxe group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 text-ivory">
                  <p className="eyebrow text-ivory/70">{p.tag}</p>
                  <h2 className="mt-2 font-serif text-2xl md:text-3xl">{p.title}</h2>
                  <p className="mt-1 text-sm text-ivory/75">{p.place}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
