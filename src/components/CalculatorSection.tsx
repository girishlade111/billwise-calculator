import { useState, useEffect } from "react";
import { Zap, ChevronDown, ChevronUp, MapPin, Home, Gauge, ArrowRight, Info, Sparkles, Calculator } from "lucide-react";
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
  { value: "residential", label: "Residential", icon: Home, available: true },
  { value: "commercial", label: "Commercial", icon: Home, available: true },
];

const loadOptions = [
  { value: "upTo1kW", label: "Up to 1 kW" },
  { value: "upto3kW", label: "1–3 kW" },
  { value: "upto10kW", label: "3–10 kW" },
];

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
    if (!state) errs.state = "Select your state";
    if (units <= 0) errs.units = "Enter units consumed";
    if (units > 9999) errs.units = "Max 9999 units";
    return errs;
  };

  const currentSlabs = state ? TARIFF_DATA[state]?.residential.slabs : null;

  const getCurrentSlabIndex = () => {
    if (!currentSlabs || units <= 0) return -1;
    for (let i = 0; i < currentSlabs.length; i++) {
      if (units <= currentSlabs[i].upTo) return i;
    }
    return currentSlabs.length - 1;
  };

  const getSlabProgress = () => {
    if (!currentSlabs || units <= 0) return [];
    let prevLimit = 0;
    return currentSlabs.map((slab) => {
      const slabMax = slab.upTo === Infinity ? 1000 : slab.upTo;
      const filled = Math.max(0, Math.min(units - prevLimit, slabMax - prevLimit));
      const pct = (slabMax - prevLimit) > 0 ? (filled / (slabMax - prevLimit)) * 100 : 0;
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
      document.querySelector("[data-error]")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onCalculate(state, load, units, prevUnits ? Number(prevUnits) : undefined);
      setTimeout(() => {
        document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }, 600);
  };

  const handleUnitsChange = (val: number) => {
    setUnits(Math.max(0, Math.min(9999, val)));
    setTouched((t) => ({ ...t, units: true }));
    if (val > 0 && val <= 9999) setErrors((e) => ({ ...e, units: undefined }));
  };

  const handleStateChange = (val: string) => {
    setState(val);
    setTouched((t) => ({ ...t, state: true }));
    setErrors((e) => ({ ...e, state: undefined }));
  };

  const stateError = touched.state && errors.state;
  const unitsError = touched.units && errors.units;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="calculator" className="py-10 md:py-14 relative overflow-hidden bg-black">
      <div ref={ref} className="container mx-auto px-3 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4 }} className="max-w-lg mx-auto">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 bg-metallic border-metallic text-white px-3 py-1 rounded-full text-xs font-semibold mb-4">
              <Sparkles className="w-3 h-3" />
              <span>2026 Updated</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">Calculate Your Bill</h2>
            <p className="text-sm text-white/50">Select state, enter units, get instant estimate</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="polished-metal border-metallic rounded-xl p-4 space-y-4 rim-light">
            <div className="space-y-2" data-error={stateError ? "" : undefined}>
              <label className="text-xs font-semibold flex items-center gap-1.5 text-white"><MapPin className="w-3 h-3" /> State</label>
              <Select value={state} onValueChange={handleStateChange}>
                <SelectTrigger className={`h-10 text-sm input-metallic ${stateError ? "border-red-500" : ""}`}>
                  <SelectValue placeholder="Choose your state..." />
                </SelectTrigger>
                <SelectContent className="bg-black border-metallic">
                  {STATES.map((s) => (<SelectItem key={s.value} value={s.value} className="text-sm text-white hover:bg-white/10">{s.label}</SelectItem>))}
                </SelectContent>
              </Select>
              {stateError && <p className="text-xs text-white/70 flex items-center gap-1"><Info className="w-3 h-3" />{errors.state}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold flex items-center gap-1.5 text-white"><Home className="w-3 h-3" /> Category</label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((c) => {
                  const Icon = c.icon;
                  return (
                    <button key={c.value} onClick={() => c.available && setCategory(c.value)} className={`px-3 py-2 rounded-lg text-xs font-medium transition-all btn-metallic ${category === c.value && c.available ? "text-black" : ""}`}>
                      <Icon className="w-3 h-3 inline mr-1" />{c.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold flex items-center gap-1.5 text-white"><Gauge className="w-3 h-3" /> Load</label>
              <div className="grid grid-cols-3 gap-2">
                {loadOptions.map((l) => (
                  <button key={l.value} onClick={() => setLoad(l.value)} className={`px-2 py-2 rounded-lg text-xs font-medium transition-all btn-metallic ${load === l.value ? "text-black" : ""}`}>{l.label}</button>
                ))}
              </div>
            </div>

            <div className="space-y-3" data-error={unitsError ? "" : undefined}>
              <label className="text-xs font-semibold flex items-center gap-1.5 text-white"><Zap className="w-3 h-3" /> Units (kWh)</label>
              <div className="relative">
                <Input type="number" placeholder="Enter units" min={0} max={9999} value={units || ""} onChange={(e) => handleUnitsChange(Number(e.target.value))} className={`h-11 text-center text-lg font-bold pr-10 input-metallic ${unitsError ? "border-red-500" : ""}`} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/50">kWh</span>
              </div>
              {unitsError && <p className="text-xs text-white/70 flex items-center gap-1"><Info className="w-3 h-3" />{errors.units}</p>}

              {currentSlabs && units > 0 && currentSlabIdx >= 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-metallic rounded-lg space-y-2 border-metallic">
                  <div className="flex items-center justify-center gap-2 text-xs">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span className="font-semibold text-white">Slab {currentSlabIdx + 1} @ ₹{currentSlabs[currentSlabIdx].rate.toFixed(2)}/unit</span>
                  </div>
                  <div className="flex h-4 rounded-lg overflow-hidden beveled">
                    {progress.map((pct, i) => (<div key={i} className="bg-metallic flex items-center justify-center text-[10px] font-bold text-white" style={{ width: `${100 / currentSlabs.length}%` }}>{pct > 20 ? `${Math.round(pct)}%` : ""}</div>))}
                  </div>
                </motion.div>
              )}

              <Slider value={[Math.min(units, 1000)]} max={1000} step={5} onValueChange={([v]) => handleUnitsChange(v)} className="py-1 [&>span]:bg-white [&>span]:h-1" />
              <div className="flex justify-between text-[10px] text-white/40"><span>0</span><span>500</span><span>1000+</span></div>
            </div>

            <button onClick={() => setShowPrevUnits(!showPrevUnits)} className="flex items-center justify-between w-full text-xs font-medium p-2 bg-metallic rounded-lg text-white">
              <span className="flex items-center gap-1.5">{showPrevUnits ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />} Compare month</span>
              <div className={`w-8 h-4 rounded-full flex items-center ${showPrevUnits ? "bg-white" : "bg-white/20"}`}><div className={`w-3 h-3 rounded-full bg-black shadow transform transition-transform ${showPrevUnits ? "translate-x-4" : "translate-x-0.5"}`} /></div>
            </button>
            {showPrevUnits && (<Input type="number" placeholder="Previous units" value={prevUnits} onChange={(e) => setPrevUnits(e.target.value)} className="h-9 text-sm input-metallic" />)}

            <Button size="lg" onClick={handleCalculate} disabled={loading} className="w-full h-11 text-sm font-bold rounded-lg btn-metallic text-black hover:bg-white/90">
              {loading ? (<><Zap className="w-4 h-4 mr-1.5 animate-spin" />Calculating...</>) : (<><Calculator className="w-4 h-4 mr-1.5" />Calculate<ArrowRight className="w-4 h-4 ml-1.5" /></>)}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CalculatorSection;