import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface Props {
  items: AccordionItem[];
}

export default function Accordion({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="brutal-border bg-brutal-white rounded-xl brutal-shadow">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full p-5 flex justify-between items-center font-bold text-lg text-left cursor-pointer"
          >
            <span>{item.title}</span>
            <motion.span
              animate={{ rotate: openIndex === i ? 180 : 0 }}
              className="w-8 h-8 border-2 border-brutal-black rounded-full flex items-center justify-center text-sm shrink-0"
            >
              ▼
            </motion.span>
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0 text-brutal-black/80">{item.content}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
