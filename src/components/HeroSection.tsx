import { Zap, Sun, Moon, Sparkles, ShieldCheck, Smartphone, Globe, Users, ArrowRight, ChevronDown, Calculator, Flame, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface HeroSectionProps {
  darkMode: boolean;
  onToggleDark: () => void;
}

const features = [
  { icon: Sparkles, label: "2026 Tariffs", color: "bg-amber-500/20 text-amber-400" },
  { icon: Globe, label: "10+ States", color: "bg-blue-500/20 text-blue-400" },
  { icon: ShieldCheck, label: "No Login", color: "bg-green-500/20 text-green-400" },
  { icon: Smartphone, label: "Mobile Ready", color: "bg-purple-500/20 text-purple-400" },
  { icon: Users, label: "50K+ Users", color: "bg-pink-500/20 text-pink-400" },
  { icon: Calculator, label: "100% Free", color: "bg-cyan-500/20 text-cyan-400" },
];

const HeroSection = ({ darkMode, onToggleDark }: HeroSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="relative overflow-hidden min-h-[92vh] flex flex-col bg-gradient-to-br from-slate-900 via-slate-900 to-primary text-white">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated orbs */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-amber-500/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[150px]" 
        />
        
        {/* Dot grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Navigation Bar */}
      <div className="relative z-10 container mx-auto px-4 pt-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          {/* Logo */}
          <motion.div 
            whileHover={{ rotate: 180, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3"
          >
            <div className="bg-gradient-to-br from-amber-400 to-amber-500 p-2.5 rounded-xl shadow-lg shadow-amber-500/30">
              <Zap className="w-5 h-5 text-slate-900" />
            </div>
            <span className="text-xl font-bold tracking-tight">BillMeter</span>
          </motion.div>

          {/* Nav Links (hidden on mobile) */}
          <div className="hidden md:flex items-center gap-6">
            {["Calculator", "Appliances", "Tips", "FAQ"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ y: -2 }}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* Dark Mode Toggle */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleDark}
              className="text-slate-300 hover:text-white hover:bg-white/10 rounded-xl"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Hero Content */}
      <div ref={ref} className="relative z-10 flex-1 container mx-auto px-4 flex items-center justify-center pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-1.5 rounded-full text-sm font-semibold mb-8"
          >
            <motion.span
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-amber-400"
            />
            <span>2026 Updated Tariff Rates</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-[1.1] tracking-tight"
          >
            Calculate Your
            <br />
            <motion.span 
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="text-amber-400 relative inline-block"
            >
              Electricity Bill
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <motion.path 
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1, delay: 0.8 }}
                  d="M2 8C50 2 100 2 150 6C200 10 250 4 298 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-amber-400" opacity="0.5" />
              </svg>
            </motion.span>
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-300">
              Instantly & Accurately
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl text-slate-400 mb-8 max-w-xl mx-auto leading-relaxed"
          >
            Know your bill before it arrives. State-wise slab calculation with accurate 2026 tariff data — completely free, no login required.
          </motion.p>

          {/* Feature Pills */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.1 * i + 0.7 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-white/10 hover:border-white/20 transition-all ${feature.color}`}
                >
                  <Icon className="w-4 h-4" />
                  {feature.label}
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href="#calculator"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 hover:from-amber-400 hover:to-amber-500 text-lg px-10 py-7 rounded-2xl font-bold shadow-xl shadow-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/50 group"
              >
                <Zap className="w-5 h-5 mr-2" />
                Calculate My Bill
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.a>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="ghost"
                size="lg"
                className="text-slate-300 hover:text-white hover:bg-white/10 rounded-xl px-6"
                onClick={() => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" })}
              >
                Learn How It Works
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust badge */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="mt-8 text-sm text-slate-500 flex items-center justify-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            Trusted by <span className="text-white font-semibold">50,000+</span> households across India
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
      >
        <span className="text-xs font-medium">Scroll to explore</span>
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
};

export default HeroSection;