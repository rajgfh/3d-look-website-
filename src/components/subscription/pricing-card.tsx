import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ThreeDCard } from "../ui/3d-card";
import { NeumorphicButton } from "../ui/neumorphic-button";

export interface PricingFeature {
  name: string;
  included: boolean;
}

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: number;
  billingPeriod: "monthly" | "yearly";
  features: PricingFeature[];
  highlighted?: boolean;
  ctaText: string;
}

interface PricingCardProps {
  tier: PricingTier;
  onSelectPlan: (planId: string) => void;
}

export function PricingCard({ tier, onSelectPlan }: PricingCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Determine card styling based on whether it's highlighted
  const cardDepth = tier.highlighted ? 15 : 10;
  const cardShadow = tier.highlighted
    ? "0 20px 40px -5px rgba(0, 0, 0, 0.4)"
    : "0 10px 30px -5px rgba(0, 0, 0, 0.3)";

  return (
    <ThreeDCard
      className={`w-full h-full ${tier.highlighted ? "z-10" : "z-0"}`}
      depth={cardDepth}
      shadow={cardShadow}
      backgroundColor={
        tier.highlighted ? "hsl(var(--primary))" : "hsl(var(--card))"
      }
    >
      <div
        className="h-full p-8 flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Tier name and price */}
        <div className="mb-6">
          {tier.highlighted && (
            <motion.div
              className="inline-block px-3 py-1 mb-3 rounded-full text-sm font-medium bg-white/20 text-white"
              initial={{ opacity: 0.8, y: 0 }}
              animate={{
                opacity: isHovered ? 1 : 0.8,
                y: isHovered ? -5 : 0,
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Most Popular
            </motion.div>
          )}

          <h3
            className={`text-2xl font-bold ${tier.highlighted ? "text-white" : "text-foreground"}`}
          >
            {tier.name}
          </h3>

          <p
            className={`mt-2 ${tier.highlighted ? "text-white/80" : "text-muted-foreground"}`}
          >
            {tier.description}
          </p>
        </div>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-end">
            <span
              className={`text-4xl font-bold ${tier.highlighted ? "text-white" : "text-foreground"}`}
            >
              ${tier.price}
            </span>
            <span
              className={`ml-2 ${tier.highlighted ? "text-white/70" : "text-muted-foreground"}`}
            >
              /{tier.billingPeriod === "monthly" ? "mo" : "yr"}
            </span>
          </div>
        </div>

        {/* Features */}
        <div className="flex-grow mb-6">
          <ul className="space-y-3">
            {tier.features.map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-3"
                initial={{ opacity: 0.8, x: 0 }}
                animate={{
                  opacity: isHovered ? 1 : 0.8,
                  x: isHovered ? 3 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: index * 0.05,
                }}
              >
                <span
                  className={`mt-0.5 ${feature.included ? "text-green-500" : "text-muted-foreground"}`}
                >
                  {feature.included ? (
                    <Check size={18} />
                  ) : (
                    <span className="block w-4.5 h-0.5 bg-current rounded-full" />
                  )}
                </span>
                <span
                  className={`${tier.highlighted ? "text-white/90" : "text-muted-foreground"} ${!feature.included && "line-through opacity-50"}`}
                >
                  {feature.name}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0.9, y: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0.9,
            y: isHovered ? -5 : 0,
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <NeumorphicButton
            variant={tier.highlighted ? "accent" : "default"}
            className="w-full"
            onClick={() => onSelectPlan(tier.id)}
          >
            {tier.ctaText}
          </NeumorphicButton>
        </motion.div>
      </div>
    </ThreeDCard>
  );
}
