import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { cn } from '../utils/cn';

export const ThemeToggle = ({ className }: { className?: string }) => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'p-2 rounded-full transition-colors duration-200',
        'hover:bg-gray-200 dark:hover:bg-gray-700',
        'text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500',
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
