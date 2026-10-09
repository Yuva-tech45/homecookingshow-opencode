import { CheckCircle2, AlertTriangle, Info, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function LoadingSpinner({ label = "Loading…" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-2" role="status" aria-live="polite">
      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
      <span className="text-sm font-semibold">{label}</span>
    </span>
  );
}

export function Feedback({
  tone,
  title,
  message,
}: {
  tone: "success" | "error" | "info";
  title: string;
  message?: string;
}) {
  const Icon = tone === "success" ? CheckCircle2 : tone === "error" ? AlertTriangle : Info;
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "flex items-start gap-3 rounded-2xl border-2 p-4 text-sm",
        tone === "success" && "border-olive/30 bg-olive/10 text-olive-dark",
        tone === "error" && "border-red-700/30 bg-red-50 text-red-900",
        tone === "info" && "border-mustard/40 bg-turmeric/15 text-walnut"
      )}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
      <div>
        <p className="font-bold">{title}</p>
        {message && <p className="mt-1 leading-relaxed opacity-90">{message}</p>}
      </div>
    </div>
  );
}
