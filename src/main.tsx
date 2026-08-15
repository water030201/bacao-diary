import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { hydrateCache, getDiaries, saveDiary } from "./lib/storage";
import { cloudFetchAll } from "./lib/cloudSync";
import { isCloudEnabled } from "./lib/supabase";
import { SEED_DIARIES } from "./data/seed";
import "./index.css";

/**
 * 启动流程：
 * 1) 若开启云端 → 拉取所有公共日记 → hydrate 缓存（不再自动种入！）
 * 2) 若云端关闭 / 拉取失败 → 走 localStorage，本地无数据时注入种子
 * 3) 渲染 React
 *
 * 设计决策：
 * - 云端模式下"种子数据"由人工通过 Supabase Dashboard 或 SQL 一次性插入，
 *   前端**绝不**自动 upsert 种子，避免"删除后又自动复活"的死循环。
 * - 本地模式（未配 Supabase）保留种子注入便于本地开发演示。
 */

async function bootstrap() {
  if (isCloudEnabled) {
    const cloudData = await cloudFetchAll();
    if (cloudData) {
      // 拉到啥就用啥；为空就是真的为空（用户删完了）
      hydrateCache(cloudData);
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
  // 仅本地模式（无 Supabase）才注入种子，方便开发演示
  if (getDiaries().length === 0) {
    SEED_DIARIES.forEach(saveDiary);
  }
}

bootstrap();
