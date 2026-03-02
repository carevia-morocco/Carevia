import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { HeartPulse, Menu, Moon, Sun, Globe } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [lang, setLang] = useState("EN");

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Caregivers", path: "/caregivers" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <HeartPulse className="w-6 h-6 text-primary" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight text-foreground">
              Care<span className="text-primary">Via</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path}
                className={cn(
                  "text-sm font-semibold transition-colors hover:text-primary relative py-2",
                  location === link.path ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.name}
                {location === link.path && (
                  <motion.div 
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => setLang(lang === "EN" ? "ES" : "EN")}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Globe className="w-4 h-4" />
              {lang}
            </button>
            
            <button 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <Link href="/book" className="btn-premium btn-primary py-2.5 px-5 text-sm">
              Book Care
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-20 left-0 right-0 bg-background border-b border-border shadow-xl p-4 flex flex-col gap-4"
        >
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              href={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "block px-4 py-3 rounded-xl font-medium",
                location === link.path ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px w-full bg-border my-2" />
          <Link 
            href="/book" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="btn-premium btn-primary w-full"
          >
            Book Care Now
          </Link>
        </motion.div>
      )}
    </header>
  );
}
