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

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Supported States](#-supported-states)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [Tariff Data](#-tariff-data)
- [SEO \& Performance](#-seo--performance)
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
| **Query** | TanStack React Query | 5.83.0 | Query caching (available for future API use) |
| **Charts** | Recharts | 2.15.4 | Available for future data visualization |
| **Testing** | Vitest | 3.2.4 | Unit testing framework |
| **Linting** | ESLint | 9.32.0 | Code quality enforcement |

### 🎨 Design System

- **Color palette:** 
  - Primary: Dark Navy (#1E3A5F)
  - Accent: Amber (#F59E0B)
  - Success: Green (#10B981)
  - Warning: Orange (#F59E0B)
  - Destructive: Red (#EF4444)

- **Dark mode:** Class-based with CSS custom properties (HSL tokens)
- **Border radius:** 0.75rem default (`--radius`)
- **Semantic tokens:** `--background`, `--foreground`, `--primary`, `--accent`, `--muted`, `--success`, `--warning`, `--destructive`

### 📦 Dependencies Summary

| Category | Count |
|----------|-------|
| Total Dependencies | ~35 |
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
git clone https://github.com/girishlade111/billmeter.git
cd billmeter

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

# Build in development mode
npm run build:dev

# Preview production build locally
npm run preview

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run linter
npm run lint
```

### 🌐 Access

The development server runs at: **`http://localhost:5173`**

---

## 📁 Project Structure

```
billwise-calculator/
├── public/
│   ├── favicon.ico              # App favicon
│   ├── placeholder.svg        # Placeholder image
│   ├── robots.txt           # SEO — allows all crawlers
│   └── sitemap.xml         # SEO — 11 URLs with priorities
├── src/
│   ├── assets/             # Static assets
│   ├── components/
│   │   ├── ui/            # shadcn/ui components (40+)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── toast.tsx
│   │   │   └── ...
│   │   ├── ApplianceSection.tsx
│   │   ├── CalculatorSection.tsx
│   │   ├── FAQSection.tsx
│   │   ├── FooterSection.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ResultsSection.tsx
│   │   ├── StickyNavbar.tsx
│   │   ├── TariffTableSection.tsx
│   │   └── TipsSection.tsx
│   ├── data/
│   │   └── tariffData.ts   # Tariff rates, slabs, calculateBill()
│   ├── hooks/
│   │   ├── use-mobile.tsx  # Mobile breakpoint detection
│   │   └── use-toast.ts    # Toast notification hook
│   ├── pages/
│   │   ├── Index.tsx       # Main calculator page
│   │   ├── About.tsx       # About page
│   │   ├── Contact.tsx    # Contact page
│   │   ├── PrivacyPolicy.tsx
│   │   ├── Terms.tsx
│   │   ├── Disclaimer.tsx
│   │   └── NotFound.tsx   # 404 page
│   ├── lib/
│   │   └── utils.ts       # cn() utility for className merging
│   ├── App.tsx            # Root component with routes
│   ├── App.css            # Additional styles
│   ├── index.css         # Tailwind + design tokens + print styles
│   ├── main.tsx          # Entry point
│   └── vite-env.d.ts     # Vite type definitions
├── test/
│   ├── setup.ts         # Test setup configuration
│   └── example.test.ts # Example test file
├── index.html           # HTML template with 50+ meta tags & 4 JSON-LD schemas
├── tailwind.config.ts    # Tailwind configuration
├── vite.config.ts      # Vite configuration
├── vitest.config.ts  # Vitest configuration
├── tsconfig.json     # TypeScript configuration
├── components.json  # shadcn/ui configuration
├── package.json    # Dependencies & scripts
├── package-lock.json
├── README.md
├── LICENSE
├── eslint.config.js
├── tsconfig.node.json
└── .gitignore
```

---

## ⚙️ Configuration

### 🔧 Tailwind Configuration (`tailwind.config.ts`)

```typescript
import type { Config } from "tailwindcss";

// Key customizations
const config: Config = {
  darkMode: ["class"],           // Class-based dark mode
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        primary: "hsl(var(--primary))",
        accent: "hsl(var(--accent))",
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        destructive: "hsl(var(--destructive))",
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

### 🎨 Design Tokens (`src/index.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --primary: 213 52% 24%;       /* Dark navy blue */
    --accent: 38 92% 50%;          /* Amber/orange */
    --success: 160 84% 39%;       /* Green */
    --warning: 38 92% 50%;         /* Amber */
    --destructive: 0 84% 60%;    /* Red */
    --background: 210 20% 98%;    /* Light gray */
    --foreground: 222 47% 10%;    /* Dark text */
    --card: 0 0% 100%;             /* White */
    --card-foreground: 222 47% 10%;
    --popover: 0 0% 100%;
    --popover-foreground: 222 47% 10%;
    --muted: 214 14% 92%;
    --muted-foreground: 215 16% 44%;
    --radius: 0.75rem;
  }
  
  .dark {
    --primary: 38 92% 50%;        /* Amber becomes primary in dark */
    --accent: 213 52% 24%;          /* Dark navy becomes accent */
    --background: 222 47% 6%;     /* Near black */
    --foreground: 210 20% 98%;
    --card: 217 33% 17%;           /* Dark card bg */
    --card-foreground: 210 20% 98%;
  }
}

/* Print Styles */
@media print {
  body * {
    visibility: hidden;
  }
  #results, #results * {
    visibility: visible;
  }
  #results {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
}
```

### 🔨 Vite Configuration (`vite.config.ts`)

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
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          radix: ["@radix-ui/react-dialog", "@radix-ui/react-select"],
        },
      },
    },
  },
});
```

### 🧪 Vitest Configuration (`vitest.config.ts`)

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

### 🔩 TypeScript Configuration (`tsconfig.json`)

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

## 📈 Statistics

| Metric | Value |
|--------|-------|
| **States Supported** | 10 |
| **FAQ Items** | 10 |
| **Saving Tips** | 8 |
| **Default Appliances** | 10 |
| **Total Routes** | 7 (6 pages + 404) |
| **UI Components** | 40+ (shadcn/ui) |
| **Meta Tags** | 50+ |
| **JSON-LD Schemas** | 4 |
| **Sitemap URLs** | 11 |
| **NPM Dependencies** | ~35 |
| **Radix UI Packages** | 25+ |
| **Dark Mode Support** | ✅ Full |
| **Print Support** | ✅ Results section |
| ** advertisements** | ❌ None |
| **Login Required** | ❌ No |
| **Data Collection** | ❌ None |

---

## 🔎 SEO & Performance

### 📝 Meta Tags (50+)

- **Primary:** title, description, keywords, author, theme-color
- **Open Graph:** og:title, og:description, og:type, og:url, og:site_name, og:locale
- **Twitter:** twitter:card, twitter:site, twitter:creator, twitter:title, twitter:description
- **Geo:** geo.region (IN-MH), geo.placename, geo.position, ICBM
- **Dublin Core:** DC.title, DC.creator, DC.subject, DC.description, DC.language
- **Robots:** index, follow, max-image-preview:large, max-snippet:-1
- **Mobile:** apple-mobile-web-app-capable, mobile-web-app-capable, color-scheme

### 📋 JSON-LD Structured Data (4 Schemas)

1. **WebApplication** — App details, rating, pricing
2. **FAQPage** — 5 FAQ rich snippets for Google Search
3. **BreadcrumbList** — Lade Stack → BillMeter hierarchy
4. **HowTo** — 4-step "How to Calculate" guide

### 🤖 robots.txt

Allows:
- **Search engines:** Google, Bing, DuckDuckGo, Yandex, Baidu
- **Social bots:** Twitter, Facebook, LinkedIn, Pinterest, WhatsApp, Telegram
- **AI bots:** GPTBot, ChatGPT-User, Google-Extended, Claude, CCBot
- **SEO tools:** AhrefsBot, SemrushBot, MJ12bot

### 🗺️ sitemap.xml

- **11 URLs** with priority weighting
- Homepage: 1.0 priority
- Legal pages: 0.3 priority

---

## 📄 Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | **Home** | Main calculator with all sections |
| `/about` | **About** | Mission, features, data sources, tech stack |
| `/contact` | **Contact** | Email, bug reports, DISCOM helplines |
| `/privacy-policy` | **Privacy Policy** | 10-section policy, DPDP Act compliance |
| `/terms` | **Terms of Service** | 13-section legal terms |
| `/disclaimer` | **Disclaimer** | Accuracy limitations |
| `*` | **404** | Not Found page |

---

## 🤝 Contributing

### 📋 Contribution Guidelines

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/add-new-state`
3. **Commit** your changes: `git commit -m "Add Odisha tariff data"`
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