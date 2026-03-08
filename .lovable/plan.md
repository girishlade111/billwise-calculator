

# BillMeter — India Electricity Bill Estimator

A complete, single-page electricity bill calculator for Indian households with 2026 updated tariff slabs across 10 states.

## Design
- **Theme**: Navy blue (#1E3A5F) + amber (#F59E0B), clean mobile-first design with dark mode toggle
- **Font**: Inter via Google Fonts
- **Layout**: Single-page app with smooth-scroll sections, responsive grid (1→2→3 columns)

## Sections to Build

### 1. Hero Header
- Lightning bolt logo + "BillMeter" branding, dark mode toggle
- Tagline, feature badges (2026 Updated, 10+ States, No Login, Free Forever)
- CTA button scrolling to calculator

### 2. Main Bill Calculator (Multi-step)
- **Step 1**: State dropdown (10 states), consumer category (Residential/Commercial + Coming Soon for others), connected load selection
- **Step 2**: Units input with synced slider (0–1000), optional previous month input, live slab indicator bar
- **Step 3**: Calculate button → smooth scroll to results

### 3. Bill Results
- Large bill amount card with full slab breakdown table
- Fixed charges, energy charges, electricity duty, fuel surcharge, total
- Colored slab visualization bar with user's position marked
- Bill rating badge (Low/Moderate/High/Very High)
- Before/after comparison cards (if previous month entered)
- Shareable summary card with screenshot instructions

### 4. Appliance Calculator
- Pre-loaded table of 10 common appliances with wattage, hours/day, days/month inputs
- Auto-calculated units per appliance, live total
- Add custom appliance / remove rows
- "Use These Units" button to auto-fill main calculator

### 5. Bill Reduction Tips
- 8 tip cards in responsive grid with icons and detailed advice (slab awareness, BLDC fans, AC usage, solar, geyser, tariff cuts, LED, off-peak)

### 6. State Tariff Reference Table
- Clean table showing all 10 states with board name, first slab, rate range, fixed charges
- Disclaimer note

### 7. FAQ Accordion
- 6 questions with expand/collapse using Radix accordion + Lucide chevron icons

### 8. Footer
- Lade Stack branding, links, data source disclaimer, copyright

## Data
- All 10 state tariff slabs hardcoded in a TypeScript data file (Maharashtra, Delhi, Karnataka, Gujarat, UP, Tamil Nadu, Telangana, West Bengal, Rajasthan, MP)
- Slab calculation engine: cumulative slab billing + fixed charges + electricity duty + fuel surcharge

## Key Interactions
- Slider ↔ input sync for units
- Live slab indicator while typing
- Smooth scroll navigation between sections
- Dark/light mode toggle persisted in state
- Appliance calculator feeds into main calculator
- Animated result appearance on calculate

