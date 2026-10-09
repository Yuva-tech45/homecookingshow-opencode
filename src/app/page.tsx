"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  X,
  Leaf,
  Clock,
  ArrowRight,
  CalendarDays,
  Users,
  ChefHat,
  Flame,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { RECIPES, CATEGORIES, totalMinutes, type RecipeCategory } from "@/data/recipes";
import RecipeCard from "@/components/RecipeCard";

type CategoryFilter = RecipeCategory | "All";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [vegOnly, setVegOnly] = useState(false);
  const [heroImgOk, setHeroImgOk] = useState(true);
  const [inspireImgOk, setInspireImgOk] = useState(true);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return RECIPES.filter((r) => {
      if (category !== "All" && r.category !== category) return false;
      if (vegOnly && !r.vegetarian) return false;
      if (!q) return true;
      const hay = [
        r.title,
        r.description,
        r.category,
        ...r.tags,
        ...r.ingredients.map((i) => i.name),
      ]
        .join(" ")
        .toLowerCase();
      return q.split(/\s+/).every((w) => hay.includes(w));
    });
  }, [query, category, vegOnly]);

  const featured = RECIPES.slice(0, 3);

  return (
    <div>
      {/* HERO — dark editorial, mustard anchors */}
      <section className="relative overflow-hidden bg-walnut text-cream-light">
        <div className="absolute inset-0 texture-spice" aria-hidden />
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-mustard/20 blur-3xl" aria-hidden />
        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-turmeric/10 blur-3xl" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-14 pt-12 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-8 lg:pb-20 lg:pt-16">
          <div>
            <p className="section-eyebrow-light">
              <Flame className="h-3.5 w-3.5" aria-hidden />
              Homestyle Indian cooking · Fan project
            </p>
            <h1 className="mt-5 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Your next favourite meal{" "}
              <span className="text-turmeric">starts here.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-cream-light/80 sm:text-lg">
              Twelve comforting, practical recipes — from crisp dosas to slow
              dum biryani — plus a weekly planner and a community wall for your
              own kitchen stories.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="#recipes" className="btn-primary">
                <BookOpen className="h-4 w-4" aria-hidden />
                Browse recipes
              </Link>
              <Link href="/kitchen-companion" className="btn-outline-light">
                <CalendarDays className="h-4 w-4" aria-hidden />
                Plan your week
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-3 rounded-[2rem] bg-turmeric/25 blur-xl" aria-hidden />
            <div className="relative overflow-hidden rounded-[1.75rem] border-4 border-turmeric/60 shadow-kitchen-lg">
              {heroImgOk ? (
                <Image
                  src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1200&auto=format&fit=crop"
                  alt="Warm Indian curry served in a rustic kitchen"
                  width={1000}
                  height={750}
                  priority
                  className="aspect-[4/3] w-full object-cover"
                  onError={() => setHeroImgOk(false)}
                />
              ) : (
                <div className="flex aspect-[4/3] w-full items-center justify-center bg-wood texture-spice">
                  <ChefHat className="h-16 w-16 text-turmeric" aria-hidden />
                </div>
              )}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-2xl bg-walnut/85 px-4 py-3 backdrop-blur">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-turmeric">Tonight&apos;s pick</p>
                  <p className="font-heading text-sm font-bold text-cream-light">Paneer Butter Masala · 40 min</p>
                </div>
                <Link
                  href="/recipes/paneer-butter-masala"
                  className="inline-flex items-center gap-1.5 rounded-full bg-turmeric px-4 py-2 text-xs font-bold text-walnut hover:bg-mustard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream-light"
                >
                  Cook it <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </div>
            </div>
            <div className="absolute -left-4 top-6 hidden rotate-[-6deg] rounded-2xl bg-cream-light px-4 py-2.5 shadow-kitchen-lg sm:block">
              <p className="text-xs font-extrabold text-walnut">Mustard · Turmeric · Ghee</p>
              <p className="text-[11px] font-semibold text-wood">The home-kitchen trio</p>
            </div>
          </div>
        </div>
        <div className="relative border-t-4 border-turmeric bg-mustard py-2.5">
          <p className="mx-auto max-w-7xl px-4 text-center text-xs font-extrabold uppercase tracking-[0.2em] text-walnut sm:px-6">
            Tadka · Dum · Tempering · Slow mornings · Hot tawas · Fresh coriander
          </p>
        </div>
      </section>

      {/* SEARCH + FILTERS + GRID */}
      <section id="recipes" className="bg-cream py-14 lg:py-20 scroll-mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-eyebrow">
                <Sparkles className="h-3.5 w-3.5" aria-hidden /> The recipe shelf
              </p>
              <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-walnut sm:text-4xl">
                What are you craving today?
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-charcoal/70 sm:text-base">
                Search by dish, ingredient or mood — then filter by meal and diet.
              </p>
            </div>
          </div>

          <div className="card-kitchen mt-8 p-4 sm:p-5">
            <div className="flex flex-col gap-3 lg:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/40" aria-hidden />
                <label htmlFor="recipe-search" className="sr-only">Search recipes</label>
                <input
                  id="recipe-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Try “paneer”, “dosa”, “comfort”, “coconut”…"
                  className="input-kitchen !pl-11 !pr-11"
                  autoComplete="off"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-charcoal/50 hover:bg-cream-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mustard"
                  >
                    <X className="h-4 w-4" aria-hidden />
                  </button>
                )}
              </div>
              <label className="inline-flex cursor-pointer items-center gap-2.5 rounded-xl border-2 border-cream-dark bg-cream px-4 py-2.5 text-sm font-bold text-walnut transition-colors has-checked:border-olive has-checked:bg-olive/10 focus-within:ring-2 focus-within:ring-mustard/40">
                <input
                  type="checkbox"
                  checked={vegOnly}
                  onChange={(e) => setVegOnly(e.target.checked)}
                  className="h-4 w-4 accent-[#56634A]"
                />
                <Leaf className="h-4 w-4 text-olive" aria-hidden />
                Vegetarian only
              </label>
            </div>
            <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
              {(["All", ...CATEGORIES] as CategoryFilter[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  aria-pressed={category === c}
                  className={`rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-walnut focus-visible:ring-offset-2 ${
                    category === c
                      ? "bg-walnut text-turmeric shadow-kitchen"
                      : "bg-cream-dark/50 text-wood hover:bg-cream-dark"
                  }`}
                >
                  {c}
                </button>
              ))}
              {(query || category !== "All" || vegOnly) && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setCategory("All");
                    setVegOnly(false);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-red-900 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-800"
                >
                  <X className="h-3.5 w-3.5" aria-hidden /> Clear all
                </button>
              )}
            </div>
          </div>

          <p className="mt-6 text-sm font-semibold text-wood" role="status" aria-live="polite">
            {results.length === 0
              ? "No recipes match — try clearing a filter."
              : `Showing ${results.length} of ${RECIPES.length} recipes${query ? ` for “${query.trim()}”` : ""}`}
          </p>

          {results.length > 0 ? (
            <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((r) => (
                <RecipeCard key={r.slug} recipe={r} />
              ))}
            </div>
          ) : (
            <div className="card-kitchen mt-5 p-10 text-center">
              <ChefHat className="mx-auto h-10 w-10 text-wood/40" aria-hidden />
              <h3 className="mt-3 font-heading text-xl font-bold text-walnut">Nothing on this shelf yet</h3>
              <p className="mx-auto mt-2 max-w-sm text-sm text-charcoal/65">
                Try a shorter search like “rice” or “dal”, or clear the filters to see everything.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                  setVegOnly(false);
                }}
                className="btn-dark mt-5"
              >
                Show all recipes
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FEATURED INSPIRATION — dark dramatic band */}
      <section className="relative overflow-hidden bg-charcoal py-14 text-cream-light lg:py-20">
        <div className="absolute inset-0 texture-spice opacity-60" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-cream-light/15 shadow-kitchen-lg">
            {inspireImgOk ? (
              <Image
                src="https://images.unsplash.com/photo-1567337710282-00832b415979?q=80&w=1200&auto=format&fit=crop"
                alt="Indian thali with curries, rice and breads"
                width={1000}
                height={700}
                className="aspect-[4/3] w-full object-cover"
                onError={() => setInspireImgOk(false)}
              />
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center bg-walnut">
                <ChefHat className="h-14 w-14 text-turmeric" aria-hidden />
              </div>
            )}
            <span className="absolute left-4 top-4 rounded-full bg-turmeric px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-widest text-walnut">
              Cook together
            </span>
          </div>
          <div>
            <p className="section-eyebrow-light">
              <Flame className="h-3.5 w-3.5" aria-hidden /> Cooking inspiration
            </p>
            <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
              Learn the way home cooks actually teach.
            </h2>
            <p className="mt-4 leading-relaxed text-cream-light/75">
              The best lessons aren&apos;t timers and plating — they&apos;re
              watching someone&apos;s hands bloom mustard seeds, crush kasuri
              methi, or rescue a splitting gravy without panic. Our sample
              recipes bottle that spirit: generous quantities, honest timings
              and tips from real weeknight practice.
            </p>
            <ul className="mt-6 space-y-3">
              {featured.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/recipes/${r.slug}`}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-cream-light/12 bg-cream-light/5 px-4 py-3 transition-colors hover:border-turmeric/50 hover:bg-cream-light/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turmeric"
                  >
                    <span>
                      <span className="block font-heading text-sm font-bold text-cream-light">{r.title}</span>
                      <span className="mt-0.5 flex items-center gap-2 text-xs text-cream-light/60">
                        <Clock className="h-3 w-3" aria-hidden /> {totalMinutes(r)} min · {r.category}
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-turmeric transition-transform group-hover:translate-x-1" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs leading-relaxed text-cream-light/50">
              These are original illustrative recipes for this fan project — not
              official HomeCookingShow recipes. We link no creator videos, since
              no verified URLs were available.
            </p>
          </div>
        </div>
      </section>

      {/* KITCHEN COMPANION PREVIEW — cream */}
      <section className="bg-cream-light py-14 lg:py-20 texture-grain">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="section-eyebrow">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden /> Kitchen Companion
              </p>
              <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-walnut sm:text-4xl">
                Plan the week on Sunday. Relax every night.
              </h2>
              <p className="mt-4 leading-relaxed text-charcoal/70">
                Assign any recipe to Monday–Sunday breakfast, lunch or dinner.
                The Companion merges every ingredient into one smart shopping
                checklist — scaled to your servings, saved on your device, ready
                for the market.
              </p>
              <ol className="mt-6 space-y-3">
                {[
                  ["Pick a slot", "Choose a day and meal — breakfast, lunch or dinner."],
                  ["Assign a recipe", "Twelve homestyle dishes, adjustable servings."],
                  ["Shop once", "Deduplicated checklist with custom extras."],
                ].map(([t, d], i) => (
                  <li key={t} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-walnut font-heading text-sm font-extrabold text-turmeric">
                      {i + 1}
                    </span>
                    <span>
                      <span className="block font-heading text-sm font-bold text-walnut">{t}</span>
                      <span className="text-sm text-charcoal/65">{d}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/kitchen-companion" className="btn-dark">
                  Open Kitchen Companion <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
            <div className="card-kitchen p-6">
              <p className="text-xs font-extrabold uppercase tracking-widest text-wood">Example week</p>
              <div className="mt-4 space-y-3">
                {[
                  ["Mon", "Dinner", "Paneer Butter Masala", "bg-turmeric text-walnut"],
                  ["Wed", "Lunch", "Amritsari Chole", "bg-olive text-cream-light"],
                  ["Sun", "Lunch", "Chicken Dum Biryani", "bg-walnut text-turmeric"],
                ].map(([day, slot, dish, chip]) => (
                  <div key={day} className="flex items-center justify-between gap-3 rounded-2xl bg-cream px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className={`rounded-full px-3 py-1 text-[11px] font-extrabold uppercase ${chip}`}>{day}</span>
                      <div>
                        <p className="text-sm font-bold text-walnut">{dish}</p>
                        <p className="text-xs text-charcoal/55">{slot}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-olive">Planned ✓</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-2xl bg-walnut p-4 text-sm text-cream-light">
                <p className="font-bold text-turmeric">Shopping list preview</p>
                <p className="mt-1 text-cream-light/75">Paneer 400 g · Basmati 500 g · Tomatoes 1 kg — merged & scaled.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY INVITE */}
      <section className="bg-mustard py-14 lg:py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-walnut px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-turmeric">
              <Users className="h-3.5 w-3.5" aria-hidden /> Community
            </p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-walnut sm:text-4xl">
              Your kitchen stories belong here.
            </h2>
            <p className="mt-2 font-medium text-walnut/80">
              Request a recipe you miss from home, or share the memory that taught you to cook.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/community" className="btn-dark">
              Visit community <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
