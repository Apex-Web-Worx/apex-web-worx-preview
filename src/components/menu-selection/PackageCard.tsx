import { motion } from "framer-motion";
import { Check, Award, Leaf, ChefHat } from "lucide-react";
import { PackageConfig } from "./types";

interface PackageCardProps {
  pkg: PackageConfig;
  isSelected: boolean;
  pricePerPerson: number;
  personLabel: string;
  onToggle: () => void;
  isMobile?: boolean;
  t?: Record<string, any>;
}

export default function PackageCard({
  pkg,
  isSelected,
  pricePerPerson,
  personLabel,
  onToggle,
  isMobile = false,
  t = {},
}: PackageCardProps) {
  return (
    <motion.div
      className="overflow-hidden cursor-pointer transition-all duration-300"
      style={{
        background: "#171714",
        border: isSelected ? "2px solid #C8A45D" : "1px solid rgba(200, 164, 93, 0.12)",
      }}
      onClick={onToggle}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex gap-4 p-4">
        {/* Right: Content */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-serif font-bold text-lg" style={{ color: "#F5EFE4" }}>
              {pkg.name}
            </h3>
            {isSelected && (
              <span
                className="text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-sm shrink-0 ml-2"
                style={{ background: "rgba(200,164,93,0.15)", color: "#C8A45D" }}
              >
                Selected <Check className="w-3 h-3 inline-block -mt-0.5 ml-0.5" />
              </span>
            )}
          </div>

          <p className="text-sm leading-relaxed mb-2" style={{ color: "#B8B2A8" }}>
            {pkg.description}
          </p>

          {/* Icon badges */}
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-1" style={{ color: "#C8A45D" }}>
              <Award className="w-3.5 h-3.5" />
              <span className="text-[10px] uppercase tracking-wider font-medium" style={{ color: "#C8A45D" }}>
                {t.menuSelection?.premiumQuality || "Premium Quality"}
              </span>
            </div>
            <div className="flex items-center gap-1" style={{ color: "#C8A45D" }}>
              <Leaf className="w-3.5 h-3.5" />
              <span className="text-[10px] uppercase tracking-wider font-medium" style={{ color: "#C8A45D" }}>
                {t.menuSelection?.freshIngredients || "Fresh Ingredients"}
              </span>
            </div>
            <div className="flex items-center gap-1" style={{ color: "#C8A45D" }}>
              <ChefHat className="w-3.5 h-3.5" />
              <span className="text-[10px] uppercase tracking-wider font-medium" style={{ color: "#C8A45D" }}>
                {t.menuSelection?.professionalService || "Professional Service"}
              </span>
            </div>
          </div>

          <div className="mt-auto">
            <span className="font-serif font-bold text-3xl" style={{ color: "#C8A45D" }}>
              ${pricePerPerson}
            </span>
            <span className="text-sm ml-1" style={{ color: "#B8B2A8" }}>
              / {personLabel}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
