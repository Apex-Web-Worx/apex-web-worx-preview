import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { Star, Crown, Minus, Plus } from "lucide-react";
import { isMostPopularDish } from "@/components/menu-selection/dishData";
import { ADDONS, type AddOn } from "@/lib/pricing";
import appetizersImg from "@/assets/menu-appetizers.jpg";
import proteinImg from "@/assets/menu-protein.png";
import sidesImg from "@/assets/menu-sides.jpg";
import saladsImg from "@/assets/menu-salads.jpg";
import fruitsImg from "@/assets/menu-fruits.jpg";
import breadsImg from "@/assets/menu-breads.png";
import dishCaprese from "@/assets/dish-caprese.png";
import dishOlivesSalami from "@/assets/dish-olives-salami.png";
import dishShrimpProsciutto from "@/assets/dish-shrimp-prosciutto.png";
import dishCheeseTarts from "@/assets/dish-cheese-tarts.png";
import dishSalmonCreamCheese from "@/assets/dish-salmon-cream-cheese.png";
import dishProsciuttoFeta from "@/assets/dish-prosciutto-feta.png";
import dishCheesePlatter from "@/assets/dish-cheese-platter.png";
import dishOlivesBerries from "@/assets/dish-olives-berries.png";
import dishBeefLoin from "@/assets/dish-beef-loin.png";
import dishPorkRibs from "@/assets/dish-pork-ribs.png";
import dishChickenBreast from "@/assets/dish-chicken-breast.png";
import dishSalmon from "@/assets/dish-salmon.png";
import dishRoastedPotatoes from "@/assets/dish-roasted-potatoes.png";
import dishOlivierSalad from "@/assets/dish-olivier-salad.png";
import dishMashedPotatoes from "@/assets/dish-mashed-potatoes.png";
import dishGrilledAsparagus from "@/assets/dish-grilled-asparagus.png";
import dishBroccoli from "@/assets/dish-broccoli.png";
import dishWildRice from "@/assets/dish-wild-rice.png";
import dishRiceVegetables from "@/assets/dish-rice-vegetables.png";
import dishRatatouille from "@/assets/dish-ratatouille.png";
import dishFriedPotatoes from "@/assets/dish-fried-potatoes.png";
import dishCaesarSalad from "@/assets/dish-caesar-salad.png";
import dishGreekSalad from "@/assets/dish-greek-salad.png";
import dishCapreseSalad from "@/assets/dish-caprese-salad.png";
import dishGardenSalad from "@/assets/dish-garden-salad.png";
import dishFruitPlatter from "@/assets/dish-fruit-platter.png";

const imageMap: Record<string, string> = {
  "menu-appetizers": appetizersImg,
  "menu-protein": proteinImg,
  "menu-sides": sidesImg,
  "menu-salads": saladsImg,
  "menu-fruits": fruitsImg,
  "menu-breads": breadsImg,
};

const dishImageMap: Record<string, string> = {
  "dish-caprese": dishCaprese,
  "dish-olives-salami": dishOlivesSalami,
  "dish-shrimp-prosciutto": dishShrimpProsciutto,
  "dish-cheese-tarts": dishCheeseTarts,
  "dish-salmon-cream-cheese": dishSalmonCreamCheese,
  "dish-prosciutto-feta": dishProsciuttoFeta,
  "dish-cheese-platter": dishCheesePlatter,
  "dish-olives-berries": dishOlivesBerries,
  "dish-beef-loin": dishBeefLoin,
  "dish-pork-ribs": dishPorkRibs,
  "dish-chicken-breast": dishChickenBreast,
  "dish-salmon": dishSalmon,
  "dish-roasted-potatoes": dishRoastedPotatoes,
  "dish-olivier-salad": dishOlivierSalad,
  "dish-mashed-potatoes": dishMashedPotatoes,
  "dish-grilled-asparagus": dishGrilledAsparagus,
  "dish-broccoli": dishBroccoli,
  "dish-wild-rice": dishWildRice,
  "dish-rice-vegetables": dishRiceVegetables,
  "dish-ratatouille": dishRatatouille,
  "dish-fried-potatoes": dishFriedPotatoes,
  "dish-caesar-salad": dishCaesarSalad,
  "dish-greek-salad": dishGreekSalad,
  "dish-caprese-salad": dishCapreseSalad,
  "dish-garden-salad": dishGardenSalad,
  "dish-fruit-platter": dishFruitPlatter,
};

const addonById = Object.fromEntries(ADDONS.map((a) => [a.id, a])) as Record<string, AddOn>;

interface MenuItem {
  name: string;
  desc: string;
  badge?: string;
  dishImage?: string;
  ingredients?: string[];
  addonId?: string;
}

interface MenuCategory {
  category: string;
  image?: string;
  items: MenuItem[];
}

