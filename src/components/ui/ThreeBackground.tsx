import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Props {
  /** 容器高度类名，默认 h-full（铺满父级） */
  className?: string;
}

/**
 * three.js 装饰背景：荧光绿粒子场 + 旋转线框正二十面体
 * - 粒子根据鼠标位置做视差
 * - 移动端 / prefers-reduced-motion 自动降级（不渲染）
 * - 透明背景，可叠在任何容器之上
 */
export default function ThreeBackground({ className = "absolute inset-0" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // 降级条件
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmall = window.innerWidth < 768;
    if (reduceMotion) return;

    const width = el.clientWidth;
    const height = el.clientHeight;

    // 场景 / 相机 / 渲染器
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // 粒子场
    const particleCount = isSmall ? 400 : 1200;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00ff66,
      size: 0.05,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 中央线框正二十面体（呼应粗野主义粗线条）
    const icoGeo = new THREE.IcosahedronGeometry(1.6, 0);
    const icoEdges = new THREE.EdgesGeometry(icoGeo);
    const icoMat = new THREE.LineBasicMaterial({
      color: 0x1a1a1a,
      transparent: true,
      opacity: 0.85,
    });
    const ico = new THREE.LineSegments(icoEdges, icoMat);
    scene.add(ico);

    // 第二层小一点的绿色线框
    const ico2Geo = new THREE.IcosahedronGeometry(1.0, 0);
    const ico2Edges = new THREE.EdgesGeometry(ico2Geo);
    const ico2Mat = new THREE.LineBasicMaterial({
      color: 0x00ff66,
      transparent: true,
      opacity: 0.7,
    });
    const ico2 = new THREE.LineSegments(ico2Edges, ico2Mat);
    scene.add(ico2);

    // 鼠标视差
    const mouse = { x: 0, y: 0 };
    const onMouse = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouse);

    // 自适应
    const onResize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(el);

    // 动画循环
    let raf = 0;
    const start = performance.now();
    const tick = () => {
      const t = (performance.now() - start) / 1000;

      ico.rotation.x = t * 0.25;
      ico.rotation.y = t * 0.32;
      ico2.rotation.x = -t * 0.4;
      ico2.rotation.y = -t * 0.28;

      particles.rotation.y = t * 0.04;
      particles.rotation.x = Math.sin(t * 0.15) * 0.1;

      // 相机视差
      camera.position.x += (mouse.x * 0.6 - camera.position.x) * 0.04;
      camera.position.y += (mouse.y * 0.4 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouse);
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      icoGeo.dispose();
      icoEdges.dispose();
      icoMat.dispose();
      ico2Geo.dispose();
      ico2Edges.dispose();
      ico2Mat.dispose();
      if (renderer.domElement.parentNode === el) {
        el.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} aria-hidden className={`pointer-events-none ${className}`} />;
}
