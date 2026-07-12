import DetailingNavbar from "@/components/detailing/Navbar";
import DetailingHero from "@/components/detailing/Hero";
import DetailingServicesSection from "@/components/detailing/ServicesSection";
import DetailingGallerySection from "@/components/detailing/GallerySection";
import DetailingAddonsSection from "@/components/detailing/AddonsSection";
import DetailingWhyChooseSection from "@/components/detailing/WhyChooseSection";
import DetailingReviewsSection from "@/components/detailing/ReviewsSection";
import DetailingCalendarSection from "@/components/detailing/CalendarPreviewSection";
import DetailingBookingSection from "@/components/detailing/BookingSection";
import DetailingAdminSection from "@/components/detailing/AdminPreviewSection";
import DetailingSeoSection from "@/components/detailing/SeoSection";
import DetailingFinalCTA from "@/components/detailing/FinalCTASection";
import DetailingFooter from "@/components/detailing/Footer";
import "@/styles/detailing.css";

export default function DetailingHome() {
  return (
    <div className="detailing-site min-h-screen overflow-x-hidden selection:bg-[#00e5ff]/30 selection:text-white">
      <DetailingNavbar />
      <main>
        <DetailingHero />
        <DetailingServicesSection />
        <DetailingGallerySection />
        <DetailingBookingSection />
        <DetailingCalendarSection />
        <DetailingAddonsSection />
        <DetailingReviewsSection />
        <DetailingWhyChooseSection />
        <DetailingAdminSection />
        <DetailingSeoSection />
        <DetailingFinalCTA />
      </main>
      <DetailingFooter />
    </div>
  );
}