function DishTooltip({ imageKey, name, isActive }: { imageKey: string; name: string; isActive?: boolean }) {
  const src = dishImageMap[imageKey];
  if (!src) return null;
  return (
    <div
      className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-3 z-50 pointer-events-none opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 ease-out ${isActive ? "opacity-100" : ""}`}
      style={{ width: "280px" }}
    >
      <div
        className="overflow-hidden rounded-sm"
        style={{
          border: "1px solid rgba(200, 164, 93, 0.35)",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(200, 164, 93, 0.1)",
        }}
      >
        <img src={src} alt={name} className="w-full h-40 object-cover" />
        <div className="absolute inset-0 h-40 bg-gradient-to-t from-[#0F0F0D]/40 to-transparent" />
      </div>
      <div
        className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-3 h-3 rotate-45"
        style={{ background: "#171714", border: "1px solid rgba(200, 164, 93, 0.35)" }}
      />
    </div>
  );
}

export default function MenuSection() {
  const { t } = useLanguage();
  const categories = (t.menuSection.categories as unknown as MenuCategory[]) || [];
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Add-on selection state for menu card toggles
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);

  function toggleAddon(addonId: string) {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  }

  return (
    <section id="menu" className="py-24 md:py-32 relative" style={{ background: "#0F0F0D" }}>
      <div className="container px-6 md:px-12 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="uppercase tracking-[0.25em] text-xs font-medium mb-5 block" style={{ color: "#C8A45D" }}>
              {t.menuSection.badge}
            </span>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 whitespace-pre-line leading-tight"
              style={{ fontFamily: "var(--app-font-serif)", color: "#FFFFFF" }}
            >
              {t.menuSection.heading}
            </h2>
            <p className="text-lg font-light leading-relaxed" style={{ color: "#E8E4DE" }}>
              {t.menuSection.subheading}
            </p>
          </motion.div>
        </div>

        {/* ── Menu Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((group, idx) => {
            const imgSrc = group.image ? imageMap[group.image] : undefined;
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="group overflow-hidden transition-all duration-500 ease-out hover:-translate-y-2"
                style={{
                  background: "#171714",
                  border: "1px solid rgba(200, 164, 93, 0.18)",
                  boxShadow: "0 4px 24px rgba(0, 0, 0, 0.4)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(200, 164, 93, 0.45)";
                  e.currentTarget.style.boxShadow = "0 8px 40px rgba(200, 164, 93, 0.08), 0 4px 24px rgba(0, 0, 0, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(200, 164, 93, 0.18)";
                  e.currentTarget.style.boxShadow = "0 4px 24px rgba(0, 0, 0, 0.4)";
                }}
              >
                {imgSrc && (
                  <div className="h-56 overflow-hidden relative">
                    <img
                      src={imgSrc}
                      alt={group.category}
                      className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.08]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0D] via-[#0F0F0D]/60 to-[#0F0F0D]/20" />
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8A45D]/60 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5">
                      <h3
                        className="text-2xl font-semibold tracking-wide"
                        style={{ fontFamily: "var(--app-font-display)", color: "#C8A45D" }}
                      >
                        {group.category}
                      </h3>
                      <div className="w-12 h-[1px] mt-2 bg-[#C8A45D]/50" />
                    </div>
                  </div>
                )}

                {!imgSrc && (
                  <div className="px-6 pt-6 pb-2">
                    <h3
                      className="text-2xl font-semibold tracking-wide"
                      style={{ fontFamily: "var(--app-font-display)", color: "#C8A45D" }}
                    >
                      {group.category}
                    </h3>
                    <div className="w-12 h-[1px] mt-2 bg-[#C8A45D]/50" />
                  </div>
                )}

                <div className="px-6 py-6">
                  <div className="space-y-5">
                    {group.items.map((item, itemIdx) => {
                      const addon = item.addonId ? addonById[item.addonId] : undefined;
                      const isAddonSelected = addon ? selectedAddonIds.includes(addon.id) : false;
                      return (
                        <div key={item.name} className="group/item relative">
                          {item.dishImage && (
                            <DishTooltip
                              imageKey={item.dishImage}
                              name={item.name}
                              isActive={activeImage === item.dishImage}
                            />
                          )}

                          <div className="flex items-center justify-between gap-3">
                            <h4
                              className="text-[15px] font-semibold tracking-wide transition-colors duration-300 text-[#FFFFFF] group-hover/item:text-[#C8A45D]"
                              style={{ fontFamily: "var(--app-font-display)" }}
                              onClick={() => {
                                if (item.dishImage) {
                                  setActiveImage(activeImage === item.dishImage ? null : item.dishImage);
                                }
                              }}
                            >
                              {item.name}
                            </h4>
                            <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
                              {isMostPopularDish(item.name) && (
                                <span
                                  className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] uppercase tracking-widest font-medium rounded-sm"
                                  style={{
                                    background: "rgba(200, 164, 93, 0.15)",
                                    color: "#C8A45D",
                                    border: "1px solid rgba(200, 164, 93, 0.35)",
                                  }}
                                >
                                  <Crown className="w-2.5 h-2.5" />
                                  Most Popular
                                </span>
                              )}
                              {item.badge && (
                                <span
                                  className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] uppercase tracking-widest font-medium rounded-sm"
                                  style={{
                                    background: "rgba(200, 164, 93, 0.15)",
                                    color: "#C8A45D",
                                    border: "1px solid rgba(200, 164, 93, 0.35)",
                                  }}
                                >
                                  <Star className="w-2.5 h-2.5 fill-[#C8A45D] text-[#C8A45D]" />
                                  {item.badge}
                                </span>
                              )}

                            </div>
                          </div>
                          <p
                            className="text-[13px] font-light leading-relaxed mt-1.5"
                            style={{ color: "#E8E4DE", fontFamily: "var(--app-font-sans)" }}
                          >
                            {item.desc}
                          </p>
                          {item.ingredients && item.ingredients.length > 0 && (
                            <div className="mt-2.5">
                              <p
                                className="text-[11px] uppercase tracking-widest font-medium mb-1"
                                style={{ color: "#C8A45D", fontFamily: "var(--app-font-sans)" }}
                              >
                                {t.menuSection.ingredientsLabel || "Ingredients"}
                              </p>
                              <p
                                className="text-[12px] font-light leading-relaxed"
                                style={{ color: "#9CA3AF", fontFamily: "var(--app-font-sans)" }}
                              >
                                {item.ingredients.join(", ")}
                              </p>
                            </div>
                          )}
                          {itemIdx < group.items.length - 1 && (
                            <div className="mt-5 h-[1px] bg-gradient-to-r from-[#C8A45D]/10 via-[#C8A45D]/5 to-transparent" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
