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
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[3px] bg-transparent">
      <div
        className="h-full bg-accent transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[9999] h-[3px]">
        <div
          className="h-full bg-accent transition-all duration-150 shadow-[0_0_8px_hsl(var(--accent)/0.5)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navbar */}
      <nav className="fixed top-[3px] left-0 right-0 z-[9998] animate-fade-in">
        <div className="mx-auto max-w-5xl px-3 pt-2">
          <div className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-2xl shadow-lg shadow-foreground/5 px-4 h-14 flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 group"
            >
              <div className="bg-accent text-accent-foreground p-1.5 rounded-lg shadow-sm group-hover:shadow-md group-hover:shadow-accent/20 transition-shadow">
                <Zap className="w-4 h-4" />
              </div>
              <span className="font-bold text-sm tracking-tight">BillMeter</span>
            </button>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center bg-muted/50 rounded-xl p-1">
              {navLinks.map((link) => (
                <button
                  key={link.target}
                  onClick={() => scrollTo(link.target)}
                  className={`relative px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                    activeSection === link.target
                      ? "bg-accent text-accent-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleDark}
                className="h-8 w-8 rounded-lg hover:bg-muted"
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Button
                size="sm"
                onClick={() => scrollTo("calculator")}
                className="hidden md:inline-flex bg-accent text-accent-foreground hover:bg-accent/90 text-xs h-8 rounded-lg font-semibold shadow-sm hover:shadow-md hover:shadow-accent/20 transition-all"
              >
                <Zap className="w-3 h-3 mr-1" />
                Calculate
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-8 w-8 rounded-lg"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile dropdown */}
          {mobileOpen && (
            <div className="md:hidden mt-2 bg-background/80 backdrop-blur-xl border border-border/50 rounded-2xl shadow-lg shadow-foreground/5 p-2 animate-fade-in">
              {navLinks.map((link) => (
                <button
                  key={link.target}
                  onClick={() => scrollTo(link.target)}
                  className={`block w-full text-left px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                    activeSection === link.target
                      ? "text-accent-foreground bg-accent shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="mt-1 px-1">
                <Button
                  size="sm"
                  onClick={() => scrollTo("calculator")}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl font-semibold"
                >
                  <Zap className="w-3 h-3 mr-1" />
                  Calculate Now
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default StickyNavbar;
