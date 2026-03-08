export interface Slab {
  upTo: number;
  rate: number;
}

export interface FixedCharge {
  upTo1kW: number;
  upto3kW: number;
  upto10kW: number;
  above10kW?: number;
}

export interface TariffCategory {
  fixedCharge: FixedCharge;
  slabs: Slab[];
  electricityDuty: number;
  fuelSurcharge: number;
}

export interface StateTariff {
  name: string;
  board: string;
  residential: TariffCategory;
  commercial?: TariffCategory;
}

export const TARIFF_DATA: Record<string, StateTariff> = {
  maharashtra: {
    name: "Maharashtra",
    board: "MSEDCL",
    residential: {
      fixedCharge: { upTo1kW: 75, upto3kW: 130, upto10kW: 200 },
      slabs: [
        { upTo: 100, rate: 4.43 },
        { upTo: 300, rate: 9.64 },
        { upTo: 500, rate: 12.83 },
        { upTo: Infinity, rate: 14.33 },
      ],
      electricityDuty: 0.16,
      fuelSurcharge: 0.41,
    },
  },
  delhi: {
    name: "Delhi",
    board: "BSES/TPDDL",
    residential: {
      fixedCharge: { upTo1kW: 20, upto3kW: 50, upto10kW: 140 },
      slabs: [
        { upTo: 200, rate: 3.0 },
        { upTo: 400, rate: 4.5 },
        { upTo: 800, rate: 6.5 },
        { upTo: Infinity, rate: 8.0 },
      ],
      electricityDuty: 0.05,
      fuelSurcharge: 0,
    },
  },
  karnataka: {
    name: "Karnataka",
    board: "BESCOM",
    residential: {
      fixedCharge: { upTo1kW: 70, upto3kW: 120, upto10kW: 180 },
      slabs: [
        { upTo: 50, rate: 3.75 },
        { upTo: 100, rate: 5.45 },
        { upTo: 200, rate: 6.3 },
        { upTo: Infinity, rate: 7.25 },
      ],
      electricityDuty: 0.06,
      fuelSurcharge: 0,
    },
  },
  gujarat: {
    name: "Gujarat",
    board: "UGVCL",
    residential: {
      fixedCharge: { upTo1kW: 45, upto3kW: 90, upto10kW: 130 },
      slabs: [
        { upTo: 50, rate: 3.1 },
        { upTo: 250, rate: 3.95 },
        { upTo: 500, rate: 4.9 },
        { upTo: Infinity, rate: 5.9 },
      ],
      electricityDuty: 0.2,
      fuelSurcharge: 0,
    },
  },
  uttar_pradesh: {
    name: "Uttar Pradesh",
    board: "UPPCL",
    residential: {
      fixedCharge: { upTo1kW: 70, upto3kW: 110, upto10kW: 150 },
      slabs: [
        { upTo: 100, rate: 3.35 },
        { upTo: 150, rate: 3.85 },
        { upTo: 300, rate: 5.0 },
        { upTo: Infinity, rate: 6.0 },
      ],
      electricityDuty: 0.05,
      fuelSurcharge: 0,
    },
  },
  tamil_nadu: {
    name: "Tamil Nadu",
    board: "TNEB",
    residential: {
      fixedCharge: { upTo1kW: 30, upto3kW: 70, upto10kW: 120 },
      slabs: [
        { upTo: 100, rate: 0 },
        { upTo: 200, rate: 1.5 },
        { upTo: 500, rate: 3.0 },
        { upTo: Infinity, rate: 4.0 },
      ],
      electricityDuty: 0,
      fuelSurcharge: 0,
    },
  },
  telangana: {
    name: "Telangana",
    board: "TSSPDCL",
    residential: {
      fixedCharge: { upTo1kW: 25, upto3kW: 80, upto10kW: 160 },
      slabs: [
        { upTo: 50, rate: 0 },
        { upTo: 100, rate: 1.45 },
        { upTo: 200, rate: 3.45 },
        { upTo: 300, rate: 5.0 },
        { upTo: Infinity, rate: 7.2 },
      ],
      electricityDuty: 0,
      fuelSurcharge: 0,
    },
  },
  west_bengal: {
    name: "West Bengal",
    board: "WBSEDCL",
    residential: {
      fixedCharge: { upTo1kW: 60, upto3kW: 95, upto10kW: 140 },
      slabs: [
        { upTo: 75, rate: 3.51 },
        { upTo: 175, rate: 5.07 },
        { upTo: 250, rate: 5.8 },
        { upTo: Infinity, rate: 6.71 },
      ],
      electricityDuty: 0,
      fuelSurcharge: 0,
    },
  },
  rajasthan: {
    name: "Rajasthan",
    board: "JVVNL",
    residential: {
      fixedCharge: { upTo1kW: 65, upto3kW: 100, upto10kW: 145 },
      slabs: [
        { upTo: 50, rate: 3.4 },
        { upTo: 150, rate: 4.6 },
        { upTo: 300, rate: 5.5 },
        { upTo: Infinity, rate: 6.3 },
      ],
      electricityDuty: 0,
      fuelSurcharge: 0,
    },
  },
  madhya_pradesh: {
    name: "Madhya Pradesh",
    board: "MPCZ",
    residential: {
      fixedCharge: { upTo1kW: 55, upto3kW: 85, upto10kW: 130 },
      slabs: [
        { upTo: 50, rate: 3.34 },
        { upTo: 150, rate: 4.35 },
        { upTo: 300, rate: 5.1 },
        { upTo: Infinity, rate: 5.6 },
      ],
      electricityDuty: 0,
      fuelSurcharge: 0,
    },
  },
};

