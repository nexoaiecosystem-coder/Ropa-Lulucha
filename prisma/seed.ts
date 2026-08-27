import { PrismaClient, Gender } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const PALETTE = ["171717", "b91c1c", "d4d4d4", "1c1917", "78716c", "a8a29e"];

function placeholder(label: string, colorIndex: number) {
  const bg = PALETTE[colorIndex % PALETTE.length];
  return `/api/placeholder/${bg}/${encodeURIComponent(label)}`;
}

const CLOTHING_SIZES = ["S", "M", "L", "XL", "XXL"];
const SHOE_SIZES = ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"];

function stockFor(i: number, sizeIndex: number) {
  // Deterministic pseudo-random stock, with a couple of sold-out sizes for realism.
  const v = (i * 7 + sizeIndex * 13) % 11;
  return v === 0 ? 0 : v + 2;
}

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.adminUser.deleteMany();

  const categories = await Promise.all(
    [
      { name: "Poleras", slug: "poleras", order: 1 },
      { name: "Polerones", slug: "polerones", order: 2 },
      { name: "Pantalones", slug: "pantalones", order: 3 },
      { name: "Chaquetas", slug: "chaquetas", order: 4 },
      { name: "Championes", slug: "championes", order: 5 },
      { name: "Jockeys & Accesorios", slug: "jockeys-accesorios", order: 6 },
    ].map((c) => prisma.category.create({ data: c }))
  );

  const [poleras, polerones, pantalones, chaquetas, championes, jockeys] = categories;

  type Seed = {
    name: string;
    slug: string;
    description: string;
    price: number;
    compareAtPrice?: number;
    gender: Gender;
    categoryId: string;
    featured?: boolean;
    isNewDrop?: boolean;
    bestSeller?: boolean;
    sizeType?: "clothing" | "shoe" | "unique";
  };

  const products: Seed[] = [
    {
      name: "Polera Oversize Lulucha Negra",
      slug: "polera-oversize-lulucha-negra",
      description:
        "Polera oversize de algodón peinado 240gsm, calce boxy fit y estampado frontal Lulucha. Básico esencial del streetwear, traída directo desde Chile.",
      price: 990,
      gender: Gender.UNISEX,
      categoryId: poleras.id,
      featured: true,
      isNewDrop: true,
      bestSeller: true,
    },
    {
      name: "Polera Boxy Fit Santiago Skyline",
      slug: "polera-boxy-fit-santiago-skyline",
      description:
        "Polera boxy fit con estampado del skyline de Santiago en la espalda. Algodón 100% peinado, tacto suave.",
      price: 890,
      compareAtPrice: 1190,
      gender: Gender.UNISEX,
      categoryId: poleras.id,
      featured: true,
    },
    {
      name: "Polera Mujer Crop Lulucha",
      slug: "polera-mujer-crop-lulucha",
      description: "Polera crop top con logo bordado, calce ajustado y algodón elastizado.",
      price: 790,
      gender: Gender.MUJER,
      categoryId: poleras.id,
    },
    {
      name: "Polera Grafica Ande Rebelde",
      slug: "polera-grafica-ande-rebelde",
      description: "Polera regular fit con gráfica inspirada en la cordillera y la cultura urbana andina.",
      price: 890,
      gender: Gender.HOMBRE,
      categoryId: poleras.id,
      isNewDrop: true,
    },
    {
      name: "Polerón Boxy Hoodie Lulucha",
      slug: "poleron-boxy-hoodie-lulucha",
      description:
        "Polerón con capucha boxy fit, friza 320gsm, bolsillo canguro y cordones a tono. El favorito del invierno.",
      price: 1690,
      compareAtPrice: 1990,
      gender: Gender.UNISEX,
      categoryId: polerones.id,
      featured: true,
      isNewDrop: true,
      bestSeller: true,
    },
    {
      name: "Polerón Oversize Valpo Nights",
      slug: "poleron-oversize-valpo-nights",
      description: "Polerón oversize con estampado nocturno de los cerros de Valparaíso.",
      price: 1790,
      gender: Gender.UNISEX,
      categoryId: polerones.id,
      featured: true,
    },
    {
      name: "Polerón Zip Up Lulucha Gris",
      slug: "poleron-zip-up-lulucha-gris",
      description: "Polerón con cierre completo, friza premium y logo bordado en el pecho.",
      price: 1890,
      gender: Gender.HOMBRE,
      categoryId: polerones.id,
    },
    {
      name: "Polerón Crop Mujer Lulucha",
      slug: "poleron-crop-mujer-lulucha",
      description: "Polerón corto con capucha, calce ajustado y friza suave al tacto.",
      price: 1590,
      gender: Gender.MUJER,
      categoryId: polerones.id,
      isNewDrop: true,
    },
    {
      name: "Pantalón Cargo Baggy Lulucha",
      slug: "pantalon-cargo-baggy-lulucha",
      description: "Pantalón cargo calce baggy con bolsillos laterales y cintura ajustable. Ícono del streetwear urbano.",
      price: 1490,
      gender: Gender.UNISEX,
      categoryId: pantalones.id,
      featured: true,
      bestSeller: true,
    },
    {
      name: "Pantalón Jogger Técnico Negro",
      slug: "pantalon-jogger-tecnico-negro",
      description: "Jogger técnico con puños elastizados y tela liviana resistente al agua.",
      price: 1390,
      gender: Gender.HOMBRE,
      categoryId: pantalones.id,
    },
    {
      name: "Pantalón Wide Leg Mujer",
      slug: "pantalon-wide-leg-mujer",
      description: "Pantalón wide leg de tiro alto, silueta relajada y tela con caída premium.",
      price: 1490,
      compareAtPrice: 1790,
      gender: Gender.MUJER,
      categoryId: pantalones.id,
      isNewDrop: true,
    },
    {
      name: "Chaqueta Windbreaker Lulucha",
      slug: "chaqueta-windbreaker-lulucha",
      description: "Cortavientos con forro de malla, capucha ajustable y bolsillos con cierre.",
      price: 1990,
      gender: Gender.UNISEX,
      categoryId: chaquetas.id,
      featured: true,
    },
    {
      name: "Chaqueta Puffer Andes",
      slug: "chaqueta-puffer-andes",
      description: "Chaqueta acolchada estilo puffer, ideal para el invierno uruguayo. Diseñada en los Andes chilenos.",
      price: 2490,
      gender: Gender.UNISEX,
      categoryId: chaquetas.id,
      isNewDrop: true,
    },
    {
      name: "Chaqueta Varsity Lulucha",
      slug: "chaqueta-varsity-lulucha",
      description: "Chaqueta varsity con mangas en contraste y parche bordado Lulucha.",
      price: 2290,
      gender: Gender.HOMBRE,
      categoryId: chaquetas.id,
    },
    {
      name: "Championes Lulucha Runner Blancos",
      slug: "championes-lulucha-runner-blancos",
      description:
        "Championes urbanos estilo runner, cuero sintético blanco con detalles en contraste. Traídos directo desde Chile.",
      price: 2990,
      gender: Gender.UNISEX,
      categoryId: championes.id,
      featured: true,
      isNewDrop: true,
      bestSeller: true,
      sizeType: "shoe",
    },
    {
      name: "Championes Lulucha High Top Negros",
      slug: "championes-lulucha-high-top-negros",
      description: "Championes caña alta, suela gruesa y agarre reforzado. El básico de la calle.",
      price: 3290,
      compareAtPrice: 3890,
      gender: Gender.UNISEX,
      categoryId: championes.id,
      featured: true,
      sizeType: "shoe",
    },
    {
      name: "Championes Lulucha Trail Andes",
      slug: "championes-lulucha-trail-andes",
      description: "Championes estilo trail con suela texturizada, inspirados en la cordillera de los Andes.",
      price: 3690,
      gender: Gender.HOMBRE,
      categoryId: championes.id,
      isNewDrop: true,
      sizeType: "shoe",
    },
    {
      name: "Championes Lulucha Platform Mujer",
      slug: "championes-lulucha-platform-mujer",
      description: "Championes plataforma, calce cómodo y diseño urbano femenino.",
      price: 3490,
      gender: Gender.MUJER,
      categoryId: championes.id,
      sizeType: "shoe",
    },
    {
      name: "Jockey Lulucha Bordado",
      slug: "jockey-lulucha-bordado",
      description: "Jockey de 6 paneles con logo bordado en 3D y cierre trasero ajustable.",
      price: 690,
      gender: Gender.UNISEX,
      categoryId: jockeys.id,
      featured: true,
      sizeType: "unique",
    },
    {
      name: "Beanie Lulucha Negro",
      slug: "beanie-lulucha-negro",
      description: "Gorro beanie de punto grueso con etiqueta Lulucha.",
      price: 590,
      gender: Gender.UNISEX,
      categoryId: jockeys.id,
      sizeType: "unique",
    },
    {
      name: "Bolso Cartero Lulucha",
      slug: "bolso-cartero-lulucha",
      description: "Bolso cartero de lona resistente con bolsillo frontal y correa ajustable.",
      price: 990,
      gender: Gender.UNISEX,
      categoryId: jockeys.id,
      isNewDrop: true,
      sizeType: "unique",
    },
  ];

  let colorIndex = 0;
  for (const p of products) {
    const product = await prisma.product.create({
      data: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.price,
        compareAtPrice: p.compareAtPrice,
        gender: p.gender,
        categoryId: p.categoryId,
        featured: !!p.featured,
        isNewDrop: !!p.isNewDrop,
        bestSeller: !!p.bestSeller,
      },
    });

    await prisma.productImage.createMany({
      data: [
        { productId: product.id, url: placeholder(p.name, colorIndex), order: 0 },
        { productId: product.id, url: placeholder(`${p.name} vista 2`, colorIndex + 1), order: 1 },
      ],
    });

    const sizeType = p.sizeType ?? "clothing";
    const sizes = sizeType === "unique" ? ["Único"] : sizeType === "shoe" ? SHOE_SIZES : CLOTHING_SIZES;

    await prisma.productVariant.createMany({
      data: sizes.map((size, sizeIndex) => ({
        productId: product.id,
        size,
        stock: stockFor(colorIndex, sizeIndex),
      })),
    });

    colorIndex++;
  }

  await prisma.adminUser.create({
    data: {
      email: "admin@lulucha.com.uy",
      password: await bcrypt.hash("lulucha2026", 10),
      name: "Admin Lulucha",
    },
  });

  console.log(`Seed listo: ${products.length} productos, ${categories.length} categorías, 1 admin.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
