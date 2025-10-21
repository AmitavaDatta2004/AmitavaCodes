
import { motion } from "framer-motion";
import ContactForm from "./contact/ContactForm";
import ContactInfo from "./contact/ContactInfo";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Get In Touch
          </motion.h2>
          <motion.p 
            className="section-subtitle mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Have a project in mind or just want to say hello? I'd love to hear from you!
          </motion.p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Form */}
          <motion.div 
            className="lg:w-3/5"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ContactForm />
          </motion.div>
          
          {/* Contact Info */}
          <motion.div 
            className="lg:w-2/5"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <ContactInfo />
          </motion.div>
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-1/4 right-0 w-72 h-72 rounded-full bg-primary/5 blur-3xl -z-10" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl -z-10" />
    </section>
  );
};

export default ContactSection;
