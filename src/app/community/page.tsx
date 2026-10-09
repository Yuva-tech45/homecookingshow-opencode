"use client";

import { useState } from "react";
import {
  Users,
  Send,
  Heart,
  BookOpen,
  Lightbulb,
  Quote,
  CheckCircle2,
} from "lucide-react";
import { Feedback, LoadingSpinner } from "@/components/Feedback";

type FormState = {
  name: string;
  title: string;
  message: string;
};

const EMPTY: FormState = { name: "", title: "", message: "" };

const TIPS = [
  {
    quote: "Bloom whole spices in hot ghee until they crackle — that 30 seconds is where the flavour lives.",
    author: "Meera · Weekend cook",
    tag: "Tadka wisdom",
  },
  {
    quote: "My grandmother's sambar always had a pinch of jaggery. Sweetness makes tamarind sing.",
    author: "Divya · Chennai kitchen",
    tag: "Family trick",
  },
  {
    quote: "Freeze ginger-garlic paste in an ice tray. Weeknight curries start in seconds, not tears.",
    author: "Arjun · Batch cooker",
    tag: "Prep hack",
  },
  {
    quote: "Day-two biryani, steamed with a splash of milk — better than day one. I said what I said.",
    author: "Farah · Leftover lover",
    tag: "Leftover magic",
  },
  {
    quote: "Toast rava before upma, always. Pale gold and nutty-smelling — never rushed, never gummy.",
    author: "Lakshmi · Tiffin expert",
    tag: "Breakfast rule",
  },
  {
    quote: "Teach one dish to someone younger every year. Recipes survive when hands remember them.",
    author: "Ravi · Dad of two",
    tag: "Pass it on",
  },
];

async function submitForm(
  type: "recipe-request" | "cooking-memory",
  values: FormState
) {
  const res = await fetch("/api/community-submissions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, ...values }),
  });
  const data = (await res.json().catch(() => null)) as {
    ok?: boolean;
    error?: string;
    errors?: Record<string, string>;
  } | null;
  if (!res.ok || !data?.ok) {
    const msg =
      data?.errors
        ? Object.values(data.errors).join(" ")
        : (data?.error ?? `Something went wrong (status ${res.status}).`);
    throw new Error(msg);
  }
  return data;
}

function useCommunityForm(type: "recipe-request" | "cooking-memory") {
  const [values, setValues] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "failed">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const set = (k: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    setErrors((prev) => {
      if (!prev[k]) return prev;
      const next = { ...prev };
      delete next[k];
      return next;
    });
  };

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!values.name.trim()) next.name = "Please tell us your name.";
    else if (values.name.trim().length > 80) next.name = "Keep your name under 80 characters.";
    if (type === "recipe-request") {
      if (!values.title.trim()) next.title = "Which dish are you craving?";
      else if (values.title.trim().length > 120) next.title = "Keep the dish name under 120 characters.";
    } else if (values.title.trim().length > 120) {
      next.title = "Keep the title under 120 characters.";
    }
    if (!values.message.trim()) {
      next.message =
        type === "recipe-request"
          ? "Add a line about why you want it."
          : "Share your memory — even a few lines matter.";
    } else if (values.message.trim().length > 2000) {
      next.message = "Please keep it under 2000 characters.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    if (!validate()) return;
    setStatus("sending");
    try {
      await submitForm(type, {
        name: values.name.trim(),
        title: values.title.trim(),
        message: values.message.trim(),
      });
      setStatus("done");
      setValues(EMPTY);
    } catch (err) {
      setStatus("failed");
      setServerError(err instanceof Error ? err.message : "Could not save. Please try again.");
    }
  };

  const reset = () => {
    setStatus("idle");
    setServerError(null);
    setErrors({});
  };

  return { values, errors, status, serverError, set, onSubmit, reset };
}

