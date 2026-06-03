import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import {
  products,
  getProduct,
  getCollection,
  productsByCollection,
} from '@/lib/data';
import ProductGallery from '@/components/product/ProductGallery';
import ProductConfigurator from '@/components/product/ProductConfigurator';
import ProductCard from '@/components/product/ProductCard';
import ProductHero from '@/components/product/ProductHero';
import Accordion from '@/components/ui/Accordion';
import Reveal from '@/components/ui/Reveal';
import { resolveProductImages } from '@/lib/productImages';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: 'Not Found' };
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const collection = getCollection(product.collection);
  // Real photos dropped into public/products/<slug>/ take priority over placeholders.
  const gallery = resolveProductImages(slug, product.images);
  const related = productsByCollection(product.collection)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);
  // Top up related from other collections if needed
  if (related.length < 3) {
    for (const p of products) {
      if (related.length >= 3) break;
      if (p.slug !== product.slug && !related.includes(p)) related.push(p);
    }
  }

  return (
    <div>
      {/* Cinematic split-editorial hero */}
      <ProductHero product={product} heroImage={gallery[0]} />

      {/* Configure & detail — anchored so the hero CTA lands here */}
      <div id="configure" className="scroll-mt-24 pt-12">
        {/* Breadcrumb */}
        <div className="container-editorial flex items-center gap-2 pb-6 text-[12px] uppercase tracking-wide2 text-stone">
          <Link href="/" className="hover:text-charcoal">Home</Link>
          <ChevronRight size={13} />
          {collection && (
            <>
              <Link href={`/collections/${collection.slug}`} className="hover:text-charcoal">
                {collection.name}
              </Link>
              <ChevronRight size={13} />
            </>
          )}
          <span className="text-charcoal">{product.name}</span>
        </div>

        {/* Main */}
        <div className="container-editorial grid gap-12 pb-20 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={gallery} name={product.name} />
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductConfigurator product={product} />
          </div>
        </div>
      </div>

      {/* Story + details */}
      <section className="bg-cream py-20">
        <div className="container-editorial grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div>
              <p className="eyebrow">The Story</p>
              <h2 className="heading-serif mt-4 text-3xl md:text-4xl">
                Made slowly, to be kept for good
              </h2>
              <p className="mt-6 text-base leading-relaxed text-cocoa">{product.story}</p>

              <div className="mt-8 border-l-2 border-brass pl-6">
                <p className="eyebrow text-stone">Designer’s Note</p>
                <p className="mt-3 font-serif text-xl italic leading-snug text-walnut">
                  “{product.designerNote}”
                </p>
                <p className="mt-3 text-xs uppercase tracking-wide2 text-stone">
                  — The Savya Design Studio
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Accordion
              items={[
                {
                  title: 'Dimensions',
                  content: (
                    <dl className="grid grid-cols-2 gap-x-8 gap-y-3">
                      {product.dimensions.map((d) => (
                        <div key={d.label} className="flex justify-between border-b border-charcoal/10 pb-2">
                          <dt className="text-stone">{d.label}</dt>
                          <dd className="text-charcoal">{d.value}</dd>
                        </div>
                      ))}
                    </dl>
                  ),
                },
                {
                  title: 'Materials & Craft',
                  content: (
                    <ul className="space-y-2">
                      {product.materials.map((m) => (
                        <li key={m.name}>
                          <span className="text-charcoal">{m.name}</span> — {m.note}
                        </li>
                      ))}
                      {product.fabrics.length > 0 && (
                        <li className="pt-1">
                          Available in {product.fabrics.length}+ house fabrics, or your
                          own material (COM).
                        </li>
                      )}
                    </ul>
                  ),
                },
                {
                  title: 'Care Instructions',
                  content: (
                    <ul className="list-inside list-disc space-y-2 marker:text-brass">
                      {product.care.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  ),
                },
                {
                  title: 'Delivery & Lead Time',
                  content: (
                    <p>
                      {product.leadTime}. Every Savya piece is delivered by our
                      white-glove partners — unpacked, assembled and placed in your
                      room, with all packaging removed. Delivery is estimated at
                      checkout based on your address.
                    </p>
                  ),
                },
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* Related */}
      <section className="bg-ivory py-20 md:py-28">
        <div className="container-editorial">
          <Reveal>
            <div className="flex items-end justify-between">
              <h2 className="heading-serif text-3xl md:text-4xl">You may also love</h2>
              {collection && (
                <Link href={`/collections/${collection.slug}`} className="link-underline text-sm uppercase tracking-wide2">
                  More {collection.name}
                </Link>
              )}
            </div>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.08}>
                <ProductCard product={p} images={resolveProductImages(p.slug, p.images)} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
