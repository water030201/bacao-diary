import { motion } from "framer-motion";
import BrutalCard from "../components/ui/BrutalCard";

const REVIEWS = [
  { name: "小明", avatar: "🧑", text: "终于有个地方记录我的购物翻车经历了！写了几篇日记后真的开始理性消费了。", rating: 5 },
  { name: "花花", avatar: "👩", text: "成就系统太有趣了，为了解锁徽章我写了好多日记哈哈，结果真的省了不少钱。", rating: 5 },
  { name: "阿杰", avatar: "👨", text: "界面风格很有个性！新粗野主义的设计让我每次打开都很有新鲜感。", rating: 4 },
  { name: "小鱼", avatar: "👧", text: "语音输入功能太方便了，买完东西直接对着手机说两句就能记录。", rating: 5 },
  { name: "老王", avatar: "🧔", text: "存钱罐功能扎心了...看到自己踩雷的总金额，下单前真的会三思。", rating: 4 },
  { name: "甜甜", avatar: "👩‍🦰", text: "统计页面的图表很直观，终于知道自己钱都花在哪了。", rating: 5 },
];

export default function ReviewsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-black mb-2">💬 用户评价</h1>
      <p className="text-brutal-black/50 mb-8">看看其他拔草人怎么说</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {REVIEWS.map((review, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <BrutalCard className="p-6 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{review.avatar}</span>
                <div>
                  <p className="font-black">{review.name}</p>
                  <p className="text-sm">{"⭐".repeat(review.rating)}</p>
                </div>
              </div>
              <p className="text-brutal-black/70 flex-1">"{review.text}"</p>
            </BrutalCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
