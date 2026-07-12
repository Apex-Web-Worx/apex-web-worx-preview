import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, UtensilsCrossed, Sparkles, Hammer, Scissors, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";

const APEX_LOGO = `${import.meta.env.BASE_URL}apex-webworx-logo.webp?v=4`;
const HUB_BUILD = "2026-07-12-hubv4";

const demos = [
  {
    path: "/catering",
    title: "Premier Event Catering",
    description: "Full catering platform demo — booking, menu builder, calendar, and admin dashboard.",
    icon: UtensilsCrossed,
    live: true,
  },
  {
    path: "/detailing",
    title: "Elite Detailing",
    description: "Auto detailing demo with online booking, admin dashboard, service gallery, add-ons, and scheduling flow.",
    icon: Sparkles,
    live: true,
  },
  {
    path: "/contractor",
    title: "Contractor Pro",
    description: "Lead capture, project estimates, and client portal for contractors.",
    icon: Hammer,
    live: false,
  },
  {
    path: "/salon",
    title: "Salon & Spa",
    description: "Appointment scheduling, stylist profiles, and membership packages.",
    icon: Scissors,
    live: false,
  },
  {
    path: "/restaurant",
    title: "Restaurant Reserve",
    description: "Table reservations, online menu, and private event inquiries.",
    icon: ChefHat,
    live: false,
  },
];

export default function PreviewHub() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="relative border-b border-white/10 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-[#4F8FF7]/20 blur-[120px]" />
          <div className="absolute -top-16 right-1/4 h-72 w-72 rounded-full bg-[#B46BFF]/15 blur-[120px]" />
        </div>

        <div className="container relative mx-auto px-6 py-8 md:py-12">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#00EAFF]/60 mb-4">
            Build {HUB_BUILD}
          </p>
          <a
            href="https://apexwebworx.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 sm:gap-5 mb-8 group"
            aria-label="Apex Web Worx"
          >
            <img
              src={APEX_LOGO}
              alt="Apex Web Worx"
              className="h-16 sm:h-20 md:h-24 w-auto max-w-[280px] object-contain drop-shadow-[0_0_24px_rgba(79,143,247,0.45)] transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <span className="hidden sm:flex flex-col leading-none border-l border-white/15 pl-5">
              <span className="text-xs font-bold tracking-[0.4em] uppercase text-[#00EAFF]">
                Web Worx
              </span>
              <span className="mt-1.5 text-sm tracking-[0.15em] uppercase text-white/60">
                Digital Studio
              </span>
            </span>
          </a>

          <h1 className="text-4xl md:text-6xl font-black italic tracking-tight mb-4 max-w-3xl">
            Demo{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5B9FFF] via-[#00EAFF] to-[#B46BFF]">
              Preview Hub
            </span>
          </h1>
          <p className="max-w-2xl text-base md:text-lg text-white/65 font-medium leading-relaxed">
            Explore website concepts built by Apex Web Worx. Each demo is frontend-only — no real
            data, payments, or backend connections.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demos.map((demo, index) => (
            <motion.article
              key={demo.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="group border border-white/10 bg-[#0a0a0f] p-6 flex flex-col hover:border-[#00EAFF]/35 hover:shadow-[0_0_32px_rgba(79,143,247,0.12)] transition-all duration-300"
            >
              <demo.icon className="w-8 h-8 text-[#00EAFF] mb-4 transition-colors group-hover:text-[#B46BFF]" />
              <h2 className="text-2xl font-bold italic tracking-wide mb-2">{demo.title}</h2>
              <p className="text-sm text-white/55 font-medium leading-relaxed mb-6 flex-1">
                {demo.description}
              </p>
              {demo.live ? (
                <div className="space-y-2">
                  <Button
                    asChild
                    className="rounded-lg w-full font-bold bg-gradient-to-r from-[#4F8FF7] via-[#00EAFF] to-[#B46BFF] text-black hover:opacity-95 border-0"
                  >
                    <Link href={demo.path}>
                      View Demo <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  {demo.path === "/catering" && (
                    <Button
                      asChild
                      variant="outline"
                      className="rounded-lg border-white/15 bg-transparent text-white/80 hover:text-white hover:border-[#00EAFF]/40 w-full"
                    >
                      <Link href="/catering/menu-selection?demo=1">Open Menu Builder (Step 2)</Link>
                    </Button>
                  )}
                  {demo.path === "/detailing" && (
                    <>
                      <Button
                        asChild
                        variant="outline"
                        className="rounded-lg border-white/15 bg-transparent text-white/80 hover:text-white hover:border-[#00EAFF]/40 w-full"
                      >
                        <Link href="/detailing/book">Open Booking (Schedule)</Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="rounded-lg border-white/15 bg-transparent text-white/80 hover:text-white hover:border-[#00EAFF]/40 w-full"
                      >
                        <Link href="/detailing/admin">Open Admin Dashboard</Link>
                      </Button>
                    </>
                  )}
                </div>
              ) : (
                <Button
                  asChild
                  variant="outline"
                  className="rounded-lg border-white/15 bg-transparent text-white/80 hover:text-white hover:border-[#00EAFF]/40 w-full"
                >
                  <Link href={demo.path}>Preview Concept</Link>
                </Button>
              )}
            </motion.article>
          ))}
        </div>
      </main>

      <footer className="border-t border-white/10 py-10">
        <div className="container mx-auto px-6 flex flex-col items-center gap-4 text-center">
          <a
            href="https://apexwebworx.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex flex-col items-center gap-3"
          >
            <img
              src={APEX_LOGO}
              alt="Apex Web Worx"
              className="h-16 sm:h-20 w-auto max-w-[240px] object-contain drop-shadow-[0_0_20px_rgba(79,143,247,0.35)] opacity-90 group-hover:opacity-100 transition-opacity"
            />
            <span className="text-xs uppercase tracking-[0.35em] text-white/40 group-hover:text-[#00EAFF] transition-colors">
              apexwebworx.com
            </span>
          </a>
        </div>
      </footer>
    </div>
  );
}
