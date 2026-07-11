import { useMemo } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Drumstick, Carrot, Salad, Croissant, Cherry, Soup } from "lucide-react";
import DishItem from "./DishItem";
import { CategoryConfig, CategoryState } from "./types";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Appetizers: <Soup className="w-4 h-4" />,
  Proteins: <Drumstick className="w-4 h-4" />,
  Sides: <Carrot className="w-4 h-4" />,
  Salads: <Salad className="w-4 h-4" />,
  Breads: <Croissant className="w-4 h-4" />,
  "Fruit Mix": <Cherry className="w-4 h-4" />,
  // Russian
  "\u0417\u0430\u043a\u0443\u0441\u043a\u0438": <Soup className="w-4 h-4" />,
  "\u0411\u0435\u043b\u043a\u0438": <Drumstick className="w-4 h-4" />,
  "\u0413\u0430\u0440\u043d\u0438\u0440\u044b": <Carrot className="w-4 h-4" />,
  "\u0421\u0430\u043b\u0430\u0442\u044b": <Salad className="w-4 h-4" />,
  "\u0425\u043b\u0435\u0431": <Croissant className="w-4 h-4" />,
  "\u0424\u0440\u0443\u043a\u0442\u044b": <Cherry className="w-4 h-4" />,
};

interface DishCategoryProps {
  cat: CategoryConfig;
  catState: CategoryState;
  totalGuests: number;
  isActive: boolean;
  onToggleItem: (itemName: string) => void;
  onPreviewItem?: (itemName: string) => void;
  onSelectTab: () => void;
  onResetCategory: () => void;
  t: Record<string, any>;
}

export default function DishCategory({
  cat,
  catState,
  totalGuests,
  isActive,
  onToggleItem,
  onPreviewItem,
  onSelectTab,
  onResetCategory,
  t,
}: DishCategoryProps) {
  const selectedItems = useMemo(
    () => Object.entries(catState).filter(([, s]) => s.selected),
    [catState]
  );
  const selectedCount = selectedItems.length;
  const max = cat.maxSelect;
  const totalPortions = useMemo(
    () => selectedItems.reduce((sum, [, s]) => sum + s.quantity, 0),
    [selectedItems]
  );

  return (
    <div className="rounded-sm overflow-hidden" style={{ background: "#171714", border: "1px solid rgba(200, 164, 93, 0.12)" }}>
      {/* Tab header */}
      <button
        onClick={onSelectTab}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
        style={{
          borderBottom: isActive ? "1px solid rgba(200, 164, 93, 0.15)" : "1px solid rgba(200, 164, 93, 0.06)",
          background: isActive ? "rgba(200, 164, 93, 0.04)" : "transparent",
        }}
        type="button"
      >
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2">
            {CATEGORY_ICONS[cat.name] && (
              <span style={{ color: isActive ? "#C8A45D" : "#B8B2A8" }}>
                {CATEGORY_ICONS[cat.name]}
              </span>
            )}
            <span className="text-sm font-semibold tracking-wider uppercase" style={{ color: isActive ? "#C8A45D" : "#B8B2A8" }}>
              {cat.name}
            </span>
          </span>
          {cat.complimentary && (
            <span
              className="text-[8px] px-1.5 py-0.5 rounded-sm uppercase tracking-wider font-medium"
              style={{ background: "rgba(200,164,93,0.12)", color: "#C8A45D" }}
            >
              {t.menuSelection.complimentary || "Complimentary"}
            </span>
          )}
        </div>
        <span className="text-xs" style={{ color: isActive ? "#C8A45D" : "#888882" }}>
          {selectedCount} {selectedCount === 1 ? t.menuSelection.item : t.menuSelection.items}
        </span>
      </button>

      {/* Content */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
        >
          {/* Subtitle + Reset */}
          <div className="flex items-center justify-between px-4 pt-3 pb-2">
            <span className="text-xs" style={{ color: "#888882" }}>
              {cat.complimentary
                ? t.menuSelection.complimentaryDesc || "Optional — included at no charge"
                : t.menuSelection.selectUpToN?.replace("{n}", String(max)) || `Select up to ${max} options`}
            </span>
            {selectedCount > 0 && (
              <button
                onClick={onResetCategory}
                className="flex items-center gap-1 text-[10px] uppercase tracking-wider transition-colors hover:opacity-80"
                style={{ color: "#888882" }}
                type="button"
              >
                <RotateCcw className="w-3 h-3" />
                {t.menuSelection.reset || "Reset"}
              </button>
            )}
          </div>

          {/* Items list */}
          <div className="px-2">
            {cat.items.map((item) => (
              <DishItem
                key={item}
                itemName={item}
                state={catState[item] || { selected: false, quantity: totalGuests }}
                totalGuests={totalGuests}
                onToggle={() => onToggleItem(item)}
                onPreview={onPreviewItem ? () => onPreviewItem(item) : undefined}
                t={t}
              />
            ))}
          </div>

          {/* Bottom bar */}
          <div className="flex items-center justify-between px-4 py-2.5 mt-1" style={{ borderTop: "1px solid rgba(200, 164, 93, 0.08)" }}>
            <span className="text-xs" style={{ color: "#888882" }}>
              {selectedCount} / {max} {t.menuSelection.selected}
            </span>
            <span className="text-xs" style={{ color: "#C8A45D" }}>
              {t.menuSelection.totalPortions}: {totalPortions}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
