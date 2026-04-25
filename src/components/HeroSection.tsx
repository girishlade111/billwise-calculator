import { Zap, Sun, Moon, Sparkles, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface HeroSectionProps {
  darkMode: boolean;
  onToggleDark: () => void;
}

const features = [
  { label: "2026 Slabs" },
  { label: "10+ States" },
  { label: "No Login" },
  { label: "50K+ Users" },
  { label: "100% Free" },
];

const HeroSection = ({ darkMode, onToggleDark }: HeroSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex flex-col bg-black text-white">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 10, repeat: Infinity }} className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px]" />
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.15, 0.08] }} transition={{ duration: 12, repeat: Infinity, delay: 2 }} className="absolute -bottom-32 -right-32 w-[450px] h-[450px] bg-white/5 rounded-full blur-[80px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)", backgroundSize: "30px 30px" }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-5">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <motion.div whileHover={{ rotate: 180 }} className="flex items-center gap-2.5">
            <div className="bg-white p-2 rounded-lg">
              <Zap className="w-4.5 h-4.5 text-black" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">BillMeter</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button variant="ghost" size="icon" onClick={onToggleDark} className="text-white hover:text-white hover:bg-white/10 rounded-lg" aria-label="Toggle theme">
              {darkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <div ref={ref} className="relative z-10 flex-1 container mx-auto px-4 flex items-center justify-center pb-20">
        <motion.div initial={{ opacity: 0, y: 25 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="max-w-2xl mx-auto text-center">
          <motion.div initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}} transition={{ delay: 0.15, type: "spring" }} className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white px-3 py-1 rounded-full text-xs font-semibold mb-5">
            <Sparkles className="w-3 h-3" />
            <span>2026 Updated Tariffs</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.25 }} className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 leading-tight text-white">
            Calculate Your <span className="text-white">Electricity Bill</span>
          </motion.h1>
          <motion.h2 initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.35 }} className="text-xl md:text-2xl font-bold text-white mb-4">
            Instantly & Accurately
          </motion.h2>

          <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }} className="text-sm text-white/60 mb-5 max-w-md mx-auto">
            Free electricity bill calculator with accurate 2026 tariff data for 10+ Indian states. No login required.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }} className="flex flex-wrap justify-center gap-2 mb-6">
            {features.map((f, i) => (
              <motion.span key={f.label} initial={{ opacity: 0, scale: 0.8 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.1 * i + 0.55 }} className="text-xs font-medium px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white">
                {f.label}
              </motion.span>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.65 }} className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
            <motion.a href="#calculator" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="bg-white text-black hover:bg-white/90 text-sm px-5 py-5 rounded-lg font-bold">
                <Zap className="w-4 h-4 mr-1.5" />
                Calculate My Bill
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </motion.a>
            <Button variant="ghost" className="text-white hover:text-white text-sm px-4 py-5 rounded-lg" onClick={() => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" })}>
              How it Works
            </Button>
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.75 }} className="mt-5 text-xs text-white/50">
            Trusted by <span className="text-white font-semibold">50,000+</span> households in India
          </motion.p>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, y: [0, 8, 0] }} transition={{ delay: 1.2, duration: 2, repeat: Infinity }} className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/30">
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
};

export default HeroSection;