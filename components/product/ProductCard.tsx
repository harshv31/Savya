'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Heart, ArrowRight } from 'lucide-react';
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
    <div className="group">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-cream">
          <Image
            src={img(gallery[0], 900)}
            alt={product.name}
            fill
            sizes="(max-width:768px) 50vw, 33vw"
            className={`object-cover transition-all duration-[1.4s] ease-luxe ${
              hasAlt ? 'group-hover:opacity-0' : 'group-hover:scale-[1.06]'
            }`}
          />
          {hasAlt && (
            <Image
              src={img(gallery[1], 900)}
              alt={`${product.name} alternate view`}
              fill
              sizes="(max-width:768px) 50vw, 33vw"
              className="object-cover opacity-0 scale-[1.06] transition-all duration-[1.4s] ease-luxe group-hover:scale-100 group-hover:opacity-100"
            />
          )}

          {/* Darkening reveal */}
          <div className="absolute inset-0 bg-gradient-to-t from-ebony/55 via-transparent to-transparent opacity-0 transition-opacity duration-700 ease-luxe group-hover:opacity-100" />

          {product.badge && (
            <span className="absolute left-4 top-4 bg-ivory/90 px-3 py-1 text-[9.5px] uppercase tracking-luxe text-ebony">
              {product.badge}
            </span>
          )}

          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setWished((w) => !w);
            }}
            aria-label="Add to wishlist"
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-ivory/85 text-ebony opacity-0 transition-all duration-500 ease-luxe hover:bg-ebony hover:text-ivory group-hover:opacity-100"
          >
            <Heart size={15} strokeWidth={1.6} fill={wished ? 'currentColor' : 'none'} />
          </button>

          {/* View reveal */}
          <span className="absolute bottom-5 left-5 flex translate-y-2 items-center gap-2 text-[11px] uppercase tracking-wide2 text-ivory opacity-0 transition-all duration-500 ease-luxe group-hover:translate-y-0 group-hover:opacity-100">
            View Piece <ArrowRight size={14} strokeWidth={1.5} />
          </span>
        </div>
      </Link>

      <div className="mt-6 flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-stone">{product.category}</p>
          <Link href={`/products/${product.slug}`}>
            <h3 className="mt-2 font-serif text-xl leading-snug text-ebony transition-colors group-hover:text-walnut">
              {product.name}
            </h3>
          </Link>
          {product.fabrics.length > 0 && (
            <p className="mt-1.5 text-[11px] uppercase tracking-wide2 text-stone">
              {product.fabrics.length} finishes · Made to order
            </p>
          )}
          {product.fabrics.length === 0 && (
            <p className="mt-1.5 text-[11px] uppercase tracking-wide2 text-stone">
              Made to order
            </p>
          )}
        </div>
        <p className="shrink-0 pt-5 font-serif text-lg text-cocoa">
          {product.priceFrom && <span className="text-sm text-stone">from </span>}
          {formatPrice(product.price)}
        </p>
      </div>
    </div>
  );
}
