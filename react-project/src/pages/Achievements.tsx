
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { ThemeProvider } from "@/context/ThemeContext";
import Footer from "@/components/Footer";
import ParticlesBackground from "@/components/ParticlesBackground";
import { ExternalLink, FileCheck, ArrowLeft, Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { ACHIEVEMENTS } from "@/constants";
import { UniversalSort, achievementSortOptions, SortOption } from "@/components/ui/universal-sort";

interface Achievement {
  id: number;
  title: string;
  organization: string;
  date: string;
  description: string;
  fullDescription?: string;
  icon: "award" | "certificate" | "medal" | "trophy";
  image?: string;
  certificateFile?: string;
  featured?: boolean;
}

const Achievements = () => {
  const navigate = useNavigate();
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<SortOption>(achievementSortOptions[0]);
  
  // Ensure page scrolls to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Filter and sort achievements
  const filteredAchievements = useMemo(() => {
    // First filter by search
    const filtered = searchQuery.trim() 
      ? ACHIEVEMENTS.filter(achievement => 
          achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          achievement.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
          achievement.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : ACHIEVEMENTS;
    
    // Then sort
    return [...filtered].sort((a, b) => {
      const aValue = a[sortOption.orderBy as keyof Achievement];
      const bValue = b[sortOption.orderBy as keyof Achievement];
      
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
      
      // Fallback to ID sorting
      return sortOption.direction === 'asc' ? a.id - b.id : b.id - a.id;
    });
  }, [ACHIEVEMENTS, searchQuery, sortOption]);
  
  const renderIcon = (type: string) => {
    switch (type) {
      case "award":
        return <FileCheck className="h-5 w-5" />;
      case "certificate":
        return <FileCheck className="h-5 w-5" />;
      case "medal":
        return <FileCheck className="h-5 w-5" />;
      case "trophy":
        return <FileCheck className="h-5 w-5" />;
      default:
        return <FileCheck className="h-5 w-5" />;
    }
  };
  
  return (
    <ThemeProvider>
      <ParticlesBackground />
      <main className="pt-20 relative">
        {/* Back to Home Button */}
        <div className="container mx-auto px-4 mb-6">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="group flex items-center gap-2 hover:bg-primary/10 transition-all"
          >
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Button>
        </div>

        <section className="py-12 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-16">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Achievements & Certifications
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                A comprehensive collection of awards, recognitions, and professional certifications I've earned throughout my journey.
              </motion.p>
              
              {/* Search and Sort Controls */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8"
              >
                <div className="relative md:max-w-md w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search achievements..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full bg-background/60 backdrop-blur-sm"
                  />
                </div>
                
                <UniversalSort 
                  options={achievementSortOptions}
                  onSortChange={setSortOption}
                  className="bg-background/60 backdrop-blur-sm"
                />
              </motion.div>
            </div>
            
            {/* Achievements Grid */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {filteredAchievements.length > 0 ? (
                filteredAchievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    className="glass glass-dark rounded-xl overflow-hidden cursor-pointer transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 * index }}
                    onClick={() => setSelectedAchievement(achievement as Achievement)}
                  >
                    <div className="flex flex-col sm:flex-row h-full">
                      {achievement.image && (
                        <div className="sm:w-1/3 h-40 sm:h-auto overflow-hidden">
                          <img 
                            src={achievement.image} 
                            alt={achievement.title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                        </div>
                      )}
                      <div className={`p-6 flex-1 ${!achievement.image ? "" : "sm:w-2/3"}`}>
                        <div className="flex items-start gap-4 mb-3">
                          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary shrink-0 group-hover:bg-primary/20 transition-colors">
                            {renderIcon(achievement.icon)}
                          </div>
                          <div>
                            <h3 className="text-lg font-medium mb-1 hover:text-primary transition-colors">{achievement.title}</h3>
                            <div className="flex items-center text-sm text-muted-foreground gap-2">
                              <span>{achievement.organization}</span>
                              <span className="h-1 w-1 rounded-full bg-muted-foreground"></span>
                              <span>{achievement.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4 group-hover:text-foreground/80 transition-colors">{achievement.description}</p>
                        
                        {/* Certificate View Button - Only show if certificate exists */}
                        {achievement.certificateFile && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-2 text-primary border-primary hover:bg-primary/10 transition-all"
                            asChild
                          >
                            <a href={achievement.certificateFile} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                              <FileCheck className="h-4 w-4" />
                              View Certificate
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  className="col-span-1 md:col-span-2 text-center p-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-lg text-muted-foreground">No achievements found matching your search.</p>
                </motion.div>
              )}
            </motion.div>
            
            <div className="flex justify-center mt-10">
              <Button 
                onClick={() => navigate('/certifications')}
                className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                View Additional Certifications
              </Button>
            </div>
          </div>
          
          {/* Background Elements */}
          <div className="absolute top-1/3 left-0 w-72 h-72 rounded-full bg-primary/5 blur-3xl -z-10" />
          <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl -z-10" />
        </section>
      </main>
      
      {/* Achievement Detail Modal */}
      <Dialog open={!!selectedAchievement} onOpenChange={(open) => !open && setSelectedAchievement(null)}>
        <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-y-auto">
          {selectedAchievement && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedAchievement.title}</DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                  {selectedAchievement.organization} - {selectedAchievement.date}
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-4">
                {selectedAchievement.image && (
                  <div className="rounded-lg overflow-hidden mb-6">
                    <img 
                      src={selectedAchievement.image} 
                      alt={selectedAchievement.title}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">
                    {selectedAchievement.fullDescription || selectedAchievement.description}
                  </p>
                </div>
                
                {selectedAchievement.certificateFile && (
                  <div className="flex justify-center mt-6">
                    <a 
                      href={selectedAchievement.certificateFile} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      <FileCheck size={18} className="mr-2" />
                      View Certificate
                    </a>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      <Footer />
    </ThemeProvider>
  );
};

export default Achievements;
