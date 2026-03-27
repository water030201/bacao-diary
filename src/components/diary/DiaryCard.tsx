import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Diary } from "../../types";
import { EMOJI_RATINGS } from "../../types";

interface Props {
  diary: Diary;
  index?: number;
}

const verdictLabel = {
  worth: { text: "值得买", color: "bg-primary text-brutal-black" },
  "not-worth": { text: "踩雷了", color: "bg-danger text-brutal-white" },
  neutral: { text: "一般般", color: "bg-accent text-brutal-black" },
};

export default function DiaryCard({ diary, index = 0 }: Props) {
  const verdict = verdictLabel[diary.verdict];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
    >
      <Link to={`/diary/${diary.id}`}>
        <div className="bg-brutal-white brutal-border brutal-shadow p-5 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1A1A1A] transition-all duration-150">
          <div className="flex justify-between items-start mb-2">
            <span className={`text-xs font-bold px-2 py-0.5 brutal-border ${verdict.color}`}>
              {verdict.text}
            </span>
            <span className="text-sm text-brutal-black/50">
              {new Date(diary.createdAt).toLocaleDateString("zh-CN")}
            </span>
          </div>
          <h3 className="font-black text-lg mb-1 line-clamp-2">{diary.title}</h3>
          <p className="text-sm text-brutal-black/60 mb-3 line-clamp-2">{diary.experience}</p>
          <div className="flex justify-between items-center">
            <span className="text-lg">{EMOJI_RATINGS[diary.rating - 1]}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-brutal-black/10 px-2 py-0.5 font-bold">{diary.productCategory}</span>
              <span className="font-black text-primary-dark">¥{diary.price}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
