import { useEffect, useState } from "react";
import type { Recipe } from "@/data/recipes";
import { getRecipeBySlug } from "@/data/recipes";

export type MealSlot = "breakfast" | "lunch" | "dinner";
export const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;
export type DayName = (typeof DAYS)[number];

export interface PlannedMeal {
  id: string;
  day: DayName;
  slot: MealSlot;
  recipeSlug: string;
  servings: number;
}

export interface CustomItem {
  id: string;
  name: string;
}

const MEALS_KEY = "hcs-meal-plan-v1";
const CHECKED_KEY = "hcs-shopping-checked-v1";
const CUSTOM_KEY = "hcs-shopping-custom-v1";

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function isValidMeal(m: unknown): m is PlannedMeal {
  if (typeof m !== "object" || m === null) return false;
  const o = m as Record<string, unknown>;
  return (
    typeof o.id === "string" &&
    typeof o.day === "string" &&
    (DAYS as readonly string[]).includes(o.day) &&
    (o.slot === "breakfast" || o.slot === "lunch" || o.slot === "dinner") &&
    typeof o.recipeSlug === "string" &&
    getRecipeBySlug(o.recipeSlug) !== undefined &&
    typeof o.servings === "number" &&
    o.servings >= 1 &&
    o.servings <= 12
  );
}

export function useMealPlan() {
  const [meals, setMeals] = useState<PlannedMeal[]>([]);
  const [checked, setChecked] = useState<string[]>([]);
  const [customItems, setCustomItems] = useState<CustomItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedMeals = safeParse<unknown[]>(
        typeof window !== "undefined" ? window.localStorage.getItem(MEALS_KEY) : null,
        []
      );
      const valid = Array.isArray(storedMeals)
        ? storedMeals.filter(isValidMeal)
        : [];
      setMeals(valid);

      const storedChecked = safeParse<unknown>(
        window.localStorage.getItem(CHECKED_KEY),
        []
      );
      setChecked(Array.isArray(storedChecked) ? storedChecked.filter((x): x is string => typeof x === "string") : []);

      const storedCustom = safeParse<unknown>(
        window.localStorage.getItem(CUSTOM_KEY),
        []
      );
      const validCustom = Array.isArray(storedCustom)
        ? storedCustom.filter(
            (x): x is CustomItem =>
              typeof x === "object" &&
              x !== null &&
              typeof (x as CustomItem).id === "string" &&
              typeof (x as CustomItem).name === "string"
          )
        : [];
      setCustomItems(validCustom);
    } catch {
      // storage unavailable — fall back to empty state
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(MEALS_KEY, JSON.stringify(meals));
    } catch {
      /* ignore quota / privacy-mode errors */
    }
  }, [meals, loaded]);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(CHECKED_KEY, JSON.stringify(checked));
      window.localStorage.setItem(CUSTOM_KEY, JSON.stringify(customItems));
    } catch {
      /* ignore */
    }
  }, [checked, customItems, loaded]);

  const addMeal = (day: DayName, slot: MealSlot, recipe: Recipe, servings?: number) => {
    const entry: PlannedMeal = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      day,
      slot,
      recipeSlug: recipe.slug,
      servings: servings ?? recipe.servings,
    };
    setMeals((prev) => [...prev, entry]);
    return entry;
  };

  const removeMeal = (id: string) => {
    setMeals((prev) => prev.filter((m) => m.id !== id));
  };

  const clearWeek = () => {
    setMeals([]);
    setChecked([]);
  };

  const toggleChecked = (key: string) => {
    setChecked((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const addCustomItem = (name: string) => {
    const trimmed = name.trim().slice(0, 80);
    if (!trimmed) return null;
    const item: CustomItem = {
      id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: trimmed,
    };
    setCustomItems((prev) => [...prev, item]);
    return item;
  };

  const removeCustomItem = (id: string) => {
    setCustomItems((prev) => prev.filter((c) => c.id !== id));
    setChecked((prev) => prev.filter((k) => k !== id));
  };

  return {
    meals,
    checked,
    customItems,
    loaded,
    addMeal,
    removeMeal,
    clearWeek,
    toggleChecked,
    addCustomItem,
    removeCustomItem,
  };
}

export interface ShoppingLine {
  key: string;
  name: string;
  display: string;
  unit: string;
}

export function buildShoppingList(meals: PlannedMeal[]): ShoppingLine[] {
  const map = new Map<string, { name: string; qty: number; unit: string }>();
  for (const meal of meals) {
    const recipe = getRecipeBySlug(meal.recipeSlug);
    if (!recipe) continue;
    const factor = meal.servings / recipe.servings;
    for (const ing of recipe.ingredients) {
      const normKey = `${ing.name.toLowerCase().trim()}|${ing.unit.toLowerCase().trim()}`;
      const existing = map.get(normKey);
      const scaled = ing.quantity * factor;
      if (existing) {
        existing.qty += scaled;
      } else {
        map.set(normKey, { name: ing.name, qty: scaled, unit: ing.unit });
      }
    }
  }
  return [...map.entries()].map(([key, v]) => ({
    key,
    name: v.name,
    unit: v.unit,
    display: `${formatQty(v.qty)} ${v.unit} ${v.name}`,
  }));
}

function formatQty(qty: number): string {
  const rounded = Math.round(qty * 4) / 4;
  if (Number.isInteger(rounded)) return `${rounded}`;
  const whole = Math.floor(rounded);
  const frac = rounded - whole;
  const sym = frac === 0.25 ? "¼" : frac === 0.5 ? "½" : frac === 0.75 ? "¾" : "";
  if (whole === 0) return sym || `${rounded}`;
  return sym ? `${whole}${sym}` : `${rounded}`;
}
