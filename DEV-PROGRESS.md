# 拔草日记 — 开发进度文档

> 最后更新：2026-04-07（晚）
> 状态：**前端 + 视觉增强 + 主题化拔草特效 + 关灯主题 + Supabase 云端数据 + 移动端兼容修复 全部完成**

## 🔖 存档点 · 2026-04-07 晚（下次对话从这里继续）

### ✅ 本次会话已完成
- [x] Phase A：修复部署，从 Vercel 迁到 GitHub Pages（HashRouter）
- [x] Phase B：5 项交互增强（CustomCursor / ⌘K / ScrollProgress / ScrollReveal / StatsPage / three.js）
- [x] 关灯主题（clip-path 圆形扩散转场 + localStorage 持久化）
- [x] 主题化拔草特效（GrassBurst + GrassPullField + 写日记成功庆祝）
- [x] Supabase 云端集成（BaaS + Offline-First 三级数据流 + 哨兵 flag 防种子复活）
- [x] 暗色模式所有 bug 修复（Footer 变白 / 文字不可见 / 全部 6 个透明度变体）
- [x] 手机端关灯按钮可见性修复
- [x] iOS Safari 白屏修复（three.js 三层防御）
- [x] 手机端 three.js 视差增强（触摸 + Lissajous 自动巡航）
- [x] 暗色模式探照灯（Radial Spotlight）—— CSS radial-gradient + rAF 节流
- [x] 完整问题日志写入 `Supabase答疑与架构定位.md`（13 个问题 + 答辩 Q&A 模板）
- [x] 答辩用技术架构与创新点文档 `docs/技术架构与创新点.md`
- [x] commit + push 到 GitHub main（commit `1740ff3`）

### 🚧 待办（下次会话从这里开始）
1. **迁移托管到腾讯云 EdgeOne Pages** ⚠️ 高优先
   - 原因：github.io 在国内移动 5G 被间歇性阻断
   - 路径：注册 → 关联 GitHub → 配置 Vite 构建 → 配置 Supabase env vars → 部署
   - 5-10 分钟可完成
   - **不需要改任何代码**
2. 毕业论文撰写（≥8000字）
3. 答辩 PPT
4. 演示视频（3-5 分钟）

### 📁 关键文件速查
| 文件 | 作用 |
|---|---|
| `Supabase答疑与架构定位.md` | 项目根，含 13 个问题日志 + 答辩 Q&A |
| `docs/技术架构与创新点.md` | 答辩 / 论文用，含架构图 + 术语对照 |
| `docs/SUPABASE-SETUP.md` | Supabase 配置 6 步指南 |
| `docs/supabase-schema.sql` | 一键建库 SQL |
| `.env.local` | Supabase URL + key（已 gitignore） |

### 🔗 当前线上地址
- **GitHub Pages（电脑可用，手机 5G 不稳）**：https://water030201.github.io/bacao-diary/
- **GitHub 仓库**：https://github.com/water030201/bacao-diary

---

## 📦 2026-04-07 增强日志（应对导师"做复杂、写复杂"的反馈）

### 第一批：沉浸式交互层
| 增强 | 说明 | 文件 |
|---|---|---|
| 自定义鼠标 + 磁吸 | 弹簧跟随、混合差值、按钮磁吸 | `src/components/ui/CustomCursor.tsx` |
| 命令面板 ⌘K | 全局快捷键、模糊搜索、键盘导航跳转15页 | `src/components/ui/CommandPalette.tsx` |
| 滚动进度条 | 顶部 framer-motion useScroll 弹簧 | `src/components/ui/ScrollProgress.tsx` |
| 滚动揭示动画 | 通用包装器 useInView | `src/components/ui/ScrollReveal.tsx` |
| 统计页升级 | 时间/品类筛选 + 雷达图 + 堆叠面积图 | `src/pages/StatsPage.tsx`、`src/lib/stats.ts` |
| three.js 装饰背景 | 粒子场 + 旋转线框正二十面体 + 鼠标视差 | `src/components/ui/ThreeBackground.tsx` |

### 第二批：关灯主题
| 增强 | 说明 | 文件 |
|---|---|---|
| 暗色主题切换 | clip-path 圆形扩散转场 + localStorage 持久化 + prefers-color-scheme 感知 | `src/components/ui/ThemeToggle.tsx`、`src/index.css` |

