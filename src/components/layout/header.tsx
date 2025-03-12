import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ThreeDCanvas } from "../ui/3d-canvas";
import { FloatingObject } from "../ui/floating-object";
import { Button } from "../ui/button";
import { NeumorphicButton } from "../ui/neumorphic-button";
import { Menu, X, User } from "lucide-react";
import { AuthModal } from "../auth/auth-modal";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">(
    "login",
  );

  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0.8, 1]);
  const headerBlur = useTransform(scrollY, [0, 100], [0, 8]);

  // Update scroll state for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Tools", path: "/tools" },
    { name: "Pricing", path: "/pricing" },
    { name: "About", path: "/about" },
  ];

  const openLoginModal = () => {
    setAuthModalTab("login");
    setIsAuthModalOpen(true);
  };

  const openRegisterModal = () => {
    setAuthModalTab("register");
    setIsAuthModalOpen(true);
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-2" : "py-4"}`}
        style={{
          opacity: headerOpacity,
          backdropFilter: `blur(${headerBlur}px)`,
          backgroundColor: "rgba(10, 10, 30, 0.7)",
          borderBottom: isScrolled
            ? "1px solid rgba(255, 255, 255, 0.1)"
            : "none",
        }}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo with 3D element */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10">
              <ThreeDCanvas controlsEnabled={false}>
                <FloatingObject
                  shape="torus"
                  color="#6366f1"
                  scale={0.8}
                  position={[0, 0, 0]}
                  rotationSpeed={0.01}
                  floatHeight={0.05}
                />
              </ThreeDCanvas>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
              3D Tools Hub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-white/80 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              className="text-white/80 hover:text-white"
              onClick={openLoginModal}
            >
              Sign In
            </Button>
            <NeumorphicButton variant="accent" onClick={openRegisterModal}>
              Get Started
            </NeumorphicButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-white/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-white/80 hover:text-white py-2 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                <Button
                  variant="ghost"
                  className="justify-center"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openLoginModal();
                  }}
                >
                  Sign In
                </Button>
                <NeumorphicButton
                  variant="accent"
                  className="justify-center"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openRegisterModal();
                  }}
                >
                  Get Started
                </NeumorphicButton>
              </div>
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalTab}
      />
    </>
  );
}
