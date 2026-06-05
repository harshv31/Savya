import type { Metadata } from 'next';
import Link from 'next/link';
import { img, IMAGES } from '@/lib/images';
import PageHeader from '@/components/ui/PageHeader';
import Reveal from '@/components/ui/Reveal';
import RevealImage from '@/components/ui/RevealImage';

export const metadata: Metadata = {
  title: 'Bespoke & Custom Furniture',
  description:
    'Commission a one-of-a-kind piece with Savya — your dimensions, your materials, made by hand in our atelier.',
};

const steps = [
  { n: '01', t: 'The brief', d: 'Share your room, your reference and the feeling you’re after. Nothing is too early.' },
  { n: '02', t: 'The drawing', d: 'Our studio returns sketches, dimensions and material options tailored to your space.' },
  { n: '03', t: 'The making', d: 'Master artisans build your piece by hand — you approve materials at each stage.' },
  { n: '04', t: 'The delivery', d: 'White-glove delivery, assembled and placed, with all packaging removed.' },
];

export default function CustomPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Bespoke"
        title="Made Only for You"
        description="Most of what we make begins as a conversation. Commission a piece to your exact dimensions, materials and finish — entirely your own."
        image={IMAGES.craft}
      />

      <section className="section-pad bg-ivory">
        <div className="container-editorial grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <RevealImage
            src={img(IMAGES.atelier, 1100)}
            alt="An artisan shaping a bespoke commission"
            className="aspect-[4/5] w-full"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
          <div>
            <Reveal>
              <p className="eyebrow">The Commission</p>
              <h2 className="heading-serif mt-5 text-4xl md:text-5xl">
                A piece that exists
                <br />
                nowhere else
              </h2>
              <p className="mt-7 leading-relaxed text-cocoa">
                A sofa sized to the inch of your room. A dining table cut from a
                single slab you chose yourself. A finish matched to a fabric you
                already love. Our bespoke service turns a brief into an heirloom —
                designed with our studio, made by our artisans, and yours alone.
              </p>
              <p className="mt-5 leading-relaxed text-cocoa">
                There is no premium for imagination. Bespoke commissions are priced
                like our collection — by materials, scale and hours of handwork.
              </p>
              <Link href="/consultation" className="btn-solid mt-9">
                Start a Commission
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-pad texture-grain-strong bg-ebony text-ivory">
        <div className="container-editorial">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow text-brass/80">How a Commission Works</p>
              <h2 className="heading-serif mt-5 text-4xl text-ivory md:text-5xl">
                From a conversation to your room
              </h2>
            </div>
          </Reveal>
          <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={(i % 4) * 0.08}>
                <div>
                  <p className="font-serif text-5xl text-brass">{s.n}</p>
                  <h3 className="mt-5 font-serif text-2xl">{s.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ivory/65">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-16 text-center">
              <Link href="/consultation" className="btn-luxe bg-ivory text-ebony hover:bg-cream">
                Book a Design Consultation
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
