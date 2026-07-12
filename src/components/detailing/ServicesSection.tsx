import { motion } from "framer-motion";
import { DETAILING_SERVICES } from "@/lib/detailing-demo";
import { useDetailingModal } from "@/contexts/DetailingModalContext";

export default function DetailingServicesSection() {
  const { showDetailingModal } = useDetailingModal();

  return (
    <section id="services" className="py-16 sm:py-24 md:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="detail-section-label mb-4 block">Our Services</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Premium Detailing Packages
          </h2>
          <p className="text-[#94a3b8] max-w-2xl mx-auto font-light">
            From quick interior refreshes to full paint correction and ceramic coating — every
            service is tailored to your vehicle&apos;s needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {DETAILING_SERVICES.map((service, index) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="detail-card rounded-lg p-6 flex flex-col"
            >
              <div className="w-10 h-1 bg-gradient-to-r from-[#00e5ff] to-[#a855f7] rounded-full mb-5" />
              <h3 className="font-display text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-[#94a3b8] text-sm leading-relaxed flex-1 mb-4">{service.description}</p>
              <p className="text-[#00e5ff] text-sm font-medium mb-5">{service.price}</p>
              <button
                type="button"
                onClick={showDetailingModal}
                className="detail-btn-outline w-full py-2.5 text-xs rounded-md"
              >
                View Details
              </button>
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[#94a3b8]/80 text-sm mt-10 max-w-xl mx-auto"
        >
          Final pricing depends on vehicle size, condition, and selected services.
        </motion.p>
      </div>
    </section>
  );
}
