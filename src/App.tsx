import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/layout/Layout";
import { getDiaries, saveDiary } from "./lib/storage";
import { SEED_DIARIES } from "./data/seed";

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
            <Route path="/" element={<Placeholder name="首页" />} />
            <Route path="/diary" element={<Placeholder name="日记列表" />} />
            <Route path="/diary/new" element={<Placeholder name="写日记" />} />
            <Route path="/diary/:id" element={<Placeholder name="日记详情" />} />
            <Route path="/stats" element={<Placeholder name="统计分析" />} />
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
