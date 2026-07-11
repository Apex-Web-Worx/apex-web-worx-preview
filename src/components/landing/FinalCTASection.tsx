import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function FinalCTASection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-background border-t border-white/5">
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#C8A45D]/10 blur-[120px] rounded-full" />
      </div>
      <div className="container px-6 md:px-12 mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="uppercase tracking-[0.2em] text-xs text-[#C8A45D] font-medium mb-4 block">
            Ready to Launch?
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-3xl mx-auto">
            Your Catering Business Deserves a Website Like This
          </h2>
          <p className="text-foreground/70 text-lg font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Apex Web Worx builds custom catering platforms with real booking, payments,
            calendar sync, and admin tools — tailored to your brand.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-none bg-primary hover:bg-primary/90 px-10 py-7 text-sm tracking-[0.2em] uppercase w-full sm:w-auto"
            >
              <a href="https://apexwebworx.com" target="_blank" rel="noopener noreferrer">
                Get Your Custom Site
                <ArrowRight className="ml-2 w-4 h-4 inline" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-none border-white/20 hover:bg-white/5 px-10 py-7 text-sm tracking-[0.2em] uppercase w-full sm:w-auto bg-transparent"
            >
              <a href="#book">Try the Demo Form</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
