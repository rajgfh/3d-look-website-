import { useState } from "react";

interface FloatingObjectProps {
  position?: [number, number, number];
  color?: string;
  scale?: number;
  rotationSpeed?: number;
  floatSpeed?: number;
  floatHeight?: number;
  shape?: "box" | "sphere" | "torus" | "cone" | "cylinder";
  onClick?: () => void;
}

// Import from simplified version to avoid Three.js dependency issues
export { FloatingObject } from "./simplified-floating-object";
