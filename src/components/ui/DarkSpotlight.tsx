import { useEffect, useRef } from "react";

/**
 * 暗色模式探照灯效果：
 * - 全屏覆盖一层带"圆形透明洞"的遮罩
 * - 洞跟随鼠标 → 营造手电筒/聚光灯感
 * - 仅在 html.dark 类生效（CSS 控制可见性）
 * - 触屏设备不显示
 */
export default function DarkSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (matchMedia("(hover: none)").matches) return;

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let pendingX = window.innerWidth / 2;
    let pendingY = window.innerHeight / 2;

    const apply = () => {
      el.style.setProperty("--spot-x", `${pendingX}px`);
      el.style.setProperty("--spot-y", `${pendingY}px`);
      raf = 0;
    };

    const onMove = (e: MouseEvent) => {
      pendingX = e.clientX;
      pendingY = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="dark-spotlight pointer-events-none fixed inset-0 z-[9996]"
    />
  );
}
