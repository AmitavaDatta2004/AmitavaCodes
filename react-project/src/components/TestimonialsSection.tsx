
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight, User, Heart } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { SortOption, SortSelector } from "@/components/ui/sort-selector";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  category: "client" | "colleague" | "mentor";
  date: string;
}

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right, 0 for initial
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sortOption, setSortOption] = useState<SortOption>({
    id: "recent",
    label: "Most Recent",
    icon: <Star size={16} />,
    orderBy: "date",
    direction: "desc"
  });
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Tech Lead",
      company: "Innovate Solutions",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3",
      content: "Working with Amitava was an incredible experience. Their technical skills and creative approach to problem-solving made our project a huge success. I highly recommend their services!",
      rating: 5,
      category: "client",
      date: "2023-08-15"
    },
    {
      id: 2,
      name: "Samantha Lee",
      role: "Product Manager",
      company: "TechVision Inc",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3",
      content: "Amitava delivered our platform ahead of schedule with exceptional quality. Their attention to detail and ability to translate our requirements into a functional solution exceeded our expectations.",
      rating: 5,
      category: "client",
      date: "2023-06-22"
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "CTO",
      company: "NextGen Startups",
      avatar: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3",
      content: "I've worked with many developers, but Amitava stands out for their technical excellence and communication skills. They not only understood our complex requirements but also suggested improvements we hadn't considered.",
      rating: 4,
      category: "colleague",
      date: "2022-11-05"
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      role: "Senior Developer",
      company: "CodeCraft Studios",
      avatar: "https://images.unsplash.com/photo-1569913486515-b74bf7751574?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3",
      content: "Having Amitava on our team was a game-changer. Their deep knowledge of modern frontend frameworks and problem-solving abilities helped us deliver a complex project on time.",
      rating: 5,
      category: "colleague",
      date: "2023-02-18"
    },
    {
      id: 5,
      name: "Dr. James Wilson",
      role: "Professor",
      company: "Tech University",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3",
      content: "I had the pleasure of mentoring Amitava early in their career. Their dedication to learning and growth mindset was impressive. It's been wonderful to see how they've developed into an exceptional developer.",
      rating: 5,
      category: "mentor",
      date: "2021-10-12"
    }
  ];
  
  // Filter testimonials by category
  const filteredTestimonials = activeCategory === "all" 
    ? testimonials 
    : testimonials.filter(t => t.category === activeCategory);
  
  // Sort testimonials based on current sort option
  const sortedTestimonials = [...filteredTestimonials].sort((a, b) => {
    if (sortOption.orderBy === "date") {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOption.direction === "asc" ? dateA - dateB : dateB - dateA;
    } else if (sortOption.orderBy === "rating") {
      return sortOption.direction === "asc" ? a.rating - b.rating : b.rating - a.rating;
    } else if (sortOption.orderBy === "title") {
      return sortOption.direction === "asc" 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    }
    return 0;
  });
  
  // Ensure activeIndex is valid after filtering/sorting
  useEffect(() => {
    if (activeIndex >= sortedTestimonials.length && sortedTestimonials.length > 0) {
      setActiveIndex(0);
    }
  }, [sortedTestimonials, activeIndex]);
  
  const currentTestimonial = sortedTestimonials[activeIndex] || testimonials[0];
  
  const sortOptions: SortOption[] = [
    {
      id: "recent",
      label: "Most Recent",
      icon: <Star size={16} />,
      orderBy: "date",
      direction: "desc"
    },
    {
      id: "oldest",
      label: "Oldest First",
      icon: <Star size={16} className="opacity-70" />,
      orderBy: "date",
      direction: "asc"
    },
    {
      id: "highest",
      label: "Highest Rated",
      icon: <Star size={16} className="text-yellow-400" />,
      orderBy: "rating",
      direction: "desc"
    }
  ];
  
  const nextTestimonial = () => {
    if (sortedTestimonials.length === 0) return;
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % sortedTestimonials.length);
  };
  
  const prevTestimonial = () => {
    if (sortedTestimonials.length === 0) return;
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + sortedTestimonials.length) % sortedTestimonials.length);
  };
  
  const goToTestimonial = (index: number) => {
    if (sortedTestimonials.length === 0) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setCurrentX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      const diff = currentX - startX;
      if (diff > 50) {
        prevTestimonial();
      } else if (diff < -50) {
        nextTestimonial();
      }
      setIsDragging(false);
    }
  };

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (sortedTestimonials.length > 1) {
        nextTestimonial();
      }
    }, 8000);
    
    return () => clearInterval(interval);
  }, [sortedTestimonials.length]);
  
  // Variants for framer-motion
  const testimonialVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.8,
    }),
  };
  
  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Testimonials
          </motion.h2>
          <motion.p 
            className="section-subtitle mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            What others say about my work and collaboration
          </motion.p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {/* Filter and Sort Controls */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4" 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Tabs 
              defaultValue="all" 
              value={activeCategory}
              onValueChange={setActiveCategory}
              className="w-full sm:w-auto"
            >
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="all" className="text-xs sm:text-sm">All</TabsTrigger>
                <TabsTrigger value="client" className="text-xs sm:text-sm">Clients</TabsTrigger>
                <TabsTrigger value="colleague" className="text-xs sm:text-sm">Colleagues</TabsTrigger>
                <TabsTrigger value="mentor" className="text-xs sm:text-sm">Mentors</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <SortSelector 
              options={sortOptions} 
              onSortChange={setSortOption}
              className="w-full sm:w-auto"
            />
          </motion.div>
          
          <motion.div 
            className="relative glass glass-dark bg-gradient-to-br from-background/60 to-background/30 p-3 mb-10 rounded-2xl overflow-hidden shadow-xl border border-accent/10"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Card background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gradient-to-br from-primary/10 to-accent/5 blur-3xl -z-10 opacity-60" />
              <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-gradient-to-tr from-accent/10 to-primary/5 blur-3xl -z-10 opacity-60" />
            </div>
            
            {sortedTestimonials.length === 0 ? (
              <div className="h-[400px] md:h-[350px] flex flex-col items-center justify-center text-center p-6">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="mb-4 text-muted-foreground"
                >
                  <User size={48} strokeWidth={1.5} />
                </motion.div>
                <h3 className="text-xl font-medium mb-2">No testimonials found</h3>
                <p className="text-muted-foreground">Try changing your filter or sort criteria</p>
              </div>
            ) : (
              <div className="h-[420px] md:h-[350px]">
                <AnimatePresence custom={direction} initial={false} mode="wait">
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={testimonialVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.4 },
                      scale: { duration: 0.4 },
                    }}
                    className="w-full h-full p-6 md:p-8"
                  >
                    <div className="h-full flex flex-col md:flex-row gap-6 relative">
                      <div className="absolute top-0 left-0 opacity-20 -z-10">
                        <Quote size={120} className="text-primary" />
                      </div>
                      
                      <div className="flex flex-col items-center md:items-start md:w-1/3">
                        <motion.div 
                          className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-primary/40 relative shadow-lg overflow-hidden"
                          whileHover={{ scale: 1.05, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        >
                          {currentTestimonial.avatar ? (
                            <img 
                              src={currentTestimonial.avatar} 
                              alt={currentTestimonial.name} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-primary/20 rounded-full">
                              <User size={40} className="text-primary" />
                            </div>
                          )}
                          
                          {/* Animated border */}
                          <motion.div 
                            className="absolute -inset-1 rounded-full z-[-1]"
                            animate={{ 
                              boxShadow: [
                                "0 0 0 0 rgba(var(--primary), 0.3)",
                                "0 0 0 10px rgba(var(--primary), 0)",
                                "0 0 0 0 rgba(var(--primary), 0)"
                              ],
                            }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                          />
                          
                          {/* Category badge */}
                          <div className="absolute bottom-0 right-0 bg-gradient-to-r from-primary to-accent rounded-full px-2 py-1 text-[10px] font-medium text-white shadow-md">
                            {currentTestimonial.category === "client" && "Client"}
                            {currentTestimonial.category === "colleague" && "Colleague"}
                            {currentTestimonial.category === "mentor" && "Mentor"}
                          </div>
                        </motion.div>
                        
                        <div className="flex items-center justify-center space-x-1 my-4">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.1, duration: 0.3 }}
                            >
                              <Star 
                                size={18} 
                                className={`${i < currentTestimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted'}`} 
                              />
                            </motion.div>
                          ))}
                        </div>
                        
                        <motion.div 
                          className="text-center md:text-left space-y-1"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                        >
                          <h4 className="text-xl font-semibold">{currentTestimonial.name}</h4>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            {currentTestimonial.role} at 
                            <motion.span 
                              className="text-primary font-medium"
                              whileHover={{ scale: 1.05 }}
                            >
                              {currentTestimonial.company}
                            </motion.span>
                          </p>
                          
                          <p className="text-xs text-muted-foreground/70 mt-2">
                            {new Date(currentTestimonial.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short'
                            })}
                          </p>
                        </motion.div>
                        
                        {/* Like button */}
                        <motion.button
                          className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Heart size={16} className="stroke-current fill-transparent hover:fill-primary/20" />
                          <span>Helpful</span>
                        </motion.button>
                      </div>
                      
                      <div className="md:w-2/3 flex flex-col justify-center">
                        <motion.blockquote 
                          className="text-lg md:text-xl italic font-light text-center md:text-left leading-relaxed relative"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.6 }}
                        >
                          <span className="absolute -left-4 top-0 text-4xl text-primary/20">"</span>
                          {currentTestimonial.content}
                          <span className="absolute -bottom-6 right-0 text-4xl text-primary/20">"</span>
                        </motion.blockquote>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
            
            {sortedTestimonials.length > 1 && (
              <>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-full flex items-center justify-start px-2 z-10">
                  <motion.button 
                    className="w-10 h-10 rounded-full glass glass-dark flex items-center justify-center hover:bg-primary/10 transition-colors"
                    onClick={prevTestimonial}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronLeft size={20} />
                  </motion.button>
                </div>
                
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-full flex items-center justify-end px-2 z-10">
                  <motion.button 
                    className="w-10 h-10 rounded-full glass glass-dark flex items-center justify-center hover:bg-primary/10 transition-colors"
                    onClick={nextTestimonial}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronRight size={20} />
                  </motion.button>
                </div>
              </>
            )}
            
            {/* Particles animation for background effect */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-primary/20"
                  initial={{ 
                    x: Math.random() * 100 + "%", 
                    y: Math.random() * 100 + "%", 
                    opacity: 0.3,
                    scale: Math.random() * 0.5 + 0.5 
                  }}
                  animate={{ 
                    y: [null, Math.random() * 100 + "%"],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [null, Math.random() * 0.5 + 1]
                  }}
                  transition={{ 
                    duration: Math.random() * 10 + 10, 
                    repeat: Infinity,
                    repeatType: "reverse" 
                  }}
                />
              ))}
            </div>
          </motion.div>
          
          {sortedTestimonials.length > 1 && (
            <div className="flex justify-center space-x-2">
              {sortedTestimonials.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeIndex === index 
                      ? 'bg-primary scale-125 shadow-[0_0_10px_rgba(var(--primary),0.5)]' 
                      : 'bg-primary/30'
                  }`}
                  onClick={() => goToTestimonial(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-primary/5 blur-[100px] -z-10" />
      <div className="absolute bottom-1/3 left-0 w-96 h-96 rounded-full bg-accent/5 blur-[100px] -z-10" />
    </section>
  );
};

export default TestimonialsSection;
