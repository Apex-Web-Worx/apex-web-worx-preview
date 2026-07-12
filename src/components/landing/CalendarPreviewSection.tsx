import { motion } from "framer-motion";
import { Calendar, Ban } from "lucide-react";
import { DEMO_BOOKED_DATES } from "@/lib/demo";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function CalendarPreviewSection() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  function dateStr(day: number): string {
    const m = String(month + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${year}-${m}-${d}`;
  }

  function isBooked(day: number): boolean {
    return DEMO_BOOKED_DATES.includes(dateStr(day));
  }

  function isPast(day: number): boolean {
    const d = new Date(year, month, day);
    d.setHours(0, 0, 0, 0);
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return d < t;
  }

  return (
    <section id="calendar" className="py-16 sm:py-24 md:py-32 bg-secondary border-t border-white/5">
      <div className="container px-4 sm:px-6 md:px-12 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="uppercase tracking-[0.2em] text-xs text-[#C8A45D] font-medium mb-4 block">
              Availability
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Calendar Booking Preview
            </h2>
            <p className="text-foreground/70 text-lg font-light leading-relaxed mb-6">
              Clients select event dates with real-time availability checks. Booked dates
              are blocked automatically — connect this to your Google Calendar or CRM for
              live sync.
            </p>
            <ul className="space-y-3 text-sm text-foreground/60">
              <li className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#C8A45D]" />
                Minimum lead time rules (e.g. 14 days ahead)
              </li>
              <li className="flex items-center gap-2">
                <Ban className="w-4 h-4 text-[#C8A45D]" />
                Admin-blocked dates for private events
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-background border border-white/10 p-6 md:p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-2xl font-bold">
                {monthNames[month]} {year}
              </h3>
              <span className="text-xs uppercase tracking-widest text-foreground/50">
                Preview
              </span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs uppercase tracking-wider text-foreground/40 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d} className="py-2">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {cells.map((day, i) => {
                if (day === null) return <div key={`empty-${i}`} />;
                const booked = isBooked(day);
                const past = isPast(day);
                return (
                  <div
                    key={day}
                    className={`aspect-square flex items-center justify-center text-sm border ${
                      booked
                        ? "bg-red-500/20 border-red-500/30 text-red-300 line-through"
                        : past
                          ? "border-white/5 text-foreground/25"
                          : "border-white/10 text-foreground hover:border-[#C8A45D]/50 cursor-default"
                    }`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
            <div className="flex gap-6 mt-6 text-xs text-foreground/50">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500/20 border border-red-500/30" />
                Booked
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 border border-[#C8A45D]/50" />
                Available
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
