'use client';
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import AnimatedText from "./AnimatedText";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } = sectionRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      setMousePosition({ x, y });
    };
    
    if (typeof window !== 'undefined') {
        window.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
        if (typeof window !== 'undefined') {
            window.removeEventListener("mousemove", handleMouseMove);
        }
    }
  }, []);
  
  const xMove = mousePosition.x * 15;
  const yMove = mousePosition.y * 15;
  
  return (
    <section 
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <div className="container px-4 py-10 mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div 
            className="lg:w-1/2 mb-10 lg:mb-0 z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-morphism p-8 rounded-2xl shadow-lg glass-hover">
              <span className="block text-sm md:text-base text-primary font-medium mb-4 tracking-wide">
                👋 Welcome to my portfolio
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                Hi, I'm <span className="text-primary">Amitava Datta</span>
              </h1>
              <div className="text-xl md:text-2xl lg:text-3xl font-light mb-8 h-12">
                I'm a{" "}
                <AnimatedText 
                  texts={[
                    "Full-Stack Developer",
                    "UI/UX Designer",
                    "Tech Enthusiast",
                    "Problem Solver"
                  ]}
                />
              </div>
              <p className="text-muted-foreground mb-8 max-w-lg text-base md:text-lg leading-relaxed">
                A passionate developer focused on creating intuitive and engaging 
                digital experiences with clean code and modern technologies.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.a
                  href="#contact"
                  className="glass-button px-6 py-3 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Hire Me
                </motion.a>
                <motion.a
                  href="#projects"
                  className="px-6 py-3 backdrop-blur-md bg-background/40 border border-border/30 rounded-lg font-medium shadow-sm hover:shadow-lg hover:border-primary/40 hover:bg-foreground/5 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Projects
                </motion.a>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 flex justify-center z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ 
              transform: `translate(${xMove}px, ${yMove}px)` 
            }}
          >
            <motion.div
              className="relative w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-sunrise dark:bg-gradient-sunset shadow-xl glass-hover"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onHoverStart={() => setIsHovering(true)}
              onHoverEnd={() => setIsHovering(false)}
            >
              <motion.div 
                className="absolute inset-1 rounded-full glass-card backdrop-blur-lg flex items-center justify-center overflow-hidden"
                animate={isHovering ? { rotate: [0, 5, -5, 0] } : {}}
                transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
              >
                <div className="w-full h-full overflow-hidden rounded-full relative group">
                  <motion.div
                    className="w-full h-full"
                    whileHover={{ scale: 1.15 }}
                    animate={isHovering ? { scale: 1.1 } : { scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image 
                      src="/AmitavaDatta.jpg" 
                      alt="Profile"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full transition-all duration-300"
                    />
                  </motion.div>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent opacity-0 transition-opacity duration-300 rounded-full"
                    animate={isHovering ? { opacity: 0.7 } : { opacity: 0 }}
                  />
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -inset-3 rounded-full opacity-0"
                animate={isHovering ? { 
                  opacity: [0, 0.5, 0], 
                  scale: [0.8, 1.2, 1.8]
                } : {}}
                transition={{ 
                  duration: 2, 
                  ease: "easeInOut", 
                  repeat: Infinity,
                  repeatType: "loop"
                }}
                style={{
                  background: "radial-gradient(circle, rgba(var(--primary-rgb), 0.3) 0%, transparent 70%)"
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      <div className="scroll-down text-sm text-foreground/70 glass-morphism px-4 py-2 rounded-full">
        <ArrowDown size={20} className="animate-bounce mb-2" />
        <span>Scroll Down</span>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl z-0" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-primary/10 blur-3xl z-0" />
    </section>
  );
};

export default HeroSection;
