// Navigation
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Achievements", href: "/#achievements" },
  { label: "Contact", href: "/#contact" }
];

// Projects
export const PROJECT_CATEGORIES = ["All", "Web", "Mobile", "UI/UX", "Other"];

export const PROJECTS = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "A modern portfolio website built with React and Tailwind CSS, featuring smooth animations and a responsive design.",
    fullDescription: "This modern portfolio website serves as a showcase for my work and skills. Built with React and Tailwind CSS, it features smooth animations, responsive design, and dark/light mode toggle. The site includes sections for projects, skills, experience, and contact information, all with optimized performance and accessibility.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Web",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "TypeScript"],
    features: [
      "Responsive design that works on all devices",
      "Dark/light mode toggle with theme persistence",
      "Smooth page transitions and animations",
      "Interactive UI elements with hover effects",
      "Optimized performance and accessibility"
    ],
    featured: true,
    liveUrl: "#",
    githubUrl: "#",
    date: "June 2024",
    complexity: 4
  },
  {
    id: 2,
    title: "E-commerce Dashboard",
    description: "An admin dashboard for e-commerce with analytics, inventory management, and order processing features.",
    fullDescription: "This comprehensive e-commerce dashboard provides business owners with powerful tools to manage their online stores. It includes real-time analytics, inventory management, order processing, customer relationship management, and marketing campaign tools. The dashboard is built with a modern tech stack and features a clean, intuitive interface designed for efficiency.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Web",
    technologies: ["React", "Node.js", "MongoDB", "Chart.js", "Redux"],
    features: [
      "Real-time sales and visitor analytics",
      "Inventory management with low stock alerts",
      "Order processing and fulfillment tracking",
      "Customer relationship management",
      "Marketing campaign tools and performance metrics"
    ],
    featured: true,
    liveUrl: "#",
    githubUrl: "#",
    date: "April 2024",
    complexity: 5
  },
  {
    id: 3,
    title: "Weather App",
    description: "A weather application that provides current weather data and forecasts for locations worldwide.",
    fullDescription: "This weather application offers users accurate weather data and forecasts for locations around the world. It features a clean, intuitive interface with animated weather icons, location-based services, and detailed weather information. Users can save favorite locations, view hourly and 7-day forecasts, and receive weather alerts.",
    image: "https://images.unsplash.com/photo-1601134467661-3d775b999c8b?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Mobile",
    technologies: ["React Native", "Weather API", "Geolocation", "Async Storage"],
    features: [
      "Current weather conditions and forecasts",
      "Location-based services with GPS integration",
      "Animated weather icons and backgrounds",
      "Hourly and 7-day forecasts",
      "Saved locations and weather alerts"
    ],
    featured: true,
    liveUrl: "#",
    githubUrl: "#",
    date: "March 2024",
    complexity: 3
  },
  {
    id: 4,
    title: "Task Management App",
    description: "A productivity application for managing tasks, projects, and deadlines with collaborative features.",
    fullDescription: "This task management application helps individuals and teams organize their work efficiently. It includes features for creating and assigning tasks, setting priorities and deadlines, tracking progress, and collaborating with team members. The app features a drag-and-drop interface, customizable workspaces, and integration with popular calendar services.",
    image: "https://images.unsplash.com/photo-1540349086321-4c341c63ba22?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Web",
    technologies: ["Next.js", "Firebase", "Tailwind CSS", "React DnD"],
    features: [
      "Task creation with priorities and deadlines",
      "Project organization and team assignment",
      "Progress tracking and reporting",
      "Drag-and-drop interface for task management",
      "Calendar integration and notification system"
    ],
    featured: false,
    liveUrl: "#",
    githubUrl: "#",
    date: "February 2024",
    complexity: 4
  },
  {
    id: 5,
    title: "Healthcare Portal UI",
    description: "UI/UX design for a healthcare portal, focusing on accessibility and user-friendly interactions.",
    fullDescription: "This healthcare portal UI design focuses on creating an accessible, user-friendly experience for patients and healthcare providers. The design emphasizes clarity, ease of navigation, and information hierarchy, with special attention to accessibility standards. The project includes wireframes, high-fidelity mockups, and interactive prototypes for a complete healthcare management system.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "UI/UX",
    technologies: ["Figma", "Adobe XD", "Prototyping", "Accessibility Standards"],
    features: [
      "Patient dashboard with appointment management",
      "Medical records access and history viewing",
      "Provider communication tools",
      "Medication tracking and reminder system",
      "Accessible design compliant with WCAG guidelines"
    ],
    featured: false,
    liveUrl: "#",
    githubUrl: "#",
    date: "January 2024",
    complexity: 3
  },
  {
    id: 6,
    title: "Smart Home IoT System",
    description: "An IoT system for smart home monitoring and control, with a web interface and mobile app.",
    fullDescription: "This smart home IoT system enables users to monitor and control their home devices remotely. The system includes a web interface and mobile app that connect to various smart devices through a central hub. Users can manage lighting, temperature, security systems, and other connected devices, view energy usage data, and set automated routines based on time or conditions.",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Other",
    technologies: ["Arduino", "MQTT", "React", "Node.js", "IoT Protocols"],
    features: [
      "Remote device control and monitoring",
      "Automated routines and scheduling",
      "Energy usage tracking and optimization",
      "Security camera integration",
      "Voice command compatibility"
    ],
    featured: false,
    liveUrl: "#",
    githubUrl: "#",
    date: "December 2023",
    complexity: 5
  },
  {
    id: 7,
    title: "Financial Dashboard",
    description: "A comprehensive financial management dashboard for tracking expenses, investments, and budgeting.",
    fullDescription: "This financial dashboard provides users with a complete overview of their financial health. It includes tools for expense tracking, budget management, investment monitoring, and financial goal setting. The dashboard features interactive charts and graphs, transaction categorization, and predictive analysis to help users make informed financial decisions.",
    image: "https://images.unsplash.com/photo-1565514020179-026b92b2220a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Web",
    technologies: ["React", "D3.js", "Node.js", "PostgreSQL", "Auth0"],
    features: [
      "Expense tracking and categorization",
      "Budget creation and management",
      "Investment portfolio monitoring",
      "Financial goal setting and tracking",
      "Predictive analysis and recommendations"
    ],
    featured: false,
    liveUrl: "#",
    githubUrl: "#",
    date: "November 2023",
    complexity: 4
  },
  {
    id: 8,
    title: "Recipe Sharing Platform",
    description: "A social platform for food enthusiasts to discover, share, and save recipes from around the world.",
    fullDescription: "This recipe sharing platform connects food enthusiasts worldwide, allowing them to discover, share, and save recipes. Users can create profiles, upload their own recipes with photos and instructions, browse recipes by category or ingredients, save favorites, and follow other users. The platform includes features for meal planning, grocery list creation, and dietary preference filtering.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Web",
    technologies: ["React", "Firebase", "Algolia Search", "Cloud Functions"],
    features: [
      "Recipe creation and sharing with photo upload",
      "Search by ingredient, cuisine, or dietary needs",
      "User profiles and following system",
      "Meal planning and grocery list tools",
      "Rating and review system"
    ],
    featured: false,
    liveUrl: "#",
    githubUrl: "#",
    date: "October 2023",
    complexity: 3
  }
];

