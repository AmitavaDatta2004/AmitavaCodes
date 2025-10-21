'use client';
import { motion } from "framer-motion";
import { useState } from "react";
import { defaultSortOptions, SortOption, SortSelector } from "@/components/ui/sort-selector";
import Image from "next/image";

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: string;
  description: string;
  date: string;
}

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOption, setSortOption] = useState<SortOption>(defaultSortOptions[0]);
  
  const categories = ["All", "Frontend", "Backend", "Tools", "Design"];
  
  const skills: Skill[] = [
    {
      name: "React",
      level: 90,
      category: "Frontend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      description: "Building interactive UIs with modern React using hooks and context",
      date: "2020-01-15"
    },
    {
      name: "TypeScript",
      level: 85,
      category: "Frontend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      description: "Type-safe JavaScript development with TypeScript",
      date: "2019-05-20"
    },
    {
      name: "Node.js",
      level: 80,
      category: "Backend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      description: "Server-side JavaScript for APIs and microservices",
      date: "2018-11-10"
    },
    {
      name: "Tailwind CSS",
      level: 95,
      category: "Frontend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
      description: "Utility-first CSS framework for rapid UI development",
      date: "2021-03-05"
    },
    {
      name: "MongoDB",
      level: 75,
      category: "Backend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      description: "NoSQL database design and optimization",
      date: "2019-08-15"
    },
    {
      name: "Figma",
      level: 85,
      category: "Design",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
      description: "UI design, prototyping, and design systems",
      date: "2020-06-22"
    },
    {
      name: "Git",
      level: 90,
      category: "Tools",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      description: "Version control and collaboration workflows",
      date: "2017-04-12"
    },
    {
      name: "Next.js",
      level: 80,
      category: "Frontend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      description: "React framework for production-grade applications",
      date: "2021-01-30"
    },
    {
      name: "Express",
      level: 85,
      category: "Backend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
      description: "Node.js web application framework",
      date: "2018-12-05"
    },
    {
      name: "Docker",
      level: 70,
      category: "Tools",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      description: "Containerization for consistent deployments",
      date: "2020-08-18"
    },
    {
      name: "PostgreSQL",
      level: 75,
      category: "Backend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      description: "Relational database management",
      date: "2019-05-10"
    },
    {
      name: "Adobe XD",
      level: 75,
      category: "Design",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg",
      description: "UI/UX design and prototyping",
      date: "2019-03-15"
    }
  ];
  
  const filteredSkills = activeCategory === "All" 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);
  
  // Sorting logic
  const sortedSkills = [...filteredSkills].sort((a, b) => {
    const aValue = a[sortOption.orderBy as keyof Skill];
    const bValue = b[sortOption.orderBy as keyof Skill];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOption.direction === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOption.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });
  
  // Custom sort options for skills
  const skillSortOptions = [
    {
      id: "levelHigh",
      label: "Highest Level",
      icon: <span className="text-primary">↑</span>,
      orderBy: "level",
      direction: "desc" as const
    },
    {
      id: "levelLow",
      label: "Lowest Level",
      icon: <span className="text-primary">↓</span>,
      orderBy: "level",
      direction: "asc" as const
    },
    ...defaultSortOptions.filter(opt => ["az", "za"].includes(opt.id))
  ];
  
  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
  };
  
  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            My Skills & Expertise
          </motion.h2>
          <motion.p 
            className="section-subtitle mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            A comprehensive overview of my technical capabilities and proficiency levels.
          </motion.p>
        </div>
        
        {/* Category and Sort Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <motion.div 
            className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-primary text-white shadow-md"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <SortSelector 
              options={skillSortOptions} 
              onSortChange={handleSortChange} 
            />
          </motion.div>
        </div>
        
        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="glass glass-dark rounded-xl p-6 relative group overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 * index }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              {/* Background gradient overlay on hover */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
              
              <div className="flex items-start gap-4 relative z-10">
                <motion.div 
                  className="h-16 w-16 flex items-center justify-center rounded-lg bg-secondary/50 transition-all duration-300 group-hover:bg-primary/20"
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div className="h-10 w-10 transition-transform duration-300 group-hover:scale-110 relative">
                    <Image 
                      src={skill.icon} 
                      alt={skill.name} 
                      layout="fill"
                      objectFit="contain"
                    />
                  </motion.div>
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-1 relative">
                    {skill.name}
                    <motion.span 
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                    />
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 group-hover:text-foreground transition-colors duration-300">{skill.description}</p>
                  
                  <div className="w-full h-3 bg-secondary rounded-full overflow-hidden relative">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.1 }}
                    />
                    
                    {/* Glow effect on hover */}
                    <motion.div 
                      className="absolute inset-0 bg-primary/30 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  
                  <div className="flex justify-between mt-1">
                    <motion.span 
                      className="text-xs font-medium bg-secondary/50 px-2 py-1 rounded-full group-hover:bg-primary/20 transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      {skill.category}
                    </motion.span>
                    <motion.span 
                      className="text-xs font-medium"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="group-hover:text-primary transition-colors duration-300">{skill.level}%</span>
                    </motion.span>
                  </div>
                </div>
              </div>
              
              {/* Particle effects on hover */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -20],
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-1/3 left-0 w-72 h-72 rounded-full bg-primary/5 blur-3xl -z-10" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl -z-10" />
    </section>
  );
};

export default SkillsSection;
