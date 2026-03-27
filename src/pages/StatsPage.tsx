import { motion } from "framer-motion";
import BrutalCard from "../components/ui/BrutalCard";
import CountUp from "../components/ui/CountUp";
import SavingsJar from "../components/stats/SavingsJar";
import CategoryChart from "../components/stats/CategoryChart";
import { getDiaries } from "../lib/storage";
import {
  calcTotalSpent,
  calcAverageRating,
  calcRationalIndex,
  calcCategoryBreakdown,
  calcSavingsJar,
  calcMonthlySpent,
} from "../lib/stats";
import { EMOJI_RATINGS } from "../types";

export default function StatsPage() {
  const diaries = getDiaries();
  const totalSpent = calcTotalSpent(diaries);
  const avgRating = calcAverageRating(diaries);
  const rationalIndex = calcRationalIndex(diaries);
  const categoryData = calcCategoryBreakdown(diaries);
  const savingsJar = calcSavingsJar(diaries);
  const monthlySpent = calcMonthlySpent(diaries);

  const statCards = [
    { label: "日记总数", value: diaries.length, suffix: " 篇", color: "text-brutal-black" },
    { label: "累计消费", value: totalSpent, prefix: "¥", color: "text-primary-dark" },
    { label: "本月消费", value: monthlySpent, prefix: "¥", color: "text-primary-dark" },
    { label: "理智指数", value: rationalIndex, suffix: "%", color: "text-primary" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-black mb-8">📊 消费统计</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <BrutalCard className="text-center py-6">
              <div className={`text-3xl font-black ${stat.color}`}>
                <CountUp end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <p className="text-sm text-brutal-black/50 mt-1 font-bold">{stat.label}</p>
            </BrutalCard>
          </motion.div>
        ))}
      </div>

      {/* Average Rating */}
      <BrutalCard className="mb-8 p-6">
        <h2 className="font-black text-xl mb-4">平均满意度</h2>
        <div className="flex items-center gap-4">
          <span className="text-5xl">{EMOJI_RATINGS[Math.round(avgRating) - 1] || "😐"}</span>
          <div>
            <p className="text-3xl font-black">{avgRating.toFixed(1)} / 5</p>
            <p className="text-sm text-brutal-black/50">基于 {diaries.length} 篇日记</p>
          </div>
        </div>
      </BrutalCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Category Chart */}
        <BrutalCard className="p-6">
          <h2 className="font-black text-xl mb-4">品类分布</h2>
          <CategoryChart data={categoryData} />
        </BrutalCard>

        {/* Savings Jar */}
        <BrutalCard className="p-6 flex flex-col items-center justify-center">
          <h2 className="font-black text-xl mb-4">踩雷存钱罐</h2>
          <SavingsJar amount={savingsJar} />
          <p className="mt-4 text-sm text-brutal-black/50 text-center">
            这些钱本可以省下来...下次消费前先看看拔草日记吧！
          </p>
        </BrutalCard>
      </div>

      {/* Verdict Breakdown */}
      <BrutalCard className="p-6">
        <h2 className="font-black text-xl mb-4">购物判定分布</h2>
        <div className="flex gap-4">
          {([
            ["worth", "值得买", "bg-primary", diaries.filter((d) => d.verdict === "worth").length],
            ["not-worth", "踩雷了", "bg-danger", diaries.filter((d) => d.verdict === "not-worth").length],
            ["neutral", "一般般", "bg-accent", diaries.filter((d) => d.verdict === "neutral").length],
          ] as const).map(([, label, color, count]) => (
            <div key={label} className="flex-1 text-center">
              <div className={`h-4 brutal-border ${color}`} style={{ width: `${diaries.length ? (count / diaries.length) * 100 : 0}%`, minWidth: "8px", margin: "0 auto" }} />
              <p className="font-black text-lg mt-2">{count}</p>
              <p className="text-xs text-brutal-black/50 font-bold">{label}</p>
            </div>
          ))}
        </div>
      </BrutalCard>
    </div>
  );
}
