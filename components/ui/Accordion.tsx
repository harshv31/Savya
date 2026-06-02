'use client';

import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

type Item = { title: string; content: ReactNode };

export default function Accordion({
  items,
  defaultOpen = 0,
}: {
  items: Item[];
  defaultOpen?: number;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className="divide-y divide-charcoal/10 border-y border-charcoal/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.title}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between py-5 text-left"
            >
              <span className="font-serif text-xl text-charcoal">{item.title}</span>
              <span className="text-walnut">
                {isOpen ? <Minus size={18} strokeWidth={1.5} /> : <Plus size={18} strokeWidth={1.5} />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 text-sm leading-relaxed text-cocoa">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
