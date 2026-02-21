-- Create complaints (ankesa) table
create table if not exists public.complaints (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category text not null check (category in ('Urbanistike', 'Mjedisi', 'Arsimi', 'Infrastruktura', 'Shendetesia', 'Siguria', 'Tjeter')),
  address text not null,
  details text not null,
  status text not null default 'pending' check (status in ('pending', 'in_review', 'resolved', 'rejected')),
  created_at timestamptz default now()
);

alter table public.complaints enable row level security;

-- Users can view their own complaints
create policy "complaints_select_own" on public.complaints for select using (auth.uid() = user_id);

-- Users can insert their own complaints
create policy "complaints_insert_own" on public.complaints for insert with check (auth.uid() = user_id);

-- Admin can view all complaints
create policy "admin_select_all_complaints" on public.complaints for select using (
  (select (raw_user_meta_data ->> 'is_admin')::boolean from auth.users where id = auth.uid())
);

-- Admin can delete complaints
create policy "admin_delete_complaints" on public.complaints for delete using (
  (select (raw_user_meta_data ->> 'is_admin')::boolean from auth.users where id = auth.uid())
);
