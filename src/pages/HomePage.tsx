import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import BrutalButton from "../components/ui/BrutalButton";
import BrutalCard from "../components/ui/BrutalCard";
import InfiniteMarquee from "../components/ui/InfiniteMarquee";
import CountUp from "../components/ui/CountUp";
import Accordion from "../components/ui/Accordion";
import DiaryCard from "../components/diary/DiaryCard";
import Icon from "../components/ui/Icon";
import { getDiaries } from "../lib/storage";
import { calcRationalIndex, calcSavingsJar } from "../lib/stats";

const SLOGANS = [
  { icon: "leaf" as const, text: "理性消费" },
  { icon: "money" as const, text: "拒绝冲动" },
  { icon: "brain" as const, text: "用脑购物" },
  { icon: "notepad" as const, text: "记录真实体验" },
  { icon: "ban" as const, text: "拒绝智商税" },
  { icon: "check" as const, text: "只买对的" },
  { icon: "search" as const, text: "先看评价再下单" },
  { icon: "muscle" as const, text: "做消费的主人" },
];

const FAQ_ITEMS = [
  { title: "拔草日记是什么？", content: "拔草日记是一个帮助你记录和复盘购物体验的平台。每次消费后，写下真实感受，帮助自己和他人做出更理性的消费决策。" },
  { title: "数据存在哪里？安全吗？", content: "所有数据存储在你的浏览器本地（LocalStorage），不会上传到任何服务器。你的消费隐私完全由你掌控。" },
  { title: "我可以发种草内容吗？", content: "当然可以！拔草日记不仅记录踩雷，也欢迎分享真正好用的商品。真实体验才是最有价值的内容。" },
];

export default function HomePage() {
  const diaries = getDiaries();
  const recentDiaries = diaries.slice(0, 4);
  const rationalIndex = calcRationalIndex(diaries);
  const savingsJar = calcSavingsJar(diaries);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-brutal-white">
        <div className="max-w-3xl mx-auto px-4 py-20 md:py-28 text-center">
          {/* Yellow badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-8"
          >
            <span className="bg-accent brutal-border px-5 py-2 font-black text-sm inline-flex items-center gap-2">
              <Icon name="zap" size={18} /> 已有 23,456 人在这里避坑
            </span>
          </motion.div>

          {/* Giant headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-brutal-black leading-[1.1] mb-6"
          >
            冲动消费
            <br />
            <span className="relative inline-block mt-2">
              <span className="relative z-10 bg-brutal-black text-brutal-white px-4 py-1 -rotate-2 inline-block shadow-[6px_6px_0px_#00FF66]">的照妖镜</span>
            </span>
          </motion.h1>

          {/* Subtitle with green left bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-lg mx-auto mb-10"
          >
            <p className="border-l-4 border-primary pl-4 text-lg text-brutal-black/70 text-left leading-relaxed">
              拒绝无脑种草，看真实的拔草日记。
              <br />
              我们用真实体验帮你省下每一分钱。
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Link to="/diary/new">
              <BrutalButton variant="primary" size="lg">写日记吐槽 <Icon name="pencil" size={18} /></BrutalButton>
            </Link>
            <Link to="/diary">
              <BrutalButton variant="outline" size="lg">随便逛逛 →</BrutalButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Infinite Marquee — 避坑宣言 */}
      <InfiniteMarquee speed={25}>
        {SLOGANS.map((s, i) => (
          <span key={i} className="text-brutal-black font-black text-lg mx-4 inline-flex items-center gap-1.5">
            <Icon name={s.icon} size={18} />
            {s.text}
          </span>
        ))}
      </InfiniteMarquee>

      {/* Stats Overview */}
      <section className="max-w-3xl mx-auto px-4 py-12">
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
            <p className="text-brutal-black/60 mt-2 font-bold">踩雷总额</p>
          </BrutalCard>
        </div>
      </section>

      {/* Recent Diaries */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-black inline-flex items-center gap-2"><Icon name="fire" size={28} /> 最新日记</h2>
          <Link to="/diary" className="font-bold text-brutal-black/50 hover:text-brutal-black transition-colors">
            查看全部 →
          </Link>
        </div>
        <div className="space-y-8">
          {recentDiaries.map((diary, i) => (
            <DiaryCard key={diary.id} diary={diary} index={i} />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-4xl md:text-5xl font-black mb-10 text-center">常见问题</h2>
        <Accordion items={FAQ_ITEMS} />
      </section>

      {/* CTA - Pink */}
      <section className="bg-pink border-y-[3px] border-brutal-black">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-brutal-black mb-8">
            准备好拔草了吗？
          </h2>
          <Link to="/diary/new">
            <button className="bg-brutal-white brutal-border px-8 py-3 font-black text-lg cursor-pointer brutal-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all inline-flex items-center gap-2 rounded-lg">
              <Icon name="pencil" size={20} /> 立刻发布
            </button>
          </Link>
        </div>
      </section>

      {/* White spacer between pink CTA and footer */}
      <section className="bg-brutal-white h-20" />

      {/* Floating mic button */}
      <Link
        to="/voice-guide"
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary rounded-full brutal-border brutal-shadow flex items-center justify-center text-2xl z-50 hover:scale-110 transition-transform cursor-pointer"
      >
        <Icon name="mic" size={24} />
      </Link>
    </div>
  );
}
