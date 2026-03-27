import { motion } from "framer-motion";
import BrutalCard from "../components/ui/BrutalCard";
import Accordion from "../components/ui/Accordion";
import BrutalButton from "../components/ui/BrutalButton";
import Icon from "../components/ui/Icon";
import type { IconName } from "../components/ui/Icon";
import { Link } from "react-router-dom";

const FEATURES: { icon: IconName; title: string; desc: string }[] = [
  { icon: "notepad", title: "拔草日记", desc: "记录每次购物的真实体验，包括评分、动机和使用感受" },
  { icon: "chart", title: "消费统计", desc: "可视化你的消费数据，了解花钱习惯" },
  { icon: "trophy", title: "成就系统", desc: "游戏化体验，解锁消费达人成就" },
  { icon: "search", title: "智能搜索", desc: "快速找到你关心的商品评价" },
  { icon: "mic", title: "语音交互", desc: "动口不动手，语音输入消费记录" },
  { icon: "money", title: "存钱罐", desc: "统计踩雷金额，提醒自己理性消费" },
];

const FAQ_ITEMS = [
  { title: "拔草日记是什么？", content: "拔草日记是一个帮助你记录和复盘购物体验的平台。每次消费后，写下真实感受，帮助自己和他人做出更理性的消费决策。" },
  { title: "数据存在哪里？安全吗？", content: "所有数据存储在你的浏览器本地（LocalStorage），不会上传到任何服务器。你的消费隐私完全由你掌控。" },
  { title: "怎么开始使用？", content: "点击「写日记」按钮，填写商品名称、价格、你的评分和使用体验，选择「值得买」「踩雷了」或「一般般」，点击发布即可！" },
  { title: "成就系统怎么玩？", content: "持续记录消费日记，系统会根据你的行为自动解锁成就徽章。比如写满5篇日记解锁「拔草达人」，发现3个踩雷商品解锁「排雷专家」等。" },
  { title: "支持哪些浏览器？", content: "推荐使用 Chrome 浏览器以获得最佳体验（包括语音功能）。Safari、Firefox、Edge 也支持基本功能。" },
];

export default function ServiceIntroPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-black mb-2"><Icon name="leaf" size={28} className="inline-block" /> 服务介绍</h1>
      <p className="text-brutal-black/50 mb-12 text-lg">了解拔草日记能为你做什么</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <BrutalCard className="p-6 text-center h-full">
              <div className="text-4xl mb-3"><Icon name={f.icon} size={36} /></div>
              <h3 className="font-black text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-brutal-black/60">{f.desc}</p>
            </BrutalCard>
          </motion.div>
        ))}
      </div>

      <h2 className="text-3xl font-black mb-6">❓ 常见问题</h2>
      <Accordion items={FAQ_ITEMS} />

      <div className="text-center mt-12">
        <Link to="/diary/new">
          <BrutalButton variant="dark" size="lg">立即开始记录 <Icon name="rocket" size={18} className="inline-block" /></BrutalButton>
        </Link>
      </div>
    </div>
  );
}
