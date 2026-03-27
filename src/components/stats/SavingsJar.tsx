import { motion } from "framer-motion";
import CountUp from "../ui/CountUp";

interface Props {
  amount: number;
  maxAmount?: number;
}

export default function SavingsJar({ amount, maxAmount = 5000 }: Props) {
  const fillPercent = Math.min((amount / maxAmount) * 100, 100);

  return (
    <div className="text-center">
      <div className="relative w-48 h-64 mx-auto brutal-border bg-brutal-white overflow-hidden">
        <div className="absolute top-4 left-0 right-0 z-10 text-center">
          <p className="font-black text-sm text-brutal-black/50">本可省下</p>
          <p className="font-black text-2xl text-danger">
            <CountUp end={amount} prefix="¥" />
          </p>
        </div>
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${fillPercent}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute bottom-0 left-0 right-0 bg-danger/20"
        />
        <div className="absolute bottom-4 left-0 right-0 text-center text-3xl">
          💰
        </div>
      </div>
      <p className="mt-2 text-sm text-brutal-black/50 font-bold">存钱罐</p>
    </div>
  );
}
