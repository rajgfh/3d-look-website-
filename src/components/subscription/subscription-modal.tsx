import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { GlassmorphismCard } from "../ui/glassmorphism-card";
import { NeumorphicButton } from "../ui/neumorphic-button";
import { ThreeDCanvas } from "../ui/3d-canvas";
import { FloatingObject } from "../ui/floating-object";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Check, CreditCard } from "lucide-react";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: "pro" | "ultimate";
}

export function SubscriptionModal({
  isOpen,
  onClose,
  selectedPlan = "pro",
}: SubscriptionModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<"plan" | "payment" | "success">("plan");

  const plans = {
    pro: {
      name: "Pro",
      price: 9.99,
      features: [
        "Access to all tools except Ultimate exclusives",
        "Higher usage limits",
        "Improved quality outputs",
        "No watermarks",
        "Priority processing",
        "Email support",
        "API access",
      ],
    },
    ultimate: {
      name: "Ultimate",
      price: 19.99,
      features: [
        "Full access to all tools",
        "Unlimited usage",
        "Highest quality outputs",
        "No watermarks",
        "Fastest processing",
        "Priority support",
        "Advanced API access",
        "Custom integration options",
        "Early access to new tools",
      ],
    },
  };

  const selectedPlanDetails = plans[selectedPlan];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep("success");
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <ThreeDCanvas controlsEnabled={false}>
            <FloatingObject
              position={[-3, 2, -5]}
              shape="sphere"
              color="#6366f1"
              scale={1}
              floatSpeed={0.3}
            />
            <FloatingObject
              position={[3, -2, -7]}
              shape="torus"
              color="#8b5cf6"
              scale={1.2}
              floatSpeed={0.2}
            />
          </ThreeDCanvas>
        </div>

        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {step === "plan" && `Subscribe to ${selectedPlanDetails.name}`}
            {step === "payment" && "Payment Details"}
            {step === "success" && "Subscription Activated!"}
          </DialogTitle>
        </DialogHeader>

        {step === "plan" && (
          <div className="mt-4">
            <GlassmorphismCard>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold">
                    {selectedPlanDetails.name} Plan
                  </h3>
                  <div className="text-2xl font-bold">
                    ${selectedPlanDetails.price}
                    <span className="text-sm font-normal">/mo</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Unlock premium features and enhance your creative workflow.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-2">Included Features:</h4>
                <ul className="space-y-2">
                  {selectedPlanDetails.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check
                        size={18}
                        className="text-green-500 mt-0.5 flex-shrink-0"
                      />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <NeumorphicButton
                variant="accent"
                className="w-full"
                onClick={() => setStep("payment")}
              >
                Continue to Payment
              </NeumorphicButton>
            </GlassmorphismCard>
          </div>
        )}

        {step === "payment" && (
          <div className="mt-4">
            <GlassmorphismCard>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-medium">
                      {selectedPlanDetails.name} Plan
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Monthly subscription
                    </p>
                  </div>
                  <div className="text-xl font-bold">
                    ${selectedPlanDetails.price}/mo
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="card-name">Name on Card</Label>
                  <Input id="card-name" placeholder="John Doe" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <div className="relative">
                    <Input
                      id="card-number"
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                    <CreditCard
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                      size={18}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" required />
                  </div>
                </div>

                <NeumorphicButton
                  type="submit"
                  variant="accent"
                  className="w-full"
                  disabled={isProcessing}
                >
                  {isProcessing
                    ? "Processing..."
                    : `Pay $${selectedPlanDetails.price}`}
                </NeumorphicButton>
              </form>
            </GlassmorphismCard>
          </div>
        )}

        {step === "success" && (
          <div className="mt-4 text-center">
            <GlassmorphismCard>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Check size={32} className="text-green-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                <p className="text-muted-foreground mb-6">
                  Your {selectedPlanDetails.name} subscription has been
                  activated successfully. You now have access to all premium
                  features.
                </p>
                <NeumorphicButton variant="accent" onClick={onClose}>
                  Start Exploring
                </NeumorphicButton>
              </div>
            </GlassmorphismCard>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
