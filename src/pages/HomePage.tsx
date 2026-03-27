import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import BrutalButton from "../components/ui/BrutalButton";
import BrutalCard from "../components/ui/BrutalCard";
import InfiniteMarquee from "../components/ui/InfiniteMarquee";
import DiaryCard from "../components/diary/DiaryCard";
import CountUp from "../components/ui/CountUp";
import { getDiaries } from "../lib/storage";
import { calcTotalSpent, calcRationalIndex, calcSavingsJar } from "../lib/stats";

const SLOGANS = [
  "🌿 理性消费",
  "💸 拒绝冲动",
  "🧠 用脑购物",
  "📝 记录真实体验",
  "🚫 拒绝智商税",
  "✅ 只买对的",
  "🔍 先看评价再下单",
  "💪 做消费的主人",
];

export default function HomePage() {
  const diaries = getDiaries();
  const rationalIndex = calcRationalIndex(diaries);
  const savingsJar = calcSavingsJar(diaries);
  const recentDiaries = diaries.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary brutal-border border-t-0 border-x-0">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-brutal-black leading-tight mb-4"
          >
            买前三思<br />
            <span className="text-brutal-white bg-brutal-black px-3 inline-block mt-2">拔草有理</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-brutal-black/70 mb-8 max-w-lg"
          >
            记录每一次购物体验，用真实评价帮你和朋友避开消费陷阱。
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4 flex-wrap"
          >
            <Link to="/diary/new">
              <BrutalButton variant="dark" size="lg">开始记录 ✍️</BrutalButton>
            </Link>
            <Link to="/diary">
              <BrutalButton variant="outline" size="lg">浏览日记 📖</BrutalButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Infinite Marquee */}
      <InfiniteMarquee speed={25}>
        {SLOGANS.map((s, i) => (
          <span key={i} className="text-primary font-black text-lg mx-4">
            {s}
          </span>
        ))}
      </InfiniteMarquee>

      {/* Stats Overview */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-black mb-8">📊 社区数据</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BrutalCard className="text-center py-8">
            <div className="text-4xl font-black text-primary-dark">
              <CountUp end={diaries.length} suffix=" 篇" />
            </div>
            <p className="text-brutal-black/60 mt-2 font-bold">拔草日记</p>
          </BrutalCard>
          <BrutalCard className="text-center py-8">
            <div className="text-4xl font-black text-primary-dark">
              <CountUp end={rationalIndex} suffix="%" />
            </div>
            <p className="text-brutal-black/60 mt-2 font-bold">理智指数</p>
          </BrutalCard>
          <BrutalCard className="text-center py-8">
            <div className="text-4xl font-black text-danger">
              <CountUp end={savingsJar} prefix="¥" />
            </div>
            <p className="text-brutal-black/60 mt-2 font-bold">踩雷总额 (本可省下)</p>
          </BrutalCard>
        </div>
      </section>

      {/* Recent Diaries */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-black">🔥 最新日记</h2>
          <Link to="/diary">
            <BrutalButton variant="outline" size="sm">查看全部 →</BrutalButton>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentDiaries.map((diary, i) => (
            <DiaryCard key={diary.id} diary={diary} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brutal-black">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
            别再被种草了，来拔草吧！
          </h2>
          <p className="text-brutal-white/60 mb-8">记录你的真实购物体验，帮助更多人理性消费</p>
          <Link to="/diary/new">
            <BrutalButton variant="primary" size="lg">写第一篇日记 🌿</BrutalButton>
          </Link>
        </div>
      </section>
    </div>
  );
}
