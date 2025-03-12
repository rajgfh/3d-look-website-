import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { NeumorphicButton } from "../ui/neumorphic-button";
import { GlassmorphismCard } from "../ui/glassmorphism-card";
import { ThreeDCanvas } from "../ui/3d-canvas";
import { FloatingObject } from "../ui/floating-object";
import { motion } from "framer-motion";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "login" | "register";
}

export function AuthModal({
  isOpen,
  onClose,
  defaultTab = "login",
}: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">(defaultTab);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      // Here you would normally store the user token and update the auth state
    }, 1500);
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
            {activeTab === "login" ? "Welcome Back" : "Create Account"}
          </DialogTitle>
        </DialogHeader>

        <Tabs
          defaultValue={defaultTab}
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "login" | "register")}
          className="mt-4"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-4">
            <GlassmorphismCard>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <NeumorphicButton
                  type="submit"
                  variant="accent"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </NeumorphicButton>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <NeumorphicButton
                    type="button"
                    variant="default"
                    className="w-full"
                  >
                    Google
                  </NeumorphicButton>
                  <NeumorphicButton
                    type="button"
                    variant="default"
                    className="w-full"
                  >
                    GitHub
                  </NeumorphicButton>
                </div>
              </form>
            </GlassmorphismCard>
          </TabsContent>

          <TabsContent value="register" className="mt-4">
            <GlassmorphismCard>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Doe" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <NeumorphicButton
                  type="submit"
                  variant="accent"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </NeumorphicButton>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <NeumorphicButton
                    type="button"
                    variant="default"
                    className="w-full"
                  >
                    Google
                  </NeumorphicButton>
                  <NeumorphicButton
                    type="button"
                    variant="default"
                    className="w-full"
                  >
                    GitHub
                  </NeumorphicButton>
                </div>
              </form>
            </GlassmorphismCard>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
