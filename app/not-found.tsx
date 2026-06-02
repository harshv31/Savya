import Link from 'next/link';
import Image from 'next/image';
import { img, IMAGES } from '@/lib/images';

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <Image
        src={img(IMAGES.heroAlt, 1600, 70)}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-charcoal/65" />
      <div className="container-editorial relative z-10 text-center text-ivory">
        <p className="eyebrow text-ivory/70">Page Not Found</p>
        <h1 className="heading-serif mt-5 text-6xl md:text-7xl">
          This room is still
          <br />
          being furnished
        </h1>
        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-ivory/80">
          The page you’re looking for isn’t here yet. Let us guide you back to
          something beautiful.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/" className="btn-luxe bg-ivory text-charcoal hover:bg-cream">
            Return Home
          </Link>
          <Link href="/collections" className="btn-ghost-light">
            Explore Collections
          </Link>
        </div>
      </div>
    </section>
  );
}
