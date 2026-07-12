import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  AlertTriangle,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDemoModal } from "@/contexts/DemoModalContext";
import Footer from "@/components/landing/Footer";
import { computeOrderTotals } from "@/lib/pricing";
import { getDishAddon, DISH_TO_ADDON } from "@/components/menu-selection/dishData";
import { saveDemoBooking } from "@/lib/demo";

import { InquiryData, MenuBuilderState, PackageConfig, CategoryConfig, CategoryState } from "@/components/menu-selection/types";
import PackageCard from "@/components/menu-selection/PackageCard";
import EventSummary from "@/components/menu-selection/EventSummary";
import OrderSummary from "@/components/menu-selection/OrderSummary";
import DishCategory from "@/components/menu-selection/DishCategory";
import DishPreview from "@/components/menu-selection/DishPreview";
import MobileBottomSheet from "@/components/menu-selection/MobileBottomSheet";

const packageIds = ["classic"];

export default function MenuSelection() {
  const { t, language, setLanguage } = useLanguage();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { showDemoModal } = useDemoModal();
  const isMobile = useIsMobile();

  const [inquiry, setInquiry] = useState<InquiryData | null>(null);
  const [menuState, setMenuState] = useState<MenuBuilderState>({});
  const [additionalGuests, setAdditionalGuests] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clientNote, setClientNote] = useState("");
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);

  // Active category tab — initialized via useEffect so packages is available
  const [activeCategory, setActiveCategory] = useState<string>("");

  // Mobile preview state
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [previewItem, setPreviewItem] = useState<string | null>(null);
  const [previewCategory, setPreviewCategory] = useState<string | null>(null);

  // Mobile collapsible sections
  const [showOrderSummary, setShowOrderSummary] = useState(true);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("demo") === "1") {
      const demoInquiry = {
        id: 1,
        clientToken: "demo",
        name: "Alex Rivera",
        email: "alex@example.com",
        phone: "(555) 123-4567",
        eventType: "Wedding",
        eventDate: "2026-08-22",
        guestCount: 120,
        location: "Garden Venue",
        message: "Looking for a plated dinner with vegetarian options.",
      };
      setInquiry(demoInquiry);
      setTimeout(() => {
        const guests = demoInquiry.guestCount;
        const half = Math.ceil(guests / 2);
        const demoState: MenuBuilderState = {
          classic: {
            selected: true,
            categories: {
              Appetizers: {
                "Deli Board": { selected: true, quantity: guests },
                "Cocktail Hour Platter": { selected: false, quantity: guests },
              },
              Proteins: {
                "Beef Loin Steak": { selected: true, quantity: half },
                "Salmon": { selected: true, quantity: half },
                "Pork Ribs": { selected: false, quantity: guests },
                "Chicken Thighs": { selected: false, quantity: guests },
                "Beef Loin Kebab": { selected: false, quantity: guests },
                "Pork Loin Kebab": { selected: false, quantity: guests },
                "Chicken Breast Kebab": { selected: false, quantity: guests },
                "Chicken Wings": { selected: false, quantity: guests },
                "Chicken Drumsticks": { selected: false, quantity: guests },
              },
              Sides: {
                "Potatoes with Parmesan and Parsley": { selected: true, quantity: half },
                "Mashed Potatoes with Cheddar": { selected: false, quantity: guests },
                "Rice with Vegetables": { selected: true, quantity: half },
                "Skin-On Potatoes with Bacon and Fresh Onion": { selected: false, quantity: guests },
                "Asparagus with Parmesan Cheese": { selected: false, quantity: guests },
                "Asparagus": { selected: false, quantity: guests },
                "Macaroni with Tomato and Heavy Cream Sauce": { selected: false, quantity: guests },
                "Green Beans with Garlic and Onion": { selected: false, quantity: guests },
                "Vegetable Mix": { selected: false, quantity: guests },
              },
              Salads: {
                "Caesar Salad": { selected: true, quantity: guests },
                "Caprese Salad": { selected: false, quantity: guests },
                "Greek Salad": { selected: false, quantity: guests },
                "Cabbage Salad": { selected: false, quantity: guests },
                "Olivier Salad": { selected: false, quantity: guests },
                "Crab Salad": { selected: false, quantity: guests },
              },
              Breads: {
                "Classic Rolls": { selected: true, quantity: guests },
                "Sliced Bread": { selected: false, quantity: guests },
              },
              "Fruit Mix": {
                "Fruit Mix": { selected: true, quantity: guests },
              },
            },
          },
        };
        setMenuState(demoState);

        // Pre-set preview for demo
        setPreviewItem("Beef Loin Steak");
        setPreviewCategory("Proteins");

        // Sync addon IDs for pre-selected premium dishes in demo mode
        const demoAddonIds: string[] = [];
        Object.values(demoState.classic.categories).forEach((cat) => {
          Object.entries(cat).forEach(([name, item]) => {
            if (item.selected) {
              const addonId = DISH_TO_ADDON[name];
              if (addonId && !demoAddonIds.includes(addonId)) demoAddonIds.push(addonId);
            }
          });
        });
        setSelectedAddonIds(demoAddonIds);
      }, 100);
      return;
    }
    const stored = sessionStorage.getItem("inquiryData");
    if (!stored) {
      toast({
        title: t.menuSelection.noInquiryTitle,
        description: t.menuSelection.noInquiryDesc,
        variant: "destructive",
      });
      setLocation("/");
      return;
    }
    setInquiry(JSON.parse(stored));
  }, [setLocation, toast, t]);

  const packages = (
    t.menuSelection.packages as readonly {
      name: string;
      description: string;
      includes: readonly string[];
      categories?: readonly { name: string; maxSelect: number; items: readonly string[]; complimentary?: boolean }[];
    }[]
  ).map((pkg, idx) => {
    const cats = pkg.categories || [];
    return {
      id: packageIds[idx],
      name: pkg.name,
      description: pkg.description,
      includes: pkg.includes,
      categories: cats as CategoryConfig[],
    };
  });

  // After a real booking handoff, auto-select Classic so step 2 is immediately usable
  useEffect(() => {
    if (!inquiry) return;
    if (Object.keys(menuState).length > 0) return;
    const url = new URL(window.location.href);
    if (url.searchParams.get("demo") === "1") return;

    const pkg = packages.find((p) => p.id === "classic");
    if (!pkg) return;

    const guests = inquiry.guestCount;
    const categories: Record<string, CategoryState> = {};
    pkg.categories.forEach((cat) => {
      const catState: CategoryState = {};
      cat.items.forEach((item) => {
        catState[item] = { selected: false, quantity: guests };
      });
      if (cat.complimentary && cat.items.length > 0) {
        catState[cat.items[0]] = { selected: true, quantity: guests };
      }
      categories[cat.name] = catState;
    });

    setMenuState({
      classic: { selected: true, categories },
    });
    if (pkg.categories.length > 0) {
      setActiveCategory(pkg.categories[0].name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once when inquiry arrives
  }, [inquiry]);

  // Initialize active category on mount (when packages are available)
  useEffect(() => {
    if (!activeCategory && packages.length > 0 && packages[0].categories.length > 0) {
      setActiveCategory(packages[0].categories[0].name);
    }
  }, []);

  // When language changes, update activeCategory to the first category of the selected package
  useEffect(() => {
    const selectedPkg = packages.find((p) => menuState[p.id]?.selected);
    if (selectedPkg && selectedPkg.categories.length > 0) {
      setActiveCategory(selectedPkg.categories[0].name);
    } else if (packages.length > 0 && packages[0].categories.length > 0) {
      setActiveCategory(packages[0].categories[0].name);
    }
  }, [language]);

  const baseGuests = inquiry?.guestCount || 0;
  const totalGuests = baseGuests + additionalGuests;

  // Whenever totalGuests changes (e.g. via additionalGuests), rescale
  // every item's quantity to match the new total so the OrderSummary
  // shows correct portion counts.
  useEffect(() => {
    setMenuState((prev) => {
      const updated: MenuBuilderState = {};
      for (const [pkgId, pkg] of Object.entries(prev)) {
        const newCats: Record<string, CategoryState> = {};
        for (const [catName, cat] of Object.entries(pkg.categories)) {
          const newCat: CategoryState = {};
          for (const [itemName, item] of Object.entries(cat)) {
            newCat[itemName] = { ...item, quantity: totalGuests };
          }
          newCats[catName] = newCat;
        }
        updated[pkgId] = { ...pkg, categories: newCats };
      }
      return updated;
    });
  }, [totalGuests]);

  const orderTotals = computeOrderTotals({
    guestCount: baseGuests,
    additionalGuests,
    selectedAddonIds,
  });
  const basePricePerPerson = orderTotals.basePricePerPerson;
  const addonsPricePerPerson = orderTotals.addonsPricePerPerson;
  const pricePerPerson = orderTotals.pricePerPerson;
  const estimatedTotal = orderTotals.total;

  function getSelectedPackageIds(): string[] {
    return Object.keys(menuState).filter((pid) => menuState[pid].selected);
  }

  function getSelectedItemsByCategory(pkgId: string): Record<string, { name: string; quantity: number }[]> {
    const pkg = menuState[pkgId];
    if (!pkg) return {};
    const result: Record<string, { name: string; quantity: number }[]> = {};
    Object.entries(pkg.categories).forEach(([catName, cat]) => {
      result[catName] = Object.entries(cat)
        .filter(([, item]) => item.selected)
        .map(([name, item]) => ({ name, quantity: item.quantity }));
    });
    return result;
  }

  function getSelectedItems(pkgId: string): { name: string; quantity: number }[] {
    const pkg = menuState[pkgId];
    if (!pkg) return [];
    const items: { name: string; quantity: number }[] = [];
    Object.values(pkg.categories).forEach((cat) => {
      Object.entries(cat).forEach(([name, item]) => {
        if (item.selected) items.push({ name, quantity: item.quantity });
      });
    });
    return items;
  }

  function togglePackage(pkgId: string) {
    const currentState = menuState[pkgId]?.selected;
    if (currentState) {
      setMenuState((prev) => {
        const { [pkgId]: _, ...rest } = prev;
        return rest;
      });
      setPreviewItem(null);
      setPreviewCategory(null);
      setActiveCategory(packages[0]?.categories[0]?.name ?? "Appetizers");
    } else {
      const pkg = packages.find((p) => p.id === pkgId);
      if (!pkg) return;
      const categories: Record<string, CategoryState> = {};
      pkg.categories.forEach((cat) => {
        const catState: CategoryState = {};
        cat.items.forEach((item) => {
          catState[item] = { selected: false, quantity: totalGuests };
        });
        // Auto-select first item in complimentary categories
        if (cat.complimentary && cat.items.length > 0) {
          catState[cat.items[0]] = { selected: true, quantity: totalGuests };
        }
        categories[cat.name] = catState;
      });
      setMenuState({
        [pkgId]: { selected: true, categories },
      });
      // Set active category to the first category of the selected package
      if (pkg.categories.length > 0) {
        setActiveCategory(pkg.categories[0].name);
      }
    }
  }

  // Every selected item gets the FULL guest-count as its serving quantity -
  // selections are never divided/redistributed across items in a category.
  // Premium dishes auto-toggle their addon surcharge (+$X/pp) on select/deselect.
  function toggleItem(pkgId: string, catName: string, itemName: string) {
    const pkg = menuState[pkgId];
    if (!pkg) return;
    const cat = pkg.categories[catName];
    if (!cat) return;
    const current = cat[itemName];
    const selectedCount = Object.values(cat).filter((i) => i.selected).length;
    const pkgConfig = packages.find((p) => p.id === pkgId);
    const catConfig = pkgConfig?.categories.find((c) => c.name === catName);
    const maxSelect = catConfig?.maxSelect || 0;
    const wasSelected = current?.selected ?? false;

    // Update menu state
    setMenuState((prev) => {
      const p = prev[pkgId];
      if (!p) return prev;
      const c = p.categories[catName];
      if (!c) return prev;
      const cur = c[itemName];
      const selCount = Object.values(c).filter((i) => i.selected).length;

      const newCat: CategoryState = { ...c };
      if (cur.selected) {
        newCat[itemName] = { ...cur, selected: false, quantity: totalGuests };
      } else {
        if (maxSelect > 0 && selCount >= maxSelect) return prev;
        newCat[itemName] = { ...cur, selected: true, quantity: totalGuests };
      }
      return {
        ...prev,
        [pkgId]: {
          ...p,
          categories: {
            ...p.categories,
            [catName]: newCat,
          },
        },
      };
    });

    // Auto-toggle addon for premium dishes
    const addonId = DISH_TO_ADDON[itemName];
    if (addonId) {
      if (wasSelected) {
        setSelectedAddonIds((prev) => prev.filter((id) => id !== addonId));
      } else {
        setSelectedAddonIds((prev) =>
          prev.includes(addonId) ? prev : [...prev, addonId]
        );
      }
    }
  }

  function resetCategory(pkgId: string, catName: string) {
    const pkg = menuState[pkgId];
    if (!pkg) return;
    const cat = pkg.categories[catName];
    if (!cat) return;

    // Collect addon IDs from selected premium dishes before resetting
    const addonIdsToRemove: string[] = [];
    Object.entries(cat).forEach(([name, item]) => {
      const addonId = DISH_TO_ADDON[name];
      if (addonId && item.selected) addonIdsToRemove.push(addonId);
    });

    setMenuState((prev) => {
      const p = prev[pkgId];
      if (!p) return prev;
      const c = p.categories[catName];
      if (!c) return prev;
      const reset: typeof c = {};
      Object.entries(c).forEach(([name, item]) => {
        reset[name] = { ...item, selected: false, quantity: totalGuests };
      });
      return {
        ...prev,
        [pkgId]: {
          ...p,
          categories: {
            ...p.categories,
            [catName]: reset,
          },
        },
      };
    });

    if (addonIdsToRemove.length > 0) {
      setSelectedAddonIds((prev) =>
        prev.filter((id) => !addonIdsToRemove.includes(id))
      );
    }
  }

  async function handleConfirm() {
    const selected = getSelectedPackageIds();
    if (selected.length === 0) {
      toast({
        title: t.menuSelection.errorTitle,
        description: t.menuSelection.selectItemsRequired,
        variant: "destructive",
      });
      return;
    }
    const pkg = packages.find((p) => p.id === selected[0]);
    if (!pkg) return;

    const allRequiredCatsHaveItems = pkg.categories
      .filter((cat) => !cat.complimentary)
      .every((cat) => {
        const catState = menuState[selected[0]]?.categories?.[cat.name] || {};
        return Object.values(catState).some((item) => item.selected);
      });
    if (!allRequiredCatsHaveItems) {
      toast({
        title: t.menuSelection.errorTitle,
        description: t.menuSelection.selectItemsRequired,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const selectedItems: { category: string; name: string; quantity: number }[] = [];
      Object.entries(getSelectedItemsByCategory(selected[0])).forEach(([category, items]) => {
        items.forEach((item) => {
          selectedItems.push({ category, name: item.name, quantity: item.quantity });
        });
      });

      const token = inquiry!.clientToken || "demo-preview";
      saveDemoBooking({
        clientToken: token,
        inquiry: {
          id: inquiry!.id,
          name: inquiry!.name,
          email: inquiry!.email,
          phone: inquiry!.phone,
          eventType: inquiry!.eventType,
          eventDate: inquiry!.eventDate,
          guestCount: inquiry!.guestCount,
          location: inquiry!.location,
          message: inquiry!.message,
        },
        packageName: pkg.name,
        packageId: selected[0],
        selectedItems,
        additionalGuests,
        selectedAddonIds,
        basePricePerPerson,
        addonsPricePerPerson,
        pricePerPerson,
        estimatedTotal,
        clientNote,
        status: "pending_approval",
        createdAt: new Date().toISOString(),
      });

      showDemoModal();
      toast({
        title: t.menuSelection.menuSelectedTitle,
        description: `${t.menuSelection.menuSelectedDescPrefix} ${pkg.name}. ${t.menuSelection.menuSelectedDescSuffix}`,
      });
      sessionStorage.removeItem("inquiryData");
      setLocation(`/my-booking/${token}`);
    } catch {
      toast({
        title: t.menuSelection.errorTitle,
        description: t.menuSelection.errorDesc,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!inquiry) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0F0F0D" }}>
        <div className="animate-pulse text-[#C8A45D]">{t.menuSelection.loading}</div>
      </div>
    );
  }

  const selectedPkgIds = getSelectedPackageIds();
  const isAnyPackageSelected = selectedPkgIds.length > 0;
  const selectedPkg = isAnyPackageSelected ? packages.find((p) => p.id === selectedPkgIds[0]) : null;
  const selectedItems = isAnyPackageSelected ? getSelectedItemsByCategory(selectedPkgIds[0]) : {};

  const hasAllRequiredItems = isAnyPackageSelected && selectedPkg
    ? selectedPkg.categories
        .filter((cat) => !cat.complimentary)
        .every((cat) => {
          const catState = menuState[selectedPkg.id]?.categories?.[cat.name] || {};
          return Object.values(catState).some((item) => item.selected);
        })
    : false;

  // Tab bar categories
  const tabCategories = selectedPkg ? selectedPkg.categories.map((c) => c.name) : [];

  // Get preview item state
  const previewItemState =
    previewItem && previewCategory && selectedPkg
      ? menuState[selectedPkg.id]?.categories?.[previewCategory]?.[previewItem]
      : null;

  const handlePreview = (itemName: string, categoryName: string) => {
    setPreviewItem(itemName);
    setPreviewCategory(categoryName);
    if (isMobile) {
      setShowMobilePreview(true);
    }
  };

  const handlePreviewToggle = () => {
    if (selectedPkg && previewItem && previewCategory) {
      toggleItem(selectedPkg.id, previewCategory, previewItem);
    }
  };

  const handlePreviewRemove = () => {
    if (selectedPkg && previewItem && previewCategory) {
      toggleItem(selectedPkg.id, previewCategory, previewItem);
      setPreviewItem(null);
      setPreviewCategory(null);
      setShowMobilePreview(false);
    }
  };

  // ── MOBILE LAYOUT ──
  if (isMobile) {
    return (
      <div className="min-h-screen relative pb-[env(safe-area-inset-bottom)]" style={{ background: "#0F0F0D" }}>
        <div className="px-3 sm:px-4 pt-3 pb-28">
          {/* Header */}
          <div className="flex items-center justify-between gap-2 mb-3 sticky top-0 z-30 -mx-3 sm:-mx-4 px-3 sm:px-4 py-2.5 bg-[#0F0F0D]/95 backdrop-blur-sm border-b border-white/5">
            <button
              onClick={() => setLocation("/")}
              className="flex items-center gap-2 text-sm transition-colors min-h-11 touch-manipulation"
              style={{ color: "#B8B2A8" }}
            >
              <ArrowLeft className="w-4 h-4" />
              {t.menuSelection.back}
            </button>
            <div className="flex items-center gap-1 text-xs uppercase tracking-wider">
              <button onClick={() => setLanguage("en")} className="min-h-11 min-w-11 px-2 py-1 font-medium touch-manipulation" style={{ color: language === "en" ? "#C0172A" : "#B8B2A8" }}>EN</button>
              <span style={{ color: "#B8B2A8" }}>|</span>
              <button onClick={() => setLanguage("ru")} className="min-h-11 min-w-11 px-2 py-1 font-medium touch-manipulation" style={{ color: language === "ru" ? "#C0172A" : "#B8B2A8" }}>RU</button>
            </div>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center gap-2">
              {[
                { step: 1, label: t.menuSelection.stepLabel1 },
                { step: 2, label: t.menuSelection.stepLabel2 },
                { step: 3, label: t.menuSelection.stepLabel3 },
              ].map((s, i) => {
                const isActive = s.step === 2;
                const isPast = s.step < 2;
                return (
                  <div key={s.step} className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{
                          background: isActive ? "#C8A45D" : isPast ? "#C8A45D" : "rgba(200, 164, 93, 0.15)",
                          color: isActive ? "#0F0F0D" : isPast ? "#0F0F0D" : "#B8B2A8",
                          border: isActive ? "1px solid #C8A45D" : "1px solid rgba(200, 164, 93, 0.25)",
                        }}
                      >
                        {isPast ? <Check className="w-3 h-3" /> : s.step}
                      </div>
                    </div>
                    {i < 2 && (
                      <div className="w-6 h-[1px]" style={{ background: "rgba(200, 164, 93, 0.2)" }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Event Summary (collapsible) */}
          <div className="mb-4">
            <EventSummary
              inquiry={inquiry}
              baseGuests={baseGuests}
              totalGuests={totalGuests}
              additionalGuests={additionalGuests}
              onAdditionalGuestsChange={setAdditionalGuests}
              basePricePerPerson={basePricePerPerson}
              addonsPricePerPerson={addonsPricePerPerson}
              pricePerPerson={pricePerPerson}
              estimatedTotal={estimatedTotal}
              selectedAddonIds={selectedAddonIds}
              t={t}
              isMobile={true}
            />
          </div>

          {/* Page heading */}
          <div className="mb-4">
            <h1 className="font-serif text-2xl font-bold mb-1" style={{ color: "#F5EFE4" }}>
              {t.menuSelection.heading}
            </h1>
            <p className="text-sm font-light" style={{ color: "#B8B2A8" }}>
              {t.menuSelection.subheading}
            </p>
          </div>

          {/* Package cards */}
          <div className="space-y-3 mb-4">
            {packages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                isSelected={!!menuState[pkg.id]?.selected}
                pricePerPerson={pricePerPerson}
                personLabel={t.menuSelection.person}
                onToggle={() => togglePackage(pkg.id)}
                isMobile={true}
                t={t}
              />
            ))}
          </div>

          {/* Customize section with tabs */}
          <AnimatePresence>
            {isAnyPackageSelected && selectedPkg && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mb-4" style={{ background: "#171714", border: "1px solid rgba(200, 164, 93, 0.18)" }}>
                  {/* Header */}
                  <div className="px-4 pt-3 pb-2">
                    <h2 className="font-serif text-lg font-bold" style={{ color: "#C8A45D" }}>
                      {t.menuSelection.customizeSelected || "Customize"} {selectedPkg.name}
                    </h2>
                    <p className="text-xs mt-1" style={{ color: "#B8B2A8" }}>
                      {t.menuSelection.subheading || "Select your preferred items and quantities."}
                    </p>
                  </div>

                  {/* Tab bar - horizontal scroll on mobile */}
                  <div
                    className="flex items-center gap-0 px-2 overflow-x-auto no-scrollbar overscroll-x-contain"
                    style={{ borderBottom: "1px solid rgba(200, 164, 93, 0.12)", WebkitOverflowScrolling: "touch" }}
                  >
                    {selectedPkg.categories.map((cat) => (
                      <button
                        key={cat.name}
                        onClick={() => setActiveCategory(cat.name)}
                        className="px-3 py-3 text-[11px] font-medium uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 touch-manipulation"
                        style={{
                          color: activeCategory === cat.name ? "#C8A45D" : "#B8B2A8",
                          borderBottom: activeCategory === cat.name ? "2px solid #C8A45D" : "2px solid transparent",
                          marginBottom: "-1px",
                        }}
                        type="button"
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>

                  {/* Active tab content */}
                  <div className="px-3 pb-3">
                    {selectedPkg.categories.map((cat) => (
                      <div key={cat.name} style={{ display: activeCategory === cat.name ? "block" : "none" }}>
                        <DishCategory
                          cat={cat}
                          catState={menuState[selectedPkg.id]?.categories?.[cat.name] || {}}
                          totalGuests={totalGuests}
                          isActive={activeCategory === cat.name}
                          onToggleItem={(item) => toggleItem(selectedPkg.id, cat.name, item)}
                          onPreviewItem={(item) => handlePreview(item, cat.name)}
                          onSelectTab={() => setActiveCategory(cat.name)}
                          onResetCategory={() => resetCategory(selectedPkg.id, cat.name)}
                          t={t}
                        />
                      </div>
                    ))}
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Validation warning */}
          {isAnyPackageSelected && !hasAllRequiredItems && (
            <div className="flex items-center gap-2 p-3 mb-4 text-sm rounded-sm" style={{ background: "rgba(192, 23, 42, 0.1)", border: "1px solid rgba(192, 23, 42, 0.25)", color: "#C0172A" }}>
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{t.menuSelection.selectItemsWarning}</span>
            </div>
          )}

          {/* Sticky bottom bar */}
          <div
            className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-[#0F0F0D]"
            style={{
              borderTop: "1px solid rgba(200, 164, 93, 0.15)",
              paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
            }}
          >
            {hasAllRequiredItems && (
              <div className="mb-3 space-y-3 max-h-[40vh] overflow-y-auto overscroll-contain">
                <OrderSummary
                  selectedPkg={selectedPkg || null}
                  basePricePerPerson={basePricePerPerson}
                  addonsPricePerPerson={addonsPricePerPerson}
                  pricePerPerson={pricePerPerson}
                  totalGuests={totalGuests}
                  estimatedTotal={estimatedTotal}
                  selectedItemsByCategory={selectedItems}
                  selectedAddonIds={selectedAddonIds}
                  t={t}
                  isMobile={true}
                  autoExpand={hasAllRequiredItems}
                />
                <div className="rounded-sm p-3" style={{ background: "#171714", border: "1px solid rgba(200, 164, 93, 0.12)" }}>
                  <label className="text-[10px] uppercase tracking-wider block mb-2" style={{ color: "#B8B2A8" }}>
                    {t.menuSelection.noteLabel || "Optional Note"}
                  </label>
                  <textarea
                    value={clientNote}
                    onChange={(e) => setClientNote(e.target.value)}
                    placeholder={t.menuSelection.notePlaceholder || "Any questions or special requests..."}
                    className="w-full text-xs rounded-sm p-2 resize-none outline-none"
                    style={{ background: "rgba(200, 164, 93, 0.06)", color: "#F5EFE4", border: "1px solid rgba(200, 164, 93, 0.15)" }}
                    rows={2}
                    maxLength={300}
                  />
                </div>
              </div>
            )}
            <button
              onClick={handleConfirm}
              disabled={isSubmitting || !isAnyPackageSelected || !hasAllRequiredItems}
              className="w-full flex items-center justify-center gap-3 min-h-12 py-3 text-sm tracking-[0.1em] uppercase font-medium transition-all duration-300 rounded-sm touch-manipulation"
              style={{
                background: (isAnyPackageSelected && hasAllRequiredItems) ? "#C0172A" : "rgba(192, 23, 42, 0.3)",
                color: "#F5EFE4",
                cursor: (isAnyPackageSelected && hasAllRequiredItems) ? "pointer" : "not-allowed",
              }}
            >
              {isSubmitting ? t.menuSelection.confirming : t.menuSelection.continueBtn}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <Footer dark compact />

        {/* Mobile Bottom Sheet for Dish Preview */}
        <MobileBottomSheet
          open={showMobilePreview}
          itemName={previewItem || ""}
          categoryName={previewCategory || ""}
          quantity={previewItemState?.quantity || totalGuests}
          isSelected={!!previewItemState?.selected}
          onClose={() => setShowMobilePreview(false)}
          onToggle={handlePreviewToggle}
          onRemove={handlePreviewRemove}
          totalGuests={totalGuests}
          t={t}
        />
      </div>
    );
  }

  // ── DESKTOP LAYOUT ──
  return (
    <div className="min-h-screen relative" style={{ background: "#0F0F0D" }}>
      <div className="container px-6 md:px-12 mx-auto py-6 md:py-8 relative z-10">
        {/* Header bar */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 text-sm transition-colors"
            style={{ color: "#B8B2A8" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#C8A45D")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#B8B2A8")}
          >
            <ArrowLeft className="w-4 h-4" />
            {t.menuSelection.backToHome}
          </button>
          <div className="flex items-center gap-1 text-xs uppercase tracking-wider">
            <button onClick={() => setLanguage("en")} className="px-2 py-1 transition-colors font-medium" style={{ color: language === "en" ? "#C0172A" : "#B8B2A8" }}>EN</button>
            <span style={{ color: "#B8B2A8" }}>|</span>
            <button onClick={() => setLanguage("ru")} className="px-2 py-1 transition-colors font-medium" style={{ color: language === "ru" ? "#C0172A" : "#B8B2A8" }}>RU</button>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-4">
            {[
              { step: 1, label: t.menuSelection.stepLabel1 },
              { step: 2, label: t.menuSelection.stepLabel2 },
              { step: 3, label: t.menuSelection.stepLabel3 },
            ].map((s, i) => {
              const isActive = s.step === 2;
              const isPast = s.step < 2;
              return (
                <div key={s.step} className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{
                        background: isActive ? "#C8A45D" : isPast ? "#C8A45D" : "rgba(200, 164, 93, 0.15)",
                        color: isActive ? "#0F0F0D" : isPast ? "#0F0F0D" : "#B8B2A8",
                        border: isActive ? "1px solid #C8A45D" : "1px solid rgba(200, 164, 93, 0.25)",
                      }}
                    >
                      {isPast ? <Check className="w-4 h-4" /> : s.step}
                    </div>
                    <span className="text-sm font-medium" style={{ color: isActive ? "#C8A45D" : isPast ? "#C8A45D" : "#B8B2A8" }}>
                      {s.label}
                    </span>
                  </div>
                  {i < 2 && (
                    <div className="w-12 h-[1px]" style={{ background: "rgba(200, 164, 93, 0.2)" }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 3-column layout: Event | Packages | Summary+Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: Event Summary */}
          <div className="lg:col-span-3">
            <div className="sticky top-6">
              <EventSummary
                inquiry={inquiry}
                baseGuests={baseGuests}
                totalGuests={totalGuests}
                additionalGuests={additionalGuests}
                onAdditionalGuestsChange={setAdditionalGuests}
                basePricePerPerson={basePricePerPerson}
                addonsPricePerPerson={addonsPricePerPerson}
                pricePerPerson={pricePerPerson}
                estimatedTotal={estimatedTotal}
                selectedAddonIds={selectedAddonIds}
                t={t}
                isMobile={false}
              />
            </div>
          </div>

          {/* CENTER: Packages + Customize */}
          <div className="lg:col-span-5">
            {/* Heading */}
            <div className="mb-6">
              <h1 className="font-serif text-3xl font-bold mb-2" style={{ color: "#F5EFE4" }}>
                {t.menuSelection.heading}
              </h1>
              <p className="text-sm font-light" style={{ color: "#B8B2A8" }}>
                {t.menuSelection.subheading}
              </p>
            </div>

            {/* Package cards */}
            <div className="grid grid-cols-1 gap-4 mb-4">
              {packages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  isSelected={!!menuState[pkg.id]?.selected}
                  pricePerPerson={pricePerPerson}
                  personLabel={t.menuSelection.person}
                  onToggle={() => togglePackage(pkg.id)}
                  isMobile={false}
                  t={t}
                />
              ))}
            </div>

            {/* Customize section with tabs */}
            <AnimatePresence>
              {isAnyPackageSelected && selectedPkg && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mb-4 rounded-sm" style={{ background: "#171714", border: "1px solid rgba(200, 164, 93, 0.18)" }}>
                    {/* Header */}
                    <div className="px-5 pt-4 pb-2">
                      <h2 className="font-serif text-lg font-bold" style={{ color: "#C8A45D" }}>
                        {t.menuSelection.customizeSelected || "Customize"} {selectedPkg.name}
                      </h2>
                      <p className="text-sm mt-1" style={{ color: "#B8B2A8" }}>
                        {t.menuSelection.subheading || "Select your preferred items and quantities."}
                      </p>
                    </div>

                    {/* Tab bar */}
                    <div className="flex flex-wrap items-center gap-0 px-5" style={{ borderBottom: "1px solid rgba(200, 164, 93, 0.12)" }}>
                      {selectedPkg.categories.map((cat) => (
                        <button
                          key={cat.name}
                          onClick={() => setActiveCategory(cat.name)}
                          className="px-4 py-3 text-xs font-medium uppercase tracking-wider transition-colors"
                          style={{
                            color: activeCategory === cat.name ? "#C8A45D" : "#B8B2A8",
                            borderBottom: activeCategory === cat.name ? "2px solid #C8A45D" : "2px solid transparent",
                            marginBottom: "-1px",
                          }}
                          type="button"
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>

                    {/* Active tab content */}
                    <div className="px-4 pb-4">
                      {selectedPkg.categories.map((cat) => (
                        <div key={cat.name} style={{ display: activeCategory === cat.name ? "block" : "none" }}>
                          <DishCategory
                            cat={cat}
                            catState={menuState[selectedPkg.id]?.categories?.[cat.name] || {}}
                            totalGuests={totalGuests}
                            isActive={activeCategory === cat.name}
                            onToggleItem={(item) => toggleItem(selectedPkg.id, cat.name, item)}
                            onPreviewItem={(item) => handlePreview(item, cat.name)}
                            onSelectTab={() => setActiveCategory(cat.name)}
                            onResetCategory={() => resetCategory(selectedPkg.id, cat.name)}
                            t={t}
                          />
                        </div>
                      ))}
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Validation warning */}
            {isAnyPackageSelected && !hasAllRequiredItems && (
              <div className="flex items-center gap-2 p-3 mb-4 text-[11px] rounded-sm" style={{ background: "rgba(192, 23, 42, 0.1)", border: "1px solid rgba(192, 23, 42, 0.25)", color: "#C0172A" }}>
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{t.menuSelection.selectItemsWarning}</span>
              </div>
            )}

            {/* Continue button + Note field */}
            {hasAllRequiredItems && (
              <div className="rounded-sm p-3 mb-4" style={{ background: "#171714", border: "1px solid rgba(200, 164, 93, 0.12)" }}>
                <label className="text-[10px] uppercase tracking-wider block mb-2" style={{ color: "#B8B2A8" }}>
                  {t.menuSelection.noteLabel || "Optional Note"}
                </label>
                <textarea
                  value={clientNote}
                  onChange={(e) => setClientNote(e.target.value)}
                  placeholder={t.menuSelection.notePlaceholder || "Any questions or special requests..."}
                  className="w-full text-sm rounded-sm p-2 resize-none outline-none"
                  style={{ background: "rgba(200, 164, 93, 0.06)", color: "#F5EFE4", border: "1px solid rgba(200, 164, 93, 0.15)" }}
                  rows={3}
                  maxLength={500}
                />
              </div>
            )}
            <div className="flex justify-end">
              <button
                onClick={handleConfirm}
                disabled={isSubmitting || !isAnyPackageSelected || !hasAllRequiredItems}
                className="flex items-center gap-3 px-8 py-3 text-sm tracking-[0.1em] uppercase font-medium transition-all duration-300 hover:opacity-90"
                style={{
                  background: (isAnyPackageSelected && hasAllRequiredItems) ? "#C0172A" : "rgba(192, 23, 42, 0.3)",
                  color: "#F5EFE4",
                  cursor: (isAnyPackageSelected && hasAllRequiredItems) ? "pointer" : "not-allowed",
                }}
              >
                {isSubmitting ? t.menuSelection.confirming : t.menuSelection.continueBtn}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* RIGHT: Order Summary + Dish Preview */}
          <div className="lg:col-span-4">
            <div className="sticky top-6 space-y-5">
              <OrderSummary
                selectedPkg={selectedPkg || null}
                basePricePerPerson={basePricePerPerson}
                addonsPricePerPerson={addonsPricePerPerson}
                pricePerPerson={pricePerPerson}
                totalGuests={totalGuests}
                estimatedTotal={estimatedTotal}
                selectedItemsByCategory={selectedItems}
                selectedAddonIds={selectedAddonIds}
                t={t}
                isMobile={false}
                autoExpand={hasAllRequiredItems}
              />
              <DishPreview
                itemName={previewItem}
                categoryName={previewCategory}
                quantity={previewItemState?.quantity || totalGuests}
                isSelected={!!previewItemState?.selected}
                onClose={() => {
                  setPreviewItem(null);
                  setPreviewCategory(null);
                }}
                onToggle={handlePreviewToggle}
                onRemove={handlePreviewRemove}
                totalGuests={totalGuests}
                t={t}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer dark compact />
    </div>
  );
}
