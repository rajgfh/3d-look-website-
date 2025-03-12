import { useState } from "react";
import { motion } from "framer-motion";
import { ThreeDCard } from "../ui/3d-card";
import { Badge } from "../ui/badge";
import { NeumorphicButton } from "../ui/neumorphic-button";
import { Link } from "react-router-dom";

export type SubscriptionTier = "free" | "pro" | "ultimate";

export interface ToolCardProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  subscriptionTier: SubscriptionTier;
  imageUrl?: string;
  path: string;
}

export function ToolCard({
  id,
  name,
  description,
  icon,
  category,
  subscriptionTier,
  imageUrl,
  path,
}: ToolCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Determine badge color based on subscription tier
  const getBadgeVariant = () => {
    switch (subscriptionTier) {
      case "free":
        return "default";
      case "pro":
        return "secondary";
      case "ultimate":
        return "destructive";
      default:
        return "default";
    }
  };

  // Format subscription tier text
  const formatTierText = (tier: SubscriptionTier) => {
    return tier.charAt(0).toUpperCase() + tier.slice(1);
  };

  return (
    <ThreeDCard
      className="w-full h-full min-h-[280px] cursor-pointer"
      onClick={() => {}}
    >
      <Link
        to={path}
        className="block w-full h-full p-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col h-full">
          {/* Tool icon and subscription badge */}
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl">
              {icon}
            </div>

            <motion.div
              initial={{ y: 0 }}
              animate={{ y: isHovered ? -5 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Badge variant={getBadgeVariant()} className="ml-auto">
                {formatTierText(subscriptionTier)}
              </Badge>
            </motion.div>
          </div>

          {/* Tool info */}
          <div className="flex-grow">
            <h3 className="text-xl font-semibold mb-2">{name}</h3>
            <p className="text-muted-foreground text-sm mb-4">{description}</p>
          </div>

          {/* Action button */}
          <motion.div
            initial={{ opacity: 0.8, y: 0 }}
            animate={{ opacity: isHovered ? 1 : 0.8, y: isHovered ? -5 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <NeumorphicButton variant="accent" className="w-full">
              Try Now
            </NeumorphicButton>
          </motion.div>
        </div>
      </Link>
    </ThreeDCard>
  );
}
