# HomeCookingShow (Independent Fan Project)

A warm, responsive Indian home-cooking web app built with **Next.js App Router, TypeScript, Tailwind CSS, Lucide icons and Supabase**.

> **Disclosure:** This is an independent, unofficial fan project. It is not affiliated with, endorsed by, or operated by HomeCookingShow or Hema Subramanian. Sample recipes are original illustrations, not official recipes.

## Routes

| Route | What it does |
|---|---|
| `/` Discover | Hero, live search (name/description/category/ingredients), category + vegetarian filters, 12 recipe cards, inspiration band, planner preview, community invite |
| `/recipes/[slug]` | Photo, prep/cook/servings, serving scaler, checkable ingredients, numbered method, tips, related recipes, graceful not-found |
| `/kitchen-companion` | Mon–Sun × breakfast/lunch/dinner planner, add/remove meals, merged + deduplicated serving-aware shopping checklist, custom items, localStorage persistence |
| `/community` | Story wall + two real Supabase-backed forms (recipe request, cooking memory) with validation, loading and honest success/error states |

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run type-check # tsc --noEmit
npm run lint
npm run build
```

## Supabase setup (required for Community forms)

1. Create a free project at https://supabase.com → copy **Project URL** and **anon public key**.
2. In Supabase SQL editor, run `supabase/schema.sql` (creates `community_submissions` + RLS policies allowing anonymous inserts, no public reads).
3. Copy env file and fill it in:
   ```bash
   cp .env.example .env.local
   # NEXT_PUBLIC_SUPABASE_URL=https://xyzcompany.supabase.co
   # NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
   ```
4. Restart `npm run dev`. Submit a form at `/community` — success means a row appeared in **Table Editor → community_submissions**.

Without keys, `POST /api/community-submissions` returns **503** with code `SUPABASE_NOT_CONFIGURED` and the UI shows that message — it never fakes success.

### Security notes

- Browser code only ever sees `NEXT_PUBLIC_*` (anon) key, guarded by RLS + CHECK constraints.
- No service-role key is referenced in client code. The server route prefers anon and only uses `SUPABASE_SERVICE_ROLE_KEY` if you explicitly set it server-side.
- Validation happens twice: client (fast feedback) and server (authoritative, 80/120/2000 char limits).

## Images

Food photography loads from Unsplash (`images.unsplash.com`) with `next/image` remote patterns. Every image has `onError` fallback to `public/fallback-food.svg` plus a styled text fallback, so the UI never breaks if a photo is unavailable.

## Project structure

```
src/
  app/
    page.tsx                    Discover
    recipes/[slug]/page.tsx      Recipe detail (client interactive)
    kitchen-companion/page.tsx   Planner + shopping list
    community/page.tsx           Supabase forms
    api/community-submissions/route.ts
    layout.tsx / globals.css / not-found.tsx
  components/  Navbar, Footer, RecipeCard, Modal, Feedback, Button
  data/        recipes.ts (12 recipes, scaling helpers)
  lib/         supabase.ts, meal-plan.ts (localStorage), utils.ts
supabase/schema.sql
.env.example
```

## Verification status

- `tsc --noEmit`, `next lint`, `next build` — run before delivery (see final report).
- Community persistence requires live Supabase credentials; until then the integration is complete but untested end-to-end against a real project.
