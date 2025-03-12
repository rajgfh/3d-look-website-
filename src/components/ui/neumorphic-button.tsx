import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

interface NeumorphicButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "primary" | "secondary" | "accent";
  size?: "sm" | "md" | "lg";
}

const NeumorphicButton = forwardRef<HTMLButtonElement, NeumorphicButtonProps>(
  (
    { className, variant = "default", size = "md", asChild = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    const baseStyles =
      "relative inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";

    const variantStyles = {
      default:
        "bg-background text-foreground shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff] active:shadow-[inset_6px_6px_12px_#c5c5c5,inset_-6px_-6px_12px_#ffffff]",
      primary:
        "bg-primary text-primary-foreground shadow-[6px_6px_12px_rgba(0,0,0,0.2),-6px_-6px_12px_rgba(255,255,255,0.1)] active:shadow-[inset_6px_6px_12px_rgba(0,0,0,0.2),inset_-6px_-6px_12px_rgba(255,255,255,0.1)]",
      secondary:
        "bg-secondary text-secondary-foreground shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.1)] active:shadow-[inset_6px_6px_12px_rgba(0,0,0,0.1),inset_-6px_-6px_12px_rgba(255,255,255,0.1)]",
      accent:
        "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-[6px_6px_12px_rgba(0,0,0,0.2),-6px_-6px_12px_rgba(255,255,255,0.1)] active:shadow-[inset_6px_6px_12px_rgba(0,0,0,0.2),inset_-6px_-6px_12px_rgba(255,255,255,0.1)]",
    };

    const sizeStyles = {
      sm: "h-9 px-3 text-sm",
      md: "h-11 px-5 text-base",
      lg: "h-14 px-8 text-lg",
    };

    return (
      <Comp
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

NeumorphicButton.displayName = "NeumorphicButton";

export { NeumorphicButton };
