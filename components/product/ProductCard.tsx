'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Heart, Eye } from 'lucide-react';
import type { Product } from '@/lib/data';
import { formatPrice } from '@/lib/data';
import { img } from '@/lib/images';

export default function ProductCard({
  product,
  images,
}: {
  product: Product;
  /** Resolved image list (real photos when available); falls back to product data. */
  images?: string[];
}) {
  const [wished, setWished] = useState(false);
  const gallery = images && images.length > 0 ? images : product.images;
  const hasAlt = gallery.length > 1;

  return (
    <div className="group relative">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-cream">
          <Image
            src={img(gallery[0], 800)}
            alt={product.name}
            fill
            sizes="(max-width:768px) 50vw, 25vw"
            className={`object-cover transition-all duration-[1.2s] ease-luxe ${
              hasAlt ? 'group-hover:opacity-0' : 'group-hover:scale-105'
            }`}
          />
          {hasAlt && (
            <Image
              src={img(gallery[1], 800)}
              alt={`${product.name} alternate view`}
              fill
              sizes="(max-width:768px) 50vw, 25vw"
              className="object-cover opacity-0 scale-105 transition-all duration-[1.2s] ease-luxe group-hover:scale-100 group-hover:opacity-100"
            />
          )}

          {product.badge && (
            <span className="absolute left-4 top-4 bg-ivory/90 px-3 py-1 text-[10px] uppercase tracking-wide2 text-charcoal">
              {product.badge}
            </span>
          )}

          {/* Quick actions */}
          <div className="absolute right-4 top-4 flex flex-col gap-2 opacity-0 translate-y-1 transition-all duration-500 ease-luxe group-hover:opacity-100 group-hover:translate-y-0">
            <button
              onClick={(e) => {
                e.preventDefault();
                setWished((w) => !w);
              }}
              aria-label="Add to wishlist"
              className="grid h-9 w-9 place-items-center rounded-full bg-ivory/90 text-charcoal transition hover:bg-charcoal hover:text-ivory"
            >
              <Heart size={15} strokeWidth={1.6} fill={wished ? 'currentColor' : 'none'} />
            </button>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-ivory/90 text-charcoal transition hover:bg-charcoal hover:text-ivory">
              <Eye size={15} strokeWidth={1.6} />
            </span>
          </div>

          {/* Quick view bar */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full bg-ivory/95 py-3.5 text-center text-[11px] uppercase tracking-wide2 text-charcoal transition-transform duration-500 ease-luxe group-hover:translate-y-0">
            Quick View
          </div>
        </div>
      </Link>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow text-stone">{product.category}</p>
          <Link href={`/products/${product.slug}`}>
            <h3 className="mt-1 font-serif text-lg leading-snug text-charcoal link-underline">
              {product.name}
            </h3>
          </Link>
        </div>
        <p className="shrink-0 pt-4 text-sm text-cocoa">
          {product.priceFrom && <span className="text-stone">from </span>}
          {formatPrice(product.price)}
        </p>
      </div>

      {/* Fabric swatches */}
      {product.fabrics.length > 0 && (
        <div className="mt-2.5 flex items-center gap-1.5">
          {product.fabrics.slice(0, 5).map((f) => (
            <span
              key={f.name}
              title={f.name}
              className="h-3.5 w-3.5 rounded-full ring-1 ring-charcoal/10"
              style={{ backgroundColor: f.hex }}
            />
          ))}
          <span className="ml-1 text-[11px] text-stone">+ custom fabrics</span>
        </div>
      )}
    </div>
  );
}
