import { motion } from "framer-motion";
import BeforeAfterSlider from "@/components/detailing/BeforeAfterSlider";
import { DETAILING_GALLERY } from "@/lib/detailing-demo";

export default function DetailingGallerySection() {
  return (
    <section id="gallery" className="py-16 sm:py-24 md:py-32 bg-[#0d0d12] border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="detail-section-label mb-4 block">Results</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Before &amp; After Gallery
          </h2>
          <p className="text-[#94a3b8] max-w-2xl mx-auto font-light">
            Drag the slider to compare transformations. Demo visuals illustrate the type of
            results professional detailing delivers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DETAILING_GALLERY.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <BeforeAfterSlider
                title={item.title}
                beforeGradient={item.before}
                afterGradient={item.after}
                beforeLabel={item.beforeLabel}
                afterLabel={item.afterLabel}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
