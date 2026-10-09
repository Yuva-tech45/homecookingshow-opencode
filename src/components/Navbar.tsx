"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChefHat, Menu, X } from "lucide-react";

const LINKS = [
  { href: "/", label: "Discover" },
  { href: "/kitchen-companion", label: "Kitchen Companion" },
  { href: "/community", label: "Community" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-walnut/10 bg-walnut/95 text-cream-light shadow-kitchen backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turmeric"
          aria-label="HomeCookingShow home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-turmeric text-walnut">
            <ChefHat className="h-5 w-5" aria-hidden />
          </span>
          <span className="font-heading text-lg font-extrabold tracking-tight">
            Home<span className="text-turmeric">Cooking</span>Show
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turmeric ${
                isActive(l.href)
                  ? "bg-turmeric text-walnut"
                  : "text-cream-light/85 hover:bg-cream-light/10 hover:text-cream-light"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/recipes/masala-dosa-with-coconut-chutney"
            className="ml-2 rounded-full bg-cream-light/10 px-4 py-2 text-sm font-semibold text-turmeric transition-colors hover:bg-turmeric hover:text-walnut focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turmeric"
          >
            Today&apos;s recipe
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-cream-light hover:bg-cream-light/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turmeric md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-cream-light/10 px-4 pb-4 pt-2 md:hidden"
          aria-label="Mobile"
        >
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`block rounded-xl px-4 py-3 text-sm font-semibold ${
                isActive(l.href)
                  ? "bg-turmeric text-walnut"
                  : "text-cream-light/90 hover:bg-cream-light/10"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
