import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';

export default function Placeholder({
  icon: Icon,
  eyebrow,
  title,
  body,
}: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <section className="flex min-h-[80vh] items-center bg-ivory pt-[68px] md:pt-[108px]">
      <div className="container-editorial">
        <div className="mx-auto max-w-xl text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-charcoal/15 text-walnut">
            <Icon size={26} strokeWidth={1.4} />
          </span>
          <p className="eyebrow mt-8">{eyebrow}</p>
          <h1 className="heading-serif mt-5 text-4xl md:text-5xl">{title}</h1>
          <p className="mx-auto mt-6 max-w-md leading-relaxed text-cocoa">{body}</p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/collections" className="btn-solid">Explore the Collection</Link>
            <Link href="/consultation" className="btn-outline">Book a Consultation</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
