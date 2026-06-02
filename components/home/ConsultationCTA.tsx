'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { img, IMAGES } from '@/lib/images';

export default function ConsultationCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 scale-125">
        <Image
          src={img(IMAGES.consultation, 2000, 80)}
          alt="A Savya designer reviewing fabric samples with a client"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/60" />
      </motion.div>

      <div className="relative z-10 flex min-h-[520px] items-center py-28">
        <div className="container-editorial text-center text-ivory">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-2xl"
          >
            <p className="eyebrow text-ivory/70">Complimentary &amp; Personal</p>
            <h2 className="heading-serif mt-5 text-5xl text-ivory md:text-6xl">
              Create Your Dream Home
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ivory/80 md:text-lg">
              Sit with one of our designers — in our showroom or your own living
              room. Together we’ll plan the pieces, fabrics and proportions that
              make a house unmistakably yours.
            </p>
            <Link href="/consultation" className="btn-luxe mt-10 bg-ivory text-charcoal hover:bg-cream">
              Book a Free Design Consultation
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
