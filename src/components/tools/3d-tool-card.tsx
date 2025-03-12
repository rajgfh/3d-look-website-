import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { GlassmorphismCard } from "../ui/glassmorphism-card";
import { Badge } from "../ui/badge";
import { Sparkles, Lock } from "lucide-react";

export interface ToolCardProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  subscriptionTier: "free" | "pro" | "ultimate";
  imageUrl: string;
  path: string;
  onClick?: () => void;
}

const SubscriptionBadge = ({ tier }: { tier: "free" | "pro" | "ultimate" }) => {
  const variants = {
    free: {
      bg: "bg-green-500/80",
      text: "Free",
      icon: null,
    },
    pro: {
      bg: "bg-indigo-500/80",
      text: "Pro",
      icon: <Sparkles size={12} className="mr-1" />,
    },
    ultimate: {
      bg: "bg-purple-500/80",
      text: "Ultimate",
      icon: <Lock size={12} className="mr-1" />,
    },
  };

  const { bg, text, icon } = variants[tier];

  return (
    <motion.div
      className={`absolute top-3 right-3 z-10 ${bg} backdrop-blur-sm px-3 py-1 rounded-full flex items-center text-white text-xs font-medium shadow-lg`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {icon}
      {text}
    </motion.div>
  );
};

// Simplified 3D floating icon component
const FloatingIcon = ({
  isHovered,
  icon,
}: {
  isHovered: boolean;
  icon: string;
}) => {
  return (
    <motion.div
      className="relative w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg"
      animate={{
        y: isHovered ? [0, -5, 0] : 0,
        rotateY: isHovered ? [0, 180, 360] : 0,
      }}
      transition={{
        duration: isHovered ? 3 : 0,
        repeat: isHovered ? Infinity : 0,
        ease: "easeInOut",
      }}
    >
      <div className="text-3xl">{icon}</div>
      <motion.div
        className="absolute inset-0 bg-indigo-400 rounded-full mix-blend-overlay opacity-50"
        animate={{
          scale: isHovered ? [1, 1.1, 1] : 1,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

const ThreeDToolCard = ({
  id = "sample-tool",
  name = "AI Tool",
  description = "This is a sample AI tool with amazing capabilities.",
  icon = "🔮",
  category = "AI Tools",
  subscriptionTier = "free",
  imageUrl = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
  path = "/tools/sample",
  onClick = () => {},
}: ToolCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position values for 3D effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for mouse movement
  const springConfig = { damping: 25, stiffness: 300 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  // Transform mouse position into rotation values
  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  // Handle mouse move for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate normalized mouse position (-0.5 to 0.5)
    const xValue = (e.clientX - rect.left) / width - 0.5;
    const yValue = (e.clientY - rect.top) / height - 0.5;

    // Update motion values
    x.set(xValue);
    y.set(yValue);
  };

  // Reset card position when mouse leaves
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative w-full h-[450px] bg-slate-900 rounded-xl overflow-hidden cursor-pointer"
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* 3D Rotation Container */}
      <motion.div
        className="w-full h-full"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Subscription Badge */}
        <SubscriptionBadge tier={subscriptionTier} />

        {/* Card Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900/90" />
        </div>

        {/* Floating Icon (simplified version) */}
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <FloatingIcon isHovered={isHovered} icon={icon} />
        </div>

        {/* Card Content */}
        <GlassmorphismCard
          className="absolute bottom-0 left-0 right-0 p-6 z-10 rounded-t-3xl rounded-b-none border-t border-white/10"
          hoverEffect={false}
        >
          <div className="space-y-3">
            <Badge className="bg-white/10 text-white hover:bg-white/20 transition-colors">
              {category}
            </Badge>

            <h3 className="text-xl font-bold text-white">{name}</h3>

            <p className="text-white/70 text-sm line-clamp-3">{description}</p>

            <motion.div
              className="mt-4 text-sm font-medium text-indigo-300 flex items-center"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: isHovered ? 1 : 0.7 }}
              transition={{ duration: 0.2 }}
            >
              Explore Tool
              <motion.span
                className="ml-1"
                initial={{ x: 0 }}
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.2 }}
              >
                →
              </motion.span>
            </motion.div>
          </div>
        </GlassmorphismCard>

        {/* Shine Effect on Hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-indigo-500/0 via-indigo-500/10 to-purple-500/0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default ThreeDToolCard;
