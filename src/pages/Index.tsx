import { useState, useEffect, useCallback } from "react";
import { ArrowUp } from "lucide-react";
import StickyNavbar from "@/components/StickyNavbar";
import HeroSection from "@/components/HeroSection";
import CalculatorSection from "@/components/CalculatorSection";
import ResultsSection from "@/components/ResultsSection";
import ApplianceSection from "@/components/ApplianceSection";
import TipsSection from "@/components/TipsSection";
import TariffTableSection from "@/components/TariffTableSection";
import FAQSection from "@/components/FAQSection";
import FooterSection from "@/components/FooterSection";
import { calculateBill, BillResult } from "@/data/tariffData";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("darkMode");
      if (stored !== null) return stored === "true";
    }
    return true; // Default to dark mode
  });
  const [result, setResult] = useState<BillResult | null>(null);
  const [prevResult, setPrevResult] = useState<BillResult | null>(null);
  const [autoFillUnits, setAutoFillUnits] = useState<number | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleCalculate = useCallback((state: string, load: string, units: number, prevUnits?: number) => {
    const bill = calculateBill(state, load, units);
    setResult(bill);
    if (prevUnits && prevUnits > 0) {
      setPrevResult(calculateBill(state, load, prevUnits));
    } else {
      setPrevResult(null);
    }
  }, []);

  const handleUseUnits = useCallback((units: number) => {
    setAutoFillUnits(units);
  }, []);

  return (
    <div className="min-h-screen">
      <StickyNavbar darkMode={darkMode} onToggleDark={() => setDarkMode(!darkMode)} />
      <HeroSection darkMode={darkMode} onToggleDark={() => setDarkMode(!darkMode)} />
      <CalculatorSection onCalculate={handleCalculate} autoFillUnits={autoFillUnits} onAutoFillConsumed={() => setAutoFillUnits(null)} />
      {result && <ResultsSection result={result} prevResult={prevResult} />}
      <ApplianceSection onUseUnits={handleUseUnits} />
      <TipsSection />
      <TariffTableSection />
      <FAQSection />
      <FooterSection />

      {/* Scroll to top */}
      {showScrollTop && (
        <Button
          size="icon"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg bg-accent text-accent-foreground hover:bg-accent/90 animate-fade-in"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
};

export default Index;
