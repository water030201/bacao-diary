import type { Diary } from "../types";

export function calcTotalSpent(diaries: Diary[]): number {
  return diaries.reduce((sum, d) => sum + d.price, 0);
}

export function calcAverageRating(diaries: Diary[]): number {
  if (diaries.length === 0) return 0;
  return diaries.reduce((sum, d) => sum + d.rating, 0) / diaries.length;
}

export function calcRationalIndex(diaries: Diary[]): number {
  if (diaries.length === 0) return 100;
  const worthCount = diaries.filter((d) => d.verdict === "worth").length;
  return Math.round((worthCount / diaries.length) * 100);
}

export function calcCategoryBreakdown(diaries: Diary[]): { name: string; value: number }[] {
  const map = new Map<string, number>();
  for (const d of diaries) {
    map.set(d.productCategory, (map.get(d.productCategory) || 0) + d.price);
  }
  return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
}

export function calcSavingsJar(diaries: Diary[]): number {
  return diaries
    .filter((d) => d.verdict === "not-worth")
    .reduce((sum, d) => sum + d.price, 0);
}

export function calcMonthlySpent(diaries: Diary[]): number {
  const now = new Date();
  const thisMonth = diaries.filter((d) => {
    const date = new Date(d.createdAt);
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  });
  return calcTotalSpent(thisMonth);
}
