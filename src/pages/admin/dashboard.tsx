import { Link } from "wouter";
import {
  Users,
  Calendar,
  DollarSign,
  ChevronRight,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DemoDisclaimer from "@/components/demo/DemoDisclaimer";
import { DEMO_ADMIN_BOOKINGS, DEMO_BRAND } from "@/lib/demo";
import { useDemoModal } from "@/contexts/DemoModalContext";

const logoPath = `${import.meta.env.BASE_URL}premier-logo.svg`;

const statusStyles: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  new_inquiry: { bg: "bg-[#C8A45D]/10", text: "text-[#C8A45D]", icon: <AlertCircle className="w-3 h-3" /> },
  pending_approval: { bg: "bg-white/10", text: "text-white/70", icon: <Clock className="w-3 h-3" /> },
  approved: { bg: "bg-[#C8A45D]/10", text: "text-[#C8A45D]", icon: <CheckCircle className="w-3 h-3" /> },
};

function formatStatus(status: string) {
  return status.split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export default function AdminDashboard() {
  const { showDemoModal } = useDemoModal();
  const totalGuests = DEMO_ADMIN_BOOKINGS.reduce((s, b) => s + b.guestCount, 0);
  const totalRevenue = DEMO_ADMIN_BOOKINGS.reduce((s, b) => s + (b.totalPrice ?? 0), 0);

  return (
    <div className="catering-site min-h-screen bg-[#0F0F0D] text-foreground">
      <header className="border-b border-white/10 px-4 md:px-8 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="~/">
            <Button variant="ghost" size="sm" className="rounded-none text-foreground/70 hover:text-[#C8A45D]">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Demo Hub
            </Button>
          </Link>
          <img src={logoPath} alt={DEMO_BRAND.name} className="h-10 w-auto hidden sm:block" />
        </div>
        <span className="text-xs uppercase tracking-widest text-[#C8A45D]">Admin Preview</span>
      </header>

      <div className="container mx-auto px-4 md:px-8 py-8">
        <DemoDisclaimer className="mb-8" />

        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Booking Dashboard</h1>
          <p className="text-foreground/50 text-sm">Sample data only — no live backend connected.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-secondary border border-white/10 p-6">
            <div className="flex items-center gap-2 text-foreground/50 text-xs uppercase tracking-widest mb-2">
              <Users className="w-4 h-4" /> Active Bookings
            </div>
            <p className="font-serif text-3xl font-bold">{DEMO_ADMIN_BOOKINGS.length}</p>
          </div>
          <div className="bg-secondary border border-white/10 p-6">
            <div className="flex items-center gap-2 text-foreground/50 text-xs uppercase tracking-widest mb-2">
              <Calendar className="w-4 h-4" /> Total Guests
            </div>
            <p className="font-serif text-3xl font-bold">{totalGuests}</p>
          </div>
          <div className="bg-secondary border border-white/10 p-6">
            <div className="flex items-center gap-2 text-foreground/50 text-xs uppercase tracking-widest mb-2">
              <DollarSign className="w-4 h-4" /> Est. Revenue
            </div>
            <p className="font-serif text-3xl font-bold text-[#C8A45D]">${totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-secondary border border-white/10 divide-y divide-white/5">
          {DEMO_ADMIN_BOOKINGS.map((booking) => {
            const style = statusStyles[booking.status] ?? statusStyles.new_inquiry;
            return (
              <button
                key={booking.id}
                type="button"
                onClick={showDemoModal}
                className="w-full p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-white/[0.02] transition-colors text-left"
              >
                <div>
                  <p className="font-medium">{booking.name}</p>
                  <p className="text-sm text-foreground/50">
                    {booking.eventType} · {booking.guestCount} guests · {booking.eventDate}
                  </p>
                  <p className="text-xs text-foreground/40 mt-1">{booking.location}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs ${style.bg} ${style.text}`}>
                    {style.icon}
                    {formatStatus(booking.status)}
                  </span>
                  <span className="font-serif text-[#C8A45D]">${booking.totalPrice?.toLocaleString()}</span>
                  <ChevronRight className="w-4 h-4 text-foreground/30 hidden md:block" />
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Button onClick={showDemoModal} className="rounded-none bg-primary hover:bg-primary/90">
            Approve Booking (Demo)
          </Button>
          <Button onClick={showDemoModal} variant="outline" className="rounded-none border-white/20">
            Block Date (Demo)
          </Button>
        </div>
      </div>
    </div>
  );
}
