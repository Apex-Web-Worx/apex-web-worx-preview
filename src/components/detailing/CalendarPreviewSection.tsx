import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Ban, CheckCircle } from "lucide-react";
import { DETAILING_BLOCKED_DATES, DETAILING_TIME_SLOTS } from "@/lib/detailing-demo";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function DetailingCalendarSection() {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  function dateStr(day: number): string {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }

  function isBlocked(day: number): boolean {
    return DETAILING_BLOCKED_DATES.includes(dateStr(day));
  }

  function isPast(day: number): boolean {
    const d = new Date(year, month, day);
    d.setHours(0, 0, 0, 0);
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return d < t;
  }

  const availableSlots = selectedDay && !isBlocked(selectedDay) && !isPast(selectedDay)
    ? DETAILING_TIME_SLOTS.filter((_, i) => (selectedDay + i) % 3 !== 0)
    : [];

  return (
    <section id="calendar" className="py-16 sm:py-24 md:py-32 border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="detail-section-label mb-4 block">Scheduling</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Calendar Integration Preview
            </h2>
            <p className="text-[#94a3b8] text-lg font-light leading-relaxed mb-6">
              A realistic scheduling interface showing available dates, appointment times, blocked
              dates, and confirmation — visual demonstration only, not a live calendar.
            </p>
            <p className="text-sm text-[#00e5ff]/80 mb-6 leading-relaxed">
              Booking systems can integrate with Google Calendar, Outlook Calendar, Apple Calendar,
              or a custom scheduling system.
            </p>
            <ul className="space-y-3 text-sm text-[#94a3b8]">
              <li className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#00e5ff]" />
                3-hour appointment duration (typical full detail)
              </li>
              <li className="flex items-center gap-2">
                <Ban className="w-4 h-4 text-[#00e5ff]" />
                Blocked dates for holidays and capacity limits
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#00e5ff]" />
                Real-time availability sync with your calendar
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="detail-card rounded-lg p-6 md:p-8"
          >
            {confirmed ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-[#00e5ff] mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold mb-2">Demo Confirmation</h3>
                <p className="text-[#94a3b8] text-sm mb-4">
                  {monthNames[month]} {selectedDay}, {year} at {selectedTime}
                </p>
                <p className="text-xs text-[#94a3b8]/70">
                  This is a visual demonstration — no appointment was created.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setConfirmed(false);
                    setSelectedDay(null);
                    setSelectedTime(null);
                  }}
                  className="detail-btn-outline mt-6 px-6 py-2 text-xs rounded-md"
                >
                  Reset Demo
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-2xl font-bold">
                    {monthNames[month]} {year}
                  </h3>
                  <span className="text-xs uppercase tracking-widest text-[#94a3b8]">Demo Preview</span>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-xs uppercase tracking-wider text-[#94a3b8]/60 mb-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                    <div key={d} className="py-2">{d}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1 mb-6">
                  {cells.map((day, i) => {
                    if (day === null) return <div key={`e-${i}`} />;
                    const blocked = isBlocked(day);
                    const past = isPast(day);
                    const selected = selectedDay === day;
                    return (
                      <button
                        key={day}
                        type="button"
                        disabled={blocked || past}
                        onClick={() => {
                          setSelectedDay(day);
                          setSelectedTime(null);
                        }}
                        className={`aspect-square flex items-center justify-center text-sm rounded border transition-colors ${
                          blocked
                            ? "bg-red-500/10 border-red-500/20 text-red-400/60 line-through cursor-not-allowed"
                            : past
                              ? "border-white/5 text-[#94a3b8]/25 cursor-not-allowed"
                              : selected
                                ? "border-[#00e5ff] bg-[#00e5ff]/10 text-[#00e5ff]"
                                : "border-white/10 hover:border-[#00e5ff]/40 cursor-pointer"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>

                {selectedDay && availableSlots.length > 0 && (
                  <div className="mb-6">
                    <p className="text-xs uppercase tracking-widest text-[#94a3b8] mb-3">
                      Available Times — 3 hr duration
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {availableSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`py-2 text-sm rounded border transition-colors ${
                            selectedTime === time
                              ? "border-[#00e5ff] bg-[#00e5ff]/10 text-[#00e5ff]"
                              : "border-white/10 hover:border-[#00e5ff]/40"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedDay && selectedTime && (
                  <button
                    type="button"
                    onClick={() => setConfirmed(true)}
                    className="detail-btn-primary w-full py-3 text-sm rounded-md"
                  >
                    Confirm Demo Appointment
                  </button>
                )}

                <div className="flex gap-6 mt-6 text-xs text-[#94a3b8]/70">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-500/20 border border-red-500/30 rounded" />
                    Blocked
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 border border-[#00e5ff]/50 rounded" />
                    Available
                  </span>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
