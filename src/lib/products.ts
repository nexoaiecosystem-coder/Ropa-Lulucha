// Catálogo de ejemplo. Los productos, precios, talles y descripciones son
// de muestra (placeholder) para poder probar el sitio antes de cargar el
// stock real. Reemplazar por los datos y fotos reales del negocio.
export type Product = {
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  sizes: string[];
  colors: string[];
  description: string;
  accent: string;
};

export const products: Product[] = [
  {
    slug: "buzo-nike-tech-fleece-gris",
    name: "Buzo Nike Tech Fleece",
    brand: "Nike",
    category: "Buzos",
    price: 4990,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Gris", "Negro"],
    description:
      "Buzo canguro original Nike, tela Tech Fleece, ideal para media estación.",
    accent: "from-zinc-700 to-zinc-900",
  },
  {
    slug: "campera-adidas-originals-trefoil",
    name: "Campera Adidas Originals Trefoil",
    brand: "Adidas",
    category: "Camperas",
    price: 6490,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro", "Azul"],
    description: "Campera rompeviento original Adidas, corte clásico Trefoil.",
    accent: "from-blue-700 to-blue-900",
  },
  {
    slug: "remera-jordan-jumpman",
    name: "Remera Jordan Jumpman",
    brand: "Jordan",
    category: "Remeras",
    price: 2990,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro", "Blanco", "Rojo"],
    description: "Remera original Jordan con estampa Jumpman al frente.",
    accent: "from-red-700 to-red-900",
  },
  {
    slug: "zapatillas-nike-air-force-1",
    name: "Zapatillas Nike Air Force 1",
    brand: "Nike",
    category: "Zapatillas",
    price: 8990,
    sizes: ["38", "39", "40", "41", "42", "43"],
    colors: ["Blanco"],
    description: "Clásicas Air Force 1 originales, cuero blanco.",
    accent: "from-slate-200 to-slate-400",
  },
  {
    slug: "pantalon-adidas-tiro",
    name: "Pantalón Adidas Tiro",
    brand: "Adidas",
    category: "Pantalones",
    price: 3990,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro"],
    description: "Pantalón de entrenamiento original Adidas Tiro, puños ajustados.",
    accent: "from-neutral-700 to-neutral-900",
  },
  {
    slug: "zapatillas-jordan-1-mid",
    name: "Zapatillas Jordan 1 Mid",
    brand: "Jordan",
    category: "Zapatillas",
    price: 10990,
    sizes: ["38", "39", "40", "41", "42"],
    colors: ["Negro", "Rojo"],
    description: "Jordan 1 Mid originales, colorway Bred.",
    accent: "from-red-800 to-black",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getCategories() {
  return Array.from(new Set(products.map((product) => product.category)));
}
