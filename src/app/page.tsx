'use client';

import { Suspense, useEffect } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import AchievementsSection from '@/components/AchievementsSection';
import GallerySection from '@/components/GallerySection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ParticlesBackground from '@/components/ParticlesBackground';
import { motion } from 'framer-motion';

function HomeComponent() {
  useEffect(() => {
    // Add a class to the body for enhanced gradient background in light mode
    document.body.classList.add('enhanced-light-bg');
    
    return () => {
      document.body.classList.remove('enhanced-light-bg');
    };
  }, []);
  
  // Intersection Observer for fade-in animations
  useEffect(() => {
      const fadeInSections = document.querySelectorAll('.fade-in-section');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      }, { threshold: 0.1 });
      
      fadeInSections.forEach(section => {
        observer.observe(section);
      });
      
      return () => {
        fadeInSections.forEach(section => {
          observer.unobserve(section);
        });
      };
  }, []);

  // Stagger children animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };
  
  return (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full overflow-hidden"
        >
          <div className="fixed inset-0 -z-10 bg-gradient-to-b from-background to-background pointer-events-none"></div>
          <ParticlesBackground />
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10"
          >
            <motion.div variants={itemVariants}>
              <Navbar />
            </motion.div>
            
            <main>
              <motion.div variants={itemVariants}>
                <HeroSection />
              </motion.div>
              
              <motion.div variants={itemVariants} className="fade-in-section">
                <AboutSection />
              </motion.div>
              
              <motion.div variants={itemVariants} className="fade-in-section">
                <SkillsSection />
              </motion.div>
              
              <motion.div variants={itemVariants} className="fade-in-section">
                <ExperienceSection />
              </motion.div>
              
              <motion.div variants={itemVariants} className="fade-in-section">
                <ProjectsSection />
              </motion.div>
              
              <motion.div variants={itemVariants} className="fade-in-section">
                <TestimonialsSection />
              </motion.div>
              
              <motion.div variants={itemVariants} className="fade-in-section">
                <AchievementsSection />
              </motion.div>
              
              <motion.div variants={itemVariants} className="fade-in-section">
                <GallerySection />
              </motion.div>
              
              <motion.div variants={itemVariants} className="fade-in-section">
                <ContactSection />
              </motion.div>
            </main>
            
            <motion.div variants={itemVariants}>
              <Footer />
            </motion.div>
          </motion.div>
          
          <div className="fixed inset-0 pointer-events-none overflow-hidden -z-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-gradient-to-r from-primary/5 to-accent/5 blur-[80px]"
                style={{
                  width: `${Math.random() * 200 + 100}px`,
                  height: `${Math.random() * 200 + 100}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, Math.random() * 30 - 15],
                  y: [0, Math.random() * 30 - 15],
                }}
                transition={{
                  duration: Math.random() * 10 + 20,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </motion.div>
  );
}


export default function Home() {
    return (
        <ThemeProvider>
            <Suspense fallback={<div>Loading...</div>}>
                <HomeComponent />
            </Suspense>
        </ThemeProvider>
    );
}
