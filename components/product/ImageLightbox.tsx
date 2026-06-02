'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { img } from '@/lib/images';

type Pt = { x: number; y: number };

const MAX = 4;

/**
 * Full-screen image viewer with mobile-first gestures:
 *  - pinch to zoom (two fingers) / mouse-wheel to zoom (desktop)
 *  - double-tap to toggle zoom
 *  - drag to pan when zoomed
 *  - swipe left/right (or arrow keys / buttons) to change image
 */
export default function ImageLightbox({
  images,
  name,
  index,
  onIndex,
  onClose,
}: {
  images: string[];
  name: string;
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState<Pt>({ x: 0, y: 0 });
  const [animate, setAnimate] = useState(true); // CSS transition on/off
  const [swipeDX, setSwipeDX] = useState(0); // base-scale horizontal feedback

  const pointers = useRef(new Map<number, Pt>());
  const pinchStart = useRef({ dist: 0, scale: 1, mid: { x: 0, y: 0 }, pos: { x: 0, y: 0 } });
  const drag = useRef<{ x: number; y: number; pos: Pt; t: number } | null>(null);
  const lastTap = useRef(0);

  const reset = useCallback(() => {
    setScale(1);
    setPos({ x: 0, y: 0 });
    setSwipeDX(0);
  }, []);

  const go = useCallback(
    (d: number) => {
      setAnimate(true);
      reset();
      onIndex((index + d + images.length) % images.length);
    },
    [index, images.length, onIndex, reset],
  );

  // reset zoom whenever the image changes
  useEffect(() => {
    reset();
  }, [index, reset]);

  // lock scroll + keyboard controls
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose, go]);

  const clampScale = (s: number) => Math.min(MAX, Math.max(1, s));

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    setAnimate(false);

    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinchStart.current = {
        dist: Math.hypot(a.x - b.x, a.y - b.y),
        scale,
        mid: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 },
        pos,
      };
      drag.current = null;
    } else {
      drag.current = { x: e.clientX, y: e.clientY, pos, t: Date.now() };
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const ns = clampScale(pinchStart.current.scale * (dist / pinchStart.current.dist));
      const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      setScale(ns);
      setPos({
        x: pinchStart.current.pos.x + (mid.x - pinchStart.current.mid.x),
        y: pinchStart.current.pos.y + (mid.y - pinchStart.current.mid.y),
      });
      return;
    }

    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    const dy = e.clientY - drag.current.y;
    if (scale > 1) {
      setPos({ x: drag.current.pos.x + dx, y: drag.current.pos.y + dy });
    } else {
      setSwipeDX(dx); // visual feedback for swipe
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const d = drag.current;
    pointers.current.delete(e.pointerId);
    setAnimate(true);

    if (d && pointers.current.size === 0) {
      const dx = e.clientX - d.x;
      const dy = e.clientY - d.y;
      const dt = Date.now() - d.t;
      const moved = Math.abs(dx) + Math.abs(dy);

      // Tap / double-tap
      if (moved < 8 && dt < 250) {
        const now = Date.now();
        if (now - lastTap.current < 300) {
          // double tap: toggle zoom
          if (scale > 1) reset();
          else setScale(2.5);
          lastTap.current = 0;
        } else {
          lastTap.current = now;
        }
      } else if (scale === 1 && Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
        // swipe to change image
        go(dx < 0 ? 1 : -1);
      }
      setSwipeDX(0);
      drag.current = null;
    }

    if (pointers.current.size < 2 && scale < 1.05) reset();
  };

  const onWheel = (e: React.WheelEvent) => {
    setAnimate(false);
    setScale((s) => {
      const ns = clampScale(s - e.deltaY * 0.0015 * s);
      if (ns <= 1.01) setPos({ x: 0, y: 0 });
      return ns;
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[100] flex flex-col bg-charcoal/96 backdrop-blur-sm"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-4 text-ivory">
          <span className="text-[12px] uppercase tracking-wide2 text-ivory/70">
            {index + 1} / {images.length}
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-10 w-10 place-items-center rounded-full border border-ivory/25 transition hover:bg-ivory hover:text-charcoal"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Stage */}
        <div
          className="relative flex-1 touch-none select-none overflow-hidden"
          style={{ touchAction: 'none' }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onWheel={onWheel}
        >
          <div
            className="absolute inset-0"
            style={{
              transform: `translate(${pos.x + (scale === 1 ? swipeDX : 0)}px, ${pos.y}px) scale(${scale})`,
              transition: animate ? 'transform 0.25s cubic-bezier(0.22,1,0.36,1)' : 'none',
            }}
          >
            <Image
              src={img(images[index], 1800, 90)}
              alt={`${name} — image ${index + 1}`}
              fill
              priority
              sizes="100vw"
              className="object-contain"
              draggable={false}
            />
          </div>

          {/* Prev / Next (hidden on small screens — use swipe there) */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => go(-1)}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-ivory/10 text-ivory backdrop-blur transition hover:bg-ivory hover:text-charcoal sm:grid"
              >
                <ChevronLeft size={20} strokeWidth={1.5} />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next image"
                className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-ivory/10 text-ivory backdrop-blur transition hover:bg-ivory hover:text-charcoal sm:grid"
              >
                <ChevronRight size={20} strokeWidth={1.5} />
              </button>
            </>
          )}

          {/* Hint */}
          {scale === 1 && (
            <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-charcoal/60 px-4 py-1.5 text-[10px] uppercase tracking-wide2 text-ivory/80">
              <span className="inline-flex items-center gap-1.5">
                <ZoomIn size={12} /> Pinch · double-tap · scroll to zoom
              </span>
            </div>
          )}
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="flex justify-center gap-2 px-5 py-4">
            {images.map((im, i) => (
              <button
                key={i}
                onClick={() => {
                  setAnimate(true);
                  onIndex(i);
                }}
                aria-label={`Go to image ${i + 1}`}
                className={`relative h-14 w-14 shrink-0 overflow-hidden rounded transition ${
                  i === index ? 'ring-2 ring-ivory' : 'opacity-50 hover:opacity-90'
                }`}
              >
                <Image src={img(im, 160)} alt="" fill sizes="56px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
