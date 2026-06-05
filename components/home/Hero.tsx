'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { img, IMAGES } from '@/lib/images';

const slides = [
  { id: IMAGES.heroLiving, caption: 'The Living Room Collection' },
  { id: IMAGES.heroAlt, caption: 'Made to order, by hand' },
  { id: IMAGES.insp1, caption: 'Interiors composed for living' },
];

const SLIDE_MS = 6000;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const overlayY = useTransform(scrollYProgress, [0, 1], ['0%', '38%']);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setActive((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <section ref={ref} className="relative h-screen min-h-[680px] overflow-hidden bg-ebony">
      {/* Crossfading slides with slow Ken-Burns zoom */}
      <motion.div style={{ y }} className="absolute inset-0">
        {slides.map((s, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: i === active ? 1 : 0 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="absolute inset-0"
              initial={false}
              animate={{ scale: i === active && !reduce ? 1.14 : 1.02 }}
              transition={{ duration: SLIDE_MS / 1000 + 1.8, ease: 'linear' }}
            >
              <Image
                src={img(s.id, 2200, 85)}
                alt={s.caption}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        ))}
        {/* Darker, more exclusive overlay — left scrim keeps the headline legible
            on every slide, regardless of the image behind it */}
        <div className="absolute inset-0 bg-gradient-to-r from-ebony/80 via-ebony/40 to-ebony/15" />
        <div className="absolute inset-0 bg-gradient-to-b from-ebony/40 via-transparent to-ebony/55" />
      </motion.div>

      {/* Headline */}
      <motion.div
        style={{ y: overlayY, opacity: fade }}
        className="relative z-10 flex h-full items-center"
      >
        <div className="container-editorial">
          <div className="max-w-3xl text-ivory">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="eyebrow text-ivory/75"
            >
              Handcrafted in our atelier · Made to order
            </motion.p>

            <h1 className="heading-serif mt-8 text-[13vw] leading-[1.02] sm:text-6xl lg:text-[5.4rem]">
              {['Furniture Crafted', 'for Beautiful Living'].map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.1, delay: 0.45 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.78, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9 max-w-xl text-base font-light leading-relaxed text-ivory/85 md:text-lg"
            >
              Timeless handcrafted furniture designed to transform your home into
              a sanctuary of comfort and elegance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 flex flex-col gap-4 sm:flex-row"
            >
              <Link href="/collections" className="btn-luxe bg-ivory text-ebony hover:bg-cream">
                Explore Collection
              </Link>
              <Link href="/consultation" className="btn-ghost-light">
                Book Design Consultation
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Slide indicators */}
      <div className="absolute bottom-9 left-0 right-0 z-10">
        <div className="container-editorial flex items-center justify-between">
          <div className="flex items-center gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="group py-2"
              >
                <span
                  className={`block h-px transition-all duration-700 ease-luxe ${
                    i === active ? 'w-12 bg-ivory' : 'w-6 bg-ivory/40 group-hover:bg-ivory/70'
                  }`}
                />
              </button>
            ))}
          </div>
          <motion.div style={{ opacity: fade }} className="hidden items-center gap-2 text-ivory/60 sm:flex">
            <span className="text-[10px] uppercase tracking-luxe">Scroll</span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown size={16} strokeWidth={1.4} />
            </motion.span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
