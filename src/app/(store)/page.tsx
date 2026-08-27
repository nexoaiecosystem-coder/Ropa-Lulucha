import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ui/product-card";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Hero } from "./hero";

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
      <Hero />

      {/* Category grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <Reveal className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-3xl tracking-wide">Categorías</h2>
          <Link href="/tienda" className="text-sm font-medium transition-colors hover:text-accent">
            Ver todo →
          </Link>
        </Reveal>
        <RevealGroup className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5" stagger={0.07}>
          {categories.map((c, i) => (
            <RevealItem key={c.id}>
              <Link
                href={`/tienda?category=${c.slug}`}
                className="group relative flex aspect-[3/4] items-end overflow-hidden bg-surface-2 transition-shadow duration-300 hover:shadow-[0_0_0_1px_var(--color-accent)]"
              >
                <img
                  src={`/api/placeholder/${["171717", "b91c1c", "1c1917", "78716c", "a8a29e"][i % 5]}/${encodeURIComponent(c.name)}`}
                  alt={c.name}
                  className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <span className="relative w-full translate-y-1 bg-gradient-to-t from-black/80 to-transparent px-3 py-4 text-sm font-bold uppercase tracking-wide text-white transition-transform duration-300 group-hover:translate-y-0">
                  {c.name}
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* New Drops */}
      {newDrops.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <Reveal className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-3xl tracking-wide">Nuevos Drops</h2>
            <Link href="/tienda?drop=nuevo" className="text-sm font-medium transition-colors hover:text-accent">
              Ver todo →
            </Link>
          </Reveal>
          <RevealGroup className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {newDrops.map((p) => (
              <RevealItem key={p.id}>
                <ProductCard product={p} />
              </RevealItem>
            ))}
          </RevealGroup>
        </section>
      )}

      {/* Best Sellers */}
      {bestSellers.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <Reveal className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-3xl tracking-wide">Más Vendidos</h2>
            <Link href="/tienda?bestseller=1" className="text-sm font-medium transition-colors hover:text-accent">
              Ver todo →
            </Link>
          </Reveal>
          <RevealGroup className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {bestSellers.map((p) => (
              <RevealItem key={p.id}>
                <ProductCard product={p} />
              </RevealItem>
            ))}
          </RevealGroup>
        </section>
      )}

      {/* Progressive discount promo */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <RevealGroup className="grid grid-cols-1 gap-3 sm:grid-cols-3" stagger={0.1}>
          {[
            { tag: "2 prendas", pct: "10% OFF" },
            { tag: "3 prendas", pct: "20% OFF" },
            { tag: "4+ prendas", pct: "30% OFF" },
          ].map((t) => (
            <RevealItem key={t.tag}>
              <div className="flex items-center justify-between border border-border bg-surface px-6 py-5 transition-colors duration-300 hover:border-accent">
                <span className="text-sm font-medium text-muted">{t.tag}</span>
                <span className="font-display text-2xl tracking-wide text-accent">{t.pct}</span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
        <p className="mt-2 text-xs text-muted">Descuento aplicado automáticamente en el carrito.</p>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <Reveal className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-3xl tracking-wide">Destacados</h2>
            <Link href="/tienda" className="text-sm font-medium transition-colors hover:text-accent">
              Ver todo →
            </Link>
          </Reveal>
          <RevealGroup className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {featured.map((p) => (
              <RevealItem key={p.id}>
                <ProductCard product={p} />
              </RevealItem>
            ))}
          </RevealGroup>
        </section>
      )}
    </div>
  );
}
