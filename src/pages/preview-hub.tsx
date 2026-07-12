import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, UtensilsCrossed, Sparkles, Hammer, Scissors, ChefHat } from "lucide-react";
import "@/styles/preview-hub.css";

const APEX_LOGO = `${import.meta.env.BASE_URL}apex-webworx-logo.webp?v=4`;
const HUB_BUILD = "2026-07-12-magenta";

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
    <div className="preview-hub-site min-h-screen relative">
      <div className="hub-bokeh" aria-hidden="true">
        <div className="hub-bokeh-dot w-64 h-64 bg-[#B5309B] top-[8%] left-[12%]" />
        <div className="hub-bokeh-dot w-48 h-48 bg-[#7D34F1] top-[18%] right-[18%]" />
        <div className="hub-bokeh-dot w-32 h-32 bg-[#B5309B] bottom-[30%] left-[35%]" />
        <div className="hub-bokeh-dot w-56 h-56 bg-[#7D34F1] bottom-[12%] right-[8%]" />
        <div className="hub-bokeh-dot w-20 h-20 bg-[#B5309B] top-[45%] left-[55%]" />
      </div>

      <header className="relative z-10 border-b border-white/[0.08]">
        <div className="container mx-auto px-6 py-10 md:py-14 lg:py-16">
          <p className="text-[10px] uppercase tracking-[0.28em] text-white/35 mb-6 font-semibold">
            Build {HUB_BUILD}
          </p>

          <a
            href="https://apexwebworx.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mb-10 group"
            aria-label="Apex Web Worx"
          >
            <img
              src={APEX_LOGO}
              alt="Apex Web Worx"
              className="h-14 sm:h-16 md:h-[4.5rem] w-auto max-w-[260px] object-contain drop-shadow-[0_0_28px_rgba(181,48,155,0.35)] transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </a>

          <h1 className="text-[2.35rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] leading-[0.95] max-w-4xl mb-6">
            <span className="block text-white">Website Demo</span>
            <span className="block text-white">Concepts &</span>
            <span className="block hub-gradient-text">Interactive Previews</span>
            <span className="block hub-gradient-text">That Inspire Growth</span>
          </h1>

          <p className="max-w-2xl text-base md:text-lg text-white/60 font-medium leading-relaxed">
            Explore website concepts built by Apex Web Worx. Each demo is frontend-only — no real
            data, payments, or backend connections.
          </p>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {demos.map((demo, index) => (
            <motion.article
              key={demo.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="hub-card p-6 flex flex-col"
            >
              <demo.icon className="w-8 h-8 text-[#B5309B] mb-4" />
              <h2 className="text-xl md:text-2xl font-bold mb-2 tracking-tight">{demo.title}</h2>
              <p className="text-sm text-white/55 font-medium leading-relaxed mb-6 flex-1">
                {demo.description}
              </p>
              {demo.live ? (
                <div className="space-y-2">
                  <Link href={demo.path} className="hub-btn-primary">
                    View Demo <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                  {demo.path === "/catering" && (
                    <Link href="/catering/menu-selection?demo=1" className="hub-btn-outline">
                      Open Menu Builder (Step 2)
                    </Link>
                  )}
                  {demo.path === "/detailing" && (
                    <>
                      <Link href="/detailing/book" className="hub-btn-outline">
                        Open Booking (Schedule)
                      </Link>
                      <Link href="/detailing/admin" className="hub-btn-outline">
                        Open Admin Dashboard
                      </Link>
                    </>
                  )}
                </div>
              ) : (
                <Link href={demo.path} className="hub-btn-outline">
                  Preview Concept
                </Link>
              )}
            </motion.article>
          ))}
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/[0.08] py-10">
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
              className="h-14 sm:h-16 w-auto max-w-[220px] object-contain opacity-85 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_20px_rgba(125,52,241,0.3)]"
            />
            <span className="text-xs uppercase tracking-[0.32em] text-white/35 group-hover:text-[#B5309B] transition-colors font-semibold">
              apexwebworx.com
            </span>
          </a>
        </div>
      </footer>
    </div>
  );
}
