import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SlidersHorizontal } from 'lucide-react';
import {
  collections,
  getCollection,
  productsByCollection,
  products,
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

  let items = productsByCollection(slug);
  // Ensure the grid never feels empty for a showcase build
  if (items.length < 4) {
    items = [...items, ...products.filter((p) => !items.includes(p))].slice(0, 8);
  }

  return (
    <div>
      <PageHeader
        eyebrow="Collection"
        title={collection.name}
        description={collection.description}
        image={collection.image}
      />

      <section className="bg-ivory py-14 md:py-20">
        <div className="container-editorial">
          {/* Filter bar */}
          <div className="flex items-center justify-between border-b border-charcoal/10 pb-6">
            <p className="text-sm text-stone">
              <span className="text-charcoal">{collection.count}</span> handcrafted pieces
            </p>
            <div className="flex items-center gap-6 text-[12px] uppercase tracking-wide2 text-cocoa">
              <button className="flex items-center gap-2 hover:text-charcoal">
                <SlidersHorizontal size={14} /> Filter
              </button>
              <button className="hover:text-charcoal">Sort: Featured</button>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-14 lg:grid-cols-4">
            {items.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 4) * 0.06}>
                <ProductCard product={p} images={resolveProductImages(p.slug, p.images)} />
              </Reveal>
            ))}
          </div>
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
