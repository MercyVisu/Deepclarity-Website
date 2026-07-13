import { HeroSection } from "@/components/home/hero-section";
import { CoverBanner } from "@/components/home/cover-banner";
import { StatsSection } from "@/components/home/stats-section";
import { WhyDeepClariti } from "@/components/home/why-deepclariti";
import { AboutFounder } from "@/components/home/about-founder";
import { ServicesSection } from "@/components/home/services-section";
import { CareerJourney } from "@/components/home/career-journey";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FAQSection } from "@/components/home/faq-section";
import { CTASection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CoverBanner />
      <StatsSection />
      <WhyDeepClariti />
      <AboutFounder />
      <ServicesSection />
      <CareerJourney />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}