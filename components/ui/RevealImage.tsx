'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

type RevealImageProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  delay?: number;
};

/**
 * Editorial image reveal: a soft curtain slides away while the image
 * settles from a gentle scale. Respects reduced-motion preferences.
 */
export default function RevealImage({
  src,
  alt,
  className = '',
  imgClassName = 'object-cover',
  sizes = '100vw',
  priority = false,
  delay = 0,
}: RevealImageProps) {
  const reduce = useReducedMotion();
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="relative h-full w-full"
        initial={reduce ? false : { scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={imgClassName}
        />
      </motion.div>
      {!reduce && (
        <motion.span
          aria-hidden
          className="absolute inset-0 z-10 bg-cream"
          initial={{ scaleY: 1 }}
          whileInView={{ scaleY: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.1, delay, ease: [0.76, 0, 0.24, 1] }}
          style={{ transformOrigin: 'top' }}
        />
      )}
    </div>
  );
}
