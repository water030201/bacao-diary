import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import BrutalButton from "../components/ui/BrutalButton";

export default function NotFoundPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", bounce: 0.4 }}
      >
        <h1 className="text-[8rem] md:text-[12rem] font-black leading-none text-primary">
          404
        </h1>
        <div className="brutal-border bg-brutal-black text-brutal-white inline-block px-6 py-2 mb-6">
          <p className="text-xl font-black">页面走丢了！</p>
        </div>
        <p className="text-brutal-black/60 mb-8 text-lg">
          这个页面可能已经被「拔草」了... 🌿
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/">
            <BrutalButton variant="dark" size="lg">回到首页 🏠</BrutalButton>
          </Link>
          <Link to="/diary">
            <BrutalButton variant="outline" size="lg">看看日记 📖</BrutalButton>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
