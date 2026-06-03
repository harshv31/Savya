import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import type { Product } from '@/lib/data';
import { formatPrice } from '@/lib/data';
import { getCollection } from '@/lib/data';
import { img } from '@/lib/images';
import Reveal from '@/components/ui/Reveal';
import RevealImage from '@/components/ui/RevealImage';

export default function ProductHero({
  product,
  heroImage,
}: {
  product: Product;
  heroImage: string;
}) {
  const collection = getCollection(product.collection);

  return (
    <section className="grid lg:min-h-[calc(100vh-68px)] lg:grid-cols-2">
      {/* Editorial image */}
      <RevealImage
        src={img(heroImage, 1400, 85)}
        alt={product.name}
        priority
        className="aspect-[4/3] w-full lg:aspect-auto lg:h-full"
        sizes="(max-width:1024px) 100vw, 50vw"
      />

      {/* Editorial copy — dark, for an exclusive gallery feel */}
      <div className="texture-grain relative flex items-center bg-ebony px-6 py-20 text-ivory md:px-12 lg:px-16 xl:px-24">
        <div className="max-w-lg">
          <Reveal>
            <p className="eyebrow text-ivory/55">
              {collection ? collection.name : product.category}
              {product.badge ? ` · ${product.badge}` : ''}
            </p>
            <h1 className="heading-serif mt-6 text-5xl text-ivory md:text-6xl xl:text-7xl">
              {product.name}
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-8 text-base font-light leading-relaxed text-ivory/70 md:text-lg">
              {product.shortDescription}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-9 flex items-baseline gap-3">
              <p className="font-serif text-3xl text-gold">
                {product.priceFrom && (
                  <span className="text-base text-ivory/50">from </span>
                )}
                {formatPrice(product.price)}
              </p>
              <span className="text-xs uppercase tracking-wide2 text-ivory/45">
                {product.leadTime}
              </span>
            </div>

            {/* Fabric preview */}
            {product.fabrics.length > 0 && (
              <div className="mt-7 flex items-center gap-2.5">
                {product.fabrics.slice(0, 6).map((f) => (
                  <span
                    key={f.name}
                    title={f.name}
                    className="h-5 w-5 rounded-full ring-1 ring-ivory/25"
                    style={{ backgroundColor: f.hex }}
                  />
                ))}
                <span className="ml-2 text-xs text-ivory/45">
                  {product.fabrics.length}+ fabrics &amp; custom (COM)
                </span>
              </div>
            )}
          </Reveal>

          <Reveal delay={0.26}>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <a href="#configure" className="btn-luxe bg-ivory text-ebony hover:bg-cream">
                Configure &amp; Order
              </a>
              <Link href="/consultation" className="btn-ghost-light">
                Book a Consultation
              </Link>
            </div>

            <a
              href="#configure"
              className="mt-10 inline-flex items-center gap-2 text-[11px] uppercase tracking-luxe text-ivory/55 transition hover:text-ivory"
            >
              <ArrowDown size={14} className="animate-bounce" />
              See materials, dimensions &amp; story
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
