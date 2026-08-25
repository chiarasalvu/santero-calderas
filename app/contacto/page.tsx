import type { Metadata } from "next";
import Hero from "@/components/contacto/Hero";
import ContactSection from "@/components/contacto/ContactSection";

export const metadata: Metadata = {
  title: "Contacto | Calderas Santero",
  description: "Escribinos para coordinar una instalación, reparación o mantenimiento.",
};

export default function Contacto() {
  return (
    <>
      <Hero />
      <ContactSection />
    </>
  );
}
