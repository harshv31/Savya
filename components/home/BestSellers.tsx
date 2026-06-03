import Link from 'next/link';
import { products } from '@/lib/data';
import ProductCard from '@/components/product/ProductCard';
import Reveal from '@/components/ui/Reveal';
import { resolveProductImages } from '@/lib/productImages';

export default function BestSellers() {
  const featured = products.filter((p) => p.bestseller || p.newArrival).slice(0, 3);

  return (
    <section className="section-pad bg-ivory">
      <div className="container-editorial">
        <Reveal>
          <div className="flex flex-col items-end justify-between gap-6 md:flex-row">
            <div className="max-w-xl">
              <p className="eyebrow">Signature Pieces</p>
              <h2 className="heading-serif mt-5 text-4xl md:text-5xl lg:text-6xl">
                The pieces our clients
                <br />
                return to, again and again
              </h2>
            </div>
            <Link href="/bestsellers" className="link-underline text-sm uppercase tracking-wide2">
              View all
            </Link>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.08}>
              <ProductCard product={p} images={resolveProductImages(p.slug, p.images)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
