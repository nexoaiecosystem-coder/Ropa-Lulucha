export const STORE_NAME = "Lulucha";
export const FREE_SHIPPING_THRESHOLD = 3000;
export const STANDARD_SHIPPING_COST = 250;

// Tiered discount by total garment count in the cart, applied automatically.
export const QUANTITY_DISCOUNT_TIERS = [
  { minItems: 4, rate: 0.3 },
  { minItems: 3, rate: 0.2 },
  { minItems: 2, rate: 0.1 },
];

export function discountRateForCount(count: number) {
  const tier = QUANTITY_DISCOUNT_TIERS.find((t) => count >= t.minItems);
  return tier?.rate ?? 0;
}

export const WHATSAPP_NUMBER = "59899123456";

export const DEPARTMENTS = [
  "Montevideo",
  "Canelones",
  "Maldonado",
  "Colonia",
  "San José",
  "Rocha",
  "Soriano",
  "Río Negro",
  "Paysandú",
  "Salto",
  "Artigas",
  "Rivera",
  "Tacuarembó",
  "Cerro Largo",
  "Treinta y Tres",
  "Lavalleja",
  "Florida",
  "Flores",
  "Durazno",
];

export const CLOTHING_SIZES = ["S", "M", "L", "XL", "XXL"];
export const SHOE_SIZES = ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"];
