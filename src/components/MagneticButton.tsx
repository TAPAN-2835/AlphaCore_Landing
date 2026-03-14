import { useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  onClick?: () => void;
}

const MagneticButton = ({ children, variant = "primary", className = "", onClick }: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    setPos({ x, y });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  const base = variant === "primary"
    ? "relative overflow-hidden bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-lg transition-shadow duration-300 hover:shadow-[0_0_30px_hsl(var(--cyber-cyan)/0.4)]"
    : "relative overflow-hidden border border-primary/30 text-primary font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:border-primary/60 hover:bg-primary/5";

  return (
    <motion.button
      ref={ref}
      className={`${base} ${className}`}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
    >
      {variant === "primary" && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 hover:opacity-20 transition-opacity duration-300" />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default MagneticButton;
