import { motion } from "framer-motion";
import { EMOJI_RATINGS } from "../../types";

interface Props {
  value: number;
  onChange?: (value: 1 | 2 | 3 | 4 | 5) => void;
  size?: "sm" | "md" | "lg";
  readonly?: boolean;
}

const sizeMap = { sm: "text-xl", md: "text-3xl", lg: "text-5xl" };

export default function EmojiRating({ value, onChange, size = "md", readonly = false }: Props) {
  return (
    <div className="flex gap-2">
      {EMOJI_RATINGS.map((emoji, i) => {
        const rating = (i + 1) as 1 | 2 | 3 | 4 | 5;
        const isActive = rating <= value;
        return (
          <motion.button
            key={rating}
            type="button"
            whileTap={readonly ? undefined : { scale: 1.3 }}
            onClick={() => !readonly && onChange?.(rating)}
            className={`${sizeMap[size]} transition-opacity ${
              isActive ? "opacity-100" : "opacity-30"
            } ${readonly ? "cursor-default" : "cursor-pointer"}`}
            disabled={readonly}
          >
            {emoji}
          </motion.button>
        );
      })}
    </div>
  );
}
