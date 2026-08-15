import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * 自定义鼠标 + 磁吸效果
 * - 跟随鼠标的小圆点 + 外圈
 * - hover 在 [data-magnetic] 元素上时变大并贴住元素中心
 * - 触屏设备自动隐藏
 */
export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { stiffness: 200, damping: 20, mass: 0.5 });
  const ringY = useSpring(cursorY, { stiffness: 200, damping: 20, mass: 0.5 });

  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const magnetTarget = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const touch = matchMedia("(hover: none)").matches;
    setIsTouch(touch);
    if (touch) return;

    const move = (e: MouseEvent) => {
      // 磁吸：如果当前 hover 在磁吸元素上，吸到元素中心
      if (magnetTarget.current) {
        const rect = magnetTarget.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * 0.3;
        const dy = (e.clientY - cy) * 0.3;
        cursorX.set(cx + dx);
        cursorY.set(cy + dy);
      } else {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      }
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target?.closest) return;
      const interactive = target.closest(
        'a, button, [role="button"], [data-magnetic], input, textarea, select, label[for]',
      ) as HTMLElement | null;
      if (interactive) {
        setHovering(true);
        if (interactive.hasAttribute("data-magnetic")) {
          magnetTarget.current = interactive;
        }
      }
    };
    const out = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target?.closest) return;
      const interactive = target.closest(
        'a, button, [role="button"], [data-magnetic], input, textarea, select, label[for]',
      );
      if (interactive) {
        setHovering(false);
        magnetTarget.current = null;
      }
    };

    const leave = () => setHidden(true);
    const enter = () => setHidden(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    // hover-capable 设备隐藏系统鼠标
    document.documentElement.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      document.documentElement.style.cursor = "";
    };
  }, [cursorX, cursorY]);

  if (isTouch) return null;

  return (
    <>
      {/* 外圈 - 弹簧跟随 */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: hidden ? 0 : 1,
        }}
      >
        <motion.div
          animate={{
            width: hovering ? 56 : 32,
            height: hovering ? 56 : 32,
            borderWidth: hovering ? 3 : 2,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="rounded-full border-white"
          style={{ borderStyle: "solid" }}
        />
      </motion.div>
      {/* 内点 - 直接跟随 */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: hidden ? 0 : 1,
        }}
      >
        <motion.div
          animate={{
            width: hovering ? 4 : 6,
            height: hovering ? 4 : 6,
          }}
          className="rounded-full bg-white"
        />
      </motion.div>
    </>
  );
}
