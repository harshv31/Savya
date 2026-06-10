'use client';

import { useMemo, useState } from 'react';
import { X } from 'lucide-react';
import type { Product } from '@/lib/data';
import ProductCard from '@/components/product/ProductCard';
import Reveal from '@/components/ui/Reveal';

type Item = { product: Product; images: string[] };

const MATERIALS = ['Wood', 'Metal', 'Fabric', 'Stone'];

const PRICES = [
  { id: 'under-1k', label: 'Under $1,000', test: (p: number) => p < 1000 },
  { id: '1k-3k', label: '$1,000 – $3,000', test: (p: number) => p >= 1000 && p <= 3000 },
  { id: 'over-3k', label: 'Over $3,000', test: (p: number) => p > 3000 },
];

function toggle<T>(set: Set<T>, v: T): Set<T> {
  const next = new Set(set);
  if (next.has(v)) next.delete(v);
  else next.add(v);
  return next;
}

export default function ShopClient({ items }: { items: Item[] }) {
  const [mats, setMats] = useState<Set<string>>(new Set());
  const [cols, setCols] = useState<Set<string>>(new Set());
  const [price, setPrice] = useState<string | null>(null);

  const colorOptions = useMemo(() => {
    const seen = new Map<string, string>();
    for (const { product } of items)
      for (const c of product.colorTags ?? []) if (!seen.has(c.name)) seen.set(c.name, c.hex);
    return [...seen.entries()].map(([name, hex]) => ({ name, hex }));
  }, [items]);

  const filtered = useMemo(() => {
    const range = PRICES.find((r) => r.id === price);
    return items.filter(({ product: p }) => {
      if (mats.size && !(p.materialTags ?? []).some((m) => mats.has(m))) return false;
      if (cols.size && !(p.colorTags ?? []).some((c) => cols.has(c.name))) return false;
      if (range && !range.test(p.price)) return false;
      return true;
    });
  }, [items, mats, cols, price]);

  const active = mats.size + cols.size + (price ? 1 : 0);

  const chip = (selected: boolean) =>
    `border px-4 py-2 text-[11px] uppercase tracking-wide2 transition-all duration-300 ${
      selected
        ? 'border-ebony bg-ebony text-ivory'
        : 'border-charcoal/25 text-cocoa hover:border-charcoal'
    }`;

  return (
    <div className="container-editorial">
      {/* Filters */}
      <div className="space-y-7 border-b border-charcoal/10 pb-12">
        <FilterRow label="Material">
          {MATERIALS.map((m) => (
            <button key={m} onClick={() => setMats((s) => toggle(s, m))} className={chip(mats.has(m))}>
              {m}
            </button>
          ))}
        </FilterRow>

        <FilterRow label="Colour">
          {colorOptions.map((c) => (
            <button
              key={c.name}
              onClick={() => setCols((s) => toggle(s, c.name))}
              className={`${chip(cols.has(c.name))} inline-flex items-center gap-2.5`}
            >
              <span
                className="h-3.5 w-3.5 rounded-full ring-1 ring-charcoal/20"
                style={{ backgroundColor: c.hex }}
              />
              {c.name}
            </button>
          ))}
        </FilterRow>

        <FilterRow label="Price">
          {PRICES.map((r) => (
            <button
              key={r.id}
              onClick={() => setPrice((p) => (p === r.id ? null : r.id))}
              className={chip(price === r.id)}
            >
              {r.label}
            </button>
          ))}
        </FilterRow>

        <div className="flex items-center justify-between pt-1">
          <p className="text-sm text-stone">
            <span className="text-charcoal">{filtered.length}</span>{' '}
            {filtered.length === 1 ? 'piece' : 'pieces'}
            {active > 0 && <span> · {active} {active === 1 ? 'filter' : 'filters'}</span>}
          </p>
          {active > 0 && (
            <button
              onClick={() => {
                setMats(new Set());
                setCols(new Set());
                setPrice(null);
              }}
              className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wide2 text-cocoa transition hover:text-charcoal"
            >
              <X size={13} /> Clear all
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(({ product, images }, i) => (
            <Reveal key={product.slug} delay={(i % 3) * 0.06}>
              <ProductCard product={product} images={images} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mx-auto mt-20 max-w-md pb-8 text-center">
          <p className="font-serif text-3xl text-charcoal">Nothing matches, yet.</p>
          <p className="mt-4 leading-relaxed text-cocoa">
            No pieces wear that exact combination — but our atelier can make one
            that does. Loosen a filter, or commission it bespoke.
          </p>
          <button
            onClick={() => {
              setMats(new Set());
              setCols(new Set());
              setPrice(null);
            }}
            className="btn-outline mt-8"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3.5 md:flex-row md:items-center md:gap-8">
      <p className="eyebrow w-20 shrink-0 text-charcoal">{label}</p>
      <div className="flex flex-wrap gap-2.5">{children}</div>
    </div>
  );
}
