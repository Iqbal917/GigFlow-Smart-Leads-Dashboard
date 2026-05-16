import { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import { useThemeStore } from './store/themeStore';
import { Toaster } from 'react-hot-toast';

function App() {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <>
      <Toaster position="top-right" />
      <AppRoutes />
    </>
  );
}

export default App;