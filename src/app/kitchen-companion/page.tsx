"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Plus,
  Trash2,
  ShoppingBasket,
  Check,
  X,
  ChefHat,
  ArrowRight,
  Minus,
} from "lucide-react";
import { RECIPES, getRecipeBySlug } from "@/data/recipes";
import {
  useMealPlan,
  DAYS,
  buildShoppingList,
  type DayName,
  type MealSlot,
} from "@/lib/meal-plan";
import Modal from "@/components/Modal";
import { Feedback } from "@/components/Feedback";

const SLOTS: { id: MealSlot; label: string }[] = [
  { id: "breakfast", label: "Breakfast" },
  { id: "lunch", label: "Lunch" },
  { id: "dinner", label: "Dinner" },
];

export default function KitchenCompanionPage() {
  const {
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
  } = useMealPlan();

  const [modal, setModal] = useState<{ day: DayName; slot: MealSlot } | null>(null);
  const [pickSlug, setPickSlug] = useState(RECIPES[0].slug);
  const [pickServings, setPickServings] = useState(RECIPES[0].servings);
  const [customName, setCustomName] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);

  const shopping = useMemo(() => buildShoppingList(meals), [meals]);
  const plannedCount = meals.length;
  const checkedCount =
    checked.filter(
      (k) => shopping.some((s) => s.key === k) || customItems.some((c) => c.id === k)
    ).length +
    0;
  const totalLines = shopping.length + customItems.length;

  const openModal = (day: DayName, slot: MealSlot) => {
    setPickSlug(RECIPES[0].slug);
    setPickServings(RECIPES[0].servings);
    setModal({ day, slot });
  };

  const confirmAdd = () => {
    if (!modal) return;
    const recipe = getRecipeBySlug(pickSlug);
    if (!recipe) return;
    addMeal(modal.day, modal.slot, recipe, pickServings);
    setNotice(`${recipe.title} added to ${modal.day} ${modal.slot}.`);
    setModal(null);
    window.setTimeout(() => setNotice(null), 4000);
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const item = addCustomItem(customName);
    if (item) {
      setCustomName("");
      setNotice(`“${item.name}” added to your shopping list.`);
      window.setTimeout(() => setNotice(null), 3000);
    }
  };

  return (
    <div className="bg-cream">
      {!loaded && (
        <p className="mx-auto max-w-7xl px-4 pt-6 text-xs font-semibold text-wood sm:px-6 lg:px-8" role="status">
          Restoring your saved meal plan…
        </p>
      )}
      {/* Header band */}
      <section className="bg-walnut py-12 text-cream-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="section-eyebrow-light">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden /> Kitchen Companion
          </p>
          <div className="mt-3 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
                Your week, deliciously organised.
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-cream-light/75 sm:text-base">
                Assign recipes to each day, then shop once from a merged,
                serving-aware checklist. Everything saves on this device automatically.
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-cream-light/10 px-5 py-3 text-sm">
              <span className="font-heading text-2xl font-extrabold text-turmeric">{plannedCount}</span>
              <span className="font-semibold text-cream-light/75">meals<br />planned</span>
              <span className="mx-1 h-8 w-px bg-cream-light/20" aria-hidden />
              <span className="font-heading text-2xl font-extrabold text-turmeric">{totalLines}</span>
              <span className="font-semibold text-cream-light/75">items<br />to shop</span>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {notice && (
          <div className="mb-6" role="status">
            <Feedback tone="success" title={notice} />
          </div>
        )}

        {/* Meal board */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-heading text-2xl font-extrabold text-walnut">Monday → Sunday board</h2>
          {meals.length > 0 && (
            <div className="flex gap-2">
              {!confirmClear ? (
                <button
                  type="button"
                  onClick={() => setConfirmClear(true)}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-red-900/20 px-4 py-2 text-xs font-bold text-red-900 hover:border-red-900 hover:bg-red-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-900"
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden /> Clear week
                </button>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full bg-red-900/5 px-2 py-1 text-xs font-bold text-red-900">
                  Sure?
                  <button
                    type="button"
                    onClick={() => {
                      clearWeek();
                      setConfirmClear(false);
                      setNotice("Week cleared. Fresh slate!");
                      window.setTimeout(() => setNotice(null), 3000);
                    }}
                    className="rounded-full bg-red-900 px-3 py-1.5 text-white hover:bg-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-900"
                  >
                    Yes, clear
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmClear(false)}
                    className="rounded-full border border-red-900/30 px-3 py-1.5 hover:bg-red-900/10"
                  >
                    Keep
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {meals.length === 0 ? (
          <div className="card-kitchen mt-5 p-10 text-center">
            <ChefHat className="mx-auto h-11 w-11 text-wood/35" aria-hidden />
            <h3 className="mt-3 font-heading text-xl font-bold text-walnut">A quiet week — full of possibility</h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-charcoal/65">
              No meals planned yet. Tap <strong>+ Add</strong> on any day below to
              assign your first recipe. Your plan and shopping list persist even
              after refresh.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button type="button" onClick={() => openModal("Monday", "dinner")} className="btn-dark">
                <Plus className="h-4 w-4" aria-hidden /> Plan Monday dinner
              </button>
              <Link href="/" className="btn-outline">
                Browse recipes <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        ) : null}

        <div className="mt-5 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {DAYS.map((day) => (
            <section key={day} className="card-kitchen p-5" aria-label={`${day} meals`}>
              <h3 className="flex items-center justify-between font-heading text-base font-extrabold text-walnut">
                {day}
                <span className="rounded-full bg-cream-dark/50 px-2.5 py-1 text-[11px] font-bold text-wood">
                  {meals.filter((m) => m.day === day).length} planned
                </span>
              </h3>
              <div className="mt-3 space-y-3">
                {SLOTS.map((slot) => {
                  const slotMeals = meals.filter((m) => m.day === day && m.slot === slot.id);
                  return (
                    <div key={slot.id} className="rounded-2xl bg-cream/70 p-3">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-[11px] font-extrabold uppercase tracking-widest text-wood">
                          {slot.label}
                        </p>
                        <button
                          type="button"
                          onClick={() => openModal(day, slot.id)}
                          aria-label={`Add ${slot.label} for ${day}`}
                          className="inline-flex items-center gap-1 rounded-full bg-walnut px-3 py-1.5 text-[11px] font-bold text-turmeric transition hover:bg-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mustard"
                        >
                          <Plus className="h-3 w-3" aria-hidden /> Add
                        </button>
                      </div>
                      {slotMeals.length === 0 ? (
                        <p className="mt-1.5 text-xs text-charcoal/45">Nothing yet — keep it flexible.</p>
                      ) : (
                        <ul className="mt-2 space-y-2">
                          {slotMeals.map((m) => {
                            const r = getRecipeBySlug(m.recipeSlug);
                            if (!r) return null;
                            return (
                              <li
                                key={m.id}
                                className="flex items-center justify-between gap-2 rounded-xl bg-warmwhite px-3 py-2 shadow-sm"
                              >
                                <div className="min-w-0">
                                  <Link
                                    href={`/recipes/${r.slug}`}
                                    className="block truncate text-sm font-bold text-walnut hover:underline"
                                  >
                                    {r.title}
                                  </Link>
                                  <p className="text-[11px] font-semibold text-charcoal/55">
                                    Serves {m.servings}
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeMeal(m.id)}
                                  aria-label={`Remove ${r.title} from ${day} ${slot.label}`}
                                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-red-900/70 hover:bg-red-900/10 hover:text-red-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-900"
                                >
                                  <Trash2 className="h-4 w-4" aria-hidden />
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Shopping list */}
        <section className="mt-10 grid gap-6 lg:grid-cols-5" aria-labelledby="shop-h">
          <div className="card-kitchen p-6 lg:col-span-3">
            <h2 id="shop-h" className="flex items-center gap-2 font-heading text-xl font-extrabold text-walnut">
              <ShoppingBasket className="h-5 w-5" aria-hidden /> Shopping checklist
            </h2>
            <p className="mt-1 text-xs text-charcoal/60">
              Merged across {plannedCount} planned meal{plannedCount === 1 ? "" : "s"} · quantities scaled to your servings ·{" "}
              {checkedCount}/{totalLines} ticked
            </p>
            {totalLines === 0 ? (
              <p className="mt-4 rounded-2xl bg-cream px-4 py-5 text-center text-sm text-charcoal/60">
                Your basket is empty. Plan a meal above and ingredients will gather here automatically.
              </p>
            ) : (
              <ul className="mt-4 space-y-2">
                {shopping.map((line) => {
                  const done = checked.includes(line.key);
                  return (
                    <li key={line.key}>
                      <label
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 px-3.5 py-2.5 text-sm transition-colors focus-within:ring-2 focus-within:ring-mustard/50 ${
                          done ? "border-olive/30 bg-olive/5 text-charcoal/45" : "border-cream-dark/70 hover:border-mustard/60"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={done}
                          onChange={() => toggleChecked(line.key)}
                          className="h-4 w-4 shrink-0 accent-[#40583A]"
                          aria-label={line.display}
                        />
                        <span className={done ? "line-through" : ""}>{line.display}</span>
                        {done && <Check className="ml-auto h-4 w-4 text-olive" aria-hidden />}
                      </label>
                    </li>
                  );
                })}
                {customItems.map((c) => {
                  const done = checked.includes(c.id);
                  return (
                    <li key={c.id}>
                      <div
                        className={`flex items-center gap-3 rounded-xl border-2 border-dashed px-3.5 py-2.5 text-sm ${
                          done ? "border-olive/30 bg-olive/5 text-charcoal/45" : "border-mustard/60 bg-turmeric/10"
                        }`}
                      >
                        <label className="flex flex-1 cursor-pointer items-center gap-3">
                          <input
                            type="checkbox"
                            checked={done}
                            onChange={() => toggleChecked(c.id)}
                            className="h-4 w-4 shrink-0 accent-[#40583A]"
                            aria-label={`Custom item ${c.name}`}
                          />
                          <span className={done ? "line-through" : ""}>
                            {c.name} <span className="text-[11px] font-bold uppercase text-wood/60">· yours</span>
                          </span>
                        </label>
                        <button
                          type="button"
                          onClick={() => removeCustomItem(c.id)}
                          aria-label={`Remove custom item ${c.name}`}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-full text-red-900/60 hover:bg-red-900/10 hover:text-red-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-900"
                        >
                          <X className="h-3.5 w-3.5" aria-hidden />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <div className="lg:col-span-2">
            <div className="card-kitchen p-6">
              <h3 className="font-heading text-base font-extrabold text-walnut">Add your own item</h3>
              <p className="mt-1 text-xs text-charcoal/60">Milk, coriander, steel-wool — anything the recipes missed.</p>
              <form onSubmit={handleAddCustom} className="mt-3 flex gap-2">
                <label htmlFor="custom-item" className="sr-only">Custom shopping item</label>
                <input
                  id="custom-item"
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  maxLength={80}
                  placeholder="e.g. Fresh curry leaves"
                  className="input-kitchen"
                />
                <button type="submit" disabled={!customName.trim()} className="btn-dark shrink-0 !px-4 disabled:opacity-40">
                  <Plus className="h-4 w-4" aria-hidden />
                  <span className="sr-only">Add item</span>
                </button>
              </form>
            </div>
            <div className="mt-4 rounded-3xl bg-olive p-6 text-cream-light">
              <h3 className="font-heading text-base font-extrabold text-turmeric">Market-day tip</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-cream-light/85">
                Shop your list in order: lentils & rice first, then vegetables,
                then dairy last so paneer and yogurt stay cool on the way home.
              </p>
              <Link href="/" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-turmeric hover:underline">
                Find another recipe <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Add-meal modal */}
      <Modal
        open={modal !== null}
        onClose={() => setModal(null)}
        title={modal ? `Add ${modal.slot} · ${modal.day}` : "Add meal"}
      >
        <label htmlFor="pick-recipe" className="label-kitchen">Choose a recipe</label>
        <select
          id="pick-recipe"
          value={pickSlug}
          onChange={(e) => {
            setPickSlug(e.target.value);
            const r = getRecipeBySlug(e.target.value);
            if (r) setPickServings(r.servings);
          }}
          className="input-kitchen"
        >
          {RECIPES.map((r) => (
            <option key={r.slug} value={r.slug}>
              {r.title} · {r.category}
            </option>
          ))}
        </select>
        <div className="mt-4 flex items-center justify-between gap-4">
          <label htmlFor="pick-servings" className="label-kitchen !mb-0">Servings</label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Fewer servings"
              onClick={() => setPickServings((s) => Math.max(1, s - 1))}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-walnut text-turmeric disabled:opacity-40"
              disabled={pickServings <= 1}
            >
              <Minus className="h-4 w-4" aria-hidden />
            </button>
            <span className="min-w-[2.5rem] text-center font-heading text-xl font-extrabold text-walnut">{pickServings}</span>
            <button
              type="button"
              aria-label="More servings"
              onClick={() => setPickServings((s) => Math.min(12, s + 1))}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-walnut text-turmeric disabled:opacity-40"
              disabled={pickServings >= 12}
            >
              <Plus className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
        <input type="hidden" id="pick-servings" value={pickServings} readOnly className="hidden" />
        <div className="mt-6 flex gap-3">
          <button type="button" onClick={() => setModal(null)} className="btn-outline flex-1">
            Cancel
          </button>
          <button type="button" onClick={confirmAdd} className="btn-dark flex-1">
            <Check className="h-4 w-4" aria-hidden /> Add meal
          </button>
        </div>
      </Modal>
    </div>
  );
}
