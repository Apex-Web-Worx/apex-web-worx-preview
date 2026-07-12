import { motion } from "framer-motion";
import { Users, Building2, PartyPopper, Calendar, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  CardAmbientDecor,
  CardContentTopRule,
  CardCornerAccents,
  CardSpacerDecor,
  SectionBadgeOrnament,
  SectionHeaderAccent,
  SectionSideRails,
  TitleAccentLines,
} from "@/components/landing/LuxuryCardDecor";
import eventWeddings from "@/assets/event-weddings.png";
import eventCorporate from "@/assets/event-corporate.png";
import eventPrivate from "@/assets/event-private.png";
import eventFestivals from "@/assets/event-festivals.png";
import eventHoliday from "@/assets/event-holiday.png";
import eventCharity from "@/assets/event-charity.png";

const serviceIcons = [Users, Building2, PartyPopper, PartyPopper, Calendar, Heart];

const serviceImages = [
  eventWeddings,
  eventCorporate,
  eventPrivate,
  eventFestivals,
  eventHoliday,
  eventCharity,
];

export default function ServicesSection() {
  const { t } = useLanguage();

  return (
    <section id="events" className="py-16 sm:py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="container px-4 sm:px-6 md:px-12 mx-auto relative">
        <SectionSideRails />

        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20 relative">
          <SectionHeaderAccent />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionBadgeOrnament />
            <span className="uppercase tracking-[0.2em] text-xs text-[#C8A45D] font-medium mb-4 block">
              {t.services.badge}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
              {t.services.heading}
            </h2>
            <p className="text-foreground/70 text-base sm:text-lg font-light px-2 sm:px-0">
              {t.services.subheading}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8 items-stretch max-w-xl sm:max-w-none mx-auto">
          {(t.services.items as readonly { title: string; desc: string }[]).map((service, idx) => {
            const Icon = serviceIcons[idx];
            const imgSrc = serviceImages[idx];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: Math.min(idx * 0.08, 0.4) }}
                className="group menu-card-luxury relative flex flex-col h-full overflow-hidden transition-all duration-500 ease-out md:hover:-translate-y-2"
                style={{
                  background: "#171714",
                  border: "1px solid rgba(200, 164, 93, 0.18)",
                  boxShadow: "0 4px 24px rgba(0, 0, 0, 0.4)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(200, 164, 93, 0.45)";
                  e.currentTarget.style.boxShadow = "0 8px 40px rgba(200, 164, 93, 0.08), 0 4px 24px rgba(0, 0, 0, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(200, 164, 93, 0.18)";
                  e.currentTarget.style.boxShadow = "0 4px 24px rgba(0, 0, 0, 0.4)";
                }}
              >
                <CardCornerAccents />
                <CardAmbientDecor seed={idx} />

                <div className="events-card-image aspect-[3/4] overflow-hidden relative sm:aspect-[5/6] md:aspect-[3/4]">
                  <img
                    src={imgSrc}
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                    fetchPriority={idx < 2 ? "high" : "auto"}
                    className="w-full h-full object-contain md:object-cover object-center transition-transform duration-[800ms] ease-out md:group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0D] via-[#0F0F0D]/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C8A45D]/5 via-transparent to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8A45D]/60 to-transparent" />
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-6 h-6 sm:w-8 sm:h-8 border-t border-l border-[#C8A45D]/20 pointer-events-none" />
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-6 h-6 sm:w-8 sm:h-8 border-t border-r border-[#C8A45D]/20 pointer-events-none" />
                </div>

                <div className="p-5 sm:p-6 md:p-8 flex-1 flex flex-col relative z-[1]">
                  <CardContentTopRule inset="left-5 right-5 sm:left-6 sm:right-6 md:left-8 md:right-8" />
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-[#C8A45D] mb-4 sm:mb-5 mt-2" strokeWidth={1.5} />
                  <h3
                    className="font-serif text-xl sm:text-2xl font-bold mb-1"
                    style={{ fontFamily: "var(--app-font-display)", color: "#FFFFFF" }}
                  >
                    {service.title}
                  </h3>
                  <TitleAccentLines />
                  <p className="text-foreground/60 font-light leading-relaxed mt-4">{service.desc}</p>
                  <CardSpacerDecor itemCount={2} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
