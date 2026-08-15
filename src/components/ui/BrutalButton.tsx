import { motion } from "framer-motion";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "dark" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
}

const variants = {
  primary: "bg-primary text-brutal-black brutal-border brutal-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none",
  dark: "bg-brutal-black text-brutal-white brutal-border brutal-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none",
  outline: "bg-brutal-white text-brutal-black brutal-border brutal-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:bg-accent active:text-brutal-black",
  danger: "bg-danger text-brutal-white brutal-border brutal-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none",
};

const sizes = {
  sm: "px-4 py-1.5 text-sm",
  md: "px-6 py-2.5 text-base",
  lg: "px-10 py-3.5 text-lg",
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
      className={`font-bold cursor-pointer transition-all duration-100 rounded-lg ${variants[variant]} ${sizes[size]} ${className}`}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
}
