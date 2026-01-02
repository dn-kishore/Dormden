import { useState, useEffect } from 'react';
import { Search, Building2, Plus, Brain, Moon, Sun } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center transition-transform group-hover:scale-105">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-semibold text-foreground">DormDen</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={cn(
                "text-base font-normal transition-all duration-200 hover:text-foreground",
                location.pathname === '/' ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Home
            </Link>
            <Link
              to="/search"
              className={cn(
                "text-base font-normal transition-all duration-200 hover:text-foreground",
                location.pathname === '/search' ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Browse
            </Link>
            <Link
              to="/admin"
              className={cn(
                "text-base font-normal transition-all duration-200 hover:text-foreground",
                location.pathname === '/admin' ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Add Hostel
            </Link>
            <Link
              to="/manage"
              className={cn(
                "text-base font-normal transition-all duration-200 hover:text-foreground flex items-center gap-1",
                location.pathname === '/manage' ? "text-foreground" : "text-muted-foreground"
              )}
            >
              <Brain className="w-4 h-4" />
              AI Manager
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted"
              aria-label="Toggle theme"
            >
              {mounted && (resolvedTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />)}
            </button>
            <Link to="/admin" className="hidden sm:flex">
              <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground border border-border rounded-full hover:bg-muted transition-colors">
                <Plus className="w-4 h-4" />
                Add
              </button>
            </Link>
            <Link to="/search">
              <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full hover:opacity-90 transition-opacity">
                <Search className="w-4 h-4" />
                Search
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
