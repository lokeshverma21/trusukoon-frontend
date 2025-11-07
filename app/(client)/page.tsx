import CTASection from "@/components/home/CTASection";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function Home() {
  return (
    <>
      <div>
        <title>Premium Wellness</title>
        <meta name="description" content="Destination for relief and wellness." />
        <link rel="icon" href="/favicon.ico" />
      </div>

      <Hero/>
      <HowItWorks/>
      <WhyChooseUs/>
      <CTASection/>
    </>
  );
}
