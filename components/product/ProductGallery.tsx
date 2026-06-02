'use client';

import Image from 'next/image';
import { useState, useRef } from 'react';
import { img } from '@/lib/images';

export default function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div className="flex flex-col-reverse gap-4 md:flex-row">
      {/* Thumbnails */}
      <div className="flex gap-3 md:flex-col">
        {images.map((im, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative aspect-square w-16 shrink-0 overflow-hidden bg-cream transition md:w-20 ${
              active === i ? 'ring-1 ring-charcoal' : 'opacity-60 hover:opacity-100'
            }`}
            aria-label={`View image ${i + 1}`}
          >
            <Image src={img(im, 200)} alt="" fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>

      {/* Main image with zoom */}
      <div
        ref={ref}
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={onMove}
        className="relative aspect-[4/5] flex-1 cursor-zoom-in overflow-hidden bg-cream"
      >
        <Image
          src={img(images[active], 1400)}
          alt={name}
          fill
          priority
          sizes="(max-width:768px) 100vw, 50vw"
          className="object-cover transition-transform duration-300 ease-out"
          style={
            zoom
              ? { transform: 'scale(1.7)', transformOrigin: `${pos.x}% ${pos.y}%` }
              : undefined
          }
        />
        <span className="absolute bottom-4 right-4 bg-ivory/80 px-3 py-1 text-[10px] uppercase tracking-wide2 text-charcoal">
          Hover to zoom
        </span>
      </div>
    </div>
  );
}
