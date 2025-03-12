import { MainLayout } from "@/components/layout/main-layout";
import { ToolsGrid } from "@/components/tools/tools-grid";
import { categories, tools } from "@/components/tools/tool-categories";
import { ParallaxSection } from "@/components/ui/parallax-section";
import { ThreeDCanvas } from "@/components/ui/3d-canvas";
import { FloatingObject } from "@/components/ui/floating-object";

export default function ToolsPage() {
  return (
    <MainLayout>
      <div className="pt-24">
        {/* Hero section */}
        <section className="relative py-16 bg-gradient-to-b from-indigo-900 to-background overflow-hidden">
          {/* Background 3D objects */}
          <div className="absolute inset-0 z-0 opacity-20">
            <ThreeDCanvas controlsEnabled={false}>
              <FloatingObject
                position={[-5, 2, -10]}
                shape="sphere"
                color="#6366f1"
                scale={1.5}
                floatSpeed={0.2}
              />
              <FloatingObject
                position={[5, -3, -15]}
                shape="torus"
                color="#8b5cf6"
                scale={2}
                floatSpeed={0.15}
              />
              <FloatingObject
                position={[-8, -5, -12]}
                shape="box"
                color="#ec4899"
                scale={1}
                floatSpeed={0.25}
              />
            </ThreeDCanvas>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <ParallaxSection>
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  AI Tools Collection
                </h1>
                <p className="text-xl text-white/80 mb-8">
                  Explore our comprehensive suite of AI-powered tools designed
                  to enhance your creativity, productivity, and digital
                  experience.
                </p>
              </div>
            </ParallaxSection>
          </div>
        </section>

        {/* Tools grid */}
        <section className="py-12">
          <ToolsGrid tools={tools} categories={categories} />
        </section>
      </div>
    </MainLayout>
  );
}
