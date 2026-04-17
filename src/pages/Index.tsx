import Navbar from "./_components/Navbar";
import Hero from "./_components/Hero";
import ServicesGrid from "./_components/ServicesGrid";
import WhyUs from "./_components/WhyUs";
import Testimonials from "./_components/Testimonials";
import ContactSection from "./_components/ContactSection";
import Footer from "./_components/Footer";

export default function Index() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-foreground">
      <Navbar />
      <Hero />
      <ServicesGrid />
      <WhyUs />
      <Testimonials />
      <ContactSection />
      <Footer />
    </div>
  );
}
