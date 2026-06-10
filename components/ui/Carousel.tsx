'use client';

import { useRef, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

/**
 * Horizontal snap carousel: native swipe on touch, arrow paging on desktop.
 * Children supply their own slide widths (shrink-0 + snap-start).
 */
export default function Carousel({ children }: { children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);

  const page = (dir: number) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <div
        ref={track}
        className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-6 px-6 pb-2 md:-mx-0 md:scroll-px-0 md:px-0"
      >
        {children}
      </div>

      <button
        onClick={() => page(-1)}
        aria-label="Previous pieces"
        className="absolute -left-5 top-[38%] z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-charcoal/15 bg-ivory/95 text-charcoal shadow-sm transition hover:bg-ebony hover:text-ivory lg:grid"
      >
        <ArrowLeft size={18} strokeWidth={1.5} />
      </button>
      <button
        onClick={() => page(1)}
        aria-label="More pieces"
        className="absolute -right-5 top-[38%] z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-charcoal/15 bg-ivory/95 text-charcoal shadow-sm transition hover:bg-ebony hover:text-ivory lg:grid"
      >
        <ArrowRight size={18} strokeWidth={1.5} />
      </button>
    </div>
  );
}
