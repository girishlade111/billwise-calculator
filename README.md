# ⚡ BillMeter — India Electricity Bill Calculator 2026

> **Free, ad-free, no-login electricity bill calculator** for Maharashtra (MSEDCL), Delhi, Karnataka, Gujarat, Tamil Nadu & 10+ Indian states with **2026 updated tariff slabs**.

[![Live Demo](https://img.shields.io/badge/Live-Demo-F59E0B?style=for-the-badge)](https://ladestack.in/billmeter)
[![Made in India](https://img.shields.io/badge/Made%20in-India-1E3A5F?style=for-the-badge)](https://ladestack.in)
[![License](https://img.shields.io/badge/License-Free-10B981?style=for-the-badge)](./LICENSE)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Supported States](#-supported-states)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [Tariff Data](#-tariff-data)
- [SEO & Performance](#-seo--performance)
- [Pages](#-pages)
- [Contributing](#-contributing)
- [Stats](#-stats)
- [Author](#-author)
- [License](#-license)

---

## 🔍 Overview

**BillMeter** is a comprehensive electricity bill estimation tool designed for Indian consumers. It helps users understand their electricity bills by providing **slab-wise breakdowns**, **appliance-based unit estimation**, **money-saving tips**, and **state-wise tariff comparison** — all in one clean, responsive interface.

### Why BillMeter?

- 🇮🇳 **India-specific** — Built for Indian tariff structures with state-wise DISCOM data
- 📊 **Transparent** — See exactly how your bill is calculated, slab by slab
- 🆓 **100% Free** — No ads, no login, no premium tiers, no hidden costs
- 🔒 **Privacy-first** — All calculations run client-side; zero data sent to servers
- 📱 **Mobile-first** — Responsive design works on any device

---

## ✨ Features

### 🧮 Bill Calculator
- **State selection** — Choose from 10+ Indian states with official DISCOM tariffs
- **Consumer category** — Residential (fully supported), Commercial (coming soon)
- **Connected load options** — Up to 1kW, 1–3kW, 3–10kW sanctioned load
- **Live slab indicator** — Real-time visual showing which tariff slab you're in as you type
- **Synced slider** — Drag slider or type units; both stay in sync
- **Slab progress bar** — Color-coded (green → red) showing slab fill percentage
- **Input validation** — Inline error messages with scroll-to-error behavior
- **Previous month comparison** — Optional field to compare month-over-month bills

### 📊 Bill Results (5-Card Layout)
- **Main Summary Card** — Total amount in large amber text with bill rating badge:
  - 🟢 Low Usage (< 100 units or < ₹300)
  - 🟡 Moderate Usage (₹300–₹800)
  - 🟠 High Usage (₹800–₹1,500)
  - 🔴 Very High Usage (> ₹1,500)
- **Slab Visual Bar** — Horizontal segmented bar with user position marker
- **Detailed Breakdown Table** — Units, rate, amount per slab + fixed charges, fuel surcharge, electricity duty
- **Month-over-Month Comparison** — Side-by-side cards with ₹ difference and % change
- **Action Buttons** — Recalculate (scrolls + focuses input), Print (window.print), Screenshot Card (shareable modal)

### 📱 Appliance Calculator
- **10 pre-loaded appliances** — LED Bulb, Fan, AC, Refrigerator, Washing Machine, TV, Geyser, Laptop, Water Pump, Microwave
- **Editable fields** — Name, watts, hours/day, days/month (all editable per appliance)
- **Live unit calculation** — Auto-computed `(watts × hours × days) / 1000` per appliance
- **Add custom appliances** — "+" button with auto-focus on new row
- **Reset to defaults** — One-click restore
- **Total consumption bar** — Color-coded progress (0–500+ kWh) with ₹7/unit estimate
- **CTA integration** — "Use These Units in Bill Calculator" auto-fills the calculator and shows a toast

### 💡 Saving Tips (8 Cards)
- Stay Under Slab Limit ⭐
- Switch to BLDC Fans
- Set AC to 24°C
- Rooftop Solar + Net Metering 🔥
- Smart Geyser Usage
- MSEDCL 2026 Tariff Cuts 🆕
- 100% LED Lighting
- Off-Peak Appliance Usage
- **Staggered fade-in animations** on scroll
- **Total savings callout** — "Save ₹9,600–₹14,400/year"

### 📋 State Tariff Table
- **10 states** with columns: State, Board, Slab 1, Rate Range, Fixed Charges, Duty
- **Maharashtra highlighted** with amber border
- **"🆓 FREE" badges** for Tamil Nadu and Telangana first slabs
- **Responsive** — Horizontal scroll on mobile
- **Disclaimer box** with DISCOM verification note

### ❓ FAQ Accordion (10 Items)
- How is electricity bill calculated in Maharashtra?
- What is the minimum bill in MSEDCL?
- What is Electricity Duty?
- What is Fuel Surcharge?
- How to check MSEDCL bill online?
- Why is my bill high with fewer units?
- Difference between kWh and kW?
- Is BillMeter 100% accurate?
- Cheapest electricity state in India?
- PM Surya Ghar Muft Bijli Yojana?

### 🌙 Dark Mode
- **Persistent** — Saved in `localStorage`, restored on reload
- **Toggle** — In hero section header and sticky navbar
- **Full coverage** — All sections, cards, tables, inputs, modals

### 📌 Sticky Navigation
- **Appears after 100px scroll** with backdrop blur
- **5 nav links** — Calculator, Appliances, Tips, Tariff Rates, FAQ
- **Active section highlighting** via `IntersectionObserver`
- **Mobile hamburger menu** with smooth slide-down
- **Scroll progress bar** — 3px amber bar at top (0→100%)

### ♿ Accessibility
- `aria-label` on all icon-only buttons
- Global `focus-visible` ring styling (amber outline)
- Semantic HTML (`section`, `nav`, `footer`, `h1`–`h3`)
- Keyboard navigable

### 🖨️ Print Support
- Print button triggers `window.print()`
- Print CSS hides everything except `#results` section
- Clean, shadow-free output

---

## 🗺️ Supported States

| # | State | DISCOM | First Slab | Rate Range |
|---|-------|--------|------------|------------|
| 1 | **Maharashtra** | MSEDCL | 0–100 @ ₹4.43 | ₹4.43–₹14.33/unit |
| 2 | Delhi | BSES/TPDDL | 0–200 @ ₹3.00 | ₹3.00–₹8.00/unit |
| 3 | Karnataka | BESCOM | 0–50 @ ₹3.75 | ₹3.75–₹7.25/unit |
| 4 | Gujarat | UGVCL | 0–50 @ ₹3.10 | ₹3.10–₹5.90/unit |
| 5 | Uttar Pradesh | UPPCL | 0–100 @ ₹3.35 | ₹3.35–₹6.00/unit |
| 6 | Tamil Nadu | TNEB | 0–100 **FREE** | ₹0–₹4.00/unit |
| 7 | Telangana | TSSPDCL | 0–50 **FREE** | ₹1.45–₹7.20/unit |
| 8 | West Bengal | WBSEDCL | 0–75 @ ₹3.51 | ₹3.51–₹6.71/unit |
| 9 | Rajasthan | JVVNL | 0–50 @ ₹3.40 | ₹3.40–₹6.30/unit |
| 10 | Madhya Pradesh | MPCZ | 0–50 @ ₹3.34 | ₹3.34–₹5.60/unit |

> 📅 **Last Updated:** March 2026 (FY 2025–26 tariff orders)

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | React 18 | UI components & state management |
| **Language** | TypeScript | Type safety & developer experience |
| **Build Tool** | Vite | Fast HMR & optimized production builds |
| **Styling** | Tailwind CSS 3 | Utility-first responsive styling |
| **UI Components** | shadcn/ui | Accessible, customizable component library |
| **Icons** | Lucide React | Consistent, tree-shakable icon set |
| **Routing** | React Router v6 | Client-side navigation |
| **State** | React useState/useEffect | Local component state (no external store) |
| **Data Fetching** | TanStack React Query | Query caching (available for future API use) |
| **Animations** | Tailwind + CSS keyframes | Fade-in, scale-in, staggered animations |
| **Charts** | Recharts | Available for future data visualization |
| **Testing** | Vitest | Unit testing framework |
| **Linting** | ESLint | Code quality enforcement |
| **Fonts** | Inter (Google Fonts) | Clean, modern typography |

### Design System

- **Color palette:** Dark Navy (#1E3A5F) + Amber (#F59E0B)
- **Dark mode:** Class-based with CSS custom properties (HSL tokens)
- **Border radius:** 0.75rem default (`--radius`)
- **Semantic tokens:** `--background`, `--foreground`, `--primary`, `--accent`, `--muted`, `--success`, `--warning`, `--destructive`

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** or **bun** package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/girishlade111/billmeter.git
cd billmeter

# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

### Run Tests

```bash
npm run test
# or
npx vitest
```

---

## 📁 Project Structure

```
billmeter/
├── public/
│   ├── favicon.ico              # App favicon
│   ├── placeholder.svg          # Placeholder image
│   ├── robots.txt               # SEO — allows all crawlers
│   └── sitemap.xml              # SEO — 11 URLs with priorities
├── src/
│   ├── assets/                  # Static assets
│   ├── components/
│   │   ├── ApplianceSection.tsx  # Appliance unit calculator
│   │   ├── CalculatorSection.tsx # Main bill calculator form
│   │   ├── FAQSection.tsx       # FAQ accordion (10 items)
│   │   ├── FooterSection.tsx    # 4-column footer with social links
│   │   ├── HeroSection.tsx      # Hero banner with CTA
│   │   ├── ResultsSection.tsx   # 5-card bill results display
│   │   ├── StickyNavbar.tsx     # Sticky nav + scroll progress
│   │   ├── TariffTableSection.tsx # State tariff comparison table
│   │   ├── TipsSection.tsx      # 8 saving tip cards
│   │   └── ui/                  # shadcn/ui components (40+ components)
│   ├── data/
│   │   └── tariffData.ts        # Tariff rates, slab definitions, calculateBill()
│   ├── hooks/
│   │   ├── use-mobile.tsx       # Mobile breakpoint detection
│   │   └── use-toast.ts         # Toast notification hook
│   ├── pages/
│   │   ├── Index.tsx            # Main calculator page
│   │   ├── About.tsx            # About BillMeter & Lade Stack
│   │   ├── Contact.tsx          # Contact info & DISCOM helplines
│   │   ├── PrivacyPolicy.tsx    # 10-section privacy policy
│   │   ├── Terms.tsx            # 13-section terms of service
│   │   ├── Disclaimer.tsx       # Detailed accuracy disclaimer
│   │   └── NotFound.tsx         # 404 page
│   ├── lib/
│   │   └── utils.ts             # cn() utility for className merging
│   ├── App.tsx                  # Root component with routes
│   ├── App.css                  # Additional styles
│   ├── index.css                # Tailwind + design tokens + print styles
│   └── main.tsx                 # Entry point
├── index.html                   # HTML template with 50+ meta tags & 4 JSON-LD schemas
├── tailwind.config.ts           # Tailwind config with custom theme
├── vite.config.ts               # Vite configuration
├── vitest.config.ts             # Vitest configuration
├── tsconfig.json                # TypeScript config
├── components.json              # shadcn/ui config
└── package.json                 # Dependencies & scripts
```

---

## ⚙️ Configuration

### Tailwind Theme (`tailwind.config.ts`)

```ts
// Key customizations:
darkMode: ["class"]              // Class-based dark mode
fontFamily: { sans: ["Inter"] }  // Custom font
colors: {
  primary: "hsl(var(--primary))"       // Dark navy
  accent: "hsl(var(--accent))"         // Amber (#F59E0B)
  success: "hsl(var(--success))"       // Green
  warning: "hsl(var(--warning))"       // Amber
  destructive: "hsl(var(--destructive))" // Red
}
```

### Design Tokens (`src/index.css`)

```css
:root {
  --primary: 213 52% 24%;       /* Dark navy blue */
  --accent: 38 92% 50%;         /* Amber/orange */
  --success: 160 84% 39%;       /* Green */
  --background: 210 20% 98%;    /* Light gray */
}
.dark {
  --primary: 38 92% 50%;        /* Amber becomes primary in dark */
  --background: 222 47% 6%;     /* Near black */
  --card: 217 33% 17%;          /* Dark card bg */
}
```

### Adding a New State

To add a new state's tariff data, edit `src/data/tariffData.ts`:

```ts
export const TARIFF_DATA: Record<string, StateTariff> = {
  new_state: {
    name: "State Name",
    board: "DISCOM Name",
    residential: {
      fixedCharge: { upTo1kW: 50, upto3kW: 100, upto10kW: 150 },
      slabs: [
        { upTo: 100, rate: 3.00 },
        { upTo: 300, rate: 5.00 },
        { upTo: Infinity, rate: 7.00 },
      ],
      electricityDuty: 0.05,
      fuelSurcharge: 0.30,
    },
  },
};
```

---

## 🔎 SEO & Performance

### Meta Tags (50+)
- **Primary:** title, description, keywords, author, theme-color
- **Open Graph:** og:title, og:description, og:type, og:url, og:site_name, og:locale
- **Twitter:** twitter:card, twitter:site, twitter:creator, twitter:title, twitter:description
- **Geo:** geo.region (IN-MH), geo.placename, geo.position, ICBM
- **Dublin Core:** DC.title, DC.creator, DC.subject, DC.description, DC.language
- **Robots:** index, follow, max-image-preview:large, max-snippet:-1
- **Mobile:** apple-mobile-web-app-capable, mobile-web-app-capable, color-scheme

### JSON-LD Structured Data (4 Schemas)
1. **WebApplication** — App details, rating, pricing
2. **FAQPage** — 5 FAQ rich snippets for Google Search
3. **BreadcrumbList** — Lade Stack → BillMeter hierarchy
4. **HowTo** — 4-step "How to Calculate" guide

### robots.txt
- Allows **all crawlers**: Google, Bing, DuckDuckGo, Yandex, Baidu
- Allows **social bots**: Twitter, Facebook, LinkedIn, Pinterest, WhatsApp, Telegram
- Allows **AI bots**: GPTBot, ChatGPT-User, Google-Extended, Claude, CCBot
- Allows **SEO tools**: AhrefsBot, SemrushBot, MJ12bot

### sitemap.xml
- **11 URLs** with priority weighting (1.0 for homepage, 0.3 for legal pages)

---

## 📄 Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | **Home** | Main calculator with all sections |
| `/about` | **About** | Mission, features, data sources, tech stack |
| `/contact` | **Contact** | Email, bug reports, DISCOM helplines, office address |
| `/privacy-policy` | **Privacy Policy** | 10-section policy, DPDP Act compliance |
| `/terms` | **Terms of Service** | 13-section legal terms, no warranty, governing law |
| `/disclaimer` | **Disclaimer** | Accuracy limitations, data sources, category limitations |

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/add-new-state`
3. **Commit** your changes: `git commit -m "Add Odisha tariff data"`
4. **Push** to the branch: `git push origin feature/add-new-state`
5. **Open** a Pull Request

### Contribution Ideas
- 🗺️ Add more state tariff data (Odisha, Punjab, Haryana, Kerala, etc.)
- 🏢 Add commercial/industrial tariff support
- 🌐 Add Hindi/Marathi language support
- 📊 Add consumption trend charts
- 🔔 Add bill reminder/alert feature

---

## 📈 Stats

| Metric | Value |
|--------|-------|
| **States Supported** | 10 |
| **FAQ Items** | 10 |
| **Saving Tips** | 8 |
| **Default Appliances** | 10 |
| **Total Pages** | 6 (+ 404) |
| **UI Components** | 40+ (shadcn/ui) |
| **Meta Tags** | 50+ |
| **JSON-LD Schemas** | 4 |
| **Sitemap URLs** | 11 |
| **Dependencies** | ~35 |
| **Dark Mode** | ✅ Full support |
| **Print Support** | ✅ Results section |
| **Ads** | ❌ None |
| **Login Required** | ❌ No |
| **Data Collection** | ❌ None |

---

## 👨‍💻 Author

**Girish Lade** — Founder, [Lade Stack](https://ladestack.in)

| Platform | Link |
|----------|------|
| 🌐 Website | [ladestack.in](https://ladestack.in) |
| 💼 LinkedIn | [girish-lade-075bba201](https://www.linkedin.com/in/girish-lade-075bba201/) |
| 🐙 GitHub | [girishlade111](https://github.com/girishlade111) |
| 📸 Instagram | [@girish_lade_](https://www.instagram.com/girish_lade_/) |
| 🎨 CodePen | [Girish-Lade-the-looper](https://codepen.io/Girish-Lade-the-looper) |
| 📧 Email | [admin@ladestack.in](mailto:admin@ladestack.in) |

📍 **Location:** Solapur, Maharashtra, India

---

## 📜 License

**Free to use.** BillMeter is a free utility tool by Lade Stack. No commercial redistribution without permission.

---

<div align="center">

### ⚡ Built with ❤️ in Solapur, Maharashtra, India

**[ladestack.in](https://ladestack.in)** — Free tools for Indian consumers

</div>
