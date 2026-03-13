import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import AppPreview from "../components/AppPreview";
import WhyChooseUs from "../components/WhyChooseUs";
import CTA from "../components/CTA";
import WhoWeAre from "../components/WhoWeAre";
import Advertisement from "../components/Advertisement";
import BoardWorkflow from "../components/BoardWorkflow";
import DashboardPreview from "../components/DashboardPreview";


export default function Home() {
  return (
    <>
      <Hero />
      
      <Features />
      <DashboardPreview />
      <HowItWorks />
        <BoardWorkflow />
      <AppPreview />
      <WhyChooseUs />
      <CTA />
      <Advertisement />

    </>
  );
}
