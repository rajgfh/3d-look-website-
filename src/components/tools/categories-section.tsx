import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categories } from "./tool-categories";
import { cn } from "@/lib/utils";
import { GlassmorphismCard } from "../ui/glassmorphism-card";
import { NeumorphicButton } from "../ui/neumorphic-button";
import { Button } from "../ui/button";
import { ThreeDCanvas } from "../ui/simplified-3d-canvas";
import { FloatingObject } from "../ui/simplified-floating-object";

interface CategoriesSectionProps {
  onCategorySelect?: (category: string) => void;
  selectedCategory?: string;
  className?: string;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  onCategorySelect = () => {},
  selectedCategory = "",
  className = "",
}) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [localSelectedCategory, setLocalSelectedCategory] =
    useState<string>(selectedCategory);

  // Update local state when prop changes
  useEffect(() => {
    setLocalSelectedCategory(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryClick = (category: string) => {
    const newCategory = localSelectedCategory === category ? "" : category;
    setLocalSelectedCategory(newCategory);
    onCategorySelect(newCategory);
  };

  // Map categories to 3D shapes and colors for visual variety
  const categoryVisuals = {
    "🎨 AI Image & Art": { shape: "sphere", color: "#6366f1" },
    "👩‍🎨 AI Avatar & Profile": { shape: "torus", color: "#8b5cf6" },
    "🎭 AI Fun & Entertainment": { shape: "box", color: "#ec4899" },
    "📄 AI Text & Writing": { shape: "cone", color: "#10b981" },
    "🎤 AI Voice & Audio": { shape: "cylinder", color: "#f59e0b" },
    "🎥 AI Video Editing": { shape: "sphere", color: "#3b82f6" },
    "📊 AI Business & Productivity": { shape: "torus", color: "#14b8a6" },
    "🔧 AI Utility & Conversion": { shape: "box", color: "#a855f7" },
    "🔍 AI Search & Information": { shape: "cone", color: "#f43f5e" },
    "🌐 AI Social Media & Engagement": { shape: "cylinder", color: "#0ea5e9" },
  };

  return (
    <div className={cn("w-full bg-slate-900", className)}>
      <GlassmorphismCard className="p-6">
        <div className="flex flex-col space-y-6">
          <div className="text-center mb-2">
            <h2 className="text-2xl font-bold mb-2">Browse by Category</h2>
            <p className="text-muted-foreground">
              Explore our AI tools by selecting a category below
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => {
              const isSelected = localSelectedCategory === category;
              const isHovered = hoveredCategory === category;
              const visual = categoryVisuals[
                category as keyof typeof categoryVisuals
              ] || {
                shape: "sphere",
                color: "#6366f1",
              };

              return (
                <motion.div
                  key={category}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  onHoverStart={() => setHoveredCategory(category)}
                  onHoverEnd={() => setHoveredCategory(null)}
                >
                  <Button
                    variant={isSelected ? "default" : "ghost"}
                    className={cn(
                      "w-full h-24 flex flex-col items-center justify-center gap-2 rounded-xl border transition-all duration-300",
                      isSelected
                        ? "border-primary bg-primary/10 text-primary shadow-lg"
                        : "border-transparent hover:border-white/10 hover:bg-white/5",
                      isHovered && !isSelected && "border-white/10 bg-white/5",
                    )}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {/* 3D Object */}
                    <div className="relative w-10 h-10">
                      <ThreeDCanvas controlsEnabled={false}>
                        <FloatingObject
                          shape={visual.shape as any}
                          color={visual.color}
                          scale={isHovered || isSelected ? 1.2 : 1}
                          rotationSpeed={isHovered || isSelected ? 0.02 : 0.005}
                          floatHeight={0.1}
                          floatSpeed={isHovered || isSelected ? 1.5 : 0.8}
                          position={[0, 0, 0]}
                        />
                      </ThreeDCanvas>
                    </div>

                    {/* Category Text */}
                    <span className="text-sm font-medium text-center">
                      {category.split(" ").slice(1).join(" ")}
                    </span>
                  </Button>

                  {/* Selection Indicator */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        className="absolute -bottom-1 left-1/2 w-6 h-1 bg-primary rounded-full"
                        initial={{ opacity: 0, x: "-50%", scale: 0 }}
                        animate={{ opacity: 1, x: "-50%", scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Clear Filter Button */}
          {localSelectedCategory && (
            <div className="flex justify-center mt-4">
              <NeumorphicButton
                variant="secondary"
                size="sm"
                onClick={() => handleCategoryClick("")}
                className="text-sm"
              >
                Clear Filter
              </NeumorphicButton>
            </div>
          )}
        </div>
      </GlassmorphismCard>
    </div>
  );
};

export default CategoriesSection;