export const STATES = Object.entries(TARIFF_DATA).map(([key, val]) => ({
  value: key,
  label: `${val.name} (${val.board})`,
}));

export const CATEGORIES = [
  { value: "residential", label: "Residential (घरगुती)" },
  { value: "commercial", label: "Commercial (व्यावसायिक)", comingSoon: true },
  { value: "agricultural", label: "Agricultural (शेती)", comingSoon: true },
  { value: "industrial", label: "Industrial (औद्योगिक)", comingSoon: true },
];

export const LOAD_OPTIONS = [
  { value: "upTo1kW", label: "Up to 1 kW" },
  { value: "upto3kW", label: "1–3 kW (most common)" },
  { value: "upto10kW", label: "3–10 kW" },
  { value: "above10kW", label: "Above 10 kW" },
];

export interface SlabBreakdown {
  slabLabel: string;
  units: number;
  rate: number;
  amount: number;
}

export interface BillResult {
  stateName: string;
  category: string;
  units: number;
  slabBreakdown: SlabBreakdown[];
  energyCharge: number;
  fixedCharge: number;
  fuelSurchargeAmount: number;
  electricityDuty: number;
  total: number;
  currentSlabIndex: number;
}

export function calculateBill(
  stateKey: string,
  loadKey: string,
  units: number
): BillResult | null {
  const state = TARIFF_DATA[stateKey];
  if (!state) return null;

  const tariff = state.residential;
  const fixedCharge = tariff.fixedCharge[loadKey as keyof FixedCharge] ?? tariff.fixedCharge.upto3kW;

  const slabBreakdown: SlabBreakdown[] = [];
  let remaining = units;
  let energyCharge = 0;
  let prevLimit = 0;
  let currentSlabIndex = 0;

  for (let i = 0; i < tariff.slabs.length; i++) {
    const slab = tariff.slabs[i];
    const slabSize = slab.upTo === Infinity ? Infinity : slab.upTo - prevLimit;
    const unitsInSlab = Math.min(remaining, slabSize);

    if (unitsInSlab > 0) {
      const amount = unitsInSlab * slab.rate;
      const label =
        slab.upTo === Infinity
          ? `Above ${prevLimit} units`
          : `${prevLimit + 1}–${slab.upTo} units`;
      slabBreakdown.push({ slabLabel: label, units: unitsInSlab, rate: slab.rate, amount });
      energyCharge += amount;
      currentSlabIndex = i;
    }

    remaining -= unitsInSlab;
    prevLimit = slab.upTo === Infinity ? prevLimit : slab.upTo;
    if (remaining <= 0) break;
  }

  const fuelSurchargeAmount = units * tariff.fuelSurcharge;
  const electricityDuty = energyCharge * tariff.electricityDuty;
  const total = energyCharge + fixedCharge + fuelSurchargeAmount + electricityDuty;

  return {
    stateName: state.name,
    category: "Residential",
    units,
    slabBreakdown,
    energyCharge: Math.round(energyCharge * 100) / 100,
    fixedCharge,
    fuelSurchargeAmount: Math.round(fuelSurchargeAmount * 100) / 100,
    electricityDuty: Math.round(electricityDuty * 100) / 100,
    total: Math.round(total * 100) / 100,
    currentSlabIndex,
  };
}

export const DEFAULT_APPLIANCES = [
  { id: "1", name: "LED Bulb", wattage: 9, hours: 6, days: 30, icon: "💡" },
  { id: "2", name: "Ceiling Fan", wattage: 75, hours: 10, days: 30, icon: "🌀" },
  { id: "3", name: "AC (1.5 Ton)", wattage: 1500, hours: 6, days: 30, icon: "❄️" },
  { id: "4", name: "Refrigerator", wattage: 150, hours: 24, days: 30, icon: "🧊" },
  { id: "5", name: "Washing Machine", wattage: 500, hours: 1, days: 15, icon: "👕" },
  { id: "6", name: "Television", wattage: 100, hours: 5, days: 30, icon: "📺" },
  { id: "7", name: "Water Heater/Geyser", wattage: 2000, hours: 0.5, days: 30, icon: "🚿" },
  { id: "8", name: "Laptop/Computer", wattage: 65, hours: 8, days: 30, icon: "💻" },
  { id: "9", name: "Water Pump/Motor", wattage: 750, hours: 1, days: 30, icon: "🔧" },
  { id: "10", name: "Microwave Oven", wattage: 800, hours: 0.5, days: 30, icon: "🍽️" },
];
