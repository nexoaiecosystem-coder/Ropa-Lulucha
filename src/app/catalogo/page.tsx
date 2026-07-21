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

  const hasFilters = Boolean(categoria || genero || talle || coleccion);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Toda la tienda</h1>
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

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="flex flex-col gap-8">
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
                  className={`rounded border px-2.5 py-1 text-xs font-medium transition ${
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
        </aside>

        <div>
          {filtered.length === 0 ? (
            <p className="text-zinc-600 dark:text-zinc-400">
              No hay productos que coincidan con estos filtros.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
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
      <div className="flex flex-col gap-2">{children}</div>
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
