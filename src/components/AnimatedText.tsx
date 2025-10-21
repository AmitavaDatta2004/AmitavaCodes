'use client';
import { useEffect, useRef, useState } from "react";

interface AnimatedTextProps {
  texts: string[];
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ texts, className = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = useRef(100);
  const deletingSpeed = useRef(50);
  const pauseTime = useRef(2000);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing text
        setDisplayText(texts[currentIndex].substring(0, displayText.length + 1));
        
        // If completed typing current text
        if (displayText.length === texts[currentIndex].length) {
          setTimeout(() => setIsDeleting(true), pauseTime.current);
          return;
        }
      } else {
        // Deleting text
        setDisplayText(texts[currentIndex].substring(0, displayText.length - 1));
        
        // If completed deleting current text
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }
      }
    }, isDeleting ? deletingSpeed.current : typingSpeed.current);

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isDeleting, texts]);

  return (
    <span className={`${className} inline-block`}>
      {displayText}
      <span className="animate-blink inline-block h-full border-r-2 border-primary ml-1">&nbsp;</span>
    </span>
  );
};

export default AnimatedText;
