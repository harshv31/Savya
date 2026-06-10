import Link from 'next/link';
import { products } from '@/lib/data';
import ProductCard from '@/components/product/ProductCard';
import Reveal from '@/components/ui/Reveal';
import Carousel from '@/components/ui/Carousel';
import { resolveProductImages } from '@/lib/productImages';

export default function BestSellers() {
  const featured = [
    ...products.filter((p) => p.bestseller),
    ...products.filter((p) => !p.bestseller && p.newArrival),
  ];

  return (
    <section className="section-pad bg-ivory">
      <div className="container-editorial">
        <Reveal>
          <div className="flex flex-col items-end justify-between gap-6 md:flex-row">
            <div className="max-w-xl">
              <p className="eyebrow">Best Sellers</p>
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

        <Reveal delay={0.1}>
          <div className="mt-16 lg:mt-20">
            <Carousel>
              {featured.map((p) => (
                <div
                  key={p.slug}
                  className="w-[80%] shrink-0 snap-start sm:w-[46%] lg:w-[31.5%]"
                >
                  <ProductCard product={p} images={resolveProductImages(p.slug, p.images)} />
                </div>
              ))}
            </Carousel>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