// Achievements & Certifications
export const ACHIEVEMENTS = [
  {
    id: 1,
    title: "1st Place - Hackathon 2023",
    organization: "TechFest",
    date: "October 2023",
    description: "Won first place in the annual hackathon for developing an innovative solution for healthcare monitoring.",
    icon: "trophy" as "trophy" | "award" | "certificate" | "medal",
    image: "https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    certificateFile: "certificates/hackathon-2023.pdf",
    featured: true
  },
  {
    id: 2,
    title: "Web Development Certification",
    organization: "Frontend Masters",
    date: "July 2023",
    description: "Completed advanced web development certification covering modern frontend frameworks and best practices.",
    icon: "certificate" as "trophy" | "award" | "certificate" | "medal",
    image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
    certificateFile: "certificates/frontend-masters.pdf",
    featured: true
  },
  {
    id: 3,
    title: "Outstanding Student Award",
    organization: "University Computer Science Dept",
    date: "May 2024",
    description: "Recognized for academic excellence and contributions to the computer science department.",
    icon: "award" as "trophy" | "award" | "certificate" | "medal",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3",
    featured: false
  },
  {
    id: 4,
    title: "Data Science Excellence",
    organization: "DataCamp",
    date: "January 2024",
    description: "Received recognition for completing the advanced data science track with perfect scores on all assessments.",
    icon: "medal" as "trophy" | "award" | "certificate" | "medal",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    certificateFile: "certificates/datacamp.pdf",
    featured: false
  }
];

