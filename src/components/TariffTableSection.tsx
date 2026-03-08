import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tariffRows = [
  { state: "Maharashtra", board: "MSEDCL", slab1: "0–100 @ ₹4.43", range: "₹4.43–₹14.33/unit", fixed: "₹75–200/kW", duty: "16%", highlight: true },
  { state: "Delhi", board: "BSES/TPDDL", slab1: "0–200 @ ₹3.00", range: "₹3.00–₹8.00/unit", fixed: "₹20–140/kW", duty: "5%" },
  { state: "Karnataka", board: "BESCOM", slab1: "0–50 @ ₹3.75", range: "₹3.75–₹7.25/unit", fixed: "₹70–180/kW", duty: "6%" },
  { state: "Gujarat", board: "UGVCL", slab1: "0–50 @ ₹3.10", range: "₹3.10–₹5.90/unit", fixed: "₹45–130/kW", duty: "20%" },
  { state: "Uttar Pradesh", board: "UPPCL", slab1: "0–100 @ ₹3.35", range: "₹3.35–₹6.00/unit", fixed: "₹70–150/kW", duty: "5%" },
  { state: "Tamil Nadu", board: "TNEB", slab1: "FREE", range: "₹0–₹4.00/unit", fixed: "₹30–120/kW", duty: "0%", free: true },
  { state: "Telangana", board: "TSSPDCL", slab1: "FREE", range: "₹1.45–₹7.20/unit", fixed: "₹25–160/kW", duty: "0%", free: true },
  { state: "West Bengal", board: "WBSEDCL", slab1: "0–75 @ ₹3.51", range: "₹3.51–₹6.71/unit", fixed: "₹60–140/kW", duty: "0%" },
  { state: "Rajasthan", board: "JVVNL", slab1: "0–50 @ ₹3.40", range: "₹3.40–₹6.30/unit", fixed: "₹65–145/kW", duty: "0%" },
  { state: "Madhya Pradesh", board: "MPCZ", slab1: "0–50 @ ₹3.34", range: "₹3.34–₹5.60/unit", fixed: "₹55–130/kW", duty: "0%" },
];

const TariffTableSection = () => (
  <section id="tariff-table" className="py-12 md:py-16 bg-background">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">⚡ 2026 State-wise Electricity Tariff Reference</h2>
          <p className="text-muted-foreground mb-3">Residential consumer rates — sourced from official DISCOM tariff orders</p>
          <span className="inline-flex items-center gap-1.5 border border-accent text-accent px-3 py-1 rounded-full text-xs font-medium">
            Last updated: March 2026
          </span>
        </div>

        <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="text-left p-3 font-medium whitespace-nowrap">State</th>
                    <th className="text-left p-3 font-medium whitespace-nowrap">Board</th>
                    <th className="text-left p-3 font-medium whitespace-nowrap">Slab 1 (Cheapest)</th>
                    <th className="text-left p-3 font-medium whitespace-nowrap">Rate Range</th>
                    <th className="text-left p-3 font-medium whitespace-nowrap">Fixed Charges</th>
                    <th className="text-left p-3 font-medium whitespace-nowrap">Duty</th>
                  </tr>
                </thead>
                <tbody>
                  {tariffRows.map((row, i) => (
                    <tr
                      key={row.state}
                      className={`border-b transition-colors hover:bg-muted/50 ${
                        row.highlight
                          ? "bg-accent/5 border-l-2 border-l-accent"
                          : i % 2 === 0
                          ? "bg-muted/20"
                          : ""
                      }`}
                    >
                      <td className="p-3 font-medium whitespace-nowrap">{row.state}</td>
                      <td className="p-3 text-muted-foreground whitespace-nowrap">{row.board}</td>
                      <td className="p-3 whitespace-nowrap">
                        {row.free ? (
                          <span className="bg-success/15 text-success text-xs font-semibold px-2 py-0.5 rounded-full">🆓 FREE</span>
                        ) : (
                          row.slab1
                        )}
                      </td>
                      <td className="p-3 whitespace-nowrap">{row.range}</td>
                      <td className="p-3 whitespace-nowrap">{row.fixed}</td>
                      <td className="p-3 whitespace-nowrap">{row.duty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <div className="mt-6 bg-primary/5 border border-primary/20 rounded-xl p-4 text-sm space-y-2">
          <p className="font-medium">ℹ️ Disclaimer</p>
          <p className="text-muted-foreground leading-relaxed">
            Rates shown are approximate residential tariffs for general service consumers.
            Actual bills may differ due to meter rent, regulatory surcharge, fuel adjustment charges,
            special category subsidies (BPL, SC/ST), or periodic MERC/SERC revisions.
            Always verify with your State DISCOM for exact current tariffs.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-6 text-center">
          <a href="#calculator">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 text-base px-6 py-5 rounded-xl">
              ⚡ Calculate bill for your state →
            </Button>
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default TariffTableSection;
