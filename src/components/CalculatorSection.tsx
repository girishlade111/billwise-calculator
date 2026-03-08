import { useState, useEffect } from "react";
import { Zap, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { STATES, CATEGORIES, LOAD_OPTIONS, TARIFF_DATA } from "@/data/tariffData";

interface CalculatorSectionProps {
  onCalculate: (state: string, load: string, units: number, prevUnits?: number) => void;
  autoFillUnits?: number | null;
  onAutoFillConsumed?: () => void;
}

const CalculatorSection = ({ onCalculate, autoFillUnits, onAutoFillConsumed }: CalculatorSectionProps) => {
  const [state, setState] = useState("");
  const [category, setCategory] = useState("residential");
  const [load, setLoad] = useState("upto3kW");
  const [units, setUnits] = useState<number>(0);
  const [prevUnits, setPrevUnits] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Validation errors
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

  const slabColors = ["bg-success", "bg-accent", "bg-warning", "bg-destructive", "bg-destructive"];
  const progress = getSlabProgress();

  const handleCalculate = () => {
    setTouched({ state: true, units: true });
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

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
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">⚡ Electricity Bill Calculator</h2>
          <p className="text-center text-muted-foreground mb-8">Select your state, enter units, and get your bill instantly</p>

          <Card className="shadow-lg border-0 transition-shadow duration-300 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg">Step 1 — Select State & Category</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Select Your State</label>
                <Select value={state} onValueChange={handleStateChange}>
                  <SelectTrigger className={stateError ? "border-destructive ring-destructive" : ""}>
                    <SelectValue placeholder="Choose state..." />
                  </SelectTrigger>
                  <SelectContent>
                    {STATES.map((s) => (
                      <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {stateError && <p className="text-xs text-destructive mt-1">{errors.state}</p>}
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">Consumer Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c.value} value={c.value} disabled={c.comingSoon}>
                        {c.label} {c.comingSoon ? "(Coming Soon)" : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">Connected Load</label>
                <Select value={load} onValueChange={setLoad}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {LOAD_OPTIONS.map((l) => (
                      <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 mt-4 transition-shadow duration-300 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg">Step 2 — Enter Units Consumed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Units Consumed This Month (kWh)</label>
                <Input
                  type="number"
                  placeholder="e.g. 245"
                  min={0}
                  max={9999}
                  value={units || ""}
                  onChange={(e) => handleUnitsChange(Number(e.target.value))}
                  className={`text-lg h-12 transition-colors ${unitsError ? "border-destructive ring-destructive focus-visible:ring-destructive" : ""}`}
                />
                {unitsError ? (
                  <p className="text-xs text-destructive mt-1">{errors.units}</p>
                ) : (
                  <p className="text-xs text-muted-foreground mt-1">Check your meter or last bill for unit reading</p>
                )}
              </div>

              <Slider
                value={[Math.min(units, 1000)]}
                max={1000}
                step={1}
                onValueChange={([v]) => handleUnitsChange(v)}
                className="py-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span><span>250</span><span>500</span><span>750</span><span>1000</span>
              </div>

              {currentSlabs && units > 0 && (
                <div className="space-y-2 animate-fade-in">
                  <p className="text-sm font-medium">Slab Indicator</p>
                  <div className="flex h-4 rounded-full overflow-hidden bg-muted">
                    {progress.map((pct, i) => (
                      <div
                        key={i}
                        className={`${slabColors[i]} transition-all duration-500`}
                        style={{ width: `${100 / currentSlabs.length}%`, opacity: pct > 0 ? 1 : 0.2 }}
                      >
                        <div className={`${slabColors[i]} h-full transition-all duration-500`} style={{ width: `${pct}%` }} />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    You are in Slab {progress.filter(p => p > 0).length} — ₹{currentSlabs[progress.filter(p => p > 0).length - 1]?.rate}/unit
                  </p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium mb-1.5 block">Previous Month Units (optional, for comparison)</label>
                <Input
                  type="number"
                  placeholder="e.g. 300"
                  min={0}
                  max={9999}
                  value={prevUnits}
                  onChange={(e) => setPrevUnits(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Button
            size="lg"
            onClick={handleCalculate}
            disabled={loading}
            className="w-full mt-6 bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-6 rounded-xl font-semibold shadow-lg transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
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
