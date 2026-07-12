import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Check,
  MapPin,
  Package,
  Phone,
  Mail,
  Users,
  Utensils,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDemoModal } from "@/contexts/DemoModalContext";
import DemoDisclaimer from "@/components/demo/DemoDisclaimer";
import Footer from "@/components/landing/Footer";
import { DEMO_BRAND, DemoBookingSelection, loadDemoBooking } from "@/lib/demo";

export default function MyBooking() {
  const { t } = useLanguage();
  const { showDemoModal } = useDemoModal();
  const [, params] = useRoute("/my-booking/:token");
  const [booking, setBooking] = useState<DemoBookingSelection | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const token = params?.token;
    setBooking(loadDemoBooking(token));
    setLoaded(true);
  }, [params?.token]);

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-[#C8A45D]">{t.dashboard.loading}</div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <div className="container mx-auto px-6 py-16 max-w-2xl flex-1">
          <DemoDisclaimer className="mb-8" />
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">{t.dashboard.notFound}</h1>
          <p className="text-foreground/70 mb-8">{t.dashboard.notFoundDesc}</p>
          <Button asChild className="rounded-none bg-[#C8A45D] hover:bg-[#C8A45D]/90 text-[#0a0a0a]">
            <Link href="/">{t.dashboard.goHome}</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const totalGuests = booking.inquiry.guestCount + booking.additionalGuests;
  const itemsByCategory = booking.selectedItems.reduce<Record<string, typeof booking.selectedItems>>(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {},
  );

  const steps = [
    { label: t.menuSelection.stepLabel1, done: true },
    { label: t.menuSelection.stepLabel2, done: true },
    { label: t.menuSelection.stepLabel3, done: false, active: true },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-x-hidden">
      <header className="border-b border-white/10 sticky top-0 z-30 bg-[#0F0F0D]">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#C8A45D] hover:text-[#C8A45D]/80 transition-colors mb-4 sm:mb-6 min-h-11 touch-manipulation"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.dashboard.backToHome}
          </Link>
          <DemoDisclaimer className="mb-4 sm:mb-6" />
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            {steps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2 sm:gap-3">
                <div
                  className={`flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs uppercase tracking-wider ${
                    step.active ? "text-[#C8A45D]" : step.done ? "text-foreground/50" : "text-foreground/30"
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] shrink-0 ${
                      step.active
                        ? "border-[#C8A45D] bg-[#C8A45D]/15"
                        : step.done
                          ? "border-foreground/30 bg-foreground/5"
                          : "border-foreground/20"
                    }`}
                  >
                    {step.done && !step.active ? <Check className="w-3 h-3" /> : i + 1}
                  </span>
                  <span className="hidden xs:inline sm:inline">{step.label}</span>
                </div>
                {i < steps.length - 1 && <span className="text-foreground/20">/</span>}
              </div>
            ))}
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl font-bold mb-2">{t.dashboard.myBooking}</h1>
          <p className="text-foreground/60 text-xs sm:text-sm">
            {t.dashboard.bookingPrefix}
            {booking.inquiry.id} · {t.dashboard.statusLabels.pending_approval}
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-10 max-w-4xl flex-1 space-y-5 sm:space-y-8 pb-[max(2rem,env(safe-area-inset-bottom))]">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-white/10 bg-secondary/40 p-4 sm:p-6 md:p-8"
        >
          <h2 className="font-serif text-xl sm:text-2xl font-bold mb-4 sm:mb-6">{t.dashboard.eventDetails}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
            <div className="flex gap-3">
              <Calendar className="w-4 h-4 text-[#C8A45D] mt-0.5 shrink-0" />
              <div>
                <p className="text-foreground/50 uppercase tracking-wider text-[11px] mb-1">{t.dashboard.eventDate}</p>
                <p>{booking.inquiry.eventDate}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Users className="w-4 h-4 text-[#C8A45D] mt-0.5 shrink-0" />
              <div>
                <p className="text-foreground/50 uppercase tracking-wider text-[11px] mb-1">{t.dashboard.numberOfGuests}</p>
                <p>
                  {totalGuests} {t.dashboard.guestsSuffix}
                  {booking.additionalGuests > 0
                    ? ` (${booking.inquiry.guestCount} + ${booking.additionalGuests})`
                    : ""}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <MapPin className="w-4 h-4 text-[#C8A45D] mt-0.5 shrink-0" />
              <div>
                <p className="text-foreground/50 uppercase tracking-wider text-[11px] mb-1">{t.dashboard.eventLocation}</p>
                <p>{booking.inquiry.location || t.dashboard.notProvided}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Package className="w-4 h-4 text-[#C8A45D] mt-0.5 shrink-0" />
              <div>
                <p className="text-foreground/50 uppercase tracking-wider text-[11px] mb-1">{t.dashboard.menuPackage}</p>
                <p>{booking.packageName}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Mail className="w-4 h-4 text-[#C8A45D] mt-0.5 shrink-0" />
              <div>
                <p className="text-foreground/50 uppercase tracking-wider text-[11px] mb-1">{t.dashboard.email}</p>
                <p>{booking.inquiry.email}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Phone className="w-4 h-4 text-[#C8A45D] mt-0.5 shrink-0" />
              <div>
                <p className="text-foreground/50 uppercase tracking-wider text-[11px] mb-1">{t.dashboard.phone}</p>
                <p>{booking.inquiry.phone}</p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="border border-white/10 bg-secondary/40 p-4 sm:p-6 md:p-8"
        >
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <Utensils className="w-5 h-5 text-[#C8A45D]" />
            <h2 className="font-serif text-xl sm:text-2xl font-bold">{t.menuSelection.selectedItems}</h2>
          </div>
          <div className="space-y-6">
            {Object.entries(itemsByCategory).map(([category, items]) => (
              <div key={category}>
                <p className="text-[#C8A45D] text-xs uppercase tracking-[0.2em] mb-3">{category}</p>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li
                      key={`${category}-${item.name}`}
                      className="flex justify-between gap-4 text-sm border-b border-white/5 pb-2"
                    >
                      <span>{item.name}</span>
                      <span className="text-foreground/50 shrink-0">
                        {item.quantity} {t.menuSelection.servings}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="border border-[#C8A45D]/30 bg-[#C8A45D]/5 p-4 sm:p-6 md:p-8"
        >
          <h2 className="font-serif text-xl sm:text-2xl font-bold mb-4">{t.menuSelection.pricingSummary}</h2>
          <div className="space-y-2 text-sm mb-6">
            <div className="flex justify-between">
              <span className="text-foreground/60">{t.menuSelection.packagePrice}</span>
              <span>
                ${booking.basePricePerPerson.toFixed(2)}
                {t.dashboard.perPerson}
              </span>
            </div>
            {booking.addonsPricePerPerson > 0 && (
              <div className="flex justify-between">
                <span className="text-foreground/60">Add-ons</span>
                <span>
                  +${booking.addonsPricePerPerson.toFixed(2)}
                  {t.dashboard.perPerson}
                </span>
              </div>
            )}
            <div className="flex justify-between font-serif text-xl pt-3 border-t border-[#C8A45D]/25">
              <span>{t.dashboard.total}</span>
              <span className="text-[#C8A45D]">${booking.estimatedTotal.toLocaleString()}</span>
            </div>
          </div>
          <p className="text-xs text-foreground/50 mb-6">{t.menuSelection.finalPriceNote}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              className="rounded-none bg-[#C8A45D] hover:bg-[#C8A45D]/90 text-[#0a0a0a] flex-1 min-h-12 touch-manipulation"
              onClick={() => showDemoModal()}
            >
              {t.menuSelection.confirmBtn}
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-none border-white/20 flex-1 min-h-12 touch-manipulation"
            >
              <Link href="/menu-selection?demo=1">{t.dashboard.edit}</Link>
            </Button>
          </div>
          <p className="text-xs text-foreground/40 mt-4 text-center">
            Demo contact: {DEMO_BRAND.email} · {DEMO_BRAND.phone}
          </p>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
