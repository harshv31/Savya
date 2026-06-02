'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { testimonials } from '@/lib/data';

export default function Testimonials() {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);

  const paginate = (d: number) => {
    setState(([i]) => [(i + d + testimonials.length) % testimonials.length, d]);
  };

  const t = testimonials[index];

  return (
    <section className="bg-ivory py-24 md:py-32">
      <div className="container-editorial">
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow">Words from Our Clients</p>

          <div className="relative mt-10 min-h-[260px] md:min-h-[240px]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.figure
                key={index}
                custom={dir}
                initial={{ opacity: 0, x: dir >= 0 ? 40 : -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir >= 0 ? -40 : 40 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="font-serif text-7xl leading-none text-taupe/50">“</span>
                <blockquote className="heading-serif -mt-6 text-2xl leading-snug text-charcoal md:text-[2rem]">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8">
                  <p className="text-sm uppercase tracking-wide2 text-charcoal">{t.name}</p>
                  <p className="mt-1 text-xs text-stone">{t.role}</p>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              onClick={() => paginate(-1)}
              aria-label="Previous testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-charcoal/20 text-charcoal transition hover:bg-charcoal hover:text-ivory"
            >
              <ArrowLeft size={17} strokeWidth={1.5} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setState([i, i > index ? 1 : -1])}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === index ? 'w-7 bg-walnut' : 'w-1.5 bg-taupe/50'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => paginate(1)}
              aria-label="Next testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-charcoal/20 text-charcoal transition hover:bg-charcoal hover:text-ivory"
            >
              <ArrowRight size={17} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
