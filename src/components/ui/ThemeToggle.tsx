import { useEffect, useState, useRef } from "react";

const KEY = "bacao_theme";

/**
 * 关灯主题切换按钮
 * - 点击触发"圆形扩散"遮罩从按钮位置展开
 * - 切换 html.dark 类，持久化到 localStorage
 * - 首次访问读取系统 prefers-color-scheme
 */
export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [animating, setAnimating] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // 初始化
  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    const prefer = matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = saved ? saved === "dark" : prefer;
    setDark(initial);
    document.documentElement.classList.toggle("dark", initial);
  }, []);

  const toggle = () => {
    if (animating) return;

    // 计算按钮中心 → CSS 变量给 clip-path
    const rect = btnRef.current?.getBoundingClientRect();
    const cx = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const cy = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

    const next = !dark;
    setAnimating(true);

    // 让 overlay 显示当前主题截图色（旧背景），然后切换 dark 类，让真正的内容变成新主题，
    // overlay 的 clip-path 收缩 / 圆形扩散即可
    if (overlayRef.current) {
      overlayRef.current.style.setProperty("--cx", `${cx}px`);
      overlayRef.current.style.setProperty("--cy", `${cy}px`);
      overlayRef.current.style.background = next ? "#0A0A0A" : "#F5F5F0";
      overlayRef.current.style.display = "block";
      // 强制重排
      void overlayRef.current.offsetWidth;
      overlayRef.current.style.animation = "lights-out-reveal 700ms cubic-bezier(0.65, 0, 0.35, 1) forwards";
    }

    // 动画刚开始时切换主题（覆盖层后面就已经是新主题了，露出来时丝滑）
    window.setTimeout(() => {
      document.documentElement.classList.toggle("dark", next);
      setDark(next);
      localStorage.setItem(KEY, next ? "dark" : "light");
    }, 50);

    // 动画结束后隐藏 overlay
    window.setTimeout(() => {
      if (overlayRef.current) {
        overlayRef.current.style.display = "none";
        overlayRef.current.style.animation = "";
      }
      setAnimating(false);
    }, 750);
  };

  return (
    <>
      <button
        ref={btnRef}
        onClick={toggle}
        data-magnetic
        aria-label={dark ? "开灯" : "关灯"}
        title={dark ? "开灯（亮色）" : "关灯（暗色）"}
        className="w-10 h-10 brutal-border brutal-shadow rounded-full bg-primary flex items-center justify-center hover:rotate-12 transition-transform cursor-pointer"
      >
        {dark ? (
          // ☀️ 太阳
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
        ) : (
          // 🌙 月亮
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>
      {/* 全屏圆形扩散遮罩 */}
      <div
        ref={overlayRef}
        aria-hidden
        className="fixed inset-0 z-[10001] pointer-events-none"
        style={{ display: "none" }}
      />
    </>
  );
}
