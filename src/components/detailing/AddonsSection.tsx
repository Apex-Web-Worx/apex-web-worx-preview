import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { DETAILING_ADDONS } from "@/lib/detailing-demo";

export default function DetailingAddonsSection() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section id="addons" className="py-16 sm:py-24 md:py-32 border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="detail-section-label mb-4 block">Enhancements</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Add-On Services
          </h2>
          <p className="text-[#94a3b8] max-w-2xl mx-auto font-light">
            Customize your detail with optional upgrades. Select add-ons during booking.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {DETAILING_ADDONS.map((addon, index) => {
            const isSelected = selected.has(addon.id);
            return (
              <motion.button
                key={addon.id}
                type="button"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => toggle(addon.id)}
                className={`detail-card rounded-lg p-5 text-left relative ${
                  isSelected ? "detail-addon-selected" : ""
                }`}
              >
                {isSelected && (
                  <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#00e5ff] flex items-center justify-center">
                    <Check className="w-3 h-3 text-[#0a0a0c]" />
                  </span>
                )}
                <h3 className="font-display text-lg font-semibold mb-2 pr-6">{addon.title}</h3>
                <p className="text-[#00e5ff] text-sm">{addon.price}</p>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
