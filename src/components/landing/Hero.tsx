import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import DemoDisclaimer from "@/components/demo/DemoDisclaimer";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-background">
      <div className="hero-smoke"></div>
      <div className="hero-smoke-right"></div>
      <div className="hero-smoke-bottom"></div>
      <div className="hero-smoke-center"></div>
      <div className="hero-fire-orbs"></div>

      <div className="hero-content container relative z-20 px-4 sm:px-6 md:px-12 text-center pt-[calc(var(--site-header-h,7rem)+0.5rem)]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8"
        >
          <DemoDisclaimer variant="inline" className="max-w-lg mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-[#C8A45D] font-bold tracking-[0.3em] uppercase text-lg md:text-xl mb-6 drop-shadow-[0_2px_12px_rgba(200,164,93,0.5)]">
            {t.hero.tagline}
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-foreground font-bold leading-tight mb-6 sm:mb-8 drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)]"
        >
          {t.hero.heading}
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-serif text-xl sm:text-2xl md:text-4xl lg:text-5xl text-foreground/90 font-normal leading-snug mb-6 sm:mb-8 max-w-4xl mx-auto drop-shadow-[0_3px_12px_rgba(0,0,0,0.6)]"
        >
          {t.hero.subheading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-foreground/90 max-w-2xl mx-auto text-base sm:text-lg md:text-xl mb-10 sm:mb-12 font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] px-2"
        >
          {t.hero.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            asChild
            size="lg"
            className="rounded-none bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-7 text-sm tracking-[0.2em] uppercase w-full sm:w-auto"
          >
            <a href="#book">{t.hero.bookBtn}</a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-none border-white/20 hover:bg-white/5 hover:text-foreground text-foreground px-10 py-7 text-sm tracking-[0.2em] uppercase w-full sm:w-auto bg-transparent backdrop-blur-sm"
          >
            <a href="#menu">{t.hero.viewBtn}</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
