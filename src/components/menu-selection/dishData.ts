import { DishInfo } from "./types";
import { ADDONS, type AddOn } from "@/lib/pricing";
import { getDishImageByName } from "@/lib/dish-images";
import { translations } from "@/lib/i18n";

const proteinImages = [
  "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1432139509613-5c4256db5d6b?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=300&fit=crop",
];

const sideImages = [
  "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop",
];

const appetizerImages = [
  "https://images.unsplash.com/photo-1541529086526-db283c563270?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1601924580400-0b3c3f2c3f3e?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1529312266912-b33cf6227e24?w=400&h=300&fit=crop",
];

const saladImages = [
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1561043433-aaf687c4cf04?w=400&h=300&fit=crop",
];

const breadImages = [
  "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1585476263060-655037f5165b?w=400&h=300&fit=crop",
];

function buildDishDescriptions(): Record<string, string> {
  const map: Record<string, string> = {};

  for (const locale of Object.values(translations)) {
    for (const group of locale.menuSection.categories) {
      for (const item of group.items) {
        map[item.name] = item.desc;
      }
    }
  }

  // Legacy bread names from older bookings
  const classicRollsDesc = map["Classic Rolls"];
  const classicRollsRuDesc = map["Классические булочки"];
  if (classicRollsDesc) {
    map["Fresh Rolls"] = classicRollsDesc;
  }
  if (classicRollsRuDesc) {
    map["Свежие булочки"] = classicRollsRuDesc;
    map["Корзина с артизанским хлебом"] = classicRollsRuDesc;
  }

  const cabbageSaladRuDesc = map["Салат из капусты"];
  if (cabbageSaladRuDesc) {
    map["Салат из свежих овощей"] = cabbageSaladRuDesc;
  }

  return map;
}

const dishDescriptions = buildDishDescriptions();

const fruitImages = [
  "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=400&h=300&fit=crop",
];


const categoryImages: Record<string, string[]> = {
  Appetizers: appetizerImages,
  Proteins: proteinImages,
  Sides: sideImages,
  Salads: saladImages,
  Breads: breadImages,
  "Fruit Mix": fruitImages,
  "\u0417\u0430\u043a\u0443\u0441\u043a\u0438": appetizerImages,
  "\u0411\u0435\u043b\u043a\u0438": proteinImages,
  "\u0413\u0430\u0440\u043d\u0438\u0440\u044b": sideImages,
  "\u0421\u0430\u043b\u0430\u0442\u044b": saladImages,
  "\u0425\u043b\u0435\u0431": breadImages,
  "\u0424\u0440\u0443\u043a\u0442\u044b": fruitImages,
};

/* ------------------------------------------------------------------ */
/*  Dish-to-addon mapping: when a premium dish is selected from the   */
/*  menu list, its addon surcharge is auto-applied to the estimate.     */
/*  Maps dish name (EN and RU) → addon id.                              */
/* ------------------------------------------------------------------ */

export const DISH_TO_ADDON: Record<string, string> = {
  // Appetizers (EN)
  "Cocktail Hour Platter": "cocktail-hour-platter",
  // Appetizers (RU)
  "\u041a\u043e\u043a\u0442\u0435\u0439\u043b\u044c\u043d\u0430\u044f \u0442\u0430\u0440\u0435\u043b\u043a\u0430": "cocktail-hour-platter",

  // Proteins (EN)
  "Salmon": "salmon",
  "Beef Loin Steak": "beef-loin-steak",
  // Proteins (RU)
  "\u041b\u043e\u0441\u043e\u0441\u044c": "salmon",
  "\u0421\u0442\u0435\u0439\u043a \u0438\u0437 \u0433\u043e\u0432\u044f\u0436\u044c\u0435\u0439 \u0432\u044b\u0440\u0435\u0437\u043a\u0438": "beef-loin-steak",

  // Salads (EN)
  "Olivier Salad": "olivier-salad",
  "Crab Salad": "crab-salad",
  // Salads (RU)
  "\u0421\u0430\u043b\u0430\u0442 \u041e\u043b\u0438\u0432\u044c\u0435": "olivier-salad",
  "\u0421\u0430\u043b\u0430\u0442 \u0441 \u043a\u0440\u0430\u0431\u043e\u043c": "crab-salad",
};

