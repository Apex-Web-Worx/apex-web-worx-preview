import { motion } from "framer-motion";
import { Star, Phone, MapPin, Globe } from "lucide-react";
import { DETAILING_BRAND, DETAILING_REVIEWS } from "@/lib/detailing-demo";

export default function DetailingReviewsSection() {
  return (
    <section id="reviews" className="py-16 sm:py-24 md:py-32 bg-[#0d0d12] border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="detail-section-label mb-4 block">Testimonials</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            What Customers Say
          </h2>
          <p className="text-[#94a3b8] max-w-2xl mx-auto font-light">
            Sample review layout — fictional names for demonstration purposes only.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {DETAILING_REVIEWS.map((review, index) => (
            <motion.article
              key={review.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="detail-card rounded-lg p-6 relative"
            >
              <span className="absolute top-4 right-4 text-[10px] uppercase tracking-widest text-[#94a3b8]/60">
                Sample review layout
              </span>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#00e5ff] text-[#00e5ff]" />
                ))}
              </div>
              <p className="text-[#f0f4f8]/85 font-light leading-relaxed mb-6 italic">
                &ldquo;{review.text}&rdquo;
              </p>
              <div>
                <p className="font-display font-semibold">{review.name}</p>
                <p className="text-xs text-[#94a3b8] mt-1">{review.vehicle}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="detail-card rounded-lg p-6 md:p-8 max-w-2xl mx-auto"
        >
          <p className="text-xs uppercase tracking-widest text-[#94a3b8] mb-4 text-center">
            Google Business Profile Preview
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="text-center sm:text-left">
              <h3 className="font-display text-2xl font-bold">{DETAILING_BRAND.name}</h3>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#00e5ff] text-[#00e5ff]" />
                  ))}
                </div>
                <span className="text-sm text-[#94a3b8]">Sample rating layout</span>
              </div>
              <p className="text-xs text-[#94a3b8]/70 mt-1">Sample review count layout</p>
              <p className="text-sm text-[#94a3b8] mt-2">{DETAILING_BRAND.serviceArea}</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <a
                href={`tel:${DETAILING_BRAND.phoneTel}`}
                className="detail-btn-outline inline-flex items-center gap-2 px-4 py-2 text-xs rounded-md"
              >
                <Phone className="w-3.5 h-3.5" /> Call
              </a>
              <button type="button" className="detail-btn-outline inline-flex items-center gap-2 px-4 py-2 text-xs rounded-md">
                <MapPin className="w-3.5 h-3.5" /> Directions
              </button>
              <a
                href={DETAILING_BRAND.website}
                target="_blank"
                rel="noopener noreferrer"
                className="detail-btn-outline inline-flex items-center gap-2 px-4 py-2 text-xs rounded-md"
              >
                <Globe className="w-3.5 h-3.5" /> Website
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
