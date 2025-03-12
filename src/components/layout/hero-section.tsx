import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ThreeDCanvas } from "../ui/3d-canvas";
import { FloatingObject } from "../ui/floating-object";
import { ParallaxSection } from "../ui/parallax-section";
import { NeumorphicButton } from "../ui/neumorphic-button";
import { GlassmorphismCard } from "../ui/glassmorphism-card";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-slate-900 to-indigo-900 flex items-center justify-center"
    >
      {/* Background 3D objects */}
      <div className="absolute inset-0 z-0">
        <ThreeDCanvas controlsEnabled={false}>
          <FloatingObject
            position={[-3, 2, -5]}
            shape="sphere"
            color="#6366f1"
            scale={1.5}
            floatSpeed={0.5}
          />
          <FloatingObject
            position={[4, -2, -10]}
            shape="torus"
            color="#8b5cf6"
            scale={2}
            floatSpeed={0.3}
          />
          <FloatingObject
            position={[-5, -3, -8]}
            shape="box"
            color="#ec4899"
            scale={1}
            floatSpeed={0.7}
          />
          <FloatingObject
            position={[5, 3, -12]}
            shape="cone"
            color="#14b8a6"
            scale={1.2}
            floatSpeed={0.4}
          />
          <FloatingObject
            position={[0, -4, -6]}
            shape="cylinder"
            color="#f43f5e"
            scale={0.8}
            floatSpeed={0.6}
          />
        </ThreeDCanvas>
      </div>

      {/* Content with parallax effect */}
      <motion.div
        className="container mx-auto px-4 z-10 relative"
        style={{ y, opacity }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero text */}
          <div className="text-center lg:text-left">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Discover Our AI-Powered 3D Tools Collection
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-white/80 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Explore our comprehensive suite of AI tools designed to enhance
              your creativity, productivity, and digital experience with
              stunning 3D visuals.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <NeumorphicButton variant="accent" size="lg">
                Explore Tools
              </NeumorphicButton>
              <NeumorphicButton variant="default" size="lg">
                Learn More
              </NeumorphicButton>
            </motion.div>
          </div>

          {/* Feature cards with parallax */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ParallaxSection direction="up" baseVelocity={0.1}>
              <GlassmorphismCard className="h-full" borderGlow>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  AI Image Generation
                </h3>
                <p className="text-white/70">
                  Create stunning visuals from text descriptions with our
                  advanced AI models.
                </p>
              </GlassmorphismCard>
            </ParallaxSection>

            <ParallaxSection direction="down" baseVelocity={0.15}>
              <GlassmorphismCard className="h-full">
                <h3 className="text-xl font-semibold mb-2 text-white">
                  3D Avatar Creation
                </h3>
                <p className="text-white/70">
                  Design personalized 3D avatars with customizable features and
                  styles.
                </p>
              </GlassmorphismCard>
            </ParallaxSection>

            <ParallaxSection direction="up" baseVelocity={0.2}>
              <GlassmorphismCard className="h-full">
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Voice Synthesis
                </h3>
                <p className="text-white/70">
                  Convert text to lifelike speech with customizable voices and
                  emotions.
                </p>
              </GlassmorphismCard>
            </ParallaxSection>

            <ParallaxSection direction="down" baseVelocity={0.25}>
              <GlassmorphismCard className="h-full" borderGlow>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Video Generation
                </h3>
                <p className="text-white/70">
                  Create dynamic videos from text prompts with our cutting-edge
                  AI technology.
                </p>
              </GlassmorphismCard>
            </ParallaxSection>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-white/50 rounded-full" />
        </div>
      </motion.div>
    </div>
  );
}
