import type { Diary, UserProfile } from "../types";

const DIARY_KEY = "bacao_diaries";
const USER_KEY = "bacao_user";

export function getDiaries(): Diary[] {
  try {
    const raw = localStorage.getItem(DIARY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveDiary(diary: Diary): void {
  const diaries = getDiaries();
  const index = diaries.findIndex((d) => d.id === diary.id);
  if (index >= 0) {
    diaries[index] = diary;
  } else {
    diaries.unshift(diary);
  }
  localStorage.setItem(DIARY_KEY, JSON.stringify(diaries));
}

export function deleteDiary(id: string): void {
  const diaries = getDiaries().filter((d) => d.id !== id);
  localStorage.setItem(DIARY_KEY, JSON.stringify(diaries));
}

export function getDiary(id: string): Diary | undefined {
  return getDiaries().find((d) => d.id === id);
}

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