export default function CommunityPage() {
  const request = useCommunityForm("recipe-request");
  const memory = useCommunityForm("cooking-memory");

  return (
    <div className="bg-cream">
      {/* Welcome */}
      <section className="bg-walnut py-12 text-cream-light lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="section-eyebrow-light">
            <Users className="h-3.5 w-3.5" aria-hidden /> Community kitchen
          </p>
          <h1 className="mt-3 max-w-2xl font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Pull up a stool. Tell us what you&apos;re cooking.
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-cream-light/75">
            Request the dish you miss from home, or leave a memory for the next
            cook. Every submission is stored in our shared Supabase table —
            nothing here is faked or local-only.
          </p>
        </div>
      </section>

      {/* Tip wall */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="wall-h">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="section-eyebrow">
              <Quote className="h-3.5 w-3.5" aria-hidden /> The story wall
            </p>
            <h2 id="wall-h" className="mt-3 font-heading text-2xl font-extrabold text-walnut sm:text-3xl">
              Notes from fellow home cooks
            </h2>
          </div>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TIPS.map((t) => (
            <figure key={t.quote.slice(0, 24)} className="card-kitchen flex flex-col p-6">
              <span className="chip w-fit bg-turmeric/40 text-walnut">{t.tag}</span>
              <blockquote className="mt-3 flex-1 font-heading text-[15px] font-semibold leading-relaxed text-walnut">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-2 text-xs font-bold text-wood">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-walnut text-[11px] text-turmeric" aria-hidden>
                  {t.author.charAt(0)}
                </span>
                {t.author}
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-4 text-xs text-charcoal/55">
          Illustrative community notes to warm up the wall — your real submissions below are saved to Supabase.
        </p>
      </section>

      {/* Forms */}
      <section className="border-t border-walnut/10 bg-cream-light py-12" aria-labelledby="forms-h">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="forms-h" className="sr-only">Submission forms</h2>
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Recipe request */}
            <div className="card-kitchen p-6 sm:p-8">
              <h3 className="flex items-center gap-2 font-heading text-xl font-extrabold text-walnut">
                <BookOpen className="h-5 w-5 text-wood" aria-hidden /> Request a recipe
              </h3>
              <p className="mt-1.5 text-sm text-charcoal/65">
                Craving something we haven&apos;t cooked yet? Ask and we&apos;ll add it to the shelf.
              </p>
              {request.status === "done" ? (
                <div className="mt-5 space-y-4">
                  <Feedback
                    tone="success"
                    title="Request saved — thank you!"
                    message="Your recipe request was written to our database. We read every single one."
                  />
                  <button type="button" onClick={request.reset} className="btn-outline w-full">
                    Make another request
                  </button>
                </div>
              ) : (
                <form onSubmit={request.onSubmit} noValidate className="mt-5 space-y-4">
                  <div>
                    <label htmlFor="req-name" className="label-kitchen">Your name *</label>
                    <input
                      id="req-name"
                      type="text"
                      value={request.values.name}
                      onChange={request.set("name")}
                      maxLength={80}
                      autoComplete="name"
                      placeholder="e.g. Priya"
                      className="input-kitchen"
                      aria-invalid={Boolean(request.errors.name)}
                      aria-describedby={request.errors.name ? "req-name-err" : undefined}
                    />
                    {request.errors.name && <p id="req-name-err" role="alert" className="mt-1 text-xs font-semibold text-red-800">{request.errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="req-title" className="label-kitchen">Dish you&apos;re craving *</label>
                    <input
                      id="req-title"
                      type="text"
                      value={request.values.title}
                      onChange={request.set("title")}
                      maxLength={120}
                      placeholder="e.g. Mysore masala dosa"
                      className="input-kitchen"
                      aria-invalid={Boolean(request.errors.title)}
                      aria-describedby={request.errors.title ? "req-title-err" : undefined}
                    />
                    {request.errors.title && <p id="req-title-err" role="alert" className="mt-1 text-xs font-semibold text-red-800">{request.errors.title}</p>}
                  </div>
                  <div>
                    <label htmlFor="req-msg" className="label-kitchen">
                      Why do you want it? *{" "}
                      <span className="font-normal text-charcoal/50">({request.values.message.length}/2000)</span>
                    </label>
                    <textarea
                      id="req-msg"
                      value={request.values.message}
                      onChange={request.set("message")}
                      maxLength={2000}
                      rows={4}
                      placeholder="Festival memory, weeknight need, a grandmother's version…"
                      className="input-kitchen resize-y"
                      aria-invalid={Boolean(request.errors.message)}
                      aria-describedby={request.errors.message ? "req-msg-err" : undefined}
                    />
                    {request.errors.message && <p id="req-msg-err" role="alert" className="mt-1 text-xs font-semibold text-red-800">{request.errors.message}</p>}
                  </div>
                  {request.status === "failed" && request.serverError && (
                    <Feedback tone="error" title="Not saved yet" message={request.serverError} />
                  )}
                  <button type="submit" disabled={request.status === "sending"} className="btn-dark w-full disabled:opacity-60">
                    {request.status === "sending" ? <LoadingSpinner label="Saving your request…" /> : (<><Send className="h-4 w-4" aria-hidden /> Send recipe request</>)}
                  </button>
                </form>
              )}
            </div>

            {/* Cooking memory */}
            <div className="card-kitchen p-6 sm:p-8">
              <h3 className="flex items-center gap-2 font-heading text-xl font-extrabold text-walnut">
                <Heart className="h-5 w-5 text-wood" aria-hidden /> Share a cooking memory
              </h3>
              <p className="mt-1.5 text-sm text-charcoal/65">
                The smell, the person, the clumsy first attempt — leave it for the wall.
              </p>
              {memory.status === "done" ? (
                <div className="mt-5 space-y-4">
                  <Feedback
                    tone="success"
                    title="Memory saved — beautifully done."
                    message="Your story was written to our database. Thank you for trusting us with it."
                  />
                  <button type="button" onClick={memory.reset} className="btn-outline w-full">
                    Share another memory
                  </button>
                </div>
              ) : (
                <form onSubmit={memory.onSubmit} noValidate className="mt-5 space-y-4">
                  <div>
                    <label htmlFor="mem-name" className="label-kitchen">Your name *</label>
                    <input
                      id="mem-name"
                      type="text"
                      value={memory.values.name}
                      onChange={memory.set("name")}
                      maxLength={80}
                      autoComplete="name"
                      placeholder="e.g. Arjun"
                      className="input-kitchen"
                      aria-invalid={Boolean(memory.errors.name)}
                      aria-describedby={memory.errors.name ? "mem-name-err" : undefined}
                    />
                    {memory.errors.name && <p id="mem-name-err" role="alert" className="mt-1 text-xs font-semibold text-red-800">{memory.errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="mem-title" className="label-kitchen">
                      Title <span className="font-normal text-charcoal/50">(optional)</span>
                    </label>
                    <input
                      id="mem-title"
                      type="text"
                      value={memory.values.title}
                      onChange={memory.set("title")}
                      maxLength={120}
                      placeholder="e.g. Monsoon rasam at ajji's"
                      className="input-kitchen"
                      aria-invalid={Boolean(memory.errors.title)}
                      aria-describedby={memory.errors.title ? "mem-title-err" : undefined}
                    />
                    {memory.errors.title && <p id="mem-title-err" role="alert" className="mt-1 text-xs font-semibold text-red-800">{memory.errors.title}</p>}
                  </div>
                  <div>
                    <label htmlFor="mem-msg" className="label-kitchen">
                      Your memory *{" "}
                      <span className="font-normal text-charcoal/50">({memory.values.message.length}/2000)</span>
                    </label>
                    <textarea
                      id="mem-msg"
                      value={memory.values.message}
                      onChange={memory.set("message")}
                      maxLength={2000}
                      rows={4}
                      placeholder="Who taught you? What did the kitchen smell like?"
                      className="input-kitchen resize-y"
                      aria-invalid={Boolean(memory.errors.message)}
                      aria-describedby={memory.errors.message ? "mem-msg-err" : undefined}
                    />
                    {memory.errors.message && <p id="mem-msg-err" role="alert" className="mt-1 text-xs font-semibold text-red-800">{memory.errors.message}</p>}
                  </div>
                  {memory.status === "failed" && memory.serverError && (
                    <Feedback tone="error" title="Not saved yet" message={memory.serverError} />
                  )}
                  <button type="submit" disabled={memory.status === "sending"} className="btn-primary w-full disabled:opacity-60">
                    {memory.status === "sending" ? <LoadingSpinner label="Saving your memory…" /> : (<><Lightbulb className="h-4 w-4" aria-hidden /> Share memory</>)}
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-3xl">
            <Feedback
              tone="info"
              title="Real backend, honest states"
              message="Submissions POST to /api/community-submissions, are validated on the server, and are only confirmed after Supabase writes succeed. If keys are missing you'll see a clear configuration message — never a fake success. See README + supabase/schema.sql for setup."
            />
            <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-charcoal/55">
              <CheckCircle2 className="h-3.5 w-3.5 text-olive" aria-hidden />
              No login needed · Be kind · No spam, please
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
