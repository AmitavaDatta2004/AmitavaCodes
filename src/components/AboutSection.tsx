'use client';
import { motion } from "framer-motion";
import { Sparkles, Code, Star, Globe, BrainCircuit, Laptop, Database } from "lucide-react";
import Image from "next/image";

const AboutSection = () => {
  const skills = [
    "JavaScript", "TypeScript", "React", "Node.js",
    "HTML", "CSS", "Tailwind CSS", "Python",
    "UI/UX Design", "Git", "GraphQL", "Next.js",
    "Express.js", "MongoDB", "PostgreSQL", "REST APIs"
  ];
  
  const skillIcons: { [key: string]: React.ReactNode } = {
    "JavaScript": <Code size={16} />,
    "TypeScript": <Code size={16} />,
    "React": <Code size={16} />,
    "Node.js": <BrainCircuit size={16} />,
    "HTML": <Code size={16} />,
    "CSS": <Sparkles size={16} />,
    "Tailwind CSS": <Sparkles size={16} />,
    "Python": <Code size={16} />,
    "UI/UX Design": <Laptop size={16} />,
    "Git": <BrainCircuit size={16} />,
    "GraphQL": <Code size={16} />,
    "Next.js": <Globe size={16} />,
    "Express.js": <BrainCircuit size={16} />,
    "MongoDB": <Database size={16} />,
    "PostgreSQL": <Database size={16} />,
    "REST APIs": <Globe size={16} />
  };
  
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            About Me
          </motion.h2>
          <motion.p 
            className="section-subtitle mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Get to know more about my background, skills, and what drives me.
          </motion.p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16">
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 opacity-70 blur-xl animate-pulse"></div>
              <div className="device-frame relative glass-card aspect-[3/4] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <Image 
                  src="https://images.unsplash.com/photo-1611262588024-d12430b98920?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3" 
                  alt="Profile"
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-bold">Amitava Datta</h3>
                  <p className="text-white/90 text-sm">Full Stack Developer</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="glass-morphism rounded-xl p-8 glass-hover shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-white/10">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text ">
                I'm <span className="relative inline-block text-red-400">
                  Amitava Datta
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-full"></span>
                </span>, a passionate developer
              </h3>
              
              <div className="space-y-4 text-muted-foreground">
                <p className="relative pl-4 border-l-2 border-primary">
                  I'm a dedicated full-stack developer with a passion for creating
                  beautiful, functional, and user-centered digital experiences. With 
                  a background in computer science and design, I bridge the gap between 
                  technology and user needs.
                </p>
                <p className="relative pl-4 border-l-2 border-accent">
                  When I'm not coding, you can find me exploring new technologies, 
                  contributing to open-source projects, or enjoying outdoor activities. 
                  I believe in continuous learning and pushing creative boundaries.
                </p>
              </div>
              
              <div className="mt-8 bg-white/5 dark:bg-black/5 backdrop-blur-sm p-5 rounded-lg border border-white/20 dark:border-white/5 shadow-inner hover:bg-white/10 dark:hover:bg-black/10 transition-colors duration-300">
                <h4 className="text-lg font-medium mb-4 flex items-center">
                  <Star className="text-primary mr-2" size={18} />
                  <span>My Skills</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <motion.span
                      key={skill}
                      className="skill-badge glass-hover backdrop-blur-sm bg-background/40 border border-border/30 flex items-center gap-1.5 hover:bg-primary/10 hover:-translate-y-1 hover:shadow-md group transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.05 * index }}
                    >
                      <span className="text-primary group-hover:scale-110 transition-transform duration-300">
                        {skillIcons[skill]}
                      </span>
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 bg-white/5 dark:bg-black/5 backdrop-blur-sm p-5 rounded-lg border border-white/20 dark:border-white/5 shadow-inner hover:bg-white/10 dark:hover:bg-black/10 transition-colors duration-300">
                <h4 className="text-lg font-medium mb-4 flex items-center">
                  <Sparkles className="text-primary mr-2" size={18} />
                  <span>Fun Facts</span>
                </h4>
                <ul className="space-y-3 text-muted-foreground">
                  {[
                    "I've solved over 300 coding challenges on LeetCode",
                    "I contribute to open-source projects in my free time",
                    "I enjoy hiking and photography on weekends",
                    "I'm a coffee enthusiast and amateur barista"
                  ].map((fact, index) => (
                    <li key={index} className="flex items-start group hover:text-foreground transition-colors duration-300">
                      <span className="mr-2 mt-1 text-primary group-hover:scale-125 transition-transform duration-300">•</span>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl -z-10 animate-pulse" />
    </section>
  );
};

export default AboutSection;
