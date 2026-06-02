import {
  Hammer,
  Gem,
  Ruler,
  Truck,
  ShieldCheck,
  Leaf,
} from 'lucide-react';
import { whyChooseUs } from '@/lib/data';
import Reveal from '@/components/ui/Reveal';

const icons = [Hammer, Gem, Ruler, Truck, ShieldCheck, Leaf];

export default function WhyChooseUs() {
  return (
    <section className="relative bg-charcoal py-24 text-ivory md:py-32">
      <div className="texture-grain absolute inset-0" />
      <div className="container-editorial relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-ivory/60">The Savya Promise</p>
            <h2 className="heading-serif mt-4 text-4xl text-ivory md:text-5xl">
              Why discerning homes
              <br />
              choose Savya
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden border border-ivory/10 bg-ivory/10 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={item.title} delay={(i % 3) * 0.08}>
                <div className="group h-full bg-charcoal p-10 transition-colors duration-500 hover:bg-cocoa/40">
                  <Icon size={28} strokeWidth={1.2} className="text-brass" />
                  <h3 className="mt-6 font-serif text-2xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ivory/60">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
