-- CrackedMilk Dashboard Schema
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql

-- Projects table
create table projects (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  created_at      timestamptz not null default now(),
  current_phase   smallint not null default 1 check (current_phase between 1 and 8),
  strategy_brief  jsonb not null default '{}'::jsonb,
  pipeline_config jsonb not null default '{}'::jsonb
);

-- Tasks table (pre-seeded from 8-phase template on project creation)
create table tasks (
  id           uuid primary key default gen_random_uuid(),
  project_id   uuid not null references projects(id) on delete cascade,
  phase_number smallint not null check (phase_number between 1 and 8),
  text         text not null,
  completed    boolean not null default false,
  sort_order   smallint not null default 0
);

-- Chat messages table
create table chat_messages (
  id         uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  role       text not null check (role in ('user', 'assistant')),
  content    text not null,
  created_at timestamptz not null default now()
);

-- Indexes
create index on tasks(project_id, phase_number);
create index on chat_messages(project_id, created_at);

-- Row Level Security (permissive for internal tool — lock down if going public)
alter table projects      enable row level security;
alter table tasks         enable row level security;
alter table chat_messages enable row level security;

create policy "allow all" on projects      for all using (true) with check (true);
create policy "allow all" on tasks         for all using (true) with check (true);
create policy "allow all" on chat_messages for all using (true) with check (true);

-- ─────────────────────────────────────────────────────────────────────────────
-- Agent REST API reference (for Claude/GPT agents)
-- Base URL: https://<your-project-ref>.supabase.co/rest/v1
-- Headers:
--   apikey: <supabase-anon-key>
--   Authorization: Bearer <supabase-service-role-key>   ← for write ops
--   Content-Type: application/json
--
-- Read all projects with tasks:
--   GET /projects?select=*,tasks(*)
--
-- Read one project:
--   GET /projects?id=eq.<uuid>&select=*,tasks(*),chat_messages(*)
--
-- Update strategy_brief (merge, not replace):
--   PATCH /projects?id=eq.<uuid>
--   Body: { "strategy_brief": { "problem": "...", "audience": "..." } }
--
-- Mark a task complete:
--   PATCH /tasks?id=eq.<uuid>
--   Body: { "completed": true }
--
-- Advance project phase:
--   PATCH /projects?id=eq.<uuid>
--   Body: { "current_phase": 3 }
--
-- Post a chat message:
--   POST /chat_messages
--   Body: { "project_id": "<uuid>", "role": "assistant", "content": "..." }
-- ─────────────────────────────────────────────────────────────────────────────
