import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How is electricity bill calculated in Maharashtra?", a: "Maharashtra uses a slab-based system by MSEDCL. First 100 units at ₹4.43/unit, 101-300 at ₹9.64/unit, 301-500 at ₹12.83/unit, above 500 at ₹14.33/unit. Plus fixed charges and electricity duty are added." },
  { q: "What is the minimum bill in MSEDCL?", a: "Even if you consume 0 units, MSEDCL charges a minimum fixed charge based on your sanctioned load. Typically ₹75–₹200/kW/month." },
  { q: "What is electricity duty in Maharashtra?", a: "Electricity Duty (ED) is a state tax charged on energy consumption. In Maharashtra, it's approximately 16% of energy charges for residential consumers." },
  { q: "How can I check my MSEDCL bill online?", a: "Visit mahadiscom.in → Consumer Services → View/Pay Bill. Enter your consumer number. You can also use the MSEDCL mobile app or WhatsApp on 9930099300." },
  { q: "Is this calculator 100% accurate?", a: "This tool uses the latest publicly available MSEDCL and state DISCOM tariff orders. Bill may slightly vary due to meter rent, wheeling charges, or special subsidies applicable to your account. Use as an estimate." },
  { q: "Why is my bill so high even with less units?", a: "Slab rates are cumulative — higher units push ALL units into expensive slabs. Also check if fixed charges, fuel surcharge, or regulatory surcharge have increased." },
];

const FAQSection = () => (
  <section id="faq" className="py-12 md:py-16 bg-secondary/30">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">❓ Frequently Asked Questions</h2>
      <p className="text-center text-muted-foreground mb-8">Common questions about electricity billing in India</p>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-lg border-0 shadow-sm px-4">
              <AccordionTrigger className="text-left font-medium hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
);

export default FAQSection;
