import { motion } from "framer-motion";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "dark" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
}

const variants = {
  primary: "bg-primary text-brutal-black brutal-border brutal-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none",
  dark: "bg-brutal-black text-brutal-white brutal-border brutal-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none",
  outline: "bg-brutal-white text-brutal-black brutal-border brutal-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none",
  danger: "bg-danger text-brutal-white brutal-border brutal-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none",
};

const sizes = {
  sm: "px-3 py-1 text-sm",
  md: "px-5 py-2 text-base",
  lg: "px-8 py-3 text-lg",
};

export default function BrutalButton({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: Props) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={`font-bold cursor-pointer transition-all duration-100 ${variants[variant]} ${sizes[size]} ${className}`}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
}
