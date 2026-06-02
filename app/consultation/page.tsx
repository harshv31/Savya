import type { Metadata } from 'next';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { img, IMAGES } from '@/lib/images';
import Reveal from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Book a Design Consultation',
  description:
    'Book a complimentary design consultation with a Savya designer — in our showroom or your own home. Bespoke furniture and interiors, planned around you.',
};

const benefits = [
  'A dedicated designer for your project',
  'Bespoke space planning & 3D visuals',
  'Fabric, finish & material curation',
  'Trade pricing for design professionals',
];

const steps = [
  { n: '01', t: 'Tell us about your space', d: 'Share your room, your style and the pieces you’re dreaming of.' },
  { n: '02', t: 'Meet your designer', d: 'In our showroom, by video, or at home — whatever suits you.' },
  { n: '03', t: 'Receive your proposal', d: 'A considered plan with drawings, fabrics and transparent pricing.' },
  { n: '04', t: 'We craft & deliver', d: 'Your pieces are made to order and placed with white-glove care.' },
];

export default function ConsultationPage() {
  return (
    <div className="pt-[68px]">
      <section className="grid lg:grid-cols-2">
        {/* Image side */}
        <div className="relative min-h-[420px] lg:min-h-[calc(100vh-68px)]">
          <Image
            src={img(IMAGES.consultation, 1400, 80)}
            alt="A Savya designer reviewing materials with a client"
            fill
            priority
            sizes="50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/20" />
          <div className="absolute bottom-0 left-0 p-10 text-ivory">
            <p className="font-serif text-3xl italic">“Design is the silent ambassador of your home.”</p>
          </div>
        </div>

        {/* Form side */}
        <div className="bg-ivory px-6 py-16 md:px-12 lg:px-16">
          <div className="mx-auto max-w-xl">
            <Reveal>
              <p className="eyebrow">Complimentary &amp; Personal</p>
              <h1 className="heading-serif mt-4 text-4xl md:text-5xl">
                Book a Design Consultation
              </h1>
              <p className="mt-5 text-base leading-relaxed text-cocoa">
                Sit with one of our designers and let’s plan a home that feels
                unmistakably yours. There’s no cost, and no obligation.
              </p>

              <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-cocoa">
                    <Check size={16} className="mt-0.5 shrink-0 text-walnut" strokeWidth={2} />
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <form className="mt-10 space-y-6" action="#">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="First name" name="first" />
                  <Field label="Last name" name="last" />
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Email" name="email" type="email" />
                  <Field label="Phone" name="phone" type="tel" />
                </div>

                <label className="block">
                  <span className="eyebrow text-charcoal">I’m interested in</span>
                  <select className="mt-3 w-full border-b border-charcoal/20 bg-transparent pb-3 text-charcoal focus:border-charcoal focus:outline-none">
                    <option>A full-room design</option>
                    <option>A bespoke single piece</option>
                    <option>A whole-home project</option>
                    <option>Trade / professional enquiry</option>
                  </select>
                </label>

                <label className="block">
                  <span className="eyebrow text-charcoal">How would you like to meet?</span>
                  <select className="mt-3 w-full border-b border-charcoal/20 bg-transparent pb-3 text-charcoal focus:border-charcoal focus:outline-none">
                    <option>In our showroom</option>
                    <option>Video consultation</option>
                    <option>At my home</option>
                  </select>
                </label>

                <label className="block">
                  <span className="eyebrow text-charcoal">Tell us about your project</span>
                  <textarea
                    rows={4}
                    placeholder="The room, your style, the pieces you have in mind…"
                    className="mt-3 w-full resize-none border-b border-charcoal/20 bg-transparent pb-3 text-charcoal placeholder:text-stone/60 focus:border-charcoal focus:outline-none"
                  />
                </label>

                <button type="submit" className="btn-solid w-full">
                  Request My Consultation
                </button>
                <p className="text-center text-xs text-stone">
                  We’ll be in touch within one business day.
                </p>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container-editorial">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow">How It Works</p>
              <h2 className="heading-serif mt-4 text-4xl md:text-5xl">
                From first sketch to your living room
              </h2>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={(i % 4) * 0.08}>
                <div>
                  <p className="font-serif text-5xl text-taupe">{s.n}</p>
                  <h3 className="mt-4 font-serif text-2xl text-charcoal">{s.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cocoa">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  type = 'text',
}: {
  label: string;
  name: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="eyebrow text-charcoal">{label}</span>
      <input
        type={type}
        name={name}
        className="mt-3 w-full border-b border-charcoal/20 bg-transparent pb-3 text-charcoal focus:border-charcoal focus:outline-none"
      />
    </label>
  );
}
