import { MainLayout } from "@/components/layout/main-layout";
import { HeroSection } from "@/components/layout/hero-section";
import { ToolsGrid } from "@/components/tools/tools-grid";
import { categories, tools } from "@/components/tools/tool-categories";
import { PricingSection } from "@/components/subscription/pricing-section";

export default function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
      <section id="tools" className="py-20 bg-background">
        <div className="container mx-auto px-4 mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Our AI Tools
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our comprehensive collection of AI-powered tools designed
            to enhance your creativity and productivity.
          </p>
        </div>
        <ToolsGrid tools={tools} categories={categories} />
      </section>
      <PricingSection />
    </MainLayout>
  );
}
