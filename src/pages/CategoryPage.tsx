import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import BrutalCard from "../components/ui/BrutalCard";
import Icon from "../components/ui/Icon";
import type { IconName } from "../components/ui/Icon";
import { CATEGORIES } from "../types";
import { getDiaries } from "../lib/storage";

const CATEGORY_ICONS: Record<string, IconName> = {
  "数码": "phone", "美妆": "lipstick", "服饰": "shirt", "美食": "food",
  "家居": "home", "图书": "book", "运动": "run", "其他": "box",
};

export default function CategoryPage() {
  const diaries = getDiaries();

  const categoryStats = CATEGORIES.map((cat) => {
    const items = diaries.filter((d) => d.productCategory === cat);
    const total = items.reduce((s, d) => s + d.price, 0);
    return { name: cat, icon: CATEGORY_ICONS[cat], count: items.length, total };
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-black mb-8"><Icon name="folder" size={28} className="inline-block" /> 商品分类</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categoryStats.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link to={`/diary?category=${cat.name}`}>
              <BrutalCard hover className="p-6 text-center">
                <div className="text-4xl mb-2"><Icon name={cat.icon} size={36} /></div>
                <h3 className="font-black text-lg">{cat.name}</h3>
                <p className="text-sm text-brutal-black/50 mt-1">{cat.count} 篇日记</p>
                <p className="text-sm font-bold text-primary-dark mt-1">¥{cat.total}</p>
              </BrutalCard>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
