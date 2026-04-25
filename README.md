# ⚡ BillMeter — India Electricity Bill Calculator 2026

> **Free, ad-free, no-login electricity bill calculator** for Maharashtra (MSEDCL), Delhi, Karnataka, Gujarat, Tamil Nadu & 10+ Indian states with **2026 updated tariff slabs**.

[![Live Demo](https://img.shields.io/badge/Live-Demo-F59E0B?style=for-the-badge)](https://ladestack.in/billmeter)
[![Made in India](https://img.shields.io/badge/Made%20in-India-1E3A5F?style=for-the-badge)](https://ladestack.in)
[![License](https://img.shields.io/badge/License-Free-10B981?style=for-the-badge)](./LICENSE)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind-3-38BDF8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)

---

## 🔑 Key Highlights

- ✅ **AMOLED Optimized** — Pure black (#000000) background for battery savings
- ✅ **Black & White Theme** — Clean, minimalist design with no colors
- ✅ **Metallic Glossy Finish** — Premium brushed metal and chrome effects
- ✅ **2026 Updated Tariffs** — Latest MSEDCL and state DISCOM rates
- ✅ **Privacy First** — All calculations run client-side, zero data collection
- ✅ **Mobile First** — Responsive design optimized for all devices

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [Supported States](#-supported-states)
- [SEO & Performance](#-seo--performance)
- [Pages](#-pages)
- [Contributing](#-contributing)
- [Stats](#-stats)
- [Author](#-author)

---

## 🔍 Overview

**BillMeter** is a comprehensive electricity bill estimation tool designed for Indian consumers. It helps users understand their electricity bills by providing **slab-wise breakdowns**, **appliance-based unit estimation**, **money-saving tips**, and **state-wise tariff comparison** — all in one clean, responsive interface.

### Why BillMeter?

| Feature | Description |
|---------|-------------|
| 🇮🇳 **India-specific** | Built for Indian tariff structures with state-wise DISCOM data |
| 📊 **Transparent** | See exactly how your bill is calculated, slab by slab |
| 🆓 **100% Free** | No ads, no login, no premium tiers, no hidden costs |
| 🔒 **Privacy-first** | All calculations run client-side; zero data sent to servers |
| 📱 **Mobile-first** | Responsive design works on any device |
| 🔋 **AMOLED Optimized** | Pure black background for battery savings |
| ✨ **Premium Design** | Metallic glossy finish with modern aesthetics |

---

## ✨ Features

### 🧮 Bill Calculator
- **State Selection** — Choose from 10+ Indian states with official DISCOM tariffs
- **Consumer Category** — Residential (fully supported), Commercial (coming soon)
- **Connected Load Options** — Up to 1kW, 1–3kW, 3–10kW sanctioned load
- **Live Slab Indicator** — Real-time visual showing which tariff slab you're in
- **Synced Slider** — Drag slider or type units; both stay in sync
- **Slab Progress Bar** — Color-coded showing slab fill percentage
- **Input Validation** — Inline error messages with scroll-to-error behavior
- **Previous Month Comparison** — Optional field to compare month-over-month bills

### 📊 Bill Results
- **Main Summary Card** — Total amount with bill rating badge (Low/Moderate/High/Very High)
- **Slab Visual Bar** — Horizontal segmented bar showing current consumption
- **Detailed Breakdown Table** — Units, rate, amount per slab + fixed charges, fuel surcharge, electricity duty
- **Month-over-Month Comparison** — Side-by-side cards with ₹ difference
- **Action Buttons** — Recalculate, Print, Save, Share
- **Daily Average** — Per-day cost calculation
- **Annual Projection** — Yearly estimated cost

### 📱 Appliance Calculator
- **10 Pre-loaded Appliances** — LED Bulb, Fan, AC, Refrigerator, Washing Machine, TV, Geyser, Laptop, Water Pump, Microwave
- **Editable Fields** — Name, watts, hours/day, days/month (all editable)
- **Live Unit Calculation** — Auto-computed `(watts × hours × days) / 1000` per appliance
- **Add Custom Appliances** — "+" button with auto-focus on new row
- **Reset to Defaults** — One-click restore
- **Total Consumption Bar** — Shows estimated monthly units
- **Auto-Fill Integration** — Transfer calculated units to bill calculator

### 💡 Saving Tips (8 Cards)
1. **Stay Under Slab Limit** ⭐ — Most Important
2. **Switch to BLDC Fans** — Save 50 units/month
3. **Set AC to 24°C** — 36% energy savings
4. **Rooftop Solar + Net Metering** 🔥 — Reduce bill to near zero
5. **Smart Geyser Usage** — Limit to 8-10 mins
6. **MSEDCL 2026 Tariff Cuts** 🆕 — New tariff reductions
7. **100% LED Lighting** — Replace old bulbs
8. **Off-Peak Appliance Usage** — Use heavy appliances at night

- **Staggered fade-in animations** on scroll
- **Total savings callout** — "Save ₹9,600–₹14,400/year"
- **Interactive CTA buttons** — Link to calculator and appliance sections

### 📋 State Tariff Table
- **10 States** with columns: State, Board, Slab 1, Rate Range, Fixed Charges, Duty
- **Maharashtra Highlighted** with white border
- **"FREE" Badges** for Tamil Nadu and Telangana first slabs
- **Responsive Design** — Horizontal scroll on mobile
- **Disclaimer Box** with DISCOM verification note
- **Sort by Cheapest** — States sorted by bill amount
- **Potential Savings** — Compare cheapest vs most expensive state

### ❓ FAQ Accordion (10 Items)
1. How is electricity bill calculated in Maharashtra?
2. What is the minimum bill in MSEDCL?
3. What is Electricity Duty?
4. What is Fuel Surcharge?
5. How to check MSEDCL bill online?
6. Why is my bill high with fewer units?
7. Difference between kWh and kW?
8. Is BillMeter 100% accurate?
9. Cheapest electricity state in India?
10. PM Surya Ghar Muft Bijli Yojana?

### 🎨 Design System

#### AMOLED Black & White Theme
| Element | Color |
|---------|-------|
| Background | #000000 (Pure Black) |
| Text Primary | #FFFFFF (Pure White) |
| Text Secondary | White @ 70% opacity |
| Text Muted | White @ 50-60% opacity |
| Borders | White @ 10-20% opacity |
| Cards | White @ 5% opacity |

#### Metallic Effects
| Class | Description |
|-------|-------------|
| `.bg-metallic` | Brushed metal gradient background |
| `.bg-chrome` | Chrome reflection effect |
| `.polished-metal` | Polished metal card |
| `.btn-metallic` | Metallic buttons with 3D depth |
| `.input-metallic` | Metallic inputs |
| `.border-metallic` | Beveled metallic borders |
| `.beveled` | Raised edge effect |
| `.glossy-reflection` | Shine reflection overlay |

### 📌 Sticky Navigation
- **Appears after 100px scroll** with backdrop blur
- **5 Nav Links** — Calculator, Appliances, Tips, Tariff Rates, FAQ
- **Active Section Highlighting** via IntersectionObserver
- **Mobile Hamburger Menu** with smooth slide-down
- **Scroll Progress Bar** — 3px white bar at top (0→100%)

### ♿ Accessibility
- `aria-label` on all icon-only buttons
- `focus-visible` ring styling (white outline)
- Semantic HTML (`section`, `nav`, `footer`, `h1`–`h3`)
- Keyboard navigable

### 🖨️ Print Support
- Print button triggers `window.print()`
- Print CSS hides everything except `#results` section
- Clean, shadow-free output

---

## 🛠️ Tech Stack

### 🎯 Development Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Framework** | React | 18.3.1 | UI components & state management |
| **Language** | TypeScript | 5.8.3 | Type safety & developer experience |
| **Build Tool** | Vite | 5.4.19 | Fast HMR & optimized production builds |
| **Styling** | Tailwind CSS | 3.4.17 | Utility-first responsive styling |
| **UI Components** | shadcn/ui | Latest | Accessible, customizable component library |
| **Icons** | Lucide React | 0.462.0 | Consistent, tree-shakable icon set |
| **Routing** | React Router DOM | 6.30.1 | Client-side navigation |
| **Forms** | React Hook Form | 7.61.1 | Form state management |
| **Validation** | Zod | 3.25.76 | Schema validation |
| **Query** | TanStack React Query | 5.83.0 | Query caching |
| **Animations** | Framer Motion | 11.x | Smooth scroll-triggered animations |
| **Testing** | Vitest | 3.2.4 | Unit testing framework |
| **Linting** | ESLint | 9.32.0 | Code quality enforcement |

### 📦 Dependencies Summary

| Category | Count |
|----------|-------|
| Total Dependencies | ~40 |
| Radix UI Components | 25+ |
| UI Utilities | 10+ |
| Dev Dependencies | 15+ |

---

## 🚀 Getting Started

### ✅ Prerequisites

- **Node.js** ≥ 18.x (LTS recommended)
- **npm** ≥ 9.x or **bun** ≥ 1.x package manager

### 📥 Installation

```bash
# Clone the repository
git clone https://github.com/girishlade111/billwise-calculator.git
cd billwise-calculator

# Install all dependencies
npm install

# Or using bun
bun install
```

### 🏃 Development Commands

```bash
# Start development server with hot reload
npm run dev

# Build for production (optimized)
npm run build

# Preview production build locally
npm run preview

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run linter
npm run lint

# TypeScript type checking
npm run typecheck
```

### 🌐 Access

The development server runs at: **`http://localhost:5173`**

---

## 📁 Project Structure

```
billwise-calculator/
├── public/
│   ├── favicon.ico              # Custom zap favicon
│   ├── placeholder.svg         # Placeholder image
│   ├── robots.txt             # SEO — allows all crawlers
│   └── sitemap.xml            # SEO — 12 URLs with priorities
├── src/
│   ├── assets/                 # Static assets
│   ├── components/
│   │   ├── ui/                # shadcn/ui components (40+)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── accordion.tsx
│   │   │   ├── toast.tsx
│   │   │   └── ...
│   │   ├── ApplianceSection.tsx     # Appliance calculator
│   │   ├── CalculatorSection.tsx  # Main bill calculator
│   │   ├── FAQSection.tsx          # FAQ accordion
│   │   ├── FooterSection.tsx       # Footer with links
│   │   ├── HeroSection.tsx         # Hero landing section
│   │   ├── ResultsSection.tsx      # Bill results display
│   │   ├── StickyNavbar.tsx       # Sticky navigation
│   │   ├── TariffTableSection.tsx  # State tariff comparison
│   │   └── TipsSection.tsx        # Saving tips cards
│   ├── data/
│   │   └── tariffData.ts      # Tariff rates, slabs, calculateBill()
│   ├── hooks/
│   │   ├── use-mobile.tsx      # Mobile breakpoint detection
│   │   └── use-toast.ts       # Toast notification hook
│   ├��─ pages/
│   │   ├── Index.tsx          # Main calculator page
│   │   ├── About.tsx          # About page
│   │   ├── Contact.tsx        # Contact page
│   │   ├── PrivacyPolicy.tsx  # Privacy policy
│   │   ├── Terms.tsx          # Terms of service
│   │   ├── Disclaimer.tsx      # Disclaimer
│   │   └── NotFound.tsx       # 404 page
│   ├── lib/
│   │   └── utils.ts           # cn() utility for className merging
│   ├── App.tsx                # Root component with routes
│   ├── index.css              # Tailwind + design tokens + metallic effects
│   ├── main.tsx               # Entry point
│   └── vite-env.d.ts          # Vite type definitions
├── test/
│   ├── setup.ts               # Test setup configuration
│   └── example.test.ts        # Example test file
├── index.html                 # HTML template with 150+ meta tags & 7 JSON-LD schemas
├── tailwind.config.ts         # Tailwind configuration
├── vite.config.ts             # Vite configuration
├── vitest.config.ts           # Vitest configuration
├── tsconfig.json              # TypeScript configuration
├── components.json            # shadcn/ui configuration
├── package.json               # Dependencies & scripts
├── package-lock.json
├── README.md
├── LICENSE
├── eslint.config.js
└── .gitignore
```

---

## ⚙️ Configuration

### 🔧 Tailwind Configuration

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        primary: "hsl(var(--primary))",
        accent: "hsl(var(--accent))",
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

### 🎨 CSS Design Tokens

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-white/20;
  }

  html {
    @apply dark;
  }

  body {
    @apply bg-black text-white font-sans antialiased;
    font-family: 'Inter', sans-serif;
  }

  html {
    scroll-behavior: smooth;
  }
}

/* AMOLED Optimized */
@layer utilities {
  .bg-amoled-black {
    background-color: #000000;
  }
  
  .bg-metallic {
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(255, 255, 255, 0.02) 25%,
      rgba(255, 255, 255, 0.05) 50%,
      rgba(255, 255, 255, 0.02) 75%,
      rgba(255, 255, 255, 0.08) 100%
    );
  }

  .bg-chrome {
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.25) 0%,
      rgba(255, 255, 255, 0.1) 45%,
      rgba(255, 255, 255, 0.05) 50%,
      rgba(255, 255, 255, 0.02) 55%,
      rgba(255, 255, 255, 0.08) 100%
    );
  }

  .polished-metal {
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(255, 255, 255, 0.1) 25%,
      rgba(255, 255, 255, 0.05) 50%,
      rgba(255, 255, 255, 0.1) 75%,
      rgba(255, 255, 255, 0.15) 100%
    );
  }

  .btn-metallic {
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(255, 255, 255, 0.08) 40%,
      rgba(255, 255, 255, 0.05) 60%,
      rgba(0, 0, 0, 0.05) 100%
    );
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 
      0 2px 4px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
  }

  .beveled {
    box-shadow: 
      inset 1px 1px 0 rgba(255, 255, 255, 0.1),
      inset -1px -1px 0 rgba(0, 0, 0, 0.3);
  }
}
```

### 🔨 Vite Configuration

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  build: {
    sourcemap: false,
  },
});
```

### 🔩 TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### ➕ Adding a New State

To add a new state's tariff data, edit `src/data/tariffData.ts`:

```typescript
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

## 🔎 SEO & Performance

### 📝 Meta Tags (150+)

- **Primary:** title, description, keywords, author, theme-color
- **Open Graph:** og:title, og:description, og:type, og:url, og:site_name, og:locale
- **Twitter:** twitter:card, twitter:site, twitter:creator, twitter:title, twitter:description
- **Geo:** geo.region (IN-MH), geo.placename, geo.position, ICBM
- **Dublin Core:** DC.title, DC.creator, DC.subject, DC.description, DC.language
- **Robots:** index, follow, max-image-preview:large, max-snippet:-1
- **Mobile:** apple-mobile-web-app-capable, mobile-web-app-capable, color-scheme
- **Verification:** Google, Bing, Yandex site verification tags

### 📋 JSON-LD Structured Data (7 Schemas)

1. **WebApplication** — App details, rating, pricing
2. **FAQPage** — 10 FAQ rich snippets for Google Search
3. **BreadcrumbList** — Lade Stack → BillMeter hierarchy
4. **HowTo** — Step-by-step usage guide
5. **SoftwareApplication** — App metadata
6. **Organization** — Company information
7. **WebSite** — Site with search action

### 🤖 robots.txt

Allows all crawlers including:
- **Search engines:** Google, Bing, DuckDuckGo, Yandex, Baidu
- **Social bots:** Twitter, Facebook, LinkedIn, Pinterest, WhatsApp
- **AI bots:** GPTBot, ChatGPT-User, Google-Extended, Claude

### 🗺️ sitemap.xml

- **12 URLs** with priority weighting
- Homepage: 1.0 priority
- Legal pages: 0.3 priority

---

## 📄 Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | **Home** | Main calculator with all sections |
| `/about` | **About** | Mission, features, data sources |
| `/contact` | **Contact** | Email, bug reports, DISCOM helplines |
| `/privacy-policy` | **Privacy Policy** | Privacy policy, DPDP Act compliance |
| `/terms` | **Terms of Service** | Legal terms |
| `/disclaimer` | **Disclaimer** | Accuracy limitations |
| `*` | **404** | Not Found page |

---

## 📈 Statistics

| Metric | Value |
|--------|-------|
| **States Supported** | 10 |
| **FAQ Items** | 10 |
| **Saving Tips** | 8 |
| **Default Appliances** | 10 |
| **Total Routes** | 7 (6 pages + 404) |
| **UI Components** | 40+ |
| **Meta Tags** | 150+ |
| **JSON-LD Schemas** | 7 |
| **Sitemap URLs** | 12 |
| **NPM Dependencies** | ~40 |
| **Metallic Effects** | 8 classes |
| **AMOLED Optimized** | ✅ Yes |
| **Black & White Theme** | ✅ Yes |
| **Print Support** | ✅ Results section |
| **Advertisements** | ❌ None |
| **Login Required** | ❌ No |
| **Data Collection** | ❌ None |

---

## 🤝 Contributing

### 📋 Contribution Guidelines

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/add-new-state`
3. **Commit** your changes: `git commit -m "Add new state tariff data"`
4. **Push** to the branch: `git push origin feature/add-new-state`
5. **Open** a Pull Request

### 🎯 Contribution Ideas

- 🗺️ Add more state tariff data (Odisha, Punjab, Haryana, Kerala, etc.)
- 🏢 Add commercial/industrial tariff support
- 🌐 Add Hindi/Marathi language support
- 📊 Add consumption trend charts
- 🔔 Add bill reminder/alert feature
- 📱 Add PWA support for offline usage

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