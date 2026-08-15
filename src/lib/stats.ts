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

/** 按时间范围过滤 */
export function filterByRange(
  diaries: Diary[],
  range: "7d" | "30d" | "90d" | "all",
): Diary[] {
  if (range === "all") return diaries;
  const days = range === "7d" ? 7 : range === "30d" ? 30 : 90;
  const cutoff = Date.now() - days * 24 * 3600 * 1000;
  return diaries.filter((d) => new Date(d.createdAt).getTime() >= cutoff);
}

/** 按月聚合每个品类的消费 — 用于堆叠面积图 */
export function calcMonthlyByCategory(
  diaries: Diary[],
): Array<Record<string, number | string>> {
  const buckets = new Map<string, Record<string, number>>();
  for (const d of diaries) {
    const date = new Date(d.createdAt);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    if (!buckets.has(key)) buckets.set(key, {});
    const row = buckets.get(key)!;
    row[d.productCategory] = (row[d.productCategory] || 0) + d.price;
  }
  return Array.from(buckets.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, cats]) => ({ month, ...cats }));
}

/** 各品类的多维评分（满意度/价格/复购意愿/性价比） — 用于雷达图 */
export function calcCategoryRadar(
  diaries: Diary[],
): Array<{ category: string; satisfaction: number; rationality: number; volume: number }> {
  const groups = new Map<string, Diary[]>();
  for (const d of diaries) {
    if (!groups.has(d.productCategory)) groups.set(d.productCategory, []);
    groups.get(d.productCategory)!.push(d);
  }
  return Array.from(groups.entries()).map(([category, list]) => {
    const satisfaction = (list.reduce((s, d) => s + d.rating, 0) / list.length) * 20;
    const worth = list.filter((d) => d.verdict === "worth").length;
    const rationality = (worth / list.length) * 100;
    const volume = Math.min(100, list.length * 10);
    return { category, satisfaction, rationality, volume };
  });
}
