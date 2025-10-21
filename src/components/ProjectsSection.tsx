'use client';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ChevronRight, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { PROJECTS } from "@/constants";
import Image from "next/image";

interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  category: string;
  technologies: string[];
  features: string[];
  featured: boolean;
  liveUrl: string;
  githubUrl: string;
}

const ProjectsSection = () => {
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Only show featured projects on the home page
  const featuredProjects = PROJECTS.filter(project => project.featured);
  
  const handleViewAllProjects = () => {
    router.push('/projects');
  };
  
  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Featured Projects
          </motion.h2>
          <motion.p 
            className="section-subtitle mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            A showcase of my best work, personal projects, and client collaborations.
          </motion.p>
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="glass glass-dark rounded-xl overflow-hidden card-hover cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 * index }}
              onClick={() => setSelectedProject(project)}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                transition: { duration: 0.2 } 
              }}
            >
              {/* Project Image */}
              <div className="relative aspect-video overflow-hidden">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="flex space-x-3">
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={16} className="text-white" />
                    </a>
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={16} className="text-white" />
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Project Details */}
              <div className="p-6">
                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-3">
                  {project.category}
                </span>
                <h3 className="text-xl font-medium mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span 
                      key={`${project.id}-${tech}`}
                      className="px-2 py-1 text-xs rounded-md bg-secondary/50 text-foreground/80"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 text-xs rounded-md bg-secondary/50 text-foreground/80">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
                
                <button 
                  className="inline-flex items-center text-sm font-medium text-primary hover-link"
                  onClick={() => setSelectedProject(project)}
                >
                  View Details
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="flex justify-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button 
            onClick={handleViewAllProjects}
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            View All Projects
            <ArrowRight size={16} className="ml-2" />
          </button>
        </motion.div>
      </div>
      
      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <AnimatePresence>
        {selectedProject && (
        <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">{selectedProject.title}</DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground">
                    {selectedProject.category} Project
                  </DialogDescription>
                </DialogHeader>
                
                <div className="mt-4">
                  <div className="rounded-lg overflow-hidden mb-6 relative aspect-video">
                    <Image 
                      src={selectedProject.image} 
                      alt={selectedProject.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Overview</h3>
                    <p className="text-muted-foreground">{selectedProject.fullDescription}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Technologies Used</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech) => (
                          <motion.span 
                            key={tech}
                            className="px-3 py-1 text-sm rounded-md bg-secondary text-foreground"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(var(--primary), 0.1)" }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Key Features</h3>
                      <ul className="space-y-2">
                        {selectedProject.features.map((feature, index) => (
                          <motion.li 
                            key={index} 
                            className="flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <span className="mr-2 mt-1 text-primary">•</span>
                            <span className="text-muted-foreground">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-6">
                    <motion.a 
                      href={selectedProject.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 rounded-md bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={18} className="mr-2" />
                      View Code
                    </motion.a>
                    <motion.a 
                      href={selectedProject.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={18} className="mr-2" />
                      Live Preview
                    </motion.a>
                  </div>
                </div>
              </motion.div>
        </DialogContent>
        )}
        </AnimatePresence>
      </Dialog>
      
      {/* Background Elements */}
      <div className="absolute top-1/3 right-0 w-72 h-72 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-3xl -z-10" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-3xl -z-10" />
    </section>
  );
};

export default ProjectsSection;
