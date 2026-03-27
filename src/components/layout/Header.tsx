import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { to: "/", label: "首页" },
  { to: "/diary", label: "日记广场" },
  { to: "/category", label: "商品分类" },
  { to: "/diary/new", label: "写日记" },
];

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-brutal-white sticky top-0 z-50 border-b-[3px] border-brutal-black">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="w-8 h-8 bg-primary brutal-border flex items-center justify-center text-sm font-black">草</span>
          <span className="text-xl font-black text-brutal-black">拔草日记</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6">
          {NAV_ITEMS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`font-bold text-sm transition-colors ${
                location.pathname === to
                  ? "text-brutal-black"
                  : "text-brutal-black/50 hover:text-brutal-black"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/user" className="w-10 h-10 brutal-border flex items-center justify-center hover:bg-brutal-black/5 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>
          <Link to="/diary/new">
            <button className="bg-primary brutal-border px-4 py-2 font-black text-sm cursor-pointer hover:bg-primary/80 transition-colors">
              写一篇
            </button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl font-black cursor-pointer"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-brutal-white border-t-[3px] border-brutal-black"
          >
            {NAV_ITEMS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={`block px-6 py-3 font-bold border-b border-brutal-black/10 ${
                  location.pathname === to ? "bg-primary/10 text-brutal-black" : "text-brutal-black/70"
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              to="/diary/new"
              onClick={() => setMenuOpen(false)}
              className="block px-6 py-3 font-black text-primary-dark"
            >
              写一篇 →
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
