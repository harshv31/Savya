'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, Heart, User, ShoppingBag, Menu, X } from 'lucide-react';
import { collections } from '@/lib/data';
import { img, IMAGES } from '@/lib/images';

const furnitureLinks = [
  { label: 'Sofas', href: '/collections/living-room' },
  { label: 'Lounge Chairs', href: '/collections/living-room' },
  { label: 'Beds', href: '/collections/bedroom' },
  { label: 'Dining Tables', href: '/collections/dining-room' },
  { label: 'Storage & Credenzas', href: '/collections/living-room' },
  { label: 'Side Tables', href: '/collections/living-room' },
];

const primaryLinks = [
  { label: 'Collections', mega: 'collections' },
  { label: 'Furniture', mega: 'furniture' },
  { label: 'Lighting', href: '/collections/lighting' },
  { label: 'Projects', href: '/projects' },
  { label: 'Journal', href: '/journal' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Routes that lead with a light-toned hero need a solid navbar from the top,
  // otherwise the ivory nav text would be invisible over the pale background.
  const lightTop =
    pathname.startsWith('/products/') || pathname.startsWith('/consultation');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solid = scrolled || openMega !== null || lightTop;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      onMouseLeave={() => setOpenMega(null)}
    >
      {/* Announcement bar */}
      <div
        className={`hidden md:block overflow-hidden transition-all duration-500 ease-luxe ${
          scrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'
        }`}
      >
        <div className="bg-ebony text-ivory">
          <p className="container-editorial py-2.5 text-center text-[10.5px] uppercase tracking-luxe">
            Complimentary design consultation &amp; white-glove delivery worldwide
          </p>
        </div>
      </div>

      <div
        className={`transition-all duration-500 ease-luxe ${
          solid
            ? 'bg-ivory/95 backdrop-blur-md border-b border-charcoal/10'
            : 'bg-transparent'
        }`}
      >
        <nav className="container-editorial flex h-[68px] items-center justify-between">
          {/* Left — primary nav */}
          <ul
            className={`hidden lg:flex items-center gap-8 text-[12px] uppercase tracking-wide2 font-medium ${
              solid ? 'text-charcoal' : 'text-ivory'
            }`}
          >
            {primaryLinks.map((item) => (
              <li
                key={item.label}
                onMouseEnter={() => setOpenMega(item.mega ?? null)}
              >
                {item.href ? (
                  <Link href={item.href} className="link-underline py-2">
                    {item.label}
                  </Link>
                ) : (
                  <button className="link-underline py-2">{item.label}</button>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile menu toggle */}
          <button
            className={`lg:hidden ${solid ? 'text-charcoal' : 'text-ivory'}`}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} strokeWidth={1.4} />
          </button>

          {/* Center — wordmark */}
          <Link
            href="/"
            className={`absolute left-1/2 -translate-x-1/2 text-center ${
              solid ? 'text-charcoal' : 'text-ivory'
            }`}
          >
            <span className="font-serif text-[26px] md:text-[30px] leading-none tracking-[0.32em] pl-[0.32em]">
              SAVYA
            </span>
            <span className="block text-[8px] uppercase tracking-luxe mt-1 opacity-80">
              The Design of Life
            </span>
          </Link>

          {/* Right — utilities */}
          <div
            className={`flex items-center gap-5 ${
              solid ? 'text-charcoal' : 'text-ivory'
            }`}
          >
            <button aria-label="Search" className="hidden sm:block hover:opacity-60 transition">
              <Search size={18} strokeWidth={1.5} />
            </button>
            <Link href="/wishlist" aria-label="Wishlist" className="hidden sm:block hover:opacity-60 transition">
              <Heart size={18} strokeWidth={1.5} />
            </Link>
            <Link href="/account" aria-label="Account" className="hidden sm:block hover:opacity-60 transition">
              <User size={18} strokeWidth={1.5} />
            </Link>
            <button aria-label="Cart" className="relative hover:opacity-60 transition">
              <ShoppingBag size={18} strokeWidth={1.5} />
              <span className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-brass text-[9px] text-ivory">
                2
              </span>
            </button>
          </div>
        </nav>

        {/* Mega menu */}
        <AnimatePresence>
          {openMega && (
            <motion.div
              key={openMega}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="border-t border-charcoal/10 bg-ivory"
              onMouseEnter={() => setOpenMega(openMega)}
            >
              <div className="container-editorial grid grid-cols-12 gap-10 py-10">
                {openMega === 'collections' ? (
                  <>
                    <div className="col-span-3">
                      <p className="eyebrow mb-5">Shop by Room</p>
                      <ul className="space-y-3">
                        {collections.map((c) => (
                          <li key={c.slug}>
                            <Link
                              href={`/collections/${c.slug}`}
                              className="link-underline font-serif text-xl text-charcoal"
                            >
                              {c.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="col-span-3">
                      <p className="eyebrow mb-5">Explore</p>
                      <ul className="space-y-3 text-[13px] text-cocoa">
                        <li><Link href="/collections" className="link-underline">All Collections</Link></li>
                        <li><Link href="/new-arrivals" className="link-underline">New Arrivals</Link></li>
                        <li><Link href="/bestsellers" className="link-underline">Bestsellers</Link></li>
                        <li><Link href="/custom" className="link-underline">Bespoke &amp; Custom</Link></li>
                        <li><Link href="/projects" className="link-underline">Featured Projects</Link></li>
                      </ul>
                    </div>
                    <MegaFeature
                      image={img(IMAGES.livingRoom, 700)}
                      eyebrow="The Serpentine Collection"
                      title="Made for beautiful living"
                      href="/collections/living-room"
                    />
                  </>
                ) : (
                  <>
                    <div className="col-span-3">
                      <p className="eyebrow mb-5">Furniture</p>
                      <ul className="space-y-3">
                        {furnitureLinks.map((l) => (
                          <li key={l.label}>
                            <Link href={l.href} className="link-underline font-serif text-xl text-charcoal">
                              {l.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="col-span-3">
                      <p className="eyebrow mb-5">By Material</p>
                      <ul className="space-y-3 text-[13px] text-cocoa">
                        <li><Link href="/collections" className="link-underline">American Walnut</Link></li>
                        <li><Link href="/collections" className="link-underline">European Oak</Link></li>
                        <li><Link href="/collections" className="link-underline">Belgian Linen</Link></li>
                        <li><Link href="/collections" className="link-underline">Full-grain Leather</Link></li>
                        <li><Link href="/collections" className="link-underline">Patinated Brass</Link></li>
                      </ul>
                    </div>
                    <MegaFeature
                      image={img(IMAGES.craft, 700)}
                      eyebrow="The Atelier"
                      title="Bespoke, configured to your room"
                      href="/custom"
                    />
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 w-[84%] max-w-sm bg-ivory px-8 py-7 lg:hidden"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-2xl tracking-[0.3em] pl-[0.3em]">SAVYA</span>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <X size={22} strokeWidth={1.4} />
                </button>
              </div>
              <ul className="mt-10 space-y-6">
                {collections.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/collections/${c.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="font-serif text-2xl text-charcoal"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="mt-10 space-y-4 text-[13px] uppercase tracking-wide2 text-cocoa">
                <li><Link href="/projects" onClick={() => setMobileOpen(false)}>Projects</Link></li>
                <li><Link href="/journal" onClick={() => setMobileOpen(false)}>Journal</Link></li>
                <li><Link href="/about" onClick={() => setMobileOpen(false)}>About</Link></li>
                <li><Link href="/consultation" onClick={() => setMobileOpen(false)}>Book a Consultation</Link></li>
              </ul>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

function MegaFeature({
  image,
  eyebrow,
  title,
  href,
}: {
  image: string;
  eyebrow: string;
  title: string;
  href: string;
}) {
  return (
    <Link href={href} className="col-span-6 group relative block overflow-hidden">
      <div className="relative aspect-[16/8] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="40vw"
          className="object-cover transition-transform duration-[1.4s] ease-luxe group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-7 text-ivory">
          <p className="eyebrow text-ivory/80 mb-2">{eyebrow}</p>
          <p className="font-serif text-2xl">{title}</p>
        </div>
      </div>
    </Link>
  );
}
