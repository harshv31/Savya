import Hero from '@/components/home/Hero';
import FeaturedCollections from '@/components/home/FeaturedCollections';
import BrandStory from '@/components/home/BrandStory';
import BestSellers from '@/components/home/BestSellers';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Inspiration from '@/components/home/Inspiration';
import Testimonials from '@/components/home/Testimonials';
import ConsultationCTA from '@/components/home/ConsultationCTA';
import Marquee from '@/components/home/Marquee';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedCollections />
      <BrandStory />
      <BestSellers />
      <WhyChooseUs />
      <Inspiration />
      <Testimonials />
      <ConsultationCTA />
    </>
  );
}
