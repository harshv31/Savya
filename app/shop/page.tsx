import type { Metadata } from 'next';
import { products } from '@/lib/data';
import { IMAGES } from '@/lib/images';
import PageHeader from '@/components/ui/PageHeader';
import ShopClient from '@/components/shop/ShopClient';
import { resolveProductImages } from '@/lib/productImages';

export const metadata: Metadata = {
  title: 'Shop All Furniture',
  description:
    'Browse every handcrafted Savya piece. Filter by material, colour and price — each one made to order in our atelier.',
};

export default function ShopPage() {
  const items = products.map((p) => ({
    product: p,
    images: resolveProductImages(p.slug, p.images),
  }));

  return (
    <div>
      <PageHeader
        eyebrow="The Catalogue"
        title="Shop All"
        description="Every piece we make, in one place. Filter by material, colour and price — and remember, each is made to order, so most can be tailored further."
        image={IMAGES.heroLiving}
      />
      <section className="section-pad bg-ivory">
        <ShopClient items={items} />
      </section>
    </div>
  );
}
