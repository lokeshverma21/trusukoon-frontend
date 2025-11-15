import AboutSection from "@/components/home/AboutSection";
import CTASection from "@/components/home/CTASection";
import FAQSection from "@/components/home/FAQSection";
import Hero from "@/components/home/Hero";
import HomePage from "@/components/home/Home2";
import HowItWorks from "@/components/home/HowItWorks";
import ServicesSection from "@/components/home/ServicesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import TherapistsPreview from "@/components/home/TherapistsPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function Home() {
  return (
    <>
      <Hero/>
      <AboutSection/>
      <ServicesSection/>
      <TherapistsPreview/>
      <HowItWorks/>
      <WhyChooseUs/>
      <TestimonialsSection/>
      <FAQSection/>
      <CTASection/>
      {/* <HomePage/> */}
    </>
  );
}
