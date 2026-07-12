import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import ProcessSection from "@/components/landing/ProcessSection";
import AboutSection from "@/components/landing/AboutSection";
import MenuSection from "@/components/landing/MenuSection";
import ServicesSection from "@/components/landing/ServicesSection";
import GallerySection from "@/components/landing/GallerySection";
import TestimonialSection from "@/components/landing/TestimonialSection";
import CalendarPreviewSection from "@/components/landing/CalendarPreviewSection";
import AdminPreviewSection from "@/components/landing/AdminPreviewSection";
import SeoSection from "@/components/landing/SeoSection";
import BookingSection from "@/components/landing/BookingSection";
import FinalCTASection from "@/components/landing/FinalCTASection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="catering-site min-h-screen overflow-x-hidden bg-background text-foreground dark selection:bg-primary selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <ProcessSection />
        <AboutSection />
        <MenuSection />
        <ServicesSection />
        <GallerySection />
        <TestimonialSection />
        <CalendarPreviewSection />
        <AdminPreviewSection />
        <SeoSection />
        <BookingSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
