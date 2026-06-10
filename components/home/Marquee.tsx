const items = [
  'Handcrafted to Order',
  'NOIR — Arriving Autumn 2026',
  'White-Glove Delivery',
  'Bespoke Customization',
  'Lifetime Guarantee',
  'NOIR — Arriving Autumn 2026',
  'Made by Master Artisans',
  'Sustainable Sourcing',
];

export default function Marquee() {
  return (
    <div className="border-y border-charcoal/10 bg-ivory py-5">
      <div className="group relative flex overflow-hidden">
        <div className="flex shrink-0 animate-[marquee_38s_linear_infinite] items-center">
          {[...items, ...items].map((item, i) => (
            <span key={i} className="flex items-center">
              <span className="px-8 font-serif text-lg italic text-walnut">
                {item}
              </span>
              <span className="text-brass">✦</span>
            </span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
