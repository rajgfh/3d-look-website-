import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  baseVelocity?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function ParallaxSection({
  children,
  className = "",
  baseVelocity = 0.2,
  direction = "up",
}: ParallaxSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Calculate transform values based on direction
  const getTransformValues = () => {
    const factor = direction === "down" || direction === "right" ? -1 : 1;
    const velocity = baseVelocity * factor;

    if (direction === "up" || direction === "down") {
      return {
        y: useTransform(scrollYProgress, [0, 1], ["0%", `${velocity * 100}%`]),
        x: 0,
      };
    } else {
      return {
        x: useTransform(scrollYProgress, [0, 1], ["0%", `${velocity * 100}%`]),
        y: 0,
      };
    }
  };

  const { x, y } = getTransformValues();

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ x, y }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
}
