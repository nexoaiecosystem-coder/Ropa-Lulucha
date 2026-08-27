import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ui/product-card";

export const revalidate = 0;

export default async function Home() {
  const [categories, newDrops, bestSellers, featured] = await Promise.all([
    prisma.category.findMany({ orderBy: { order: "asc" } }),
    prisma.product.findMany({
      where: { active: true, isNewDrop: true },
      include: { images: { orderBy: { order: "asc" } }, variants: true },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
    prisma.product.findMany({
      where: { active: true, bestSeller: true },
      include: { images: { orderBy: { order: "asc" } }, variants: true },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
    prisma.product.findMany({
      where: { active: true, featured: true },
      include: { images: { orderBy: { order: "asc" } }, variants: true },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
  ]);

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[80vh] items-end overflow-hidden bg-surface">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(232,50,31,0.25), transparent 55%), radial-gradient(circle at 80% 70%, rgba(232,50,31,0.15), transparent 50%)",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.7))]" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Streetwear · Traído de Chile
          </p>
          <h1 className="font-display mt-3 text-6xl leading-none tracking-wide sm:text-8xl">
            ROPA CON
            <br />
            ACTITUD CALLEJERA
          </h1>
          <p className="mt-5 max-w-md text-sm text-muted sm:text-base">
            Poleras, polerones, championes y accesorios streetwear traídos directo desde Chile
            para Uruguay. Calces oversize, drops limitados y la actitud de la calle.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/tienda?gender=HOMBRE"
              className="bg-accent px-7 py-3 text-sm font-bold uppercase tracking-wide text-accent-foreground hover:opacity-90"
            >
              Comprar Hombre
            </Link>
            <Link
              href="/tienda?gender=MUJER"
              className="border border-foreground px-7 py-3 text-sm font-bold uppercase tracking-wide hover:border-accent hover:text-accent"
            >
              Comprar Mujer
            </Link>
          </div>
        </div>
      </section>

      {/* Category grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-3xl tracking-wide">Categorías</h2>
          <Link href="/tienda" className="text-sm font-medium hover:text-accent">
            Ver todo →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((c, i) => (
            <Link
              key={c.id}
              href={`/tienda?category=${c.slug}`}
              className="group relative flex aspect-[3/4] items-end overflow-hidden bg-surface-2"
            >
              <img
                src={`/api/placeholder/${["171717", "b91c1c", "1c1917", "78716c", "a8a29e"][i % 5]}/${encodeURIComponent(c.name)}`}
                alt={c.name}
                className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-300 group-hover:scale-105"
              />
              <span className="relative w-full bg-gradient-to-t from-black/80 to-transparent px-3 py-4 text-sm font-bold uppercase tracking-wide text-white">
                {c.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* New Drops */}
      {newDrops.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-3xl tracking-wide">Nuevos Drops</h2>
            <Link href="/tienda?drop=nuevo" className="text-sm font-medium hover:text-accent">
              Ver todo →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {newDrops.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Best Sellers */}
      {bestSellers.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-3xl tracking-wide">Más Vendidos</h2>
            <Link href="/tienda?bestseller=1" className="text-sm font-medium hover:text-accent">
              Ver todo →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {bestSellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Progressive discount promo */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { tag: "2 prendas", pct: "10% OFF" },
            { tag: "3 prendas", pct: "20% OFF" },
            { tag: "4+ prendas", pct: "30% OFF" },
          ].map((t) => (
            <div
              key={t.tag}
              className="flex items-center justify-between border border-border bg-surface px-6 py-5"
            >
              <span className="text-sm font-medium text-muted">{t.tag}</span>
              <span className="font-display text-2xl tracking-wide text-accent">{t.pct}</span>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted">Descuento aplicado automáticamente en el carrito.</p>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-3xl tracking-wide">Destacados</h2>
            <Link href="/tienda" className="text-sm font-medium hover:text-accent">
              Ver todo →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
