import { Eye, Star, Crown } from "lucide-react";
import { getDishDescription, getDishAddon, isMostPopularDish } from "./dishData";
import { MenuItemState } from "./types";

interface DishItemProps {
  itemName: string;
  state: MenuItemState;
  totalGuests: number;
  onToggle: () => void;
  onPreview?: () => void;
  t?: Record<string, any>;
}

export default function DishItem({
  itemName,
  state,
  totalGuests,
  onToggle,
  onPreview,
  t = {},
}: DishItemProps) {
  const description = getDishDescription(itemName);
  const addon = getDishAddon(itemName);

  return (
    <div
      className="flex items-center gap-3 py-3 px-3 transition-all duration-200 cursor-pointer select-none"
      style={{
        borderBottom: "1px solid rgba(200, 164, 93, 0.06)",
        background: state.selected ? "rgba(200, 164, 93, 0.03)" : "transparent",
      }}
      onClick={onToggle}
    >
      {/* Checkbox */}
      <div
        className="flex items-center justify-center shrink-0 w-5 h-5 rounded-sm transition-all"
        style={{
          border: state.selected ? "1px solid #C8A45D" : "1px solid rgba(200, 164, 93, 0.35)",
          background: state.selected ? "#C8A45D" : "transparent",
        }}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
      >
        {state.selected && (
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <path d="M1 5L4.5 8.5L11 1" stroke="#0F0F0D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>

      {/* Name + Description */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p
            className="text-sm font-medium leading-tight"
            style={{ color: state.selected ? "#F5EFE4" : "#B8B2A8" }}
          >
            {itemName}
          </p>
          {isMostPopularDish(itemName) && (
            <span
              className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] uppercase tracking-widest font-medium rounded-sm"
              style={{
                background: "rgba(200, 164, 93, 0.12)",
                color: "#C8A45D",
                border: "1px solid rgba(200, 164, 93, 0.25)",
              }}
            >
              <Crown className="w-2 h-2" />
              {t.menuSelection?.mostPopular || "Most Popular"}
            </span>
          )}
          {addon && (
            <span
              className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] uppercase tracking-widest font-medium rounded-sm"
              style={{
                background: "rgba(200, 164, 93, 0.12)",
                color: "#C8A45D",
                border: "1px solid rgba(200, 164, 93, 0.25)",
              }}
            >
              <Star className="w-2 h-2 fill-[#C8A45D]" />
              +${addon.pricePerPerson}{t.menuSelection?.perPersonShort || "/pp"}
            </span>
          )}
        </div>
        <p className="text-[10px] leading-tight mt-0.5" style={{ color: "#888882" }}>
          {description}
        </p>
      </div>

      {/* Full-serving quantity (fixed to total guest count) + Preview */}
      <div
        className="flex items-center gap-2 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className="min-w-7 h-7 px-1.5 text-center text-xs font-medium flex items-center justify-center rounded-sm"
          style={{
            color: state.selected ? "#F5EFE4" : "#888882",
            background: state.selected ? "rgba(200, 164, 93, 0.12)" : "transparent",
          }}
        >
          {state.selected ? totalGuests : 0}
        </span>

        {/* Preview button */}
        {onPreview && (
          <button
            onClick={onPreview}
            className="w-7 h-7 flex items-center justify-center rounded-sm active:scale-95 transition-transform"
            style={{ background: "rgba(200, 164, 93, 0.08)", color: "#C8A45D" }}
            type="button"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
