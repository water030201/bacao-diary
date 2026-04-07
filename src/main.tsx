import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { hydrateCache, getDiaries, saveDiary } from "./lib/storage";
import { cloudFetchAll, cloudUpsert } from "./lib/cloudSync";
import { isCloudEnabled } from "./lib/supabase";
import { SEED_DIARIES } from "./data/seed";
import "./index.css";

/**
 * 启动流程：
 * 1) 若开启云端 → 拉取所有公共日记 → hydrate 缓存
 * 2) 若云端为空 → 把种子数据上传到云端（首次部署初始化）
 * 3) 若云端关闭 / 拉取失败 → 走 localStorage，没数据就注入种子
 * 4) 渲染 React
 *
 * 用顶层 await 等待云端响应，确保首屏就有数据。
 */

// 哨兵 ID：标记云端是否已经种过种子。
// 只要这条记录存在过（即使被删），localStorage 标志位就会防止再次注入。
const SEEDED_FLAG_KEY = "bacao_cloud_seeded";

async function bootstrap() {
  if (isCloudEnabled) {
    const cloudData = await cloudFetchAll();
    if (cloudData) {
      const alreadySeeded = localStorage.getItem(SEEDED_FLAG_KEY) === "1";
      if (cloudData.length === 0 && !alreadySeeded) {
        // 真·首次部署：云端为空 + 本地未标记 → 一次性注入种子
        console.info("[启动] 首次初始化，正在注入种子数据到云端...");
        await Promise.all(SEED_DIARIES.map((d) => cloudUpsert(d)));
        localStorage.setItem(SEEDED_FLAG_KEY, "1");
        hydrateCache(SEED_DIARIES);
      } else {
        // 拉到啥就用啥；用户主动删除的日记不再被复活
        if (cloudData.length > 0) localStorage.setItem(SEEDED_FLAG_KEY, "1");
        hydrateCache(cloudData);
      }
    } else {
      // 云端拉取失败 → 降级
      fallbackLocal();
    }
  } else {
    fallbackLocal();
  }

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

function fallbackLocal() {
  // 让 storage.ts 自己从 localStorage 加载（getDiaries 会触发 ensureCache）
  if (getDiaries().length === 0) {
    SEED_DIARIES.forEach(saveDiary);
  }
}

bootstrap();
