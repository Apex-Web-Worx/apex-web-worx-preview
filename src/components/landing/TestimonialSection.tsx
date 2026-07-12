import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TestimonialSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-background border-t border-white/5">
      <div className="container px-4 sm:px-6 md:px-12 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="uppercase tracking-[0.2em] text-xs text-primary font-medium mb-4 block">{t.testimonials.badge}</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">{t.testimonials.heading}</h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(t.testimonials.items as readonly { quote: string; author: string; event: string }[]).map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="p-8 bg-secondary/30 border border-white/5 relative"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground/80 font-light leading-relaxed mb-8 italic">
                "{testimonial.quote}"
              </p>
              <div>
                <p className="font-serif font-bold text-lg">{testimonial.author}</p>
                <p className="text-xs tracking-widest uppercase text-foreground/50 mt-1">{testimonial.event}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
