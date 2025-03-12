import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { Menu, X, Search, User, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { GlassmorphismCard } from "../ui/glassmorphism-card";
import { ThreeDCanvas } from "../ui/simplified-3d-canvas";
import { FloatingObject } from "../ui/simplified-floating-object";

interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

interface HeaderProps {
  transparent?: boolean;
  navItems?: NavItem[];
  userLoggedIn?: boolean;
  onLogin?: () => void;
  onSignup?: () => void;
  onCartClick?: () => void;
  cartItemCount?: number;
}

const defaultNavItems: NavItem[] = [
  { label: "Home", href: "/", isActive: true },
  { label: "Tools", href: "/tools" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export function Header({
  transparent = false,
  navItems = defaultNavItems,
  userLoggedIn = false,
  onLogin = () => {},
  onSignup = () => {},
  onCartClick = () => {},
  cartItemCount = 0,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const controls = useAnimation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate logo on scroll
  useEffect(() => {
    if (isScrolled) {
      controls.start({
        rotateY: 360,
        transition: { duration: 0.8, ease: "easeInOut" },
      });
    } else {
      controls.start({
        rotateY: 0,
        transition: { duration: 0.8, ease: "easeInOut" },
      });
    }
  }, [isScrolled, controls]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !transparent
          ? "bg-slate-900/90 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <motion.div animate={controls} className="w-10 h-10 relative">
              <ThreeDCanvas>
                <FloatingObject
                  shape="torus"
                  color="#6366f1"
                  scale={0.8}
                  rotationSpeed={0.01}
                  floatHeight={0.05}
                />
              </ThreeDCanvas>
            </motion.div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
              3D Tools Hub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  item.isActive
                    ? "text-white bg-white/10"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white/70 hover:text-white hover:bg-white/10"
              aria-label="Search"
            >
              <Search size={20} />
            </Button>

            {userLoggedIn ? (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white/70 hover:text-white hover:bg-white/10 relative"
                  onClick={onCartClick}
                  aria-label="Shopping cart"
                >
                  <ShoppingCart size={20} />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-indigo-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white/70 hover:text-white hover:bg-white/10"
                  aria-label="User profile"
                >
                  <User size={20} />
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="text-white/90 hover:text-white hover:bg-white/10"
                  onClick={onLogin}
                >
                  Log in
                </Button>
                <Button
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
                  onClick={onSignup}
                >
                  Sign up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white/90 hover:text-white hover:bg-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden"
        >
          <GlassmorphismCard className="m-4 p-4 border-t border-white/10">
            <nav className="flex flex-col gap-2 mb-4">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    item.isActive
                      ? "text-white bg-white/10"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col gap-2">
              <Button
                variant="ghost"
                className="justify-start text-white/90 hover:text-white hover:bg-white/10"
                onClick={() => {
                  onLogin();
                  setMobileMenuOpen(false);
                }}
              >
                <User size={16} className="mr-2" />
                Log in
              </Button>
              <Button
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
                onClick={() => {
                  onSignup();
                  setMobileMenuOpen(false);
                }}
              >
                Sign up
              </Button>
            </div>
          </GlassmorphismCard>
        </motion.div>
      )}
    </header>
  );
}
