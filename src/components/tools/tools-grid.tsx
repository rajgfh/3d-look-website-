import { useState } from "react";
import { motion } from "framer-motion";
import { ToolCard, ToolCardProps } from "./tool-card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search, Filter } from "lucide-react";

interface ToolsGridProps {
  tools: ToolCardProps[];
  categories: string[];
}

export function ToolsGrid({ tools, categories }: ToolsGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter tools based on search query and selected category
  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory
      ? tool.category === selectedCategory
      : true;

    return matchesSearch && matchesCategory;
  });

  // Animation variants for the grid
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Search and filter */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <Input
            type="text"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => setSelectedCategory(null)}
            className="flex items-center gap-2"
          >
            <Filter size={16} />
            All
          </Button>

          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Tools grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredTools.length > 0 ? (
          filteredTools.map((tool) => (
            <motion.div key={tool.id} variants={itemVariants}>
              <ToolCard {...tool} />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No tools found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
