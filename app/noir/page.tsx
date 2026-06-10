import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { img, IMAGES } from '@/lib/images';
import Countdown from '@/components/noir/Countdown';
import WaitlistForm from '@/components/noir/WaitlistForm';
import Reveal from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'NOIR — A New Line, Arriving Soon',
  description:
    'NOIR, the next Savya series — our darkest, most sculptural work yet. Twelve pieces, one unveiling. Join the private preview list.',
};

// Unveiling date for the Noir series (IST).
const LAUNCH = '2026-09-15T00:00:00+05:30';

const teasers = [
  { id: IMAGES.credenza, no: 'I', hint: 'Storage, reconsidered' },
  { id: IMAGES.lamp1, no: 'II', hint: 'Light, held in brass' },
  { id: IMAGES.chair2, no: 'III', hint: 'A seat kept secret' },
];

export default function NoirPage() {
  return (
    <div className="bg-ebony text-ivory">
      {/* ——— Act I: the announcement ——— */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <Image
          src={img(IMAGES.insp4, 2000, 75)}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="texture-grain-strong absolute inset-0 bg-gradient-to-b from-ebony/60 via-transparent to-ebony" />

        <div className="container-editorial relative z-10 py-36 text-center md:py-44">
          <Reveal>
            <p className="eyebrow text-brass">A New Line · Autumn 2026</p>
            <h1 className="heading-serif mt-8 text-[22vw] leading-none tracking-[0.18em] pl-[0.18em] sm:text-9xl">
              NOIR
            </h1>
            <div className="mx-auto mt-8 h-px w-40 bg-brass/70" />
            <p className="mx-auto mt-8 max-w-xl text-base font-light leading-relaxed text-ivory/75 md:text-lg">
              Our darkest, most sculptural work yet. Ebonised timber, smoked
              glass, hand-patinated brass. Twelve pieces. One unveiling.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-16">
              <Countdown target={LAUNCH} />
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-16">
              <p className="mb-7 text-[11px] uppercase tracking-luxe text-ivory/60">
                Be first through the door
              </p>
              <WaitlistForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ——— Act II: veiled previews ——— */}
      <section className="section-pad relative">
        <div className="container-editorial">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow text-brass/80">First Glimpses</p>
              <h2 className="heading-serif mt-5 text-4xl text-ivory md:text-5xl">
                Twelve pieces, kept under wraps
              </h2>
              <p className="mt-6 leading-relaxed text-ivory/65">
                Until the unveiling, only silhouettes. Press and hold a veil if
                you must — some secrets soften under attention.
              </p>
            </div>
          </Reveal>

          <div className="mt-20 grid gap-6 sm:grid-cols-3">
            {teasers.map((t, i) => (
              <Reveal key={t.no} delay={(i % 3) * 0.1}>
                <figure className="group relative aspect-[3/4] overflow-hidden bg-ink">
                  <Image
                    src={img(t.id, 800, 70)}
                    alt={`Noir piece number ${t.no} — veiled preview`}
                    fill
                    sizes="(max-width:640px) 100vw, 33vw"
                    className="object-cover opacity-50 blur-md brightness-[0.55] saturate-50 transition-all duration-[1.6s] ease-luxe group-hover:opacity-75 group-hover:blur-[3px] group-hover:brightness-75 group-active:blur-[2px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ebony/85 via-ebony/20 to-ebony/30" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-7">
                    <p className="font-serif text-3xl text-brass">№ {t.no}</p>
                    <p className="mt-1.5 text-[11px] uppercase tracking-luxe text-ivory/70">
                      {t.hint}
                    </p>
                  </figcaption>
                  <span className="absolute right-5 top-5 border border-ivory/25 px-3 py-1 text-[9px] uppercase tracking-luxe text-ivory/70">
                    Unveils 15.09
                  </span>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Act III: the manifesto ——— */}
      <section className="section-pad border-t border-ivory/10">
        <div className="container-editorial">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-serif text-7xl leading-none text-brass/40">“</p>
              <p className="heading-serif -mt-7 text-3xl leading-snug text-ivory md:text-[2.6rem]">
                Every house has its daylight rooms. Noir is for the other hours —
                the lamp-lit, slow, after-dinner ones.
              </p>
              <p className="mt-9 text-xs uppercase tracking-luxe text-ivory/55">
                — The Savya Design Studio
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-20 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/consultation" className="btn-luxe bg-ivory text-ebony hover:bg-cream">
                Request a Private Preview
              </Link>
              <Link href="/collections" className="btn-ghost-light">
                Explore the Current Collection
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
