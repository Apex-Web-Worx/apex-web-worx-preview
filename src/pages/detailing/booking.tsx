import { useMemo, useState } from "react";
import { Link } from "wouter";
import "@/styles/detailing.css";
import DetailingDisclaimer from "@/components/detailing/DetailingDisclaimer";
import { useDetailingModal } from "@/contexts/DetailingModalContext";
import {
  BOOKING_BLOCKED_DATES,
  BOOKING_SERVICES,
  BOOKING_TIME_SLOTS,
  DETAILING_BRAND,
  DETAILING_DISCLAIMER,
  formatDuration,
  todayStr,
  type DemoBookingService,
} from "@/lib/detailing-demo";
import {
  ArrowLeft,
  Calendar,
  Car,
  Check,
  ChevronRight,
  Clock,
  Mail,
  Phone,
  User,
} from "lucide-react";

type Step = "service" | "datetime" | "info" | "confirm";

const STEPS: { id: Step; label: string }[] = [
  { id: "service", label: "Service" },
  { id: "datetime", label: "Date & Time" },
  { id: "info", label: "Your Info" },
  { id: "confirm", label: "Confirm" },
];

function badgeLabel(badge?: DemoBookingService["badge"]) {
  switch (badge) {
    case "popular":
      return "Most Popular";
    case "value":
      return "Best Value";
    case "express":
      return "Express";
    case "notice":
      return "Custom Quote";
    default:
      return null;
  }
}

function buildCalendarDays() {
  const days: { date: string; label: string; weekday: string; blocked: boolean }[] = [];
  const start = new Date();
  for (let i = 0; i < 21; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    days.push({
      date,
      label: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
      blocked: BOOKING_BLOCKED_DATES.includes(date) || d.getDay() === 0,
    });
  }
  return days;
}

