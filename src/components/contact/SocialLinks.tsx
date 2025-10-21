'use client';
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export type SocialLink = {
  id: number;
  icon: React.ReactNode;
  url: string;
  label: string;
};

const socialLinks: SocialLink[] = [
  { id: 1, icon: <Github className="h-5 w-5" />, url: "#", label: "GitHub" },
  { id: 2, icon: <Linkedin className="h-5 w-5" />, url: "#", label: "LinkedIn" },
  { id: 3, icon: <Twitter className="h-5 w-5" />, url: "#", label: "Twitter" },
  { id: 4, icon: <Mail className="h-5 w-5" />, url: "mailto:dattaamitava2004@gmail.com", label: "Email" }
];

const SocialLinks: React.FC = () => {
  return (
    <div className="mb-8">
      <h4 className="text-lg font-medium mb-3">Follow Me</h4>
      <div className="flex flex-wrap gap-3">
        {socialLinks.map((link) => (
          <motion.a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-secondary/50 hover:bg-primary/10 hover:text-primary transition-colors"
            aria-label={link.label}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {link.icon}
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;
export { socialLinks };
