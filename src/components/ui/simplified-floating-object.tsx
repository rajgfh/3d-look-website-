import { useState } from "react";
import { motion } from "framer-motion";

interface SimplifiedFloatingObjectProps {
  position?: [number, number, number];
  color?: string;
  scale?: number;
  shape?: "box" | "sphere" | "torus" | "cone" | "cylinder";
  onClick?: () => void;
  floatSpeed?: number;
  floatHeight?: number;
  rotationSpeed?: number;
}

export function FloatingObject({
  color = "#6366f1",
  scale = 1,
  shape = "sphere",
  onClick,
  position = [0, 0, 0],
  floatSpeed = 1,
  floatHeight = 0.1,
  rotationSpeed = 0.01,
}: SimplifiedFloatingObjectProps) {
  const [hovered, setHovered] = useState(false);

  // Simplified shape rendering
  const renderShape = () => {
    const size = 50 * scale;
    const styles = {
      width: `${size}px`,
      height: `${size}px`,
      background: `linear-gradient(135deg, ${color}, ${color}80)`,
      boxShadow: hovered ? `0 0 15px ${color}` : "none",
      transition: "all 0.3s ease",
    };

    switch (shape) {
      case "box":
        return <div style={{ ...styles, borderRadius: "10px" }} />;
      case "sphere":
        return <div style={{ ...styles, borderRadius: "50%" }} />;
      case "torus":
        return (
          <div
            style={{
              ...styles,
              borderRadius: "50%",
              border: `10px solid ${color}`,
              background: "transparent",
            }}
          />
        );
      case "cone":
        return (
          <div
            style={{
              width: "0",
              height: "0",
              borderLeft: `${size / 2}px solid transparent`,
              borderRight: `${size / 2}px solid transparent`,
              borderBottom: `${size}px solid ${color}`,
            }}
          />
        );
      case "cylinder":
        return <div style={{ ...styles, borderRadius: "10px" }} />;
      default:
        return <div style={{ ...styles, borderRadius: "50%" }} />;
    }
  };

  // Adjust animation speed based on floatSpeed prop
  const animationDuration = 5 / (floatSpeed || 1);

  return (
    <motion.div
      animate={{
        y: [0, 10, 0],
        rotate: [0, 5, 0, -5, 0],
      }}
      transition={{
        repeat: Infinity,
        duration: animationDuration,
        ease: "easeInOut",
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative"
    >
      {renderShape()}
    </motion.div>
  );
}
