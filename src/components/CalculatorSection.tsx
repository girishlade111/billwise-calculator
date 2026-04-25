import { useState, useEffect } from "react";
import { Zap, Loader2, Lock, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  { value: "residential", label: "🏠 Residential", available: true },
  { value: "commercial", label: "🏢 Commercial", available: true },
  { value: "agricultural", label: "🌾 Agricultural", available: false },
  { value: "industrial", label: "🏭 Industrial", available: false },
];

const loadOptions = [
  { value: "upTo1kW", label: "Up to 1 kW" },
  { value: "upto3kW", label: "1–3 kW" },
  { value: "upto10kW", label: "3–10 kW" },
];

const slabColorClasses = [
  "text-success",
  "text-accent",
  "text-warning",
  "text-destructive",
  "text-destructive",
];

const slabBgColors = ["bg-success", "bg-accent", "bg-warning", "bg-destructive", "bg-destructive"];

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
    if (!state) errs.state = "Please select a state";
    if (units <= 0) errs.units = "Please enter a valid number of units";
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
      // Scroll to first error
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
    <section id="calculator" className="py-16 md:py-24 bg-gradient-to-b from-background via-background to-secondary/20">
      <div className="container mx-auto px-4">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-10"
          >
            <span className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-5">
              <Zap className="w-4 h-4" /> Tariff data: April 2026
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Calculate Your Electricity Bill
            </h2>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              Select your state, enter units consumed, and get an instant estimate with detailed breakdown
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-dark rounded-2xl p-6 md:p-8 space-y-6 shadow-xl"
          >
            {/* State Selection */}
            <div className="space-y-3" data-error={stateError ? "" : undefined}>
              <label className="text-sm font-semibold flex items-center gap-2">
                <span className="bg-accent/10 p-1.5 rounded-lg">📍</span> Select Your State
              </label>
              <Select value={state} onValueChange={handleStateChange}>
                <SelectTrigger className={`h-12 text-base ${stateError ? "border-destructive ring-2 ring-destructive" : "focus-visible:ring-accent"}`}>
                  <SelectValue placeholder="-- Choose your Indian state --" />
                </SelectTrigger>
                <SelectContent className="max-h-80">
                  {STATES.map((s) => (
                    <SelectItem key={s.value} value={s.value} className="text-base py-3">
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {stateError && <p className="text-sm text-destructive font-medium">{errors.state}</p>}
            </div>

            {/* Consumer Category */}
            <div className="space-y-3">
              <label className="text-sm font-semibold flex items-center gap-2">
                <span className="bg-accent/10 p-1.5 rounded-lg">🏠</span> Consumer Category
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {categories.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => c.available && setCategory(c.value)}
                    disabled={!c.available}
                    className={`relative px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      category === c.value && c.available
                        ? "bg-accent text-accent-foreground shadow-lg shadow-accent/25 scale-[1.02]"
                        : c.available
                        ? "bg-muted/50 text-muted-foreground hover:bg-muted hover:border-accent/50 border border-transparent"
                        : "bg-muted/30 text-muted-foreground/50 cursor-not-allowed border border-dashed"
                    }`}
                    title={!c.available ? "Coming Soon" : undefined}
                  >
                    {c.label}
                    {!c.available && (
                      <span className="absolute -top-2 -right-2 bg-warning/20 text-warning text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                        SOON
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Connected Load */}
            <div className="space-y-3">
              <label className="text-sm font-semibold flex items-center gap-2">
                <span className="bg-accent/10 p-1.5 rounded-lg">⚡</span> Connected Load (Sanctioned)
              </label>
              <div className="grid grid-cols-3 gap-3">
                {loadOptions.map((l) => (
                  <button
                    key={l.value}
                    onClick={() => setLoad(l.value)}
                    className={`px-4 py-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      load === l.value
                        ? "bg-accent text-accent-foreground shadow-lg shadow-accent/25 scale-[1.02]"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted hover:border-accent/50 border border-transparent"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <span className="i-lucide-info w-3 h-3" /> Check your electricity bill or meter box for sanctioned load
              </p>
            </div>

            {/* Units Input */}
            <div className="space-y-4" data-error={unitsError ? "" : undefined}>
              <label className="text-sm font-semibold flex items-center gap-2">
                <span className="bg-accent/10 p-1.5 rounded-lg">⚡</span> Units Consumed This Month (kWh)
              </label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="e.g. 245"
                  min={0}
                  max={9999}
                  value={units || ""}
                  onChange={(e) => handleUnitsChange(Number(e.target.value))}
                  className={`text-2xl h-16 font-bold text-center pr-12 transition-all ${
                    unitsError
                      ? "border-destructive ring-2 ring-destructive"
                      : "focus-visible:ring-accent border-accent/30"
                  }`}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">kWh</span>
              </div>
              {unitsError ? (
                <p className="text-sm text-destructive font-medium">{errors.units}</p>
              ) : (
                <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <span className="i-lucide-info w-3 h-3" /> Enter units from your meter reading or electricity bill
                </p>
              )}

              {/* Live Slab Indicator */}
              {currentSlabs && units > 0 && currentSlabIdx >= 0 && (
                <div className="mt-6 space-y-4 animate-fade-in-up">
                  <div className={`flex items-center justify-center gap-3 px-5 py-3 rounded-xl ${slabBgColors[currentSlabIdx]}/15 border ${slabBgColors[currentSlabIdx]}/30`}>
                    <span className={`w-3 h-3 rounded-full ${slabBgColors[currentSlabIdx]} animate-pulse`} />
                    <span className={`font-semibold ${slabTextColors[currentSlabIdx]}`}>
                      Slab {currentSlabIdx + 1} @ ₹{currentSlabs[currentSlabIdx].rate.toFixed(2)}/unit
                    </span>
                  </div>

                  <div className="flex h-5 rounded-xl overflow-hidden shadow-inner">
                    {progress.map((pct, i) => (
                      <div
                        key={i}
                        className={`${slabBgColors[i]} relative transition-all duration-700`}
                        style={{ width: `${100 / currentSlabs.length}%` }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[10px] font-bold text-white/80">{pct > 30 ? `${Math.round(pct)}%` : ''}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Synced Slider */}
              <div className="mt-6 space-y-3">
                <Slider
                  value={[Math.min(units, 1000)]}
                  max={1000}
                  step={5}
                  onValueChange={([v]) => handleUnitsChange(v)}
                  className="py-3"
                />
                <div className="flex justify-between text-xs text-muted-foreground font-medium">
                  <span>0</span>
                  <span className="bg-muted px-3 py-1 rounded-full">500</span>
                  <span>1000+</span>
                </div>
              </div>
            </div>

            {/* Previous Month Toggle */}
            <div className="glass rounded-xl p-4">
              <button
                onClick={() => setShowPrevUnits(!showPrevUnits)}
                className="flex items-center justify-between w-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="flex items-center gap-2">
                  {showPrevUnits ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  Compare with previous month
                </span>
                <span className={`w-10 h-6 rounded-full transition-colors ${showPrevUnits ? "bg-accent" : "bg-muted"}`}>
                  <span className={`block w-4 h-4 rounded-full bg-white shadow transform transition-transform ${showPrevUnits ? "translate-x-5" : "translate-x-1"} mt-1`} />
                </span>
              </button>
              {showPrevUnits && (
                <div className="mt-4 animate-fade-in-up">
                  <Input
                    type="number"
                    placeholder="e.g. 300"
                    min={0}
                    max={9999}
                    value={prevUnits}
                    onChange={(e) => setPrevUnits(e.target.value)}
                    className="h-12 text-base focus-visible:ring-accent"
                  />
                </div>
              )}
            </div>

            {/* Calculate Button */}
            <Button
              size="lg"
              onClick={handleCalculate}
              disabled={loading}
              className="w-full h-14 text-lg font-bold rounded-xl shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Calculating Your Bill...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-2" />
                  Calculate My Bill
                </>
              )}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CalculatorSection;
