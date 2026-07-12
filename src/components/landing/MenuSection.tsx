import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { Star, Crown } from "lucide-react";
import { isMostPopularDish } from "@/components/menu-selection/dishData";
import { dishImageByKey, getDishImageByName } from "@/lib/dish-images";
import DishImageFrame from "@/components/DishImageFrame";
import {
  CardAmbientDecor,
  CardContentTopRule,
  CardCornerAccents,
  CardSpacerDecor,
  MenuItemDivider,
  SectionBadgeOrnament,
  SectionHeaderAccent,
  SectionSideRails,
  TitleAccentLines,
} from "@/components/landing/LuxuryCardDecor";
import cocktailHourPlatterImg from "@/assets/dish-cocktail-hour-platter.png";
import proteinImg from "@/assets/menu-protein.png";
import sidesImg from "@/assets/menu-sides.jpg";
import greekSaladImg from "@/assets/dish-greek-salad.png";
import fruitMixImg from "@/assets/dish-fruit-platter.png";
import freshRollsImg from "@/assets/dish-fresh-rolls.png";

const imageMap: Record<string, string> = {
  "dish-cocktail-hour-platter": cocktailHourPlatterImg,
  "menu-protein": proteinImg,
  "menu-sides": sidesImg,
  "dish-greek-salad": greekSaladImg,
  "dish-fruit-platter": fruitMixImg,
  "dish-fresh-rolls": freshRollsImg,
};

const dishImageMap = dishImageByKey;

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

function resolveItemImageSrc(item: MenuItem): string | undefined {
  if (item.dishImage) {
    return dishImageMap[item.dishImage];
  }
  return getDishImageByName(item.name);
}

function DishTooltip({ src, name, isActive }: { src: string; name: string; isActive?: boolean }) {
  return (
    <div
      className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-3 z-50 pointer-events-none opacity-0 md:group-hover/item:opacity-100 transition-opacity duration-300 ease-out ${isActive ? "!opacity-100" : ""}`}
      style={{ width: "min(280px, calc(100vw - 3rem))" }}
    >
      <div
        className="relative overflow-hidden rounded-sm"
        style={{
          border: "1px solid rgba(200, 164, 93, 0.35)",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(200, 164, 93, 0.1)",
        }}
      >
        <DishImageFrame src={src} alt={name} rounded="none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0D]/40 to-transparent pointer-events-none" />
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

  return (
    <section id="menu" className="py-16 sm:py-24 md:py-32 relative overflow-hidden" style={{ background: "#0F0F0D" }}>
      <div className="menu-section-glow-left" aria-hidden="true" />
      <div className="menu-section-glow-right" aria-hidden="true" />
      <div className="menu-section-embers" aria-hidden="true" />

      <div className="container px-4 sm:px-6 md:px-12 mx-auto relative z-10">
        <SectionSideRails />

        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20 relative">
          <SectionHeaderAccent />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionBadgeOrnament />
            <span className="uppercase tracking-[0.25em] text-[10px] sm:text-xs font-medium mb-4 sm:mb-5 block" style={{ color: "#C8A45D" }}>
              {t.menuSection.badge}
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 whitespace-pre-line leading-tight"
              style={{ fontFamily: "var(--app-font-serif)", color: "#FFFFFF" }}
            >
              {t.menuSection.heading}
            </h2>
            <p className="text-base sm:text-lg font-light leading-relaxed px-1" style={{ color: "#E8E4DE" }}>
              {t.menuSection.subheading}
            </p>
          </motion.div>
        </div>

        {/* ── Menu Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 items-stretch max-w-xl md:max-w-none mx-auto">
          {categories.map((group, idx) => {
            const imgSrc = group.image
              ? imageMap[group.image] ?? dishImageMap[group.image]
              : undefined;
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="group menu-card-luxury relative overflow-hidden flex flex-col h-full transition-all duration-500 ease-out md:hover:-translate-y-2"
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
                <CardCornerAccents />
                <CardAmbientDecor seed={idx} />

                {imgSrc && (
                  <div className="h-48 sm:h-56 overflow-hidden relative">
                    <img
                      src={imgSrc}
                      alt={group.category}
                      className="w-full h-full object-cover transition-transform duration-[800ms] ease-out md:group-hover:scale-[1.08]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0D] via-[#0F0F0D]/60 to-[#0F0F0D]/20" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#C8A45D]/5 via-transparent to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute top-3 left-3 w-8 h-8 border-t border-l border-[#C8A45D]/20 pointer-events-none" />
                    <div className="absolute top-3 right-3 w-8 h-8 border-t border-r border-[#C8A45D]/20 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8A45D]/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
                      <h3
                        className="text-xl sm:text-2xl font-semibold tracking-wide"
                        style={{ fontFamily: "var(--app-font-display)", color: "#C8A45D" }}
                      >
                        {group.category}
                      </h3>
                      <TitleAccentLines />
                    </div>
                  </div>
                )}

                {!imgSrc && (
                  <div className="px-4 sm:px-6 pt-5 sm:pt-6 pb-2">
                    <h3
                      className="text-xl sm:text-2xl font-semibold tracking-wide"
                      style={{ fontFamily: "var(--app-font-display)", color: "#C8A45D" }}
                    >
                      {group.category}
                    </h3>
                    <TitleAccentLines />
                  </div>
                )}

                <div className="px-4 sm:px-6 py-5 sm:py-6 flex-1 flex flex-col relative z-[1]">
                  <CardContentTopRule />
                  <div className="space-y-4 sm:space-y-5">
                    {group.items.map((item, itemIdx) => {
                      const itemImageSrc = resolveItemImageSrc(item);
                      return (
                        <div key={item.name} className="group/item relative">
                          {itemImageSrc && (
                            <DishTooltip
                              src={itemImageSrc}
                              name={item.name}
                              isActive={activeImage === item.name}
                            />
                          )}

                          <div className="flex items-start justify-between gap-3">
                            <h4
                              className={`text-[15px] font-semibold tracking-wide transition-colors duration-300 text-[#FFFFFF] group-hover/item:text-[#C8A45D] touch-manipulation ${itemImageSrc ? "cursor-pointer min-h-[44px] sm:min-h-0 flex items-center" : ""}`}
                              style={{ fontFamily: "var(--app-font-display)" }}
                              onClick={() => {
                                if (itemImageSrc) {
                                  setActiveImage(activeImage === item.name ? null : item.name);
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
                          {itemIdx < group.items.length - 1 && <MenuItemDivider />}
                        </div>
                      );
                    })}
                  </div>
                  <CardSpacerDecor itemCount={group.items.length} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
