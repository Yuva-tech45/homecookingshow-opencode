import Link from "next/link";
import { ChefHat, Heart, CalendarDays, Users } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-walnut text-cream-light">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-turmeric text-walnut">
                <ChefHat className="h-5 w-5" aria-hidden />
              </span>
              <span className="font-heading text-lg font-extrabold">
                Home<span className="text-turmeric">Cooking</span>Show
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-cream-light/70">
              A warm corner of the internet for people who learn to cook by
              watching, tasting and sharing. Discover homestyle Indian recipes,
              plan your week and swap kitchen stories.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/kitchen-companion" className="btn-outline-light !px-5 !py-2.5 text-xs">
                <CalendarDays className="h-4 w-4" aria-hidden /> Plan your week
              </Link>
              <Link href="/community" className="btn-primary !px-5 !py-2.5 text-xs">
                <Users className="h-4 w-4" aria-hidden /> Join community
              </Link>
            </div>
          </div>
          <nav aria-label="Explore">
            <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-turmeric">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link className="text-cream-light/75 hover:text-turmeric" href="/">Discover recipes</Link></li>
              <li><Link className="text-cream-light/75 hover:text-turmeric" href="/kitchen-companion">Kitchen Companion</Link></li>
              <li><Link className="text-cream-light/75 hover:text-turmeric" href="/community">Community wall</Link></li>
              <li><Link className="text-cream-light/75 hover:text-turmeric" href="/recipes/paneer-butter-masala">Paneer Butter Masala</Link></li>
            </ul>
          </nav>
          <nav aria-label="About">
            <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-turmeric">
              Good to know
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link className="text-cream-light/75 hover:text-turmeric" href="/community">Request a recipe</Link></li>
              <li><Link className="text-cream-light/75 hover:text-turmeric" href="/community">Share a memory</Link></li>
              <li><Link className="text-cream-light/75 hover:text-turmeric" href="/kitchen-companion">Shopping lists</Link></li>
            </ul>
            <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-cream-light/60">
              <Heart className="h-3.5 w-3.5 text-turmeric" aria-hidden />
              Made with ghee & patience
            </p>
          </nav>
        </div>
        <div className="mt-10 rounded-2xl border border-turmeric/25 bg-walnut-light/60 p-5 text-xs leading-relaxed text-cream-light/75">
          <p className="font-bold text-turmeric">Independent fan project — please read</p>
          <p className="mt-1.5">
            This website is an independent, unofficial fan project. It is not
            affiliated with, endorsed by, or operated by HomeCookingShow or Hema
            Subramanian. Sample recipes here are original illustrations inspired by
            homestyle Indian cooking, not official HomeCookingShow recipes. No
            official logos, video embeds or endorsements are claimed.
          </p>
        </div>
        <div className="mt-6 flex flex-col items-start justify-between gap-3 border-t border-cream-light/10 pt-6 text-xs text-cream-light/50 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} HomeCookingShow fan project. Cook kindly.</p>
          <p>Photography via Unsplash · Built with Next.js & Supabase</p>
        </div>
      </div>
    </footer>
  );
}
