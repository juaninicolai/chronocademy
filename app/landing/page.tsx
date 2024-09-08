import Hero from "@/app/components/Hero";
import FeatureList from "@/app/components/FeatureList";
import HowItWorks from "@/app/components/HowItWorks";
import FAQs from "@/app/components/FAQs";
import AboutUs from "@/app/components/AboutUs";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <FeatureList />
      <HowItWorks />
      <FAQs />
      <AboutUs />
    </>
  );
}
