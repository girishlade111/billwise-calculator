import { useState, useEffect, useCallback } from "react";
import { Zap, Sun, Moon, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Calculator", target: "calculator" },
  { label: "Appliances", target: "appliances" },
  { label: "Tips", target: "saving-tips" },
  { label: "Tariff Rates", target: "tariff-table" },
  { label: "FAQ", target: "faq" },
];

interface StickyNavbarProps {
  darkMode: boolean;
  onToggleDark: () => void;
}

const StickyNavbar = ({ darkMode, onToggleDark }: StickyNavbarProps) => {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 100);

      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? (window.scrollY / docH) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    navLinks.forEach((link) => {
      const el = document.getElementById(link.target);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  }, []);

  if (!visible) return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] h-[3px] bg-transparent"
    >
      <div
        className="h-full bg-accent transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[9999] h-[3px] bg-transparent">
        <div
          className="h-full bg-accent transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navbar */}
      <nav className="fixed top-[3px] left-0 right-0 z-[9998] h-[52px] bg-background/95 backdrop-blur border-b border-border animate-fade-in">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          {/* Left: Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-1.5">
            <div className="bg-accent text-accent-foreground p-1 rounded-md">
              <Zap className="w-4 h-4" />
            </div>
            <span className="font-bold text-sm">BillMeter</span>
          </button>

          {/* Center: Nav links (desktop) */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => scrollTo(link.target)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  activeSection === link.target
                    ? "text-accent border-b-2 border-accent"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleDark}
              className="h-8 w-8"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button
              size="sm"
              onClick={() => scrollTo("calculator")}
              className="hidden md:inline-flex bg-accent text-accent-foreground hover:bg-accent/90 text-xs h-8"
            >
              Try Calculator
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-8 w-8"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur border-b border-border animate-fade-in">
            <div className="container mx-auto px-4 py-2 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.target}
                  onClick={() => scrollTo(link.target)}
                  className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeSection === link.target
                      ? "text-accent bg-accent/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default StickyNavbar;
