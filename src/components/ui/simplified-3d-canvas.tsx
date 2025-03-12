import { ReactNode } from "react";

interface SimplifiedThreeDCanvasProps {
  children: ReactNode;
  className?: string;
  background?: string;
  controlsEnabled?: boolean;
  cameraPosition?: [number, number, number];
}

export function ThreeDCanvas({
  children,
  className = "",
  background = "transparent",
  controlsEnabled = false,
  cameraPosition = [0, 0, 5],
}: SimplifiedThreeDCanvasProps) {
  return (
    <div
      className={`relative w-full h-full ${className}`}
      style={{ background }}
    >
      <div className="w-full h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
