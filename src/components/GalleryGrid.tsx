'use client';
import { useState } from "react";
import { motion } from "framer-motion";
import { Download, X, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { GalleryItem } from "@/types/gallery";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";

interface GalleryGridProps {
  items: GalleryItem[];
}

const GalleryGrid = ({ items }: GalleryGridProps) => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const isMobile = useIsMobile();

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  const openLightbox = (item: GalleryItem) => {
    setSelectedImage(item);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = "hidden";
    }
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = "auto";
    }
  };

  const handleDownload = (e: React.MouseEvent, src: string) => {
    e.stopPropagation();
    const link = document.createElement("a");
    link.href = src;
    link.download = src.split("/").pop() || "download";
    link.click();
  };

  const navigateImage = (direction: "next" | "prev") => {
    if (!selectedImage) return;

    const currentIndex = items.findIndex((item) => item.id === selectedImage.id);
    const newIndex = 
      direction === "next"
        ? (currentIndex + 1) % items.length
        : (currentIndex - 1 + items.length) % items.length;
    
    setSelectedImage(items[newIndex]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowRight") {
      navigateImage("next");
    } else if (e.key === "ArrowLeft") {
      navigateImage("prev");
    }
  };

  const getDescription = (item: GalleryItem) => {
    if (item.alt && item.alt !== item.title) {
      return item.alt;
    }
    
    switch (item.category) {
      case 'achievements':
        return `An achievement captured during my professional journey. This represents a significant milestone in my career.`;
      case 'seminars':
        return `A memorable moment from a seminar where knowledge was shared and connections were made.`;
      case 'teamActivities':
        return `Working together with an amazing team to accomplish our goals and build strong connections.`;
      case 'certificates':
        return `A certification that demonstrates my commitment to continuous learning and professional development.`;
      default:
        return `A significant moment captured in my professional journey.`;
    }
  };

  return (
    <>
      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-8"
        >
          <p className="text-muted-foreground text-lg">No images found.</p>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6"
          variants={gridVariants}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          {items.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className="rounded-xl overflow-hidden glass-card card-hover cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 group"
              onClick={() => openLightbox(item)}
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-white font-medium text-base md:text-lg">{item.title}</h3>
                  <p className="text-white/80 text-xs md:text-sm mt-1 line-clamp-2">{getDescription(item)}</p>
                  <div className="mt-2 flex items-center text-white/70 text-xs">
                    <Info size={12} className="mr-1" />
                    <span>Click to view details</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black/80 backdrop-blur-md"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative overflow-hidden rounded-xl bg-background/10 backdrop-blur-xl border border-white/10 shadow-xl">
              <div className="relative aspect-video max-h-[70vh]">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              
              <div className="p-3 md:p-5 bg-background/30 backdrop-blur-md">
                <h3 className="text-base md:text-xl font-medium mb-2">{selectedImage.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground mb-4">
                  {getDescription(selectedImage)}
                </p>
                <div className="flex justify-end">
                  <Button
                    size={isMobile ? "sm" : "default"}
                    variant="outline"
                    className="flex items-center gap-1.5 glass-button"
                    onClick={(e) => handleDownload(e, selectedImage.src)}
                  >
                    <Download size={isMobile ? 14 : 16} />
                    <span className={isMobile ? "text-sm" : ""}>Download</span>
                  </Button>
                </div>
              </div>
              
              <button 
                className="absolute top-1/2 left-2 md:left-4 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-background/30 backdrop-blur-md flex items-center justify-center hover:bg-accent/70 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage("prev");
                }}
                aria-label="Previous image"
              >
                <ChevronLeft size={isMobile ? 18 : 22} />
              </button>
              <button 
                className="absolute top-1/2 right-2 md:right-4 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-background/30 backdrop-blur-md flex items-center justify-center hover:bg-accent/70 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage("next");
                }}
                aria-label="Next image"
              >
                <ChevronRight size={isMobile ? 18 : 22} />
              </button>
              
              <button 
                className="absolute top-2 md:top-4 right-2 md:right-4 w-7 h-7 md:w-8 md:h-8 rounded-full bg-background/30 backdrop-blur-md flex items-center justify-center hover:bg-accent/70 transition-colors"
                onClick={closeLightbox}
                aria-label="Close lightbox"
              >
                <X size={isMobile ? 16 : 18} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default GalleryGrid;
