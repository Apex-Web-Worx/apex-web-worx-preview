import dishCaprese from "@/assets/dish-caprese.png";
import dishOlivesSalami from "@/assets/dish-olives-salami.png";
import dishShrimpProsciutto from "@/assets/dish-shrimp-prosciutto.png";
import dishCheeseTarts from "@/assets/dish-cheese-tarts.png";
import dishCrabSalad from "@/assets/dish-crab-salad.png";
import dishSalmonCreamCheese from "@/assets/dish-salmon-cream-cheese.png";
import dishProsciuttoFeta from "@/assets/dish-prosciutto-feta.png";
import dishCheesePlatter from "@/assets/dish-cheese-platter.png";
import dishOlivesBerries from "@/assets/dish-olives-berries.png";
import dishBeefLoinKebab from "@/assets/dish-beef-loin-kebab.png";
import dishBeefLoin from "@/assets/dish-beef-loin.png";
import dishPorkLoinKebab from "@/assets/dish-pork-loin-kebab.png";
import dishPorkRibs from "@/assets/dish-pork-ribs.png";
import dishChickenDrumsticks from "@/assets/dish-chicken-drumsticks.png";
import dishChickenWings from "@/assets/dish-chicken-wings.png";
import dishChickenBreastKebab from "@/assets/dish-chicken-breast-kebab.png";
import dishChickenThighs from "@/assets/dish-chicken-thighs.png";
import dishSalmon from "@/assets/dish-salmon.png";
import dishRoastedPotatoes from "@/assets/dish-roasted-potatoes.png";
import dishOlivierSalad from "@/assets/dish-olivier-salad.png";
import dishMashedPotatoes from "@/assets/dish-mashed-potatoes.png";
import dishVegetableMix from "@/assets/dish-vegetable-mix.png";
import dishGreenBeans from "@/assets/dish-green-beans.png";
import dishAsparagus from "@/assets/dish-asparagus.png";
import dishGrilledAsparagus from "@/assets/dish-grilled-asparagus.png";
import dishBroccoli from "@/assets/dish-broccoli.png";
import dishMacaroniTomatoSauce from "@/assets/dish-macaroni-tomato-sauce.png";
import dishWildRice from "@/assets/dish-wild-rice.png";
import dishRiceVegetables from "@/assets/dish-rice-vegetables.png";
import dishRatatouille from "@/assets/dish-ratatouille.png";
import dishFriedPotatoes from "@/assets/dish-fried-potatoes.png";
import dishCaesarSalad from "@/assets/dish-caesar-salad.png";
import dishGreekSalad from "@/assets/dish-greek-salad.png";
import dishCapreseSalad from "@/assets/dish-caprese-salad.png";
import dishCocktailHourPlatter from "@/assets/dish-cocktail-hour-platter.png";
import dishDeliBoard from "@/assets/dish-deli-board.png";
import dishCabbageSalad from "@/assets/dish-cabbage-salad.png";
import dishGardenSalad from "@/assets/dish-garden-salad.png";
import dishFruitPlatter from "@/assets/dish-fruit-platter.png";
import dishFreshRolls from "@/assets/dish-fresh-rolls.png";
import dishSlicedBread from "@/assets/dish-sliced-bread.png";
import { translations } from "@/lib/i18n";

