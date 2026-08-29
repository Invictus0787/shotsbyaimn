import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact SHOTS BY AIMN for media, editorial, artist coverage, and commissions.",
};

export default function ContactPage() {
  return (
    <div className="pt-14 md:pt-20">
      <ContactSection />
    </div>
  );
}
