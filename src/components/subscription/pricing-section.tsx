import { useState } from "react";
import { motion } from "framer-motion";
import { PricingCard, PricingTier } from "./pricing-card";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { ThreeDCanvas } from "../ui/3d-canvas";
import { FloatingObject } from "../ui/floating-object";
import { SubscriptionModal } from "./subscription-modal";

export function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
    "monthly",
  );
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"pro" | "ultimate">("pro");

  // Define pricing tiers
  const pricingTiers: PricingTier[] = [
    {
      id: "free",
      name: "Free",
      description: "Basic access to essential tools",
      price: 0,
      billingPeriod,
      features: [
        { name: "Limited access to basic tools", included: true },
        { name: "Daily usage limits", included: true },
        { name: "Basic quality outputs", included: true },
        { name: "Watermarked results", included: true },
        { name: "Community support", included: true },
        { name: "Higher usage limits", included: false },
        { name: "Priority processing", included: false },
        { name: "No watermarks", included: false },
        { name: "Premium tools access", included: false },
      ],
      ctaText: "Get Started",
    },
    {
      id: "pro",
      name: "Pro",
      description: "Professional tools for creators",
      price: billingPeriod === "monthly" ? 9.99 : 99.99,
      billingPeriod,
      highlighted: true,
      features: [
        {
          name: "Access to all tools except Ultimate exclusives",
          included: true,
        },
        { name: "Higher usage limits", included: true },
        { name: "Improved quality outputs", included: true },
        { name: "No watermarks", included: true },
        { name: "Priority processing", included: true },
        { name: "Email support", included: true },
        { name: "API access", included: true },
        { name: "Unlimited usage", included: false },
        { name: "Early access to new tools", included: false },
      ],
      ctaText: "Subscribe to Pro",
    },
    {
      id: "ultimate",
      name: "Ultimate",
      description: "Maximum power for professionals",
      price: billingPeriod === "monthly" ? 19.99 : 199.99,
      billingPeriod,
      features: [
        { name: "Full access to all tools", included: true },
        { name: "Unlimited usage", included: true },
        { name: "Highest quality outputs", included: true },
        { name: "No watermarks", included: true },
        { name: "Fastest processing", included: true },
        { name: "Priority support", included: true },
        { name: "Advanced API access", included: true },
        { name: "Custom integration options", included: true },
        { name: "Early access to new tools", included: true },
      ],
      ctaText: "Subscribe to Ultimate",
    },
  ];

  const handleSelectPlan = (planId: string) => {
    if (planId === "free") {
      // Free plan doesn't need subscription modal
      console.log("Selected free plan");
      return;
    }

    // For paid plans, open the subscription modal
    setSelectedPlan(planId as "pro" | "ultimate");
    setIsSubscriptionModalOpen(true);
  };

  return (
    <>
      <section className="relative py-20 bg-gradient-to-b from-indigo-900 to-slate-900 overflow-hidden">
        {/* Background 3D objects */}
        <div className="absolute inset-0 z-0 opacity-20">
          <ThreeDCanvas controlsEnabled={false}>
            <FloatingObject
              position={[-8, 5, -15]}
              shape="sphere"
              color="#6366f1"
              scale={2}
              floatSpeed={0.2}
            />
            <FloatingObject
              position={[10, -5, -20]}
              shape="torus"
              color="#8b5cf6"
              scale={3}
              floatSpeed={0.15}
            />
            <FloatingObject
              position={[0, 8, -12]}
              shape="box"
              color="#ec4899"
              scale={1.5}
              floatSpeed={0.25}
            />
          </ThreeDCanvas>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section header */}
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Choose Your Plan
            </motion.h2>

            <motion.p
              className="text-lg text-white/70 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Select the perfect subscription that fits your needs. Upgrade or
              downgrade anytime.
            </motion.p>

            {/* Billing toggle */}
            <motion.div
              className="flex items-center justify-center gap-3 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Label
                htmlFor="billing-toggle"
                className={`text-sm font-medium ${billingPeriod === "monthly" ? "text-white" : "text-white/60"}`}
              >
                Monthly
              </Label>

              <Switch
                id="billing-toggle"
                checked={billingPeriod === "yearly"}
                onCheckedChange={(checked) =>
                  setBillingPeriod(checked ? "yearly" : "monthly")
                }
              />

              <div className="flex items-center gap-2">
                <Label
                  htmlFor="billing-toggle"
                  className={`text-sm font-medium ${billingPeriod === "yearly" ? "text-white" : "text-white/60"}`}
                >
                  Yearly
                </Label>

                {billingPeriod === "yearly" && (
                  <span className="inline-block px-2 py-0.5 bg-green-500/20 text-green-400 text-xs font-medium rounded-full">
                    Save 20%
                  </span>
                )}
              </div>
            </motion.div>
          </div>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className={tier.highlighted ? "md:-mt-4 md:-mb-4" : ""}
              >
                <PricingCard tier={tier} onSelectPlan={handleSelectPlan} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
        selectedPlan={selectedPlan}
      />
    </>
  );
}
