import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { img, IMAGES } from '@/lib/images';
import Reveal from '@/components/ui/Reveal';

export default function NoirTeaser() {
  return (
    <section className="relative overflow-hidden bg-ebony text-ivory">
      <Image
        src={img(IMAGES.insp4, 1800, 70)}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-20"
      />
      <div className="texture-grain-strong absolute inset-0 bg-gradient-to-r from-ebony via-ebony/80 to-ebony/40" />

      <div className="container-editorial relative py-28 md:py-36">
        <div className="max-w-2xl">
          <Reveal>
            <p className="eyebrow text-brass">A New Line · Arriving Autumn 2026</p>
            <h2 className="heading-serif mt-6 text-6xl tracking-[0.14em] pl-[0.14em] text-ivory md:text-8xl">
              NOIR
            </h2>
            <p className="mt-7 max-w-lg text-base font-light leading-relaxed text-ivory/75">
              Twelve unseen pieces in ebonised timber, smoked glass and
              hand-patinated brass. The private list sees them first.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <Link
              href="/noir"
              className="btn-luxe mt-11 border border-brass/70 text-brass hover:bg-brass hover:text-ebony"
            >
              Preview the Series <ArrowRight size={14} strokeWidth={1.6} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
