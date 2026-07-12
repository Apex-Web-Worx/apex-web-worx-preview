import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Image,
  MessageSquare,
  Settings,
  Ban,
} from "lucide-react";
import DetailingDisclaimer from "@/components/detailing/DetailingDisclaimer";
import { DETAILING_ADMIN_BOOKINGS } from "@/lib/detailing-demo";

const statusConfig: Record<string, { label: string; className: string; icon: React.ReactNode }> = {
  pending: { label: "Pending", className: "detail-status-pending", icon: <Clock className="w-3 h-3" /> },
  confirmed: { label: "Confirmed", className: "detail-status-confirmed", icon: <CheckCircle className="w-3 h-3" /> },
  in_progress: { label: "In Progress", className: "detail-status-in_progress", icon: <AlertCircle className="w-3 h-3" /> },
  completed: { label: "Completed", className: "detail-status-completed", icon: <CheckCircle className="w-3 h-3" /> },
  cancelled: { label: "Cancelled", className: "detail-status-cancelled", icon: <XCircle className="w-3 h-3" /> },
};

const summaryCards = [
  { label: "Total Bookings", value: "47", icon: Calendar },
  { label: "Upcoming Appointments", value: "8", icon: Clock },
  { label: "New Clients", value: "12", icon: Users },
  { label: "Monthly Revenue", value: "$8,450", icon: DollarSign },
  { label: "Pending Estimates", value: "3", icon: AlertCircle },
];

const dashboardFeatures = [
  { icon: Calendar, label: "Bookings & Appointments" },
  { icon: Users, label: "Customer Information" },
  { icon: Settings, label: "Service Pricing" },
  { icon: Image, label: "Before & After Photos" },
  { icon: MessageSquare, label: "Customer Messages" },
  { icon: Ban, label: "Blocked Calendar Dates" },
];

export default function DetailingAdminSection() {
  const completedRevenue = DETAILING_ADMIN_BOOKINGS.filter((b) => b.status === "completed")
    .reduce((s, b) => s + b.revenue, 0);

  return (
    <section id="admin" className="py-16 sm:py-24 md:py-32 bg-[#0d0d12] border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="detail-section-label mb-4 block">Business Tools</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Admin Dashboard Preview
          </h2>
          <p className="text-[#94a3b8] max-w-2xl mx-auto font-light mb-2">
            Manage your detailing business from one organized dashboard.
          </p>
          <p className="text-sm text-[#94a3b8]/70 max-w-xl mx-auto">
            Frontend preview only — no real authentication or database logic.
          </p>
          <DetailingDisclaimer variant="inline" className="mt-6" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="detail-card rounded-lg overflow-hidden"
        >
          <div className="p-4 md:p-6 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-display text-xl font-bold">Apex Detailing Dashboard</h3>
              <p className="text-xs text-[#94a3b8] uppercase tracking-widest mt-1">Demo — sample data</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {dashboardFeatures.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#94a3b8] bg-white/5 px-2 py-1 rounded"
                >
                  <Icon className="w-3 h-3" /> {label}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-white/5">
            {summaryCards.map((card) => (
              <div key={card.label} className="bg-[#16161e] p-4 md:p-5">
                <div className="flex items-center gap-2 text-[#94a3b8] text-[10px] uppercase tracking-widest mb-2">
                  <card.icon className="w-3.5 h-3.5" />
                  <span className="truncate">{card.label}</span>
                </div>
                <p className="font-display text-2xl md:text-3xl font-bold">{card.value}</p>
              </div>
            ))}
          </div>

          <div className="p-4 md:p-6 border-t border-white/5">
            <h4 className="font-display text-sm uppercase tracking-widest text-[#94a3b8] mb-4">
              Recent Bookings
            </h4>
            <div className="divide-y divide-white/5">
              {DETAILING_ADMIN_BOOKINGS.map((booking) => {
                const status = statusConfig[booking.status];
                return (
                  <div
                    key={booking.id}
                    className="py-3 md:py-4 flex flex-col md:flex-row md:items-center justify-between gap-2 hover:bg-white/[0.02] transition-colors px-1"
                  >
                    <div>
                      <p className="font-medium text-sm">{booking.name}</p>
                      <p className="text-xs text-[#94a3b8]">
                        {booking.vehicle} · {booking.service} · {booking.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded ${status.className}`}
                      >
                        {status.icon}
                        {status.label}
                      </span>
                      {booking.revenue > 0 && (
                        <span className="font-display text-[#00e5ff] text-sm">
                          ${booking.revenue}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-[#94a3b8]/60 mt-4 text-right">
              Completed jobs revenue (sample): ${completedRevenue.toLocaleString()}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