// Additional Certifications with certificate files
export const ADDITIONAL_CERTIFICATIONS = [
  { 
    id: 1,
    name: "Advanced JavaScript Programming", 
    issuer: "Coding Academy",
    date: "January 2024",
    description: "Comprehensive course covering advanced JavaScript concepts, design patterns, and modern ES6+ features.",
    certificateFile: "certificates/advanced-javascript.pdf" 
  }, 
  { 
    id: 2,
    name: "UI/UX Design Fundamentals", 
    issuer: "Design Institute",
    date: "March 2024",
    description: "Foundation course in user interface and experience design principles, wireframing, and prototyping.",
    certificateFile: null 
  }, 
  { 
    id: 3,
    name: "React Native Mobile Development", 
    issuer: "Mobile Dev Academy",
    date: "April 2024",
    description: "Hands-on course covering React Native for cross-platform mobile app development.",
    certificateFile: "certificates/react-native.pdf" 
  },
  { 
    id: 4,
    name: "Cloud Computing Essentials", 
    issuer: "Cloud Institute",
    date: "February 2024",
    description: "Introduction to cloud infrastructure, services, deployment models, and best practices.",
    certificateFile: "certificates/cloud-computing.pdf" 
  },
  { 
    id: 5,
    name: "Database Management & SQL", 
    issuer: "Data Academy",
    date: "May 2024",
    description: "Comprehensive course on relational database design, SQL queries, and database administration.",
    certificateFile: null 
  },
  { 
    id: 6,
    name: "Agile Project Management", 
    issuer: "Project Management Institute",
    date: "June 2024",
    description: "Course covering Agile methodologies, Scrum, Kanban, and modern project management practices.",
    certificateFile: "certificates/agile-management.pdf" 
  }
];

// Experience Timeline Items
export interface TimelineItem {
  id: number;
  date: string;
  title: string;
  organization: string;
  description: string;
  icon: "work" | "education" | "achievement";
  color?: string;
  skills?: string[];
}

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    id: 1,
    date: "2023 - Present",
    title: "B.Tech in Computer Science",
    organization: "Techno Main Salt Lake",
    description: "Studying core computer science subjects, data structures, algorithms, and software engineering principles.",
    icon: "education",
    color: "bg-gradient-to-r from-blue-500 to-indigo-600",
    skills: ["Data Structures", "Algorithms", "Object-Oriented Programming", "Database Systems"]
  },
  {
    id: 2,
    date: "2024",
    title: "HELIOS 1.0 (LFR Bot)",
    organization: "DEV NEXUS",
    description: "Built a line-following robot using Arduino, IR sensors, and motor drivers, with precise PID control algorithms.",
    icon: "achievement",
    color: "bg-gradient-to-r from-amber-500 to-orange-600",
    skills: ["Arduino", "Robotics", "PID Control", "Sensor Integration"]
  },
  {
    id: 3,
    date: "2025",
    title: "Quiz Master - V1",
    organization: "Personal Project",
    description: "Developed a multi-user quiz application with real-time scoring and leaderboards using React and Firebase.",
    icon: "work",
    color: "bg-gradient-to-r from-green-500 to-emerald-600",
    skills: ["React", "Firebase", "Real-time Database", "Authentication"]
  },
  {
    id: 4,
    date: "2025",
    title: "Software Development Intern",
    organization: "Tech Innovations Inc.",
    description: "Working on front-end development using React, TypeScript, and Tailwind CSS. Implementing responsive UI components and integrating with APIs.",
    icon: "work",
    color: "bg-gradient-to-r from-purple-500 to-violet-600",
    skills: ["React", "TypeScript", "Tailwind CSS", "API Integration"]
  },
  {
    id: 5,
    date: "2026",
    title: "Open Source Contributor",
    organization: "Various Projects",
    description: "Contributing to multiple open-source projects, fixing bugs, adding features, and improving documentation.",
    icon: "work",
    color: "bg-gradient-to-r from-red-500 to-rose-600",
    skills: ["Git", "Collaboration", "Code Review", "Documentation"]
  }
];

// Gallery Data
import { Gallery } from "@/types/gallery";

