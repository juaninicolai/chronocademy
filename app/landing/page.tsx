import Hero from "./Hero";
import FeatureList from "./FeatureList";
import HowItWorks from "./HowItWorks";
import FAQs from "./FAQs";
import AboutUs from "./AboutUs";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <FeatureList />
      <HowItWorks />
      <FAQs />
      <br /><br />
      <AboutUs />
    </>
  );
}
