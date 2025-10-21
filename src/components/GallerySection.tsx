'use client';
import { motion } from "framer-motion";
import { ArrowRight, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { GALLERY_DATA } from "@/constants";
import { useIsMobile } from "@/hooks/use-mobile";

const GallerySection = () => {
  const isMobile = useIsMobile();
  
  const getFeaturedImages = () => {
    const featured = [
      ...GALLERY_DATA.achievements.filter(item => item.featured),
      ...GALLERY_DATA.seminars.filter(item => item.featured),
      ...GALLERY_DATA.teamActivities.filter(item => item.featured),
      ...GALLERY_DATA.certificates.filter(item => item.featured),
    ];
    
    return featured.slice(0, 4);
  };

  const featuredImages = getFeaturedImages();

  return (
    <section id="gallery" className="py-12 md:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Gallery
          </motion.h2>
          <motion.p 
            className="section-subtitle mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Take a glimpse into my journey through moments and milestones
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-6 md:mb-10">
          {featuredImages.map((image, index) => (
            <motion.div
              key={image.id}
              className="relative rounded-xl overflow-hidden aspect-square group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 * index }}
            >
              <Image 
                src={image.src} 
                alt={image.alt}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 md:p-4">
                <h3 className="text-white text-sm md:text-base font-medium">{image.title}</h3>
                <p className="text-white/80 text-xs md:text-sm mt-1">{image.alt}</p>
              </div>
              
              {index === 3 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                  <ImageIcon size={isMobile ? 24 : 32} className="text-white" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link 
            href="/gallery"
            className="inline-flex items-center px-5 py-2.5 md:px-6 md:py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            View Full Gallery
            <ArrowRight size={isMobile ? 14 : 16} className="ml-2" />
          </Link>
        </motion.div>
      </div>
      
      <div className="absolute top-1/3 right-0 w-48 md:w-72 h-48 md:h-72 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-3xl -z-10" />
      <div className="absolute bottom-1/4 left-0 w-56 md:w-80 h-56 md:h-80 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-3xl -z-10" />
    </section>
  );
};

export default GallerySection;