const addonById = Object.fromEntries(ADDONS.map((a) => [a.id, a])) as Record<string, AddOn>;

/** Returns addon info for a dish name, or undefined if not premium. */
export function getDishAddon(name: string): AddOn | undefined {
  const addonId = DISH_TO_ADDON[name];
  if (!addonId) return undefined;
  return addonById[addonId];
}

function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function getDishInfo(name: string, categoryName: string): DishInfo {
  const localImage = getDishImageByName(name);
  const images = categoryImages[categoryName] || proteinImages;
  const idx = hashString(name) % images.length;
  return {
    name,
    description: dishDescriptions[name] || "A premium dish prepared with the finest ingredients.",
    image: localImage ?? images[idx],
  };
}

export function getDishDescription(name: string): string {
  return dishDescriptions[name] || "A premium dish prepared with the finest ingredients.";
}

/* ------------------------------------------------------------------ */
/*  Most Popular dish names (EN and RU). These dishes get a special   */
/*  "Most Popular" badge across all pages.                             */
/* ------------------------------------------------------------------ */
export const MOST_POPULAR_DISHES = new Set([
  // EN
  "Cocktail Hour Platter",
  "Beef Loin Steak",
  "Beef Loin Kebab",
  "Chicken Thighs",
  "Mashed Potatoes with Cheddar",
  "Potatoes with Parmesan and Parsley",
  "Asparagus with Parmesan Cheese",
  "Caprese Salad",
  "Greek Salad",
  "Caesar Salad",
  // RU
  "\u041a\u043e\u043a\u0442\u0435\u0439\u043b\u044c\u043d\u0430\u044f \u0442\u0430\u0440\u0435\u043b\u043a\u0430",
  "\u0421\u0442\u0435\u0439\u043a \u0438\u0437 \u0433\u043e\u0432\u044f\u0436\u044c\u0435\u0439 \u0432\u044b\u0440\u0435\u0437\u043a\u0438",
  "\u041a\u0435\u0431\u0430\u0431 \u0438\u0437 \u0433\u043e\u0432\u044f\u0436\u044c\u0435\u0439 \u0432\u044b\u0440\u0435\u0437\u043a\u0438",
  "\u041a\u0443\u0440\u0438\u043d\u044b\u0435 \u0431\u0451\u0434\u0440\u0430",
  "\u041a\u0430\u0440\u0442\u043e\u0444\u0435\u043b\u044c\u043d\u043e\u0435 \u043f\u044e\u0440\u0435 \u0441 \u0447\u0435\u0434\u0434\u0435\u0440\u043e\u043c",
  "\u041a\u0430\u0440\u0442\u043e\u0444\u0435\u043b\u044c \u0441 \u043f\u0430\u0440\u043c\u0435\u0437\u0430\u043d\u043e\u043c \u0438 \u043f\u0435\u0442\u0440\u0443\u0448\u043a\u043e\u0439",
  "\u0421\u043f\u0430\u0440\u0436\u0430 \u0441 \u0441\u044b\u0440\u043e\u043c \u043f\u0430\u0440\u043c\u0435\u0437\u0430\u043d",
  "\u0421\u0430\u043b\u0430\u0442 \u041a\u0430\u043f\u0440\u0435\u0437\u0435",
  "\u0413\u0440\u0435\u0447\u0435\u0441\u043a\u0438\u0439 \u0441\u0430\u043b\u0430\u0442",
  "\u0421\u0430\u043b\u0430\u0442 \u0426\u0435\u0437\u0430\u0440\u044c",
]);

/** Returns true if the dish is on the Most Popular list. */
export function isMostPopularDish(name: string): boolean {
  return MOST_POPULAR_DISHES.has(name);
}
