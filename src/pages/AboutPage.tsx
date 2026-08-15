import { motion } from "framer-motion";
import BrutalCard from "../components/ui/BrutalCard";
import BrutalButton from "../components/ui/BrutalButton";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-black mb-8">🌿 关于拔草日记</h1>

        <BrutalCard className="p-8 mb-8">
          <h2 className="text-2xl font-black mb-4">我们的故事</h2>
          <div className="space-y-4 text-brutal-black/80 leading-relaxed">
            <p>
              在这个种草无处不在的时代，我们每天被无数的推荐和广告包围。
              小红书种草、直播带货、朋友推荐...消费冲动一个接一个。
            </p>
            <p>
              <strong>拔草日记</strong>诞生于一个简单的想法：如果我们能记录每一次购物体验，
              客观地复盘自己的消费决策，是不是就能做出更理性的选择？
            </p>
            <p>
              我们相信，真实的使用体验比任何广告都有价值。每一篇拔草日记，
              都是帮助自己和他人避开消费陷阱的宝贵记录。
            </p>
          </div>
        </BrutalCard>

        <BrutalCard className="p-8 mb-8 bg-primary">
          <h2 className="text-2xl font-black mb-4">我们的理念</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "🧠", title: "理性消费", desc: "用数据和记录取代冲动" },
              { icon: "💬", title: "真实分享", desc: "只说真话，拒绝软广" },
              { icon: "🤝", title: "互助避坑", desc: "一人踩雷，众人受益" },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="text-4xl mb-2">{item.icon}</div>
                <h3 className="font-black">{item.title}</h3>
                <p className="text-sm text-brutal-black/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </BrutalCard>

        <BrutalCard className="p-8">
          <h2 className="text-2xl font-black mb-4">项目信息</h2>
          <div className="space-y-2 text-brutal-black/70">
            <p><strong>项目名称：</strong>购物推广类网站《拔草日记》</p>
            <p><strong>院校：</strong>浙江水利水电学院 · 数字媒体技术</p>
            <p><strong>设计风格：</strong>新粗野主义（Neo-Brutalism）</p>
            <p><strong>技术栈：</strong>React + Tailwind CSS + framer-motion</p>
          </div>
          <div className="mt-6">
            <Link to="/contact">
              <BrutalButton variant="dark">联系我们 →</BrutalButton>
            </Link>
          </div>
        </BrutalCard>
      </motion.div>
    </div>
  );
}