export default function DetailingBooking() {
  const { showDetailingModal } = useDetailingModal();
  const calendarDays = useMemo(() => buildCalendarDays(), []);

  const [step, setStep] = useState<Step>("service");
  const [selectedService, setSelectedService] = useState<DemoBookingService | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    vehicle: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const stepIndex = STEPS.findIndex((s) => s.id === step);

  const canContinue =
    (step === "service" && selectedService !== null) ||
    (step === "datetime" && selectedDate !== null && selectedTime !== null) ||
    (step === "info" && form.name.trim() && form.email.trim() && form.phone.trim() && form.vehicle.trim()) ||
    step === "confirm";

  const goNext = () => {
    if (step === "service" && selectedService) setStep("datetime");
    else if (step === "datetime" && selectedDate && selectedTime) setStep("info");
    else if (step === "info") setStep("confirm");
  };

  const goBack = () => {
    if (step === "datetime") setStep("service");
    else if (step === "info") setStep("datetime");
    else if (step === "confirm") setStep("info");
  };

  const handleSubmit = () => {
    setSubmitted(true);
    showDetailingModal();
  };

  return (
    <div className="detailing-site min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden selection:bg-[#A886CD] selection:text-white">
      <div className="texture-overlay" />
      <DetailingDisclaimer className="fixed top-0 left-0 right-0 z-[60]" />

      <header className="fixed top-0 w-full z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <Link
            href="/detailing"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to site
          </Link>
          <img
            src={`${import.meta.env.BASE_URL}elite-auto-detailing-logo.svg?v=3`}
            alt="Elite Auto Detailing"
            className="h-10 sm:h-12 w-auto object-contain logo-shine"
          />
          <a
            href={`tel:${DETAILING_BRAND.phoneTel}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#3496FF] transition-colors"
          >
            <Phone className="w-4 h-4 text-[#3496FF]" />
            <span className="hidden sm:inline">{DETAILING_BRAND.phone}</span>
          </a>
        </div>
      </header>

      <main className="relative z-10 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#3496FF] mb-2">
              Online Scheduling
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight mb-3">
              Book Your{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A886CD] to-[#3496FF]">
                Detail
              </span>
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              Choose your service, pick a time, and confirm — the same booking flow a production site uses.
            </p>
          </div>

          {/* Progress */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-10">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center gap-2 sm:gap-4">
                <div
                  className={`flex items-center gap-2 ${
                    i <= stepIndex ? "text-white" : "text-gray-500"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                      i < stepIndex
                        ? "bg-gradient-to-r from-[#A886CD] to-[#3496FF] border-transparent"
                        : i === stepIndex
                          ? "border-[#3496FF] bg-[#3496FF]/10"
                          : "border-white/20 bg-white/5"
                    }`}
                  >
                    {i < stepIndex ? <Check className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`w-6 sm:w-12 h-0.5 ${
                      i < stepIndex ? "bg-gradient-to-r from-[#A886CD] to-[#3496FF]" : "bg-white/10"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111]/80 backdrop-blur-sm p-6 sm:p-8 shadow-[0_0_40px_rgba(52,150,255,0.08)]">
            {step === "service" && (
              <div>
                <h2 className="text-xl font-black uppercase mb-6 flex items-center gap-2">
                  <Car className="w-5 h-5 text-[#3496FF]" />
                  Select a Service
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {BOOKING_SERVICES.map((service) => {
                    const selected = selectedService?.id === service.id;
                    const badge = badgeLabel(service.badge);
                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => setSelectedService(service)}
                        className={`text-left p-5 rounded-xl border transition-all duration-300 ${
                          selected
                            ? "border-[#3496FF] bg-[#3496FF]/10 shadow-[0_0_20px_rgba(52,150,255,0.2)]"
                            : "border-white/10 bg-white/5 hover:border-[#A886CD]/50"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-bold text-white">{service.name}</h3>
                          {badge && (
                            <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-gradient-to-r from-[#A886CD] to-[#3496FF]">
                              {badge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-400 mb-3 leading-relaxed">{service.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-bold text-[#3496FF]">{service.priceLabel}</span>
                          <span className="text-gray-500 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {formatDuration(service.durationMinutes)}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === "datetime" && (
              <div>
                <h2 className="text-xl font-black uppercase mb-6 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#3496FF]" />
                  Choose Date & Time
                </h2>
                <p className="text-sm text-gray-400 mb-4">
                  Available from {todayStr()}. Sundays and blocked dates are unavailable in this demo.
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-7 gap-2 mb-8">
                  {calendarDays.map((day) => (
                    <button
                      key={day.date}
                      type="button"
                      disabled={day.blocked}
                      onClick={() => {
                        setSelectedDate(day.date);
                        setSelectedTime(null);
                      }}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        day.blocked
                          ? "border-white/5 bg-white/[0.02] text-gray-600 cursor-not-allowed line-through"
                          : selectedDate === day.date
                            ? "border-[#3496FF] bg-[#3496FF]/10 text-white"
                            : "border-white/10 bg-white/5 hover:border-[#A886CD]/50 text-gray-300"
                      }`}
                    >
                      <div className="text-[10px] uppercase font-bold text-gray-500">{day.weekday}</div>
                      <div className="text-sm font-bold">{day.label}</div>
                    </button>
                  ))}
                </div>
                {selectedDate && (
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#A886CD] mb-3">
                      Available Times
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {BOOKING_TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          className={`py-3 px-4 rounded-xl border font-bold text-sm transition-all ${
                            selectedTime === slot
                              ? "border-[#3496FF] bg-[#3496FF]/10 text-white"
                              : "border-white/10 bg-white/5 hover:border-[#A886CD]/50 text-gray-300"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === "info" && (
              <div>
                <h2 className="text-xl font-black uppercase mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-[#3496FF]" />
                  Your Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block sm:col-span-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 block">
                      Full Name *
                    </span>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="John Smith"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#3496FF] focus:outline-none text-white placeholder:text-gray-600"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 block">
                      Email *
                    </span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#3496FF] focus:outline-none text-white placeholder:text-gray-600"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 block">
                      Phone *
                    </span>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="(555) 123-4567"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#3496FF] focus:outline-none text-white placeholder:text-gray-600"
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 block">
                      Vehicle (Year, Make, Model) *
                    </span>
                    <input
                      type="text"
                      value={form.vehicle}
                      onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
                      placeholder="2022 BMW X5"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#3496FF] focus:outline-none text-white placeholder:text-gray-600"
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 block">
                      Notes (optional)
                    </span>
                    <textarea
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      placeholder="Pet hair, stains, special requests..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#3496FF] focus:outline-none text-white placeholder:text-gray-600 resize-none"
                    />
                  </label>
                </div>
              </div>
            )}

            {step === "confirm" && selectedService && selectedDate && selectedTime && (
              <div>
                <h2 className="text-xl font-black uppercase mb-6">Review & Confirm</h2>
                <div className="space-y-4 mb-6">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Service</p>
                    <p className="font-bold text-white">{selectedService.name}</p>
                    <p className="text-sm text-[#3496FF] mt-1">
                      {selectedService.priceLabel} · {formatDuration(selectedService.durationMinutes)}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Appointment</p>
                    <p className="font-bold text-white">
                      {new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}{" "}
                      at {selectedTime}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Contact</p>
                    <p className="font-bold text-white">{form.name}</p>
                    <p className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                      <Mail className="w-3.5 h-3.5" /> {form.email}
                    </p>
                    <p className="text-sm text-gray-400 flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5" /> {form.phone}
                    </p>
                    <p className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                      <Car className="w-3.5 h-3.5" /> {form.vehicle}
                    </p>
                    {form.notes && (
                      <p className="text-sm text-gray-500 mt-2 italic">"{form.notes}"</p>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                  {DETAILING_DISCLAIMER}. No real appointment will be created — this confirms the demo booking
                  experience only.
                </p>
                {submitted ? (
                  <div className="p-4 rounded-xl bg-[#3496FF]/10 border border-[#3496FF]/30 text-center">
                    <Check className="w-8 h-8 text-[#3496FF] mx-auto mb-2" />
                    <p className="font-bold text-white">Demo booking submitted!</p>
                    <Link href="/detailing" className="inline-block mt-4 text-[#3496FF] hover:underline text-sm">
                      Return to homepage
                    </Link>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full py-4 rounded-xl font-black uppercase tracking-wide bg-gradient-to-r from-[#A886CD] to-[#3496FF] hover:shadow-[0_0_30px_rgba(52,150,255,0.4)] transition-all"
                  >
                    Confirm Booking
                  </button>
                )}
              </div>
            )}

            {step !== "confirm" && (
              <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-white/10">
                {step !== "service" ? (
                  <button
                    type="button"
                    onClick={goBack}
                    className="px-5 py-3 rounded-xl border border-white/10 text-gray-300 hover:text-white hover:border-white/30 font-bold text-sm transition-colors"
                  >
                    Back
                  </button>
                ) : (
                  <div />
                )}
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!canContinue}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-black text-sm uppercase tracking-wide bg-gradient-to-r from-[#A886CD] to-[#3496FF] disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(52,150,255,0.3)] transition-all"
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {step === "confirm" && !submitted && (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={goBack}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  ← Edit details
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
