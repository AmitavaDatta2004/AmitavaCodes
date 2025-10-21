
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Calendar, Briefcase, GraduationCap, Award, Star, ArrowRight, MapPin, Clock, Link, ExternalLink } from "lucide-react";
import { useRef, useState } from "react";
import { TIMELINE_ITEMS } from "@/constants";
import { cn } from "@/lib/utils";

const ExperienceSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({ 
    target: containerRef,
    offset: ["start end", "end start"] 
  });
  
  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const renderIcon = (type: string) => {
    switch (type) {
      case "work":
        return <Briefcase className="h-5 w-5 text-white" />;
      case "education":
        return <GraduationCap className="h-5 w-5 text-white" />;
      case "achievement":
        return <Award className="h-5 w-5 text-white" />;
      default:
        return <Calendar className="h-5 w-5 text-white" />;
    }
  };
  
  return (
    <section id="experience" className="py-20 md:py-28 lg:py-32 relative overflow-hidden">
      {/* Enhanced background with more gradient effects */}
      <div 
        className="absolute inset-0 -z-10 bg-gradient-to-br from-background/50 to-background/80"
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-5 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-rgb),0.15),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(var(--accent-rgb),0.15),transparent_40%)]" 
        aria-hidden="true"
      />
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="section-title relative inline-block">
            Experience & Journey
            <motion.div 
              className="absolute -bottom-2 left-1/2 h-1 bg-primary rounded-full -translate-x-1/2"
              initial={{ width: "0%" }}
              whileInView={{ width: "70%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
          </h2>
          <motion.p 
            className="section-subtitle mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            My professional path, education, and key milestones along the way.
          </motion.p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto relative pb-20" ref={containerRef}>
          {/* Enhanced timeline line with better glow effects */}
          <motion.div 
            className="absolute left-[14px] md:left-1/2 top-0 bottom-0 w-1 bg-border/30 rounded-full"
            style={{ 
              opacity: useTransform(scrollYProgress, [0, 0.1], [0, 1]),
            }}
          />
          
          <motion.div 
            className="absolute left-[14px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/80 to-primary/50 rounded-full origin-top"
            style={{ 
              scaleY: scaleProgress,
              opacity: useTransform(scrollYProgress, [0, 0.1], [0, 1]),
              filter: "drop-shadow(0 0 8px rgba(var(--primary-rgb), 0.5))"
            }}
          />
          
          <div className="space-y-16 md:space-y-24 relative">
            {TIMELINE_ITEMS.map((item, index) => (
              <motion.div 
                key={item.id} 
                className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px 0px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <div className={`md:w-1/2 md:px-10 flex-1 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: index % 2 === 0 ? 30 : -30 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.2, 
                      type: "spring", 
                      stiffness: 100 
                    }}
                    whileHover={{ 
                      y: -5,
                      boxShadow: "0 10px 30px -10px rgba(var(--primary-rgb), 0.25)"
                    }}
                    className={cn(
                      "glass glass-dark rounded-xl p-6 border border-border/30 transition-all duration-300 hover:border-primary/30",
                      "shadow-sm hover:shadow-xl shadow-transparent hover:shadow-primary/5",
                      hoveredItem === item.id ? "ring-1 ring-primary/40 scale-[1.02]" : "",
                      index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto',
                    )}
                  >
                    <div className="flex flex-col gap-4">
                      <div className={`flex items-start gap-2 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                        <div className={`flex-grow ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                          <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full text-white mb-3 shadow-sm ${item.color}`}>
                            <Clock size={12} className={`${index % 2 === 0 ? 'md:ml-1.5' : 'mr-1.5'}`} />
                            {item.date}
                          </span>
                          
                          {/* Changed the url property check and link generation */}
                          <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                          
                          <div className={`flex items-center gap-1.5 text-base font-medium text-muted-foreground mb-3 ${
                            index % 2 === 0 ? 'md:flex-row-reverse md:justify-end' : ''
                          }`}>
                            <MapPin size={14} className="text-primary flex-shrink-0" />
                            <p>{item.organization}</p>
                          </div>
                        </div>
                      </div>
                      
                      <p className={`text-sm text-muted-foreground/90 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                        {item.description}
                      </p>
                      
                      {item.skills && (
                        <div className={`flex flex-wrap gap-2 mt-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                          {item.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2.5 py-1 text-xs rounded-md bg-secondary/50 text-foreground/90 backdrop-blur-sm hover:bg-secondary/80 transition-colors"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
                
                <div className="md:w-14 relative flex justify-center">
                  <motion.div 
                    className={`absolute z-10 w-9 h-9 rounded-full flex items-center justify-center ${item.color} shadow-lg shadow-${item.color}/30`}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: 0.3, 
                      duration: 0.5,
                      type: "spring",
                      bounce: 0.5
                    }}
                    whileHover={{ 
                      scale: 1.2,
                      boxShadow: `0 0 20px 0 ${item.color}70`
                    }}
                  >
                    {renderIcon(item.icon)}
                  </motion.div>
                  
                  <motion.div
                    className={`absolute z-0 w-9 h-9 rounded-full ${item.color} blur-md`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 2 }}
                    animate={hoveredItem === item.id ? 
                      { scale: [2, 2.5, 2], opacity: [0.5, 0.8, 0.5] } : 
                      { scale: 2, opacity: 0.5 }
                    }
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                </div>
                
                <div className="md:w-1/2 invisible md:visible"></div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex justify-center items-center"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
                boxShadow: [
                  "0 0 0 rgba(var(--primary-rgb), 0.4)",
                  "0 0 20px rgba(var(--primary-rgb), 0.6)",
                  "0 0 0 rgba(var(--primary-rgb), 0.4)"
                ]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "loop"
              }}
              className="bg-gradient-to-br from-primary to-accent p-4 rounded-full shadow-lg relative z-10"
            >
              <Star className="h-7 w-7 text-white fill-white" />
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Enhanced decorative elements */}
      <div className="absolute top-1/5 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-primary/5 to-accent/5 blur-[100px] -z-10 opacity-60" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 rounded-full bg-gradient-to-br from-primary/8 to-accent/8 blur-[100px] -z-10 opacity-70" />
      
      <div className="absolute top-20 left-10 opacity-20 animate-spin-slow">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 0L20 40" stroke="currentColor" strokeWidth="2" />
          <path d="M0 20L40 20" stroke="currentColor" strokeWidth="2" />
          <path d="M5.85785 5.85785L34.1421 34.1421" stroke="currentColor" strokeWidth="2" />
          <path d="M34.1421 5.85785L5.85785 34.1421" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      
      <div className="absolute bottom-20 right-10 opacity-20 animate-spin-slow" style={{ animationDirection: "reverse" }}>
        <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="2" />
          <path d="M20 0L20 40" stroke="currentColor" strokeWidth="2" />
          <path d="M0 20L40 20" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      
      {/* Added subtle animated particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 50 - 25],
            x: [0, Math.random() * 50 - 25],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, Math.random() * 1.5 + 1, 1],
          }}
          transition={{
            duration: Math.random() * 5 + 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}
    </section>
  );
};

export default ExperienceSection;
