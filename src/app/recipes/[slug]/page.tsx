"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ChevronRight,
  Clock,
  Users,
  Minus,
  Plus,
  Leaf,
  Flame,
  Lightbulb,
  ChefHat,
  Printer,
} from "lucide-react";
import {
  getRecipeBySlug,
  RECIPES,
  scaleQuantity,
  formatQuantity,
  totalMinutes,
} from "@/data/recipes";
import RecipeCard from "@/components/RecipeCard";

export default function RecipeDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const recipe = getRecipeBySlug(slug ?? "");

  const [servings, setServings] = useState<number | null>(null);
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [imgFailed, setImgFailed] = useState(false);

  const related = useMemo(() => {
    if (!recipe) return [];
    return RECIPES.filter(
      (r) => r.slug !== recipe.slug && r.category === recipe.category
    )
      .concat(RECIPES.filter((r) => r.slug !== recipe.slug && r.category !== recipe.category))
      .slice(0, 3);
  }, [recipe]);

  if (!recipe) {
    return (
      <div className="bg-cream py-16">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <div className="card-kitchen p-10">
            <ChefHat className="mx-auto h-12 w-12 text-wood/40" aria-hidden />
            <h1 className="mt-4 font-heading text-3xl font-extrabold text-walnut">
              Recipe not found
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/65">
              We couldn&apos;t find “{slug}”. It may have been renamed — here are
              some comforting alternatives.
            </p>
            <Link href="/" className="btn-dark mt-6">
              Back to all recipes
            </Link>
          </div>
          <div className="mt-8 grid gap-6 text-left sm:grid-cols-2">
            {RECIPES.slice(0, 2).map((r) => (
              <RecipeCard key={r.slug} recipe={r} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const targetServings = servings ?? recipe.servings;
  const progress =
    recipe.ingredients.length === 0
      ? 0
      : Math.round((checked.size / recipe.ingredients.length) * 100);

  const toggleIngredient = (idx: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <div className="bg-cream-light">
      {/* Breadcrumb band */}
      <div className="border-b border-walnut/10 bg-cream">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto flex max-w-7xl items-center gap-1.5 px-4 py-3 text-xs font-semibold text-wood sm:px-6 lg:px-8"
        >
          <Link href="/" className="hover:text-walnut hover:underline">Discover</Link>
          <ChevronRight className="h-3.5 w-3.5 text-charcoal/30" aria-hidden />
          <span>{recipe.category}</span>
          <ChevronRight className="h-3.5 w-3.5 text-charcoal/30" aria-hidden />
          <span aria-current="page" className="truncate text-walnut">{recipe.title}</span>
        </nav>
      </div>

      <article className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <div className="relative overflow-hidden rounded-3xl border-4 border-walnut/10 shadow-kitchen-lg">
              {!imgFailed ? (
                <Image
                  src={recipe.image}
                  alt={recipe.imageAlt}
                  width={1000}
                  height={750}
                  priority
                  className="aspect-[4/3] w-full object-cover"
                  onError={() => setImgFailed(true)}
                />
              ) : (
                <div className="flex aspect-[4/3] w-full items-center justify-center bg-walnut texture-spice">
                  <span className="px-8 text-center font-heading text-2xl font-bold text-turmeric">
                    {recipe.title}
                  </span>
                </div>
              )}
              <span className="absolute left-4 top-4 rounded-full bg-turmeric px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-widest text-walnut">
                {recipe.category}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { icon: Clock, label: "Prep", value: `${recipe.prepMinutes} min` },
                { icon: Flame, label: "Cook", value: `${recipe.cookMinutes} min` },
                { icon: Users, label: "Serves", value: `${targetServings}` },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="card-kitchen flex items-center gap-3 p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-walnut text-turmeric">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-charcoal/50">{label}</span>
                    <span className="block font-heading text-base font-extrabold text-walnut">{value}</span>
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs font-semibold text-charcoal/55">
              Total time {totalMinutes(recipe)} minutes · {recipe.difficulty} · {recipe.spiceLevel} spice
            </p>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              {recipe.vegetarian && (
                <span className="chip bg-olive text-cream-light">
                  <Leaf className="h-3 w-3" aria-hidden /> Vegetarian
                </span>
              )}
              {recipe.veganOption && <span className="chip bg-cream-dark/60 text-wood">Vegan option</span>}
              {recipe.glutenFree && <span className="chip bg-cream-dark/60 text-wood">Gluten-free</span>}
            </div>
            <h1 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-walnut sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              {recipe.title}
            </h1>
            <p className="mt-4 leading-relaxed text-charcoal/75">{recipe.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {recipe.tags.map((t) => (
                <span key={t} className="rounded-full bg-walnut/5 px-3 py-1 text-xs font-semibold text-wood">
                  #{t}
                </span>
              ))}
            </div>

            {/* Serving adjuster */}
            <div className="card-kitchen mt-6 p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="font-heading text-base font-extrabold text-walnut">Adjust servings</h2>
                  <p className="text-xs text-charcoal/60">Quantities scale automatically.</p>
                </div>
                <div className="flex items-center gap-3" role="group" aria-label="Adjust servings">
                  <button
                    type="button"
                    onClick={() => setServings(Math.max(1, targetServings - 1))}
                    disabled={targetServings <= 1}
                    aria-label="Decrease servings"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-walnut text-turmeric transition hover:bg-charcoal disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mustard"
                  >
                    <Minus className="h-4 w-4" aria-hidden />
                  </button>
                  <span className="min-w-[3rem] text-center font-heading text-2xl font-extrabold text-walnut" aria-live="polite">
                    {targetServings}
                  </span>
                  <button
                    type="button"
                    onClick={() => setServings(Math.min(12, targetServings + 1))}
                    disabled={targetServings >= 12}
                    aria-label="Increase servings"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-walnut text-turmeric transition hover:bg-charcoal disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mustard"
                  >
                    <Plus className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              </div>
              {(servings !== null && servings !== recipe.servings) && (
                <button
                  type="button"
                  onClick={() => setServings(null)}
                  className="mt-3 text-xs font-bold text-wood underline underline-offset-2 hover:text-walnut"
                >
                  Reset to original ({recipe.servings} servings)
                </button>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <button type="button" onClick={() => window.print()} className="btn-outline !px-5 !py-2.5 text-xs">
                <Printer className="h-4 w-4" aria-hidden /> Print recipe
              </button>
              <Link href="/kitchen-companion" className="btn-dark !px-5 !py-2.5 text-xs">
                Add to meal plan
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-5">
          {/* Ingredients */}
          <section className="card-kitchen p-6 lg:col-span-2 lg:self-start" aria-labelledby="ingredients-h">
            <div className="flex items-center justify-between gap-3">
              <h2 id="ingredients-h" className="font-heading text-xl font-extrabold text-walnut">
                Ingredients
              </h2>
              <span className="rounded-full bg-turmeric/30 px-3 py-1 text-xs font-bold text-walnut" aria-live="polite">
                {checked.size}/{recipe.ingredients.length} gathered
              </span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-cream-dark" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Ingredients gathered">
              <div className="h-full rounded-full bg-olive transition-all" style={{ width: `${progress}%` }} />
            </div>
            <ul className="mt-4 space-y-2">
              {recipe.ingredients.map((ing, idx) => {
                const scaled = scaleQuantity(ing.quantity, recipe.servings, targetServings);
                const id = `ing-${idx}`;
                const done = checked.has(idx);
                return (
                  <li key={id}>
                    <label
                      htmlFor={id}
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border-2 px-3.5 py-3 text-sm transition-colors focus-within:ring-2 focus-within:ring-mustard/50 ${
                        done ? "border-olive/30 bg-olive/5" : "border-cream-dark/70 bg-cream-light hover:border-mustard/60"
                      }`}
                    >
                      <input
                        id={id}
                        type="checkbox"
                        checked={done}
                        onChange={() => toggleIngredient(idx)}
                        className="mt-0.5 h-4.5 w-4.5 h-4 w-4 shrink-0 accent-[#56634A]"
                      />
                      <span className={done ? "text-charcoal/45 line-through" : "text-charcoal"}>
                        <strong className="font-bold text-walnut">
                          {formatQuantity(scaled)} {ing.unit}
                        </strong>{" "}
                        {ing.name}
                        {ing.note && <span className="text-charcoal/55"> ({ing.note})</span>}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
            {checked.size > 0 && (
              <button
                type="button"
                onClick={() => setChecked(new Set())}
                className="mt-4 text-xs font-bold text-wood underline underline-offset-2 hover:text-walnut"
              >
                Uncheck all
              </button>
            )}
          </section>

          {/* Instructions */}
          <section className="lg:col-span-3" aria-labelledby="method-h">
            <h2 id="method-h" className="font-heading text-2xl font-extrabold text-walnut">
              Method
            </h2>
            <ol className="mt-5 space-y-4">
              {recipe.instructions.map((step, i) => (
                <li key={i} className="card-kitchen flex gap-4 p-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mustard font-heading text-sm font-extrabold text-walnut" aria-hidden>
                    {i + 1}
                  </span>
                  <p className="pt-1.5 text-sm leading-relaxed text-charcoal/85 sm:text-[15px]">{step}</p>
                </li>
              ))}
            </ol>

            <div className="mt-6 rounded-3xl bg-walnut p-6 text-cream-light">
              <h3 className="flex items-center gap-2 font-heading text-lg font-extrabold text-turmeric">
                <Lightbulb className="h-5 w-5" aria-hidden /> Kitchen tips
              </h3>
              <ul className="mt-3 space-y-2.5">
                {recipe.tips.map((tip, i) => (
                  <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-cream-light/85">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-turmeric" aria-hidden />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* Related */}
        <section className="mt-14" aria-labelledby="related-h">
          <div className="flex items-end justify-between gap-4">
            <h2 id="related-h" className="font-heading text-2xl font-extrabold text-walnut">
              Keep cooking
            </h2>
            <Link href="/" className="text-sm font-bold text-wood hover:text-walnut hover:underline">
              All recipes
            </Link>
          </div>
          <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <RecipeCard key={r.slug} recipe={r} />
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
