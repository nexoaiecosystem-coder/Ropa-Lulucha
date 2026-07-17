import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { products } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";

export default function Home() {
  const featured = products.slice(0, 3);

  return (
    <div className="flex flex-col">
      <section className="border-b border-black/10 dark:border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-24">
          <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white dark:bg-white dark:text-zinc-900">
            Envíos a todo {siteConfig.city.split(",")[1]?.trim() ?? "Uruguay"}
          </span>
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
            {siteConfig.tagline}
          </h1>
          <p className="max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
            {siteConfig.description}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/catalogo"
              className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Ver catálogo
            </Link>
            <WhatsAppButton message="Hola! Quiero hacer una consulta.">
              Consultar por WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Destacados</h2>
          <Link href="/catalogo" className="text-sm font-medium underline underline-offset-4">
            Ver todo
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
