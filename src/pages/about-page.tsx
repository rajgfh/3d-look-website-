import { MainLayout } from "@/components/layout/main-layout";
import { ParallaxSection } from "@/components/ui/parallax-section";
import { ThreeDCanvas } from "@/components/ui/3d-canvas";
import { FloatingObject } from "@/components/ui/floating-object";
import { GlassmorphismCard } from "@/components/ui/glassmorphism-card";
import { ThreeDCard } from "@/components/ui/3d-card";
import { motion } from "framer-motion";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      bio: "AI enthusiast with 10+ years of experience in machine learning and computer vision.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      bio: "Former Google AI researcher with expertise in natural language processing and generative models.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
    {
      name: "Michael Rodriguez",
      role: "Lead Developer",
      bio: "Full-stack developer specializing in AI integration and scalable cloud architecture.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    },
    {
      name: "Emily Patel",
      role: "UX/UI Designer",
      bio: "Award-winning designer focused on creating intuitive and accessible user experiences.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
    },
    {
      name: "David Kim",
      role: "AI Research Lead",
      bio: "PhD in Computer Science with multiple publications on generative AI and computer vision.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    },
    {
      name: "Olivia Martinez",
      role: "Marketing Director",
      bio: "Digital marketing expert with a passion for making complex technology accessible to everyone.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=olivia",
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
                  About Us
                </h1>
                <p className="text-xl text-white/80 mb-8">
                  We're on a mission to make advanced AI tools accessible to
                  everyone, empowering creativity and productivity worldwide.
                </p>
              </div>
            </ParallaxSection>
          </div>
        </section>

        {/* Our story section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Founded in 2023, 3D Tools Hub began with a simple vision: to
                    democratize access to cutting-edge AI technology. What
                    started as a small collection of tools developed by our
                    founder, Alex Johnson, quickly grew into a comprehensive
                    platform serving creators, professionals, and businesses
                    worldwide.
                  </p>
                  <p>
                    Our team of AI researchers, developers, and designers work
                    tirelessly to push the boundaries of what's possible with
                    artificial intelligence, while maintaining our core focus on
                    usability, accessibility, and ethical AI development.
                  </p>
                  <p>
                    Today, we're proud to offer over 50 specialized AI tools
                    across multiple categories, helping our users unlock new
                    creative possibilities, streamline workflows, and solve
                    complex problems with the power of AI.
                  </p>
                </div>
              </div>

              <ParallaxSection direction="right" baseVelocity={0.05}>
                <GlassmorphismCard className="p-6 h-full" borderGlow>
                  <div className="relative h-80 w-full">
                    <ThreeDCanvas>
                      <FloatingObject
                        position={[-2, 0, 0]}
                        shape="sphere"
                        color="#6366f1"
                        scale={1}
                      />
                      <FloatingObject
                        position={[0, 0, 0]}
                        shape="torus"
                        color="#8b5cf6"
                        scale={1.2}
                      />
                      <FloatingObject
                        position={[2, 0, 0]}
                        shape="box"
                        color="#ec4899"
                        scale={0.8}
                      />
                    </ThreeDCanvas>
                  </div>
                </GlassmorphismCard>
              </ParallaxSection>
            </div>
          </div>
        </section>

        {/* Our values section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Innovation",
                  description:
                    "We constantly push the boundaries of what's possible with AI technology.",
                  icon: "💡",
                  color: "#6366f1",
                },
                {
                  title: "Accessibility",
                  description:
                    "We believe advanced AI tools should be accessible to everyone, regardless of technical expertise.",
                  icon: "🌍",
                  color: "#8b5cf6",
                },
                {
                  title: "Quality",
                  description:
                    "We're committed to delivering high-quality, reliable tools that exceed expectations.",
                  icon: "✨",
                  color: "#ec4899",
                },
                {
                  title: "User-Centric",
                  description:
                    "We design every feature with our users' needs and experiences in mind.",
                  icon: "👥",
                  color: "#14b8a6",
                },
                {
                  title: "Ethical AI",
                  description:
                    "We develop AI responsibly, with careful consideration of ethical implications.",
                  icon: "🛡️",
                  color: "#f43f5e",
                },
                {
                  title: "Continuous Improvement",
                  description:
                    "We're always learning, iterating, and improving our tools based on feedback.",
                  icon: "🔄",
                  color: "#0ea5e9",
                },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <GlassmorphismCard className="h-full">
                    <div className="flex flex-col h-full">
                      <div className="text-4xl mb-4">{value.icon}</div>
                      <h3 className="text-xl font-semibold mb-2">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {value.description}
                      </p>
                    </div>
                  </GlassmorphismCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Meet Our Team
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ThreeDCard className="h-full">
                    <div className="p-6 flex flex-col items-center text-center">
                      <div className="w-24 h-24 rounded-full overflow-hidden mb-4 bg-gradient-to-br from-indigo-500 to-purple-600 p-1">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-full h-full rounded-full bg-background"
                        />
                      </div>
                      <h3 className="text-xl font-semibold">{member.name}</h3>
                      <p className="text-sm text-indigo-400 mb-3">
                        {member.role}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {member.bio}
                      </p>
                    </div>
                  </ThreeDCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-20 bg-gradient-to-b from-background to-indigo-900">
          <div className="container mx-auto px-4 text-center">
            <ParallaxSection>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Join Us on Our Mission
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Ready to explore the future of AI? Discover our tools and see
                how they can transform your creative and professional work.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href="/tools"
                    className="inline-block px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
                  >
                    Explore Our Tools
                  </a>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href="/contact"
                    className="inline-block px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white font-medium hover:bg-white/20 transition-colors"
                  >
                    Contact Us
                  </a>
                </motion.div>
              </div>
            </ParallaxSection>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
