import { useState, useEffect } from "react";
import { Zap, Loader2, Lock, ChevronDown, ChevronUp, MapPin, Home, Gauge, Flame, ArrowRight, Calculator, Info, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { STATES, TARIFF_DATA } from "@/data/tariffData";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface CalculatorSectionProps {
  onCalculate: (state: string, load: string, units: number, prevUnits?: number) => void;
  autoFillUnits?: number | null;
  onAutoFillConsumed?: () => void;
}

const categories = [
  { value: "residential", label: "Residential", icon: Home, available: true, color: "bg-green-500/20 text-green-600", active: "bg-green-500 text-white" },
  { value: "commercial", label: "Commercial", icon: Home, available: true, color: "bg-blue-500/20 text-blue-600", active: "bg-blue-500 text-white" },
  { value: "agricultural", label: "Agricultural", icon: Flame, available: false, color: "bg-amber-500/20 text-amber-600", active: "bg-amber-500 text-white" },
  { value: "industrial", label: "Industrial", icon: Gauge, available: false, color: "bg-purple-500/20 text-purple-600", active: "bg-purple-500 text-white" },
];

const loadOptions = [
  { value: "upTo1kW", label: "Up to 1 kW", desc: "Small homes" },
  { value: "upto3kW", label: "1–3 kW", desc: "Medium homes" },
  { value: "upto10kW", label: "3–10 kW", desc: "Large homes" },
];

const slabBgColors = ["bg-green-500", "bg-amber-500", "bg-orange-500", "bg-red-500", "bg-red-600"];
const slabTextColors = ["text-green-600", "text-amber-600", "text-orange-600", "text-red-500", "text-red-600"];

const CalculatorSection = ({ onCalculate, autoFillUnits, onAutoFillConsumed }: CalculatorSectionProps) => {
  const [state, setState] = useState("");
  const [category, setCategory] = useState("residential");
  const [load, setLoad] = useState("upto3kW");
  const [units, setUnits] = useState<number>(0);
  const [prevUnits, setPrevUnits] = useState<string>("");
  const [showPrevUnits, setShowPrevUnits] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ state?: string; units?: string }>({});
  const [touched, setTouched] = useState<{ state?: boolean; units?: boolean }>({});

  useEffect(() => {
    if (autoFillUnits != null) {
      setUnits(autoFillUnits);
      setTouched((t) => ({ ...t, units: true }));
      onAutoFillConsumed?.();
    }
  }, [autoFillUnits, onAutoFillConsumed]);

  const validate = () => {
    const errs: { state?: string; units?: string } = {};
    if (!state) errs.state = "Please select your state";
    if (units <= 0) errs.units = "Please enter units consumed";
    if (units > 9999) errs.units = "Units must be 9999 or less";
    return errs;
  };

  const currentSlabs = state ? TARIFF_DATA[state]?.residential.slabs : null;

  const getCurrentSlabIndex = () => {
    if (!currentSlabs || units <= 0) return -1;
    let prevLimit = 0;
    for (let i = 0; i < currentSlabs.length; i++) {
      if (units <= currentSlabs[i].upTo) return i;
      prevLimit = currentSlabs[i].upTo;
    }
    return currentSlabs.length - 1;
  };

  const getSlabProgress = () => {
    if (!currentSlabs || units <= 0) return [];
    let prevLimit = 0;
    return currentSlabs.map((slab) => {
      const slabMax = slab.upTo === Infinity ? 1000 : slab.upTo;
      const slabSize = slabMax - prevLimit;
      const filled = Math.max(0, Math.min(units - prevLimit, slabSize));
      const pct = slabSize > 0 ? (filled / slabSize) * 100 : 0;
      prevLimit = slabMax;
      return pct;
    });
  };

  const progress = getSlabProgress();
  const currentSlabIdx = getCurrentSlabIndex();

  const handleCalculate = () => {
    setTouched({ state: true, units: true });
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      const el = document.querySelector("[data-error]");
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onCalculate(state, load, units, prevUnits ? Number(prevUnits) : undefined);
      setTimeout(() => {
        document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }, 800);
  };

  const handleUnitsChange = (val: number) => {
    const clamped = Math.max(0, Math.min(9999, val));
    setUnits(clamped);
    setTouched((t) => ({ ...t, units: true }));
    if (clamped > 0 && clamped <= 9999) {
      setErrors((e) => ({ ...e, units: undefined }));
    }
  };

  const handleStateChange = (val: string) => {
    setState(val);
    setTouched((t) => ({ ...t, state: true }));
    setErrors((e) => ({ ...e, state: undefined }));
  };

  const stateError = touched.state && errors.state;
  const unitsError = touched.units && errors.units;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="calculator" className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/20">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px]" 
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px]" 
        />
      </div>

      <div ref={ref} className="container mx-auto px-4 relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto"
        >
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-10"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-600 px-4 py-1.5 rounded-full text-sm font-semibold mb-5"
            >
              <Sparkles className="w-4 h-4" />
              <span>2026 Updated Tariffs</span>
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ⚡ Calculate Your Electricity Bill
            </h2>
            <p className="text-muted-foreground text-lg">
              Select your state, enter units, and get instant estimate
            </p>
          </motion.div>

          {/* Calculator Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border/50 rounded-2xl shadow-xl p-6 md:p-8 space-y-6"
          >
            {/* State Selection */}
            <div className="space-y-3" data-error={stateError ? "" : undefined}>
              <label className="text-sm font-semibold flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500" />
                Select Your State
              </label>
              <Select value={state} onValueChange={handleStateChange}>
                <SelectTrigger className={`h-12 text-base ${stateError ? "border-red-500 ring-2 ring-red-500" : "focus:ring-2 focus:ring-amber-500"}`}>
                  <SelectValue placeholder="Choose your Indian state..." />
                </SelectTrigger>
                <SelectContent className="max-h-80">
                  {STATES.map((s) => (
                    <SelectItem key={s.value} value={s.value} className="text-base py-3">
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {stateError && (
                <motion.p 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-sm text-red-500 font-medium flex items-center gap-1"
                >
                  <Info className="w-4 h-4" />
                  {errors.state}
                </motion.p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-3">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Home className="w-4 h-4 text-amber-500" />
                Consumer Category
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {categories.map((c) => {
                  const Icon = c.icon;
                  return (
                    <button
                      key={c.value}
                      onClick={() => c.available && setCategory(c.value)}
                      disabled={!c.available}
                      className={`relative px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                        category === c.value && c.available
                          ? c.active + " shadow-lg"
                          : c.available
                          ? "bg-muted/50 hover:bg-muted border border-border/50"
                          : "bg-muted/30 text-muted-foreground/50 cursor-not-allowed border border-dashed opacity-70"
                      }`}
                    >
                      <Icon className="w-4 h-4 mx-auto mb-1" />
                      {c.label}
                      {!c.available && (
                        <span className="absolute -top-2 -right-2 text-[10px] bg-amber-500 text-white px-1.5 py-0.5 rounded-full">
                          Soon
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Connected Load */}
            <div className="space-y-3">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Gauge className="w-4 h-4 text-amber-500" />
                Connected Load (Sanctioned)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {loadOptions.map((l) => (
                  <button
                    key={l.value}
                    onClick={() => setLoad(l.value)}
                    className={`px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      load === l.value
                        ? "bg-amber-500 text-white shadow-lg"
                        : "bg-muted/50 hover:bg-muted border border-border/50"
                    }`}
                  >
                    <div className="font-semibold">{l.label}</div>
                    <div className={`text-xs ${load === l.value ? "text-white/70" : "text-muted-foreground"}`}>{l.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Units Input */}
            <div className="space-y-4" data-error={unitsError ? "" : undefined}>
              <label className="text-sm font-semibold flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                Units Consumed This Month (kWh)
              </label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="Enter units (e.g. 250)"
                  min={0}
                  max={9999}
                  value={units || ""}
                  onChange={(e) => handleUnitsChange(Number(e.target.value))}
                  className={`text-2xl h-16 font-bold text-center pr-12 ${
                    unitsError
                      ? "border-red-500 ring-2 ring-red-500"
                      : "focus:ring-2 focus:ring-amber-500 border-amber-500/30"
                  }`}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">kWh</span>
              </div>
              {unitsError && (
                <motion.p 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-sm text-red-500 font-medium flex items-center gap-1"
                >
                  <Info className="w-4 h-4" />
                  {errors.units}
                </motion.p>
              )}

              {/* Live Slab Indicator */}
              {currentSlabs && units > 0 && currentSlabIdx >= 0 && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-3 p-4 bg-muted/30 rounded-xl"
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${slabBgColors[currentSlabIdx]} animate-pulse`} />
                    <span className={`font-semibold ${slabTextColors[currentSlabIdx]}`}>
                      Slab {currentSlabIdx + 1} @ ₹{currentSlabs[currentSlabIdx].rate.toFixed(2)}/unit
                    </span>
                  </div>
                  <div className="flex h-6 rounded-xl overflow-hidden">
                    {progress.map((pct, i) => (
                      <div
                        key={i}
                        className={`${slabBgColors[i]} relative flex items-center justify-center text-xs font-bold text-white transition-all duration-500`}
                        style={{ width: `${100 / currentSlabs.length}%` }}
                      >
                        {pct > 20 && `${Math.round(pct)}%`}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Slider */}
              <div className="space-y-2">
                <Slider
                  value={[Math.min(units, 1000)]}
                  max={1000}
                  step={5}
                  onValueChange={([v]) => handleUnitsChange(v)}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground font-medium">
                  <span>0</span>
                  <span className="bg-muted px-2 py-0.5 rounded">500</span>
                  <span>1000+</span>
                </div>
              </div>
            </div>

            {/* Previous Month Toggle */}
            <div className="p-4 bg-muted/30 rounded-xl">
              <button
                onClick={() => setShowPrevUnits(!showPrevUnits)}
                className="flex items-center justify-between w-full text-sm font-medium"
              >
                <span className="flex items-center gap-2">
                  {showPrevUnits ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  Compare with previous month
                </span>
                <div className={`w-10 h-6 rounded-full transition-colors flex items-center ${showPrevUnits ? "bg-amber-500" : "bg-muted"}`}>
                  <div className={`w-4 h-4 rounded-full bg-white shadow transform transition-transform ${showPrevUnits ? "translate-x-5" : "translate-x-1"}`} />
                </div>
              </button>
              {showPrevUnits && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4"
                >
                  <Input
                    type="number"
                    placeholder="Previous month units"
                    value={prevUnits}
                    onChange={(e) => setPrevUnits(e.target.value)}
                    className="h-12 text-base"
                  />
                </motion.div>
              )}
            </div>

            {/* Calculate Button */}
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Button
                size="lg"
                onClick={handleCalculate}
                disabled={loading}
                className="w-full h-14 text-lg font-bold rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 shadow-lg shadow-amber-500/30"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Calculator className="w-5 h-5 mr-2" />
                    Calculate My Bill
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CalculatorSection;