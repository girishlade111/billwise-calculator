import { Zap, Sun, Moon, CheckCircle, Smartphone, ShieldCheck, ChevronDown, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  darkMode: boolean;
  onToggleDark: () => void;
}

const HeroSection = ({ darkMode, onToggleDark }: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground min-h-[92vh] flex flex-col">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-[700px] h-[700px] bg-accent/8 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-accent/5 rounded-full blur-[160px]" />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(hsl(var(--primary-foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary-foreground)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Header */}
      <div className="relative container mx-auto px-4 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-accent text-accent-foreground p-2.5 rounded-xl shadow-lg shadow-accent/25">
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">BillMeter</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleDark}
            className="text-primary-foreground hover:bg-primary-foreground/10 rounded-xl transition-all duration-300 hover:rotate-180"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative container mx-auto px-4 flex-1 flex items-center justify-center pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/15 backdrop-blur-md border border-accent/20 px-5 py-2 rounded-full text-sm font-medium text-accent mb-8 animate-fade-in-up">
            <Sparkles className="w-4 h-4" />
            <span>2026 Updated Tariff Rates</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-[1.1] tracking-tight">
            Calculate Your
            <br />
            <span className="text-accent relative inline-block">
              Electricity Bill
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 8C50 2 100 2 150 6C200 10 250 4 298 8" stroke="hsl(var(--accent))" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
              </svg>
            </span>
            <br />
            <span className="text-primary-foreground/70 text-2xl md:text-3xl lg:text-4xl font-bold">
              Instantly & Accurately
            </span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/70 mb-10 max-w-xl mx-auto leading-relaxed">
            Know your bill before it arrives. State-wise slab calculation with the latest 2026 tariff data — completely free, no login required.
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              { icon: <Sparkles className="w-4 h-4" />, text: "2026 Slabs" },
              { icon: <Zap className="w-4 h-4" />, text: "10+ States" },
              { icon: <ShieldCheck className="w-4 h-4" />, text: "No Login" },
              { icon: <Smartphone className="w-4 h-4" />, text: "100% Free" },
              { icon: <CheckCircle className="w-4 h-4" />, text: "Accurate" },
            ].map((badge, i) => (
              <span
                key={badge.text}
                className="inline-flex items-center gap-2 bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 px-4 py-2.5 rounded-xl text-sm font-medium text-primary-foreground/80 hover:bg-primary-foreground/10 hover:border-primary-foreground/20 transition-all duration-300"
              >
                <span className="text-accent">{badge.icon}</span>
                {badge.text}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#calculator">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-10 py-7 rounded-2xl font-bold shadow-xl shadow-accent/25 hover:shadow-2xl hover:shadow-accent/35 transition-all duration-300 hover:-translate-y-1 group"
              >
                <Zap className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Calculate My Bill
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
            <Button
              variant="ghost"
              size="lg"
              className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-xl"
              onClick={() => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" })}
            >
              Learn How It Works
            </Button>
          </div>

          <p className="mt-8 text-sm text-primary-foreground/50">
            Trusted by <span className="text-primary-foreground/80 font-semibold">50,000+</span> households across India
          </p>
        </div>
      </div>

      {/* Scroll */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-primary-foreground/30">
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
