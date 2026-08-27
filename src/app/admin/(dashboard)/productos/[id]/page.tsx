import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "../product-form";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: { images: { orderBy: { order: "asc" } }, variants: { orderBy: { size: "asc" } } },
    }),
    prisma.category.findMany({ orderBy: { order: "asc" } }),
  ]);

  if (!product) notFound();

  return (
    <div>
      <h1 className="font-display text-4xl tracking-wide">Editar producto</h1>
      <div className="mt-8">
        <ProductForm
          categories={categories}
          initial={{
            id: product.id,
            name: product.name,
            slug: product.slug,
            description: product.description,
            price: product.price,
            compareAtPrice: product.compareAtPrice,
            gender: product.gender,
            categoryId: product.categoryId,
            featured: product.featured,
            isNewDrop: product.isNewDrop,
            bestSeller: product.bestSeller,
            active: product.active,
            images: product.images.map((i) => ({ url: i.url, alt: i.alt ?? undefined })),
            variants: product.variants.map((v) => ({ id: v.id, size: v.size, stock: v.stock })),
          }}
        />
      </div>
    </div>
  );
}
