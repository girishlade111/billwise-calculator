import { useState, useEffect, useCallback } from "react";
import HeroSection from "@/components/HeroSection";
import CalculatorSection from "@/components/CalculatorSection";
import ResultsSection from "@/components/ResultsSection";
import ApplianceSection from "@/components/ApplianceSection";
import TipsSection from "@/components/TipsSection";
import TariffTableSection from "@/components/TariffTableSection";
import FAQSection from "@/components/FAQSection";
import FooterSection from "@/components/FooterSection";
import { calculateBill, BillResult } from "@/data/tariffData";

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [result, setResult] = useState<BillResult | null>(null);
  const [prevResult, setPrevResult] = useState<BillResult | null>(null);
  // used by appliance section to auto-fill calculator
  const [autoFillUnits, setAutoFillUnits] = useState<number | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

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
      <HeroSection darkMode={darkMode} onToggleDark={() => setDarkMode(!darkMode)} />
      <CalculatorSection onCalculate={handleCalculate} autoFillUnits={autoFillUnits} onAutoFillConsumed={() => setAutoFillUnits(null)} />
      {result && <ResultsSection result={result} prevResult={prevResult} />}
      <ApplianceSection onUseUnits={handleUseUnits} />
      <TipsSection />
      <TariffTableSection />
      <FAQSection />
      <FooterSection />
    </div>
  );
};

export default Index;
