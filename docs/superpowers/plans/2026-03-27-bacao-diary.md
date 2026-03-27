# 拔草日记 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 15-page responsive shopping review website "拔草日记" with Neo-Brutalism design, LocalStorage persistence, and framer-motion animations.

**Architecture:** Vite + React SPA with react-router for routing, Tailwind CSS for styling, framer-motion for animations, recharts for charts, and LocalStorage for all data persistence. No backend — form submission via FormSubmit. The app uses a component-based architecture with shared UI primitives (BrutalCard, BrutalButton, etc.) that enforce the Neo-Brutalism design system.

**Tech Stack:** Vite, React 18, TypeScript, Tailwind CSS, framer-motion, recharts, react-router-dom, Web Speech API

---

## Design Tokens

```
Colors:
  --color-primary:    #00FF66  (亮绿)
  --color-primary-dark: #0A6B35 (深绿)
  --color-black:      #1A1A1A
  --color-white:      #F5F5F0  (暖白)
  --color-accent:     #FFE500  (强调黄)
  --color-danger:     #FF3B30  (红)
  --color-shadow:     #1A1A1A  (硬阴影色)

Border:     3px solid #1A1A1A
Shadow:     4px 4px 0px #1A1A1A (硬阴影, 无模糊)
Radius:     0px (brutalism)
Font:       "Inter" (标题 bold 700+, 正文 regular 400)
```

---

## File Structure

```
src/
├── main.tsx                    # Entry point
├── App.tsx                     # Router setup
├── index.css                   # Tailwind directives + design tokens
├── types.ts                    # All TypeScript types
├── lib/
│   ├── storage.ts              # LocalStorage CRUD operations
│   └── stats.ts                # Statistics calculation logic
├── hooks/
│   ├── useLocalStorage.ts      # Generic localStorage hook
│   └── useSpeech.ts            # Web Speech API hook
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Navigation header
│   │   ├── Footer.tsx          # Site footer
│   │   └── Layout.tsx          # Page layout wrapper
│   ├── ui/
│   │   ├── BrutalButton.tsx    # Neo-brutalism button
│   │   ├── BrutalCard.tsx      # Neo-brutalism card
│   │   ├── BrutalInput.tsx     # Neo-brutalism input/textarea
│   │   ├── EmojiRating.tsx     # Emoji score picker (😡😕😐😊🤩)
│   │   ├── Accordion.tsx       # Collapsible accordion
│   │   ├── CountUp.tsx         # Number counting animation
│   │   └── InfiniteMarquee.tsx # Horizontal infinite scroll
│   ├── diary/
│   │   ├── DiaryCard.tsx       # Diary list item card
│   │   └── DiaryForm.tsx       # Create/edit diary form
│   └── stats/
│       ├── SavingsJar.tsx      # SVG savings jar visualization
│       └── CategoryChart.tsx   # Recharts pie/bar chart
├── pages/
│   ├── HomePage.tsx            # P0: 首页
│   ├── DiaryListPage.tsx       # P0: 日记列表页
│   ├── WriteDiaryPage.tsx      # P0: 写日记页
│   ├── DiaryDetailPage.tsx     # P0: 日记详情页
│   ├── StatsPage.tsx           # P0: 统计分析页
│   ├── UserCenterPage.tsx      # P1: 用户中心页
│   ├── CategoryPage.tsx        # P1: 商品分类页
│   ├── SearchResultPage.tsx    # P1: 搜索结果页
│   ├── AchievementPage.tsx     # P1: 成就展示页
│   ├── ServiceIntroPage.tsx    # P1: 服务介绍页
│   ├── ReviewsPage.tsx         # P2: 客户评价页
│   ├── AboutPage.tsx           # P2: 关于我们页
│   ├── ContactPage.tsx         # P2: 联系表单页
│   ├── VoiceGuidePage.tsx      # P2: 语音交互引导页
│   └── NotFoundPage.tsx        # P2: 404错误页
└── data/
    └── seed.ts                 # Demo seed data for showcase
```

---

## Task 1: Project Initialization

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tailwind.config.js`, `postcss.config.js`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`

- [ ] **Step 1: Scaffold Vite + React + TypeScript project**

```bash
cd "C:/Users/15507/Desktop/小饼🍪/拔草计划"
npm create vite@latest . -- --template react-ts
```

If the directory is not empty, say yes to proceed (it only has docs and DEV-PROGRESS.md).

- [ ] **Step 2: Install dependencies**

```bash
npm install react-router-dom framer-motion recharts
npm install -D tailwindcss @tailwindcss/vite
```

- [ ] **Step 3: Configure Tailwind via Vite plugin**

Replace `vite.config.ts`:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

- [ ] **Step 4: Set up index.css with Tailwind + design tokens**

Replace `src/index.css`:

```css
@import "tailwindcss";

@theme {
  --color-primary: #00FF66;
  --color-primary-dark: #0A6B35;
  --color-brutal-black: #1A1A1A;
  --color-brutal-white: #F5F5F0;
  --color-accent: #FFE500;
  --color-danger: #FF3B30;
}

/* Neo-Brutalism base styles */
* {
  border-radius: 0;
}

body {
  font-family: "Inter", system-ui, sans-serif;
  background-color: #F5F5F0;
  color: #1A1A1A;
}

/* Brutal shadow utility */
.brutal-shadow {
  box-shadow: 4px 4px 0px #1A1A1A;
}

.brutal-shadow-lg {
  box-shadow: 6px 6px 0px #1A1A1A;
}

.brutal-border {
  border: 3px solid #1A1A1A;
}
```

- [ ] **Step 5: Set up minimal App.tsx with router**

Replace `src/App.tsx`:

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Placeholder({ name }: { name: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-black">{name}</h1>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
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
        <Route path="*" element={<Placeholder name="404" />} />
      </Routes>
    </BrowserRouter>
  );
}
```

- [ ] **Step 6: Replace src/main.tsx**

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- [ ] **Step 7: Verify dev server starts**

```bash
npm run dev
```

Expected: Vite dev server starts, browser shows "首页" in bold text on warm-white background.

- [ ] **Step 8: Init git and commit**

```bash
git init
git add -A
git commit -m "chore: init vite + react + tailwind + router scaffold"
```

---

## Task 2: TypeScript Types + Data Layer

**Files:**
- Create: `src/types.ts`, `src/lib/storage.ts`, `src/lib/stats.ts`, `src/hooks/useLocalStorage.ts`, `src/data/seed.ts`

- [ ] **Step 1: Define all TypeScript types**

Create `src/types.ts`:

```ts
export interface Diary {
  id: string;
  title: string;
  productName: string;
  productCategory: string;
  price: number;
  rating: 1 | 2 | 3 | 4 | 5; // 1=😡 2=😕 3=😐 4=😊 5=🤩
  reason: string;       // 购买动机
  experience: string;   // 使用体验
  verdict: "worth" | "not-worth" | "neutral"; // 值不值
  imageUrl?: string;    // 图片URL（可选，用于展示）
  createdAt: string;    // ISO date string
  updatedAt: string;
}

export interface UserProfile {
  nickname: string;
  avatar: string;       // emoji or URL
  bio: string;
  createdAt: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;         // emoji
  unlockedAt?: string;  // ISO date, undefined = locked
}

export type ProductCategory =
  | "数码" | "美妆" | "服饰" | "美食"
  | "家居" | "图书" | "运动" | "其他";

export const CATEGORIES: ProductCategory[] = [
  "数码", "美妆", "服饰", "美食", "家居", "图书", "运动", "其他",
];

export const EMOJI_RATINGS = ["😡", "😕", "😐", "😊", "🤩"] as const;
```

- [ ] **Step 2: Create useLocalStorage hook**

Create `src/hooks/useLocalStorage.ts`:

```ts
import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
```

- [ ] **Step 3: Create storage CRUD module**

Create `src/lib/storage.ts`:

```ts
import type { Diary, UserProfile } from "../types";

const DIARY_KEY = "bacao_diaries";
const USER_KEY = "bacao_user";

