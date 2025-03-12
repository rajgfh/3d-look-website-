import { ReactNode } from "react";

interface ThreeDCanvasProps {
  children: ReactNode;
  cameraPosition?: [number, number, number];
  controlsEnabled?: boolean;
  className?: string;
  background?: string;
}

// Import from simplified version to avoid Three.js dependency issues
export { ThreeDCanvas } from "./simplified-3d-canvas";