export const dishImageByKey: Record<string, string> = {
  "dish-caprese": dishCaprese,
  "dish-olives-salami": dishOlivesSalami,
  "dish-shrimp-prosciutto": dishShrimpProsciutto,
  "dish-cheese-tarts": dishCheeseTarts,
  "dish-crab-salad": dishCrabSalad,
  "dish-salmon-cream-cheese": dishSalmonCreamCheese,
  "dish-prosciutto-feta": dishProsciuttoFeta,
  "dish-cheese-platter": dishCheesePlatter,
  "dish-olives-berries": dishOlivesBerries,
  "dish-beef-loin-kebab": dishBeefLoinKebab,
  "dish-beef-loin": dishBeefLoin,
  "dish-pork-loin-kebab": dishPorkLoinKebab,
  "dish-pork-ribs": dishPorkRibs,
  "dish-chicken-drumsticks": dishChickenDrumsticks,
  "dish-chicken-wings": dishChickenWings,
  "dish-chicken-breast-kebab": dishChickenBreastKebab,
  "dish-chicken-thighs": dishChickenThighs,
  "dish-chicken-breast": dishChickenBreastKebab,
  "dish-salmon": dishSalmon,
  "dish-roasted-potatoes": dishRoastedPotatoes,
  "dish-olivier-salad": dishOlivierSalad,
  "dish-mashed-potatoes": dishMashedPotatoes,
  "dish-vegetable-mix": dishVegetableMix,
  "dish-green-beans": dishGreenBeans,
  "dish-asparagus": dishAsparagus,
  "dish-grilled-asparagus": dishGrilledAsparagus,
  "dish-broccoli": dishBroccoli,
  "dish-macaroni-tomato-sauce": dishMacaroniTomatoSauce,
  "dish-wild-rice": dishWildRice,
  "dish-rice-vegetables": dishRiceVegetables,
  "dish-ratatouille": dishRatatouille,
  "dish-fried-potatoes": dishFriedPotatoes,
  "dish-caesar-salad": dishCaesarSalad,
  "dish-greek-salad": dishGreekSalad,
  "dish-caprese-salad": dishCapreseSalad,
  "dish-cocktail-hour-platter": dishCocktailHourPlatter,
  "dish-deli-board": dishDeliBoard,
  "dish-cabbage-salad": dishCabbageSalad,
  "dish-garden-salad": dishGardenSalad,
  "dish-fruit-platter": dishFruitPlatter,
  "dish-fresh-rolls": dishFreshRolls,
  "dish-sliced-bread": dishSlicedBread,
};

function buildDishImageByName(): Record<string, string> {
  const map: Record<string, string> = {};

  for (const locale of Object.values(translations)) {
    for (const group of locale.menuSection.categories) {
      for (const item of group.items) {
        if ("dishImage" in item && item.dishImage && dishImageByKey[item.dishImage]) {
          map[item.name] = dishImageByKey[item.dishImage];
        }
      }
    }
  }

  const enCategories = translations.en.menuSection.categories;
  const ruCategories = translations.ru.menuSection.categories;

  enCategories.forEach((group, groupIdx) => {
    group.items.forEach((item, itemIdx) => {
      if (!("dishImage" in item) || !item.dishImage || !dishImageByKey[item.dishImage]) return;
      const ruItem = ruCategories[groupIdx]?.items[itemIdx];
      if (ruItem) {
        map[ruItem.name] = dishImageByKey[item.dishImage];
      }
    });
  });

  for (const locale of Object.values(translations)) {
    const sectionCategories = locale.menuSection.categories;
    const packageCategories = locale.menuSelection.packages[0]?.categories ?? [];

    packageCategories.forEach((pkgCat, catIdx) => {
      const sectionCat = sectionCategories[catIdx];
      if (!sectionCat) return;

      pkgCat.items.forEach((itemName, itemIdx) => {
        const sectionItem = sectionCat.items[itemIdx];
        if (
          sectionItem &&
          "dishImage" in sectionItem &&
          sectionItem.dishImage &&
          dishImageByKey[sectionItem.dishImage]
        ) {
          map[itemName] = dishImageByKey[sectionItem.dishImage];
        }
      });
    });
  }

  return map;
}

const legacyDishImageAliases: Record<string, string> = {
  "Fresh Rolls": dishImageByKey["dish-fresh-rolls"],
  "\u0421\u0432\u0435\u0436\u0438\u0435 \u0431\u0443\u043b\u043e\u0447\u043a\u0438": dishImageByKey["dish-fresh-rolls"],
  "\u041a\u043e\u0440\u0437\u0438\u043d\u0430 \u0441 \u0430\u0440\u0442\u0438\u0437\u0430\u043d\u0441\u043a\u0438\u043c \u0445\u043b\u0435\u0431\u043e\u043c": dishImageByKey["dish-fresh-rolls"],
  "\u0421\u0430\u043b\u0430\u0442 \u0438\u0437 \u0441\u0432\u0435\u0436\u0438\u0445 \u043e\u0432\u043e\u0449\u0435\u0439": dishImageByKey["dish-cabbage-salad"],
};

export const dishImageByName = { ...buildDishImageByName(), ...legacyDishImageAliases };

export function getDishImageByName(name: string): string | undefined {
  return dishImageByName[name];
}

export function getDishImageByKey(key: string): string | undefined {
  return dishImageByKey[key];
}

/** Matches scripts/lib/dish-image-preset.mjs — 1600×1200, 4:3, cover fit. */
export const DISH_IMAGE_ASPECT = "4 / 3" as const;
export const DISH_IMAGE_OUTPUT_SIZE = { width: 1600, height: 1200 } as const;
