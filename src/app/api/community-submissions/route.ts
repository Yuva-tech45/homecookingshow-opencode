import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";

const MAX_NAME = 80;
const MAX_TITLE = 120;
const MAX_BODY = 2000;

interface Incoming {
  type?: unknown;
  name?: unknown;
  title?: unknown;
  message?: unknown;
}

function clean(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim().replace(/\s+/g, " ");
  if (!trimmed || trimmed.length > max) return null;
  return trimmed;
}

export async function POST(req: NextRequest) {
  let body: Incoming;
  try {
    body = (await req.json()) as Incoming;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Please send valid JSON." },
      { status: 400 }
    );
  }

  if (body.type !== "recipe-request" && body.type !== "cooking-memory") {
    return NextResponse.json(
      { ok: false, error: "Submission type must be recipe-request or cooking-memory." },
      { status: 400 }
    );
  }

  const name = clean(body.name, MAX_NAME);
  const title = clean(body.title, MAX_TITLE);
  const message = clean(body.message, MAX_BODY);

  const errors: Record<string, string> = {};
  if (!name) errors.name = `Name is required (1–${MAX_NAME} characters).`;
  if (body.type === "recipe-request" && !title)
    errors.title = `Dish name is required (1–${MAX_TITLE} characters).`;
  if (body.type === "cooking-memory" && !message)
    errors.message = `Your memory is required (1–${MAX_BODY} characters).`;
  if (body.type === "recipe-request" && !message)
    errors.message = `Tell us a little more (1–${MAX_BODY} characters).`;
  if (title !== null && body.type === "cooking-memory" && typeof body.title === "string" && body.title.trim().length > MAX_TITLE)
    errors.title = `Title must be under ${MAX_TITLE} characters.`;

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Community submissions are not configured yet. The site owner needs to set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (see README).",
        code: "SUPABASE_NOT_CONFIGURED",
      },
      { status: 503 }
    );
  }

  const { data, error } = await supabase
    .from("community_submissions")
    .insert({
      type: body.type,
      name: name!,
      title: title ?? null,
      message: message!,
    })
    .select("id, created_at")
    .single();

  if (error) {
    return NextResponse.json(
      { ok: false, error: `Could not save your submission: ${error.message}` },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, id: data?.id ?? null }, { status: 201 });
}

export async function GET() {
  return NextResponse.json(
    { ok: false, error: "Use POST to submit." },
    { status: 405 }
  );
}
