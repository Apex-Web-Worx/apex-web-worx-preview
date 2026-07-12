import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, UtensilsCrossed, Sparkles, Hammer, Scissors, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    title: "Apex Detailing",
    description: "Auto detailing booking with appointments, service gallery, add-ons, and admin dashboard.",
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
    <div className="min-h-screen bg-[#0a0a0a] text-[#F5EFE4]">
      <header className="border-b border-white/10">
        <div className="container mx-auto px-6 py-8 md:py-12">
          <p className="text-[#C8A45D] text-xs uppercase tracking-[0.3em] mb-3">Apex Web Worx</p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">Demo Preview Hub</h1>
          <p className="text-[#F5EFE4]/70 max-w-2xl text-lg font-light">
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
              className="border border-white/10 bg-[#111] p-6 flex flex-col hover:border-[#C8A45D]/40 transition-colors"
            >
              <demo.icon className="w-8 h-8 text-[#C8A45D] mb-4" />
              <h2 className="font-serif text-2xl font-bold mb-2">{demo.title}</h2>
              <p className="text-sm text-[#F5EFE4]/60 font-light leading-relaxed mb-6 flex-1">
                {demo.description}
              </p>
              {demo.live ? (
                <div className="space-y-2">
                  <Button asChild className="rounded-none bg-[#C8A45D] hover:bg-[#C8A45D]/90 text-[#0a0a0a] w-full">
                    <Link href={demo.path}>
                      View Demo <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  {demo.path === "/catering" && (
                    <Button asChild variant="outline" className="rounded-none border-white/20 w-full">
                      <Link href="/catering/menu-selection?demo=1">Open Menu Builder (Step 2)</Link>
                    </Button>
                  )}
                </div>
              ) : (
                <Button asChild variant="outline" className="rounded-none border-white/20 w-full">
                  <Link href={demo.path}>Preview Concept</Link>
                </Button>
              )}
            </motion.article>
          ))}
        </div>
      </main>

      <footer className="border-t border-white/10 py-8 text-center text-xs text-[#F5EFE4]/40 uppercase tracking-widest">
        <a href="https://apexwebworx.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#C8A45D] transition-colors">
          apexwebworx.com
        </a>
      </footer>
    </div>
  );
}
