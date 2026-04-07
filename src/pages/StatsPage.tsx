import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import Icon from "../components/ui/Icon";
import BrutalCard from "../components/ui/BrutalCard";
import CountUp from "../components/ui/CountUp";
import ScrollReveal from "../components/ui/ScrollReveal";
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
  filterByRange,
  calcMonthlyByCategory,
  calcCategoryRadar,
} from "../lib/stats";
import { EMOJI_RATINGS, CATEGORIES } from "../types";

type Range = "7d" | "30d" | "90d" | "all";
const RANGE_LABEL: Record<Range, string> = {
  "7d": "近7天",
  "30d": "近30天",
  "90d": "近90天",
  all: "全部",
};

const STACK_COLORS = ["#00FF66", "#0A6B35", "#FFE500", "#FF3B30", "#1A1A1A", "#22C55E", "#84CC16", "#A3E635"];

export default function StatsPage() {
  const allDiaries = getDiaries();
  const [range, setRange] = useState<Range>("all");
  const [selectedCats, setSelectedCats] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const byTime = filterByRange(allDiaries, range);
    if (selectedCats.size === 0) return byTime;
    return byTime.filter((d) => selectedCats.has(d.productCategory));
  }, [allDiaries, range, selectedCats]);

  const totalSpent = calcTotalSpent(filtered);
  const avgRating = calcAverageRating(filtered);
  const rationalIndex = calcRationalIndex(filtered);
  const categoryData = calcCategoryBreakdown(filtered);
  const savingsJar = calcSavingsJar(filtered);
  const monthlySpent = calcMonthlySpent(filtered);
  const monthlyByCat = calcMonthlyByCategory(filtered);
  const radarData = calcCategoryRadar(filtered);
  const usedCats = useMemo(
    () => Array.from(new Set(filtered.map((d) => d.productCategory))),
    [filtered],
  );

  const toggleCat = (c: string) => {
    setSelectedCats((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });
  };

  const statCards = [
    { label: "日记总数", value: filtered.length, suffix: " 篇", color: "text-brutal-black" },
    { label: "累计消费", value: totalSpent, prefix: "¥", color: "text-primary-dark" },
    { label: "本月消费", value: monthlySpent, prefix: "¥", color: "text-primary-dark" },
    { label: "理智指数", value: rationalIndex, suffix: "%", color: "text-primary" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-black mb-6">
        <Icon name="chart" size={28} className="inline-block" /> 消费统计
      </h1>

      {/* 筛选控件 */}
      <BrutalCard className="mb-6 p-4">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="font-black text-sm">时间范围：</span>
          {(Object.keys(RANGE_LABEL) as Range[]).map((r) => (
            <button
              key={r}
              data-magnetic
              onClick={() => setRange(r)}
              className={`px-3 py-1.5 border-[2px] border-black font-bold text-sm transition-all ${
                range === r
                  ? "bg-[#00FF66] shadow-[3px_3px_0_#1A1A1A] -translate-x-[1px] -translate-y-[1px]"
                  : "bg-white hover:bg-[#F5F5F0]"
              }`}
            >
              {RANGE_LABEL[r]}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-black text-sm">品类：</span>
          {CATEGORIES.map((c) => {
            const on = selectedCats.has(c);
            return (
              <button
                key={c}
                data-magnetic
                onClick={() => toggleCat(c)}
                className={`px-2.5 py-1 border-[2px] border-black text-xs font-bold transition-all ${
                  on
                    ? "bg-[#FFE500] shadow-[2px_2px_0_#1A1A1A]"
                    : "bg-white hover:bg-[#F5F5F0]"
                }`}
              >
                {c}
              </button>
            );
          })}
          {selectedCats.size > 0 && (
            <button
              onClick={() => setSelectedCats(new Set())}
              className="text-xs underline ml-2 font-bold"
            >
              清空
            </button>
          )}
        </div>
      </BrutalCard>

      {/* Stat Cards — 切换筛选时 key 变更触发动画重播 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <AnimatePresence mode="popLayout">
          {statCards.map((stat, i) => (
            <motion.div
              key={`${stat.label}-${range}-${selectedCats.size}`}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 200, damping: 20 }}
            >
              <BrutalCard className="text-center py-6">
                <div className={`text-3xl font-black ${stat.color}`}>
                  <CountUp end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-brutal-black/50 mt-1 font-bold">{stat.label}</p>
              </BrutalCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 平均满意度 */}
      <ScrollReveal>
        <BrutalCard className="mb-8 p-6">
          <h2 className="font-black text-xl mb-4">平均满意度</h2>
          <div className="flex items-center gap-4">
            <span className="text-5xl">
              {EMOJI_RATINGS[Math.round(avgRating) - 1] || "😐"}
            </span>
            <div>
              <p className="text-3xl font-black">{avgRating.toFixed(1)} / 5</p>
              <p className="text-sm text-brutal-black/50">基于 {filtered.length} 篇日记</p>
            </div>
          </div>
        </BrutalCard>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <ScrollReveal delay={0.05}>
          <BrutalCard className="p-6 h-full">
            <h2 className="font-black text-xl mb-4">品类分布</h2>
            <CategoryChart data={categoryData} />
          </BrutalCard>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <BrutalCard className="p-6 h-full flex flex-col items-center justify-center">
            <h2 className="font-black text-xl mb-4">踩雷存钱罐</h2>
            <SavingsJar amount={savingsJar} />
            <p className="mt-4 text-sm text-brutal-black/50 text-center">
              这些钱本可以省下来...下次消费前先看看拔草日记吧！
            </p>
          </BrutalCard>
        </ScrollReveal>
      </div>

      {/* 雷达图 — 各品类多维评分 */}
      {radarData.length >= 3 && (
        <ScrollReveal>
          <BrutalCard className="p-6 mb-8">
            <h2 className="font-black text-xl mb-4">品类多维评分（雷达图）</h2>
            <p className="text-xs text-brutal-black/60 mb-4 font-bold">
              满意度 = 平均评分 × 20，理性度 = 值得购占比，丰富度 = 该品类日记量
            </p>
            <ResponsiveContainer width="100%" height={340}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#1A1A1A" strokeWidth={1.5} />
                <PolarAngleAxis dataKey="category" tick={{ fill: "#1A1A1A", fontWeight: 700, fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "#1A1A1A", fontSize: 10 }} />
                <Radar name="满意度" dataKey="satisfaction" stroke="#00FF66" fill="#00FF66" fillOpacity={0.5} strokeWidth={2.5} />
                <Radar name="理性度" dataKey="rationality" stroke="#FFE500" fill="#FFE500" fillOpacity={0.4} strokeWidth={2.5} />
                <Radar name="丰富度" dataKey="volume" stroke="#FF3B30" fill="#FF3B30" fillOpacity={0.3} strokeWidth={2.5} />
                <Legend wrapperStyle={{ fontWeight: 700 }} />
                <Tooltip
                  contentStyle={{
                    background: "#F5F5F0",
                    border: "3px solid #1A1A1A",
                    borderRadius: 0,
                    fontWeight: 700,
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </BrutalCard>
        </ScrollReveal>
      )}

      {/* 堆叠面积图 — 月度消费按品类 */}
      {monthlyByCat.length >= 2 && (
        <ScrollReveal>
          <BrutalCard className="p-6 mb-8">
            <h2 className="font-black text-xl mb-4">月度消费趋势（按品类堆叠）</h2>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={monthlyByCat}>
                <CartesianGrid stroke="#1A1A1A" strokeOpacity={0.15} />
                <XAxis dataKey="month" tick={{ fill: "#1A1A1A", fontWeight: 700, fontSize: 11 }} />
                <YAxis tick={{ fill: "#1A1A1A", fontWeight: 700, fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    background: "#F5F5F0",
                    border: "3px solid #1A1A1A",
                    borderRadius: 0,
                    fontWeight: 700,
                  }}
                />
                <Legend wrapperStyle={{ fontWeight: 700 }} />
                {usedCats.map((cat, i) => (
                  <Area
                    key={cat}
                    type="monotone"
                    dataKey={cat}
                    stackId="1"
                    stroke="#1A1A1A"
                    strokeWidth={2}
                    fill={STACK_COLORS[i % STACK_COLORS.length]}
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </BrutalCard>
        </ScrollReveal>
      )}

      {/* Verdict Breakdown */}
      <ScrollReveal>
        <BrutalCard className="p-6">
          <h2 className="font-black text-xl mb-4">购物判定分布</h2>
          <div className="flex gap-4">
            {(
              [
                ["worth", "值得买", "bg-primary", filtered.filter((d) => d.verdict === "worth").length],
                ["not-worth", "踩雷了", "bg-danger", filtered.filter((d) => d.verdict === "not-worth").length],
                ["neutral", "一般般", "bg-accent", filtered.filter((d) => d.verdict === "neutral").length],
              ] as const
            ).map(([, label, color, count]) => (
              <div key={label} className="flex-1 text-center">
                <div
                  className={`h-4 brutal-border ${color}`}
                  style={{
                    width: `${filtered.length ? (count / filtered.length) * 100 : 0}%`,
                    minWidth: "8px",
                    margin: "0 auto",
                  }}
                />
                <p className="font-black text-lg mt-2">{count}</p>
                <p className="text-xs text-brutal-black/50 font-bold">{label}</p>
              </div>
            ))}
          </div>
        </BrutalCard>
      </ScrollReveal>
    </div>
  );
}
