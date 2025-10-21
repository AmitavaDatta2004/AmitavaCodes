'use client';

import { useState, useEffect, useMemo, Suspense } from "react";
import { motion } from "framer-motion";
import { ThemeProvider } from "@/context/ThemeContext";
import Footer from "@/components/Footer";
import ParticlesBackground from "@/components/ParticlesBackground";
import { ExternalLink, FileCheck, ArrowLeft, Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { ADDITIONAL_CERTIFICATIONS } from "@/constants";
import { UniversalSort, certificationSortOptions, SortOption } from "@/components/ui/universal-sort";

interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
  description: string;
  certificateFile: string | null;
}

function CertificationsPageContent() {
  const router = useRouter();
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<SortOption>(certificationSortOptions[0]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const filteredCertifications = useMemo(() => {
    const filtered = searchQuery.trim()
      ? ADDITIONAL_CERTIFICATIONS.filter(cert => 
          cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (cert.issuer && cert.issuer.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (cert.description && cert.description.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      : ADDITIONAL_CERTIFICATIONS;
    
    return [...filtered].sort((a, b) => {
      const propMap: Record<string, keyof Certification> = {
        'title': 'name',
        'date': 'date',
        'issuer': 'issuer'
      };
      
      const propName = propMap[sortOption.orderBy] || 'name';
      
      const aValue = a[propName];
      const bValue = b[propName];
      
      if (aValue === undefined && bValue === undefined) return 0;
      if (aValue === undefined) return 1;
      if (bValue === undefined) return -1;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOption.direction === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      return sortOption.direction === 'asc' ? a.id - b.id : b.id - a.id;
    });
  }, [searchQuery, sortOption]);
  
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
            <div className="text-center mb-10 md:mb-16">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Additional Certifications
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                A collection of professional certifications and courses I've completed to enhance my skills and knowledge.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8"
              >
                <div className="relative md:max-w-md w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search certifications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full bg-background/60 backdrop-blur-sm"
                  />
                </div>
                
                <UniversalSort 
                  options={certificationSortOptions}
                  onSortChange={setSortOption}
                  className="bg-background/60 backdrop-blur-sm"
                />
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              {filteredCertifications.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {filteredCertifications.map((cert, index) => (
                    <motion.div 
                      key={cert.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      onClick={() => cert.description && setSelectedCertification(cert as Certification)}
                      className={cert.description ? "cursor-pointer" : ""}
                    >
                      <Card className="border border-border/40 bg-card/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary shrink-0 group-hover:bg-primary/20 transition-colors">
                              <FileCheck className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="text-lg font-medium mb-2 hover:text-primary transition-colors">{cert.name}</h3>
                              
                              {cert.issuer && cert.date && (
                                <p className="text-sm text-muted-foreground mb-3">
                                  {cert.issuer} • {cert.date}
                                </p>
                              )}
                              
                              {cert.certificateFile && (
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="mt-2 text-primary border-primary hover:bg-primary/10 transition-all"
                                  asChild
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <a href={cert.certificateFile} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                    View Certificate
                                    <ExternalLink className="h-3 w-3 ml-1" />
                                  </a>
                                </Button>
                              )}
                              
                              {!cert.certificateFile && (
                                <p className="text-sm text-muted-foreground">
                                  Certificate not available
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div 
                  className="text-center p-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-lg text-muted-foreground">No certifications found matching your search.</p>
                </motion.div>
              )}
              
              <div className="flex justify-center mt-10 space-x-4">
                <Button 
                  onClick={() => router.push('/achievements')}
                  variant="outline"
                  className="hover:bg-secondary/70 transition-colors"
                >
                  View Achievements
                </Button>
                <Button 
                  onClick={() => router.push('/')}
                  className="hover:bg-primary/90 transition-colors"
                >
                  Back to Home
                </Button>
              </div>
            </motion.div>
          </div>
          
          <div className="absolute top-1/3 right-0 w-72 h-72 rounded-full bg-primary/5 blur-3xl -z-10 animate-pulse" />
          <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl -z-10 animate-pulse" />
        </section>
      </main>
  );
}


export default function CertificationsPage() {
    return (
        <ThemeProvider>
            <ParticlesBackground />
            <Suspense fallback={<div>Loading...</div>}>
                <CertificationsPageContent />
            </Suspense>
            <Footer />
        </ThemeProvider>
    );
}