### 第三批：主题化拔草特效
| 增强 | 说明 | 文件 |
|---|---|---|
| GrassBurst 草叶飞溅 | Canvas 物理粒子 + CustomEvent 全局总线 | `src/components/ui/GrassBurstLayer.tsx`、`src/lib/grassBurst.ts` |
| 互动空状态草地 | 8 棵草苗逐颗拔出 + 进度条 + 庆祝层 | `src/components/ui/GrassPullField.tsx` |
| 写日记成功庆祝 | 60 片草叶屏幕中央爆发 | `src/components/diary/DiaryForm.tsx` |

### 第四批：Supabase 云端公共数据
| 文件 | 作用 |
|---|---|
| `src/lib/supabase.ts` | 客户端，env 变量未配置自动返回 null（降级 LocalStorage） |
| `src/lib/cloudSync.ts` | 云端 CRUD 封装（fetchAll/upsert/delete），camelCase ↔ snake_case |
| `src/lib/storage.ts` | 改造为内存缓存 + 双写（本地 + 云端），保持同步 API 不变 |
| `src/main.tsx` | 启动时优先云端，失败降级本地；首次部署一次性注入种子（用 localStorage flag 防止复活） |
| `src/vite-env.d.ts` | Vite 环境变量 TS 类型 |
| `docs/supabase-schema.sql` | 数据库 schema（建表 + 索引 + RLS + 触发器） |
| `docs/SUPABASE-SETUP.md` | 6 步配置说明 |

**云端架构**：BaaS（Supabase Postgres + RLS）+ Offline-First（内存缓存 / LocalStorage / 云端 三级数据流）+ 透明降级。10 个业务页面零侵入。

### 部署
- **线上地址**：https://water030201.github.io/bacao-diary/（HashRouter，国内可访问）
- **数据库**：Supabase（Tokyo region），RLS 公共读写策略
- **部署命令**：`npm run deploy`（自动 build + 推 gh-pages 分支）

### 配套文档
- `docs/技术架构与创新点.md` — 答辩 / 论文用，含架构图 / 创新点 / 应答 Q&A / 术语对照
- `docs/SUPABASE-SETUP.md` — 云端配置 6 步指南
- `docs/supabase-schema.sql` — 一键建库 SQL

---

## 一、项目概况

| 项目 | 内容 |
|------|------|
| 名称 | 购物推广类网站《拔草日记》 |
| 性质 | 毕业设计（浙江水利水电学院 · 数字媒体技术） |
| 学生 | 路冰月（2022b49027） |
| 指导教师 | 秦胜伟（讲师） |
| 答辩时间 | 2026年4月28日-5月4日（第17周） |
| 论文要求 | 不少于8000字 |

## 二、产品定位

- **核心理念**：理性消费复盘 + 社区评价分享
- **目标用户**：18-28岁年轻白领/学生党
- **商业模式**：社区内容变现 + KOL带货
- **设计风格**：新粗野主义（Neo-Brutalism）— 粗犷边框、绿黑撞色、高对比度、Z世代叛逆感

## 三、设计风格定义

```
主色：#00FF66（荧光绿）
深绿：#0A6B35
撞色：绿 × 黑（#1A1A1A）为主
强调：#FFE500（黄）、#FF3B30（红）
背景：#F5F5F0（暖白）
边框：3px solid #1A1A1A
硬阴影：4px 4px 0px #1A1A1A（无模糊）
圆角：0px（brutalism特征）
字体：Inter（标题 bold 700+，正文 regular 400）
```

## 四、页面清单（15页）— 全部完成 ✅

| # | 页面 | 路由 | 状态 |
|---|------|------|------|
| 1 | 首页 | `/#/` | ✅ |
| 2 | 日记列表页 | `/#/diary` | ✅ |
| 3 | 写日记页 | `/#/diary/new` | ✅ |
| 4 | 日记详情页 | `/#/diary/:id` | ✅ |
| 5 | 统计分析页 | `/#/stats` | ✅ |
| 6 | 用户中心页 | `/#/user` | ✅ |
| 7 | 商品分类页 | `/#/category` | ✅ |
| 8 | 搜索结果页 | `/#/search` | ✅ |
| 9 | 成就展示页 | `/#/achievements` | ✅ |
| 10 | 服务介绍页 | `/#/service` | ✅ |
| 11 | 客户评价页 | `/#/reviews` | ✅ |
| 12 | 关于我们页 | `/#/about` | ✅ |
| 13 | 联系表单页 | `/#/contact` | ✅ |
| 14 | 语音交互引导页 | `/#/voice-guide` | ✅ |
| 15 | 404错误页 | `/#/*` | ✅ |

