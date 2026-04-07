import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import BrutalButton from "./BrutalButton";
import { triggerGrassBurst } from "../../lib/grassBurst";

const SPROUTS = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  delay: i * 0.05,
  // 在草地上交错分布
  x: 10 + (i % 4) * 22 + (i >= 4 ? 11 : 0),
  y: 50 + (i >= 4 ? 30 : 0),
  rot: -8 + i * 2,
}));

/**
 * 互动拔草空状态：
 * - 8 颗草苗在草地上等待被拔
 * - 点击触发"拔出"动画 + GrassBurst 飞溅
 * - 全部拔完显示 CTA："这把草拔得真爽，记下来吧"
 */
export default function GrassPullField() {
  const [pulled, setPulled] = useState<Set<number>>(new Set());

  const pull = (id: number, e: React.MouseEvent) => {
    if (pulled.has(id)) return;
    setPulled((prev) => new Set(prev).add(id));
    triggerGrassBurst(e.clientX, e.clientY, 12);
  };

  const allPulled = pulled.size === SPROUTS.length;
  const ratio = pulled.size / SPROUTS.length;

  return (
    <div className="text-center py-8">
      <h2 className="text-2xl font-black mb-2">还没有日记 🌱</h2>
      <p className="text-sm text-brutal-black/60 font-bold mb-6">
        来，先拔几根草热热身 — 已拔 <span className="text-primary-dark text-lg">{pulled.size}</span> / {SPROUTS.length}
      </p>

      {/* 进度条 */}
      <div className="max-w-xs mx-auto mb-6 brutal-border h-3 bg-brutal-white overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${ratio * 100}%` }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        />
      </div>

      {/* 草地 SVG 容器 */}
      <div className="relative mx-auto max-w-xl h-48 brutal-border bg-gradient-to-b from-[#E8F5D8] to-[#C8E6A0] overflow-hidden">
        {/* 土壤底层 */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#7B5E3C] border-t-[3px] border-black" />

        {/* 草苗 */}
        {SPROUTS.map((s) => {
          const isPulled = pulled.has(s.id);
          return (
            <motion.button
              key={s.id}
              data-magnetic
              onClick={(e) => pull(s.id, e)}
              disabled={isPulled}
              className="absolute cursor-pointer"
              style={{ left: `${s.x}%`, bottom: `${s.y}px` }}
              initial={{ y: 30, opacity: 0, rotate: s.rot }}
              animate={
                isPulled
                  ? { y: -200, opacity: 0, rotate: s.rot * 6, scale: 0.5 }
                  : { y: 0, opacity: 1, rotate: s.rot }
              }
              transition={
                isPulled
                  ? { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }
                  : { delay: s.delay, type: "spring", stiffness: 200 }
              }
              whileHover={!isPulled ? { y: -4, scale: 1.1 } : undefined}
            >
              <Sprout />
            </motion.button>
          );
        })}

        {/* 全拔完后的庆祝层 */}
        <AnimatePresence>
          {allPulled && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px]"
            >
              <div className="bg-[#FFE500] brutal-border brutal-shadow-lg px-6 py-3 -rotate-2">
                <p className="font-black text-lg">🎉 拔得真爽！</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="text-xs text-brutal-black/50 mt-4 font-bold">
        {allPulled ? "趁热打铁，去写第一篇真正的拔草日记吧 ↓" : "点击草苗即可拔出"}
      </p>

      <Link to="/diary/new" className="inline-block mt-4">
        <BrutalButton variant={allPulled ? "primary" : "dark"}>
          写第一篇 ✍️
        </BrutalButton>
      </Link>
    </div>
  );
}

/** 小草苗 SVG */
function Sprout() {
  return (
    <svg width="36" height="48" viewBox="0 0 36 48" fill="none">
      {/* 主茎 */}
      <path d="M18 48 Q18 30 18 14" stroke="#0A6B35" strokeWidth="3" strokeLinecap="round" />
      {/* 左叶 */}
      <path
        d="M18 30 Q8 25 4 14 Q14 18 18 30"
        fill="#00FF66"
        stroke="#1A1A1A"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* 右叶 */}
      <path
        d="M18 26 Q28 21 32 10 Q22 14 18 26"
        fill="#22C55E"
        stroke="#1A1A1A"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* 中叶 */}
      <path
        d="M18 14 Q14 4 18 0 Q22 4 18 14"
        fill="#84CC16"
        stroke="#1A1A1A"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
