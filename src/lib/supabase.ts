import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase 客户端 — 通过 Vite 环境变量配置
 *
 * 如果环境变量未设置，导出 null —— 上层代码应自动降级到 localStorage 模式。
 * 这样开发者不配置也能跑，老师/同学不配置也能跑。
 */

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isCloudEnabled = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = isCloudEnabled
  ? createClient(url!, anonKey!)
  : null;

if (typeof window !== "undefined") {
  // 控制台提示，便于答辩演示时让评委看到模式
  console.info(
    `[拔草日记] 数据模式：${isCloudEnabled ? "☁️ Supabase 云端" : "💾 LocalStorage 本地"}`,
  );
}
