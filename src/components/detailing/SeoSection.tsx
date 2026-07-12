import { motion } from "framer-motion";
import { MapPin, Star, Search, Smartphone, Phone, Navigation, CalendarCheck, Palette } from "lucide-react";
import { DETAILING_SEO_BENEFITS } from "@/lib/detailing-demo";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "Google Business Profile Setup": MapPin,
  "Local SEO": Search,
  "Service-Area Pages": MapPin,
  "Review Links": Star,
  "Mobile Optimization": Smartphone,
  "Click-to-Call Buttons": Phone,
  "Directions Integration": Navigation,
  "Booking Conversion": CalendarCheck,
  "Professional Branding": Palette,
};

export default function DetailingSeoSection() {
  return (
    <section id="seo" className="py-16 sm:py-24 md:py-32 border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="detail-section-label mb-4 block">Local Visibility</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Help Local Customers Find and Trust Your Business
          </h2>
          <p className="text-[#94a3b8] max-w-2xl mx-auto font-light">
            Apex Web Worx helps detailing businesses get found online and convert searchers
            into booked appointments.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {DETAILING_SEO_BENEFITS.map((item, index) => {
            const Icon = iconMap[item.title] ?? Search;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="detail-card rounded-lg p-6"
              >
                <Icon className="w-7 h-7 text-[#00e5ff] mb-4" />
                <h3 className="font-display text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-[#94a3b8] text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
