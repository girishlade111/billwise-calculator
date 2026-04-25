import { Zap, Globe, Github, Mail, Instagram, Linkedin, CodepenIcon, ArrowRight, Calendar, Check, Send, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const socialLinks = [
  { href: "https://ladestack.in", icon: Globe, label: "Website" },
  { href: "mailto:admin@ladestack.in", icon: Mail, label: "Email" },
  { href: "https://github.com/girishlade111", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/girish-lade-075bba201/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://www.instagram.com/girish_lade_/", icon: Instagram, label: "Instagram" },
  { href: "https://codepen.io/Girish-Lade-the-looper", icon: CodepenIcon, label: "CodePen" },
];

const quickLinks = [
  { label: "Calculator", target: "calculator", icon: Zap },
  { label: "Appliances", target: "appliances", icon: Zap },
  { label: "Saving Tips", target: "saving-tips", icon: Zap },
  { label: "Tariff Rates", target: "tariff-table", icon: Zap },
  { label: "FAQ", target: "faq", icon: Zap },
];

const pageLinks = [
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms of Service", to: "/terms" },
  { label: "Disclaimer", to: "/disclaimer" },
];

const features = [
  "2026 Updated Tariffs",
  "10+ Indian States",
  "Slab-wise Breakdown",
  "Appliance Calculator",
  "Saving Tips",
  "Dark Mode Support",
  "No Login Required",
  "100% Free",
];

const FooterSection = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      window.location.href = `mailto:admin@ladestack.in?subject=Subscribe: ${email}`;
    }
  };

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px]" 
        />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16 pb-8 border-b border-white/10"
        >
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="bg-chrome border-metallic p-3 rounded-2xl beveled"
            >
              <Zap className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold">BillMeter</h3>
              <p className="text-white/50 text-sm">Free electricity bill calculator for India</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Enter your email for updates"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-metallic border-metallic rounded-xl px-4 py-3 text-sm w-64 focus:outline-none focus:border-white transition-all placeholder:text-white/30 text-white"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-metallic text-black px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-white/90 transition-all glossy-reflection"
                >
                  <Send className="w-4 h-4" />
                  Subscribe
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-2 bg-metallic border-metallic px-4 py-3 rounded-xl text-white"
              >
                <Check className="w-5 h-5" />
                <span className="text-sm font-medium">Thanks for subscribing!</span>
              </motion.div>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <h4 className="font-bold text-white text-sm uppercase tracking-widest">Connect</h4>
            <p className="text-white/50 text-sm leading-relaxed">
              Calculate your electricity bill instantly with accurate 2026 tariff rates for 10+ Indian states.
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {socialLinks.map(({ href, icon: Icon, label }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  aria-label={label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-metallic border-metallic p-2.5 rounded-xl transition-all duration-300 hover:bg-white/20 beveled"
                >
                  <Icon className="w-5 h-5 text-white" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="font-bold text-white text-sm uppercase tracking-widest">Navigate</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={link.target}>
                  <button
                    onClick={() => scrollTo(link.target)}
                    className="group flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm w-full"
                  >
                    <span className="w-5 h-5 rounded-full bg-metallic border-metallic group-hover:bg-white/20 flex items-center justify-center text-[10px] beveled">{i + 1}</span>
                    {link.label}
                    <ArrowRight className="w-3 h-3 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h4 className="font-bold text-white text-sm uppercase tracking-widest">Pages</h4>
            <ul className="space-y-3">
              {pageLinks.map((link, i) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm"
                  >
                    <span className="w-5 h-5 rounded-full bg-metallic border-metallic group-hover:bg-white/20 flex items-center justify-center text-[10px] beveled">→</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h4 className="font-bold text-white text-sm uppercase tracking-widest">Features</h4>
            <ul className="grid grid-cols-2 gap-3">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-white/50 text-sm">
                  <Check className="w-4 h-4 text-white" />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10"
        >
          <div className="flex items-center gap-2 text-sm text-white/30">
            <span>© 2026</span>
            <Link to="/" className="font-semibold text-white/60 hover:text-white transition-colors">Lade Stack</Link>
            <span>•</span>
            <span>All rights reserved</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-white/30">
            <span>Made with</span>
            <motion.span 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-white"
            >❤</motion.span>
            <span>in</span>
            <span className="text-white/60">Solapur, India</span>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <span className="text-white/30">
              <span className="font-medium text-white/50">Note:</span> Estimates only. Verify with your DISCOM.
            </span>
          </div>
        </motion.div>
      </div>

      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 btn-metallic text-black p-3 rounded-full z-50 hover:bg-white/90 transition-all beveled glossy-reflection"
        aria-label="Back to top"
      >
        <ExternalLink className="w-5 h-5 rotate-45" />
      </motion.button>
    </footer>
  );
};

export default FooterSection;