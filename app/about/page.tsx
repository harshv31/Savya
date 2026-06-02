import type { Metadata } from 'next';
import Link from 'next/link';
import { img, IMAGES } from '@/lib/images';
import PageHeader from '@/components/ui/PageHeader';
import Reveal from '@/components/ui/Reveal';
import RevealImage from '@/components/ui/RevealImage';

export const metadata: Metadata = {
  title: 'About the Atelier',
  description:
    'The story of Savya — handcrafted furniture made by master artisans from sustainable materials, designed to last generations.',
};

const values = [
  { t: 'Made by Hand', d: 'Every piece is built to order in our atelier — never mass-produced, never hurried.' },
  { t: 'Sustainably Sourced', d: 'FSC-certified timber, natural latex and responsibly tanned leather, traceable to origin.' },
  { t: 'Built to Last', d: 'Repairable frames and a lifetime craftsmanship guarantee. We build heirlooms, not waste.' },
];

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Our Story"
        title="The Design of Life"
        description="Savya was founded on a quiet belief — that the objects we live with should be made slowly, by hand, and built to be loved for generations."
        image={IMAGES.atelier}
      />

      {/* Intro */}
      <section className="bg-ivory py-20 md:py-28">
        <div className="container-editorial grid gap-14 lg:grid-cols-2 lg:gap-20 lg:items-center">
          <Reveal>
            <div>
              <p className="eyebrow">The Beginning</p>
              <h2 className="heading-serif mt-4 text-4xl md:text-5xl">
                A house built on craft, patience and material honesty
              </h2>
              <p className="mt-6 text-base leading-relaxed text-cocoa">
                Savya — “the design of life” — grew from a small atelier and a
                simple frustration: that so much furniture is made to be replaced.
                We set out to do the opposite. To work with master artisans, source
                materials we could stand behind, and make pieces slow enough to last
                a lifetime.
              </p>
              <p className="mt-5 text-base leading-relaxed text-cocoa">
                Today, every Savya piece still carries the marks of the hands that
                made it — the hand-tied frame, the oil-rubbed grain, the signed seam.
                It is furniture with quiet presence, designed to make a house feel
                like a home.
              </p>
              <Link href="/consultation" className="btn-outline mt-9">
                Work With Our Studio
              </Link>
            </div>
          </Reveal>
          <RevealImage
            src={img(IMAGES.story, 1100)}
            alt="Inside the Savya atelier"
            className="aspect-[4/5] w-full"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* Values */}
      <section className="bg-charcoal py-20 text-ivory md:py-28">
        <div className="container-editorial">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow text-ivory/60">What We Stand For</p>
              <h2 className="heading-serif mt-4 text-4xl text-ivory md:text-5xl">
                Three commitments, kept by hand
              </h2>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden border border-ivory/10 bg-ivory/10 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={(i % 3) * 0.08}>
                <div className="h-full bg-charcoal p-10">
                  <p className="font-serif text-5xl text-brass">0{i + 1}</p>
                  <h3 className="mt-5 font-serif text-2xl">{v.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ivory/60">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="bg-cream py-24 text-center md:py-32">
        <div className="container-editorial mx-auto max-w-3xl">
          <Reveal>
            <p className="font-serif text-7xl leading-none text-taupe/50">“</p>
            <p className="heading-serif -mt-6 text-3xl leading-snug text-charcoal md:text-[2.4rem]">
              We don’t make furniture to fill a room. We make it to be the reason
              you never want to leave one.
            </p>
            <p className="mt-8 text-xs uppercase tracking-luxe text-stone">
              — The Founders, Savya
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