export const GALLERY_DATA: Gallery = {
  achievements: [
    { 
      id: 1, 
      src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1", 
      alt: "Achievement Award Ceremony", 
      category: "achievements", 
      title: "Outstanding Performance Award",
      featured: true,
      date: "2024-03-15"
    },
    { 
      id: 2, 
      src: "https://images.unsplash.com/photo-1569025690938-a00729c9e1f9", 
      alt: "Team Award", 
      category: "achievements", 
      title: "Best Team Player",
      featured: false,
      date: "2024-02-20"
    },
    { 
      id: 3, 
      src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d", 
      alt: "Innovation Award", 
      category: "achievements", 
      title: "Innovation Excellence",
      featured: true,
      date: "2024-01-10"
    },
  ],
  seminars: [
    { 
      id: 4, 
      src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b", 
      alt: "Web Development Summit", 
      category: "seminars", 
      title: "Web Development Summit",
      featured: true,
      date: "2024-04-05"
    },
    { 
      id: 5, 
      src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158", 
      alt: "UX Design Conference", 
      category: "seminars", 
      title: "UX Design Conference",
      featured: false,
      date: "2024-03-22"
    },
    { 
      id: 6, 
      src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5", 
      alt: "React Workshop", 
      category: "seminars", 
      title: "React Advanced Workshop",
      featured: false,
      date: "2024-02-15"
    },
  ],
  teamActivities: [
    { 
      id: 7, 
      src: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b", 
      alt: "Team Building Retreat", 
      category: "teamActivities", 
      title: "Team Building Retreat",
      featured: true,
      date: "2024-04-10"
    },
    { 
      id: 8, 
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e", 
      alt: "Product Launch Celebration", 
      category: "teamActivities", 
      title: "Product Launch Celebration",
      featured: false,
      date: "2024-03-30"
    },
    { 
      id: 9, 
      src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb", 
      alt: "Hackathon Event", 
      category: "teamActivities", 
      title: "Hackathon Event",
      featured: true,
      date: "2024-02-28"
    },
  ],
  certificates: [
    { 
      id: 10, 
      src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6", 
      alt: "React Development Certificate", 
      category: "certificates", 
      title: "Advanced React Development",
      featured: true,
      date: "2024-04-18"
    },
    { 
      id: 11, 
      src: "https://images.unsplash.com/photo-1466442929976-97f336a657be", 
      alt: "UI/UX Design Certificate", 
      category: "certificates", 
      title: "UI/UX Design Mastery",
      featured: false,
      date: "2024-03-25"
    },
    { 
      id: 12, 
      src: "https://images.unsplash.com/photo-1565514020179-026b92b2220a", 
      alt: "Full-Stack Certificate", 
      category: "certificates", 
      title: "Full-Stack Engineering",
      featured: true,
      date: "2024-02-05"
    },
  ],
};

// Skills
export interface Skill {
  id: number;
  name: string;
  icon: string;
  level: number; // 1-5 or percentage
  category: "frontend" | "backend" | "tools" | "design" | "other";
  color?: string;
  featured?: boolean;
}

export const SKILLS: Skill[] = [
  {
    id: 1,
    name: "React",
    icon: "react",
    level: 90,
    category: "frontend",
    color: "#61DAFB",
    featured: true
  },
  {
    id: 2,
    name: "TypeScript",
    icon: "typescript",
    level: 85,
    category: "frontend",
    color: "#3178C6",
    featured: true
  },
  {
    id: 3,
    name: "Node.js",
    icon: "nodejs",
    level: 80,
    category: "backend",
    color: "#339933",
    featured: true
  },
  {
    id: 4,
    name: "MongoDB",
    icon: "mongodb",
    level: 75,
    category: "backend",
    color: "#47A248",
    featured: true
  },
  {
    id: 5,
    name: "Tailwind CSS",
    icon: "tailwind",
    level: 90,
    category: "frontend",
    color: "#06B6D4",
    featured: true
  },
  {
    id: 6,
    name: "Figma",
    icon: "figma",
    level: 80,
    category: "design",
    color: "#F24E1E",
    featured: true
  },
  {
    id: 7,
    name: "Git",
    icon: "git",
    level: 85,
    category: "tools",
    color: "#F05032",
    featured: false
  },
  {
    id: 8,
    name: "Docker",
    icon: "docker",
    level: 70,
    category: "tools",
    color: "#2496ED",
    featured: false
  },
  {
    id: 9,
    name: "GraphQL",
    icon: "graphql",
    level: 75,
    category: "backend",
    color: "#E10098",
    featured: false
  },
  {
    id: 10,
    name: "Next.js",
    icon: "nextjs",
    level: 80,
    category: "frontend",
    color: "#000000",
    featured: true
  }
];

// Testimonials
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
  rating: number; // 1-5
  featured?: boolean;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechSolutions Inc.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    quote: "Working with this developer was a fantastic experience! Their attention to detail and ability to translate our requirements into a beautiful, functional application exceeded our expectations.",
    rating: 5,
    featured: true
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO",
    company: "InnovateTech",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    quote: "An exceptional developer who not only delivered the project on time but also suggested valuable improvements that we hadn't considered. Their technical expertise is impressive.",
    rating: 5,
    featured: true
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Director",
    company: "GrowthBrand",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    quote: "The website redesign completely transformed our online presence. We've seen a significant increase in user engagement and conversion rates since launch.",
    rating: 4,
    featured: true
  },
  {
    id: 4,
    name: "David Kim",
    role: "Startup Founder",
    company: "NextWave",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    quote: "As a startup founder with a limited budget, I was concerned about quality. However, this developer delivered a premium product that looks and works better than those of much larger companies.",
    rating: 5,
    featured: false
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "UX Designer",
    company: "DesignHub",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    quote: "It's rare to find a developer who cares as much about the user experience as the code quality. Their collaborative approach made our design-to-development process seamless.",
    rating: 5,
    featured: false
  }
];
