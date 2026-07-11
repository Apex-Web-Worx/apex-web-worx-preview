import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Crown } from "lucide-react";
import { ADDONS } from "@/lib/pricing";
import { isMostPopularDish } from "./dishData";
import { PackageConfig, SelectedItem } from "./types";

interface OrderSummaryProps {
  selectedPkg: PackageConfig | null;
  basePricePerPerson: number;
  addonsPricePerPerson: number;
  pricePerPerson: number;
  totalGuests: number;
  estimatedTotal: number;
  selectedItemsByCategory: Record<string, SelectedItem[]>;
  selectedAddonIds?: string[];
  t: Record<string, any>;
  isMobile?: boolean;
  autoExpand?: boolean;
}

export default function OrderSummary({
  selectedPkg,
  basePricePerPerson,
  addonsPricePerPerson,
  pricePerPerson,
  totalGuests,
  estimatedTotal,
  selectedItemsByCategory,
  selectedAddonIds = [],
  t,
  isMobile = false,
  autoExpand = false,
}: OrderSummaryProps) {
  const [expanded, setExpanded] = useState(false);
  const prevAutoExpand = useRef(autoExpand);

  useEffect(() => {
    if (autoExpand && !prevAutoExpand.current) {
      setExpanded(true);
    }
    prevAutoExpand.current = autoExpand;
  }, [autoExpand]);

  if (!selectedPkg) return null;

  const selectedAddons = ADDONS.filter((a) => selectedAddonIds.includes(a.id));
  const addonsTotalPerPerson = selectedAddons.reduce((sum, a) => sum + a.pricePerPerson, 0);

  const totalPortions = Object.values(selectedItemsByCategory).reduce(
    (sum, cat) => sum + cat.reduce((c, item) => c + item.quantity, 0),
    0
  );

  const selectedCount = Object.values(selectedItemsByCategory).reduce(
    (sum, cat) => sum + cat.length,
    0
  );

  return (
    <div
      className="rounded-sm overflow-hidden"
      style={{ background: "#171714", border: "1px solid rgba(200, 164, 93, 0.18)" }}
    >
      {/* Collapsible header — always visible, clickable to expand */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
        style={{ borderBottom: expanded ? "1px solid rgba(200, 164, 93, 0.10)" : "none" }}
        type="button"
      >
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider font-medium" style={{ color: "#C8A45D" }}>
            {t.menuSelection.menuBuilderSummary || "Menu Builder Summary"}
          </span>
          <span className="text-[10px]" style={{ color: "#888882" }}>
            {totalGuests} {t.menuSelection?.guests || "guests"} · {selectedCount} {selectedCount === 1 ? t.menuSelection?.item || "item" : t.menuSelection?.items || "items"}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 shrink-0 ${expanded ? "rotate-180" : ""}`}
          style={{ color: "#C8A45D" }}
        />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 py-3 space-y-3">
              {/* Total Guests */}
              <div>
                <span className="text-[10px] uppercase tracking-wider block" style={{ color: "#B8B2A8" }}>
                  {t.menuSelection.totalGuests || "Total Guests"}
                </span>
                <span className="font-serif font-bold text-xl" style={{ color: "#F5EFE4" }}>
                  {totalGuests}
                </span>
                <span className="text-[10px] ml-1" style={{ color: "#888882" }}>
                  ({t.menuSelection.lockedFromStep1 || "Locked from Step 1"})
                </span>
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: "#B8B2A8" }}>
                    {t.menuSelection.basePricePerPerson || "Base Price / Person"}
                  </span>
                  <span className="text-xs font-medium" style={{ color: "#F5EFE4" }}>
                    ${basePricePerPerson}{t.menuSelection.perPersonShort || "/pp"}
                  </span>
                </div>
                {selectedAddons.length > 0 && (
                  <div className="space-y-1">
                    {selectedAddons.map((addon) => (
                      <div key={addon.id} className="flex items-center justify-between">
                        <span className="text-xs" style={{ color: "#F5EFE4" }}>{(t.menuSelection?.addonNames as Record<string, string>)?.[addon.id] || addon.name}</span>
                        <span className="text-xs" style={{ color: "#C8A45D" }}>+${addon.pricePerPerson}{t.menuSelection?.perPersonShort || "/pp"}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between pt-1" style={{ borderTop: "1px solid rgba(200, 164, 93, 0.10)" }}>
                  <span className="text-xs font-medium" style={{ color: "#F5EFE4" }}>
                    {t.menuSelection.totalPerPerson || "Total / Person"}
                  </span>
                  <span className="text-xs font-bold" style={{ color: "#C8A45D" }}>
                    ${pricePerPerson}{t.menuSelection.perPersonShort || "/pp"}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2" style={{ borderTop: "1px solid rgba(200, 164, 93, 0.10)" }}>
                  <span className="text-xs font-medium" style={{ color: "#F5EFE4" }}>
                    {t.menuSelection.grandTotal || "Grand Total"}
                  </span>
                  <span className="font-serif font-bold text-2xl" style={{ color: "#C8A45D" }}>
                    ${estimatedTotal.toLocaleString()}
                  </span>
                </div>
                <p className="text-[10px]" style={{ color: "#888882" }}>
                  {t.menuSelection.finalPriceNote || "Final price may vary based on selections"}
                </p>
              </div>

              {/* Selected Items Summary */}
              <div className="pt-2" style={{ borderTop: "1px solid rgba(200, 164, 93, 0.10)" }}>
                <span className="text-[10px] uppercase tracking-wider block mb-2" style={{ color: "#C8A45D" }}>
                  {t.menuSelection.selectedItems || "Selected Items Summary"}
                </span>
                {selectedPkg.categories.map((cat) => {
                  const items = selectedItemsByCategory[cat.name] || [];
                  return (
                    <div key={cat.name} className="flex items-center justify-between mb-1">
                      <span className="text-xs" style={{ color: "#F5EFE4" }}>{cat.name}</span>
                      <span className="text-xs" style={{ color: "#B8B2A8" }}>
                        {items.length} {items.length === 1 ? t.menuSelection.item || "item" : t.menuSelection.items || "items"}
                      </span>
                    </div>
                  );
                })}
                <div className="flex items-center justify-between pt-2" style={{ borderTop: "1px solid rgba(200, 164, 93, 0.08)" }}>
                  <span className="text-xs font-medium" style={{ color: "#F5EFE4" }}>
                    {t.menuSelection.totalPortions || "Total Portions"}
                  </span>
                  <span className="text-xs font-medium" style={{ color: "#C8A45D" }}>
                    {totalPortions}
                  </span>
                </div>
              </div>

              {/* Item details */}
              {selectedCount > 0 && (
                <div className="pt-2 space-y-2" style={{ borderTop: "1px solid rgba(200, 164, 93, 0.08)" }}>
                  {Object.entries(selectedItemsByCategory).map(([catName, items]) =>
                    items.length > 0 ? (
                      <div key={catName}>
                        <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "#B8B2A8" }}>
                          {catName}
                        </p>
                        {items.map((item) => (
                          <div key={item.name} className="flex items-center justify-between text-xs">
                            <span className="flex items-center gap-1.5" style={{ color: "#F5EFE4" }}>
                              {item.name}
                              {isMostPopularDish(item.name) && (
                                <span className="inline-flex items-center gap-0.5 text-[8px] px-1 py-0.5 rounded-sm uppercase tracking-wider" style={{ background: "rgba(200,164,93,0.12)", color: "#C8A45D", border: "1px solid rgba(200,164,93,0.25)" }}>
                                  <Crown className="w-2 h-2" />
                                  {t.menuSelection?.mostPopular || "Most Popular"}
                                </span>
                              )}
                              {selectedPkg.categories.find((c) => c.name === catName)?.complimentary && (
                                <span className="text-[8px] px-1 py-0.5 rounded-sm uppercase tracking-wider" style={{ background: "rgba(200,164,93,0.12)", color: "#C8A45D" }}>
                                  {t.menuSelection?.complimentary || "Complimentary"}
                                </span>
                              )}
                            </span>
                            <span style={{ color: "#C8A45D" }}>{item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    ) : null
                  )}
                </div>
              )}

              {/* Important Package Notes */}
              <div className="pt-2" style={{ borderTop: "1px solid rgba(200, 164, 93, 0.10)" }}>
                <span className="text-[10px] uppercase tracking-wider block mb-2" style={{ color: "#C8A45D" }}>
                  {t.menuSelection?.importantNotes || "Important Package Notes"}
                </span>
                <ul className="space-y-1">
                  {(t.menuSelection?.packageNotes || []).map((note: string, idx: number) => (
                    <li key={idx} className="text-[11px] leading-snug" style={{ color: "#B8B2A8" }}>
                      • {note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
