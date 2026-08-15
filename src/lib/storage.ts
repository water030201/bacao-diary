import type { Diary, UserProfile } from "../types";
import { isCloudEnabled } from "./supabase";
import { cloudUpsert, cloudDelete } from "./cloudSync";

/**
 * Storage 抽象层
 * - 业务代码看到的是同步 API（getDiaries / saveDiary / deleteDiary）
 * - 内部维护一份内存缓存 _cache，所有同步读都走它
 * - 启动时由 main.tsx 调 hydrateCache() 注入初始数据（来自云端或 localStorage）
 * - 写入时：① 更新内存 ② 写 localStorage（永远当作离线备份）③ 若云端开启，异步上传
 *
 * 这种设计的好处：所有 10 个页面/组件都不用改成 async，零侵入
 */

const DIARY_KEY = "bacao_diaries";
const USER_KEY = "bacao_user";

let _cache: Diary[] | null = null;

function ensureCache(): Diary[] {
  if (_cache !== null) return _cache;
  // 首次同步访问时从 localStorage 读取（兜底）
  try {
    const raw = localStorage.getItem(DIARY_KEY);
    _cache = raw ? (JSON.parse(raw) as Diary[]) : [];
  } catch {
    _cache = [];
  }
  return _cache;
}

/** 由 main.tsx 启动时调用，把云端或本地数据写入缓存 */
export function hydrateCache(diaries: Diary[]) {
  _cache = diaries;
  try {
    localStorage.setItem(DIARY_KEY, JSON.stringify(diaries));
  } catch {
    /* localStorage 不可用时静默 */
  }
}

export function getDiaries(): Diary[] {
  return ensureCache();
}

export function saveDiary(diary: Diary): void {
  const list = ensureCache();
  const index = list.findIndex((d) => d.id === diary.id);
  if (index >= 0) list[index] = diary;
  else list.unshift(diary);
  try {
    localStorage.setItem(DIARY_KEY, JSON.stringify(list));
  } catch {
    /* ignore */
  }
  if (isCloudEnabled) {
    // 不阻塞 UI，失败也只在控制台打点
    void cloudUpsert(diary);
  }
}

export function deleteDiary(id: string): void {
  const list = ensureCache().filter((d) => d.id !== id);
  _cache = list;
  try {
    localStorage.setItem(DIARY_KEY, JSON.stringify(list));
  } catch {
    /* ignore */
  }
  if (isCloudEnabled) {
    void cloudDelete(id);
  }
}

export function getDiary(id: string): Diary | undefined {
  return ensureCache().find((d) => d.id === id);
}

// === 用户资料保持纯本地（私人数据） ===
export function getUserProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw
      ? JSON.parse(raw)
      : { nickname: "拔草小能手", avatar: "🌱", bio: "理性消费，快乐生活", createdAt: new Date().toISOString() };
  } catch {
    return { nickname: "拔草小能手", avatar: "🌱", bio: "理性消费，快乐生活", createdAt: new Date().toISOString() };
  }
}

export function saveUserProfile(profile: UserProfile): void {
  localStorage.setItem(USER_KEY, JSON.stringify(profile));
}
