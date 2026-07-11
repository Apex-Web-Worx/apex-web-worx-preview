import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import DemoDisclaimer from "@/components/demo/DemoDisclaimer";
import { DEMO_BRAND } from "@/lib/demo";

export default function TermsConditions() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground dark selection:bg-primary selection:text-white">
      <div className="container px-6 md:px-12 mx-auto py-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors mb-12">
            <ArrowLeft className="w-4 h-4" />
            {t.terms.backToHome}
          </Link>

          <DemoDisclaimer className="mb-8" />

          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">{t.terms.title}</h1>
          <p className="text-foreground/60 text-sm mb-16">{t.terms.effectiveDate}</p>

          <div className="space-y-12 text-foreground/80 leading-relaxed">
            <section>
              <h2 className="font-serif text-2xl font-bold mb-4 text-foreground">{t.terms.overview.title}</h2>
              <p>{t.terms.overview.body}</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4 text-foreground">{t.terms.booking.title}</h2>
              <p className="mb-4">{t.terms.booking.intro}</p>
              <ul className="list-disc pl-6 space-y-2">
                {t.terms.booking.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4 text-foreground">{t.terms.payment.title}</h2>
              <p className="mb-4">{t.terms.payment.intro}</p>
              <ul className="list-disc pl-6 space-y-2">
                {t.terms.payment.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4 text-foreground">{t.terms.cancellation.title}</h2>
              <p className="mb-4">{t.terms.cancellation.intro}</p>
              <ul className="list-disc pl-6 space-y-2">
                {t.terms.cancellation.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4 text-foreground">{t.terms.menu.title}</h2>
              <p className="mb-4">{t.terms.menu.intro}</p>
              <ul className="list-disc pl-6 space-y-2">
                {t.terms.menu.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4 text-foreground">{t.terms.liability.title}</h2>
              <p>{t.terms.liability.body}</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4 text-foreground">{t.terms.changes.title}</h2>
              <p>{t.terms.changes.body}</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4 text-foreground">{t.terms.contact.title}</h2>
              <p className="mb-4">{t.terms.contact.body}</p>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <span>{DEMO_BRAND.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm mt-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>{DEMO_BRAND.email}</span>
              </div>
              <p className="mt-4">
                <Link href="/privacy" className="text-primary hover:text-primary/80 transition-colors underline">
                  {t.terms.privacyLink}
                </Link>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
