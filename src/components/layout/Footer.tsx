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
