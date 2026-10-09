"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Users, Leaf, ArrowRight } from "lucide-react";
import type { Recipe } from "@/data/recipes";
import { totalMinutes } from "@/data/recipes";

const CATEGORY_STYLES: Record<string, string> = {
  Breakfast: "bg-turmeric text-walnut",
  Lunch: "bg-olive text-cream-light",
  Dinner: "bg-walnut text-turmeric",
  Snacks: "bg-mustard text-walnut",
  Desserts: "bg-wood text-cream-light",
};

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const [imgSrc, setImgSrc] = useState(recipe.image);
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <article className="card-kitchen group flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-kitchen-lg focus-within:shadow-kitchen-lg">
      <div className="relative h-52 overflow-hidden bg-cream-dark">
        {!imgFailed ? (
          <Image
            src={imgSrc}
            alt={recipe.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => {
              if (imgSrc !== "/fallback-food.svg") {
                setImgSrc("/fallback-food.svg");
              } else {
                setImgFailed(true);
              }
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-walnut texture-spice">
            <span className="px-6 text-center font-heading text-lg font-bold text-turmeric">
              {recipe.title}
            </span>
          </div>
        )}
        <div className="absolute left-3 top-3 flex gap-2">
          <span
            className={`chip ${CATEGORY_STYLES[recipe.category] ?? "bg-charcoal text-cream-light"}`}
          >
            {recipe.category}
          </span>
          {recipe.vegetarian && (
            <span className="chip bg-cream-light/95 text-olive">
              <Leaf className="h-3 w-3" aria-hidden /> Veg
            </span>
          )}
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="chip bg-charcoal/85 text-cream-light backdrop-blur">
            <Clock className="h-3 w-3" aria-hidden /> {totalMinutes(recipe)} min
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-lg font-bold leading-snug text-walnut">
          <Link
            href={`/recipes/${recipe.slug}`}
            className="transition-colors hover:text-wood focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mustard focus-visible:ring-offset-2 rounded"
          >
            {recipe.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-charcoal/70">
          {recipe.description}
        </p>
        <div className="mt-3 flex items-center gap-4 text-xs font-semibold text-charcoal/60">
          <span className="inline-flex items-center gap-1">
            <Users className="h-3.5 w-3.5" aria-hidden /> Serves {recipe.servings}
          </span>
          <span>{recipe.difficulty}</span>
          <span>{recipe.spiceLevel}</span>
        </div>
        <div className="mt-4 flex-1" />
        <Link
          href={`/recipes/${recipe.slug}`}
          className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-wood transition-colors hover:text-walnut focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mustard rounded"
          aria-label={`View recipe for ${recipe.title}`}
        >
          View recipe
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      </div>
    </article>
  );
}
