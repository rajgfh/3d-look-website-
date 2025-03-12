import { MainLayout } from "@/components/layout/main-layout";
import { PricingSection } from "@/components/subscription/pricing-section";
import { ParallaxSection } from "@/components/ui/parallax-section";
import { ThreeDCanvas } from "@/components/ui/3d-canvas";
import { FloatingObject } from "@/components/ui/floating-object";
import { GlassmorphismCard } from "@/components/ui/glassmorphism-card";

export default function PricingPage() {
  const features = [
    {
      title: "Unlimited Access",
      description:
        "Get unlimited access to all our AI tools with higher tier subscriptions.",
      icon: "🔓",
    },
    {
      title: "No Watermarks",
      description:
        "Remove watermarks from your generated content with Pro and Ultimate plans.",
      icon: "✨",
    },
    {
      title: "Priority Processing",
      description:
        "Skip the queue with faster processing times for your AI generations.",
      icon: "⚡",
    },
    {
      title: "Higher Quality",
      description:
        "Access higher resolution outputs and more detailed generations.",
      icon: "🔍",
    },
    {
      title: "API Access",
      description:
        "Integrate our tools directly into your workflow with our developer API.",
      icon: "🔌",
    },
    {
      title: "Priority Support",
      description: "Get faster responses from our dedicated support team.",
      icon: "🛟",
    },
  ];

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
                  Subscription Plans
                </h1>
                <p className="text-xl text-white/80 mb-8">
                  Choose the perfect plan for your needs. Upgrade or downgrade
                  anytime.
                </p>
              </div>
            </ParallaxSection>
          </div>
        </section>

        {/* Pricing section */}
        <PricingSection />

        {/* Features section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Premium Features</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Unlock these powerful features with our premium subscriptions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <ParallaxSection
                  key={index}
                  baseVelocity={0.05}
                  direction={index % 2 === 0 ? "up" : "down"}
                >
                  <GlassmorphismCard className="h-full">
                    <div className="flex flex-col h-full">
                      <div className="text-3xl mb-4">{feature.icon}</div>
                      <h3 className="text-xl font-semibold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </GlassmorphismCard>
                </ParallaxSection>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Find answers to common questions about our subscription plans.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "Can I switch between plans?",
                  answer:
                    "Yes, you can upgrade or downgrade your subscription at any time. Changes will be applied immediately, and your billing will be prorated accordingly.",
                },
                {
                  question: "Is there a free trial?",
                  answer:
                    "We offer a 7-day free trial for our Pro plan. You can cancel anytime during the trial period without being charged.",
                },
                {
                  question: "How do I cancel my subscription?",
                  answer:
                    "You can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period.",
                },
                {
                  question: "Do you offer refunds?",
                  answer:
                    "We offer a 30-day money-back guarantee for annual subscriptions. Monthly subscriptions are non-refundable once the payment is processed.",
                },
                {
                  question: "Can I use the tools for commercial purposes?",
                  answer:
                    "Yes, all subscription plans allow for commercial use of the generated content, subject to our terms of service.",
                },
              ].map((faq, index) => (
                <GlassmorphismCard key={index}>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                </GlassmorphismCard>
              ))}
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
