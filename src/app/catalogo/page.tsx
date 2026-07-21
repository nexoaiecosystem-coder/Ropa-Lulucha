import Link from "next/link";
import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { getAllSizes, getCategories, getGenders, products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Catálogo",
};

type SearchParams = {
  categoria?: string;
  genero?: string;
  talle?: string;
  coleccion?: string;
};

function buildHref(current: SearchParams, changes: Partial<SearchParams>) {
  const next = { ...current, ...changes };
  const params = new URLSearchParams();
  if (next.categoria) params.set("categoria", next.categoria);
  if (next.genero) params.set("genero", next.genero);
  if (next.talle) params.set("talle", next.talle);
  if (next.coleccion) params.set("coleccion", next.coleccion);
  const qs = params.toString();
  return qs ? `/catalogo?${qs}` : "/catalogo";
}

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { categoria, genero, talle, coleccion } = params;

  const categories = getCategories();
  const genders = getGenders();
  const sizes = getAllSizes();

  const filtered = products.filter((product) => {
    if (categoria && product.category !== categoria) return false;
    if (genero && product.gender !== genero) return false;
    if (talle && !product.sizes.includes(talle)) return false;
    if (coleccion === "nuevos-drops" && !product.isNew) return false;
    if (coleccion === "mas-vendidos" && !product.isBestSeller) return false;
    return true;
  });

  const activeCount = [categoria, genero, talle, coleccion].filter(Boolean).length;
  const hasFilters = activeCount > 0;

  const filterGroups = (
    <>
      <FilterGroup title="Género">
        {genders.map((gender) => (
          <FilterLink
            key={gender}
            label={gender}
            active={genero === gender}
            href={buildHref(params, { genero: genero === gender ? undefined : gender })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Categoría">
        {categories.map((category) => (
          <FilterLink
            key={category}
            label={category}
            active={categoria === category}
            href={buildHref(params, {
              categoria: categoria === category ? undefined : category,
            })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Talle">
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <Link
              key={size}
              href={buildHref(params, { talle: talle === size ? undefined : size })}
              className={`rounded border px-3 py-1.5 text-xs font-medium transition ${
                talle === size
                  ? "border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-900"
                  : "border-black/10 text-zinc-600 hover:border-black/30 dark:border-white/10 dark:text-zinc-400"
              }`}
            >
              {size}
            </Link>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Colección">
        <FilterLink
          label="Nuevos drops"
          active={coleccion === "nuevos-drops"}
          href={buildHref(params, {
            coleccion: coleccion === "nuevos-drops" ? undefined : "nuevos-drops",
          })}
        />
        <FilterLink
          label="Más vendidos"
          active={coleccion === "mas-vendidos"}
          href={buildHref(params, {
            coleccion: coleccion === "mas-vendidos" ? undefined : "mas-vendidos",
          })}
        />
      </FilterGroup>
    </>
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4 sm:mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Toda la tienda</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {filtered.length} producto{filtered.length === 1 ? "" : "s"} de ejemplo
          </p>
        </div>
        {hasFilters && (
          <Link href="/catalogo" className="text-sm font-medium underline underline-offset-4">
            Limpiar filtros
          </Link>
        )}
      </div>

      {/* Filtros en mobile: panel plegable para no tapar los productos */}
      <details className="mb-6 rounded-lg border border-black/10 dark:border-white/10 lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold [&::-webkit-details-marker]:hidden">
          <span>
            Filtros
            {activeCount > 0 && (
              <span className="ml-2 rounded-full bg-brand-accent px-2 py-0.5 text-xs text-white">
                {activeCount}
              </span>
            )}
          </span>
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
          </svg>
        </summary>
        <div className="flex flex-col gap-6 border-t border-black/10 px-4 py-5 dark:border-white/10">
          {filterGroups}
        </div>
      </details>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:flex lg:flex-col lg:gap-8">{filterGroups}</aside>

        <div>
          {filtered.length === 0 ? (
            <p className="text-zinc-600 dark:text-zinc-400">
              No hay productos que coincidan con estos filtros.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 xl:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        {title}
      </h2>
      <div className="flex flex-col gap-3 lg:gap-2">{children}</div>
    </div>
  );
}

function FilterLink({
  label,
  active,
  href,
}: {
  label: string;
  active: boolean;
  href: string;
}) {
  return (
    <Link
      href={href}
      className={`text-sm transition ${
        active
          ? "font-semibold text-brand-accent"
          : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
      }`}
    >
      {label}
    </Link>
  );
}
