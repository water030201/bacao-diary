import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import BrutalButton from "../components/ui/BrutalButton";
import EmojiRating from "../components/ui/EmojiRating";
import { getDiary, deleteDiary } from "../lib/storage";

const verdictDisplay = {
  worth: { text: "✅ 值得买", color: "bg-primary" },
  "not-worth": { text: "❌ 踩雷了", color: "bg-danger text-brutal-white" },
  neutral: { text: "😐 一般般", color: "bg-accent" },
};

export default function DiaryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const diary = getDiary(id!);

  if (!diary) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-6xl mb-4">📭</p>
        <h1 className="text-3xl font-black mb-4">日记不存在</h1>
        <Link to="/diary">
          <BrutalButton>返回日记列表</BrutalButton>
        </Link>
      </div>
    );
  }

  const verdict = verdictDisplay[diary.verdict];

  function handleDelete() {
    if (confirm("确定删除这篇日记吗？")) {
      deleteDiary(diary!.id);
      navigate("/diary");
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="brutal-border bg-brutal-white brutal-shadow"
      >
        {/* Header */}
        <div className="p-6 border-b-3 border-brutal-black">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`px-3 py-1 font-bold text-sm brutal-border ${verdict.color}`}>
              {verdict.text}
            </span>
            <span className="px-3 py-1 font-bold text-sm brutal-border bg-brutal-black/5">
              {diary.productCategory}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-2">{diary.title}</h1>
          <p className="text-brutal-black/50 text-sm">
            {new Date(diary.createdAt).toLocaleDateString("zh-CN", {
              year: "numeric", month: "long", day: "numeric",
            })}
          </p>
        </div>

        {/* Product Info */}
        <div className="p-6 border-b-3 border-brutal-black bg-brutal-black/3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-brutal-black/50 font-bold">商品</p>
              <p className="font-black text-lg">{diary.productName}</p>
            </div>
            <div>
              <p className="text-sm text-brutal-black/50 font-bold">价格</p>
              <p className="font-black text-lg text-primary-dark">¥{diary.price}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-brutal-black/50 font-bold mb-1">评分</p>
            <EmojiRating value={diary.rating} readonly size="md" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div>
            <h2 className="font-black text-xl mb-2 flex items-center gap-2">
              <span className="bg-accent px-2 brutal-border">购买动机</span>
            </h2>
            <p className="text-brutal-black/80 leading-relaxed">{diary.reason}</p>
          </div>
          <div>
            <h2 className="font-black text-xl mb-2 flex items-center gap-2">
              <span className="bg-primary px-2 brutal-border">使用体验</span>
            </h2>
            <p className="text-brutal-black/80 leading-relaxed">{diary.experience}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t-3 border-brutal-black flex gap-3 flex-wrap">
          <BrutalButton variant="danger" onClick={handleDelete}>删除 🗑️</BrutalButton>
          <Link to="/diary" className="ml-auto">
            <BrutalButton variant="dark">返回列表 ←</BrutalButton>
          </Link>
        </div>
      </motion.article>
    </div>
  );
}
