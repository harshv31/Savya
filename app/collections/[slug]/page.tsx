import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SlidersHorizontal } from 'lucide-react';
import {
  collections,
  getCollection,
  productsByCollection,
} from '@/lib/data';
import PageHeader from '@/components/ui/PageHeader';
import ProductCard from '@/components/product/ProductCard';
import Reveal from '@/components/ui/Reveal';
import { resolveProductImages } from '@/lib/productImages';

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return { title: 'Not Found' };
  return { title: collection.name, description: collection.description };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  // Only true matches — never pad with other rooms.
  const items = productsByCollection(slug);
  const count = items.length;

  return (
    <div>
      <PageHeader
        eyebrow="Collection"
        title={collection.name}
        description={collection.description}
        image={collection.image}
      />

      <section className="section-pad bg-ivory">
        <div className="container-editorial">
          {/* Filter bar */}
          <div className="flex items-center justify-between border-b border-charcoal/10 pb-6">
            <p className="text-sm text-stone">
              {count > 0 ? (
                <>
                  <span className="text-charcoal">{count}</span>{' '}
                  {count === 1 ? 'piece' : 'pieces'}, made to order
                </>
              ) : (
                'New pieces arriving soon'
              )}
            </p>
            {count > 0 && (
              <div className="flex items-center gap-6 text-[12px] uppercase tracking-wide2 text-cocoa">
                <button className="flex items-center gap-2 hover:text-charcoal">
                  <SlidersHorizontal size={14} /> Filter
                </button>
                <button className="hover:text-charcoal">Sort: Featured</button>
              </div>
            )}
          </div>

          {count > 0 ? (
            <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 0.07}>
                  <ProductCard product={p} images={resolveProductImages(p.slug, p.images)} />
                </Reveal>
              ))}
            </div>
          ) : (
            // Graceful, honest empty state
            <Reveal>
              <div className="mx-auto mt-16 max-w-xl text-center">
                <p className="font-serif text-3xl text-charcoal md:text-4xl">
                  This collection is being composed.
                </p>
                <p className="mt-5 leading-relaxed text-cocoa">
                  Our atelier is finishing the first {collection.name.toLowerCase()}{' '}
                  pieces. Register your interest, or commission something entirely
                  your own — most of what we make begins as a conversation.
                </p>
                <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
                  <Link href="/consultation" className="btn-solid">
                    Book a Consultation
                  </Link>
                  <Link href="/custom" className="btn-outline">
                    Commission a Bespoke Piece
                  </Link>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Cross-sell strip */}
      <section className="bg-cream py-16">
        <div className="container-editorial flex flex-wrap items-center justify-center gap-3 text-center">
          <p className="w-full font-serif text-2xl text-charcoal md:text-3xl">
            Explore other collections
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {collections
              .filter((c) => c.slug !== slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/collections/${c.slug}`}
                  className="border border-charcoal/20 px-5 py-2.5 text-[12px] uppercase tracking-wide2 text-cocoa transition hover:bg-charcoal hover:text-ivory"
                >
                  {c.name}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
