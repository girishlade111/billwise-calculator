import { Zap, Sun, Moon, CheckCircle, Smartphone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  darkMode: boolean;
  onToggleDark: () => void;
}

const HeroSection = ({ darkMode, onToggleDark }: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 py-12 md:py-20">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="bg-accent text-accent-foreground p-2 rounded-lg">
              <Zap className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold">BillMeter</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleDark}
            className="text-primary-foreground hover:bg-primary-foreground/10"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
            Calculate Your Exact{" "}
            <span className="text-accent">Electricity Bill</span>
            <br />
            with 2026 Updated Tariff Slabs
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Know your bill before it arrives. Free, accurate & instant.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              { icon: <CheckCircle className="w-4 h-4" />, text: "2026 Updated Slabs" },
              { icon: <Zap className="w-4 h-4" />, text: "10+ States" },
              { icon: <ShieldCheck className="w-4 h-4" />, text: "No Login" },
              { icon: <Smartphone className="w-4 h-4" />, text: "Free Forever" },
            ].map((badge) => (
              <span
                key={badge.text}
                className="inline-flex items-center gap-1.5 bg-primary-foreground/10 backdrop-blur px-3 py-1.5 rounded-full text-sm font-medium"
              >
                {badge.icon}
                {badge.text}
              </span>
            ))}
          </div>

          <a href="#calculator">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6 rounded-xl font-semibold shadow-lg"
            >
              <Zap className="w-5 h-5 mr-2" />
              Calculate My Bill →
            </Button>
          </a>

          <p className="mt-6 text-sm opacity-70">
            Used by 50,000+ households, students & factory owners across India
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
