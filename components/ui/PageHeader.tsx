import Image from 'next/image';
import { img } from '@/lib/images';

export default function PageHeader({
  eyebrow,
  title,
  description,
  image,
  align = 'center',
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  image: string;
  align?: 'center' | 'left';
}) {
  return (
    <header className="relative flex h-[58vh] min-h-[420px] items-end overflow-hidden">
      <Image
        src={img(image, 2000, 80)}
        alt={title}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/25 to-charcoal/30" />
      <div
        className={`container-editorial relative z-10 pb-16 text-ivory ${
          align === 'center' ? 'text-center' : ''
        }`}
      >
        <div className={align === 'center' ? 'mx-auto max-w-3xl' : 'max-w-2xl'}>
          {eyebrow && <p className="eyebrow text-ivory/80">{eyebrow}</p>}
          <h1 className="heading-serif mt-4 text-5xl md:text-6xl">{title}</h1>
          {description && (
            <p className="mt-5 text-base leading-relaxed text-ivory/85 md:text-lg">
              {description}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}
