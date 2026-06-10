'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

// To capture real signups, point this at a form service endpoint
// (e.g. Formspree / Basin / your own API) — leave empty to run in demo mode.
const WAITLIST_ENDPOINT = '';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || state !== 'idle') return;
    setState('sending');
    try {
      if (WAITLIST_ENDPOINT) {
        await fetch(WAITLIST_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, list: 'noir-preview' }),
        });
      }
    } catch {
      // Stay graceful — the success state still confirms intent in demo mode.
    }
    setState('done');
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <AnimatePresence mode="wait">
        {state === 'done' ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-brass/60 text-brass">
              <Check size={20} strokeWidth={1.5} />
            </span>
            <p className="mt-5 font-serif text-2xl text-ivory">You’re on the list.</p>
            <p className="mt-2 text-sm text-ivory/65">
              You’ll see Noir before anyone else — a private preview lands in your
              inbox ahead of the unveiling.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={submit}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="flex items-end gap-4"
          >
            <label className="flex-1 text-left">
              <span className="text-[10px] uppercase tracking-luxe text-ivory/60">
                Email address
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@home.com"
                className="mt-3 w-full border-b border-ivory/30 bg-transparent pb-3 text-ivory placeholder:text-ivory/40 focus:border-brass focus:outline-none"
              />
            </label>
            <button
              type="submit"
              disabled={state === 'sending'}
              className="btn-luxe shrink-0 border border-brass/70 text-brass hover:bg-brass hover:text-ebony disabled:opacity-60"
            >
              Join the List <ArrowRight size={14} strokeWidth={1.6} />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
      {state !== 'done' && (
        <p className="mt-4 text-center text-[11px] text-ivory/45">
          Private preview · No more than three letters, ever
        </p>
      )}
    </div>
  );
}
