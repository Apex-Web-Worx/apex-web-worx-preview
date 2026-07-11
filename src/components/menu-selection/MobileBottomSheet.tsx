import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2 } from "lucide-react";
import { getDishInfo } from "./dishData";

interface MobileBottomSheetProps {
  open: boolean;
  itemName: string;
  categoryName: string;
  quantity: number;
  isSelected: boolean;
  onClose: () => void;
  onToggle: () => void;
  onRemove: () => void;
  totalGuests: number;
  t: Record<string, any>;
}

export default function MobileBottomSheet({
  open,
  itemName,
  categoryName,
  quantity,
  isSelected,
  onClose,
  onToggle,
  onRemove,
  totalGuests,
  t,
}: MobileBottomSheetProps) {
  const info = getDishInfo(itemName, categoryName);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, handleKeyDown]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.7)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {/* Sheet */}
          <motion.div
            className="relative w-full max-w-lg rounded-t-2xl overflow-hidden"
            style={{ background: "#171714", borderTop: "1px solid rgba(200,164,93,0.3)" }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full" style={{ background: "rgba(200,164,93,0.3)" }} />
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full"
              style={{ background: "rgba(255,255,255,0.06)" }}
              type="button"
            >
              <X className="w-4 h-4" style={{ color: "#B8B2A8" }} />
            </button>

            <div className="p-5 pt-2">
              {/* Image */}
              <div className="w-full h-48 rounded-lg overflow-hidden mb-4" style={{ background: "#2a2a22" }}>
                <img src={info.image} alt={info.name} className="w-full h-full object-cover" />
              </div>

              {/* Name + Description */}
              <h3 className="text-xl font-serif font-bold mb-2" style={{ color: "#F5EFE4" }}>
                {info.name}
              </h3>
              <p className="text-sm mb-4" style={{ color: "#B8B2A8" }}>
                {info.description}
              </p>

              {/* Category badge */}
              <div className="text-xs px-2 py-1 rounded-sm inline-block mb-4" style={{ background: "rgba(200,164,93,0.1)", color: "#C8A45D" }}>
                {categoryName}
              </div>

              {/* Full serving quantity */}
              {isSelected && (
                <div className="flex items-center justify-between mb-4 p-3 rounded-sm" style={{ background: "rgba(200,164,93,0.06)" }}>
                  <span className="text-sm" style={{ color: "#F5EFE4" }}>
                    {t.menuSelection?.servesAllGuests?.replace("{n}", String(totalGuests)) || `Serves all ${totalGuests} guests`}
                  </span>
                  <span className="text-base font-medium" style={{ color: "#C8A45D" }}>{quantity}</span>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                {!isSelected ? (
                  <button
                    onClick={() => {
                      onToggle();
                    }}
                    className="flex-1 py-3 text-sm font-medium tracking-wider uppercase rounded-sm"
                    style={{ background: "#C8A45D", color: "#0F0F0D" }}
                    type="button"
                  >
                    {t.menuSelection?.addToMenu || "Add to Menu"}
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        onRemove();
                        onClose();
                      }}
                      className="flex-1 py-3 text-sm font-medium tracking-wider uppercase rounded-sm flex items-center justify-center gap-2"
                      style={{ background: "rgba(192,23,42,0.15)", color: "#C0172A" }}
                      type="button"
                    >
                      <Trash2 className="w-4 h-4" /> {t.menuSelection?.remove || "Remove"}
                    </button>
                    <button
                      onClick={onClose}
                      className="flex-1 py-3 text-sm font-medium tracking-wider uppercase rounded-sm"
                      style={{ background: "rgba(200,164,93,0.12)", color: "#C8A45D" }}
                      type="button"
                    >
                      {t.menuSelection?.close || "Close"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
