import { Link } from "react-router-dom";
import { ThreeDCanvas } from "../ui/3d-canvas";
import { FloatingObject } from "../ui/floating-object";
import { ParallaxSection } from "../ui/parallax-section";
import { GlassmorphismCard } from "../ui/glassmorphism-card";
import { Separator } from "../ui/separator";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "/features" },
        { name: "Pricing", href: "/pricing" },
        { name: "Tools", href: "/tools" },
        { name: "Roadmap", href: "/roadmap" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "/docs" },
        { name: "Tutorials", href: "/tutorials" },
        { name: "Blog", href: "/blog" },
        { name: "Support", href: "/support" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
        { name: "Press", href: "/press" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Terms", href: "/terms" },
        { name: "Privacy", href: "/privacy" },
        { name: "Cookies", href: "/cookies" },
        { name: "Licenses", href: "/licenses" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Facebook size={20} />, href: "#", label: "Facebook" },
    { icon: <Twitter size={20} />, href: "#", label: "Twitter" },
    { icon: <Instagram size={20} />, href: "#", label: "Instagram" },
    { icon: <Linkedin size={20} />, href: "#", label: "LinkedIn" },
    { icon: <Github size={20} />, href: "#", label: "GitHub" },
  ];

  return (
    <footer className="relative bg-gradient-to-t from-slate-900 to-indigo-900 pt-20 pb-10 overflow-hidden">
      {/* 3D Background Elements */}
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
        {/* Footer top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
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

            <p className="text-white/70 mb-6 max-w-md">
              Discover our comprehensive suite of AI-powered tools designed to
              enhance your creativity, productivity, and digital experience with
              stunning 3D visuals.
            </p>

            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <ParallaxSection className="mb-16" baseVelocity={0.05}>
          <GlassmorphismCard className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Stay Updated
                </h3>
                <p className="text-white/70">
                  Subscribe to our newsletter for the latest updates, new tools,
                  and exclusive offers.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg text-white font-medium hover:opacity-90 transition-opacity">
                  Subscribe
                </button>
              </div>
            </div>
          </GlassmorphismCard>
        </ParallaxSection>

        <Separator className="bg-white/10 mb-8" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/50 text-sm">
          <p>© {currentYear} 3D Tools Hub. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link to="/cookies" className="hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
