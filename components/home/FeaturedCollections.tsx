import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { collections } from '@/lib/data';
import { img } from '@/lib/images';
import Reveal from '@/components/ui/Reveal';

export default function FeaturedCollections() {
  return (
    <section className="section-pad bg-ivory">
      <div className="container-editorial">
        <Reveal>
          <div className="flex flex-col items-end justify-between gap-6 md:flex-row">
            <div className="max-w-xl">
              <p className="eyebrow">Shop by Room</p>
              <h2 className="heading-serif mt-5 text-4xl md:text-5xl lg:text-6xl">
                Curated for every room
                <br />
                of a considered home
              </h2>
            </div>
            <Link href="/collections" className="link-underline text-sm uppercase tracking-wide2">
              View all collections
            </Link>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {collections.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 3) * 0.08}>
              <Link
                href={`/collections/${c.slug}`}
                className={`group relative block overflow-hidden ${
                  i === 0 ? 'lg:row-span-2' : ''
                }`}
              >
                <div
                  className={`relative overflow-hidden bg-cream ${
                    i === 0 ? 'aspect-[3/4] lg:h-full' : 'aspect-[4/3]'
                  }`}
                >
                  <Image
                    src={img(c.image, 900)}
                    alt={c.name}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1.5s] ease-luxe group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-7 text-ivory">
                    <div>
                      <h3 className="font-serif text-2xl md:text-3xl">{c.name}</h3>
                      <p className="mt-1 text-sm text-ivory/70">{c.tagline}</p>
                    </div>
                    <span className="grid h-11 w-11 shrink-0 translate-y-2 place-items-center rounded-full border border-ivory/40 opacity-0 transition-all duration-500 ease-luxe group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight size={18} strokeWidth={1.5} />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
