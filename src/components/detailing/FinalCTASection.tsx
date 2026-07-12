import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useDetailingModal } from "@/contexts/DetailingModalContext";

export default function DetailingFinalCTA() {
  const { showDetailingModal } = useDetailingModal();

  return (
    <section className="py-16 sm:py-24 md:py-32 relative overflow-hidden border-t border-white/5">
      <div className="detail-glow-orb w-96 h-96 bg-[#00e5ff]/8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="detail-section-label mb-4 block">Apex Web Worx</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6 max-w-3xl mx-auto">
            Want a Website Like This for Your Detailing Business?
          </h2>
          <p className="text-[#94a3b8] text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Apex Web Worx builds modern websites, booking systems, calendar integrations, admin
            dashboards, logos, and digital solutions for small businesses.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={showDetailingModal}
              className="detail-btn-primary inline-flex items-center justify-center px-8 py-4 text-sm rounded-md w-full sm:w-auto"
            >
              Request This Website
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={showDetailingModal}
              className="detail-btn-outline inline-flex items-center justify-center px-8 py-4 text-sm rounded-md w-full sm:w-auto"
            >
              Book a Free Consultation
            </button>
            <a
              href="https://apexwebworx.com"
              target="_blank"
              rel="noopener noreferrer"
              className="detail-btn-outline inline-flex items-center justify-center px-8 py-4 text-sm rounded-md w-full sm:w-auto"
            >
              Visit Apex Web Worx
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
