import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { products } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";

export default function Home() {
  const bestSellers = products.filter((product) => product.isBestSeller);
  const newDrops = products.filter((product) => product.isNew).slice(0, 3);

  return (
    <div className="flex flex-col">
      <section className="bg-brand-dark text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-5 px-4 py-14 sm:gap-6 sm:px-6 sm:py-24">
          <span className="rounded bg-brand-accent px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            Envíos a todo {siteConfig.city.split(",")[1]?.trim() ?? "Uruguay"}
          </span>
          <h1 className="max-w-2xl text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl sm:leading-tight md:text-5xl">
            {siteConfig.tagline}
          </h1>
          <p className="max-w-xl text-base text-white/70 sm:text-lg">{siteConfig.description}</p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/catalogo"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-white/90"
            >
              Ver catálogo
            </Link>
            <WhatsAppButton message="Hola! Quiero hacer una consulta.">
              Consultar por WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="mb-5 flex items-center justify-between sm:mb-8">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">Nuevos drops</h2>
          <Link
            href="/catalogo?coleccion=nuevos-drops"
            className="text-sm font-medium underline underline-offset-4"
          >
            Ver todo
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {newDrops.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 sm:pb-16">
        <div className="mb-5 flex items-center justify-between sm:mb-8">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">Más vendidos</h2>
          <Link
            href="/catalogo?coleccion=mas-vendidos"
            className="text-sm font-medium underline underline-offset-4"
          >
            Ver todo
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {bestSellers.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
