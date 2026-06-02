import Link from 'next/link';
import { products } from '@/lib/data';
import ProductCard from '@/components/product/ProductCard';
import Reveal from '@/components/ui/Reveal';
import { resolveProductImages } from '@/lib/productImages';

export default function BestSellers() {
  const featured = products.filter((p) => p.bestseller || p.newArrival).slice(0, 4);

  return (
    <section className="bg-ivory py-24 md:py-32">
      <div className="container-editorial">
        <Reveal>
          <div className="flex flex-col items-end justify-between gap-6 md:flex-row">
            <div className="max-w-xl">
              <p className="eyebrow">Best Sellers</p>
              <h2 className="heading-serif mt-4 text-4xl md:text-5xl">
                The pieces our clients
                <br />
                return to, again and again
              </h2>
            </div>
            <Link href="/bestsellers" className="link-underline text-sm uppercase tracking-wide2">
              Shop bestsellers
            </Link>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) * 0.07}>
              <ProductCard product={p} images={resolveProductImages(p.slug, p.images)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
