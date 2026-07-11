import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Users,
  Calendar,
  DollarSign,
  ChevronRight,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DemoDisclaimer from "@/components/demo/DemoDisclaimer";
import { DEMO_ADMIN_BOOKINGS } from "@/lib/demo";

const statusStyles: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  new_inquiry: { bg: "bg-[#C8A45D]/10", text: "text-[#C8A45D]", icon: <AlertCircle className="w-3 h-3" /> },
  pending_approval: { bg: "bg-white/10", text: "text-white/70", icon: <Clock className="w-3 h-3" /> },
  approved: { bg: "bg-[#C8A45D]/10", text: "text-[#C8A45D]", icon: <CheckCircle className="w-3 h-3" /> },
};

function formatStatus(status: string) {
  return status.split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export default function AdminPreviewSection() {
  const totalGuests = DEMO_ADMIN_BOOKINGS.reduce((s, b) => s + b.guestCount, 0);
  const totalRevenue = DEMO_ADMIN_BOOKINGS.reduce((s, b) => s + (b.totalPrice ?? 0), 0);

  return (
    <section id="admin-preview" className="py-24 md:py-32 bg-background border-t border-white/5">
      <div className="container px-6 md:px-12 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="uppercase tracking-[0.2em] text-xs text-[#C8A45D] font-medium mb-4 block">
            Admin Dashboard
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Business Owner Control Panel
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto font-light mb-6">
            Review inquiries, approve menus, manage blocked dates, and track revenue — all
            from a mobile-friendly admin dashboard.
          </p>
          <DemoDisclaimer variant="inline" className="max-w-xl mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-secondary border border-white/10 overflow-hidden"
        >
          <div className="p-4 md:p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-xl font-bold">Booking Dashboard</h3>
              <p className="text-xs text-foreground/50 uppercase tracking-widest mt-1">
                Demo preview — sample data only
              </p>
            </div>
            <Button asChild variant="outline" className="rounded-none border-[#C8A45D]/40 text-[#C8A45D]">
              <Link href="/admin">Open Full Admin Preview</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/5">
            <div className="bg-secondary p-6">
              <div className="flex items-center gap-2 text-foreground/50 text-xs uppercase tracking-widest mb-2">
                <Users className="w-4 h-4" /> Active Bookings
              </div>
              <p className="font-serif text-3xl font-bold">{DEMO_ADMIN_BOOKINGS.length}</p>
            </div>
            <div className="bg-secondary p-6">
              <div className="flex items-center gap-2 text-foreground/50 text-xs uppercase tracking-widest mb-2">
                <Calendar className="w-4 h-4" /> Total Guests
              </div>
              <p className="font-serif text-3xl font-bold">{totalGuests}</p>
            </div>
            <div className="bg-secondary p-6">
              <div className="flex items-center gap-2 text-foreground/50 text-xs uppercase tracking-widest mb-2">
                <DollarSign className="w-4 h-4" /> Est. Revenue
              </div>
              <p className="font-serif text-3xl font-bold text-[#C8A45D]">
                ${totalRevenue.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="divide-y divide-white/5">
            {DEMO_ADMIN_BOOKINGS.map((booking) => {
              const style = statusStyles[booking.status] ?? statusStyles.new_inquiry;
              return (
                <div
                  key={booking.id}
                  className="p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-white/[0.02] transition-colors"
                >
                  <div>
                    <p className="font-medium">{booking.name}</p>
                    <p className="text-sm text-foreground/50">
                      {booking.eventType} · {booking.guestCount} guests · {booking.eventDate}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs ${style.bg} ${style.text}`}>
                      {style.icon}
                      {formatStatus(booking.status)}
                    </span>
                    <span className="font-serif text-[#C8A45D]">
                      ${booking.totalPrice?.toLocaleString()}
                    </span>
                    <ChevronRight className="w-4 h-4 text-foreground/30 hidden md:block" />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
