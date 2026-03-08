import { TARIFF_DATA } from "@/data/tariffData";
import { Card, CardContent } from "@/components/ui/card";

const tableRows = Object.values(TARIFF_DATA).map((s) => {
  const slabs = s.residential.slabs;
  const firstSlab = `0–${slabs[0].upTo} units @ ₹${slabs[0].rate}`;
  const rateRange = `₹${slabs[0].rate}–₹${slabs[slabs.length - 1].rate}/unit`;
  const fc = s.residential.fixedCharge;
  return { state: s.name, board: s.board, firstSlab, rateRange, fixed: `₹${fc.upTo1kW}–${fc.upto10kW}/kW/month` };
});

const TariffTableSection = () => (
  <section id="tariffs" className="py-12 md:py-16 bg-background">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">⚡ 2026 State-wise Electricity Tariff Rates</h2>
      <p className="text-center text-muted-foreground mb-8">Residential consumer rates — updated as of March 2026</p>

      <Card className="border-0 shadow-lg overflow-hidden max-w-5xl mx-auto">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-primary text-primary-foreground">
                <tr>
                  <th className="text-left p-3 font-medium">State</th>
                  <th className="text-left p-3 font-medium">Board</th>
                  <th className="text-left p-3 font-medium">First Slab</th>
                  <th className="text-left p-3 font-medium">Rate Range</th>
                  <th className="text-left p-3 font-medium">Fixed Charges</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((r, i) => (
                  <tr key={r.state} className={i % 2 === 0 ? "bg-muted/30" : ""}>
                    <td className="p-3 font-medium">{r.state}</td>
                    <td className="p-3">{r.board}</td>
                    <td className="p-3">{r.firstSlab}</td>
                    <td className="p-3">{r.rateRange}</td>
                    <td className="p-3">{r.fixed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      <p className="text-xs text-muted-foreground text-center mt-4 max-w-3xl mx-auto">
        * Rates are approximate residential tariffs. Fixed charges vary by connected load. Always verify with your DISCOM for exact billing.
      </p>
    </div>
  </section>
);

export default TariffTableSection;
