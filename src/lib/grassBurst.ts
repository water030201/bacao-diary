/**
 * 触发"拔草飞溅"全局事件
 * 任何组件 import 后调用 triggerGrassBurst(x, y, count?) 即可
 */
export function triggerGrassBurst(x: number, y: number, count = 24) {
  window.dispatchEvent(
    new CustomEvent("grass-burst", { detail: { x, y, count } }),
  );
}

/** 从一个 DOM 元素中心爆发 */
export function burstFromElement(el: HTMLElement, count = 24) {
  const rect = el.getBoundingClientRect();
  triggerGrassBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, count);
}
