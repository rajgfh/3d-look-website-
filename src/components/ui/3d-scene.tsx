import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

interface ThreeDSceneProps {
  objects?: Array<{
    shape: "box" | "sphere" | "torus" | "cone" | "cylinder";
    position: [number, number, number];
    color: string;
    scale: number;
    floatSpeed?: number;
    rotationSpeed?: number;
    floatHeight?: number;
  }>;
  interactive?: boolean;
  density?: number;
  background?: string;
  className?: string;
}

// Since we don't have access to the actual 3d-canvas and floating-object components,
// we'll create simplified versions directly in this file
const SimplifiedThreeDCanvas: React.FC<{
  children: React.ReactNode;
  background?: string;
  controlsEnabled?: boolean;
}> = ({ children, background = "transparent" }) => {
  return (
    <div className="w-full h-full" style={{ background }}>
      {children}
    </div>
  );
};

const SimplifiedFloatingObject: React.FC<{
  shape: "box" | "sphere" | "torus" | "cone" | "cylinder";
  position: [number, number, number];
  color: string;
  scale: number;
  floatSpeed?: number;
  rotationSpeed?: number;
  floatHeight?: number;
}> = ({ shape, color, scale = 1 }) => {
  // Create a div that represents the 3D object
  return (
    <div
      className="w-16 h-16 rounded-full"
      style={{
        backgroundColor: color,
        transform: `scale(${scale})`,
        borderRadius:
          shape === "sphere" ? "50%" : shape === "box" ? "0%" : "25%",
      }}
    />
  );
};

const defaultObjects = [
  {
    shape: "sphere" as const,
    position: [-3, 2, -5],
    color: "#6366f1",
    scale: 1.2,
    floatSpeed: 0.8,
    rotationSpeed: 0.01,
  },
  {
    shape: "torus" as const,
    position: [3, -1, -8],
    color: "#8b5cf6",
    scale: 1.5,
    floatSpeed: 0.6,
    rotationSpeed: 0.02,
  },
  {
    shape: "box" as const,
    position: [0, 3, -10],
    color: "#ec4899",
    scale: 1,
    floatSpeed: 1,
    rotationSpeed: 0.015,
  },
  {
    shape: "cone" as const,
    position: [-5, -2, -7],
    color: "#10b981",
    scale: 0.8,
    floatSpeed: 1.2,
    rotationSpeed: 0.025,
  },
  {
    shape: "cylinder" as const,
    position: [5, 2, -12],
    color: "#f59e0b",
    scale: 1.1,
    floatSpeed: 0.7,
    rotationSpeed: 0.018,
  },
];

export default function ThreeDScene({
  objects = defaultObjects,
  interactive = true,
  density = 5,
  background = "transparent",
  className = "",
}: ThreeDSceneProps) {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [randomObjects, setRandomObjects] = useState<typeof defaultObjects>([]);
  const sceneRef = useRef<HTMLDivElement>(null);

  // Generate random objects based on density
  useEffect(() => {
    if (!interactive) return;

    const generatedObjects = [];
    const colors = [
      "#6366f1",
      "#8b5cf6",
      "#ec4899",
      "#10b981",
      "#f59e0b",
      "#3b82f6",
    ];
    const shapes = ["sphere", "torus", "box", "cone", "cylinder"] as const;

    for (let i = 0; i < density; i++) {
      generatedObjects.push({
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        position: [
          Math.random() * 20 - 10,
          Math.random() * 20 - 10,
          Math.random() * -15 - 5,
        ] as [number, number, number],
        color: colors[Math.floor(Math.random() * colors.length)],
        scale: Math.random() * 0.8 + 0.4,
        floatSpeed: Math.random() * 0.8 + 0.4,
        rotationSpeed: Math.random() * 0.02 + 0.005,
        floatHeight: Math.random() * 0.2 + 0.05,
      });
    }

    setRandomObjects(generatedObjects);
  }, [density, interactive]);

  // Track mouse movement for parallax effect
  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!sceneRef.current) return;

      const rect = sceneRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [interactive]);

  // Combine provided objects with random ones if interactive
  const displayObjects = interactive ? [...objects, ...randomObjects] : objects;

  return (
    <div
      ref={sceneRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{ background }}
    >
      <SimplifiedThreeDCanvas background={background} controlsEnabled={false}>
        {displayObjects.map((obj, index) => {
          // Apply parallax effect based on mouse position if interactive
          const parallaxX = interactive
            ? obj.position[0] + mousePosition.x * ((index % 3) + 1) * 0.5
            : obj.position[0];
          const parallaxY = interactive
            ? obj.position[1] + mousePosition.y * ((index % 3) + 1) * 0.5
            : obj.position[1];
          const parallaxPosition: [number, number, number] = [
            parallaxX,
            parallaxY,
            obj.position[2],
          ];

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              style={{
                position: "absolute",
                transform: `translate3d(${parallaxPosition[0] * 30}px, ${parallaxPosition[1] * 30}px, 0)`,
                zIndex: Math.floor(parallaxPosition[2] * -1),
              }}
            >
              <SimplifiedFloatingObject
                shape={obj.shape}
                color={obj.color}
                scale={obj.scale}
                floatSpeed={obj.floatSpeed}
                rotationSpeed={obj.rotationSpeed}
                floatHeight={obj.floatHeight}
                position={parallaxPosition}
              />
            </motion.div>
          );
        })}
      </SimplifiedThreeDCanvas>
    </div>
  );
}
