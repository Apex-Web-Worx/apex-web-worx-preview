/**
 * @/lib/pricing
 *
 * Demo catering package pricing data for Premier Event Catering preview.
 * menu categories/items, add-ons, and pricing math. Consumed by:
 *  - grill-chef (client checkout, client dashboard)
 *  - api-server (inquiry creation, menu selection, admin routes, emails)
 *
 * The grill-chef-admin mobile app does NOT import this package directly
 * (Expo/Metro workspace resolution risk) - it renders values that were
 * already computed server-side using this module, so it stays in sync
 * automatically.
 */

export interface CategoryConfig {
  id: string;
  name: string;
  maxSelect: number;
  complimentary?: boolean;
  items: string[];
}

export interface AddOn {
  id: string;
  name: string;
  pricePerPerson: number;
}

export interface SelectedItem {
  name: string;
  quantity: number;
}

/* ------------------------------------------------------------------ */
/*  Guest-count pricing tiers                                          */
/* ------------------------------------------------------------------ */

export function getPricePerPerson(guests: number): number {
  if (guests <= 10) return 60;
  if (guests <= 19) return 50;
  if (guests <= 99) return 40;
  if (guests <= 150) return 35;
  if (guests <= 199) return 32;
  return 30;
}

/* ------------------------------------------------------------------ */
/*  The single catering package                                        */
/* ------------------------------------------------------------------ */

export const PACKAGE_INFO = {
  id: "classic",
  name: "The Classic Package",
  description:
    "Choose 1 appetizer, 2 proteins, 2 sides, and 2 salads. Fresh rolls and sliced bread and fresh fruit mix included complimentary. Perfect for casual gatherings.",
  includes: [
    "1 appetizer selection",
    "Choice of 2 grilled proteins (steak, chicken, or pork)",
    "2 signature sides",
    "2 fresh salads",
    "Sliced bread and fresh rolls (complimentary)",
    "Fresh fruit mix (complimentary)",
    "Professional service staff",
  ],
};

export const MENU_CATEGORIES: CategoryConfig[] = [
  {
    id: "appetizers",
    name: "Appetizers",
    maxSelect: 1,
    items: ["Deli Board", "Cocktail Hour Platter"],
  },
  {
    id: "proteins",
    name: "Proteins",
    maxSelect: 2,
    items: [
      "Beef Loin Steak",
      "Salmon",
      "Pork Ribs",
      "Chicken Thighs",
      "Beef Loin Kebab",
      "Pork Loin Kebab",
      "Chicken Breast Kebab",
      "Chicken Wings",
      "Chicken Drumsticks",
    ],
  },
  {
    id: "sides",
    name: "Sides",
    maxSelect: 2,
    items: [
      "Potatoes with Parmesan and Parsley",
      "Mashed Potatoes with Cheddar",
      "Rice with Vegetables",
      "Skin-On Potatoes with Bacon and Fresh Onion",
      "Asparagus with Parmesan Cheese",
      "Asparagus",
      "Macaroni with Tomato and Heavy Cream Sauce",
      "Green Beans with Garlic and Onion",
      "Vegetable Mix",
    ],
  },
  {
    id: "salads",
    name: "Salads",
    maxSelect: 2,
    items: ["Caesar Salad", "Caprese Salad", "Greek Salad", "Cabbage Salad", "Olivier Salad", "Crab Salad"],
  },
  {
    id: "breads",
    name: "Breads",
    maxSelect: 1,
    complimentary: true,
    items: ["Fresh Rolls", "Sliced Bread"],
  },
  {
    id: "fruit",
    name: "Fruit Mix",
    maxSelect: 1,
    complimentary: true,
    items: ["Fruit Mix"],
  },
];

/* ------------------------------------------------------------------ */
/*  Add-ons: flat $/person surcharges on top of the base package        */
/* ------------------------------------------------------------------ */

export const ADDONS: AddOn[] = [
  { id: "beef-loin-steak", name: "Beef Loin Steak", pricePerPerson: 4 },
  { id: "salmon", name: "Salmon", pricePerPerson: 3 },
  { id: "cocktail-hour-platter", name: "Cocktail Hour Platter", pricePerPerson: 5 },
  { id: "olivier-salad", name: "Olivier Salad", pricePerPerson: 2 },
  { id: "crab-salad", name: "Crab Salad", pricePerPerson: 1 },
];

export function getAddonById(id: string): AddOn | undefined {
  return ADDONS.find((a) => a.id === id);
}

/* ------------------------------------------------------------------ */
/*  Full-serving item expansion                                         */
/*  Every selected item gets the FULL guest count as its serving        */
/*  quantity - selections are not divided across items in a category.   */
/* ------------------------------------------------------------------ */

export function expandSelectedItemsForGuests(
  selectedItemNames: string[],
  totalGuests: number
): SelectedItem[] {
  return selectedItemNames.map((name) => ({ name, quantity: totalGuests }));
}

/** Groups a flat selectedItems list back into their menu categories, for display. */
export function groupItemsByCategory(
  selectedItems: SelectedItem[]
): { category: CategoryConfig; items: SelectedItem[] }[] {
  const byName = new Map(selectedItems.map((i) => [i.name, i]));
  return MENU_CATEGORIES.map((category) => ({
    category,
    items: category.items
      .filter((name) => byName.has(name))
      .map((name) => byName.get(name)!),
  })).filter((group) => group.items.length > 0);
}

/* ------------------------------------------------------------------ */
/*  Order totals                                                        */
/* ------------------------------------------------------------------ */

export interface OrderTotalsInput {
  guestCount: number;
  additionalGuests?: number;
  selectedAddonIds?: string[];
}

export interface OrderTotals {
  totalGuests: number;
  basePricePerPerson: number;
  addons: AddOn[];
  addonsPricePerPerson: number;
  pricePerPerson: number;
  total: number;
}

export function computeOrderTotals(input: OrderTotalsInput): OrderTotals {
  const totalGuests = input.guestCount + (input.additionalGuests || 0);
  const basePricePerPerson = getPricePerPerson(totalGuests);
  const addons = (input.selectedAddonIds || [])
    .map((id) => getAddonById(id))
    .filter((a): a is AddOn => Boolean(a));
  const addonsPricePerPerson = addons.reduce((sum, a) => sum + a.pricePerPerson, 0);
  const pricePerPerson = basePricePerPerson + addonsPricePerPerson;
  const total = pricePerPerson * totalGuests;
  return { totalGuests, basePricePerPerson, addons, addonsPricePerPerson, pricePerPerson, total };
}

/* ------------------------------------------------------------------ */
/*  Important package notes - shown at checkout, client dashboard,      */
/*  and admin views so everyone sees the same fine print.               */
/* ------------------------------------------------------------------ */

export const IMPORTANT_PACKAGE_NOTES: string[] = [
  "Delivery is included in your package price.",
  "Buffet-style serving tableware (chafing dishes, serving utensils) is included.",
];
