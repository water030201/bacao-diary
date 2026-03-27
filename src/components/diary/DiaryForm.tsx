import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BrutalButton from "../ui/BrutalButton";
import BrutalInput from "../ui/BrutalInput";
import EmojiRating from "../ui/EmojiRating";
import { CATEGORIES } from "../../types";
import type { Diary, ProductCategory } from "../../types";
import { saveDiary } from "../../lib/storage";

interface Props {
  initial?: Diary;
}

export default function DiaryForm({ initial }: Props) {
  const navigate = useNavigate();
  const isEdit = !!initial;

  const [title, setTitle] = useState(initial?.title || "");
  const [productName, setProductName] = useState(initial?.productName || "");
  const [productCategory, setProductCategory] = useState<ProductCategory>(initial?.productCategory as ProductCategory || "其他");
  const [price, setPrice] = useState(initial?.price?.toString() || "");
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5>(initial?.rating || 3);
  const [reason, setReason] = useState(initial?.reason || "");
  const [experience, setExperience] = useState(initial?.experience || "");
  const [verdict, setVerdict] = useState<"worth" | "not-worth" | "neutral">(initial?.verdict || "neutral");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const diary: Diary = {
      id: initial?.id || `diary-${Date.now()}`,
      title,
      productName,
      productCategory,
      price: parseFloat(price) || 0,
      rating,
      reason,
      experience,
      verdict,
      createdAt: initial?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveDiary(diary);
    navigate(`/diary/${diary.id}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <BrutalInput
        label="日记标题"
        placeholder="给这篇拔草日记起个名字..."
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BrutalInput
          label="商品名称"
          placeholder="你买了什么？"
          value={productName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProductName(e.target.value)}
          required
        />
        <BrutalInput
          label="花了多少钱"
          type="number"
          placeholder="0.00"
          value={price}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="font-bold text-sm text-brutal-black block mb-2">商品分类</label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setProductCategory(cat)}
              className={`px-3 py-1.5 text-sm font-bold brutal-border cursor-pointer transition-colors ${
                productCategory === cat ? "bg-primary text-brutal-black" : "bg-brutal-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="font-bold text-sm text-brutal-black block mb-2">你的评分</label>
        <EmojiRating value={rating} onChange={setRating} size="lg" />
      </div>

      <BrutalInput
        label="为什么买？（购买动机）"
        multiline
        placeholder="是被种草了？还是刚好需要？"
        value={reason}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReason(e.target.value)}
        required
      />

      <BrutalInput
        label="使用体验"
        multiline
        placeholder="真实感受，好的坏的都说说..."
        value={experience}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setExperience(e.target.value)}
        required
      />

      <div>
        <label className="font-bold text-sm text-brutal-black block mb-2">最终判定</label>
        <div className="flex gap-3">
          {([
            ["worth", "✅ 值得买", "bg-primary"],
            ["not-worth", "❌ 踩雷了", "bg-danger text-brutal-white"],
            ["neutral", "😐 一般般", "bg-accent"],
          ] as const).map(([val, label, activeColor]) => (
            <button
              key={val}
              type="button"
              onClick={() => setVerdict(val)}
              className={`px-4 py-2 font-bold brutal-border cursor-pointer transition-colors ${
                verdict === val ? activeColor : "bg-brutal-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <BrutalButton type="submit" variant="dark" size="lg">
          {isEdit ? "保存修改" : "发布日记"} 🚀
        </BrutalButton>
        <BrutalButton type="button" variant="outline" size="lg" onClick={() => navigate(-1)}>
          取消
        </BrutalButton>
      </div>
    </form>
  );
}
