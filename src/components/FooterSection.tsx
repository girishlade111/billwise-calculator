import { Zap, Globe, Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const quickLinks = [
  { label: "Calculator", target: "calculator" },
  { label: "Appliance Calculator", target: "appliances" },
  { label: "Saving Tips", target: "saving-tips" },
  { label: "State Tariff Rates", target: "tariff-table" },
  { label: "FAQ", target: "faq" },
];

const pageLinks = [
  { label: "About BillMeter", to: "/about" },
  { label: "Contact Us", to: "/contact" },
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms of Service", to: "/terms" },
  { label: "Disclaimer", to: "/disclaimer" },
];

const FooterSection = () => (
  <footer className="bg-primary text-primary-foreground py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-6xl mx-auto mb-10">
        {/* Column 1 — Brand */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="bg-accent text-accent-foreground p-1.5 rounded-lg">
              <Zap className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold">BillMeter</span>
          </div>
          <p className="text-sm opacity-80">Free electricity bill estimator for India</p>
          <p className="text-sm opacity-70">
            A product by <span className="font-semibold">Lade Stack</span> —{" "}
            <a href="https://ladestack.in" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-100">
              ladestack.in
            </a>
          </p>
          <div className="flex items-center gap-3 pt-1">
            <a href="https://ladestack.in" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity" aria-label="Visit Lade Stack website">
              <Globe className="w-5 h-5" />
            </a>
            <a href="#" className="opacity-70 hover:opacity-100 transition-opacity" aria-label="GitHub">
              <Github className="w-5 h-5" />
            </a>
            <a href="mailto:hello@ladestack.in" className="opacity-70 hover:opacity-100 transition-opacity" aria-label="Email us">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Column 2 — Quick Links */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm uppercase tracking-wider opacity-90">Quick Links</h3>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.target}>
                <button
                  onClick={() => scrollTo(link.target)}
                  className="text-sm opacity-75 hover:opacity-100 hover:underline underline-offset-2 transition-opacity"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Pages */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm uppercase tracking-wider opacity-90">Pages</h3>
          <ul className="space-y-2">
            {pageLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm opacity-75 hover:opacity-100 hover:underline underline-offset-2 transition-opacity"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 — About */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm uppercase tracking-wider opacity-90">About This Tool</h3>
          <p className="text-sm opacity-75 leading-relaxed">
            BillMeter is a free, ad-free, no-login electricity bill calculator built by Lade Stack.
          </p>
          <p className="text-sm opacity-75 leading-relaxed">
            Tariff data sourced from official MSEDCL and state DISCOM tariff orders.
          </p>
          <p className="text-xs opacity-60">Updated: March 2026</p>
          <p className="text-xs opacity-60">Built with ❤️ in Solapur, Maharashtra, India</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/20 pt-6 text-center space-y-2">
        <p className="text-xs opacity-60">
          © 2026 Lade Stack (
          <a href="https://ladestack.in" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
            ladestack.in
          </a>
          ) — Free forever. No ads. No login.
        </p>
        <p className="text-xs opacity-50">
          Disclaimer: Estimates only. Verify with your DISCOM for exact tariffs.{" "}
          <Link to="/disclaimer" className="underline underline-offset-2">Read full disclaimer →</Link>
        </p>
      </div>
    </div>
  </footer>
);

export default FooterSection;
