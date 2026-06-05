import type { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Speak with the Savya studio — showroom visits, orders, trade and press.',
};

const details = [
  { icon: Mail, label: 'Email', value: 'studio@savya.com', href: 'mailto:studio@savya.com' },
  { icon: Phone, label: 'Telephone', value: '+91 98765 43210', href: 'tel:+919876543210' },
  { icon: MapPin, label: 'Showroom', value: 'By appointment · New Delhi & Mumbai' },
  { icon: Clock, label: 'Studio Hours', value: 'Mon–Sat, 10am – 7pm IST' },
];

export default function ContactPage() {
  return (
    <div className="bg-ivory pt-[68px] md:pt-[108px]">
      <section className="section-pad">
        <div className="container-editorial grid gap-16 lg:grid-cols-2">
          <Reveal>
            <div>
              <p className="eyebrow">Contact</p>
              <h1 className="heading-serif mt-5 text-5xl md:text-6xl">
                We’d love to
                <br />
                hear from you
              </h1>
              <p className="mt-7 max-w-md leading-relaxed text-cocoa">
                Whether you’re planning a single piece or a whole home, our studio
                is here to help. For the fastest start, book a complimentary design
                consultation — otherwise, reach us directly below.
              </p>

              <dl className="mt-12 space-y-8">
                {details.map((d) => (
                  <div key={d.label} className="flex items-start gap-4">
                    <d.icon size={20} strokeWidth={1.5} className="mt-0.5 text-walnut" />
                    <div>
                      <dt className="eyebrow text-stone">{d.label}</dt>
                      <dd className="mt-1.5 text-lg text-charcoal">
                        {d.href ? (
                          <a href={d.href} className="link-underline">{d.value}</a>
                        ) : (
                          d.value
                        )}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form className="space-y-6 bg-cream p-8 md:p-10" action="#">
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="eyebrow text-charcoal">Name</span>
                  <input className="mt-3 w-full border-b border-charcoal/20 bg-transparent pb-3 text-charcoal focus:border-charcoal focus:outline-none" />
                </label>
                <label className="block">
                  <span className="eyebrow text-charcoal">Email</span>
                  <input type="email" className="mt-3 w-full border-b border-charcoal/20 bg-transparent pb-3 text-charcoal focus:border-charcoal focus:outline-none" />
                </label>
              </div>
              <label className="block">
                <span className="eyebrow text-charcoal">Subject</span>
                <select className="mt-3 w-full border-b border-charcoal/20 bg-transparent pb-3 text-charcoal focus:border-charcoal focus:outline-none">
                  <option>A product enquiry</option>
                  <option>A bespoke commission</option>
                  <option>Trade / interior designer</option>
                  <option>Press</option>
                </select>
              </label>
              <label className="block">
                <span className="eyebrow text-charcoal">Message</span>
                <textarea rows={5} className="mt-3 w-full resize-none border-b border-charcoal/20 bg-transparent pb-3 text-charcoal focus:border-charcoal focus:outline-none" />
              </label>
              <button type="submit" className="btn-solid w-full">Send Message</button>
              <p className="text-center text-xs text-stone">We reply within one business day.</p>
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
