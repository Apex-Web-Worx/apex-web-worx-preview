import { motion } from "framer-motion";
import { IchthysIcon } from "@/components/icons/ichthys";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="craft" className="py-16 sm:py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="container px-4 sm:px-6 md:px-12 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[3/4] overflow-hidden relative">
              <img
                src="/chef-portrait.png"
                alt="Chef Oleksandr Lapeikin"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border border-white/10 m-6" />
            </div>
            <div className="absolute -bottom-6 right-4 sm:-bottom-12 sm:-right-12 w-44 sm:w-64 aspect-square block border border-[#C8A45D]/30 bg-background/80 backdrop-blur-md p-5 sm:p-8 flex-col justify-center">
              <p className="text-[#C8A45D] font-bold text-4xl sm:text-5xl font-serif mb-2">10<span className="text-2xl sm:text-3xl">+</span></p>
              <p className="text-xs sm:text-sm uppercase tracking-widest text-foreground/70 leading-relaxed">{t.about.yearsLabel}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-[#C8A45D]" />
              <IchthysIcon className="w-6 h-3 text-[#C8A45D]" />
              <span className="uppercase tracking-[0.2em] text-xs text-[#C8A45D] font-medium">{t.about.badge}</span>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-2">
              Executive Chef
            </h2>
            <p className="font-serif text-2xl text-foreground/50 mb-8 italic">
              {t.about.tagline}
            </p>

            <p className="text-lg text-foreground/80 mb-6 font-light leading-relaxed">
              {t.about.bio1}
            </p>

            <p className="text-lg text-foreground/80 mb-10 font-light leading-relaxed">
              {t.about.bio2}
            </p>

            <div className="mb-8">
              <h4 className="font-serif text-xl font-bold mb-4">{t.about.perfectFor}</h4>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                {(t.about.events as readonly string[]).map((ev) => (
                  <p key={ev} className="text-sm text-foreground/70 font-light">{ev}</p>
                ))}
              </div>
            </div>

            <p className="text-base text-foreground/70 font-light leading-relaxed border-t border-white/10 pt-6">
              {t.about.closing}
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
