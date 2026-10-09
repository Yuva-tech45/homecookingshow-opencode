-- HomeCookingShow · Community submissions schema
-- Run this in the Supabase SQL editor (Project → SQL → New query).

create table if not exists public.community_submissions (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('recipe-request', 'cooking-memory')),
  name text not null check (char_length(name) between 1 and 80),
  title text null check (title is null or char_length(title) <= 120),
  message text not null check (char_length(message) between 1 and 2000),
  created_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.community_submissions enable row level security;

-- Allow anyone (anon + authenticated) to INSERT valid rows.
-- Server-side validation in /api/community-submissions is the primary guard;
-- these CHECK constraints are defence in depth.
drop policy if exists "Anyone can submit" on public.community_submissions;
create policy "Anyone can submit"
  on public.community_submissions
  for insert
  to anon, authenticated
  with check (
    type in ('recipe-request', 'cooking-memory')
    and char_length(name) between 1 and 80
    and char_length(message) between 1 and 2000
  );

-- Reads: keep submissions private by default (no SELECT policy for anon).
-- If you later want a public wall, add a moderation flag first, e.g.:
--   alter table public.community_submissions add column approved boolean default false;
--   create policy "Public can read approved"
--     on public.community_submissions for select to anon, authenticated
--     using (approved = true);

-- Helpful index for future moderation / listing
create index if not exists community_submissions_created_at_idx
  on public.community_submissions (created_at desc);
