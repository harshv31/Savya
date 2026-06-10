'use client';

import { useEffect, useState } from 'react';

const UNITS = ['Days', 'Hours', 'Minutes', 'Seconds'] as const;

function remaining(target: number) {
  const d = Math.max(0, target - Date.now());
  return [
    Math.floor(d / 86400000),
    Math.floor(d / 3600000) % 24,
    Math.floor(d / 60000) % 60,
    Math.floor(d / 1000) % 60,
  ];
}

/**
 * Launch countdown. Renders em-dashes until mounted so the statically
 * exported HTML never mismatches the client clock.
 */
export default function Countdown({ target }: { target: string }) {
  const [vals, setVals] = useState<number[] | null>(null);

  useEffect(() => {
    const ts = new Date(target).getTime();
    setVals(remaining(ts));
    const t = setInterval(() => setVals(remaining(ts)), 1000);
    return () => clearInterval(t);
  }, [target]);

  return (
    <div className="flex items-start justify-center gap-6 sm:gap-12">
      {UNITS.map((unit, i) => (
        <div key={unit} className="text-center">
          <p className="font-serif text-4xl tabular-nums text-ivory sm:text-6xl">
            {vals ? String(vals[i]).padStart(2, '0') : '——'}
          </p>
          <p className="mt-3 text-[9px] uppercase tracking-luxe text-ivory/60 sm:text-[10px]">
            {unit}
          </p>
        </div>
      ))}
    </div>
  );
}
