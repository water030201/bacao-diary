import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import DiaryCard from "../components/diary/DiaryCard";
import BrutalButton from "../components/ui/BrutalButton";
import BrutalInput from "../components/ui/BrutalInput";
import { getDiaries } from "../lib/storage";
import { CATEGORIES } from "../types";
import type { ProductCategory } from "../types";

type SortOption = "newest" | "oldest" | "price-high" | "price-low" | "rating-high";

export default function DiaryListPage() {
  const allDiaries = getDiaries();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ProductCategory | "全部">("全部");
  const [sort, setSort] = useState<SortOption>("newest");
  const [verdict, setVerdict] = useState<"all" | "worth" | "not-worth" | "neutral">("all");

  const filtered = useMemo(() => {
    let result = [...allDiaries];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.productName.toLowerCase().includes(q) ||
          d.experience.toLowerCase().includes(q)
      );
    }

    if (category !== "全部") {
      result = result.filter((d) => d.productCategory === category);
    }

    if (verdict !== "all") {
      result = result.filter((d) => d.verdict === verdict);
    }

    switch (sort) {
      case "newest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "rating-high":
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [allDiaries, search, category, sort, verdict]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-black">📝 拔草日记</h1>
        <Link to="/diary/new">
          <BrutalButton>写日记 +</BrutalButton>
        </Link>
      </div>

      {/* Filters */}
      <div className="brutal-border bg-brutal-white p-4 mb-8 space-y-4">
        <BrutalInput
          placeholder="搜索日记、商品..."
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        />
        <div className="flex flex-wrap gap-2">
          {["全部", ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat as ProductCategory | "全部")}
              className={`px-3 py-1 text-sm font-bold brutal-border cursor-pointer transition-colors ${
                category === cat ? "bg-primary text-brutal-black" : "bg-brutal-white text-brutal-black hover:bg-brutal-black/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-bold">评价：</span>
          {([["all", "全部"], ["worth", "值得"], ["not-worth", "踩雷"], ["neutral", "一般"]] as const).map(([val, label]) => (
            <button
              key={val}
              onClick={() => setVerdict(val)}
              className={`px-3 py-1 text-sm font-bold brutal-border cursor-pointer ${
                verdict === val ? "bg-brutal-black text-brutal-white" : "bg-brutal-white"
              }`}
            >
              {label}
            </button>
          ))}
          <span className="ml-auto text-sm font-bold">排序：</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="brutal-border bg-brutal-white px-2 py-1 text-sm font-bold cursor-pointer"
          >
            <option value="newest">最新</option>
            <option value="oldest">最早</option>
            <option value="price-high">价格高→低</option>
            <option value="price-low">价格低→高</option>
            <option value="rating-high">评分最高</option>
          </select>
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-6xl mb-4">🔍</p>
          <p className="text-xl font-bold text-brutal-black/50">没有找到相关日记</p>
          <Link to="/diary/new" className="inline-block mt-4">
            <BrutalButton variant="dark">写第一篇 ✍️</BrutalButton>
          </Link>
        </div>
      ) : (
        <>
          <p className="text-sm text-brutal-black/50 mb-4 font-bold">共 {filtered.length} 篇日记</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((diary, i) => (
              <DiaryCard key={diary.id} diary={diary} index={i} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
