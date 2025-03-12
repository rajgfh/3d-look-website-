import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/main-layout";
import { ThreeDCanvas } from "@/components/ui/3d-canvas";
import { FloatingObject } from "@/components/ui/floating-object";
import { GlassmorphismCard } from "@/components/ui/glassmorphism-card";
import { NeumorphicButton } from "@/components/ui/neumorphic-button";
import { ParallaxSection } from "@/components/ui/parallax-section";
import { tools } from "./tool-categories";
import { ArrowLeft, Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function ToolDetail() {
  const { toolId } = useParams<{ toolId: string }>();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [input, setInput] = useState("");

  // Find the tool by ID
  const tool = tools.find((t) => t.id === toolId);

  if (!tool) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Tool Not Found</h1>
          <p className="mb-8">The tool you're looking for doesn't exist.</p>
          <NeumorphicButton onClick={() => navigate("/tools")}>
            Back to Tools
          </NeumorphicButton>
        </div>
      </MainLayout>
    );
  }

  // Check if the tool requires a subscription
  const isLocked = tool.subscriptionTier !== "free";

  // Handle tool processing
  const handleProcess = () => {
    if (isLocked) {
      // Show subscription modal or redirect to pricing
      navigate("/pricing");
      return;
    }

    setIsProcessing(true);

    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);

      // Generate a mock result based on the tool type
      if (tool.category.includes("Image") || tool.category.includes("Avatar")) {
        setResult(
          `https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80&t=${Date.now()}`,
        );
      } else if (
        tool.category.includes("Text") ||
        tool.category.includes("Writing")
      ) {
        setResult(
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.",
        );
      } else {
        setResult("Tool processed successfully! This is a demo result.");
      }
    }, 2000);
  };

  // Render input field based on tool category
  const renderInput = () => {
    if (tool.category.includes("Image") || tool.category.includes("Avatar")) {
      return (
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Upload Image or Enter Prompt
          </label>
          <div className="flex gap-4">
            <input
              type="file"
              className="flex-grow p-3 rounded-lg bg-background/50 border border-border"
              accept="image/*"
            />
            <span className="text-muted-foreground self-center">OR</span>
            <input
              type="text"
              placeholder="Enter a text prompt..."
              className="flex-grow p-3 rounded-lg bg-background/50 border border-border"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        </div>
      );
    } else if (
      tool.category.includes("Text") ||
      tool.category.includes("Writing")
    ) {
      return (
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Enter Text</label>
          <textarea
            placeholder="Enter your text here..."
            className="w-full p-3 rounded-lg bg-background/50 border border-border min-h-[150px]"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      );
    } else if (
      tool.category.includes("Voice") ||
      tool.category.includes("Audio")
    ) {
      return (
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Upload Audio or Enter Text
          </label>
          <div className="flex gap-4 mb-4">
            <input
              type="file"
              className="flex-grow p-3 rounded-lg bg-background/50 border border-border"
              accept="audio/*"
            />
            <span className="text-muted-foreground self-center">OR</span>
            <button className="p-3 rounded-lg bg-primary text-primary-foreground">
              Record Audio
            </button>
          </div>
          <textarea
            placeholder="Or enter text to convert to speech..."
            className="w-full p-3 rounded-lg bg-background/50 border border-border"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      );
    } else if (tool.category.includes("Video")) {
      return (
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Upload Video or Enter Prompt
          </label>
          <div className="flex gap-4">
            <input
              type="file"
              className="flex-grow p-3 rounded-lg bg-background/50 border border-border"
              accept="video/*"
            />
            <span className="text-muted-foreground self-center">OR</span>
            <input
              type="text"
              placeholder="Enter a text prompt for video generation..."
              className="flex-grow p-3 rounded-lg bg-background/50 border border-border"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Input</label>
          <input
            type="text"
            placeholder="Enter your input here..."
            className="w-full p-3 rounded-lg bg-background/50 border border-border"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      );
    }
  };

  // Render result based on tool category
  const renderResult = () => {
    if (!result) return null;

    if (tool.category.includes("Image") || tool.category.includes("Avatar")) {
      return (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Result</h3>
          <div className="rounded-lg overflow-hidden border border-border">
            <img
              src={result}
              alt="Generated result"
              className="w-full h-auto"
            />
          </div>
          <div className="mt-4 flex justify-end gap-4">
            <NeumorphicButton variant="default" size="sm">
              Download
            </NeumorphicButton>
            <NeumorphicButton variant="accent" size="sm">
              Share
            </NeumorphicButton>
          </div>
        </div>
      );
    } else if (
      tool.category.includes("Text") ||
      tool.category.includes("Writing")
    ) {
      return (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Result</h3>
          <GlassmorphismCard>
            <p className="whitespace-pre-wrap">{result}</p>
          </GlassmorphismCard>
          <div className="mt-4 flex justify-end gap-4">
            <NeumorphicButton variant="default" size="sm">
              Copy
            </NeumorphicButton>
            <NeumorphicButton variant="accent" size="sm">
              Download
            </NeumorphicButton>
          </div>
        </div>
      );
    } else if (
      tool.category.includes("Voice") ||
      tool.category.includes("Audio")
    ) {
      return (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Result</h3>
          <GlassmorphismCard className="p-4">
            <div className="flex items-center justify-center p-4">
              <audio controls className="w-full">
                <source src="#" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </GlassmorphismCard>
          <div className="mt-4 flex justify-end gap-4">
            <NeumorphicButton variant="default" size="sm">
              Download
            </NeumorphicButton>
            <NeumorphicButton variant="accent" size="sm">
              Share
            </NeumorphicButton>
          </div>
        </div>
      );
    } else if (tool.category.includes("Video")) {
      return (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Result</h3>
          <GlassmorphismCard className="p-4">
            <div className="flex items-center justify-center p-4">
              <video controls className="w-full rounded-lg">
                <source src="#" type="video/mp4" />
                Your browser does not support the video element.
              </video>
            </div>
          </GlassmorphismCard>
          <div className="mt-4 flex justify-end gap-4">
            <NeumorphicButton variant="default" size="sm">
              Download
            </NeumorphicButton>
            <NeumorphicButton variant="accent" size="sm">
              Share
            </NeumorphicButton>
          </div>
        </div>
      );
    } else {
      return (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Result</h3>
          <GlassmorphismCard>
            <p>{result}</p>
          </GlassmorphismCard>
        </div>
      );
    }
  };

  return (
    <MainLayout>
      <div className="pt-24 pb-20">
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
            </ThreeDCanvas>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex items-center mb-6">
              <button
                onClick={() => navigate("/tools")}
                className="flex items-center text-white/80 hover:text-white transition-colors"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back to Tools
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl">
                {tool.icon}
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl font-bold text-white">{tool.name}</h1>
                  {isLocked && (
                    <div className="flex items-center gap-1 text-amber-400">
                      <Lock size={18} />
                      <span className="text-sm font-medium">
                        {tool.subscriptionTier.charAt(0).toUpperCase() +
                          tool.subscriptionTier.slice(1)}
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-xl text-white/80 mt-2">{tool.description}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tool interface */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Tool controls */}
              <div className="lg:col-span-2">
                <GlassmorphismCard>
                  <h2 className="text-2xl font-bold mb-6">Use This Tool</h2>

                  {renderInput()}

                  <div className="flex justify-end">
                    <NeumorphicButton
                      variant="accent"
                      onClick={handleProcess}
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : "Process"}
                    </NeumorphicButton>
                  </div>

                  {renderResult()}
                </GlassmorphismCard>
              </div>

              {/* Tool info */}
              <div>
                <ParallaxSection>
                  <GlassmorphismCard>
                    <h3 className="text-xl font-semibold mb-4">
                      About This Tool
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {tool.description} This tool uses advanced AI algorithms
                      to deliver high-quality results quickly and efficiently.
                    </p>

                    <h4 className="font-semibold mb-2">Features:</h4>
                    <ul className="list-disc list-inside mb-6 text-muted-foreground">
                      <li>High-quality output</li>
                      <li>Fast processing</li>
                      <li>Multiple export options</li>
                      <li>Customizable settings</li>
                    </ul>

                    {isLocked && (
                      <div className="bg-muted/30 p-4 rounded-lg mb-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Lock size={16} className="text-amber-400" />
                          <h4 className="font-semibold">
                            {tool.subscriptionTier.charAt(0).toUpperCase() +
                              tool.subscriptionTier.slice(1)}{" "}
                            Feature
                          </h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          This tool requires a{" "}
                          {tool.subscriptionTier === "pro" ? "Pro" : "Ultimate"}{" "}
                          subscription. Upgrade your plan to access this and
                          many other premium features.
                        </p>
                        <div className="mt-4">
                          <NeumorphicButton
                            variant="accent"
                            className="w-full"
                            onClick={() => navigate("/pricing")}
                          >
                            View Pricing Plans
                          </NeumorphicButton>
                        </div>
                      </div>
                    )}

                    <h4 className="font-semibold mb-2">Related Tools:</h4>
                    <div className="space-y-3">
                      {tools
                        .filter(
                          (t) =>
                            t.category === tool.category && t.id !== tool.id,
                        )
                        .slice(0, 3)
                        .map((relatedTool) => (
                          <motion.div
                            key={relatedTool.id}
                            whileHover={{ x: 5 }}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors"
                          >
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                              {relatedTool.icon}
                            </div>
                            <div
                              className="flex-grow cursor-pointer"
                              onClick={() =>
                                navigate(`/tools/${relatedTool.id}`)
                              }
                            >
                              <h5 className="font-medium">
                                {relatedTool.name}
                              </h5>
                              <p className="text-xs text-muted-foreground">
                                {relatedTool.description.substring(0, 60)}...
                              </p>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </GlassmorphismCard>
                </ParallaxSection>
              </div>
            </div>
          </div>
        </section>

        {/* Examples section */}
        <section className="py-12 bg-muted/10">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Example Results
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <GlassmorphismCard key={i}>
                  <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-muted/30">
                    <img
                      src={`https://images.unsplash.com/photo-${1570000000000 + i * 1000}?w=600&q=80`}
                      alt={`Example ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold mb-2">Example {i}</h3>
                  <p className="text-sm text-muted-foreground">
                    This is an example of what you can create with this tool.
                  </p>
                </GlassmorphismCard>
              ))}
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
