import { useState } from "react";
import { Plus, Trash2, ArrowUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DEFAULT_APPLIANCES } from "@/data/tariffData";

interface Appliance {
  id: string;
  name: string;
  wattage: number;
  hours: number;
  days: number;
  icon: string;
}

interface ApplianceSectionProps {
  onUseUnits: (units: number) => void;
}

const ApplianceSection = ({ onUseUnits }: ApplianceSectionProps) => {
  const [appliances, setAppliances] = useState<Appliance[]>(
    DEFAULT_APPLIANCES.map((a) => ({ ...a }))
  );

  const calcUnits = (a: Appliance) => Math.round(((a.wattage * a.hours * a.days) / 1000) * 100) / 100;
  const totalUnits = Math.round(appliances.reduce((sum, a) => sum + calcUnits(a), 0));

  const updateAppliance = (id: string, field: keyof Appliance, value: string | number) => {
    setAppliances((prev) =>
      prev.map((a) => (a.id === id ? { ...a, [field]: typeof value === "string" && field !== "name" ? Number(value) : value } : a))
    );
  };

  const addCustom = () => {
    setAppliances((prev) => [
      ...prev,
      { id: Date.now().toString(), name: "Custom Appliance", wattage: 100, hours: 1, days: 30, icon: "🔌" },
    ]);
  };

  const remove = (id: string) => setAppliances((prev) => prev.filter((a) => a.id !== id));

  return (
    <section id="appliances" className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">📱 Calculate by Appliances</h2>
          <p className="text-center text-muted-foreground mb-8">Don't know your units? Add your appliances and we'll estimate!</p>

          <Card className="shadow-lg border-0 overflow-hidden">
            <CardContent className="p-0">
              {/* Header - hidden on mobile, shown on md+ */}
              <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] gap-2 p-3 bg-muted text-sm font-medium">
                <span>Appliance</span><span>Watts</span><span>Hrs/Day</span><span>Days</span><span>kWh</span><span></span>
              </div>

              {appliances.map((a) => (
                <div key={a.id} className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] gap-2 p-3 border-b items-center">
                  <div className="col-span-2 md:col-span-1 flex items-center gap-2">
                    <span>{a.icon}</span>
                    <Input value={a.name} onChange={(e) => updateAppliance(a.id, "name", e.target.value)} className="h-8 text-sm" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground md:hidden">Watts</span>
                    <Input type="number" value={a.wattage} onChange={(e) => updateAppliance(a.id, "wattage", e.target.value)} className="h-8 text-sm" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground md:hidden">Hrs/Day</span>
                    <Input type="number" value={a.hours} onChange={(e) => updateAppliance(a.id, "hours", e.target.value)} className="h-8 text-sm" step="0.5" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground md:hidden">Days</span>
                    <Input type="number" value={a.days} onChange={(e) => updateAppliance(a.id, "days", e.target.value)} className="h-8 text-sm" />
                  </div>
                  <div className="font-semibold text-sm">{calcUnits(a)} kWh</div>
                  <Button variant="ghost" size="icon" onClick={() => remove(a.id)} className="h-8 w-8 text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}

              <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-muted/50">
                <Button variant="outline" size="sm" onClick={addCustom} className="gap-1">
                  <Plus className="w-4 h-4" /> Add Custom Appliance
                </Button>
                <p className="font-bold text-lg">Total: {totalUnits} kWh/month</p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-4 text-center">
            <Button
              onClick={() => {
                onUseUnits(totalUnits);
                document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
            >
              <ArrowUp className="w-4 h-4" /> Use These Units in Calculator
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplianceSection;