export function getDiaries(): Diary[] {
  try {
    const raw = localStorage.getItem(DIARY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveDiary(diary: Diary): void {
  const diaries = getDiaries();
  const index = diaries.findIndex((d) => d.id === diary.id);
  if (index >= 0) {
    diaries[index] = diary;
  } else {
    diaries.unshift(diary);
  }
  localStorage.setItem(DIARY_KEY, JSON.stringify(diaries));
}

export function deleteDiary(id: string): void {
  const diaries = getDiaries().filter((d) => d.id !== id);
  localStorage.setItem(DIARY_KEY, JSON.stringify(diaries));
}

export function getDiary(id: string): Diary | undefined {
  return getDiaries().find((d) => d.id === id);
}

export function getUserProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw
      ? JSON.parse(raw)
      : { nickname: "拔草小能手", avatar: "🌱", bio: "理性消费，快乐生活", createdAt: new Date().toISOString() };
  } catch {
    return { nickname: "拔草小能手", avatar: "🌱", bio: "理性消费，快乐生活", createdAt: new Date().toISOString() };
  }
}

export function saveUserProfile(profile: UserProfile): void {
  localStorage.setItem(USER_KEY, JSON.stringify(profile));
}
```

- [ ] **Step 4: Create stats calculation module**

Create `src/lib/stats.ts`:

```ts
import type { Diary, ProductCategory } from "../types";

export function calcTotalSpent(diaries: Diary[]): number {
  return diaries.reduce((sum, d) => sum + d.price, 0);
}

export function calcAverageRating(diaries: Diary[]): number {
  if (diaries.length === 0) return 0;
  return diaries.reduce((sum, d) => sum + d.rating, 0) / diaries.length;
}

/** 理智指数: worth比例 * 100 */
export function calcRationalIndex(diaries: Diary[]): number {
  if (diaries.length === 0) return 100;
  const worthCount = diaries.filter((d) => d.verdict === "worth").length;
  return Math.round((worthCount / diaries.length) * 100);
}

/** 各品类消费统计 */
export function calcCategoryBreakdown(diaries: Diary[]): { name: string; value: number }[] {
  const map = new Map<string, number>();
  for (const d of diaries) {
    map.set(d.productCategory, (map.get(d.productCategory) || 0) + d.price);
  }
  return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
}

/** 省钱罐: not-worth的总金额（本可以省下的钱） */
export function calcSavingsJar(diaries: Diary[]): number {
  return diaries
    .filter((d) => d.verdict === "not-worth")
    .reduce((sum, d) => sum + d.price, 0);
}

/** 本月消费 */
export function calcMonthlySpent(diaries: Diary[]): number {
  const now = new Date();
  const thisMonth = diaries.filter((d) => {
    const date = new Date(d.createdAt);
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  });
  return calcTotalSpent(thisMonth);
}
```

- [ ] **Step 5: Create seed data for demo/showcase**

Create `src/data/seed.ts`:

```ts
import type { Diary } from "../types";

export const SEED_DIARIES: Diary[] = [
  {
    id: "seed-1",
    title: "AirPods Pro 2 真香还是智商税？",
    productName: "AirPods Pro 2",
    productCategory: "数码",
    price: 1799,
    rating: 5,
    reason: "旧耳机坏了，被降噪功能种草很久",
    experience: "降噪效果拉满，通透模式很自然，空间音频看电影太爽了。续航也够用，每天通勤听歌完全OK。",
    verdict: "worth",
    createdAt: "2026-03-15T10:00:00Z",
    updatedAt: "2026-03-15T10:00:00Z",
  },
  {
    id: "seed-2",
    title: "网红酸奶碗，踩雷！",
    productName: "XX牌希腊酸奶",
    productCategory: "美食",
    price: 89,
    rating: 2,
    reason: "小红书刷到好多博主推荐，颜值很高",
    experience: "味道很一般，量少价贵，普通超市酸奶完胜。纯粹是为了拍照好看才买的。",
    verdict: "not-worth",
    createdAt: "2026-03-18T14:30:00Z",
    updatedAt: "2026-03-18T14:30:00Z",
  },
  {
    id: "seed-3",
    title: "优衣库联名T恤 中规中矩",
    productName: "优衣库 x KAWS 联名T恤",
    productCategory: "服饰",
    price: 99,
    rating: 3,
    reason: "路过门店看到打折就买了",
    experience: "质量还行，图案一般，穿了几次觉得也就那样。不亏但也没多惊喜。",
    verdict: "neutral",
    createdAt: "2026-03-20T09:15:00Z",
    updatedAt: "2026-03-20T09:15:00Z",
  },
  {
    id: "seed-4",
    title: "Kindle真的能让我多读书吗",
    productName: "Kindle Paperwhite 5",
    productCategory: "数码",
    price: 998,
    rating: 4,
    reason: "想培养阅读习惯，纸书太重不想带",
    experience: "屏幕舒服不伤眼，买了确实读书频率提高了。就是翻页偶尔卡顿，总体满意。",
    verdict: "worth",
    createdAt: "2026-03-22T16:45:00Z",
    updatedAt: "2026-03-22T16:45:00Z",
  },
  {
    id: "seed-5",
    title: "筋膜枪，打工人的救赎",
    productName: "某品牌筋膜枪 Mini",
    productCategory: "运动",
    price: 299,
    rating: 5,
    reason: "久坐办公肩颈酸痛，同事推荐",
    experience: "小巧便携，力度够用，午休锤两下整个人都活过来了。已经回购送朋友了。",
    verdict: "worth",
    createdAt: "2026-03-25T11:20:00Z",
    updatedAt: "2026-03-25T11:20:00Z",
  },
  {
    id: "seed-6",
    title: "智能手环，不如不买",
    productName: "XX手环7",
    productCategory: "数码",
    price: 249,
    rating: 1,
    reason: "想记录运动数据，看价格便宜就买了",
    experience: "心率不准，睡眠监测纯靠猜，APP难用到想卸载。戴了一周就扔抽屉了。",
    verdict: "not-worth",
    createdAt: "2026-03-10T08:00:00Z",
    updatedAt: "2026-03-10T08:00:00Z",
  },
];
```

- [ ] **Step 6: Commit**

```bash
git add src/types.ts src/lib/ src/hooks/useLocalStorage.ts src/data/
git commit -m "feat: add types, storage CRUD, stats logic, and seed data"
```

---

## Task 3: UI Primitives (Neo-Brutalism Design System)

**Files:**
- Create: `src/components/ui/BrutalButton.tsx`, `src/components/ui/BrutalCard.tsx`, `src/components/ui/BrutalInput.tsx`, `src/components/ui/EmojiRating.tsx`, `src/components/ui/Accordion.tsx`, `src/components/ui/CountUp.tsx`, `src/components/ui/InfiniteMarquee.tsx`

- [ ] **Step 1: BrutalButton**

Create `src/components/ui/BrutalButton.tsx`:

```tsx
import { motion } from "framer-motion";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "dark" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
}

const variants = {
  primary: "bg-primary text-brutal-black brutal-border brutal-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none",
  dark: "bg-brutal-black text-brutal-white brutal-border brutal-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none",
  outline: "bg-brutal-white text-brutal-black brutal-border brutal-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none",
  danger: "bg-danger text-brutal-white brutal-border brutal-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none",
};

const sizes = {
  sm: "px-3 py-1 text-sm",
  md: "px-5 py-2 text-base",
  lg: "px-8 py-3 text-lg",
};

