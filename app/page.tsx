import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";
import FeaturedEditorial from "@/components/FeaturedEditorial";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <FeaturedEditorial />
      <AboutSection />
      <ContactSection />
    </>
  );
}
