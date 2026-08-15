import type { Diary } from "../types";
import { supabase, isCloudEnabled } from "./supabase";

/**
 * 云端同步层 — 提供异步的 fetchAll / push / remove
 * 由 storage.ts 在合适时机调用，业务页面无感知。
 *
 * 表结构（参见 docs/SUPABASE-SETUP.md）：
 *   diaries (
 *     id            text primary key,
 *     title         text,
 *     product_name  text,
 *     product_category text,
 *     price         numeric,
 *     rating        int,
 *     reason        text,
 *     experience    text,
 *     verdict       text,
 *     image_url     text,
 *     created_at    timestamptz,
 *     updated_at    timestamptz
 *   )
 */

// camelCase ↔ snake_case 适配
function toRow(d: Diary) {
  return {
    id: d.id,
    title: d.title,
    product_name: d.productName,
    product_category: d.productCategory,
    price: d.price,
    rating: d.rating,
    reason: d.reason,
    experience: d.experience,
    verdict: d.verdict,
    image_url: d.imageUrl ?? null,
    created_at: d.createdAt,
    updated_at: d.updatedAt,
  };
}

function fromRow(r: Record<string, unknown>): Diary {
  return {
    id: String(r.id),
    title: String(r.title ?? ""),
    productName: String(r.product_name ?? ""),
    productCategory: String(r.product_category ?? ""),
    price: Number(r.price ?? 0),
    rating: Number(r.rating ?? 3) as 1 | 2 | 3 | 4 | 5,
    reason: String(r.reason ?? ""),
    experience: String(r.experience ?? ""),
    verdict: (r.verdict as Diary["verdict"]) ?? "neutral",
    imageUrl: r.image_url ? String(r.image_url) : undefined,
    createdAt: String(r.created_at ?? new Date().toISOString()),
    updatedAt: String(r.updated_at ?? new Date().toISOString()),
  };
}

/** 拉取全部公共日记 */
export async function cloudFetchAll(): Promise<Diary[] | null> {
  if (!isCloudEnabled || !supabase) return null;
  try {
    const { data, error } = await supabase
      .from("diaries")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.warn("[云同步] 拉取失败：", error.message);
      return null;
    }
    return (data ?? []).map(fromRow);
  } catch (e) {
    console.warn("[云同步] 拉取异常：", e);
    return null;
  }
}

/** 上传或更新一篇日记 */
export async function cloudUpsert(diary: Diary): Promise<boolean> {
  if (!isCloudEnabled || !supabase) return false;
  try {
    const { error } = await supabase.from("diaries").upsert(toRow(diary));
    if (error) {
      console.warn("[云同步] 上传失败：", error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.warn("[云同步] 上传异常：", e);
    return false;
  }
}

/** 删除一篇 */
export async function cloudDelete(id: string): Promise<boolean> {
  if (!isCloudEnabled || !supabase) return false;
  try {
    const { error } = await supabase.from("diaries").delete().eq("id", id);
    if (error) {
      console.warn("[云同步] 删除失败：", error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.warn("[云同步] 删除异常：", e);
    return false;
  }
}
