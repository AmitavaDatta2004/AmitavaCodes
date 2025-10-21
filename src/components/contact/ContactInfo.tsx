'use client';
import { motion } from "framer-motion";
import SocialLinks from "./SocialLinks";
import { Mail } from "lucide-react";

const ContactInfo: React.FC = () => {
  return (
    <div className="glass glass-dark rounded-xl p-6 md:p-8 h-full flex flex-col">
      <h3 className="text-2xl font-medium mb-6">Connect With Me</h3>
      
      <p className="text-muted-foreground mb-6">
        Feel free to reach out through the contact form or connect with me directly 
        through social media. I'm always open to discussing new projects, opportunities, 
        or partnerships.
      </p>
      
      <div className="mb-6">
        <h4 className="text-lg font-medium mb-3">Email Me Directly</h4>
        <a 
          href="mailto:dattaamitava2004@gmail.com" 
          className="flex items-center gap-2 text-primary hover:underline"
        >
          <Mail className="h-4 w-4" /> 
          dattaamitava2004@gmail.com
        </a>
      </div>
      
      <SocialLinks />
      
      <div className="mt-auto">
        <h4 className="text-lg font-medium mb-3">Availability</h4>
        <p className="text-muted-foreground">
          I'm currently <span className="text-primary font-medium">available</span> for freelance work 
          or full-time positions. Let's create something amazing together!
        </p>
      </div>
    </div>
  );
};

export default ContactInfo;
