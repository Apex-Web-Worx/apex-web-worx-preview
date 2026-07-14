import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Calendar,
  Car,
  ChevronRight,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  ArrowLeft,
  Phone,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import DetailingDisclaimer from "@/components/detailing/DetailingDisclaimer";
import "@/styles/detailing.css";
import {
  DETAILING_ADMIN_BOOKINGS,
  DETAILING_BRAND,
  type DetailingBookingStatus,
} from "@/lib/detailing-demo";
import { useDetailingModal } from "@/contexts/DetailingModalContext";
import {
  getDetailingAdminSession,
  isDetailingAdminAuthed,
  logoutDetailingAdmin,
} from "@/lib/detailing-auth";

const LOGO_URL = `${import.meta.env.BASE_URL}elite-detailing-logo.webp?v=3`;

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

export default function DetailingAdminDashboard() {
  const { showDetailingModal } = useDetailingModal();
  const [, setLocation] = useLocation();
  const [ready, setReady] = useState(false);
  const session = getDetailingAdminSession();

  useEffect(() => {
    if (!isDetailingAdminAuthed()) {
      setLocation(DETAILING_BRAND.adminLoginPath);
      return;
    }
    setReady(true);
  }, [setLocation]);

  const handleLogout = () => {
    logoutDetailingAdmin();
    setLocation(DETAILING_BRAND.adminLoginPath);
  };

  const pendingCount = DETAILING_ADMIN_BOOKINGS.filter(
    (b) => b.status === "new_inquiry" || b.status === "pending_approval",
  ).length;
  const totalRevenue = DETAILING_ADMIN_BOOKINGS.reduce((s, b) => s + b.totalPrice, 0);

  if (!ready) {
    return (
      <div className="detailing-site min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400 text-sm tech-label tracking-widest uppercase">Loading dashboard…</p>
      </div>
    );
  }

  return (
    <div className="detailing-site min-h-screen bg-black text-white">
      <div className="texture-overlay" />
      <DetailingDisclaimer className="fixed top-0 left-0 right-0 z-[60]" />

      <header className="detail-subheader">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-2 sm:gap-4 min-h-[var(--detail-nav-h)]">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <Link
              href="/detailing"
              className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-gray-300 hover:text-[#00EAFF] transition-colors shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Site</span>
            </Link>
            <img src={LOGO_URL} alt="" aria-hidden="true" className="logo-img logo-nav logo-shine hidden sm:block" />
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {session ? (
              <span className="hidden md:inline text-xs text-gray-500 mr-1 truncate max-w-[120px]">
                {session.name}
              </span>
            ) : null}
            <span className="inline-flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs uppercase tracking-widest text-[#00EAFF] tech-label">
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="detail-touch-target inline-flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-[#E6007A] transition-colors px-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Log Out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 detail-page-main">

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black italic uppercase tracking-tight mb-2">
            Booking{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E6007A] via-[#A855F7] to-[#00EAFF]">
              Dashboard
            </span>
          </h1>
          <p className="text-gray-500 text-sm font-medium">
            Sample data only — no live backend connected. Same workflow as the production admin
            panel, styled for {DETAILING_BRAND.name}.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl border border-white/10 bg-[#0a0a0f] p-6 hover:border-[#00EAFF]/30 transition-colors">
            <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-widest mb-2 tech-label">
              <Car className="w-4 h-4 text-[#00EAFF]" /> Active Bookings
            </div>
            <p className="text-3xl font-black italic">{DETAILING_ADMIN_BOOKINGS.length}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#0a0a0f] p-6 hover:border-[#E6007A]/30 transition-colors">
            <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-widest mb-2 tech-label">
              <Clock className="w-4 h-4 text-[#E6007A]" /> Pending Review
            </div>
            <p className="text-3xl font-black italic">{pendingCount}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#0a0a0f] p-6 hover:border-[#00EAFF]/30 transition-colors">
            <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-widest mb-2 tech-label">
              <DollarSign className="w-4 h-4 text-[#00EAFF]" /> Est. Revenue
            </div>
            <p className="text-3xl font-black italic bg-clip-text text-transparent bg-gradient-to-r from-[#E6007A] via-[#A855F7] to-[#00EAFF]">
              ${totalRevenue.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#0a0a0f] divide-y divide-white/5 overflow-hidden">
          {DETAILING_ADMIN_BOOKINGS.map((booking) => {
            const style = statusStyles[booking.status];
            return (
              <button
                key={booking.id}
                type="button"
                onClick={showDetailingModal}
                className="w-full p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-[#E6007A]/5 transition-colors text-left group"
              >
                <div className="min-w-0">
                  <p className="font-bold text-white group-hover:text-[#00EAFF] transition-colors">
                    {booking.name}
                  </p>
                  <p className="text-sm text-gray-400">
                    {booking.service} · {booking.vehicle}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {booking.appointmentDate} at {booking.appointmentTime}
                    {booking.phone ? (
                      <span className="inline-flex items-center gap-1 ml-2">
                        <Phone className="w-3 h-3 inline" />
                        {booking.phone}
                      </span>
                    ) : null}
                  </p>
                  {booking.notes ? (
                    <p className="text-xs text-gray-600 mt-1 italic">{booking.notes}</p>
                  ) : null}
                </div>
                <div className="flex flex-wrap items-start sm:items-center gap-2 sm:gap-4 shrink-0 w-full sm:w-auto">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-full ${style.bg} ${style.text}`}
                  >
                    {style.icon}
                    {formatStatus(booking.status)}
                  </span>
                  <span className="font-bold text-[#00EAFF] text-sm sm:text-base">${booking.totalPrice.toLocaleString()}</span>
                  <ChevronRight className="w-4 h-4 text-gray-600 hidden md:block group-hover:text-[#00EAFF] transition-colors ml-auto sm:ml-0" />
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
          <button type="button" onClick={showDetailingModal} className="btn-elite-primary text-sm w-full sm:w-auto">
            Approve Booking (Demo)
          </button>
          <button type="button" onClick={showDetailingModal} className="btn-elite-outline text-sm w-full sm:w-auto">
            Block Date (Demo)
          </button>
          <Link href={DETAILING_BRAND.bookPath} className="btn-elite-outline text-sm w-full sm:w-auto text-center">
            View Client Booking Flow
          </Link>
        </div>
      </div>
    </div>
  );
}
