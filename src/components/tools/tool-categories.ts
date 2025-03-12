import { ToolCardProps } from "./tool-card";

// Tool categories
export const categories = [
  "🎨 AI Image & Art",
  "👩‍🎨 AI Avatar & Profile",
  "🎭 AI Fun & Entertainment",
  "📄 AI Text & Writing",
  "🎤 AI Voice & Audio",
  "🎥 AI Video Editing",
  "📊 AI Business & Productivity",
  "🔧 AI Utility & Conversion",
  "🔍 AI Search & Information",
  "🌐 AI Social Media & Engagement",
];

// Sample tools data
export const tools: ToolCardProps[] = [
  // 🎨 AI Image & Art Tools
  {
    id: "ai-image-generator",
    name: "AI Image Generator",
    description: "Create images from text prompts in various styles.",
    icon: "🎨",
    category: "🎨 AI Image & Art",
    subscriptionTier: "free",
    imageUrl:
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
    path: "/tools/ai-image-generator",
  },
  {
    id: "ai-art-generator",
    name: "AI Art Generator",
    description:
      "Generate paintings, sketches, and digital artwork in different styles.",
    icon: "🖌️",
    category: "🎨 AI Image & Art",
    subscriptionTier: "free",
    imageUrl:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80",
    path: "/tools/ai-art-generator",
  },
  {
    id: "ai-photo-enhancer",
    name: "AI Photo Enhancer",
    description: "Upscale and sharpen blurry images.",
    icon: "✨",
    category: "🎨 AI Image & Art",
    subscriptionTier: "free",
    imageUrl:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
    path: "/tools/ai-photo-enhancer",
  },
  {
    id: "ai-background-remover",
    name: "AI Background Remover",
    description: "Automatically remove backgrounds from images.",
    icon: "🔍",
    category: "🎨 AI Image & Art",
    subscriptionTier: "free",
    imageUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    path: "/tools/ai-background-remover",
  },
  {
    id: "ai-image-extender",
    name: "AI Image Extender",
    description: "Expand images beyond their original borders.",
    icon: "↔️",
    category: "🎨 AI Image & Art",
    subscriptionTier: "pro",
    imageUrl:
      "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&q=80",
    path: "/tools/ai-image-extender",
  },

  // 👩‍🎨 AI Avatar & Profile Tools
  {
    id: "ai-headshot-generator",
    name: "AI Headshot Generator",
    description: "Generate high-quality, professional-looking headshots.",
    icon: "📸",
    category: "👩‍🎨 AI Avatar & Profile",
    subscriptionTier: "pro",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    path: "/tools/ai-headshot-generator",
  },
  {
    id: "ai-avatar-maker",
    name: "AI Avatar Maker",
    description: "Create stylized avatars (3D, cartoon, anime, etc.).",
    icon: "👤",
    category: "👩‍🎨 AI Avatar & Profile",
    subscriptionTier: "free",
    imageUrl:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=800&q=80",
    path: "/tools/ai-avatar-maker",
  },
  {
    id: "ai-profile-picture-enhancer",
    name: "AI Profile Picture Enhancer",
    description: "Enhance and retouch profile images.",
    icon: "🖼️",
    category: "👩‍🎨 AI Avatar & Profile",
    subscriptionTier: "free",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80",
    path: "/tools/ai-profile-picture-enhancer",
  },

  // 🎭 AI Fun & Entertainment Tools
  {
    id: "ai-baby-generator",
    name: "AI Baby Generator",
    description: "Predict what a baby might look like from two faces.",
    icon: "👶",
    category: "🎭 AI Fun & Entertainment",
    subscriptionTier: "pro",
    imageUrl:
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80",
    path: "/tools/ai-baby-generator",
  },
  {
    id: "ai-meme-generator",
    name: "AI Meme Generator",
    description: "Generate memes automatically based on trending templates.",
    icon: "😂",
    category: "🎭 AI Fun & Entertainment",
    subscriptionTier: "free",
    imageUrl:
      "https://images.unsplash.com/photo-1513031300226-c8fb12de9abe?w=800&q=80",
    path: "/tools/ai-meme-generator",
  },

  // 📄 AI Text & Writing Tools
  {
    id: "ai-blog-post-writer",
    name: "AI Blog Post Writer",
    description: "Generate high-quality blog posts from keywords.",
    icon: "📝",
    category: "📄 AI Text & Writing",
    subscriptionTier: "pro",
    imageUrl:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
    path: "/tools/ai-blog-post-writer",
  },
  {
    id: "ai-resume-builder",
    name: "AI Resume Builder",
    description: "Create a professional resume with AI assistance.",
    icon: "📄",
    category: "📄 AI Text & Writing",
    subscriptionTier: "free",
    imageUrl:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80",
    path: "/tools/ai-resume-builder",
  },

  // 🎤 AI Voice & Audio Tools
  {
    id: "ai-text-to-speech",
    name: "AI Text-to-Speech",
    description: "Convert text into realistic AI-generated voice.",
    icon: "🔊",
    category: "🎤 AI Voice & Audio",
    subscriptionTier: "free",
    imageUrl:
      "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&q=80",
    path: "/tools/ai-text-to-speech",
  },
  {
    id: "ai-voice-changer",
    name: "AI Voice Changer",
    description: "Change voice pitch, tone, or style (robotic, deep, etc.).",
    icon: "🎙️",
    category: "🎤 AI Voice & Audio",
    subscriptionTier: "pro",
    imageUrl:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80",
    path: "/tools/ai-voice-changer",
  },

  // 🎥 AI Video Editing Tools
  {
    id: "ai-video-generator",
    name: "AI Video Generator",
    description: "Create short videos from text descriptions.",
    icon: "🎬",
    category: "🎥 AI Video Editing",
    subscriptionTier: "ultimate",
    imageUrl:
      "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&q=80",
    path: "/tools/ai-video-generator",
  },
  {
    id: "ai-face-swap-video",
    name: "AI Face Swap Video",
    description: "Replace faces in videos with AI.",
    icon: "👥",
    category: "🎥 AI Video Editing",
    subscriptionTier: "ultimate",
    imageUrl:
      "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=800&q=80",
    path: "/tools/ai-face-swap-video",
  },

  // 📊 AI Business & Productivity Tools
  {
    id: "ai-logo-maker",
    name: "AI Logo Maker",
    description: "Generate custom logos for businesses.",
    icon: "🏢",
    category: "📊 AI Business & Productivity",
    subscriptionTier: "pro",
    imageUrl:
      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80",
    path: "/tools/ai-logo-maker",
  },
  {
    id: "ai-business-card-generator",
    name: "AI Business Card Generator",
    description: "Create personalized business cards.",
    icon: "💼",
    category: "📊 AI Business & Productivity",
    subscriptionTier: "free",
    imageUrl:
      "https://images.unsplash.com/photo-1566125882500-87e10f726cdc?w=800&q=80",
    path: "/tools/ai-business-card-generator",
  },

  // 🔧 AI Utility & Conversion Tools
  {
    id: "ai-handwriting-to-text",
    name: "AI Handwriting-to-Text",
    description: "Recognize and digitize handwriting.",
    icon: "✍️",
    category: "🔧 AI Utility & Conversion",
    subscriptionTier: "pro",
    imageUrl:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80",
    path: "/tools/ai-handwriting-to-text",
  },
  {
    id: "ai-qr-code-generator",
    name: "AI QR Code Generator",
    description: "Create custom QR codes with embedded designs.",
    icon: "📱",
    category: "🔧 AI Utility & Conversion",
    subscriptionTier: "free",
    imageUrl:
      "https://images.unsplash.com/photo-1598291286794-d417e2685f85?w=800&q=80",
    path: "/tools/ai-qr-code-generator",
  },

  // 🔍 AI Search & Information Tools
  {
    id: "ai-fact-checker",
    name: "AI Fact Checker",
    description: "Verify news and articles for accuracy.",
    icon: "🔎",
    category: "🔍 AI Search & Information",
    subscriptionTier: "pro",
    imageUrl:
      "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=800&q=80",
    path: "/tools/ai-fact-checker",
  },
  {
    id: "ai-language-translator",
    name: "AI Language Translator",
    description: "Translate between multiple languages.",
    icon: "🌐",
    category: "🔍 AI Search & Information",
    subscriptionTier: "free",
    imageUrl:
      "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=800&q=80",
    path: "/tools/ai-language-translator",
  },

  // 🌐 AI Social Media & Engagement Tools
  {
    id: "ai-caption-generator",
    name: "AI Caption Generator",
    description: "Create engaging captions for posts.",
    icon: "💬",
    category: "🌐 AI Social Media & Engagement",
    subscriptionTier: "free",
    imageUrl:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
    path: "/tools/ai-caption-generator",
  },
  {
    id: "ai-hashtag-finder",
    name: "AI Hashtag Finder",
    description: "Suggest trending hashtags for social media.",
    icon: "#️⃣",
    category: "🌐 AI Social Media & Engagement",
    subscriptionTier: "pro",
    imageUrl:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
    path: "/tools/ai-hashtag-finder",
  },
];
