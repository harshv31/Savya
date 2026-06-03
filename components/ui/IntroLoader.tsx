'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

/**
 * Cinematic landing entrance: an ebony curtain with the SAVYA wordmark and a
 * drawn brass rule, which then lifts away to reveal the site. Plays once per
 * browser session. Respects reduced-motion preferences.
 */
export default function IntroLoader() {
  const [show, setShow] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (sessionStorage.getItem('savya_intro')) {
      setShow(false);
      return;
    }
    sessionStorage.setItem('savya_intro', '1');
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => setShow(false), reduce ? 600 : 2200);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = '';
    };
  }, [reduce]);

  useEffect(() => {
    if (!show) document.body.style.overflow = '';
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          className="texture-grain-strong fixed inset-0 z-[200] flex items-center justify-center bg-ebony"
          initial={{ opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: '-100%' }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="text-center text-ivory">
            <motion.p
              className="font-serif text-5xl tracking-[0.42em] pl-[0.42em] md:text-7xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              SAVYA
            </motion.p>
            <motion.div
              className="mx-auto mt-7 h-px bg-brass"
              initial={{ width: 0 }}
              animate={{ width: 190 }}
              transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.p
              className="mt-6 text-[10px] uppercase tracking-luxe text-ivory/55"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              The Design of Life
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
