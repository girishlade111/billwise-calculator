import { useState, useRef, useEffect } from "react";
import { Plus, Trash2, ArrowUp, RotateCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface Appliance {
  id: string;
  name: string;
  icon: string;
  watts: number;
  hours: number;
  days: number;
}

const defaultAppliances: Appliance[] = [
  { id: "1", name: "LED Bulb", icon: "💡", watts: 9, hours: 6, days: 30 },
  { id: "2", name: "Ceiling Fan", icon: "🌀", watts: 75, hours: 12, days: 30 },
  { id: "3", name: "Air Conditioner (1.5T)", icon: "❄️", watts: 1500, hours: 8, days: 30 },
  { id: "4", name: "Refrigerator", icon: "🧊", watts: 150, hours: 24, days: 30 },
  { id: "5", name: "Washing Machine", icon: "👕", watts: 500, hours: 1, days: 30 },
  { id: "6", name: "Television", icon: "📺", watts: 100, hours: 5, days: 30 },
  { id: "7", name: "Water Heater/Geyser", icon: "🚿", watts: 2000, hours: 0.25, days: 30 },
  { id: "8", name: "Laptop/Computer", icon: "💻", watts: 65, hours: 8, days: 30 },
  { id: "9", name: "Water Pump/Motor", icon: "⚙️", watts: 750, hours: 2, days: 30 },
  { id: "10", name: "Microwave Oven", icon: "🍳", watts: 800, hours: 0.5, days: 30 },
];

interface ApplianceSectionProps {
  onUseUnits: (units: number) => void;
}

const ApplianceSection = ({ onUseUnits }: ApplianceSectionProps) => {
  const [appliances, setAppliances] = useState<Appliance[]>(defaultAppliances.map((a) => ({ ...a })));
  const newRowRef = useRef<HTMLInputElement>(null);
  const [justAdded, setJustAdded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (justAdded && newRowRef.current) {
      newRowRef.current.focus();
      newRowRef.current.select();
      setJustAdded(false);
    }
  }, [justAdded, appliances.length]);

  const calcUnits = (a: Appliance) => Math.round(((a.watts * a.hours * a.days) / 1000) * 100) / 100;
  const totalUnits = Math.round(appliances.reduce((sum, a) => sum + calcUnits(a), 0) * 10) / 10;
  const estimatedCost = Math.round(totalUnits * 7);

  const updateAppliance = (id: string, field: keyof Appliance, value: string | number) => {
    setAppliances((prev) =>
      prev.map((a) => {
        if (a.id !== id) return a;
        if (field === "name" || field === "icon" || field === "id") return { ...a, [field]: value };
        return { ...a, [field]: Number(value) };
      })
    );
  };

  const addCustom = () => {
    const newId = Date.now().toString();
    setAppliances((prev) => [
      ...prev,
      { id: newId, name: "New Appliance", icon: "🔌", watts: 100, hours: 1, days: 30 },
    ]);
    setJustAdded(true);
  };

  const remove = (id: string) => setAppliances((prev) => prev.filter((a) => a.id !== id));
  const reset = () => setAppliances(defaultAppliances.map((a) => ({ ...a })));

  const progressPct = Math.min((totalUnits / 500) * 100, 100);
  const progressColor = totalUnits < 150 ? "bg-success" : totalUnits < 300 ? "bg-accent" : totalUnits < 500 ? "bg-warning" : "bg-destructive";

  const handleUseUnits = () => {
    onUseUnits(Math.round(totalUnits));
    document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
    toast({
      title: "✅ Units filled in calculator!",
      description: "Now select your state and click Calculate.",
    });
  };

  return (
    <section id="appliances" className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">📱 Don't Know Your Units? Calculate by Appliances</h2>
            <p className="text-muted-foreground">Add your home appliances and we'll estimate your monthly units consumed</p>
          </div>

          <Card className="shadow-lg border-0 overflow-hidden">
            <CardContent className="p-0">
              {/* Desktop header */}
              <div className="hidden md:grid grid-cols-[2fr_80px_80px_70px_80px_40px] gap-2 p-3 bg-muted text-xs font-medium text-muted-foreground">
                <span>Appliance</span><span>Watts</span><span>Hrs/Day</span><span>Days</span><span>Units</span><span></span>
              </div>

              {appliances.map((a, idx) => {
                const units = calcUnits(a);
                const isLast = idx === appliances.length - 1;
                return (
                  <div key={a.id} className="border-b last:border-b-0 p-3">
                    {/* Desktop row */}
                    <div className="hidden md:grid grid-cols-[2fr_80px_80px_70px_80px_40px] gap-2 items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{a.icon}</span>
                        <Input
                          ref={isLast && justAdded ? newRowRef : undefined}
                          value={a.name}
                          onChange={(e) => updateAppliance(a.id, "name", e.target.value)}
                          className="h-8 text-sm"
                          aria-label={`Appliance name: ${a.name}`}
                        />
                      </div>
                      <Input type="number" min={1} max={10000} value={a.watts} onChange={(e) => updateAppliance(a.id, "watts", e.target.value)} className="h-8 text-sm" aria-label={`Watts for ${a.name}`} />
                      <Input type="number" min={0} max={24} step={0.25} value={a.hours} onChange={(e) => updateAppliance(a.id, "hours", e.target.value)} className="h-8 text-sm" aria-label={`Hours per day for ${a.name}`} />
                      <Input type="number" min={1} max={31} value={a.days} onChange={(e) => updateAppliance(a.id, "days", e.target.value)} className="h-8 text-sm" aria-label={`Days per month for ${a.name}`} />
                      <span className="bg-accent/15 text-accent-foreground text-xs font-semibold px-2 py-1 rounded-full text-center">{units} kWh</span>
                      <Button variant="ghost" size="icon" onClick={() => remove(a.id)} className="h-8 w-8 text-muted-foreground hover:text-destructive" aria-label={`Remove ${a.name}`}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Mobile row */}
                    <div className="md:hidden space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span className="text-lg">{a.icon}</span>
                          <Input
                            ref={isLast && justAdded ? newRowRef : undefined}
                            value={a.name}
                            onChange={(e) => updateAppliance(a.id, "name", e.target.value)}
                            className="h-8 text-sm"
                            aria-label={`Appliance name: ${a.name}`}
                          />
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => remove(a.id)} className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0" aria-label={`Remove ${a.name}`}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <span className="text-[10px] text-muted-foreground">Watts</span>
                          <Input type="number" min={1} max={10000} value={a.watts} onChange={(e) => updateAppliance(a.id, "watts", e.target.value)} className="h-8 text-sm" aria-label={`Watts for ${a.name}`} />
                        </div>
                        <div>
                          <span className="text-[10px] text-muted-foreground">Hrs/Day</span>
                          <Input type="number" min={0} max={24} step={0.25} value={a.hours} onChange={(e) => updateAppliance(a.id, "hours", e.target.value)} className="h-8 text-sm" aria-label={`Hours for ${a.name}`} />
                        </div>
                        <div>
                          <span className="text-[10px] text-muted-foreground">Days</span>
                          <Input type="number" min={1} max={31} value={a.days} onChange={(e) => updateAppliance(a.id, "days", e.target.value)} className="h-8 text-sm" aria-label={`Days for ${a.name}`} />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-muted-foreground">(watts × hrs × days ÷ 1000)</span>
                        <span className="bg-accent/15 text-accent-foreground text-xs font-semibold px-2 py-1 rounded-full">{units} kWh</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Add / Reset Buttons */}
          <div className="flex flex-wrap gap-2 mt-3">
            <Button variant="outline" onClick={addCustom} className="gap-1.5 border-dashed flex-1 min-w-[160px]">
              <Plus className="w-4 h-4" /> Add Custom Appliance
            </Button>
            <Button variant="outline" size="sm" onClick={reset} className="gap-1.5 text-muted-foreground">
              <RotateCcw className="w-3.5 h-3.5" /> Reset to Defaults
            </Button>
          </div>

          {/* Total Bar */}
          <Card className="mt-6 border-0 shadow-lg">
            <CardContent className="p-5">
              <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-3">
                <p className="text-sm font-medium text-muted-foreground">Total Estimated Monthly Consumption:</p>
                <div className="text-center md:text-right">
                  <p className="text-3xl font-bold text-accent">{totalUnits} kWh</p>
                  <p className="text-xs text-muted-foreground">At average ₹7/unit ≈ ₹{estimatedCost.toLocaleString("en-IN")}/month</p>
                </div>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full ${progressColor} transition-all duration-500 rounded-full`}
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                <span>0</span><span>100</span><span>200</span><span>300</span><span>400</span><span>500+</span>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <Button
            onClick={handleUseUnits}
            className="w-full mt-4 bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-6 rounded-xl font-semibold shadow-lg transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] gap-2"
            size="lg"
          >
            <ArrowUp className="w-5 h-5" /> Use These Units in Bill Calculator ↑
          </Button>

          {/* Tips Info Box */}
          <div className="mt-6 bg-primary/5 border border-primary/20 rounded-xl p-4 text-sm space-y-1.5">
            <p className="font-medium">💡 Tips for accurate calculation:</p>
            <ul className="space-y-1 text-muted-foreground list-disc list-inside">
              <li>AC runs only in summer months — adjust days accordingly</li>
              <li>Geyser uses power in short bursts — 15 mins = 0.25 hours</li>
              <li>Refrigerator runs 24/7 but cycles on/off — actual consumption is ~40-50% of rated wattage</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplianceSection;
