import { motion } from "framer-motion";
import { DETAILING_WHY_CHOOSE } from "@/lib/detailing-demo";

export default function DetailingWhyChooseSection() {
  return (
    <section id="why-us" className="py-16 sm:py-24 md:py-32 border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="detail-section-label mb-4 block">Why Apex</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Why Choose Us
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {DETAILING_WHY_CHOOSE.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="detail-card rounded-lg p-6"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00e5ff]/20 to-[#a855f7]/20 flex items-center justify-center mb-4">
                <span className="text-[#00e5ff] font-display font-bold text-sm">{index + 1}</span>
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-[#94a3b8] text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
