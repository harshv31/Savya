'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { img, IMAGES } from '@/lib/images';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '24%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const overlayY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen min-h-[640px] overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src={img(IMAGES.heroLiving, 2000, 85)}
          alt="A handcrafted Savya living room bathed in warm light"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/20 to-charcoal/55" />
      </motion.div>

      <motion.div
        style={{ y: overlayY, opacity: fade }}
        className="relative z-10 flex h-full items-center"
      >
        <div className="container-editorial">
          <div className="max-w-2xl text-ivory">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="eyebrow text-ivory/80"
            >
              Handcrafted in our atelier · Made to order
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="heading-serif mt-6 text-[12vw] leading-[0.98] sm:text-6xl lg:text-[5.2rem]"
            >
              Furniture Crafted
              <br />
              for Beautiful Living
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 max-w-xl text-base leading-relaxed text-ivory/85 md:text-lg"
            >
              Timeless handcrafted furniture designed to transform your home into
              a sanctuary of comfort and elegance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.78, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <Link href="/collections" className="btn-luxe bg-ivory text-charcoal hover:bg-cream">
                Explore Collection
              </Link>
              <Link href="/consultation" className="btn-ghost-light">
                Book Design Consultation
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-ivory/70"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-luxe">Scroll</span>
          <motion.span
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={18} strokeWidth={1.4} />
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
}
