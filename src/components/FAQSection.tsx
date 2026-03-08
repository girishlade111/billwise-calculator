import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    q: "How is electricity bill calculated in Maharashtra?",
    a: "Maharashtra uses a progressive slab system by MSEDCL. First 100 units cost ₹4.43/unit. Units 101–300 cost ₹9.64/unit. Units 301–500 cost ₹12.83/unit. Above 500 units cost ₹14.33/unit. These are cumulative — each slab rate applies only to units in that range. Then Fixed Charges (₹75–₹200/kW/month), Fuel Surcharge (₹0.41/unit), and Electricity Duty (16% of energy charges) are added."
  },
  {
    q: "What is the minimum bill in MSEDCL if I consume 0 units?",
    a: "Even with zero consumption, MSEDCL charges a minimum Fixed Charge based on your sanctioned/connected load. For loads up to 1kW: ₹75/month. For 1–3kW: ₹130/month. For 3–10kW: ₹200/month. This covers meter rent and maintenance."
  },
  {
    q: "What is Electricity Duty in Maharashtra?",
    a: "Electricity Duty (ED) is a state government tax levied on electricity consumption. In Maharashtra, it is approximately 16% of energy charges for residential consumers. It is charged on top of energy charges and fixed charges. This is separate from GST (electricity itself is exempt from GST)."
  },
  {
    q: "What is Fuel Surcharge (Fuel Adjustment Charge)?",
    a: "Fuel Adjustment Charge (FAC) or Fuel Surcharge is levied by MSEDCL to recover the variable cost of fuel (coal, gas) used in power generation. In Maharashtra, it is currently ₹0.41/unit for residential consumers. This amount changes quarterly based on actual fuel costs."
  },
  {
    q: "How do I check my MSEDCL bill online?",
    a: "Visit mahadiscom.in → Consumer Services → View/Pay Bill. Enter your 12-digit consumer number printed on your bill. You can also: (1) Use the Mahadiscom mobile app, (2) WhatsApp your consumer number to 9930099300, (3) Call helpline 1800-200-3435 (toll-free), (4) Use Paytm/PhonePe/BHIM with consumer number."
  },
  {
    q: "Why is my bill so high even with fewer units this month?",
    a: "This can happen due to: (1) Minimum Fixed Charges regardless of usage, (2) Fuel Surcharge increases, (3) Regulatory Surcharge revisions, (4) Meter reading gap — if the meter reader skipped last month, this month's bill covers 2 months. Check if 'Billing Units' vs 'Consumed Units' differ on your bill. Also verify your meter reading online."
  },
  {
    q: "What is the difference between Units (kWh) and Load (kW)?",
    a: "kW (kilowatt) is power — how fast you use electricity. A 1000W = 1kW appliance. kWh (kilowatt-hour) is energy — total electricity used over time. 1 kWh = 1 Unit. If you run a 1000W AC for 5 hours, it uses 5 kWh (5 units). Your Fixed Charge is based on your sanctioned load (kW), while energy charges are based on units consumed (kWh)."
  },
  {
    q: "Is this BillMeter calculator 100% accurate?",
    a: "BillMeter uses the latest publicly available MSEDCL and State DISCOM tariff orders. It provides accurate estimates for standard residential consumers. Your actual bill may vary due to: meter rent, special subsidies (BPL/farmer exemptions), regulatory surcharges, billing cycle differences, or recent tariff revisions not yet reflected. Use as a close estimate — typically within 2–5% of actual bill."
  },
  {
    q: "Which Indian state has the cheapest electricity?",
    a: "As of 2026, Tamil Nadu and Telangana offer FREE electricity for the first 100–50 units respectively for residential consumers. For consumers using 200–300 units, Madhya Pradesh (₹3.34–₹5.10/unit) and Gujarat (₹3.10–₹4.90/unit) are among the cheapest. Maharashtra is mid-range but has a higher slab penalty for usage above 300 units."
  },
  {
    q: "What is PM Surya Ghar Muft Bijli Yojana?",
    a: "PM Surya Ghar Muft Bijli Yojana is a central government scheme providing up to 300 units of free solar electricity per month to households. Subsidy: ₹30,000 for 1–2kW system, ₹78,000 for 3kW system. Apply at pmsuryagarh.gov.in. MSEDCL provides net metering connection within 30 days of installation."
  }
];

const FAQSection = () => (
  <section id="faq" className="py-16 px-4" style={{ backgroundColor: "hsl(210 40% 98%)" }}>
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <span className="text-sm font-semibold text-accent uppercase tracking-wider">Got Questions?</span>
        <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-2">❓ Frequently Asked Questions</h2>
        <p className="text-muted-foreground">Everything you need to know about electricity billing in India</p>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            className="bg-card rounded-xl border-0 shadow-sm"
          >
            <AccordionTrigger className="px-4 py-4 text-left font-medium hover:no-underline hover:bg-muted/50 rounded-xl transition-colors">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-muted-foreground leading-relaxed text-sm">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="text-center mt-10 space-y-3">
        <p className="text-muted-foreground text-sm">
          Still have questions? Try the calculator or visit{" "}
          <a href="https://ladestack.in" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">
            ladestack.in
          </a>
        </p>
        <Button
          onClick={() => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          ⚡ Calculate My Bill
        </Button>
      </div>
    </div>
  </section>
);

export default FAQSection;
