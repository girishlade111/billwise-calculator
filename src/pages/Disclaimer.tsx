import { Zap, ArrowLeft, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const DisclaimerPage = () => (
  <div className="min-h-screen bg-background">
    <header className="bg-primary text-primary-foreground py-8">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center gap-2 text-sm opacity-80 hover:opacity-100 mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Calculator
        </Link>
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-accent text-accent-foreground p-2 rounded-lg">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold">Disclaimer</h1>
        </div>
        <p className="text-sm opacity-70">Last updated: March 8, 2026</p>
      </div>
    </header>

    <main className="container mx-auto px-4 py-12 max-w-3xl">
      {/* Important Notice */}
      <Card className="border-2 border-accent/40 shadow-lg mb-10">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-accent shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-lg mb-2">Important Notice</p>
              <p className="text-muted-foreground leading-relaxed">
                BillMeter is a <strong>free estimation tool</strong> designed to help Indian consumers understand their electricity bills. The estimates provided are <strong>approximate</strong> and should <strong>not</strong> be treated as official bill amounts. Always verify with your state DISCOM (Distribution Company) for exact billing details.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-xl font-bold mt-8 mb-3">1. Estimation Accuracy</h2>
      <p className="text-muted-foreground leading-relaxed">
        BillMeter calculates electricity bill estimates based on publicly available tariff data from State Electricity Regulatory Commissions (SERCs) and state DISCOMs. Our estimates are typically within <strong>2–5% of actual DISCOM bills</strong> for standard residential consumers.
      </p>
      <p className="text-muted-foreground leading-relaxed mt-3">
        However, the following factors can cause differences between BillMeter estimates and your actual bill:
      </p>
      <ul className="space-y-2 text-muted-foreground mt-3">
        <li className="flex items-start gap-2">
          <span className="text-accent font-bold">•</span>
          <span><strong>Meter Rent:</strong> DISCOMs charge ₹15–₹30/month for meter maintenance, which BillMeter does not include.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-accent font-bold">•</span>
          <span><strong>Regulatory Surcharges:</strong> Some states levy additional surcharges (regulatory surcharge, cross-subsidy surcharge) not reflected in basic tariff orders.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-accent font-bold">•</span>
          <span><strong>Wheeling & Transmission Charges:</strong> Open access consumers may have additional charges.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-accent font-bold">•</span>
          <span><strong>Special Subsidies:</strong> BPL consumers, SC/ST households, farmers, and freedom fighters may receive subsidized rates not modeled in BillMeter.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-accent font-bold">•</span>
          <span><strong>Billing Cycle Variations:</strong> Your actual bill may cover 28–35 days depending on meter reading schedules, not exactly 30 days.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-accent font-bold">•</span>
          <span><strong>Mid-Year Tariff Revisions:</strong> SERCs may issue interim tariff revisions that haven't been updated in BillMeter yet.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-accent font-bold">•</span>
          <span><strong>Arrears & Adjustments:</strong> Your bill may include pending arrears, security deposit adjustments, or credits from previous periods.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-accent font-bold">•</span>
          <span><strong>Power Factor Penalties:</strong> Industrial and high-load consumers may face power factor penalties.</span>
        </li>
      </ul>

      <h2 className="text-xl font-bold mt-8 mb-3">2. Tariff Data Sources</h2>
      <p className="text-muted-foreground leading-relaxed">
        All tariff data used in BillMeter is sourced from official, publicly available documents:
      </p>
      <ul className="space-y-1 text-muted-foreground mt-2">
        <li>• MERC (Maharashtra Electricity Regulatory Commission) tariff orders</li>
        <li>• DERC (Delhi Electricity Regulatory Commission) tariff schedules</li>
        <li>• KERC (Karnataka Electricity Regulatory Commission) orders</li>
        <li>• GERC (Gujarat Electricity Regulatory Commission) notifications</li>
        <li>• UPERC, TNERC, TSERC, WBERC, RERC, MPERC tariff orders</li>
        <li>• Official DISCOM websites and annual tariff filings</li>
      </ul>
      <p className="text-muted-foreground leading-relaxed mt-3">
        <strong>Current data reflects:</strong> FY 2025–26 tariff orders as published by March 2026. We aim to update tariff data within 30 days of new SERC notifications, but delays may occur.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-3">3. No Affiliation with Government Bodies</h2>
      <p className="text-muted-foreground leading-relaxed">
        BillMeter is an <strong>independent, private tool</strong> developed by Lade Stack. We are:
      </p>
      <ul className="space-y-1 text-muted-foreground mt-2">
        <li>• <strong>NOT affiliated</strong> with any DISCOM (MSEDCL, BSES, BESCOM, etc.)</li>
        <li>• <strong>NOT endorsed</strong> by any State Electricity Regulatory Commission</li>
        <li>• <strong>NOT connected</strong> to the Ministry of Power, Government of India</li>
        <li>• <strong>NOT an official</strong> bill generation or payment tool</li>
      </ul>
      <p className="text-muted-foreground leading-relaxed mt-2">
        BillMeter cannot be used as proof of billing or to dispute bills with your DISCOM. For official matters, always contact your DISCOM directly.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-3">4. Consumer Category Limitations</h2>
      <p className="text-muted-foreground leading-relaxed">
        BillMeter currently supports:
      </p>
      <ul className="space-y-1 text-muted-foreground mt-2">
        <li>• ✅ <strong>Residential (LT-I / Domestic)</strong> — Fully supported for all 10 states</li>
        <li>• ⚠️ <strong>Commercial (LT-II)</strong> — Basic support, coming soon with full accuracy</li>
        <li>• ❌ <strong>Agricultural</strong> — Not yet supported (complex subsidy structures)</li>
        <li>• ❌ <strong>Industrial (HT)</strong> — Not yet supported (ToD tariffs, demand charges)</li>
        <li>• ❌ <strong>Temporary / Construction</strong> — Not supported</li>
      </ul>
      <p className="text-muted-foreground leading-relaxed mt-2">
        If you are a non-residential consumer, BillMeter results will not be accurate for your tariff category.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-3">5. Appliance Calculator Disclaimer</h2>
      <p className="text-muted-foreground leading-relaxed">
        The appliance-based unit estimation feature provides <strong>approximate consumption values</strong> based on rated wattage. Actual consumption may differ because:
      </p>
      <ul className="space-y-1 text-muted-foreground mt-2">
        <li>• Appliances rarely run at full rated wattage (especially inverter ACs, refrigerators)</li>
        <li>• Usage patterns vary by season, family size, and lifestyle</li>
        <li>• Voltage fluctuations can affect actual power draw</li>
        <li>• Standby power consumption is not included in calculations</li>
        <li>• Star ratings significantly impact actual consumption (5-star vs 1-star)</li>
      </ul>

      <h2 className="text-xl font-bold mt-8 mb-3">6. Saving Tips Disclaimer</h2>
      <p className="text-muted-foreground leading-relaxed">
        The electricity saving tips provided on BillMeter are for <strong>general informational purposes only</strong>. Savings estimates are approximate and may vary based on your specific usage patterns, local conditions, and appliance efficiency. Before making significant investments (solar panels, BLDC fans, etc.), we recommend consulting local vendors and verifying current government subsidy schemes on official portals.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-3">7. Financial Decisions</h2>
      <p className="text-muted-foreground leading-relaxed">
        Do not make financial decisions solely based on BillMeter estimates. This includes but is not limited to:
      </p>
      <ul className="space-y-1 text-muted-foreground mt-2">
        <li>• Budgeting or financial planning for utility costs</li>
        <li>• Investment decisions for solar panels or energy-efficient appliances</li>
        <li>• Rental or property decisions based on estimated utility costs</li>
        <li>• Business operational cost calculations</li>
      </ul>
      <p className="text-muted-foreground leading-relaxed mt-2">
        Always consult with your DISCOM and consider professional advice for significant financial decisions related to electricity costs.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-3">8. Service Availability</h2>
      <p className="text-muted-foreground leading-relaxed">
        BillMeter is provided on an "as is" and "as available" basis. We do not guarantee uninterrupted access or that the tool will be free from errors. We reserve the right to modify, suspend, or discontinue the service at any time without notice.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-3">9. Verify Before Acting</h2>
      <Card className="border-2 border-success/40 mt-4">
        <CardContent className="p-5">
          <p className="font-semibold mb-2">✅ We Recommend:</p>
          <ul className="space-y-1.5 text-muted-foreground text-sm">
            <li>1. Use BillMeter to get a quick estimate and understand your bill structure.</li>
            <li>2. Compare the estimate with your actual DISCOM bill.</li>
            <li>3. If there's a significant difference (more than 10%), contact your DISCOM.</li>
            <li>4. For official bill verification, visit your DISCOM's website or app.</li>
            <li>5. For government schemes (solar subsidy, free electricity), verify on official portals.</li>
          </ul>
        </CardContent>
      </Card>

      <h2 className="text-xl font-bold mt-8 mb-3">10. Contact for Corrections</h2>
      <p className="text-muted-foreground leading-relaxed">
        If you find any incorrect tariff data, calculation errors, or outdated information on BillMeter, please report it to us immediately:
      </p>
      <ul className="space-y-1 text-muted-foreground mt-2">
        <li>• <strong>Email:</strong> corrections@ladestack.in</li>
        <li>• Include: State name, current rate on BillMeter, correct rate with source link</li>
      </ul>
      <p className="text-muted-foreground leading-relaxed mt-2">
        We appreciate community contributions to keep BillMeter accurate and up-to-date.
      </p>

      <div className="text-center mt-12">
        <Link to="/">
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6 rounded-xl font-semibold gap-2">
            <Zap className="w-5 h-5" /> Back to Calculator →
          </Button>
        </Link>
      </div>
    </main>

    <footer className="bg-primary text-primary-foreground py-6 mt-12">
      <div className="container mx-auto px-4 text-center text-sm opacity-70">
        <p>© 2026 Lade Stack — <a href="https://ladestack.in" className="underline">ladestack.in</a></p>
      </div>
    </footer>
  </div>
);

export default DisclaimerPage;
