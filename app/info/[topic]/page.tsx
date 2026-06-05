import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { IMAGES } from '@/lib/images';
import PageHeader from '@/components/ui/PageHeader';
import Reveal from '@/components/ui/Reveal';

type Section = { h: string; p: string[] };
type Topic = { title: string; eyebrow: string; intro: string; image: string; sections: Section[] };

const TOPICS: Record<string, Topic> = {
  delivery: {
    title: 'Delivery & White Glove',
    eyebrow: 'Client Care',
    image: IMAGES.projects,
    intro:
      'Every Savya piece is delivered by our white-glove partners — unpacked, assembled and placed in your room, with all packaging removed.',
    sections: [
      { h: 'Lead times', p: ['As each piece is made to order, lead times run 6–14 weeks depending on the design. Your exact estimate is confirmed at checkout and again when your piece enters production.'] },
      { h: 'White-glove service', p: ['Our team carries your piece into the room of your choice, assembles it, checks every detail with you, and removes all packaging. There is nothing left for you to do but enjoy it.'] },
      { h: 'Worldwide', p: ['We deliver across India and internationally. Overseas timelines and costs are quoted per project — your designer will walk you through everything before you commit.'] },
    ],
  },
  care: {
    title: 'Care & Repair',
    eyebrow: 'Client Care',
    image: IMAGES.craft,
    intro:
      'Our pieces are built to be repaired, not replaced. With a little care they only grow more beautiful with the years.',
    sections: [
      { h: 'Everyday care', p: ['Dust timber with a dry, lint-free cloth following the grain. Vacuum upholstery gently with a soft brush head. Blot spills immediately — never rub the weave.'] },
      { h: 'Timber finishes', p: ['Re-oil solid-wood pieces every 12–18 months with our care kit to nourish the grain and even the tone. Keep furniture out of prolonged direct sunlight and away from heating vents.'] },
      { h: 'Lifetime guarantee', p: ['Every Savya frame carries a lifetime craftsmanship guarantee. Should anything ever need attention, our atelier is here to restore it.'] },
    ],
  },
  returns: {
    title: 'Returns & Exchanges',
    eyebrow: 'Client Care',
    image: IMAGES.story,
    intro:
      'We want you to love your piece for a lifetime. Here is how returns work on made-to-order and in-stock items.',
    sections: [
      { h: 'In-stock pieces', p: ['In-stock items may be returned within 14 days of delivery in their original condition. Collection is arranged by our white-glove team.'] },
      { h: 'Made-to-order & bespoke', p: ['As these are crafted specifically for you, they are not eligible for return except in the case of a fault. We review and approve every detail with you before production begins, precisely to avoid surprises.'] },
      { h: 'Something not right?', p: ['If a piece arrives with any fault, contact the studio within 48 hours and we will make it right — repair, remake or refund.'] },
    ],
  },
  trade: {
    title: 'Trade Programme',
    eyebrow: 'For Professionals',
    image: IMAGES.atelier,
    intro:
      'A dedicated programme for interior designers, architects and stylists — trade pricing, a personal account manager and priority production.',
    sections: [
      { h: 'Benefits', p: ['Preferential trade pricing across the collection and bespoke work, a dedicated account manager, fabric and finish libraries, and priority lead times for project deadlines.'] },
      { h: 'Bespoke at scale', p: ['From a single statement piece to a whole-home fit-out, our atelier works to your drawings, dimensions and specification.'] },
      { h: 'Apply', p: ['Tell us about your studio and we’ll set up your trade account within two business days.'] },
    ],
  },
  faq: {
    title: 'Frequently Asked',
    eyebrow: 'Good to Know',
    image: IMAGES.heroAlt,
    intro: 'The questions we’re asked most often. Can’t find yours? The studio is a message away.',
    sections: [
      { h: 'Is everything made to order?', p: ['Yes. Each piece is built by hand once you order, which is why lead times run 6–14 weeks. It also means you can tailor fabric, finish and — for many pieces — dimensions.'] },
      { h: 'Can I request my own fabric?', p: ['Absolutely. Beyond our house fabrics you can supply your own material (COM). Your designer will advise on quantities.'] },
      { h: 'Do you offer samples?', p: ['Yes — request fabric and finish swatches from any product page, or as part of a consultation.'] },
      { h: 'How do I start a bespoke piece?', p: ['Book a complimentary consultation and share your brief. Most commissions begin as a simple conversation.'] },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    eyebrow: 'Legal',
    image: IMAGES.decor,
    intro: 'How Savya collects, uses and protects your information.',
    sections: [
      { h: 'What we collect', p: ['We collect only what we need to serve you — your name, contact details and order information when you enquire, consult or purchase.'] },
      { h: 'How we use it', p: ['To respond to enquiries, fulfil orders, arrange delivery and, with your consent, send occasional studio news. We never sell your data.'] },
      { h: 'Your rights', p: ['You may request access to, correction of, or deletion of your data at any time by contacting the studio. This is placeholder copy for a showcase build — replace with your finalised policy before launch.'] },
    ],
  },
  terms: {
    title: 'Terms of Service',
    eyebrow: 'Legal',
    image: IMAGES.projects,
    intro: 'The terms on which we provide our products and services.',
    sections: [
      { h: 'Orders', p: ['Placing an order constitutes an offer to purchase. As pieces are made to order, production begins once your specification and payment are confirmed.'] },
      { h: 'Pricing', p: ['Prices are quoted excluding delivery unless stated. Bespoke work is quoted per project before you commit.'] },
      { h: 'Note', p: ['This is placeholder copy for a showcase build — replace with your finalised terms before launch.'] },
    ],
  },
  sitemap: {
    title: 'Sitemap',
    eyebrow: 'Navigation',
    image: IMAGES.heroLiving,
    intro: 'Everything on Savya, in one place.',
    sections: [
      { h: 'Shop', p: ['Collections · Bestsellers · New Arrivals · Bespoke & Custom'] },
      { h: 'The House', p: ['About · Projects · Journal · Design Consultation · Contact'] },
      { h: 'Client Care', p: ['Delivery · Care & Repair · Returns · Trade Programme · FAQ'] },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(TOPICS).map((topic) => ({ topic }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic } = await params;
  const t = TOPICS[topic];
  if (!t) return { title: 'Not Found' };
  return { title: t.title, description: t.intro };
}

export default async function InfoPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const t = TOPICS[topic];
  if (!t) notFound();

  return (
    <div>
      <PageHeader eyebrow={t.eyebrow} title={t.title} description={t.intro} image={t.image} />
      <section className="section-pad bg-ivory">
        <div className="container-editorial max-w-3xl">
          <div className="space-y-14">
            {t.sections.map((s) => (
              <Reveal key={s.h}>
                <div className="border-t border-charcoal/10 pt-10">
                  <h2 className="font-serif text-2xl text-charcoal md:text-3xl">{s.h}</h2>
                  {s.p.map((para, i) => (
                    <p key={i} className="mt-4 leading-relaxed text-cocoa">{para}</p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-16 flex flex-col gap-4 border-t border-charcoal/10 pt-12 sm:flex-row">
              <Link href="/consultation" className="btn-solid">Book a Consultation</Link>
              <Link href="/contact" className="btn-outline">Contact the Studio</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
