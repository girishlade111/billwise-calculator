import { useState, useEffect } from "react";
import { Zap, Loader2, Lock, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { STATES, TARIFF_DATA } from "@/data/tariffData";

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

  return (
    <section id="calculator" className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 border border-accent text-accent px-3 py-1 rounded-full text-xs font-medium mb-4">
              ⚡ Tariff data last updated: March 2026
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Calculate Your Electricity Bill</h2>
            <p className="text-muted-foreground">Select your state, enter units consumed, and get an instant estimate</p>
          </div>

          {/* State Selection */}
          <div className="rounded-xl border bg-card shadow-sm p-4 mb-4" data-error={stateError ? "" : undefined}>
            <label className="text-sm font-medium mb-2 block">📍 Select Your State</label>
            <Select value={state} onValueChange={handleStateChange}>
              <SelectTrigger className={`h-11 ${stateError ? "border-destructive ring-1 ring-destructive" : ""}`}>
                <SelectValue placeholder="-- Select a State --" />
              </SelectTrigger>
              <SelectContent>
                {STATES.map((s) => (
                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {stateError && <p className="text-xs text-destructive mt-1.5">{errors.state}</p>}
          </div>

          {/* Consumer Category - Toggle Buttons */}
          <div className="rounded-xl border bg-card shadow-sm p-4 mb-4">
            <label className="text-sm font-medium mb-2 block">🏠 Consumer Category</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {categories.map((c) => (
                <button
                  key={c.value}
                  onClick={() => c.available && setCategory(c.value)}
                  className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    category === c.value && c.available
                      ? "bg-accent text-accent-foreground shadow-sm"
                      : c.available
                      ? "border border-border text-muted-foreground hover:border-accent hover:text-foreground"
                      : "border border-border text-muted-foreground/50 cursor-not-allowed"
                  }`}
                  disabled={!c.available}
                  title={!c.available ? "Coming Soon" : undefined}
                >
                  {c.label}
                  {!c.available && (
                    <span className="flex items-center justify-center gap-1 text-[10px] mt-0.5 opacity-60">
                      <Lock className="w-3 h-3" /> Coming Soon
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Connected Load - Toggle Buttons */}
          <div className="rounded-xl border bg-card shadow-sm p-4 mb-4">
            <label className="text-sm font-medium mb-2 block">🔌 Your Connected Load (Sanctioned Load)</label>
            <div className="grid grid-cols-3 gap-2">
              {loadOptions.map((l) => (
                <button
                  key={l.value}
                  onClick={() => setLoad(l.value)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    load === l.value
                      ? "bg-accent text-accent-foreground shadow-sm"
                      : "border border-border text-muted-foreground hover:border-accent hover:text-foreground"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">Find this on your electricity bill or meter box</p>
          </div>

          {/* Units Input */}
          <div className="rounded-xl border bg-card shadow-sm p-4 mb-4" data-error={unitsError ? "" : undefined}>
            <label className="text-sm font-medium mb-2 block">📊 Units Consumed This Month (kWh)</label>
            <Input
              type="number"
              placeholder="e.g. 245"
              min={0}
              max={9999}
              value={units || ""}
              onChange={(e) => handleUnitsChange(Number(e.target.value))}
              className={`text-2xl h-14 font-semibold transition-colors ${
                unitsError
                  ? "border-destructive ring-1 ring-destructive focus-visible:ring-destructive"
                  : "focus-visible:ring-accent focus-visible:border-accent"
              }`}
            />
            {unitsError ? (
              <p className="text-xs text-destructive mt-1.5">{errors.units}</p>
            ) : (
              <p className="text-xs text-muted-foreground mt-1.5">Enter the units from your meter reading or electricity bill</p>
            )}

            {/* Live Slab Indicator */}
            {currentSlabs && units > 0 && currentSlabIdx >= 0 && (
              <div className="mt-4 space-y-3 animate-fade-in">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-muted`}>
                  <div className={`w-3 h-3 rounded-full ${slabBgColors[currentSlabIdx]}`} />
                  <p className={`text-sm font-medium ${slabColorClasses[currentSlabIdx]}`}>
                    You are currently in Slab {currentSlabIdx + 1} (₹{currentSlabs[currentSlabIdx].rate.toFixed(2)}/unit)
                  </p>
                </div>

                <div className="flex h-4 rounded-full overflow-hidden bg-muted">
                  {progress.map((pct, i) => (
                    <div
                      key={i}
                      className={`${slabBgColors[i]} transition-all duration-500`}
                      style={{ width: `${100 / currentSlabs.length}%`, opacity: pct > 0 ? 1 : 0.15 }}
                    >
                      <div className={`${slabBgColors[i]} h-full transition-all duration-500`} style={{ width: `${pct}%` }} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Synced Slider */}
            <div className="mt-4">
              <Slider
                value={[Math.min(units, 1000)]}
                max={1000}
                step={5}
                onValueChange={([v]) => handleUnitsChange(v)}
                className="py-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span><span>500</span><span>1000</span>
              </div>
            </div>
          </div>

          {/* Previous Month - Collapsible */}
          <div className="rounded-xl border bg-card shadow-sm p-4 mb-6">
            <button
              onClick={() => setShowPrevUnits(!showPrevUnits)}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors w-full"
            >
              {showPrevUnits ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  ➖ Hide comparison
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  ➕ Add previous month for comparison
                </>
              )}
            </button>
            {showPrevUnits && (
              <div className="mt-3 animate-fade-in">
                <label className="text-sm font-medium mb-1.5 block">📅 Previous Month Units (Optional)</label>
                <Input
                  type="number"
                  placeholder="e.g. 300"
                  min={0}
                  max={9999}
                  value={prevUnits}
                  onChange={(e) => setPrevUnits(e.target.value)}
                  className="h-11 focus-visible:ring-accent focus-visible:border-accent"
                />
              </div>
            )}
          </div>

          {/* Calculate Button */}
          <Button
            size="lg"
            onClick={handleCalculate}
            disabled={loading}
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-6 rounded-xl font-semibold shadow-lg transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Calculating...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 mr-2" />
                Calculate My Bill
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;
