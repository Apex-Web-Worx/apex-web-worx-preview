import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Calendar,
  Car,
  ChevronRight,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  LayoutDashboard,
} from "lucide-react";
import DetailingDisclaimer from "@/components/detailing/DetailingDisclaimer";
import { DETAILING_ADMIN_BOOKINGS, type DetailingBookingStatus } from "@/lib/detailing-demo";

const statusStyles: Record<
  DetailingBookingStatus,
  { bg: string; text: string; icon: React.ReactNode }
> = {
  new_inquiry: {
    bg: "bg-[#E6007A]/15",
    text: "text-[#FF1493]",
    icon: <AlertCircle className="w-3 h-3" />,
  },
  pending_approval: {
    bg: "bg-white/10",
    text: "text-white/70",
    icon: <Clock className="w-3 h-3" />,
  },
  approved: {
    bg: "bg-[#00EAFF]/15",
    text: "text-[#00EAFF]",
    icon: <CheckCircle className="w-3 h-3" />,
  },
  scheduled: {
    bg: "bg-[#00EAFF]/10",
    text: "text-[#00EAFF]",
    icon: <Calendar className="w-3 h-3" />,
  },
  completed: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    icon: <CheckCircle className="w-3 h-3" />,
  },
};

function formatStatus(status: string) {
  return status.split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export default function DetailingAdminPreviewSection() {
  const totalVehicles = DETAILING_ADMIN_BOOKINGS.length;
  const pendingCount = DETAILING_ADMIN_BOOKINGS.filter(
    (b) => b.status === "new_inquiry" || b.status === "pending_approval",
  ).length;
  const totalRevenue = DETAILING_ADMIN_BOOKINGS.reduce((s, b) => s + b.totalPrice, 0);

  return (
    <section id="admin-preview" className="py-20 sm:py-24 relative border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#E6007A]/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#00EAFF]/10 rounded-full blur-[120px]" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-[#E6007A]/30 mb-4">
            <LayoutDashboard className="w-4 h-4 text-[#00EAFF]" />
            <span className="text-xs font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#E6007A] to-[#00EAFF] uppercase tech-label">
              Admin Dashboard
            </span>
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
            Business Owner{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E6007A] to-[#00EAFF]">
              Control Panel
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-medium mb-6">
            Review appointments, approve bookings, manage blocked dates, and track revenue — all
            from a mobile-friendly admin dashboard.
          </p>
          <DetailingDisclaimer variant="inline" className="max-w-xl mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-xl border border-white/10 bg-[#0a0a0f]/80 backdrop-blur-sm overflow-hidden shadow-[0_0_40px_rgba(230,0,122,0.08)]"
        >
          <div className="p-4 md:p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-black italic uppercase tracking-wide">Booking Dashboard</h3>
              <p className="text-xs text-gray-500 uppercase tracking-widest mt-1 tech-label">
                Demo preview — sample data only
              </p>
            </div>
            <Link
              href="/detailing/admin/login"
              className="btn-elite-primary text-sm px-5 py-2.5 text-center shrink-0"
            >
              Admin Login
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/5">
            <div className="bg-[#0a0a0f] p-6">
              <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-widest mb-2 tech-label">
                <Car className="w-4 h-4 text-[#00EAFF]" /> Active Bookings
              </div>
              <p className="text-3xl font-black italic">{totalVehicles}</p>
            </div>
            <div className="bg-[#0a0a0f] p-6">
              <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-widest mb-2 tech-label">
                <Clock className="w-4 h-4 text-[#E6007A]" /> Pending Review
              </div>
              <p className="text-3xl font-black italic">{pendingCount}</p>
            </div>
            <div className="bg-[#0a0a0f] p-6">
              <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-widest mb-2 tech-label">
                <DollarSign className="w-4 h-4 text-[#00EAFF]" /> Est. Revenue
              </div>
              <p className="text-3xl font-black italic bg-clip-text text-transparent bg-gradient-to-r from-[#E6007A] to-[#00EAFF]">
                ${totalRevenue.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="divide-y divide-white/5">
            {DETAILING_ADMIN_BOOKINGS.slice(0, 3).map((booking) => {
              const style = statusStyles[booking.status];
              return (
                <div
                  key={booking.id}
                  className="p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-white/[0.02] transition-colors"
                >
                  <div>
                    <p className="font-bold text-white">{booking.name}</p>
                    <p className="text-sm text-gray-400">
                      {booking.service} · {booking.vehicle}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {booking.appointmentDate} at {booking.appointmentTime}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full ${style.bg} ${style.text}`}
                    >
                      {style.icon}
                      {formatStatus(booking.status)}
                    </span>
                    <span className="font-bold text-[#00EAFF]">${booking.totalPrice.toLocaleString()}</span>
                    <ChevronRight className="w-4 h-4 text-gray-600 hidden md:block" />
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
