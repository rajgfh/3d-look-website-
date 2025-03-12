import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { GlassmorphismCard } from "../ui/glassmorphism-card";
import { NeumorphicButton } from "../ui/neumorphic-button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { ThreeDCanvas } from "../ui/simplified-3d-canvas";
import { FloatingObject } from "../ui/simplified-floating-object";
import { cn } from "@/lib/utils";
import { useAuth } from "./auth-context";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";

interface ThreeDAuthFormProps {
  type?: "login" | "register";
  onSuccess?: () => void;
  className?: string;
}

const ThreeDAuthForm: React.FC<ThreeDAuthFormProps> = ({
  type = "login",
  onSuccess = () => {},
  className,
}) => {
  const [formType, setFormType] = useState<"login" | "register">(type);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const { login, register } = useAuth
    ? useAuth()
    : { login: async () => {}, register: async () => {} };

  // Animation for form elements
  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    });
  }, [controls, formType]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (formType === "register") {
      if (!formData.firstName.trim()) {
        newErrors.firstName = "First name is required";
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = "Last name is required";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      if (formType === "login") {
        await login(formData.email, formData.password);
      } else {
        await register(
          `${formData.firstName} ${formData.lastName}`,
          formData.email,
          formData.password,
        );
      }

      // Animate success
      await controls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 0.5 },
      });

      onSuccess();
    } catch (error) {
      setErrors({
        form: "Authentication failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFormType = () => {
    // Animate form out
    controls
      .start({
        opacity: 0,
        y: 20,
        transition: { duration: 0.3 },
      })
      .then(() => {
        setFormType(formType === "login" ? "register" : "login");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          rememberMe: false,
        });
        setErrors({});

        // Animate form in
        controls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.3 },
        });
      });
  };

  return (
    <div
      className={cn("relative w-full max-w-md mx-auto", className)}
      ref={formRef}
    >
      {/* 3D Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <ThreeDCanvas>
          <FloatingObject
            shape="sphere"
            position={[-3, 2, -5]}
            color="#6366f1"
            scale={1.2}
            floatSpeed={0.8}
          />
          <FloatingObject
            shape="torus"
            position={[3, -1, -8]}
            color="#8b5cf6"
            scale={1.5}
            floatSpeed={0.6}
          />
          <FloatingObject
            shape="box"
            position={[0, 3, -10]}
            color="#ec4899"
            scale={1}
            floatSpeed={1}
          />
        </ThreeDCanvas>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        className="relative z-10"
      >
        <GlassmorphismCard className="p-8">
          <div className="text-center mb-6">
            <motion.h2
              className="text-2xl font-bold mb-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {formType === "login" ? "Welcome Back" : "Create Account"}
            </motion.h2>
            <motion.p
              className="text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {formType === "login"
                ? "Sign in to access your account"
                : "Join us and explore our 3D tools"}
            </motion.p>
          </div>

          {errors.form && (
            <motion.div
              className="bg-red-500/10 border border-red-500/50 text-red-700 px-4 py-3 rounded-lg mb-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              {errors.form}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {formType === "register" && (
              <motion.div
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="space-y-2">
                  <Label
                    htmlFor="firstName"
                    className="flex items-center gap-2"
                  >
                    <User size={16} />
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    className={errors.firstName ? "border-red-500" : ""}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="flex items-center gap-2">
                    <User size={16} />
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    className={errors.lastName ? "border-red-500" : ""}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: formType === "login" ? 0.3 : 0.4 }}
            >
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail size={16} />
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="name@example.com"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </motion.div>

            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: formType === "login" ? 0.4 : 0.5 }}
            >
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock size={16} />
                  Password
                </Label>
                {formType === "login" && (
                  <a
                    href="#"
                    className="text-xs text-primary hover:underline"
                    onClick={(e) => e.preventDefault()}
                  >
                    Forgot password?
                  </a>
                )}
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </motion.div>

            {formType === "register" && (
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Label
                  htmlFor="confirmPassword"
                  className="flex items-center gap-2"
                >
                  <Lock size={16} />
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className={
                      errors.confirmPassword ? "border-red-500 pr-10" : "pr-10"
                    }
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </motion.div>
            )}

            {formType === "login" && (
              <motion.div
                className="flex items-center space-x-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Checkbox
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, rememberMe: !!checked })
                  }
                />
                <label
                  htmlFor="rememberMe"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: formType === "login" ? 0.6 : 0.7 }}
            >
              <NeumorphicButton
                type="submit"
                variant="accent"
                className="w-full mt-6"
                disabled={isLoading}
              >
                {isLoading
                  ? formType === "login"
                    ? "Signing in..."
                    : "Creating account..."
                  : formType === "login"
                    ? "Sign In"
                    : "Create Account"}
              </NeumorphicButton>
            </motion.div>
          </form>

          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: formType === "login" ? 0.7 : 0.8 }}
          >
            <p className="text-sm text-muted-foreground">
              {formType === "login"
                ? "Don't have an account?"
                : "Already have an account?"}
              <button
                type="button"
                className="ml-1 text-primary hover:underline focus:outline-none"
                onClick={toggleFormType}
              >
                {formType === "login" ? "Sign up" : "Sign in"}
              </button>
            </p>
          </motion.div>

          <motion.div
            className="relative mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: formType === "login" ? 0.8 : 0.9 }}
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </motion.div>

          <motion.div
            className="mt-6 grid grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: formType === "login" ? 0.9 : 1 }}
          >
            <NeumorphicButton
              type="button"
              variant="default"
              className="w-full"
              onClick={() => {}}
            >
              Google
            </NeumorphicButton>
            <NeumorphicButton
              type="button"
              variant="default"
              className="w-full"
              onClick={() => {}}
            >
              GitHub
            </NeumorphicButton>
          </motion.div>
        </GlassmorphismCard>
      </motion.div>
    </div>
  );
};

export default ThreeDAuthForm;
