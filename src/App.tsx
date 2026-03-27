import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/layout/Layout";
import { getDiaries, saveDiary } from "./lib/storage";
import { SEED_DIARIES } from "./data/seed";

import HomePage from "./pages/HomePage";
import DiaryListPage from "./pages/DiaryListPage";
import WriteDiaryPage from "./pages/WriteDiaryPage";
import DiaryDetailPage from "./pages/DiaryDetailPage";
import StatsPage from "./pages/StatsPage";

function Placeholder({ name }: { name: string }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-5xl font-black mb-4">{name}</h1>
      <p className="text-brutal-black/60">页面建设中...</p>
    </div>
  );
}

function SeedLoader({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (getDiaries().length === 0) {
      SEED_DIARIES.forEach(saveDiary);
    }
  }, []);
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <SeedLoader>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/diary" element={<DiaryListPage />} />
            <Route path="/diary/new" element={<WriteDiaryPage />} />
            <Route path="/diary/:id" element={<DiaryDetailPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/user" element={<Placeholder name="用户中心" />} />
            <Route path="/category" element={<Placeholder name="商品分类" />} />
            <Route path="/search" element={<Placeholder name="搜索结果" />} />
            <Route path="/achievements" element={<Placeholder name="成就展示" />} />
            <Route path="/service" element={<Placeholder name="服务介绍" />} />
            <Route path="/reviews" element={<Placeholder name="客户评价" />} />
            <Route path="/about" element={<Placeholder name="关于我们" />} />
            <Route path="/contact" element={<Placeholder name="联系表单" />} />
            <Route path="/voice-guide" element={<Placeholder name="语音交互" />} />
            <Route path="*" element={<Placeholder name="404 - 页面走丢了" />} />
          </Routes>
        </Layout>
      </SeedLoader>
    </BrowserRouter>
  );
}
