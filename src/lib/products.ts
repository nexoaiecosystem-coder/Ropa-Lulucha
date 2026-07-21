// Catálogo de ejemplo, inspirado en el sitio que armó el hermano de la
// dueña (categorías y nombres reales de la marca Lulucha). Los precios,
// stock y descripciones siguen siendo de muestra hasta que se cargue el
// catálogo definitivo.
export type Gender = "Hombre" | "Mujer" | "Unisex";
export type Category =
  | "Poleras"
  | "Polerones"
  | "Pantalones"
  | "Chaquetas"
  | "Championes"
  | "Jockeys & Accesorios";

export type Product = {
  slug: string;
  name: string;
  category: Category;
  gender: Gender;
  price: number;
  originalPrice?: number;
  sizes: string[];
  colors: string[];
  description: string;
  accent: string;
  isNew?: boolean;
  isBestSeller?: boolean;
};

export const products: Product[] = [
  {
    slug: "polera-lulucha-classic-blanca",
    name: "Polera Lulucha Classic Blanca",
    category: "Poleras",
    gender: "Unisex",
    price: 890,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blanco"],
    description: "Polera de algodón con logo Lulucha bordado al pecho.",
    accent: "from-slate-100 to-slate-300",
    isBestSeller: true,
  },
  {
    slug: "polera-lulucha-logo-negra",
    name: "Polera Lulucha Logo Negra",
    category: "Poleras",
    gender: "Unisex",
    price: 890,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro"],
    description: "Polera de algodón, estampa logo Lulucha en frente y espalda.",
    accent: "from-zinc-700 to-zinc-900",
  },
  {
    slug: "poleron-lulucha-hood-gris",
    name: "Polerón Lulucha Hood Gris",
    category: "Polerones",
    gender: "Unisex",
    price: 1990,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Gris"],
    description: "Polerón con capucha, friza interior, bolsillo canguro.",
    accent: "from-zinc-400 to-zinc-600",
    isNew: true,
  },
  {
    slug: "poleron-lulucha-oversize-negro",
    name: "Polerón Lulucha Oversize Negro",
    category: "Polerones",
    gender: "Unisex",
    price: 2190,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Negro"],
    description: "Polerón corte oversize, tela pesada, capucha forrada.",
    accent: "from-neutral-800 to-black",
    isBestSeller: true,
  },
  {
    slug: "pantalon-cargo-lulucha",
    name: "Pantalón Cargo Lulucha",
    category: "Pantalones",
    gender: "Hombre",
    price: 1790,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Verde", "Negro"],
    description: "Pantalón cargo con bolsillos laterales, corte relajado.",
    accent: "from-emerald-800 to-emerald-950",
  },
  {
    slug: "pantalon-jogger-lulucha",
    name: "Pantalón Jogger Lulucha",
    category: "Pantalones",
    gender: "Mujer",
    price: 1590,
    sizes: ["S", "M", "L"],
    colors: ["Negro"],
    description: "Jogger de friza con puños ajustados, elástico en la cintura.",
    accent: "from-neutral-700 to-neutral-900",
  },
  {
    slug: "chaqueta-puffer-andes",
    name: "Chaqueta Puffer Andes",
    category: "Chaquetas",
    gender: "Unisex",
    price: 2490,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro"],
    description: "Campera puffer acolchada, ideal para el invierno uruguayo.",
    accent: "from-red-900 via-neutral-900 to-black",
    isNew: true,
  },
  {
    slug: "championes-lulucha-high-top-negros",
    name: "Championes Lulucha High Top Negros",
    category: "Championes",
    gender: "Unisex",
    price: 3290,
    originalPrice: 3890,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
    colors: ["Negro"],
    description: "Championes botitos de caña alta, suela de goma antideslizante.",
    accent: "from-neutral-900 to-black",
    isBestSeller: true,
  },
  {
    slug: "championes-lulucha-runner-blancos",
    name: "Championes Lulucha Runner Blancos",
    category: "Championes",
    gender: "Unisex",
    price: 2990,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
    colors: ["Blanco"],
    description: "Championes runner livianos, para uso diario.",
    accent: "from-slate-100 to-slate-300",
    isNew: true,
  },
  {
    slug: "bolso-cartero-lulucha",
    name: "Bolso Cartero Lulucha",
    category: "Jockeys & Accesorios",
    gender: "Unisex",
    price: 990,
    sizes: ["Único"],
    colors: ["Gris"],
    description: "Bolso cartero de lona resistente, bandolera ajustable.",
    accent: "from-slate-200 to-slate-400",
    isNew: true,
  },
  {
    slug: "beanie-lulucha-negro",
    name: "Beanie Lulucha Negro",
    category: "Jockeys & Accesorios",
    gender: "Unisex",
    price: 590,
    sizes: ["Único"],
    colors: ["Negro"],
    description: "Gorro beanie de punto grueso con logo Lulucha bordado.",
    accent: "from-red-700 to-red-900",
  },
  {
    slug: "jockey-lulucha-bordado",
    name: "Jockey Lulucha Bordado",
    category: "Jockeys & Accesorios",
    gender: "Unisex",
    price: 690,
    sizes: ["Único"],
    colors: ["Negro"],
    description: "Jockey de seis paneles con logo Lulucha bordado al frente.",
    accent: "from-neutral-800 to-black",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getCategories() {
  return Array.from(new Set(products.map((product) => product.category)));
}

export function getGenders(): Gender[] {
  return ["Hombre", "Mujer", "Unisex"];
}

export function getAllSizes() {
  return Array.from(new Set(products.flatMap((product) => product.sizes))).sort();
}
