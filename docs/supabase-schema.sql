-- ============================================
-- 拔草日记 — Supabase 数据库初始化脚本
-- ============================================
-- 使用方法：
--   1. 登录 https://supabase.com → 进入你的项目
--   2. 左侧栏点 "SQL Editor" → "New query"
--   3. 把整个文件粘贴进去 → 点 Run
--   4. 完成后去 Table Editor 应该能看到 diaries 表
-- ============================================

-- 1. 主表
create table if not exists public.diaries (
  id               text        primary key,
  title            text        not null default '',
  product_name     text        not null default '',
  product_category text        not null default '其他',
  price            numeric     not null default 0,
  rating           int         not null default 3 check (rating between 1 and 5),
  reason           text        not null default '',
  experience       text        not null default '',
  verdict          text        not null default 'neutral' check (verdict in ('worth','not-worth','neutral')),
  image_url        text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- 2. 索引：按时间倒序的列表查询会很常用
create index if not exists diaries_created_at_idx on public.diaries (created_at desc);
create index if not exists diaries_category_idx   on public.diaries (product_category);
create index if not exists diaries_verdict_idx    on public.diaries (verdict);

-- 3. 启用 Row Level Security
alter table public.diaries enable row level security;

-- 4. 公共读写策略 — 毕设演示用，任何匿名访客都可读写
--    注意：生产环境应该改为绑定 auth.uid()，但毕设演示无需登录
drop policy if exists "anyone can read diaries"  on public.diaries;
drop policy if exists "anyone can write diaries" on public.diaries;
drop policy if exists "anyone can update diaries" on public.diaries;
drop policy if exists "anyone can delete diaries" on public.diaries;

create policy "anyone can read diaries"
  on public.diaries for select
  using (true);

create policy "anyone can write diaries"
  on public.diaries for insert
  with check (true);

create policy "anyone can update diaries"
  on public.diaries for update
  using (true)
  with check (true);

create policy "anyone can delete diaries"
  on public.diaries for delete
  using (true);

-- 5. 自动更新 updated_at 触发器
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists diaries_touch on public.diaries;
create trigger diaries_touch
  before update on public.diaries
  for each row execute function public.touch_updated_at();
