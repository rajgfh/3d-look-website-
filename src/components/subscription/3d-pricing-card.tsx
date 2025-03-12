import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Check, Star } from "lucide-react";
import { ThreeDCanvas } from "../ui/simplified-3d-canvas";
import { FloatingObject } from "../ui/simplified-floating-object";
import { GlassmorphismCard } from "../ui/glassmorphism-card";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface PricingFeature {
  name: string;
  included: boolean;
}

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  billingPeriod: "monthly" | "yearly";
  features: PricingFeature[];
  popular?: boolean;
  color?: string;
  shape?: "box" | "sphere" | "torus" | "cone" | "cylinder";
}

interface PricingCardProps {
  plan: PricingPlan;
  onSelectPlan?: (planId: string) => void;
  className?: string;
}

const defaultFeatures: PricingFeature[] = [
  { name: "Basic AI tools access", included: true },
  { name: "10 projects per month", included: true },
  { name: "Community support", included: true },
  { name: "Advanced AI tools", included: false },
  { name: "Unlimited projects", included: false },
  { name: "Priority support", included: false },
  { name: "Custom integrations", included: false },
];

const defaultPlan: PricingPlan = {
  id: "free",
  name: "Free",
  description: "Perfect for getting started with our basic tools",
  price: 0,
  billingPeriod: "monthly",
  features: defaultFeatures,
  color: "#6366f1",
  shape: "sphere",
};

const ThreeDPricingCard: React.FC<PricingCardProps> = ({
  plan = defaultPlan,
  onSelectPlan = () => {},
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (isHovered) {
      controls.start({
        y: -10,
        transition: { duration: 0.3 },
      });
    } else {
      controls.start({
        y: 0,
        transition: { duration: 0.5 },
      });
    }
  }, [isHovered, controls]);

  const handleSelectPlan = () => {
    onSelectPlan(plan.id);
  };

  return (
    <motion.div
      className={cn(
        "relative w-full max-w-sm mx-auto bg-background",
        className,
      )}
      animate={controls}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 3D Object Floating Above Card */}
      <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-32 h-32 z-10">
        <ThreeDCanvas>
          <FloatingObject
            shape={plan.shape || "sphere"}
            color={plan.color || "#6366f1"}
            scale={isHovered ? 1.2 : 1}
            rotationSpeed={isHovered ? 0.02 : 0.01}
            floatHeight={0.2}
            floatSpeed={isHovered ? 1.5 : 1}
          />
        </ThreeDCanvas>
      </div>

      {/* Popular Badge */}
      {plan.popular && (
        <div className="absolute -top-3 -right-3 z-20">
          <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
            <Star size={12} className="fill-white" />
            POPULAR
          </div>
        </div>
      )}

      <GlassmorphismCard
        className="pt-16 pb-6 px-6"
        hoverEffect={true}
        borderGlow={plan.popular}
      >
        {/* Card Header */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
          <p className="text-muted-foreground text-sm mb-4">
            {plan.description}
          </p>
          <div className="flex items-end justify-center">
            <span className="text-4xl font-bold">${plan.price}</span>
            {plan.price > 0 && (
              <span className="text-muted-foreground ml-2">
                /{plan.billingPeriod}
              </span>
            )}
          </div>
        </div>

        {/* Features List */}
        <ul className="space-y-3 mb-8">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <div
                className={`mt-0.5 flex-shrink-0 ${feature.included ? "text-green-500" : "text-muted-foreground"}`}
              >
                <Check
                  size={18}
                  className={feature.included ? "opacity-100" : "opacity-40"}
                />
              </div>
              <span
                className={
                  feature.included
                    ? "text-foreground"
                    : "text-muted-foreground line-through opacity-70"
                }
              >
                {feature.name}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Button
          onClick={handleSelectPlan}
          className={cn(
            "w-full transition-all duration-300",
            plan.popular
              ? "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
              : "",
          )}
          size="lg"
        >
          {plan.price === 0 ? "Get Started" : "Subscribe Now"}
        </Button>
      </GlassmorphismCard>
    </motion.div>
  );
};

export default ThreeDPricingCard;
