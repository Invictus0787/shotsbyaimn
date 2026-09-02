import type { Metadata } from "next";
import PortraitsSection from "@/components/PortraitsSection";

export const metadata: Metadata = {
  title: "Portraits",
  description:
    "An open portrait series of artists, producers, and collaborators.",
};

export default function PortraitsPage() {
  return <PortraitsSection standalone />;
}
