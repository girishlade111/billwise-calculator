import { Zap, Sun, Moon, CheckCircle, Smartphone, ShieldCheck, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  darkMode: boolean;
  onToggleDark: () => void;
}

const HeroSection = ({ darkMode, onToggleDark }: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground min-h-[92vh] flex flex-col">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[100px] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-accent/6 rounded-full blur-[120px] animate-[pulse_10s_ease-in-out_infinite_2s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/3 rounded-full blur-[150px]" />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(hsl(var(--primary-foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary-foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Top navbar area */}
      <div className="container relative mx-auto px-4 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-accent text-accent-foreground p-2 rounded-xl shadow-lg shadow-accent/20">
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">BillMeter</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleDark}
            className="text-primary-foreground hover:bg-primary-foreground/10 rounded-xl"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Hero content */}
      <div className="container relative mx-auto px-4 flex-1 flex items-center justify-center pb-16">
        <div className="max-w-3xl mx-auto text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 bg-accent/15 backdrop-blur-sm border border-accent/20 px-4 py-1.5 rounded-full text-sm font-medium text-accent mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            Updated for 2026 Tariff Rates
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-[1.1] tracking-tight">
            Calculate Your
            <br />
            <span className="text-accent relative inline-block">
              Electricity Bill
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 8C50 2 100 2 150 6C200 10 250 4 298 8" stroke="hsl(var(--accent))" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
              </svg>
            </span>
            <br />
            <span className="text-primary-foreground/70 text-3xl md:text-4xl lg:text-5xl font-bold">
              Instantly & Accurately
            </span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/70 mb-10 max-w-xl mx-auto leading-relaxed">
            Know your bill before it arrives. State-wise slab calculation with the latest tariff data — completely free.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              { icon: <CheckCircle className="w-4 h-4" />, text: "2026 Slabs" },
              { icon: <Zap className="w-4 h-4" />, text: "10+ States" },
              { icon: <ShieldCheck className="w-4 h-4" />, text: "No Login Required" },
              { icon: <Smartphone className="w-4 h-4" />, text: "100% Free" },
            ].map((badge) => (
              <span
                key={badge.text}
                className="inline-flex items-center gap-2 bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 px-4 py-2 rounded-xl text-sm font-medium text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10"
              >
                <span className="text-accent">{badge.icon}</span>
                {badge.text}
              </span>
            ))}
          </div>

          {/* CTA */}
          <a href="#calculator">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-10 py-7 rounded-2xl font-bold shadow-xl shadow-accent/25 hover:shadow-2xl hover:shadow-accent/30 transition-all duration-300 hover:-translate-y-0.5 group"
            >
              <Zap className="w-5 h-5 mr-2 group-hover:animate-[pulse_0.5s_ease-in-out]" />
              Calculate My Bill
              <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
            </Button>
          </a>

          <p className="mt-8 text-sm text-primary-foreground/50">
            Trusted by <span className="text-primary-foreground/70 font-semibold">50,000+</span> households, students & factory owners across India
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-primary-foreground/30 animate-bounce">
        <ChevronDown className="w-5 h-5" />
      </div>
    </section>
  );
};

export default HeroSection;
