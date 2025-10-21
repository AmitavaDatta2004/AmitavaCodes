'use client';
import { useState, useEffect, useMemo, Suspense } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GalleryGrid from "@/components/GalleryGrid";
import ParticlesBackground from "@/components/ParticlesBackground";
import { Gallery as GalleryType } from "@/types/gallery";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Image, Trophy, BookOpen, Users, Award } from "lucide-react";
import { useRouter } from "next/navigation";
import { GALLERY_DATA } from "@/constants";
import { useIsMobile } from "@/hooks/use-mobile";
import { UniversalSort, gallerySortOptions, SortOption } from "@/components/ui/universal-sort";

function GalleryPageContent() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [selectedCategory, setSelectedCategory] = useState<keyof GalleryType>("achievements");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<SortOption>(gallerySortOptions[0]);
  const [activeTab, setActiveTab] = useState<string>("achievements");
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const tabVariants = {
    inactive: { scale: 1, backgroundColor: "rgba(var(--secondary), 0.3)" },
    active: { 
      scale: 1.05, 
      backgroundColor: "rgba(var(--primary-rgb), 0.15)",
      boxShadow: "0 4px 12px rgba(var(--primary-rgb), 0.15)"
    }
  };

  const searchVariants = {
    rest: { scale: 1, boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)" },
    hover: { 
      scale: 1.02, 
      boxShadow: "0 5px 15px rgba(var(--primary-rgb), 0.15)",
      transition: { duration: 0.3 }
    }
  };

  // Filter and sort gallery items based on search query and sort option
  const getFilteredItems = useMemo(() => {
    const categoryMap: Record<string, keyof GalleryType> = {
      achievements: "achievements",
      seminars: "seminars",
      teamActivities: "teamActivities",
      certificates: "certificates"
    };
    
    // Get the current category
    const category = categoryMap[selectedCategory];
    
    // First filter by search
    const filtered = !searchQuery.trim() 
      ? GALLERY_DATA[category]
      : GALLERY_DATA[category].filter(item => 
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          item.alt.toLowerCase().includes(searchQuery.toLowerCase())
        );
    
    // Then sort
    return [...filtered].sort((a, b) => {
      // Map gallery item properties to sort option properties
      const propMap: Record<string, any> = {
        'title': 'title',
        'date': 'date',
        'added': 'id' // Use ID as a proxy for "added" date
      };
      
      // Get the property to sort by
      const propName = propMap[sortOption.orderBy] || 'title';
      
      const aValue = a[propName as keyof typeof a];
      const bValue = b[propName as keyof typeof b];
      
      // Handle undefined values
      if (aValue === undefined && bValue === undefined) return 0;
      if (aValue === undefined) return 1;
      if (bValue === undefined) return -1;
      
      // String comparison
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOption.direction === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      // Number comparison
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOption.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      // Fallback to ID sorting
      return sortOption.direction === 'asc' ? a.id - b.id : b.id - a.id;
    });
  }, [selectedCategory, searchQuery, sortOption]);

  // Handle tab change
  const handleTabChange = (value: string) => {
    setSelectedCategory(value as keyof GalleryType);
    setActiveTab(value);
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <div className="w-full min-h-screen overflow-x-hidden">
        <main className="container mx-auto px-4 pt-10 pb-20">
          {/* Back to Home Button */}
          <div className="mb-4 md:mb-6 pt-4 md:pt-6">
            <motion.div
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => router.push('/')}
                variant="outline"
                className="group flex items-center gap-2 hover:bg-primary/10 transition-all"
              >
                <ArrowLeft size={isMobile ? 16 : 18} className="transition-transform group-hover:-translate-x-1" />
                <span>Back to Home</span>
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-12"
          >
            <h1 className="section-title">Gallery</h1>
            <p className="section-subtitle max-w-2xl mx-auto">
              A visual journey through my achievements, events, and memorable moments
            </p>
          </motion.div>

          {/* Search and Sort Controls with enhanced hover animations */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
            <motion.div 
              className="relative md:max-w-md w-full"
              variants={searchVariants}
              initial="rest"
              whileHover="hover"
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search gallery images..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-background/60 backdrop-blur-sm transition-all duration-300 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
              />
            </motion.div>
            
            <motion.div
              variants={searchVariants}
              initial="rest"
              whileHover="hover"
            >
              <UniversalSort
                options={gallerySortOptions}
                onSortChange={setSortOption}
                className="bg-background/60 backdrop-blur-sm border-border/50"
              />
            </motion.div>
          </div>

          <Tabs
            defaultValue="achievements"
            className="w-full"
            onValueChange={handleTabChange}
          >
            <div className="flex justify-center mb-8 md:mb-10">
              <TabsList className="p-1.5 bg-background/80 backdrop-blur-md border border-border/50 shadow-sm rounded-xl">
                <div className={`grid ${isMobile ? "grid-cols-2" : "grid-cols-4"} gap-1.5 md:gap-2`}>
                  <motion.div
                    animate={activeTab === "achievements" ? "active" : "inactive"}
                    variants={tabVariants}
                  >
                    <TabsTrigger 
                      value="achievements" 
                      className="px-4 py-2.5 md:px-6 md:py-3 rounded-lg flex items-center justify-center gap-2 text-sm md:text-base font-medium transition-all"
                    >
                      <Trophy size={isMobile ? 16 : 18} className="text-primary" />
                      <span>Achievements</span>
                    </TabsTrigger>
                  </motion.div>
                  
                  <motion.div
                    animate={activeTab === "seminars" ? "active" : "inactive"}
                    variants={tabVariants}
                  >
                    <TabsTrigger 
                      value="seminars" 
                      className="px-4 py-2.5 md:px-6 md:py-3 rounded-lg flex items-center justify-center gap-2 text-sm md:text-base font-medium transition-all"
                    >
                      <BookOpen size={isMobile ? 16 : 18} className="text-primary" />
                      <span>Seminars</span>
                    </TabsTrigger>
                  </motion.div>
                  
                  <motion.div
                    animate={activeTab === "teamActivities" ? "active" : "inactive"}
                    variants={tabVariants}
                  >
                    <TabsTrigger 
                      value="teamActivities" 
                      className="px-4 py-2.5 md:px-6 md:py-3 rounded-lg flex items-center justify-center gap-2 text-sm md:text-base font-medium transition-all"
                    >
                      <Users size={isMobile ? 16 : 18} className="text-primary" />
                      <span>Team</span>
                    </TabsTrigger>
                  </motion.div>
                  
                  <motion.div
                    animate={activeTab === "certificates" ? "active" : "inactive"}
                    variants={tabVariants}
                  >
                    <TabsTrigger 
                      value="certificates" 
                      className="px-4 py-2.5 md:px-6 md:py-3 rounded-lg flex items-center justify-center gap-2 text-sm md:text-base font-medium transition-all"
                    >
                      <Award size={isMobile ? 16 : 18} className="text-primary" />
                      <span>Certificates</span>
                    </TabsTrigger>
                  </motion.div>
                </div>
              </TabsList>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: 20 }}
                className="mt-6 md:mt-8"
              >
                <TabsContent value="achievements">
                  <GalleryGrid items={getFilteredItems} />
                </TabsContent>
                <TabsContent value="seminars">
                  <GalleryGrid items={getFilteredItems} />
                </TabsContent>
                <TabsContent value="teamActivities">
                  <GalleryGrid items={getFilteredItems} />
                </TabsContent>
                <TabsContent value="certificates">
                  <GalleryGrid items={getFilteredItems} />
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
          
          {/* Add decorative elements */}
          <motion.div 
            className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-primary/5 blur-[80px] -z-10"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          <motion.div 
            className="absolute bottom-1/4 left-0 w-72 h-72 rounded-full bg-accent/5 blur-[80px] -z-10"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </main>

      </div>
  );
}

export default function GalleryPage() {
    return (
        <ThemeProvider>
            <div className="fixed inset-0 -z-10 bg-gradient-to-b from-background to-background pointer-events-none"></div>
            <ParticlesBackground />
            <Suspense fallback={<div>Loading...</div>}>
                <GalleryPageContent />
            </Suspense>
            <Footer />
        </ThemeProvider>
    );
}