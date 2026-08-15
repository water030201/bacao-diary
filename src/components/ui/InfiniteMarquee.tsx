import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right";
}

export default function InfiniteMarquee({ children, speed = 20, direction = "left" }: Props) {
  const x = direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"];

  return (
    <div className="overflow-hidden border-y-[4px] border-brutal-black bg-accent py-6">
      <motion.div
        className="flex whitespace-nowrap gap-8"
        animate={{ x }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
