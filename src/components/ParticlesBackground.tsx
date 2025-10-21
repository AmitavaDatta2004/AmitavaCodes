'use client';
import { useTheme } from "@/context/ThemeContext";
import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let animationFrameId: number;
    let particles: Particle[] = [];
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    const initParticles = () => {
      particles = [];
      const numParticles = Math.min(Math.floor(window.innerWidth / 15), 100);
      
      for (let i = 0; i < numParticles; i++) {
        const colors = theme === "light" 
          ? ['rgba(255, 77, 77, 0.3)', 'rgba(255, 126, 69, 0.3)', 'rgba(255, 181, 71, 0.3)']
          : ['rgba(139, 92, 246, 0.3)', 'rgba(217, 70, 239, 0.3)', 'rgba(157, 23, 77, 0.3)'];
          
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };
    
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
        }
      });
      
      // Connect particles with lines if they're close enough
      connectParticles();
      
      animationFrameId = requestAnimationFrame(drawParticles);
    };
    
    const connectParticles = () => {
      const maxDistance = 150;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            
            const gradient = ctx.createLinearGradient(
              particles[i].x, 
              particles[i].y, 
              particles[j].x, 
              particles[j].y
            );
            
            const startColor = particles[i].color.replace(/[^,]+$/, `${opacity})`);
            const endColor = particles[j].color.replace(/[^,]+$/, `${opacity})`);
            
            gradient.addColorStop(0, startColor);
            gradient.addColorStop(1, endColor);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };
    
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    initParticles();
    drawParticles();
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="particles-container fixed inset-0 -z-10 opacity-70"
    />
  );
};

export default ParticlesBackground;
