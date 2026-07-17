import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getCategories, products } from "@/lib/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catálogo",
};

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;
  const categories = getCategories();
  const filtered = categoria
    ? products.filter((product) => product.category === categoria)
    : products;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-2 text-3xl font-bold tracking-tight">Catálogo</h1>
      <p className="mb-8 text-zinc-600 dark:text-zinc-400">
        Productos de ejemplo. El stock real se va a ir cargando acá a medida
        que esté disponible.
      </p>

      <div className="mb-10 flex flex-wrap gap-2">
        <Link
          href="/catalogo"
          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
            !categoria
              ? "border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-900"
              : "border-black/10 text-zinc-600 hover:border-black/30 dark:border-white/10 dark:text-zinc-400"
          }`}
        >
          Todos
        </Link>
        {categories.map((category) => (
          <Link
            key={category}
            href={`/catalogo?categoria=${encodeURIComponent(category)}`}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              categoria === category
                ? "border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-900"
                : "border-black/10 text-zinc-600 hover:border-black/30 dark:border-white/10 dark:text-zinc-400"
            }`}
          >
            {category}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
