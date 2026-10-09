import Link from "next/link";
import { ChefHat } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-cream py-20">
      <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
        <div className="card-kitchen p-10">
          <ChefHat className="mx-auto h-12 w-12 text-wood/40" aria-hidden />
          <h1 className="mt-4 font-heading text-3xl font-extrabold text-walnut">
            This page wandered off
          </h1>
          <p className="mt-3 text-sm text-charcoal/65">
            Like an unlabelled spice dabba — mysterious, but not what you came for.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn-dark">Back to Discover</Link>
            <Link href="/kitchen-companion" className="btn-outline">Kitchen Companion</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
