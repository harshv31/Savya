import type { Metadata } from 'next';
import { products } from '@/lib/data';
import { IMAGES } from '@/lib/images';
import PageHeader from '@/components/ui/PageHeader';
import ProductCard from '@/components/product/ProductCard';
import Reveal from '@/components/ui/Reveal';
import { resolveProductImages } from '@/lib/productImages';

export const metadata: Metadata = {
  title: 'Bestsellers',
  description: 'The handcrafted Savya pieces our clients return to, again and again.',
};

export default function BestsellersPage() {
  const items = products.filter((p) => p.bestseller);

  return (
    <div>
      <PageHeader
        eyebrow="Signature Pieces"
        title="Bestsellers"
        description="The pieces our clients — and their designers — return to, again and again. Each made to order in our atelier."
        image={IMAGES.story}
      />
      <section className="section-pad bg-ivory">
        <div className="container-editorial grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.07}>
              <ProductCard product={p} images={resolveProductImages(p.slug, p.images)} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
