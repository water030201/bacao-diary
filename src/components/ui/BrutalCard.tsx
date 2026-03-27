import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function BrutalCard({ children, className = "", hover = false, onClick }: Props) {
  return (
    <motion.div
      whileHover={hover ? { translateX: -2, translateY: -2, boxShadow: "6px 6px 0px #1A1A1A" } : undefined}
      onClick={onClick}
      className={`bg-brutal-white brutal-border brutal-shadow p-4 ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
}
