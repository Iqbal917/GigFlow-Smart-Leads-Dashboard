import { flushSync } from 'react-dom';
import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { cn } from '../utils/cn';

export const ThemeToggle = ({ className }: { className?: string }) => {
  const { theme, toggleTheme } = useThemeStore();

  const handleToggle = (e: React.MouseEvent) => {
    // Fallback for browsers that don't support the View Transitions API
    if (!document.startViewTransition) {
      toggleTheme();
      return;
    }

    // Get the click coordinates
    const x = e.clientX;
    const y = e.clientY;
    
    // Calculate distance to the furthest corner
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        toggleTheme();
      });
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 500,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });
  };

  return (
    <button
      onClick={handleToggle}
      className={cn(
        'p-2 rounded-full transition-colors duration-200',
        'hover:bg-gray-200 dark:hover:bg-gray-700',
        'text-gray-600 dark:text-gray-300 focus:outline-none',
        className
      )}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
};
