import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import DemoDisclaimer from "@/components/demo/DemoDisclaimer";
import { DEMO_BRAND } from "@/lib/demo";

export default function PrivacyPolicy() {
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
            {t.privacyPolicy.backToHome}
          </Link>

          <DemoDisclaimer className="mb-8" />

          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">{t.privacyPolicy.title}</h1>
          <p className="text-foreground/60 text-sm mb-16">{t.privacyPolicy.effectiveDate}</p>

          <div className="space-y-12 text-foreground/80 leading-relaxed">
            <section>
              <h2 className="font-serif text-2xl font-bold mb-4 text-foreground">{t.privacyPolicy.whoWeAre.title}</h2>
              <p className="mb-4">{t.privacyPolicy.whoWeAre.body1}</p>
              <div className="flex items-center gap-2 text-sm mt-3">
                <Phone className="w-4 h-4 text-primary" />
                <span>{DEMO_BRAND.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm mt-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>{DEMO_BRAND.email}</span>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4 text-foreground">{t.privacyPolicy.information.title}</h2>
              <p>{t.privacyPolicy.information.body}</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4 text-foreground">{t.privacyPolicy.howWeUse.title}</h2>
              <p className="mb-4">{t.privacyPolicy.howWeUse.intro}</p>
              <ul className="list-disc pl-6 space-y-2">
                {t.privacyPolicy.howWeUse.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">{t.privacyPolicy.howWeUse.closing}</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4 text-foreground">{t.privacyPolicy.sms.title}</h2>
              <p className="mb-4">{t.privacyPolicy.sms.consent}</p>
              <p className="mb-4">{t.privacyPolicy.sms.optOut}</p>
              <p>{t.privacyPolicy.sms.noSharing}</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4 text-foreground">{t.privacyPolicy.providers.title}</h2>
              <p>{t.privacyPolicy.providers.body}</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4 text-foreground">{t.privacyPolicy.noSale.title}</h2>
              <p>{t.privacyPolicy.noSale.body}</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4 text-foreground">{t.privacyPolicy.retention.title}</h2>
              <p>{t.privacyPolicy.retention.body}</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4 text-foreground">{t.privacyPolicy.children.title}</h2>
              <p>{t.privacyPolicy.children.body}</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4 text-foreground">{t.privacyPolicy.changes.title}</h2>
              <p>{t.privacyPolicy.changes.body}</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4 text-foreground">{t.privacyPolicy.contact.title}</h2>
              <p className="mb-4">{t.privacyPolicy.contact.body}</p>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <span>{DEMO_BRAND.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm mt-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>{DEMO_BRAND.email}</span>
              </div>
              <p className="mt-4">
                <Link href="/terms" className="text-primary hover:text-primary/80 transition-colors underline">
                  {t.privacyPolicy.termsLink}
                </Link>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
