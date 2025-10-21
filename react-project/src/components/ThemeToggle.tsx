
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-500 ease-in-out glass glass-dark hover:bg-secondary"
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      <span
        className={`absolute transform transition-all duration-500 ${
          theme === "dark" ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
        }`}
      >
        <Sun size={18} className="text-sunrise-orange" />
      </span>
      <span
        className={`absolute transform transition-all duration-500 ${
          theme === "light" ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
        }`}
      >
        <Moon size={18} className="text-sunset-purple" />
      </span>
    </button>
  );
};

export default ThemeToggle;
