import { useEffect, useRef } from "react";

interface Blade {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  size: number;
  color: string;
  life: number; // 0 → 1
  lifeSpeed: number;
}

const COLORS = ["#00FF66", "#0A6B35", "#22C55E", "#84CC16", "#FFE500", "#16A34A"];

/**
 * 全局 canvas 层 — 监听 "grass-burst" 事件，从触发坐标爆发草叶粒子
 * 每片草叶：上抛 + 重力下落 + 旋转 + 渐隐
 * 草叶形状：纤细的弯曲三角形（贝塞尔曲线绘制）
 */
export default function GrassBurstLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 自适应窗口
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const blades: Blade[] = [];

    const onBurst = (e: Event) => {
      const detail = (e as CustomEvent).detail as { x: number; y: number; count: number };
      const { x, y, count } = detail;
      for (let i = 0; i < count; i++) {
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.1; // 上抛 ±99°
        const speed = 5 + Math.random() * 7;
        blades.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          rot: Math.random() * Math.PI * 2,
          vr: (Math.random() - 0.5) * 0.4,
          size: 10 + Math.random() * 14,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          life: 0,
          lifeSpeed: 0.008 + Math.random() * 0.008,
        });
      }
    };
    window.addEventListener("grass-burst", onBurst);

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = blades.length - 1; i >= 0; i--) {
        const b = blades[i];
        // 物理：重力 + 空气阻力
        b.vy += 0.35;
        b.vx *= 0.99;
        b.vy *= 0.99;
        b.x += b.vx;
        b.y += b.vy;
        b.rot += b.vr;
        b.life += b.lifeSpeed;

        if (b.life >= 1 || b.y > window.innerHeight + 50) {
          blades.splice(i, 1);
          continue;
        }

        // 绘制草叶 — 贝塞尔曲线弯曲三角形
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.rot);
        ctx.globalAlpha = 1 - b.life;
        ctx.fillStyle = b.color;
        ctx.strokeStyle = "#1A1A1A";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        const s = b.size;
        ctx.moveTo(0, -s);
        ctx.quadraticCurveTo(s * 0.45, -s * 0.3, s * 0.18, s * 0.5);
        ctx.quadraticCurveTo(0, s * 0.65, -s * 0.18, s * 0.5);
        ctx.quadraticCurveTo(-s * 0.45, -s * 0.3, 0, -s);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }

      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("grass-burst", onBurst);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 pointer-events-none z-[9997]"
    />
  );
}
