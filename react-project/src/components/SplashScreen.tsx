
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
  forceSplash: boolean;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete, forceSplash }) => {
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [logoEnlarged, setLogoEnlarged] = useState(false);
  
  useEffect(() => {
    // Skip splash screen if forceSplash is false
    if (!forceSplash) {
      onComplete();
      return;
    }
    
    // First show the progress bar
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress(prev => Math.min(prev + 1, 100));
      } else if (!showLogo) {
        // When progress is complete, show the logo
        setShowLogo(true);
      }
    }, 30);
    
    return () => clearTimeout(timer);
  }, [progress, showLogo, onComplete, forceSplash]);
  
  useEffect(() => {
    // If logo is showing, wait a bit then enlarge it
    if (showLogo && forceSplash) {
      const enlargeTimer = setTimeout(() => {
        setLogoEnlarged(true);
        
        // After logo animation, complete the splash screen
        const completeTimer = setTimeout(() => {
          onComplete();
        }, 1000);
        
        return () => clearTimeout(completeTimer);
      }, 1000);
      
      return () => clearTimeout(enlargeTimer);
    }
  }, [showLogo, onComplete, forceSplash]);

  // If not showing splash, return null
  if (!forceSplash) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-sunrise dark:bg-gradient-sunset overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {!logoEnlarged ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center"
          >
            {showLogo ? (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative mb-8"
              >
                <svg 
                  width="120" 
                  height="120" 
                  viewBox="0 0 120 120" 
                  className="mx-auto text-white filter drop-shadow-lg"
                >
                  <motion.path
                    d="M60 10L90 30V70L60 90L30 70V30L60 10Z"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                  <motion.text
                    x="60"
                    y="65"
                    fontSize="36"
                    fontWeight="bold"
                    fill="currentColor"
                    textAnchor="middle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    A
                  </motion.text>
                </svg>
              </motion.div>
            ) : (
              <>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tighter">
                  Amitava
                </h1>
                <p className="text-white/80 font-light text-lg md:text-xl mb-10">
                  Portfolio
                </p>
                
                <div className="relative w-64 h-1 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-white rounded-full origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: progress / 100 }}
                    transition={{ ease: "easeOut" }}
                  />
                </div>
                
                <p className="mt-4 text-white/70 text-sm">{progress}%</p>
              </>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 15, opacity: 0 }}
            transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="text-white"
          >
            <svg 
              width="120" 
              height="120" 
              viewBox="0 0 120 120" 
              className="mx-auto"
            >
              <path
                d="M60 10L90 30V70L60 90L30 70V30L60 10Z"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
              />
              <text
                x="60"
                y="65"
                fontSize="36"
                fontWeight="bold"
                fill="currentColor"
                textAnchor="middle"
              >
                A
              </text>
            </svg>
          </motion.div>
        )}
        
        <div className="absolute bottom-10 opacity-50">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-white/80 animate-pulse" />
            <div className="w-3 h-3 rounded-full bg-white/80 animate-pulse delay-75" />
            <div className="w-3 h-3 rounded-full bg-white/80 animate-pulse delay-150" />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashScreen;
