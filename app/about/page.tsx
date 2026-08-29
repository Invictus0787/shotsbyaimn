import type { Metadata } from "next";
import AboutSection from "@/components/AboutSection";

export const metadata: Metadata = {
  title: "About",
  description:
    "Aymane Rouchdi — Atlanta-based photographer, videographer, and independent media creator.",
};

export default function AboutPage() {
  return (
    <div className="pt-14 md:pt-20">
      <AboutSection />
    </div>
  );
}
