import { useState, useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface ThreeDCardProps {
  children: ReactNode;
  className?: string;
  depth?: number;
  backgroundColor?: string;
  borderRadius?: string;
  shadow?: string;
  onClick?: () => void;
}

export function ThreeDCard({
  children,
  className = "",
  depth = 10,
  backgroundColor = "hsl(var(--card))",
  borderRadius = "1rem",
  shadow = "0 10px 30px -5px rgba(0, 0, 0, 0.3)",
  onClick,
}: ThreeDCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for tracking mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs for smoother animation
  const rotateX = useSpring(useTransform(y, [-100, 100], [depth, -depth]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-depth, depth]), {
    stiffness: 300,
    damping: 30,
  });

  // Scale spring for hover effect
  const scale = useSpring(isHovered ? 1.05 : 1, {
    stiffness: 300,
    damping: 30,
  });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from center
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Update motion values
    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    // Reset to neutral position
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transformStyle: "preserve-3d",
        scale,
      }}
    >
      <motion.div
        className="w-full h-full"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          backgroundColor,
          borderRadius,
          boxShadow: shadow,
        }}
      >
        {/* Main content */}
        <div className="w-full h-full">{children}</div>

        {/* Bottom reflection/shadow for 3D effect */}
        <motion.div
          className="absolute inset-0 z-[-1]"
          style={{
            transform: "translateZ(-4px)",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            borderRadius,
            filter: "blur(10px)",
            opacity: useTransform(y, [-100, 0, 100], [0.5, 0.2, 0.5]),
          }}
        />
      </motion.div>
    </motion.div>
  );
}
