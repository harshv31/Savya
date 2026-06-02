import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { journal } from '@/lib/data';
import { img } from '@/lib/images';
import PageHeader from '@/components/ui/PageHeader';
import Reveal from '@/components/ui/Reveal';
import { IMAGES } from '@/lib/images';

export const metadata: Metadata = {
  title: 'The Journal',
  description:
    'Stories from the Savya atelier — craftsmanship, interiors, materials and the art of considered living.',
};

export default function JournalPage() {
  const [feature, ...rest] = journal;

  return (
    <div>
      <PageHeader
        eyebrow="The Journal"
        title="Notes on Considered Living"
        description="Stories from the atelier — on craftsmanship, materials, and designing rooms that breathe."
        image={IMAGES.journal1}
      />

      <section className="bg-ivory py-20 md:py-28">
        <div className="container-editorial">
          {/* Featured */}
          <Reveal>
            <Link href="/journal" className="group grid gap-10 lg:grid-cols-2 lg:items-center">
              <div className="relative aspect-[4/3] overflow-hidden bg-cream">
                <Image
                  src={img(feature.image, 1100)}
                  alt={feature.title}
                  fill
                  sizes="(max-width:1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1.5s] ease-luxe group-hover:scale-105"
                />
              </div>
              <div>
                <p className="eyebrow">{feature.category} · {feature.readTime}</p>
                <h2 className="heading-serif mt-4 text-3xl md:text-4xl">{feature.title}</h2>
                <p className="mt-5 text-base leading-relaxed text-cocoa">{feature.excerpt}</p>
                <span className="link-underline mt-6 inline-block text-sm uppercase tracking-wide2">
                  Read the story
                </span>
              </div>
            </Link>
          </Reveal>

          {/* Grid */}
          <div className="mt-20 grid gap-10 md:grid-cols-3">
            {rest.map((entry, i) => (
              <Reveal key={entry.slug} delay={(i % 3) * 0.08}>
                <Link href="/journal" className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-cream">
                    <Image
                      src={img(entry.image, 800)}
                      alt={entry.title}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[1.5s] ease-luxe group-hover:scale-105"
                    />
                  </div>
                  <p className="eyebrow mt-5">{entry.category} · {entry.date}</p>
                  <h3 className="mt-2 font-serif text-2xl text-charcoal">{entry.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cocoa">{entry.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
