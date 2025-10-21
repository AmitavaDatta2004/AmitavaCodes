
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { MessageSquare, Send } from "lucide-react";
import emailjs from '@emailjs/browser';
import { useToast } from "@/hooks/use-toast";

const ContactForm = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formRef.current) return;
    
    setIsSubmitting(true);
    
    // Using the provided Email.js credentials
    const serviceId = 'service_zb8uog7';
    const templateId = 'template_sxukkcs';
    const publicKey = 'hZSZPj5TLk7tTVnzj';
    
    // Format message to include the sender's email for easy reply
    const formattedMessage = `
From: ${formState.name} (${formState.email})

Message:
${formState.message}
    `;
    
    // Ensure the form data matches the EmailJS template variables
    const templateParams = {
      title: `Contact Us: New Message from ${formState.name}`,
      name: formState.name,
      email: formState.email,
      message: formattedMessage // Now contains the email for easy reply
    };
    
    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormState({ name: "", email: "", message: "" });
        
        toast({
          title: "Message sent!",
          description: "Thank you for reaching out. I'll get back to you soon.",
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
        setIsSubmitting(false);
        
        toast({
          variant: "destructive",
          title: "Message failed to send",
          description: "Please try again or contact me directly via email.",
        });
      });
  };

  return (
    <div className="glass glass-dark rounded-xl p-6 md:p-8">
      <h3 className="text-2xl font-medium mb-6 flex items-center">
        <MessageSquare className="h-5 w-5 mr-2 text-primary" />
        Send a Message
      </h3>
      
      {isSubmitted ? (
        <div className="text-center py-8">
          <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="h-8 w-8 text-primary" />
          </div>
          <h4 className="text-xl font-medium mb-2">Message Sent!</h4>
          <p className="text-muted-foreground">
            Thank you for reaching out. I'll get back to you as soon as possible.
          </p>
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
              placeholder="John Doe"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
              placeholder="john@example.com"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all resize-none"
              placeholder="Hello, I'd like to talk about..."
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 bg-primary text-white rounded-lg font-medium flex items-center justify-center btn-glow transition-all hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <span className="mr-2">Sending</span>
                <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin" />
              </>
            ) : (
              <>
                Send Message
                <Send className="h-4 w-4 ml-2" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
