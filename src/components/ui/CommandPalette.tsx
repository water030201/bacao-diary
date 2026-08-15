import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

type Command = {
  id: string;
  title: string;
  subtitle?: string;
  keywords: string;
  action: () => void;
  icon: string;
};

/**
 * 全站命令面板：⌘K / Ctrl+K 唤起
 * - 模糊匹配 title + keywords
 * - 上下方向键切换、回车执行、Esc 关闭
 * - 内置 15 页跳转 + 写日记 + 主题切换占位
 */
export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const commands = useMemo<Command[]>(
    () => [
      { id: "go-home", title: "首页", subtitle: "Home", keywords: "home shouye 首页", icon: "🏠", action: () => navigate("/") },
      { id: "go-diary", title: "日记列表", subtitle: "Diary List", keywords: "diary list riji 日记 列表", icon: "📔", action: () => navigate("/diary") },
      { id: "go-new", title: "写新日记", subtitle: "Create Diary", keywords: "new write create xie 写 新 日记 add", icon: "✍️", action: () => navigate("/diary/new") },
      { id: "go-stats", title: "统计分析", subtitle: "Statistics", keywords: "stats analytics tongji 统计 分析 chart", icon: "📊", action: () => navigate("/stats") },
      { id: "go-user", title: "用户中心", subtitle: "User Center", keywords: "user profile yonghu 用户 中心 me", icon: "👤", action: () => navigate("/user") },
      { id: "go-category", title: "商品分类", subtitle: "Categories", keywords: "category fenlei 分类 商品", icon: "🏷️", action: () => navigate("/category") },
      { id: "go-search", title: "搜索结果", subtitle: "Search", keywords: "search sousuo 搜索", icon: "🔍", action: () => navigate("/search") },
      { id: "go-achv", title: "成就展示", subtitle: "Achievements", keywords: "achievements chengjiu 成就", icon: "🏆", action: () => navigate("/achievements") },
      { id: "go-service", title: "服务介绍", subtitle: "Services", keywords: "service fuwu 服务", icon: "💡", action: () => navigate("/service") },
      { id: "go-reviews", title: "客户评价", subtitle: "Reviews", keywords: "reviews pingjia 评价", icon: "⭐", action: () => navigate("/reviews") },
      { id: "go-about", title: "关于我们", subtitle: "About", keywords: "about guanyu 关于", icon: "ℹ️", action: () => navigate("/about") },
      { id: "go-contact", title: "联系我们", subtitle: "Contact", keywords: "contact lianxi 联系", icon: "✉️", action: () => navigate("/contact") },
      { id: "go-voice", title: "语音引导", subtitle: "Voice Guide", keywords: "voice yuyin 语音 引导", icon: "🎙️", action: () => navigate("/voice-guide") },
      { id: "scroll-top", title: "回到顶部", subtitle: "Scroll to top", keywords: "top scroll dingbu 顶部", icon: "⬆️", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
      { id: "reload", title: "重新加载页面", subtitle: "Reload", keywords: "reload refresh shuaxin 刷新", icon: "🔄", action: () => window.location.reload() },
    ],
    [navigate],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      (c.title + " " + (c.subtitle ?? "") + " " + c.keywords).toLowerCase().includes(q),
    );
  }, [query, commands]);

  // 全局快捷键
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toLowerCase().includes("mac");
      const ctrl = isMac ? e.metaKey : e.ctrlKey;
      if (ctrl && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // 打开时聚焦输入框、重置状态
  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // 当列表变化时把 active 限制在范围内
  useEffect(() => {
    if (active >= filtered.length) setActive(0);
  }, [filtered, active]);

  const runAt = (i: number) => {
    const cmd = filtered[i];
    if (!cmd) return;
    setOpen(false);
    cmd.action();
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[12vh] px-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: -10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -10 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl bg-[#F5F5F0] border-[3px] border-black shadow-[8px_8px_0_#1A1A1A] overflow-hidden"
            >
              <div className="border-b-[3px] border-black bg-[#00FF66] px-4 py-3 flex items-center gap-3">
                <span className="text-xl">⌘</span>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setActive((a) => Math.min(a + 1, filtered.length - 1));
                    } else if (e.key === "ArrowUp") {
                      e.preventDefault();
                      setActive((a) => Math.max(a - 1, 0));
                    } else if (e.key === "Enter") {
                      e.preventDefault();
                      runAt(active);
                    }
                  }}
                  placeholder="搜索页面、命令…   ↑↓ 选择 ⏎ 执行 Esc 关闭"
                  className="flex-1 bg-transparent outline-none text-black placeholder-black/60 font-bold"
                />
                <kbd className="text-xs border-2 border-black px-1.5 py-0.5 bg-white font-bold">ESC</kbd>
              </div>
              <ul className="max-h-[50vh] overflow-y-auto py-2">
                {filtered.length === 0 && (
                  <li className="px-4 py-6 text-center text-sm opacity-60">没有匹配的命令</li>
                )}
                {filtered.map((cmd, i) => (
                  <li
                    key={cmd.id}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => runAt(i)}
                    className={`mx-2 my-1 px-3 py-2.5 cursor-pointer flex items-center gap-3 border-2 transition-colors ${
                      i === active
                        ? "bg-[#00FF66] border-black shadow-[3px_3px_0_#1A1A1A]"
                        : "border-transparent"
                    }`}
                  >
                    <span className="text-xl">{cmd.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-black">{cmd.title}</div>
                      {cmd.subtitle && (
                        <div className="text-xs opacity-70">{cmd.subtitle}</div>
                      )}
                    </div>
                    {i === active && <span className="text-xs font-bold">⏎</span>}
                  </li>
                ))}
              </ul>
              <div className="border-t-[3px] border-black bg-white px-4 py-2 text-xs flex justify-between font-bold">
                <span>{filtered.length} 个命令</span>
                <span>
                  <kbd className="border border-black px-1">⌘</kbd>
                  <kbd className="border border-black px-1 ml-1">K</kbd> 唤起
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
