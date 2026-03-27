import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { to: "/", label: "首页" },
  { to: "/diary", label: "日记" },
  { to: "/diary/new", label: "写日记" },
  { to: "/stats", label: "统计" },
  { to: "/category", label: "分类" },
  { to: "/achievements", label: "成就" },
  { to: "/user", label: "我的" },
];

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-primary brutal-border border-t-0 border-x-0 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-black text-brutal-black tracking-tight">
          🌿 拔草日记
        </Link>

        <nav className="hidden md:flex gap-1">
          {NAV_ITEMS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`px-3 py-1.5 font-bold text-sm transition-colors ${
                location.pathname === to
                  ? "bg-brutal-black text-primary"
                  : "text-brutal-black hover:bg-brutal-black/10"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl font-black cursor-pointer"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-primary border-t-3 border-brutal-black"
          >
            {NAV_ITEMS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={`block px-6 py-3 font-bold border-b border-brutal-black/20 ${
                  location.pathname === to ? "bg-brutal-black text-primary" : "text-brutal-black"
                }`}
              >
                {label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
