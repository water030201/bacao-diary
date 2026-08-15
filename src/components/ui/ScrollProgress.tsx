import { motion, useScroll, useSpring } from "framer-motion";

/**
 * 顶部滚动进度条 — 全局
 * 监听全页 scrollYProgress，弹簧平滑显示进度
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[5px] bg-[#00FF66] z-[9998] origin-left border-b-2 border-black"
      style={{ scaleX }}
    />
  );
}
