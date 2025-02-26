import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CTA from "@/components/CTA";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import MeetTheDevelopers from "@/components/MeetTheDevelopers";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks   />
      <Testimonials />
      <FAQ />
      <MeetTheDevelopers />
      <CTA />
      <Footer />

    </div>
  );
};

export default Home;
