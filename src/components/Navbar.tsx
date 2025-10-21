'use client';
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Achievements", href: "#achievements" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "#contact" }
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 md:px-6",
        isScrolled 
          ? "py-2 backdrop-blur-xl bg-background/40 border-b border-border/30 shadow-sm" 
          : "py-4 bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link href="#home" className="text-2xl font-display font-bold">
          Portfolio
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium hover-link transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-foreground/5"
            >
              {link.name}
            </Link>
          ))}
          <div className="p-1.5 rounded-full backdrop-blur-md bg-background/30 border border-border/20">
            <ThemeToggle />
          </div>
        </nav>
        
        {/* Mobile Navigation */}
        <div className="flex items-center space-x-4 md:hidden">
          <div className="p-1.5 rounded-full backdrop-blur-md bg-background/30 border border-border/20">
            <ThemeToggle />
          </div>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="p-2 rounded-full backdrop-blur-md bg-background/30 border border-border/20"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 z-50 backdrop-blur-xl bg-background/80 transition-transform duration-300 pt-20",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="container mx-auto flex flex-col space-y-6 p-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-xl font-medium py-3 px-4 rounded-lg border border-border/30 bg-background/40 backdrop-blur-md transition-colors duration-200 hover:bg-foreground/5"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
