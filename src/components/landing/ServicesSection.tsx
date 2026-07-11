import { motion } from "framer-motion";
import { Users, Building2, PartyPopper, Calendar, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import weddingImg from "@/assets/wedding-catering.png";
import corporateImg from "@/assets/corporate-event.png";
import brisketImg from "@/assets/hero-brisket.png";

const serviceIcons = [Users, Building2, PartyPopper, PartyPopper, Calendar, Heart];
const serviceImages = [
  weddingImg,
  corporateImg,
  brisketImg,
  brisketImg,
  weddingImg,
  corporateImg,
];

export default function ServicesSection() {
  const { t } = useLanguage();

  return (
    <section id="events" className="py-24 md:py-32 bg-background">
      <div className="container px-6 md:px-12 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="uppercase tracking-[0.2em] text-xs text-[#C8A45D] font-medium mb-4 block">{t.services.badge}</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">{t.services.heading}</h2>
            <p className="text-foreground/70 text-lg font-light">{t.services.subheading}</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(t.services.items as readonly { title: string; desc: string }[]).map((service, idx) => {
            const Icon = serviceIcons[idx];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="group relative bg-secondary/50 border border-white/5 overflow-hidden"
              >
                <div className="h-64 overflow-hidden relative">
                  <div className="absolute inset-0 bg-background/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img
                    src={serviceImages[idx]}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-8 relative z-20 bg-gradient-to-t from-secondary via-secondary to-transparent -mt-16 pt-20">
                  <Icon className="w-8 h-8 text-[#C8A45D] mb-6" />
                  <h3 className="font-serif text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-foreground/60 font-light leading-relaxed">{service.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
