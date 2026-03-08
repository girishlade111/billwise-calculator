import { Zap } from "lucide-react";

const FooterSection = () => (
  <footer className="bg-primary text-primary-foreground py-10">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="bg-accent text-accent-foreground p-1.5 rounded-lg">
            <Zap className="w-5 h-5" />
          </div>
          <span className="text-lg font-bold">BillMeter by Lade Stack</span>
        </div>

        <div className="flex items-center justify-center gap-4 text-sm opacity-80">
          <a href="https://ladestack.in" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 underline underline-offset-2">ladestack.in</a>
          <span>•</span>
          <a href="#" className="hover:opacity-100 underline underline-offset-2">GitHub</a>
          <span>•</span>
          <a href="#" className="hover:opacity-100 underline underline-offset-2">Contact</a>
        </div>

        <p className="text-xs opacity-60 max-w-2xl mx-auto">
          All state tariff data sourced from official DISCOM tariff orders and regulatory commission orders. Last updated: March 2026.
        </p>
        <p className="text-xs opacity-60">
          Built with ❤️ in Solapur, Maharashtra | Free. Ad-free. No login required.
        </p>
        <p className="text-xs opacity-50">© 2026 Lade Stack. Free to use.</p>
      </div>
    </div>
  </footer>
);

export default FooterSection;
