import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassmorphismCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  borderGlow?: boolean;
}

export function GlassmorphismCard({
  children,
  className,
  hoverEffect = true,
  borderGlow = false,
}: GlassmorphismCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-background/30 p-6 backdrop-blur-lg border border-white/10",
        hoverEffect &&
          "transition-all duration-300 hover:bg-background/40 hover:shadow-lg",
        borderGlow &&
          "before:absolute before:inset-0 before:-z-10 before:animate-pulse before:bg-gradient-to-r before:from-indigo-500 before:to-purple-500 before:opacity-70 before:blur-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
