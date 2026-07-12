import { motion } from "framer-motion";
import { CalendarDays, ClipboardList, ChefHat, Utensils } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const stepIcons = [CalendarDays, ClipboardList, ChefHat, Utensils];
const stepNums = ["01", "02", "03", "04"];

export default function ProcessSection() {
  const { t } = useLanguage();

  return (
    <section id="process" className="relative min-h-0 py-16 sm:py-24 md:py-32 overflow-hidden bg-[#0a0a0a]">
      {/* Animated smoke background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="process-smoke-left"></div>
        <div className="process-smoke-right"></div>
        <div className="process-smoke-center"></div>
        <div className="process-fire-orbs"></div>
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 z-[1] pointer-events-none" />

      <div className="container px-4 sm:px-6 md:px-12 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20"
        >
          <span className="uppercase tracking-[0.2em] text-xs text-[#C8A45D] font-medium mb-4 block">
            {t.process.badge}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {t.process.heading}
          </h2>
          <p className="text-foreground/70 text-lg font-light">
            {t.process.subheading}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
          {(t.process.steps as readonly { title: string; desc: string }[]).map((step, idx) => {
            const Icon = stepIcons[idx];
            return (
              <motion.div
                key={stepNums[idx]}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative group"
              >
                {idx < stepNums.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-[1px] bg-gradient-to-r from-white/20 to-transparent" />
                )}

                <div className="relative bg-white/[0.03] border border-white/10 p-5 sm:p-8 h-full backdrop-blur-sm hover:bg-white/[0.06] hover:border-[#C8A45D]/30 transition-all duration-500">
                  <span className="absolute -top-4 -left-2 text-5xl sm:text-6xl font-serif font-bold text-[#C8A45D]/10 group-hover:text-[#C8A45D]/20 transition-colors duration-500">
                    {stepNums[idx]}
                  </span>

                  <div className="mb-5 sm:mb-6 relative z-10">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#C8A45D]/10 border border-[#C8A45D]/20 flex items-center justify-center group-hover:bg-[#C8A45D]/20 group-hover:border-[#C8A45D]/40 transition-all duration-500">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#C8A45D]" />
                    </div>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold mb-2 sm:mb-3 relative z-10">
                    {step.title}
                  </h3>
                  <p className="text-sm text-foreground/60 font-light leading-relaxed relative z-10">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
