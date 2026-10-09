import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "dark" | "outline" | "outlineLight" | "ghost";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const styles: Record<Variant, string> = {
  primary: "btn-primary",
  dark: "btn-dark",
  outline: "btn-outline",
  outlineLight: "btn-outline-light",
  ghost:
    "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-wood hover:bg-wood/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mustard",
};

export default function Button({ variant = "primary", className, ...rest }: Props) {
  return <button className={cn(styles[variant], className)} {...rest} />;
}
