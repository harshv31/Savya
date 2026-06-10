import Link from 'next/link';
import { Instagram, Facebook, Linkedin } from 'lucide-react';

const columns = [
  {
    title: 'Collections',
    links: [
      { label: 'Shop All', href: '/shop' },
      { label: 'Living Room', href: '/collections/living-room' },
      { label: 'Dining Room', href: '/collections/dining-room' },
      { label: 'Bedroom', href: '/collections/bedroom' },
      { label: 'Outdoor', href: '/collections/outdoor' },
      { label: 'Lighting', href: '/collections/lighting' },
      { label: 'Decor', href: '/collections/decor' },
    ],
  },
  {
    title: 'The House',
    links: [
      { label: 'NOIR — New Line', href: '/noir' },
      { label: 'About Us', href: '/about' },
      { label: 'Custom Furniture', href: '/custom' },
      { label: 'Design Services', href: '/consultation' },
      { label: 'Featured Projects', href: '/projects' },
      { label: 'Journal', href: '/journal' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Client Care',
    links: [
      { label: 'Book a Consultation', href: '/consultation' },
      { label: 'Delivery & White Glove', href: '/info/delivery' },
      { label: 'Care & Repair', href: '/info/care' },
      { label: 'Trade Programme', href: '/info/trade' },
      { label: 'Returns', href: '/info/returns' },
      { label: 'FAQ', href: '/info/faq' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ebony text-ivory">
      {/* Newsletter */}
      <div className="border-b border-ivory/10">
        <div className="container-editorial grid gap-10 py-16 md:grid-cols-2 md:items-center">
          <div>
            <p className="eyebrow text-ivory/72">The Savya Letter</p>
            <h3 className="heading-serif mt-3 text-3xl md:text-4xl text-ivory">
              Considered living, delivered quietly.
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ivory/72">
              New collections, atelier stories and private previews — never more
              than twice a month.
            </p>
          </div>
          <form className="flex items-end gap-4" action="#">
            <label className="flex-1">
              <span className="eyebrow text-ivory/62">Email address</span>
              <input
                type="email"
                required
                placeholder="you@home.com"
                className="mt-3 w-full border-b border-ivory/30 bg-transparent pb-3 text-ivory placeholder:text-ivory/45 focus:border-ivory focus:outline-none"
              />
            </label>
            <button type="submit" className="btn-ghost-light shrink-0">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Link columns */}
      <div className="container-editorial grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <span className="font-serif text-3xl tracking-[0.3em] pl-[0.3em]">SAVYA</span>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory/72">
            Handcrafted furniture and bespoke interiors for a life lived
            beautifully. Made to order by master artisans, designed to last
            generations.
          </p>
          <div className="mt-7 flex items-center gap-4 text-ivory/70">
            <a
              href="https://www.instagram.com/savya_thedesignoflife"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-10 w-10 place-items-center rounded-full border border-ivory/20 transition hover:bg-ivory hover:text-charcoal"
            >
              <Instagram size={17} strokeWidth={1.5} />
            </a>
            <a href="#" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full border border-ivory/20 transition hover:bg-ivory hover:text-charcoal">
              <Facebook size={17} strokeWidth={1.5} />
            </a>
            <a href="#" aria-label="LinkedIn" className="grid h-10 w-10 place-items-center rounded-full border border-ivory/20 transition hover:bg-ivory hover:text-charcoal">
              <Linkedin size={17} strokeWidth={1.5} />
            </a>
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="eyebrow text-ivory/62">{col.title}</p>
            <ul className="mt-5 space-y-3 text-sm text-ivory/70">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="link-underline transition hover:text-ivory">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ivory/10">
        <div className="container-editorial flex flex-col items-center justify-between gap-4 py-7 text-[11px] uppercase tracking-wide2 text-ivory/55 md:flex-row">
          <p>© {new Date().getFullYear()} Savya — The Design of Life. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/info/privacy" className="hover:text-ivory/80">Privacy</Link>
            <Link href="/info/terms" className="hover:text-ivory/80">Terms</Link>
            <Link href="/info/sitemap" className="hover:text-ivory/80">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
