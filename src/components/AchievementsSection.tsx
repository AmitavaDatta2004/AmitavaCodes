'use client';
import { motion } from "framer-motion";
import { Award, FileCheck, Medal, Trophy, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ACHIEVEMENTS, ADDITIONAL_CERTIFICATIONS } from "@/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

interface Achievement {
  id: number;
  title: string;
  organization: string;
  date: string;
  description: string;
  icon: "award" | "certificate" | "medal" | "trophy";
  image?: string;
  certificateFile?: string;
  featured?: boolean;
}

const AchievementsSection = () => {
  const router = useRouter();
  const [hoveredAchievement, setHoveredAchievement] = useState<number | null>(null);
  const [hoveredCert, setHoveredCert] = useState<number | null>(null);
  
  // Filter achievements to show only featured ones
  const featuredAchievements = ACHIEVEMENTS.filter(achievement => achievement.featured);
  
  // Get only a few certifications for preview
  const previewCertifications = ADDITIONAL_CERTIFICATIONS.slice(0, 3);
  
  const renderIcon = (type: string) => {
    switch (type) {
      case "award":
        return <Award className="h-5 w-5" />;
      case "certificate":
        return <FileCheck className="h-5 w-5" />;
      case "medal":
        return <Medal className="h-5 w-5" />;
      case "trophy":
        return <Trophy className="h-5 w-5" />;
      default:
        return <Award className="h-5 w-5" />;
    }
  };
  
  // Handle navigation to full achievements page
  const handleViewAllAchievements = () => {
    router.push('/achievements');
  };
  
  // Animation variants for enhanced hover effects
  const achievementCardVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.02, 
      boxShadow: "0 10px 30px -15px rgba(var(--primary-rgb), 0.3)",
      borderColor: "rgba(var(--primary-rgb), 0.3)",
      transition: { duration: 0.3 }
    }
  };
  
  const certCardVariants = {
    initial: { scale: 1, backgroundColor: "rgba(var(--secondary-rgb), 0.5)" },
    hover: { 
      scale: 1.03, 
      backgroundColor: "rgba(var(--secondary-rgb), 0.7)",
      boxShadow: "0 8px 20px -10px rgba(var(--primary-rgb), 0.25)",
      transition: { duration: 0.3 }
    }
  };
  
  const iconContainerVariants = {
    initial: { backgroundColor: "rgba(var(--primary-rgb), 0.1)" },
    hover: { 
      backgroundColor: "rgba(var(--primary-rgb), 0.2)",
      scale: 1.1,
      transition: { duration: 0.3 }
    }
  };
  
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05, 
      boxShadow: "0 10px 25px -10px rgba(var(--primary-rgb), 0.4)",
      transition: { duration: 0.3 }
    }
  };
  
  const imageVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.08, transition: { duration: 0.5 } }
  };
  
  return (
    <section id="achievements" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Featured Achievements
          </motion.h2>
          <motion.p 
            className="section-subtitle mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Selected awards, recognitions, and professional certifications from my career journey.
          </motion.p>
        </div>
        
        {/* Achievements Grid - Only Featured */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              className="glass glass-dark rounded-xl overflow-hidden card-hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              variants={achievementCardVariants}
              whileHover="hover"
              onMouseEnter={() => setHoveredAchievement(achievement.id)}
              onMouseLeave={() => setHoveredAchievement(null)}
            >
              <div className="flex flex-col sm:flex-row h-full">
                {achievement.image && (
                  <div className="sm:w-1/3 h-40 sm:h-auto overflow-hidden relative">
                    <motion.div
                      className="w-full h-full"
                      variants={imageVariants}
                    >
                      <Image 
                        src={achievement.image} 
                        alt={achievement.title}
                        layout="fill"
                        objectFit="cover"
                      />
                    </motion.div>
                  </div>
                )}
                <div className={`p-6 flex-1 ${!achievement.image ? "" : "sm:w-2/3"}`}>
                  <div className="flex items-start gap-4 mb-3">
                    <motion.div 
                      className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary shrink-0"
                      variants={iconContainerVariants}
                    >
                      {renderIcon(achievement.icon)}
                    </motion.div>
                    <div>
                      <motion.h3 
                        className="text-lg font-medium mb-1"
                        animate={hoveredAchievement === achievement.id ? { color: "hsl(var(--primary))" } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        {achievement.title}
                      </motion.h3>
                      <div className="flex items-center text-sm text-muted-foreground gap-2">
                        <span>{achievement.organization}</span>
                        <span className="h-1 w-1 rounded-full bg-muted-foreground"></span>
                        <span>{achievement.date}</span>
                      </div>
                    </div>
                  </div>
                  <motion.p 
                    className="text-sm text-muted-foreground mb-4"
                    animate={hoveredAchievement === achievement.id ? { color: "hsl(var(--foreground))" } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {achievement.description}
                  </motion.p>
                  
                  {/* Certificate View Button - Only show if certificate exists */}
                  {achievement.certificateFile && (
                    <motion.div
                      initial={{ y: 0, opacity: 1 }}
                      animate={hoveredAchievement === achievement.id ? { y: -5, opacity: 1 } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2 text-primary border-primary hover:bg-primary/10"
                        asChild
                      >
                        <a 
                          href={achievement.certificateFile} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center gap-2"
                        >
                          <FileCheck className="h-4 w-4" />
                          View Certificate
                          <motion.span
                            animate={hoveredAchievement === achievement.id ? { x: 3 } : { x: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ExternalLink className="h-3 w-3" />
                          </motion.span>
                        </a>
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Preview of Certifications */}
        <motion.div 
          className="mt-12 glass glass-dark rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-medium mb-4">Featured Certifications</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {previewCertifications.map((cert, index) => (
              <motion.div 
                key={index}
                className="p-4 rounded-lg bg-secondary/50 flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.05 * index }}
                variants={certCardVariants}
                whileHover="hover"
                onMouseEnter={() => setHoveredCert(cert.id)}
                onMouseLeave={() => setHoveredCert(null)}
              >
                <motion.div
                  variants={iconContainerVariants}
                  className="h-8 w-8 flex items-center justify-center rounded-full bg-primary/10 shrink-0"
                >
                  <FileCheck className="h-5 w-5 text-primary" />
                </motion.div>
                <div className="flex flex-col">
                  <motion.span 
                    className="text-sm font-medium"
                    animate={hoveredCert === cert.id ? { color: "hsl(var(--primary))" } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {cert.name}
                  </motion.span>
                  
                  {/* Certificate View Button - Only show if certificate exists */}
                  {cert.certificateFile && (
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="p-0 h-auto text-xs text-primary justify-start"
                      asChild
                    >
                      <a 
                        href={cert.certificateFile} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-1 mt-1"
                      >
                        View Certificate
                        <motion.span
                          animate={hoveredCert === cert.id ? { x: 3, opacity: 1 } : { x: 0, opacity: 0.7 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ExternalLink className="h-2.5 w-2.5" />
                        </motion.span>
                      </a>
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          className="flex justify-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
          >
            <Button 
              onClick={handleViewAllAchievements}
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-medium transition-all duration-300"
            >
              View All Achievements
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              >
                <ArrowRight size={16} className="ml-2" />
              </motion.span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Enhanced Background Elements */}
      <motion.div 
        className="absolute top-1/3 left-0 w-72 h-72 rounded-full bg-primary/5 blur-3xl -z-10" 
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl -z-10"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2
        }}
      />
    </section>
  );
};

export default AchievementsSection;