export default function BrutalButton({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: Props) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={`font-bold cursor-pointer transition-all duration-100 ${variants[variant]} ${sizes[size]} ${className}`}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
}
```

- [ ] **Step 2: BrutalCard**

Create `src/components/ui/BrutalCard.tsx`:

```tsx
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function BrutalCard({ children, className = "", hover = false, onClick }: Props) {
  return (
    <motion.div
      whileHover={hover ? { translateX: -2, translateY: -2, boxShadow: "6px 6px 0px #1A1A1A" } : undefined}
      onClick={onClick}
      className={`bg-brutal-white brutal-border brutal-shadow p-4 ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: BrutalInput**

Create `src/components/ui/BrutalInput.tsx`:

```tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  multiline: true;
}

type Props = InputProps | TextareaProps;

function isTextarea(props: Props): props is TextareaProps {
  return "multiline" in props && props.multiline === true;
}

export default function BrutalInput(props: Props) {
  const { label, className = "", ...rest } = props;
  const base = "w-full bg-brutal-white brutal-border p-3 font-medium text-brutal-black placeholder:text-gray-400 focus:outline-none focus:shadow-[4px_4px_0px_#00FF66] transition-shadow";

  return (
    <div className="space-y-1">
      {label && <label className="font-bold text-sm text-brutal-black">{label}</label>}
      {isTextarea(props) ? (
        <textarea className={`${base} min-h-[120px] resize-y ${className}`} {...(rest as any)} />
      ) : (
        <input className={`${base} ${className}`} {...(rest as any)} />
      )}
    </div>
  );
}
```

- [ ] **Step 4: EmojiRating**

Create `src/components/ui/EmojiRating.tsx`:

```tsx
import { motion } from "framer-motion";
import { EMOJI_RATINGS } from "../../types";

interface Props {
  value: number; // 1-5
  onChange?: (value: 1 | 2 | 3 | 4 | 5) => void;
  size?: "sm" | "md" | "lg";
  readonly?: boolean;
}

const sizeMap = { sm: "text-xl", md: "text-3xl", lg: "text-5xl" };

export default function EmojiRating({ value, onChange, size = "md", readonly = false }: Props) {
  return (
    <div className="flex gap-2">
      {EMOJI_RATINGS.map((emoji, i) => {
        const rating = (i + 1) as 1 | 2 | 3 | 4 | 5;
        const isActive = rating <= value;
        return (
          <motion.button
            key={rating}
            type="button"
            whileTap={readonly ? undefined : { scale: 1.3 }}
            onClick={() => !readonly && onChange?.(rating)}
            className={`${sizeMap[size]} transition-opacity ${
              isActive ? "opacity-100" : "opacity-30"
            } ${readonly ? "cursor-default" : "cursor-pointer"}`}
            disabled={readonly}
          >
            {emoji}
          </motion.button>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 5: Accordion**

Create `src/components/ui/Accordion.tsx`:

```tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface Props {
  items: AccordionItem[];
}

export default function Accordion({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="brutal-border bg-brutal-white">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full p-4 flex justify-between items-center font-bold text-left cursor-pointer"
          >
            <span>{item.title}</span>
            <motion.span
              animate={{ rotate: openIndex === i ? 45 : 0 }}
              className="text-2xl"
            >
              +
            </motion.span>
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0 text-brutal-black/80">{item.content}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 6: CountUp animation**

Create `src/components/ui/CountUp.tsx`:

```tsx
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface Props {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function CountUp({ end, duration = 1.5, prefix = "", suffix = "", className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * end));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{current.toLocaleString()}{suffix}
    </span>
  );
}
```

- [ ] **Step 7: InfiniteMarquee**

Create `src/components/ui/InfiniteMarquee.tsx`:

```tsx
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  speed?: number; // seconds for one loop
  direction?: "left" | "right";
}

export default function InfiniteMarquee({ children, speed = 20, direction = "left" }: Props) {
  const x = direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"];

  return (
    <div className="overflow-hidden brutal-border bg-brutal-black py-3">
      <motion.div
        className="flex whitespace-nowrap gap-8"
        animate={{ x }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 8: Verify all components compile**

```bash
npx tsc --noEmit
```

Expected: No type errors.

- [ ] **Step 9: Commit**

```bash
git add src/components/ui/
git commit -m "feat: add neo-brutalism UI primitives (button, card, input, emoji, accordion, countup, marquee)"
```

---

## Task 4: Layout Components (Header + Footer + Layout)

**Files:**
- Create: `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`, `src/components/layout/Layout.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Header with navigation**

Create `src/components/layout/Header.tsx`:

```tsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { to: "/", label: "首页" },
  { to: "/diary", label: "日记" },
  { to: "/diary/new", label: "写日记" },
  { to: "/stats", label: "统计" },
  { to: "/category", label: "分类" },
  { to: "/achievements", label: "成就" },
  { to: "/user", label: "我的" },
];

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-primary brutal-border border-t-0 border-x-0 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-black text-brutal-black tracking-tight">
          🌿 拔草日记
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-1">
          {NAV_ITEMS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`px-3 py-1.5 font-bold text-sm transition-colors ${
                location.pathname === to
                  ? "bg-brutal-black text-primary"
                  : "text-brutal-black hover:bg-brutal-black/10"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl font-black cursor-pointer"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-primary border-t-3 border-brutal-black"
          >
            {NAV_ITEMS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={`block px-6 py-3 font-bold border-b border-brutal-black/20 ${
                  location.pathname === to ? "bg-brutal-black text-primary" : "text-brutal-black"
                }`}
              >
                {label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
```

- [ ] **Step 2: Footer**

Create `src/components/layout/Footer.tsx`:

```tsx
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-brutal-black text-brutal-white brutal-border border-b-0 border-x-0 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-primary font-black text-xl mb-3">🌿 拔草日记</h3>
            <p className="text-brutal-white/70 text-sm">理性消费，快乐生活。记录每一次购物体验，做更聪明的消费者。</p>
          </div>
          <div>
            <h4 className="font-bold mb-3">快速导航</h4>
            <div className="space-y-1">
              {[
                { to: "/about", label: "关于我们" },
                { to: "/service", label: "服务介绍" },
                { to: "/contact", label: "联系我们" },
                { to: "/reviews", label: "用户评价" },
              ].map(({ to, label }) => (
                <Link key={to} to={to} className="block text-sm text-brutal-white/70 hover:text-primary transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-3">功能探索</h4>
            <div className="space-y-1">
              {[
                { to: "/diary", label: "浏览日记" },
                { to: "/stats", label: "消费统计" },
                { to: "/achievements", label: "我的成就" },
                { to: "/voice-guide", label: "语音交互" },
              ].map(({ to, label }) => (
                <Link key={to} to={to} className="block text-sm text-brutal-white/70 hover:text-primary transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-brutal-white/20 mt-8 pt-4 text-center text-xs text-brutal-white/50">
          &copy; 2026 拔草日记 — 浙江水利水电学院毕业设计作品
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Layout wrapper**

Create `src/components/layout/Layout.tsx`:

```tsx
import Header from "./Header";
import Footer from "./Footer";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 4: Update App.tsx to use Layout and load seed data**

Replace `src/App.tsx`:

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/layout/Layout";
import { getDiaries, saveDiary } from "./lib/storage";
import { SEED_DIARIES } from "./data/seed";

// Page imports (placeholder for now, will be replaced)
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
```

- [ ] **Step 5: Verify and commit**

```bash
npx tsc --noEmit && npm run dev
```

```bash
git add src/components/layout/ src/App.tsx
git commit -m "feat: add layout components (header, footer, responsive nav)"
```

---

## Task 5: P0 — 首页 (HomePage)

**Files:**
- Create: `src/pages/HomePage.tsx`, `src/components/diary/DiaryCard.tsx`
- Modify: `src/App.tsx` (replace placeholder import)

- [ ] **Step 1: Create DiaryCard component**

Create `src/components/diary/DiaryCard.tsx`:

```tsx
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
```

- [ ] **Step 2: Create HomePage**

Create `src/pages/HomePage.tsx`:

```tsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import BrutalButton from "../components/ui/BrutalButton";
import BrutalCard from "../components/ui/BrutalCard";
import InfiniteMarquee from "../components/ui/InfiniteMarquee";
import DiaryCard from "../components/diary/DiaryCard";
import CountUp from "../components/ui/CountUp";
import { getDiaries } from "../lib/storage";
import { calcTotalSpent, calcRationalIndex, calcSavingsJar } from "../lib/stats";

const SLOGANS = [
  "🌿 理性消费",
  "💸 拒绝冲动",
  "🧠 用脑购物",
  "📝 记录真实体验",
  "🚫 拒绝智商税",
  "✅ 只买对的",
  "🔍 先看评价再下单",
  "💪 做消费的主人",
];

export default function HomePage() {
  const diaries = getDiaries();
  const totalSpent = calcTotalSpent(diaries);
  const rationalIndex = calcRationalIndex(diaries);
  const savingsJar = calcSavingsJar(diaries);
  const recentDiaries = diaries.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary brutal-border border-t-0 border-x-0">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-brutal-black leading-tight mb-4"
          >
            买前三思<br />
            <span className="text-brutal-white bg-brutal-black px-3 inline-block mt-2">拔草有理</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-brutal-black/70 mb-8 max-w-lg"
          >
            记录每一次购物体验，用真实评价帮你和朋友避开消费陷阱。
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4 flex-wrap"
          >
            <Link to="/diary/new">
              <BrutalButton variant="dark" size="lg">开始记录 ✍️</BrutalButton>
            </Link>
            <Link to="/diary">
              <BrutalButton variant="outline" size="lg">浏览日记 📖</BrutalButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Infinite Marquee — 避坑宣言 */}
      <InfiniteMarquee speed={25}>
        {SLOGANS.map((s, i) => (
          <span key={i} className="text-primary font-black text-lg mx-4">
            {s}
          </span>
        ))}
      </InfiniteMarquee>

      {/* Stats Overview */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-black mb-8">📊 社区数据</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BrutalCard className="text-center py-8">
            <div className="text-4xl font-black text-primary-dark">
              <CountUp end={diaries.length} suffix=" 篇" />
            </div>
            <p className="text-brutal-black/60 mt-2 font-bold">拔草日记</p>
          </BrutalCard>
          <BrutalCard className="text-center py-8">
            <div className="text-4xl font-black text-primary-dark">
              <CountUp end={rationalIndex} suffix="%" />
            </div>
            <p className="text-brutal-black/60 mt-2 font-bold">理智指数</p>
          </BrutalCard>
          <BrutalCard className="text-center py-8">
            <div className="text-4xl font-black text-danger">
              <CountUp end={savingsJar} prefix="¥" />
            </div>
            <p className="text-brutal-black/60 mt-2 font-bold">踩雷总额 (本可省下)</p>
          </BrutalCard>
        </div>
      </section>

      {/* Recent Diaries */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-black">🔥 最新日记</h2>
          <Link to="/diary">
            <BrutalButton variant="outline" size="sm">查看全部 →</BrutalButton>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentDiaries.map((diary, i) => (
            <DiaryCard key={diary.id} diary={diary} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brutal-black">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
            别再被种草了，来拔草吧！
          </h2>
          <p className="text-brutal-white/60 mb-8">记录你的真实购物体验，帮助更多人理性消费</p>
          <Link to="/diary/new">
            <BrutalButton variant="primary" size="lg">写第一篇日记 🌿</BrutalButton>
          </Link>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 3: Update App.tsx — replace home placeholder**

In `src/App.tsx`, add import and replace route:

```tsx
// Add at top
import HomePage from "./pages/HomePage";

// Replace the home route
<Route path="/" element={<HomePage />} />
```

- [ ] **Step 4: Verify and commit**

```bash
npm run dev
```

Check: homepage renders with hero, marquee, stats cards, recent diary cards.

```bash
git add src/pages/HomePage.tsx src/components/diary/DiaryCard.tsx src/App.tsx
git commit -m "feat: add homepage with hero, marquee, stats, and recent diaries"
```

---

## Task 6: P0 — 日记列表页 (DiaryListPage)

**Files:**
- Create: `src/pages/DiaryListPage.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create DiaryListPage**

Create `src/pages/DiaryListPage.tsx`:

```tsx
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
    let result = allDiaries;

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
          onChange={(e) => setSearch((e.target as HTMLInputElement).value)}
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
```

- [ ] **Step 2: Update App.tsx**

```tsx
import DiaryListPage from "./pages/DiaryListPage";
// Replace route:
<Route path="/diary" element={<DiaryListPage />} />
```

- [ ] **Step 3: Verify and commit**

```bash
git add src/pages/DiaryListPage.tsx src/App.tsx
git commit -m "feat: add diary list page with search, filter, and sort"
```

---

## Task 7: P0 — 写日记页 (WriteDiaryPage)

**Files:**
- Create: `src/pages/WriteDiaryPage.tsx`, `src/components/diary/DiaryForm.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create DiaryForm component**

Create `src/components/diary/DiaryForm.tsx`:

```tsx
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
        onChange={(e) => setTitle((e.target as HTMLInputElement).value)}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BrutalInput
          label="商品名称"
          placeholder="你买了什么？"
          value={productName}
          onChange={(e) => setProductName((e.target as HTMLInputElement).value)}
          required
        />
        <BrutalInput
          label="花了多少钱"
          type="number"
          placeholder="0.00"
          value={price}
          onChange={(e) => setPrice((e.target as HTMLInputElement).value)}
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
        onChange={(e) => setReason((e.target as HTMLTextAreaElement).value)}
        required
      />

      <BrutalInput
        label="使用体验"
        multiline
        placeholder="真实感受，好的坏的都说说..."
        value={experience}
        onChange={(e) => setExperience((e.target as HTMLTextAreaElement).value)}
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
```

- [ ] **Step 2: Create WriteDiaryPage**

Create `src/pages/WriteDiaryPage.tsx`:

```tsx
import DiaryForm from "../components/diary/DiaryForm";

export default function WriteDiaryPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-black mb-8">✍️ 写拔草日记</h1>
      <div className="brutal-border bg-brutal-white p-6 brutal-shadow">
        <DiaryForm />
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Update App.tsx**

```tsx
import WriteDiaryPage from "./pages/WriteDiaryPage";
// Replace route:
<Route path="/diary/new" element={<WriteDiaryPage />} />
```

- [ ] **Step 4: Verify and commit**

Test: fill form, submit, verify redirect to detail page and data in localStorage.

```bash
git add src/pages/WriteDiaryPage.tsx src/components/diary/DiaryForm.tsx src/App.tsx
git commit -m "feat: add write diary page with form, emoji rating, and verdict selector"
```

---

## Task 8: P0 — 日记详情页 (DiaryDetailPage)

**Files:**
- Create: `src/pages/DiaryDetailPage.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create DiaryDetailPage**

Create `src/pages/DiaryDetailPage.tsx`:

```tsx
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import BrutalButton from "../components/ui/BrutalButton";
import EmojiRating from "../components/ui/EmojiRating";
import { getDiary, deleteDiary } from "../lib/storage";
import { EMOJI_RATINGS } from "../types";

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
      deleteDiary(diary.id);
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
          <Link to={`/diary/edit/${diary.id}`}>
            <BrutalButton variant="outline">编辑 ✏️</BrutalButton>
          </Link>
          <BrutalButton variant="danger" onClick={handleDelete}>删除 🗑️</BrutalButton>
          <Link to="/diary" className="ml-auto">
            <BrutalButton variant="dark">返回列表 ←</BrutalButton>
          </Link>
        </div>
      </motion.article>
    </div>
  );
}
```

- [ ] **Step 2: Update App.tsx**

```tsx
import DiaryDetailPage from "./pages/DiaryDetailPage";
// Replace route:
<Route path="/diary/:id" element={<DiaryDetailPage />} />
```

- [ ] **Step 3: Verify and commit**

```bash
git add src/pages/DiaryDetailPage.tsx src/App.tsx
git commit -m "feat: add diary detail page with product info, content, and actions"
```

---

## Task 9: P0 — 统计分析页 (StatsPage)

**Files:**
- Create: `src/pages/StatsPage.tsx`, `src/components/stats/SavingsJar.tsx`, `src/components/stats/CategoryChart.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create SavingsJar SVG component**

Create `src/components/stats/SavingsJar.tsx`:

```tsx
import { motion } from "framer-motion";
import CountUp from "../ui/CountUp";

interface Props {
  amount: number;
  maxAmount?: number;
}

export default function SavingsJar({ amount, maxAmount = 5000 }: Props) {
  const fillPercent = Math.min((amount / maxAmount) * 100, 100);

  return (
    <div className="text-center">
      <div className="relative w-48 h-64 mx-auto brutal-border bg-brutal-white overflow-hidden">
        {/* Jar label */}
        <div className="absolute top-4 left-0 right-0 z-10 text-center">
          <p className="font-black text-sm text-brutal-black/50">本可省下</p>
          <p className="font-black text-2xl text-danger">
            <CountUp end={amount} prefix="¥" />
          </p>
        </div>
        {/* Fill */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${fillPercent}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute bottom-0 left-0 right-0 bg-danger/20"
        />
        {/* Coins */}
        <div className="absolute bottom-4 left-0 right-0 text-center text-3xl">
          💰
        </div>
      </div>
      <p className="mt-2 text-sm text-brutal-black/50 font-bold">存钱罐</p>
    </div>
  );
}
```

- [ ] **Step 2: Create CategoryChart**

Create `src/components/stats/CategoryChart.tsx`:

```tsx
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface Props {
  data: { name: string; value: number }[];
}

const COLORS = ["#00FF66", "#0A6B35", "#FFE500", "#FF3B30", "#1A1A1A", "#888", "#00CCFF", "#FF66CC"];

export default function CategoryChart({ data }: Props) {
  if (data.length === 0) {
    return <p className="text-center text-brutal-black/50 py-8">暂无数据</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          stroke="#1A1A1A"
          strokeWidth={2}
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => `¥${value}`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
```

- [ ] **Step 3: Create StatsPage**

Create `src/pages/StatsPage.tsx`:

```tsx
import { motion } from "framer-motion";
import BrutalCard from "../components/ui/BrutalCard";
import CountUp from "../components/ui/CountUp";
import SavingsJar from "../components/stats/SavingsJar";
import CategoryChart from "../components/stats/CategoryChart";
import { getDiaries } from "../lib/storage";
import {
  calcTotalSpent,
  calcAverageRating,
  calcRationalIndex,
  calcCategoryBreakdown,
  calcSavingsJar,
  calcMonthlySpent,
} from "../lib/stats";
import { EMOJI_RATINGS } from "../types";

export default function StatsPage() {
  const diaries = getDiaries();
  const totalSpent = calcTotalSpent(diaries);
  const avgRating = calcAverageRating(diaries);
  const rationalIndex = calcRationalIndex(diaries);
  const categoryData = calcCategoryBreakdown(diaries);
  const savingsJar = calcSavingsJar(diaries);
  const monthlySpent = calcMonthlySpent(diaries);

  const statCards = [
    { label: "日记总数", value: diaries.length, suffix: " 篇", color: "text-brutal-black" },
    { label: "累计消费", value: totalSpent, prefix: "¥", color: "text-primary-dark" },
    { label: "本月消费", value: monthlySpent, prefix: "¥", color: "text-primary-dark" },
    { label: "理智指数", value: rationalIndex, suffix: "%", color: "text-primary" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-black mb-8">📊 消费统计</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <BrutalCard className="text-center py-6">
              <div className={`text-3xl font-black ${stat.color}`}>
                <CountUp end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <p className="text-sm text-brutal-black/50 mt-1 font-bold">{stat.label}</p>
            </BrutalCard>
          </motion.div>
        ))}
      </div>

      {/* Average Rating */}
      <BrutalCard className="mb-8 p-6">
        <h2 className="font-black text-xl mb-4">平均满意度</h2>
        <div className="flex items-center gap-4">
          <span className="text-5xl">{EMOJI_RATINGS[Math.round(avgRating) - 1] || "😐"}</span>
          <div>
            <p className="text-3xl font-black">{avgRating.toFixed(1)} / 5</p>
            <p className="text-sm text-brutal-black/50">基于 {diaries.length} 篇日记</p>
          </div>
        </div>
      </BrutalCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Category Chart */}
        <BrutalCard className="p-6">
          <h2 className="font-black text-xl mb-4">品类分布</h2>
          <CategoryChart data={categoryData} />
        </BrutalCard>

        {/* Savings Jar */}
        <BrutalCard className="p-6 flex flex-col items-center justify-center">
          <h2 className="font-black text-xl mb-4">踩雷存钱罐</h2>
          <SavingsJar amount={savingsJar} />
          <p className="mt-4 text-sm text-brutal-black/50 text-center">
            这些钱本可以省下来...下次消费前先看看拔草日记吧！
          </p>
        </BrutalCard>
      </div>

      {/* Verdict Breakdown */}
      <BrutalCard className="p-6">
        <h2 className="font-black text-xl mb-4">购物判定分布</h2>
        <div className="flex gap-4">
          {([
            ["worth", "值得买", "bg-primary", diaries.filter((d) => d.verdict === "worth").length],
            ["not-worth", "踩雷了", "bg-danger", diaries.filter((d) => d.verdict === "not-worth").length],
            ["neutral", "一般般", "bg-accent", diaries.filter((d) => d.verdict === "neutral").length],
          ] as const).map(([, label, color, count]) => (
            <div key={label} className="flex-1 text-center">
              <div className={`h-4 brutal-border ${color}`} style={{ width: `${diaries.length ? (count / diaries.length) * 100 : 0}%`, minWidth: "8px", margin: "0 auto" }} />
              <p className="font-black text-lg mt-2">{count}</p>
              <p className="text-xs text-brutal-black/50 font-bold">{label}</p>
            </div>
          ))}
        </div>
      </BrutalCard>
    </div>
  );
}
```

- [ ] **Step 4: Update App.tsx**

```tsx
import StatsPage from "./pages/StatsPage";
// Replace route:
<Route path="/stats" element={<StatsPage />} />
```

- [ ] **Step 5: Verify and commit**

```bash
git add src/pages/StatsPage.tsx src/components/stats/ src/App.tsx
git commit -m "feat: add stats page with countup animations, pie chart, and savings jar"
```

---

## Task 10: P1 — 用户中心 + 商品分类 + 搜索 + 成就 + 服务介绍

**Files:**
- Create: `src/pages/UserCenterPage.tsx`, `src/pages/CategoryPage.tsx`, `src/pages/SearchResultPage.tsx`, `src/pages/AchievementPage.tsx`, `src/pages/ServiceIntroPage.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: UserCenterPage**

Create `src/pages/UserCenterPage.tsx`:

```tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import BrutalCard from "../components/ui/BrutalCard";
import BrutalButton from "../components/ui/BrutalButton";
import BrutalInput from "../components/ui/BrutalInput";
import { getUserProfile, saveUserProfile, getDiaries } from "../lib/storage";
import { calcTotalSpent, calcRationalIndex } from "../lib/stats";
import type { UserProfile } from "../types";

const AVATARS = ["🌱", "🌿", "🍀", "🌻", "🔥", "⭐", "🎯", "🧠"];

export default function UserCenterPage() {
  const [profile, setProfile] = useState<UserProfile>(getUserProfile());
  const [editing, setEditing] = useState(false);
  const diaries = getDiaries();

  function handleSave() {
    saveUserProfile(profile);
    setEditing(false);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-black mb-8">👤 个人中心</h1>

      {/* Profile Card */}
      <BrutalCard className="p-6 mb-8">
        <div className="flex items-center gap-6">
          <div className="text-6xl">{profile.avatar}</div>
          <div className="flex-1">
            {editing ? (
              <div className="space-y-3">
                <BrutalInput
                  label="昵称"
                  value={profile.nickname}
                  onChange={(e) => setProfile({ ...profile, nickname: (e.target as HTMLInputElement).value })}
                />
                <BrutalInput
                  label="简介"
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: (e.target as HTMLInputElement).value })}
                />
                <div>
                  <label className="font-bold text-sm block mb-1">头像</label>
                  <div className="flex gap-2">
                    {AVATARS.map((a) => (
                      <button
                        key={a}
                        onClick={() => setProfile({ ...profile, avatar: a })}
                        className={`text-2xl p-1 cursor-pointer brutal-border ${profile.avatar === a ? "bg-primary" : "bg-brutal-white"}`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <BrutalButton onClick={handleSave}>保存</BrutalButton>
                  <BrutalButton variant="outline" onClick={() => setEditing(false)}>取消</BrutalButton>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-black">{profile.nickname}</h2>
                <p className="text-brutal-black/60">{profile.bio}</p>
                <BrutalButton variant="outline" size="sm" className="mt-2" onClick={() => setEditing(true)}>
                  编辑资料 ✏️
                </BrutalButton>
              </>
            )}
          </div>
        </div>
      </BrutalCard>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <BrutalCard className="text-center py-4">
          <p className="text-2xl font-black">{diaries.length}</p>
          <p className="text-xs text-brutal-black/50 font-bold">日记</p>
        </BrutalCard>
        <BrutalCard className="text-center py-4">
          <p className="text-2xl font-black">¥{calcTotalSpent(diaries)}</p>
          <p className="text-xs text-brutal-black/50 font-bold">累计消费</p>
        </BrutalCard>
        <BrutalCard className="text-center py-4">
          <p className="text-2xl font-black">{calcRationalIndex(diaries)}%</p>
          <p className="text-xs text-brutal-black/50 font-bold">理智指数</p>
        </BrutalCard>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { to: "/diary", label: "我的日记 📝", desc: `共 ${diaries.length} 篇` },
          { to: "/stats", label: "消费统计 📊", desc: "查看分析报告" },
          { to: "/achievements", label: "我的成就 🏆", desc: "看看解锁了几个" },
          { to: "/diary/new", label: "写日记 ✍️", desc: "记录新的消费" },
        ].map(({ to, label, desc }) => (
          <Link key={to} to={to}>
            <BrutalCard hover className="p-4">
              <p className="font-black">{label}</p>
              <p className="text-xs text-brutal-black/50">{desc}</p>
            </BrutalCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: CategoryPage**

Create `src/pages/CategoryPage.tsx`:

```tsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import BrutalCard from "../components/ui/BrutalCard";
import { CATEGORIES } from "../types";
import { getDiaries } from "../lib/storage";

const CATEGORY_ICONS: Record<string, string> = {
  "数码": "📱", "美妆": "💄", "服饰": "👕", "美食": "🍜",
  "家居": "🏠", "图书": "📚", "运动": "🏃", "其他": "📦",
};

export default function CategoryPage() {
  const diaries = getDiaries();

  const categoryStats = CATEGORIES.map((cat) => {
    const items = diaries.filter((d) => d.productCategory === cat);
    const total = items.reduce((s, d) => s + d.price, 0);
    return { name: cat, icon: CATEGORY_ICONS[cat], count: items.length, total };
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-black mb-8">📂 商品分类</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categoryStats.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link to={`/diary?category=${cat.name}`}>
              <BrutalCard hover className="p-6 text-center">
                <div className="text-4xl mb-2">{cat.icon}</div>
                <h3 className="font-black text-lg">{cat.name}</h3>
                <p className="text-sm text-brutal-black/50 mt-1">{cat.count} 篇日记</p>
                <p className="text-sm font-bold text-primary-dark mt-1">¥{cat.total}</p>
              </BrutalCard>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: SearchResultPage**

Create `src/pages/SearchResultPage.tsx`:

```tsx
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import DiaryCard from "../components/diary/DiaryCard";
import BrutalInput from "../components/ui/BrutalInput";
import { getDiaries } from "../lib/storage";

export default function SearchResultPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQ);

  const diaries = getDiaries();
  const results = query
    ? diaries.filter((d) => {
        const q = query.toLowerCase();
        return (
          d.title.toLowerCase().includes(q) ||
          d.productName.toLowerCase().includes(q) ||
          d.experience.toLowerCase().includes(q) ||
          d.productCategory.toLowerCase().includes(q)
        );
      })
    : [];

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearchParams({ q: query });
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-black mb-8">🔍 搜索</h1>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-3">
          <div className="flex-1">
            <BrutalInput
              placeholder="搜索商品、日记..."
              value={query}
              onChange={(e) => setQuery((e.target as HTMLInputElement).value)}
            />
          </div>
          <button type="submit" className="bg-primary brutal-border px-6 font-bold cursor-pointer brutal-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
            搜索
          </button>
        </div>
      </form>

      {query && (
        <p className="text-sm text-brutal-black/50 mb-4 font-bold">
          找到 {results.length} 条关于 "{query}" 的结果
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {results.map((diary, i) => (
          <DiaryCard key={diary.id} diary={diary} index={i} />
        ))}
      </div>

      {query && results.length === 0 && (
        <div className="text-center py-16">
          <p className="text-6xl mb-4">🤷</p>
          <p className="text-xl font-bold text-brutal-black/50">没有找到 "{query}" 相关的日记</p>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 4: AchievementPage**

Create `src/pages/AchievementPage.tsx`:

```tsx
import { useMemo } from "react";
import { motion } from "framer-motion";
import BrutalCard from "../components/ui/BrutalCard";
import { getDiaries } from "../lib/storage";
import type { Achievement } from "../types";

function useAchievements(): Achievement[] {
  const diaries = getDiaries();
  const now = new Date().toISOString();

  return useMemo(() => {
    const worthCount = diaries.filter((d) => d.verdict === "worth").length;
    const notWorthCount = diaries.filter((d) => d.verdict === "not-worth").length;
    const categories = new Set(diaries.map((d) => d.productCategory));

    return [
      {
        id: "first-diary",
        name: "初出茅庐",
        description: "写下第一篇拔草日记",
        icon: "📝",
        unlockedAt: diaries.length >= 1 ? now : undefined,
      },
      {
        id: "five-diaries",
        name: "拔草达人",
        description: "累计写下5篇拔草日记",
        icon: "🌿",
        unlockedAt: diaries.length >= 5 ? now : undefined,
      },
      {
        id: "ten-diaries",
        name: "消费侦探",
        description: "累计写下10篇拔草日记",
        icon: "🔍",
        unlockedAt: diaries.length >= 10 ? now : undefined,
      },
      {
        id: "smart-buyer",
        name: "精明买家",
        description: "3次购物都被判定为值得买",
        icon: "🧠",
        unlockedAt: worthCount >= 3 ? now : undefined,
      },
      {
        id: "mine-sweeper",
        name: "排雷专家",
        description: "发现3个踩雷商品，帮助大家避坑",
        icon: "💣",
        unlockedAt: notWorthCount >= 3 ? now : undefined,
      },
      {
        id: "explorer",
        name: "全品类探索者",
        description: "在5个以上品类写过日记",
        icon: "🗺️",
        unlockedAt: categories.size >= 5 ? now : undefined,
      },
      {
        id: "frugal",
        name: "省钱小能手",
        description: "累计避坑金额超过500元",
        icon: "💰",
        unlockedAt:
          diaries.filter((d) => d.verdict === "not-worth").reduce((s, d) => s + d.price, 0) >= 500
            ? now
            : undefined,
      },
      {
        id: "perfectionist",
        name: "满分体验",
        description: "给出一个5星满分评价",
        icon: "🤩",
        unlockedAt: diaries.some((d) => d.rating === 5) ? now : undefined,
      },
    ];
  }, [diaries]);
}

export default function AchievementPage() {
  const achievements = useAchievements();
  const unlocked = achievements.filter((a) => a.unlockedAt).length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-black mb-2">🏆 成就展示</h1>
      <p className="text-brutal-black/50 mb-8 font-bold">
        已解锁 {unlocked} / {achievements.length} 个成就
      </p>

      {/* Progress bar */}
      <div className="brutal-border bg-brutal-white h-8 mb-8 relative overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(unlocked / achievements.length) * 100}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-primary"
        />
        <span className="absolute inset-0 flex items-center justify-center font-black text-sm">
          {Math.round((unlocked / achievements.length) * 100)}%
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((achievement, i) => {
          const isUnlocked = !!achievement.unlockedAt;
          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <BrutalCard className={`p-5 flex items-center gap-4 ${isUnlocked ? "" : "opacity-40 grayscale"}`}>
                <div className="text-4xl">{achievement.icon}</div>
                <div className="flex-1">
                  <h3 className="font-black text-lg">{achievement.name}</h3>
                  <p className="text-sm text-brutal-black/60">{achievement.description}</p>
                </div>
                {isUnlocked && (
                  <span className="bg-primary brutal-border px-2 py-0.5 text-xs font-bold">已解锁</span>
                )}
              </BrutalCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: ServiceIntroPage**

Create `src/pages/ServiceIntroPage.tsx`:

```tsx
import { motion } from "framer-motion";
import BrutalCard from "../components/ui/BrutalCard";
import Accordion from "../components/ui/Accordion";
import BrutalButton from "../components/ui/BrutalButton";
import { Link } from "react-router-dom";

const FEATURES = [
  { icon: "📝", title: "拔草日记", desc: "记录每次购物的真实体验，包括评分、动机和使用感受" },
  { icon: "📊", title: "消费统计", desc: "可视化你的消费数据，了解花钱习惯" },
  { icon: "🏆", title: "成就系统", desc: "游戏化体验，解锁消费达人成就" },
  { icon: "🔍", title: "智能搜索", desc: "快速找到你关心的商品评价" },
  { icon: "🎤", title: "语音交互", desc: "动口不动手，语音输入消费记录" },
  { icon: "💰", title: "存钱罐", desc: "统计踩雷金额，提醒自己理性消费" },
];

const FAQ_ITEMS = [
  { title: "拔草日记是什么？", content: "拔草日记是一个帮助你记录和复盘购物体验的平台。每次消费后，写下真实感受，帮助自己和他人做出更理性的消费决策。" },
  { title: "数据存在哪里？安全吗？", content: "所有数据存储在你的浏览器本地（LocalStorage），不会上传到任何服务器。你的消费隐私完全由你掌控。" },
  { title: "怎么开始使用？", content: "点击「写日记」按钮，填写商品名称、价格、你的评分和使用体验，选择「值得买」「踩雷了」或「一般般」，点击发布即可！" },
  { title: "成就系统怎么玩？", content: "持续记录消费日记，系统会根据你的行为自动解锁成就徽章。比如写满5篇日记解锁「拔草达人」，发现3个踩雷商品解锁「排雷专家」等。" },
  { title: "支持哪些浏览器？", content: "推荐使用 Chrome 浏览器以获得最佳体验（包括语音功能）。Safari、Firefox、Edge 也支持基本功能。" },
];

export default function ServiceIntroPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-black mb-2">🌿 服务介绍</h1>
      <p className="text-brutal-black/50 mb-12 text-lg">了解拔草日记能为你做什么</p>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <BrutalCard className="p-6 text-center h-full">
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="font-black text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-brutal-black/60">{f.desc}</p>
            </BrutalCard>
          </motion.div>
        ))}
      </div>

      {/* FAQ Accordion */}
      <h2 className="text-3xl font-black mb-6">❓ 常见问题</h2>
      <Accordion items={FAQ_ITEMS} />

      {/* CTA */}
      <div className="text-center mt-12">
        <Link to="/diary/new">
          <BrutalButton variant="dark" size="lg">立即开始记录 🚀</BrutalButton>
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Update App.tsx — replace all P1 placeholders**

```tsx
import UserCenterPage from "./pages/UserCenterPage";
import CategoryPage from "./pages/CategoryPage";
import SearchResultPage from "./pages/SearchResultPage";
import AchievementPage from "./pages/AchievementPage";
import ServiceIntroPage from "./pages/ServiceIntroPage";

// Replace routes:
<Route path="/user" element={<UserCenterPage />} />
<Route path="/category" element={<CategoryPage />} />
<Route path="/search" element={<SearchResultPage />} />
<Route path="/achievements" element={<AchievementPage />} />
<Route path="/service" element={<ServiceIntroPage />} />
```

- [ ] **Step 7: Verify and commit**

```bash
npx tsc --noEmit && npm run dev
```

```bash
git add src/pages/UserCenterPage.tsx src/pages/CategoryPage.tsx src/pages/SearchResultPage.tsx src/pages/AchievementPage.tsx src/pages/ServiceIntroPage.tsx src/App.tsx
git commit -m "feat: add P1 pages (user center, category, search, achievements, service intro)"
```

---

## Task 11: P2 — 客户评价 + 关于我们 + 联系表单 + 语音引导 + 404

**Files:**
- Create: `src/pages/ReviewsPage.tsx`, `src/pages/AboutPage.tsx`, `src/pages/ContactPage.tsx`, `src/pages/VoiceGuidePage.tsx`, `src/pages/NotFoundPage.tsx`, `src/hooks/useSpeech.ts`
- Modify: `src/App.tsx`

- [ ] **Step 1: ReviewsPage**

Create `src/pages/ReviewsPage.tsx`:

```tsx
import { motion } from "framer-motion";
import BrutalCard from "../components/ui/BrutalCard";

const REVIEWS = [
  { name: "小明", avatar: "🧑", text: "终于有个地方记录我的购物翻车经历了！写了几篇日记后真的开始理性消费了。", rating: 5 },
  { name: "花花", avatar: "👩", text: "成就系统太有趣了，为了解锁徽章我写了好多日记哈哈，结果真的省了不少钱。", rating: 5 },
  { name: "阿杰", avatar: "👨", text: "界面风格很有个性！新粗野主义的设计让我每次打开都很有新鲜感。", rating: 4 },
  { name: "小鱼", avatar: "👧", text: "语音输入功能太方便了，买完东西直接对着手机说两句就能记录。", rating: 5 },
  { name: "老王", avatar: "🧔", text: "存钱罐功能扎心了...看到自己踩雷的总金额，下单前真的会三思。", rating: 4 },
  { name: "甜甜", avatar: "👩‍🦰", text: "统计页面的图表很直观，终于知道自己钱都花在哪了。", rating: 5 },
];

export default function ReviewsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-black mb-2">💬 用户评价</h1>
      <p className="text-brutal-black/50 mb-8">看看其他拔草人怎么说</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {REVIEWS.map((review, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <BrutalCard className="p-6 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{review.avatar}</span>
                <div>
                  <p className="font-black">{review.name}</p>
                  <p className="text-sm">{"⭐".repeat(review.rating)}</p>
                </div>
              </div>
              <p className="text-brutal-black/70 flex-1">"{review.text}"</p>
            </BrutalCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: AboutPage**

Create `src/pages/AboutPage.tsx`:

```tsx
import { motion } from "framer-motion";
import BrutalCard from "../components/ui/BrutalCard";
import BrutalButton from "../components/ui/BrutalButton";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-black mb-8">🌿 关于拔草日记</h1>

        <BrutalCard className="p-8 mb-8">
          <h2 className="text-2xl font-black mb-4">我们的故事</h2>
          <div className="space-y-4 text-brutal-black/80 leading-relaxed">
            <p>
              在这个种草无处不在的时代，我们每天被无数的推荐和广告包围。
              小红书种草、直播带货、朋友推荐...消费冲动一个接一个。
            </p>
            <p>
              <strong>拔草日记</strong>诞生于一个简单的想法：如果我们能记录每一次购物体验，
              客观地复盘自己的消费决策，是不是就能做出更理性的选择？
            </p>
            <p>
              我们相信，真实的使用体验比任何广告都有价值。每一篇拔草日记，
              都是帮助自己和他人避开消费陷阱的宝贵记录。
            </p>
          </div>
        </BrutalCard>

        <BrutalCard className="p-8 mb-8 bg-primary">
          <h2 className="text-2xl font-black mb-4">我们的理念</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "🧠", title: "理性消费", desc: "用数据和记录取代冲动" },
              { icon: "💬", title: "真实分享", desc: "只说真话，拒绝软广" },
              { icon: "🤝", title: "互助避坑", desc: "一人踩雷，众人受益" },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="text-4xl mb-2">{item.icon}</div>
                <h3 className="font-black">{item.title}</h3>
                <p className="text-sm text-brutal-black/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </BrutalCard>

        <BrutalCard className="p-8">
          <h2 className="text-2xl font-black mb-4">项目信息</h2>
          <div className="space-y-2 text-brutal-black/70">
            <p><strong>项目名称：</strong>购物推广类网站《拔草日记》</p>
            <p><strong>院校：</strong>浙江水利水电学院 · 数字媒体技术</p>
            <p><strong>设计风格：</strong>新粗野主义（Neo-Brutalism）</p>
            <p><strong>技术栈：</strong>React + Tailwind CSS + framer-motion</p>
          </div>
          <div className="mt-6">
            <Link to="/contact">
              <BrutalButton variant="dark">联系我们 →</BrutalButton>
            </Link>
          </div>
        </BrutalCard>
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 3: ContactPage with FormSubmit**

Create `src/pages/ContactPage.tsx`:

```tsx
import { useState } from "react";
import { motion } from "framer-motion";
import BrutalButton from "../components/ui/BrutalButton";
import BrutalInput from "../components/ui/BrutalInput";
import BrutalCard from "../components/ui/BrutalCard";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Simulate FormSubmit (in production, use actual FormSubmit endpoint)
    // <form action="https://formsubmit.co/YOUR_EMAIL" method="POST">
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
          <p className="text-6xl mb-4">✅</p>
          <h1 className="text-3xl font-black mb-2">发送成功！</h1>
          <p className="text-brutal-black/60 mb-6">感谢你的留言，我们会尽快回复。</p>
          <BrutalButton onClick={() => setSubmitted(false)}>再写一条</BrutalButton>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-black mb-2">📮 联系我们</h1>
      <p className="text-brutal-black/50 mb-8">有建议、反馈或合作意向？给我们留言吧！</p>

      <BrutalCard className="p-6 brutal-shadow">
        <form onSubmit={handleSubmit} className="space-y-6">
          <BrutalInput
            label="你的名字"
            placeholder="怎么称呼你？"
            value={name}
            onChange={(e) => setName((e.target as HTMLInputElement).value)}
            required
          />
          <BrutalInput
            label="邮箱"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
            required
          />
          <BrutalInput
            label="留言内容"
            multiline
            placeholder="说说你的想法..."
            value={message}
            onChange={(e) => setMessage((e.target as HTMLTextAreaElement).value)}
            required
          />
          <BrutalButton type="submit" variant="dark" size="lg">发送留言 🚀</BrutalButton>
        </form>
      </BrutalCard>
    </div>
  );
}
```

- [ ] **Step 4: useSpeech hook**

Create `src/hooks/useSpeech.ts`:

```ts
import { useState, useRef, useCallback } from "react";

interface UseSpeechReturn {
  transcript: string;
  isListening: boolean;
  isSupported: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

export function useSpeech(): UseSpeechReturn {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const SpeechRecognition =
    typeof window !== "undefined"
      ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      : null;

  const isSupported = !!SpeechRecognition;

  const start = useCallback(() => {
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.lang = "zh-CN";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
      let text = "";
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      setTranscript(text);
    };

    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, [SpeechRecognition]);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const reset = useCallback(() => {
    setTranscript("");
  }, []);

  return { transcript, isListening, isSupported, start, stop, reset };
}
```

- [ ] **Step 5: VoiceGuidePage**

Create `src/pages/VoiceGuidePage.tsx`:

```tsx
import { motion } from "framer-motion";
import BrutalCard from "../components/ui/BrutalCard";
import BrutalButton from "../components/ui/BrutalButton";
import { useSpeech } from "../hooks/useSpeech";

export default function VoiceGuidePage() {
  const { transcript, isListening, isSupported, start, stop, reset } = useSpeech();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-black mb-2">🎤 语音交互</h1>
      <p className="text-brutal-black/50 mb-8">动口不动手，用语音记录消费体验</p>

      {/* Demo Area */}
      <BrutalCard className="p-8 mb-8 text-center">
        <h2 className="text-2xl font-black mb-4">试试语音输入</h2>

        {!isSupported ? (
          <div className="py-8">
            <p className="text-xl mb-2">😕 你的浏览器不支持语音识别</p>
            <p className="text-brutal-black/50">请使用 Chrome 浏览器获得最佳体验</p>
          </div>
        ) : (
          <>
            <motion.button
              onClick={isListening ? stop : start}
              whileTap={{ scale: 0.95 }}
              animate={isListening ? { scale: [1, 1.1, 1] } : {}}
              transition={isListening ? { repeat: Infinity, duration: 1.5 } : {}}
              className={`w-24 h-24 text-4xl brutal-border cursor-pointer mx-auto block mb-6 transition-colors ${
                isListening ? "bg-danger text-brutal-white" : "bg-primary text-brutal-black"
              }`}
            >
              🎙️
            </motion.button>
            <p className="font-bold mb-4">
              {isListening ? "🔴 正在聆听... 说点什么吧" : "点击麦克风开始语音输入"}
            </p>
            <div className="brutal-border bg-brutal-white p-4 min-h-[100px] text-left mb-4">
              <p className={transcript ? "text-brutal-black" : "text-brutal-black/30"}>
                {transcript || "语音识别内容会显示在这里..."}
              </p>
            </div>
            {transcript && (
              <BrutalButton variant="outline" size="sm" onClick={reset}>清除内容</BrutalButton>
            )}
          </>
        )}
      </BrutalCard>

      {/* How it works */}
      <h2 className="text-2xl font-black mb-6">怎么使用？</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { step: "1", icon: "🎙️", title: "点击麦克风", desc: "在写日记页面点击语音按钮" },
          { step: "2", icon: "🗣️", title: "说出体验", desc: "用自然语言描述你的购物感受" },
          { step: "3", icon: "✨", title: "自动填写", desc: "语音识别内容自动填入输入框" },
        ].map((item, i) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <BrutalCard className="p-6 text-center">
              <div className="text-4xl mb-2">{item.icon}</div>
              <div className="inline-block bg-brutal-black text-brutal-white w-8 h-8 font-black text-lg leading-8 brutal-border mb-2">
                {item.step}
              </div>
              <h3 className="font-black">{item.title}</h3>
              <p className="text-sm text-brutal-black/60">{item.desc}</p>
            </BrutalCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 6: NotFoundPage**

Create `src/pages/NotFoundPage.tsx`:

```tsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import BrutalButton from "../components/ui/BrutalButton";

export default function NotFoundPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", bounce: 0.4 }}
      >
        <h1 className="text-[8rem] md:text-[12rem] font-black leading-none text-primary">
          404
        </h1>
        <div className="brutal-border bg-brutal-black text-brutal-white inline-block px-6 py-2 mb-6">
          <p className="text-xl font-black">页面走丢了！</p>
        </div>
        <p className="text-brutal-black/60 mb-8 text-lg">
          这个页面可能已经被「拔草」了... 🌿
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/">
            <BrutalButton variant="dark" size="lg">回到首页 🏠</BrutalButton>
          </Link>
          <Link to="/diary">
            <BrutalButton variant="outline" size="lg">看看日记 📖</BrutalButton>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 7: Update App.tsx — replace all P2 placeholders**

```tsx
import ReviewsPage from "./pages/ReviewsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import VoiceGuidePage from "./pages/VoiceGuidePage";
import NotFoundPage from "./pages/NotFoundPage";

// Replace routes:
<Route path="/reviews" element={<ReviewsPage />} />
<Route path="/about" element={<AboutPage />} />
<Route path="/contact" element={<ContactPage />} />
<Route path="/voice-guide" element={<VoiceGuidePage />} />
<Route path="*" element={<NotFoundPage />} />
```

- [ ] **Step 8: Verify all pages and commit**

```bash
npx tsc --noEmit && npm run dev
```

Visit every route to verify rendering.

```bash
git add src/pages/ReviewsPage.tsx src/pages/AboutPage.tsx src/pages/ContactPage.tsx src/pages/VoiceGuidePage.tsx src/pages/NotFoundPage.tsx src/hooks/useSpeech.ts src/App.tsx
git commit -m "feat: add P2 pages (reviews, about, contact, voice guide, 404)"
```

---

## Task 12: Final App.tsx Assembly + Polish

**Files:**
- Modify: `src/App.tsx` (final version with all page imports)

- [ ] **Step 1: Write final App.tsx**

Replace `src/App.tsx` with the complete version containing all imports:

```tsx
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
import UserCenterPage from "./pages/UserCenterPage";
import CategoryPage from "./pages/CategoryPage";
import SearchResultPage from "./pages/SearchResultPage";
import AchievementPage from "./pages/AchievementPage";
import ServiceIntroPage from "./pages/ServiceIntroPage";
import ReviewsPage from "./pages/ReviewsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import VoiceGuidePage from "./pages/VoiceGuidePage";
import NotFoundPage from "./pages/NotFoundPage";

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
            <Route path="/user" element={<UserCenterPage />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/search" element={<SearchResultPage />} />
            <Route path="/achievements" element={<AchievementPage />} />
            <Route path="/service" element={<ServiceIntroPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/voice-guide" element={<VoiceGuidePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </SeedLoader>
    </BrowserRouter>
  );
}
```

- [ ] **Step 2: Verify full build succeeds**

```bash
npm run build
```

Expected: Build completes with no errors.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: complete all 15 pages with neo-brutalism design"
```

---

## Task 13: Deploy to Vercel

**Files:** None (deployment only)

- [ ] **Step 1: Install Vercel CLI**

```bash
npm install -g vercel
```

- [ ] **Step 2: Deploy**

```bash
vercel --prod
```

Follow prompts to link project. The Vite build output is in `dist/`.

- [ ] **Step 3: Verify deployed site**

Visit the Vercel URL and check all 15 pages render correctly.

- [ ] **Step 4: Commit Vercel config if generated**

```bash
git add -A && git commit -m "chore: add vercel config"
```

---

## Summary

| Task | Content | Est. Size |
|------|---------|-----------|
| 1 | Project scaffold (Vite + React + Tailwind + Router) | Small |
| 2 | Types + Data Layer (storage, stats, seed) | Small |
| 3 | UI Primitives (7 components) | Medium |
| 4 | Layout (Header + Footer + Layout) | Small |
| 5 | P0: HomePage | Medium |
| 6 | P0: DiaryListPage | Medium |
| 7 | P0: WriteDiaryPage + DiaryForm | Medium |
| 8 | P0: DiaryDetailPage | Medium |
| 9 | P0: StatsPage + Charts | Medium |
| 10 | P1: 5 pages (User, Category, Search, Achievement, Service) | Large |
| 11 | P2: 5 pages (Reviews, About, Contact, Voice, 404) | Large |
| 12 | Final assembly + build verification | Small |
| 13 | Deploy to Vercel | Small |
