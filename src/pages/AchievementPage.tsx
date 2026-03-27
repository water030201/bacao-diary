import { useMemo } from "react";
import { motion } from "framer-motion";
import BrutalCard from "../components/ui/BrutalCard";
import Icon from "../components/ui/Icon";
import type { IconName } from "../components/ui/Icon";
import { getDiaries } from "../lib/storage";
import type { Achievement } from "../types";

function useAchievements(): Achievement[] {
  const diaries = getDiaries();
  const now = new Date().toISOString();

  return useMemo(() => {
    const worthCount = diaries.filter((d) => d.verdict === "worth").length;
    const notWorthCount = diaries.filter((d) => d.verdict === "not-worth").length;
    const categories = new Set(diaries.map((d) => d.productCategory));

    return [
      {
        id: "first-diary",
        name: "初出茅庐",
        description: "写下第一篇拔草日记",
        icon: "notepad",
        unlockedAt: diaries.length >= 1 ? now : undefined,
      },
      {
        id: "five-diaries",
        name: "拔草达人",
        description: "累计写下5篇拔草日记",
        icon: "leaf",
        unlockedAt: diaries.length >= 5 ? now : undefined,
      },
      {
        id: "ten-diaries",
        name: "消费侦探",
        description: "累计写下10篇拔草日记",
        icon: "search",
        unlockedAt: diaries.length >= 10 ? now : undefined,
      },
      {
        id: "smart-buyer",
        name: "精明买家",
        description: "3次购物都被判定为值得买",
        icon: "brain",
        unlockedAt: worthCount >= 3 ? now : undefined,
      },
      {
        id: "mine-sweeper",
        name: "排雷专家",
        description: "发现3个踩雷商品，帮助大家避坑",
        icon: "bomb",
        unlockedAt: notWorthCount >= 3 ? now : undefined,
      },
      {
        id: "explorer",
        name: "全品类探索者",
        description: "在5个以上品类写过日记",
        icon: "map",
        unlockedAt: categories.size >= 5 ? now : undefined,
      },
      {
        id: "frugal",
        name: "省钱小能手",
        description: "累计避坑金额超过500元",
        icon: "money",
        unlockedAt:
          diaries.filter((d) => d.verdict === "not-worth").reduce((s, d) => s + d.price, 0) >= 500
            ? now
            : undefined,
      },
      {
        id: "perfectionist",
        name: "满分体验",
        description: "给出一个5星满分评价",
        icon: "star",
        unlockedAt: diaries.some((d) => d.rating === 5) ? now : undefined,
      },
    ];
  }, [diaries]);
}

export default function AchievementPage() {
  const achievements = useAchievements();
  const unlocked = achievements.filter((a) => a.unlockedAt).length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-black mb-2"><Icon name="trophy" size={28} className="inline-block" /> 成就展示</h1>
      <p className="text-brutal-black/50 mb-8 font-bold">
        已解锁 {unlocked} / {achievements.length} 个成就
      </p>

      <div className="brutal-border bg-brutal-white h-8 mb-8 relative overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(unlocked / achievements.length) * 100}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-primary"
        />
        <span className="absolute inset-0 flex items-center justify-center font-black text-sm">
          {Math.round((unlocked / achievements.length) * 100)}%
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((achievement, i) => {
          const isUnlocked = !!achievement.unlockedAt;
          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <BrutalCard className={`p-5 flex items-center gap-4 ${isUnlocked ? "" : "opacity-40 grayscale"}`}>
                <div className="text-4xl"><Icon name={achievement.icon as IconName} size={36} /></div>
                <div className="flex-1">
                  <h3 className="font-black text-lg">{achievement.name}</h3>
                  <p className="text-sm text-brutal-black/60">{achievement.description}</p>
                </div>
                {isUnlocked && (
                  <span className="bg-primary brutal-border px-2 py-0.5 text-xs font-bold">已解锁</span>
                )}
              </BrutalCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
