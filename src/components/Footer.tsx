'use client';
import { Heart } from "lucide-react";
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 border-t border-border relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="#home" className="text-xl font-display font-semibold">
              Portfolio
            </Link>
            <p className="text-sm text-muted-foreground mt-1">
              &copy; {currentYear} Amitava Datta. All rights reserved.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <p className="text-sm text-muted-foreground flex items-center">
              Made with <Heart className="h-3 w-3 text-primary mx-1" /> and modern web technologies
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Designed and developed by Amitava Datta
            </p>
          </div>
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-0 right-1/4 w-64 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </footer>
  );
};

export default Footer;
