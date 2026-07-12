import { X, Trash2, Eye } from "lucide-react";
import { LuxuryPanel } from "@/components/landing/LuxuryCardDecor";
import { getDishInfo } from "./dishData";
import DishImageFrame from "@/components/DishImageFrame";

interface DishPreviewProps {
  itemName: string | null;
  categoryName: string | null;
  quantity: number;
  isSelected: boolean;
  onClose: () => void;
  onToggle: () => void;
  onRemove: () => void;
  totalGuests: number;
  t: Record<string, any>;
}

export default function DishPreview({
  itemName,
  categoryName,
  quantity,
  isSelected,
  onClose,
  onToggle,
  onRemove,
  totalGuests,
  t,
}: DishPreviewProps) {
  if (!itemName || !categoryName) {
    return (
      <LuxuryPanel seed={3} topRuleInset={false} className="h-full">
        <div className="p-5 h-full flex items-center justify-center">
          <div className="text-center">
            <Eye className="w-8 h-8 mx-auto mb-2" style={{ color: "rgba(200,164,93,0.3)" }} />
            <p className="text-sm" style={{ color: "#B8B2A8" }}>
              {t.menuSelection?.hoverPreview || "Hover or click a dish to preview"}
            </p>
          </div>
        </div>
      </LuxuryPanel>
    );
  }

  const info = getDishInfo(itemName, categoryName);

  return (
    <LuxuryPanel seed={4} topRuleInset={false}>
      {/* Header */}
      <div className="flex items-center justify-between p-3" style={{ borderBottom: "1px solid rgba(200,164,93,0.1)" }}>
        <span className="text-xs uppercase tracking-wider font-medium" style={{ color: "#C8A45D" }}>
          {t.menuSelection?.dishPreview || "Dish Preview"}
        </span>
        <button onClick={onClose} className="w-6 h-6 flex items-center justify-center" type="button">
          <X className="w-4 h-4" style={{ color: "#B8B2A8" }} />
        </button>
      </div>

      <div className="p-4">
        {/* Image */}
        <DishImageFrame src={info.image} alt={info.name} className="mb-3" />

        {/* Name + Description */}
        <h3 className="text-lg font-serif font-bold mb-1" style={{ color: "#F5EFE4" }}>
          {info.name}
        </h3>
        <p className="text-xs mb-3" style={{ color: "#B8B2A8" }}>
          {info.description}
        </p>

        {/* Category badge */}
        <div className="text-[10px] px-2 py-1 rounded-sm inline-block mb-3" style={{ background: "rgba(200,164,93,0.1)", color: "#C8A45D" }}>
          {categoryName}
        </div>

        {/* Full serving quantity */}
        {isSelected && (
          <div className="flex items-center justify-between mb-3 p-2 rounded-sm" style={{ background: "rgba(200,164,93,0.06)" }}>
            <span className="text-xs" style={{ color: "#F5EFE4" }}>
              {t.menuSelection?.servesAllGuests?.replace("{n}", String(totalGuests)) || `Serves all ${totalGuests} guests`}
            </span>
            <span className="text-sm font-medium" style={{ color: "#C8A45D" }}>{quantity}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          {!isSelected ? (
            <button
              onClick={onToggle}
              className="flex-1 py-2 text-xs font-medium tracking-wider uppercase rounded-sm"
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
                className="flex-1 py-2 text-xs font-medium tracking-wider uppercase rounded-sm flex items-center justify-center gap-1"
                style={{ background: "rgba(192,23,42,0.15)", color: "#C0172A" }}
                type="button"
              >
                <Trash2 className="w-3 h-3" /> {t.menuSelection?.remove || "Remove"}
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2 text-xs font-medium tracking-wider uppercase rounded-sm"
                style={{ background: "rgba(200,164,93,0.12)", color: "#C8A45D" }}
                type="button"
              >
                {t.menuSelection?.close || "Close"}
              </button>
            </>
          )}
        </div>
      </div>
    </LuxuryPanel>
  );
}
