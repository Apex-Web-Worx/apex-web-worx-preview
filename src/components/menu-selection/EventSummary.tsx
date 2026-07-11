import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, MapPin, Phone, Lock, ChevronDown, Minus, Plus } from "lucide-react";
import { ADDONS } from "@/lib/pricing";
import { InquiryData } from "./types";

interface EventSummaryProps {
  inquiry: InquiryData;
  baseGuests: number;
  totalGuests: number;
  additionalGuests: number;
  onAdditionalGuestsChange: (v: number) => void;
  basePricePerPerson: number;
  addonsPricePerPerson: number;
  pricePerPerson: number;
  estimatedTotal: number;
  selectedAddonIds?: string[];
  t: Record<string, any>;
  isMobile?: boolean;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export default function EventSummary({
  inquiry,
  baseGuests,
  totalGuests,
  additionalGuests,
  onAdditionalGuestsChange,
  basePricePerPerson,
  addonsPricePerPerson,
  pricePerPerson,
  estimatedTotal,
  selectedAddonIds = [],
  t,
  isMobile = false,
}: EventSummaryProps) {
  const [collapsed, setCollapsed] = useState(isMobile);

  const row = (icon: React.ReactNode, label: string, value: string) => (
    <div className="flex items-center gap-3">
      {icon}
      <div>
        <span className="text-[10px] uppercase tracking-wider block" style={{ color: "#B8B2A8" }}>
          {label}
        </span>
        <span className={`font-serif ${isMobile ? "text-base" : "text-sm"}`} style={{ color: "#F5EFE4" }}>
          {value}
        </span>
      </div>
    </div>
  );

  return (
    <div
      className="rounded-sm overflow-hidden"
      style={{ background: "#171714", border: "1px solid rgba(200, 164, 93, 0.18)" }}
    >
      {isMobile && (
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-between p-3 text-left"
          type="button"
        >
          <span className="text-xs uppercase tracking-wider font-medium" style={{ color: "#C8A45D" }}>
            {t.menuSelection.eventDetails}
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${collapsed ? "" : "rotate-180"}`}
            style={{ color: "#B8B2A8" }}
          />
        </button>
      )}

      {!isMobile && (
        <p className="text-xs uppercase tracking-wider mb-4 font-medium p-5 pb-0" style={{ color: "#C8A45D" }}>
          {t.menuSelection.eventDetails}
        </p>
      )}

      <AnimatePresence>
        {(!isMobile || !collapsed) && (
          <motion.div
            initial={isMobile ? { height: 0, opacity: 0 } : false}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className={`space-y-3 ${isMobile ? "px-3 pb-3" : "p-5"}`}>
              {row(
                <Calendar className="w-4 h-4 shrink-0" style={{ color: "#C8A45D" }} />,
                t.menuSelection.date,
                inquiry.eventDate
              )}
              {row(
                <Users className="w-4 h-4 shrink-0" style={{ color: "#C8A45D" }} />,
                `${t.menuSelection.guests} (${t.menuSelection.locked})`,
                `${baseGuests} ${t.menuSelection.guests}`
              )}
              {row(
                <MapPin className="w-4 h-4 shrink-0" style={{ color: "#C8A45D" }} />,
                t.menuSelection.location,
                inquiry.location
              )}
              {row(
                <Phone className="w-4 h-4 shrink-0" style={{ color: "#C8A45D" }} />,
                t.menuSelection.contact,
                inquiry.name
              )}
            </div>

            {/* Additional guests + pricing */}
            <div className={`${isMobile ? "px-3 pb-3" : "p-5 pt-0"}`}>
              <div className="flex items-center gap-3 pt-3" style={{ borderTop: "1px solid rgba(200, 164, 93, 0.10)" }}>
                <div>
                  <span className="text-[10px] uppercase tracking-wider block" style={{ color: "#B8B2A8" }}>
                    {t.menuSelection.additionalGuests}
                  </span>
                  <div className={`flex items-center gap-2 mt-1 ${isMobile ? "gap-2" : "gap-1"}`}>
                    <button
                      onClick={() => onAdditionalGuestsChange(Math.max(0, additionalGuests - 1))}
                      className={`flex items-center justify-center rounded-sm active:scale-95 transition-transform ${isMobile ? "w-10 h-10" : "w-6 h-6"}`}
                      style={{ background: "rgba(200, 164, 93, 0.12)", color: "#C8A45D" }}
                      type="button"
                    >
                      <Minus className={isMobile ? "w-4 h-4" : "w-3 h-3"} />
                    </button>
                    <span className={`text-center font-bold ${isMobile ? "text-base w-10" : "text-xs w-6"}`} style={{ color: "#F5EFE4" }}>
                      {additionalGuests}
                    </span>
                    <button
                      onClick={() => onAdditionalGuestsChange(additionalGuests + 1)}
                      className={`flex items-center justify-center rounded-sm active:scale-95 transition-transform ${isMobile ? "w-10 h-10" : "w-6 h-6"}`}
                      style={{ background: "rgba(200, 164, 93, 0.12)", color: "#C8A45D" }}
                      type="button"
                    >
                      <Plus className={isMobile ? "w-4 h-4" : "w-3 h-3"} />
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-[10px] mt-2" style={{ color: "#B8B2A8" }}>
                <Lock className="w-3 h-3 inline mr-1" /> {t.menuSelection.pricingLocked}
              </p>
              <div className="pt-3 mt-3 space-y-2" style={{ borderTop: "1px solid rgba(200, 164, 93, 0.10)" }}>
                <span className="text-[10px] uppercase tracking-wider block" style={{ color: "#B8B2A8" }}>
                  {t.menuSelection.pricingBreakdown || "Pricing Breakdown"}
                </span>
                <div className="flex items-center justify-between text-xs">
                  <span style={{ color: "#B8B2A8" }}>{t.menuSelection.basePricePerPerson || "Base Price"}</span>
                  <span style={{ color: "#F5EFE4" }}>${basePricePerPerson}{t.menuSelection.perPersonShort || "/pp"}</span>
                </div>
                {selectedAddonIds.length > 0 && (
                  <div className="space-y-1">
                    {selectedAddonIds.map((id) => {
                      const addon = ADDONS.find((a) => a.id === id);
                      if (!addon) return null;
                      return (
                        <div key={id} className="flex items-center justify-between text-xs">
                          <span style={{ color: "#B8B2A8" }}>{(t.menuSelection?.addonNames as Record<string, string>)?.[id] || addon.name}</span>
                          <span style={{ color: "#C8A45D" }}>+${addon.pricePerPerson}{t.menuSelection?.perPersonShort || "/pp"}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
                <div className="flex items-center justify-between text-xs pt-1" style={{ borderTop: "1px solid rgba(200, 164, 93, 0.10)" }}>
                  <span className="font-medium" style={{ color: "#F5EFE4" }}>{t.menuSelection.totalPerPerson || "Total / Person"}</span>
                  <span className="font-medium" style={{ color: "#C8A45D" }}>${pricePerPerson}{t.menuSelection?.perPersonShort || "/pp"}</span>
                </div>
                <div className="flex items-center justify-between pt-1" style={{ borderTop: "1px solid rgba(200, 164, 93, 0.10)" }}>
                  <span className="text-xs font-medium" style={{ color: "#F5EFE4" }}>{t.menuSelection.grandTotal || "Grand Total"}</span>
                  <span className={`font-serif font-bold ${isMobile ? "text-xl" : "text-2xl"}`} style={{ color: "#C8A45D" }}>
                    ${estimatedTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
