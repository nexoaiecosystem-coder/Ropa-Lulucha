import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";

const variantSchema = z.object({
  id: z.string().optional(),
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

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { id } = await params;
  const body = await req.json();
  const parsed = productSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos", details: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;

  const conflicting = await prisma.product.findFirst({ where: { slug: data.slug, id: { not: id } } });
  if (conflicting) {
    return NextResponse.json({ error: "Ya existe un producto con ese slug" }, { status: 409 });
  }

  await prisma.$transaction(async (tx) => {
    await tx.product.update({
      where: { id },
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
      },
    });

    await tx.productImage.deleteMany({ where: { productId: id } });
    await tx.productImage.createMany({
      data: data.images.map((img, i) => ({ productId: id, url: img.url, alt: img.alt, order: i })),
    });

    const existingVariants = await tx.productVariant.findMany({ where: { productId: id } });
    const keepIds = data.variants.filter((v) => v.id).map((v) => v.id!);
    const toDelete = existingVariants.filter((v) => !keepIds.includes(v.id));
    if (toDelete.length > 0) {
      await tx.productVariant.deleteMany({ where: { id: { in: toDelete.map((v) => v.id) } } });
    }

    for (const v of data.variants) {
      if (v.id) {
        await tx.productVariant.update({ where: { id: v.id }, data: { size: v.size, stock: v.stock } });
      } else {
        await tx.productVariant.create({ data: { productId: id, size: v.size, stock: v.stock } });
      }
    }
  });

  return NextResponse.json({ id });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { id } = await params;
  try {
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "No se puede eliminar: este producto tiene pedidos asociados. Desactívalo en su lugar." },
      { status: 400 }
    );
  }
}