## 五、技术栈（已确定）

```
框架：      Vite + React 18 + TypeScript
样式：      Tailwind CSS
动效：      framer-motion
图表：      recharts
语音：      Web Speech API（浏览器原生）
路由：      react-router-dom（HashRouter）
存储：      LocalStorage（全站数据基础）
表单：      FormSubmit（免费，无需后端）
部署：      Vercel（自动部署，关联GitHub）
```

## 六、部署信息

- **GitHub 仓库**：https://github.com/water030201/bacao-diary
- **线上地址（GitHub Pages）**：https://water030201.github.io/bacao-diary/（国内可访问）
- **线上地址（Vercel）**：https://bacao-diary.vercel.app（国内被墙）
- **路由模式**：HashRouter（URL带 `/#/` 前缀）
- **部署方式**：gh-pages 分支部署到 GitHub Pages；Vercel 自动部署（备用）

## 七、交付物清单

- [x] 15页前端完整源代码（TypeScript零错误，生产构建通过）
- [x] 网站部署上线（Vercel）
- [x] **Figma高保真设计稿** — 使用 html.to.design 插件从线上网站导入，15页全部完成 ✅
  - [x] 首页已导入（1440/768/390三端）
  - [x] 写日记页已导入
  - [x] 统计分析页已导入
  - [x] 用户中心页已导入
  - [x] 成就展示页已导入
  - [x] 日记列表页、日记详情页、商品分类页、搜索结果页已导入
  - [x] 剩余P2页面（服务介绍/评价/关于/联系/语音/404）已导入
  - [x] **Figma整理** ✅：图层命名规范化、组件抽取、Auto Layout整理、设计规范页
- [x] Figma设计源文件（.fig）+ 设计规范 + 切图 ✅
- [ ] 毕业论文（≥8000字）
- [ ] 演示视频（3-5分钟）
- [ ] 答辩PPT
- [x] 测试报告 ✅（76条用例，docs/测试报告.md + docs/测试报告.docx）

## 八、时间线与当前进度

```
第1-2周   (1.6-1.19)   文献调研、需求分析、开题报告     ✅ 已完成
第3-4周   (1.20-2.2)   线框图、低保真原型               ✅ 已完成
第5-6周   (2.3-2.16)   高保真设计、设计规范、组件库      ✅ 已完成
第7-9周   (2.17-3.9)   项目架构、基础页面、路由          ✅ 已完成
第10-12周 (3.10-3.30)  核心功能开发                     ✅ 已完成（3.27代码全部完成）
第13-14周 (3.31-4.13)  Figma设计稿、测试报告、优化       ✅ 已完成（测试报告✅，Figma整理✅）
第15-16周 (4.14-4.27)  论文撰写、答辩PPT                ⬜
第17周    (4.28-5.4)   答辩                             ⬜
```

## 九、Figma设计稿方案

- 使用 **html.to.design** Figma插件从线上网站直接导入
- 免费版每月15次导入，每次导入生成3个尺寸（1440px/768px/390px）
- 导入设置：Autolayout ✅、Create styles & variables ✅、HTML layer names ✅、Add hyperlinks ✅
- 核心页面（P0+P1共10页）用插件导入，P2简单页面用截图+手动搭建
- 导入后需手动整理：图层重命名、抽取组件、补充Auto Layout

## 十、下一步待办（按优先级）

1. ~~完成Figma设计稿导入~~ ✅（15页全部导入完成）
2. ~~Figma整理~~ ✅（图层重命名、抽取组件、Auto Layout、设计规范页）
3. ~~测试报告~~ ✅（已生成，76条用例，Word文档已导出）
4. **毕业论文初稿**（≥8000字）← 当前
5. **答辩PPT**
6. **演示视频录制**

---

## 如何继续开发

> **给AI的快速上下文提示**：
>
> 这是毕设项目《拔草日记》，购物推广网站，新粗野主义风格（绿黑撞色/粗边框/硬阴影）。
> 15页全响应式已全部完成，Vite+React+TypeScript+Tailwind，已部署到Vercel。
> GitHub: https://github.com/water030201/bacao-diary
> 线上（GitHub Pages）: https://water030201.github.io/bacao-diary/（国内可访问）
> 线上（Vercel备用）: https://bacao-diary.vercel.app（国内被墙）
> 当前阶段：论文撰写 → 答辩PPT → 演示视频。
> 请阅读本文件了解完整上下文后继续任务。
