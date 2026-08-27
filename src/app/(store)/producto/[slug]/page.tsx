import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Price } from "@/components/ui/price";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ui/product-card";
import { WishlistButton } from "@/components/ui/wishlist-button";
import { Gallery } from "./gallery";
import { AddToCartForm } from "./add-to-cart-form";

export const revalidate = 0;

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { order: "asc" } },
      variants: { orderBy: { size: "asc" } },
      category: true,
    },
  });

  if (!product || !product.active) notFound();

  const related = await prisma.product.findMany({
    where: { active: true, categoryId: product.categoryId, id: { not: product.id } },
    include: { images: { orderBy: { order: "asc" } }, variants: true },
    take: 4,
  });

  const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <Gallery images={product.images} name={product.name} />

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted">
            {product.category.name}
          </p>
          <h1 className="font-display mt-1 text-4xl tracking-wide">{product.name}</h1>

          <div className="mt-4 flex items-center gap-3">
            <Price price={product.price} compareAtPrice={product.compareAtPrice} size="lg" />
            {product.isNewDrop && <Badge variant="accent">Nuevo Drop</Badge>}
            {product.bestSeller && <Badge variant="default">Más Vendido</Badge>}
            {totalStock === 0 && <Badge variant="muted">Agotado</Badge>}
          </div>

          <div className="mt-3">
            <WishlistButton
              variant="inline"
              item={{
                productId: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                compareAtPrice: product.compareAtPrice,
                image: product.images[0]?.url ?? "",
              }}
            />
          </div>

          <p className="mt-6 text-sm leading-relaxed text-muted">{product.description}</p>

          <div className="mt-8">
            {totalStock === 0 ? (
              <div className="border border-border bg-surface px-4 py-4 text-sm text-muted">
                Este producto está agotado por ahora. Vuelve pronto para el próximo drop.
              </div>
            ) : (
              <AddToCartForm
                productId={product.id}
                slug={product.slug}
                name={product.name}
                price={product.price}
                image={product.images[0]?.url ?? ""}
                variants={product.variants}
              />
            )}
          </div>

          <dl className="mt-8 space-y-2 border-t border-border pt-6 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Envío</dt>
              <dd>Envíos a todo Uruguay · Retiro en local Pocitos, Montevideo</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Cambios</dt>
              <dd>30 días para cambios y devoluciones</dd>
            </div>
          </dl>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display mb-6 text-3xl tracking-wide">También te puede gustar</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
