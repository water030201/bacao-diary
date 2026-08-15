import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Diary } from "../../types";
import { EMOJI_RATINGS } from "../../types";

interface Props {
  diary: Diary;
  index?: number;
}

const verdictLabel = {
  worth: { text: "已购买好物", bg: "bg-accent" },
  "not-worth": { text: "已购买踩坑", bg: "bg-accent" },
  neutral: { text: "未购买省钱", bg: "bg-brutal-white" },
};

const cardColors = {
  5: "bg-accent",       // yellow
  4: "bg-primary/40",   // light green
  3: "bg-primary",      // green
  2: "bg-pink/40",      // light pink
  1: "bg-pink",         // pink
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="brutal-border bg-brutal-white px-2 py-1 flex gap-0.5 text-sm">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= rating ? "text-brutal-black" : "text-brutal-black/20"}>
          {i <= rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}

export default function DiaryCard({ diary, index = 0 }: Props) {
  const verdict = verdictLabel[diary.verdict];
  const bgColor = cardColors[diary.rating as keyof typeof cardColors] || "bg-primary/40";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link to={`/diary/${diary.id}`}>
        <div className={`${bgColor} brutal-border brutal-shadow p-6 hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[7px_7px_0px_#1A1A1A] transition-all duration-150`}>
          {/* Top row: emoji + stars + verdict */}
          <div className="flex justify-between items-start mb-4">
            <span className="text-5xl">{EMOJI_RATINGS[diary.rating - 1]}</span>
            <div className="flex flex-col items-end gap-1">
              <StarRating rating={diary.rating} />
              <span className="brutal-border bg-brutal-white px-2 py-0.5 text-xs font-bold">
                {verdict.text}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-black text-2xl mb-3 text-brutal-black">{diary.title}</h3>

          {/* Quote */}
          <p className="text-brutal-black/70 mb-4 leading-relaxed">
            "{diary.experience}"
          </p>

          {/* Divider */}
          <div className="border-t-2 border-brutal-black/30 mb-3" />

          {/* Bottom: user + price */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 bg-brutal-black text-brutal-white rounded-full flex items-center justify-center text-xs font-bold">
                {diary.productCategory.charAt(0)}
              </span>
              <span className="font-bold text-sm text-brutal-black/70">@{diary.productName}</span>
            </div>
            <span className="font-black text-xl text-brutal-black">¥{diary.price}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
