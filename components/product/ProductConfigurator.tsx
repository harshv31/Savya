'use client';

import { useState } from 'react';
import { Heart, Check, Truck, RotateCcw } from 'lucide-react';
import type { Product } from '@/lib/data';
import { formatPrice } from '@/lib/data';

export default function ProductConfigurator({ product }: { product: Product }) {
  const [fabric, setFabric] = useState(0);
  const [material, setMaterial] = useState(0);
  const [size, setSize] = useState(0);
  const [wished, setWished] = useState(false);

  const hasFabric = product.fabrics.length > 0;

  return (
    <div>
      <p className="eyebrow text-stone">Configure your piece</p>
      <h2 className="heading-serif mt-3 text-3xl md:text-4xl">{product.name}</h2>

      <div className="mt-4 flex items-baseline gap-3">
        <p className="font-serif text-2xl text-walnut">
          {product.priceFrom && <span className="text-base text-stone">from </span>}
          {formatPrice(product.price)}
        </p>
        <span className="text-xs text-stone">· excl. delivery</span>
      </div>

      {/* Fabric selector */}
      {hasFabric && (
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <p className="eyebrow text-charcoal">Upholstery</p>
            <p className="text-xs text-stone">{product.fabrics[fabric].name}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            {product.fabrics.map((f, i) => (
              <button
                key={f.name}
                onClick={() => setFabric(i)}
                title={f.name}
                aria-label={f.name}
                className={`relative h-10 w-10 rounded-full ring-1 ring-charcoal/15 transition ${
                  fabric === i ? 'ring-2 ring-offset-2 ring-charcoal ring-offset-ivory' : ''
                }`}
                style={{ backgroundColor: f.hex }}
              >
                {fabric === i && (
                  <Check
                    size={16}
                    className="absolute inset-0 m-auto text-ivory mix-blend-difference"
                  />
                )}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-stone">{product.fabrics[fabric].note}</p>
        </div>
      )}

      {/* Material selector */}
      {product.materials.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <p className="eyebrow text-charcoal">
              {hasFabric ? 'Frame / Legs' : 'Material'}
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            {product.materials.map((m, i) => (
              <button
                key={m.name}
                onClick={() => setMaterial(i)}
                className={`border px-4 py-2.5 text-left text-[13px] transition ${
                  material === i
                    ? 'border-charcoal bg-charcoal text-ivory'
                    : 'border-charcoal/20 text-cocoa hover:border-charcoal'
                }`}
              >
                {m.name}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-stone">{product.materials[material].note}</p>
        </div>
      )}

      {/* Size / configuration */}
      <div className="mt-8">
        <p className="eyebrow text-charcoal">
          {product.category === 'Tables' ? 'Length' : 'Configuration'}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {product.sizes.map((s, i) => (
            <button
              key={s}
              onClick={() => setSize(i)}
              className={`border px-4 py-2.5 text-[13px] transition ${
                size === i
                  ? 'border-charcoal bg-charcoal text-ivory'
                  : 'border-charcoal/20 text-cocoa hover:border-charcoal'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Custom size note */}
      <p className="mt-6 text-xs leading-relaxed text-stone">
        Need a bespoke dimension or your own fabric (COM)? Our atelier can build
        to your exact specification —{' '}
        <a href="/consultation" className="link-underline text-walnut">
          speak to a designer
        </a>
        .
      </p>

      {/* Actions */}
      <div className="mt-9 flex gap-3">
        <button className="btn-solid flex-1">Add to Cart</button>
        <button
          onClick={() => setWished((w) => !w)}
          aria-label="Add to wishlist"
          className="grid h-[52px] w-[52px] shrink-0 place-items-center border border-charcoal/20 text-charcoal transition hover:bg-charcoal hover:text-ivory"
        >
          <Heart size={18} strokeWidth={1.6} fill={wished ? 'currentColor' : 'none'} />
        </button>
      </div>
      <button className="btn-outline mt-3 w-full">Request Fabric Swatches</button>

      {/* Reassurance */}
      <div className="mt-8 space-y-3 border-t border-charcoal/10 pt-7 text-sm text-cocoa">
        <p className="flex items-center gap-3">
          <Truck size={17} strokeWidth={1.5} className="text-walnut" />
          {product.leadTime} · White-glove delivery
        </p>
        <p className="flex items-center gap-3">
          <RotateCcw size={17} strokeWidth={1.5} className="text-walnut" />
          14-day returns on in-stock pieces · Lifetime craftsmanship guarantee
        </p>
      </div>
    </div>
  );
}
