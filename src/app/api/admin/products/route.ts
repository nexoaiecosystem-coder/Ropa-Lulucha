import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";

const variantSchema = z.object({
  size: z.string().min(1),
  stock: z.number().int().min(0),
});

const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(1),
  price: z.number().int().positive(),
  compareAtPrice: z.number().int().positive().nullable().optional(),
  gender: z.enum(["HOMBRE", "MUJER", "UNISEX"]),
  categoryId: z.string().min(1),
  featured: z.boolean().default(false),
  isNewDrop: z.boolean().default(false),
  bestSeller: z.boolean().default(false),
  active: z.boolean().default(true),
  images: z.array(z.object({ url: z.string().min(1), alt: z.string().optional() })).min(1),
  variants: z.array(variantSchema).min(1),
});

export async function POST(req: Request) {
  const { response } = await requireAdmin();
  if (response) return response;

  const body = await req.json();
  const parsed = productSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos", details: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;

  const existing = await prisma.product.findUnique({ where: { slug: data.slug } });
  if (existing) {
    return NextResponse.json({ error: "Ya existe un producto con ese slug" }, { status: 409 });
  }

  const product = await prisma.product.create({
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description,
      price: data.price,
      compareAtPrice: data.compareAtPrice ?? null,
      gender: data.gender,
      categoryId: data.categoryId,
      featured: data.featured,
      isNewDrop: data.isNewDrop,
      bestSeller: data.bestSeller,
      active: data.active,
      images: { create: data.images.map((img, i) => ({ url: img.url, alt: img.alt, order: i })) },
      variants: { create: data.variants.map((v) => ({ size: v.size, stock: v.stock })) },
    },
  });

  return NextResponse.json({ id: product.id });
}
