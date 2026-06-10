'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { Expand, Images, Ruler, Box } from 'lucide-react';
import { img } from '@/lib/images';
import ImageLightbox from './ImageLightbox';

type View = 'photos' | 'dimensions' | 'ar';

const TABS: { id: View; label: string; icon: typeof Images }[] = [
  { id: 'photos', label: 'Photos', icon: Images },
  { id: 'dimensions', label: 'Dimensions', icon: Ruler },
  { id: 'ar', label: '3D · AR', icon: Box },
];

export default function ProductGallery({
  images,
  name,
  dimensions = [],
}: {
  images: string[];
  name: string;
  dimensions?: { label: string; value: string }[];
}) {
  const [view, setView] = useState<View>('photos');
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [lightbox, setLightbox] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const rect = mainRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== active) setActive(i);
  };

  const open = (i: number) => {
    setActive(i);
    setLightbox(true);
  };

  return (
    <div>
      {/* View toggle */}
      <div className="mb-5 flex items-center gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setView(t.id)}
            className={`inline-flex items-center gap-2 border px-4 py-2.5 text-[10.5px] uppercase tracking-wide2 transition-all duration-300 ${
              view === t.id
                ? 'border-ebony bg-ebony text-ivory'
                : 'border-charcoal/20 text-cocoa hover:border-charcoal'
            }`}
          >
            <t.icon size={13} strokeWidth={1.6} />
            {t.label}
          </button>
        ))}
      </div>

      {view === 'photos' && (
        <>
          {/* Mobile: swipeable carousel */}
          <div className="lg:hidden">
            <div className="relative">
              <div
                ref={trackRef}
                onScroll={onScroll}
                className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
              >
                {images.map((im, i) => (
                  <button
                    key={i}
                    onClick={() => open(i)}
                    className="relative aspect-[4/5] w-full shrink-0 snap-center bg-cream"
                    aria-label={`Enlarge image ${i + 1}`}
                  >
                    <Image
                      src={img(im, 1000)}
                      alt={`${name} — image ${i + 1}`}
                      fill
                      priority={i === 0}
                      sizes="100vw"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              <span className="absolute left-3 top-3 rounded-full bg-charcoal/55 px-3 py-1 text-[11px] tracking-wide2 text-ivory">
                {active + 1} / {images.length}
              </span>
              <button
                onClick={() => open(active)}
                aria-label="Enlarge and zoom"
                className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-charcoal/55 text-ivory transition active:scale-95"
              >
                <Expand size={17} strokeWidth={1.6} />
              </button>

              {images.length > 1 && (
                <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Go to image ${i + 1}`}
                      onClick={() => {
                        trackRef.current?.scrollTo({
                          left: i * (trackRef.current?.clientWidth || 0),
                          behavior: 'smooth',
                        });
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === active ? 'w-6 bg-ivory' : 'w-1.5 bg-ivory/60'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
            <p className="mt-3 text-center text-[11px] uppercase tracking-wide2 text-stone">
              Tap image to enlarge &amp; zoom
            </p>
          </div>

          {/* Desktop: thumbnails + hover-zoom */}
          <div className="hidden gap-4 lg:flex">
            <div className="flex flex-col gap-3">
              {images.map((im, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`relative aspect-square w-20 shrink-0 overflow-hidden bg-cream transition ${
                    active === i ? 'ring-1 ring-charcoal' : 'opacity-60 hover:opacity-100'
                  }`}
                  aria-label={`View image ${i + 1}`}
                >
                  <Image src={img(im, 200)} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>

            <div
              ref={mainRef}
              onMouseEnter={() => setZoom(true)}
              onMouseLeave={() => setZoom(false)}
              onMouseMove={onMove}
              onClick={() => open(active)}
              className="relative aspect-[4/5] flex-1 cursor-zoom-in overflow-hidden bg-cream"
            >
              <Image
                src={img(images[active], 1400)}
                alt={name}
                fill
                priority
                sizes="50vw"
                className="object-cover transition-transform duration-300 ease-out"
                style={
                  zoom
                    ? { transform: 'scale(1.7)', transformOrigin: `${pos.x}% ${pos.y}%` }
                    : undefined
                }
              />
              <span className="pointer-events-none absolute bottom-4 right-4 inline-flex items-center gap-1.5 bg-ivory/85 px-3 py-1 text-[10px] uppercase tracking-wide2 text-charcoal">
                <Expand size={11} /> Click to enlarge
              </span>
            </div>
          </div>
        </>
      )}

      {view === 'dimensions' && (
        <div className="flex aspect-[4/5] flex-col justify-center border border-charcoal/10 bg-cream px-8 py-10 md:px-12">
          <p className="eyebrow text-stone">
            <Ruler size={13} className="mr-2 inline -translate-y-px" />
            Measurements
          </p>
          <dl className="mt-8 divide-y divide-charcoal/10">
            {dimensions.map((d) => (
              <div key={d.label} className="flex items-baseline justify-between py-5">
                <dt className="text-[11px] uppercase tracking-wide2 text-stone">{d.label}</dt>
                <dd className="font-serif text-2xl text-charcoal md:text-3xl">{d.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-sm leading-relaxed text-cocoa">
            Every piece is made to order — bespoke dimensions are part of the
            service.{' '}
            <Link href="/consultation" className="link-underline text-walnut">
              Speak to a designer
            </Link>
            .
          </p>
        </div>
      )}

      {view === 'ar' && (
        <div className="texture-grain relative flex aspect-[4/5] flex-col items-center justify-center bg-ebony px-8 text-center text-ivory md:px-12">
          <span className="grid h-16 w-16 place-items-center rounded-full border border-brass/50 text-brass">
            <Box size={26} strokeWidth={1.2} />
          </span>
          <h3 className="heading-serif mt-8 text-3xl text-ivory md:text-4xl">
            See it in your room
          </h3>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory/70">
            A photoreal 3D model of the {name} is in production. At launch,
            you&rsquo;ll place it in your home — true to scale — straight through
            your phone camera.
          </p>
          <p className="mt-3 text-[10px] uppercase tracking-luxe text-brass/90">
            AR arrives with the NOIR unveiling · Autumn 2026
          </p>
          <Link href="/consultation" className="btn-luxe mt-9 bg-ivory text-ebony hover:bg-cream">
            Request Renders Today
          </Link>
        </div>
      )}

      {lightbox && (
        <ImageLightbox
          images={images}
          name={name}
          index={active}
          onIndex={setActive}
          onClose={() => setLightbox(false)}
        />
      )}
    </div>
  );
}
