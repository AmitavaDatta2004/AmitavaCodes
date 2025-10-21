'use client';
import { useState, useEffect, useMemo, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@/context/ThemeContext";
import Footer from "@/components/Footer";
import ParticlesBackground from "@/components/ParticlesBackground";
import { ExternalLink, Github, ChevronRight, ArrowLeft, Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input"; 
import { PROJECTS, PROJECT_CATEGORIES } from "@/constants";
import { UniversalSort, projectSortOptions, SortOption } from "@/components/ui/universal-sort";

interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  category: string;
  technologies: string[];
  features: string[];
  liveUrl: string;
  githubUrl: string;
  date: string;
  complexity?: number;
}


function ProjectsPageContent() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>(projectSortOptions[0]);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const filteredProjects = useMemo(() => {
    const filtered = PROJECTS.filter(project => {
      const matchesCategory = activeCategory === "All" || project.category === activeCategory;
      const matchesSearch = searchQuery === "" || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
    
    return [...filtered].sort((a, b) => {
      const aValue = a[sortOption.orderBy as keyof Project];
      const bValue = b[sortOption.orderBy as keyof Project];
      
      if (aValue === undefined && bValue === undefined) return 0;
      if (aValue === undefined) return 1;
      if (bValue === undefined) return -1;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        if (sortOption.direction === 'asc') {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        if (sortOption.direction === 'asc') {
          return aValue - bValue;
        } else {
          return bValue - aValue;
        }
      }
      
      return sortOption.direction === 'asc' ? a.id - b.id : b.id - a.id;
    });
  }, [activeCategory, searchQuery, sortOption]);
  
  const cardVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.03, 
      boxShadow: "0 10px 30px -10px rgba(var(--primary-rgb), 0.3)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };
  
  const imageVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1, transition: { duration: 0.5 } }
  };
  
  const overlayVariants = {
    initial: { opacity: 0 },
    hover: { opacity: 1, transition: { duration: 0.3 } }
  };
  
  const buttonVariants = {
    initial: { y: 20, opacity: 0 },
    hover: { y: 0, opacity: 1, transition: { duration: 0.3, delay: 0.1 } }
  };
  
  const techBadgeVariants = {
    initial: { opacity: 0.7, y: 0 },
    hover: (i: number) => ({ 
      opacity: 1, 
      y: -5, 
      transition: { duration: 0.3, delay: i * 0.05 } 
    })
  };
  
  return (
      <main className="pt-20 relative">
        <div className="container mx-auto px-4 mb-6">
          <Button
            onClick={() => router.push('/')}
            variant="outline"
            className="group flex items-center gap-2 hover:bg-primary/10 transition-all"
          >
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Button>
        </div>

        <section className="py-12 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                My Projects
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Explore all my projects and creative works. Each project represents a unique challenge and solution.
              </motion.p>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
              <motion.div
                className="md:max-w-md w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 py-6 bg-background/70 backdrop-blur border-muted"
                  />
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <UniversalSort 
                  options={projectSortOptions}
                  onSortChange={setSortOption}
                  className="bg-background/70 backdrop-blur border-muted"
                />
              </motion.div>
            </div>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-3 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {PROJECT_CATEGORIES.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-primary text-white shadow-md"
                      : "bg-secondary hover:bg-secondary/80"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="glass glass-dark rounded-xl overflow-hidden cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 * index }}
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                    onClick={() => setSelectedProject(project)}
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <motion.img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                        variants={imageVariants}
                      />
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-4"
                        variants={overlayVariants}
                      >
                        <motion.div 
                          className="flex space-x-3 mb-3"
                          variants={buttonVariants}
                        >
                          <motion.a 
                            href={project.liveUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.4)" }}
                          >
                            <ExternalLink size={16} className="text-white" />
                          </motion.a>
                          <motion.a 
                            href={project.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.4)" }}
                          >
                            <Github size={16} className="text-white" />
                          </motion.a>
                        </motion.div>
                        <motion.p 
                          className="text-sm text-white/90 font-medium"
                          initial={{ opacity: 0, y: 10 }}
                          animate={hoveredProject === project.id ? 
                            { opacity: 1, y: 0 } : 
                            { opacity: 0, y: 10 }
                          }
                          transition={{ duration: 0.3, delay: 0.2 }}
                        >
                          Click to view details
                        </motion.p>
                      </motion.div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <motion.span 
                          className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                          whileHover={{ scale: 1.05, backgroundColor: "rgba(var(--primary-rgb), 0.2)" }}
                        >
                          {project.category}
                        </motion.span>
                        {project.date && (
                          <span className="text-xs text-muted-foreground">
                            {project.date}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech, i) => (
                          <motion.span 
                            key={`${project.id}-${tech}`}
                            className="px-2 py-1 text-xs rounded-md bg-secondary/50 text-foreground/80 hover:bg-secondary/80 transition-colors"
                            custom={i}
                            variants={techBadgeVariants}
                          >
                            {tech}
                          </motion.span>
                        ))}
                        {project.technologies.length > 3 && (
                          <motion.span 
                            className="px-2 py-1 text-xs rounded-md bg-secondary/50 text-foreground/80"
                            custom={3}
                            variants={techBadgeVariants}
                          >
                            +{project.technologies.length - 3}
                          </motion.span>
                        )}
                      </div>
                      
                      <motion.button 
                        className="inline-flex items-center text-sm font-medium text-primary hover:underline transition-all"
                        whileHover={{ x: 3 }}
                      >
                        View Details
                        <ChevronRight size={16} className="ml-1 transition-transform" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-16">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-lg text-muted-foreground mb-4">No projects found.</p>
                    <Button 
                      onClick={() => {
                        setSearchQuery("");
                        setActiveCategory("All");
                      }}
                      variant="outline"
                    >
                      Clear Filters
                    </Button>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
          
          <div className="absolute top-1/3 right-0 w-72 h-72 rounded-full bg-primary/5 blur-3xl -z-10" />
          <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl -z-10" />
        </section>
      </main>
      
      <AnimatePresence>
        {selectedProject && (
          <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
            <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
              >
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">{selectedProject.title}</DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground">
                    {selectedProject.category} Project {selectedProject.date && `• ${selectedProject.date}`}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="mt-4">
                  <motion.div 
                    className="rounded-lg overflow-hidden mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <img 
                      src={selectedProject.image} 
                      alt={selectedProject.title}
                      className="w-full h-auto object-cover"
                    />
                  </motion.div>
                  
                  <motion.div 
                    className="mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <h3 className="text-lg font-semibold mb-2">Overview</h3>
                    <p className="text-muted-foreground">{selectedProject.fullDescription}</p>
                  </motion.div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <h3 className="text-lg font-semibold mb-2">Technologies Used</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, index) => (
                          <motion.span 
                            key={tech}
                            className="px-3 py-1 text-sm rounded-md bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: 0.3 + (index * 0.05) }}
                            whileHover={{ 
                              y: -3, 
                              backgroundColor: "rgba(var(--primary-rgb), 0.15)",
                              boxShadow: "0 4px 12px rgba(var(--primary-rgb), 0.15)" 
                            }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <h3 className="text-lg font-semibold mb-2">Key Features</h3>
                      <ul className="space-y-2">
                        {selectedProject.features.map((feature, index) => (
                          <motion.li 
                            key={index} 
                            className="flex items-start group"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.3 + (index * 0.07) }}
                          >
                            <motion.span 
                              className="mr-2 mt-1 text-primary group-hover:scale-110 transition-transform"
                              whileHover={{ scale: 1.3, color: "rgba(var(--primary-rgb), 1)" }}
                            >
                              •
                            </motion.span>
                            <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                              {feature}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className="flex justify-between mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <motion.a 
                      href={selectedProject.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 rounded-md bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
                      whileHover={{ 
                        scale: 1.03, 
                        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" 
                      }}
                    >
                      <Github size={18} className="mr-2" />
                      View Code
                    </motion.a>
                    <motion.a 
                      href={selectedProject.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                      whileHover={{ 
                        scale: 1.03, 
                        boxShadow: "0 5px 15px rgba(var(--primary-rgb), 0.2)" 
                      }}
                    >
                      <ExternalLink size={18} className="mr-2" />
                      Live Preview
                    </motion.a>
                  </motion.div>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
  );
}

export default function ProjectsPage() {
    return (
        <ThemeProvider>
            <ParticlesBackground />
            <Suspense fallback={<div>Loading...</div>}>
                <ProjectsPageContent />
            </Suspense>
            <Footer />
        </ThemeProvider>
    );
}