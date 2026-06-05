import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { collections, productsByCollection } from '@/lib/data';
import { img, IMAGES } from '@/lib/images';
import PageHeader from '@/components/ui/PageHeader';
import Reveal from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Collections',
  description:
    'Explore Savya’s handcrafted collections — living room, dining, bedroom, outdoor, lighting and decor. Each piece made to order by master artisans.',
};

export default function CollectionsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="The Collections"
        title="Curated Collections"
        description="Six worlds of handcrafted furniture and decor, each composed for a different room — and a different mood — of a considered home."
        image={IMAGES.heroAlt}
      />

      <section className="section-pad bg-ivory">
        <div className="container-editorial grid gap-x-8 gap-y-16 md:grid-cols-2">
          {collections.map((c, i) => {
            const n = productsByCollection(c.slug).length;
            return (
              <Reveal key={c.slug} delay={(i % 2) * 0.08}>
                <Link href={`/collections/${c.slug}`} className="group block">
                  <div className="relative aspect-[16/11] overflow-hidden bg-cream">
                    <Image
                      src={img(c.image, 1100)}
                      alt={c.name}
                      fill
                      sizes="(max-width:768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-[1.5s] ease-luxe group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-ebony/10 transition-colors duration-500 group-hover:bg-ebony/25" />
                  </div>
                  <div className="mt-6 flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-serif text-3xl text-charcoal">{c.name}</h2>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-cocoa">
                        {c.description}
                      </p>
                      <p className="mt-3 text-xs uppercase tracking-wide2 text-stone">
                        {n > 0 ? `${n} ${n === 1 ? 'piece' : 'pieces'} · made to order` : 'Arriving soon'}
                      </p>
                    </div>
                    <span className="mt-1 grid h-12 w-12 shrink-0 place-items-center rounded-full border border-charcoal/20 text-charcoal transition group-hover:bg-ebony group-hover:text-ivory">
                      <ArrowUpRight size={18} strokeWidth={1.5} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}
