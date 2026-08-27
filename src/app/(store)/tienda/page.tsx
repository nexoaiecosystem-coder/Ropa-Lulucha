import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ui/product-card";
import { SortSelect } from "./sort-select";
import { Gender, type Prisma } from "@/generated/prisma/client";

export const revalidate = 0;

const CLOTHING_ORDER = ["S", "M", "L", "XL", "XXL"];

function sortSizes(sizes: string[]) {
  return [...sizes].sort((a, b) => {
    const ai = CLOTHING_ORDER.indexOf(a);
    const bi = CLOTHING_ORDER.indexOf(b);
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1;
    if (bi !== -1) return 1;
    if (a === "Único") return 1;
    if (b === "Único") return -1;
    return Number(a) - Number(b);
  });
}

const SORTS: Record<string, Prisma.ProductOrderByWithRelationInput> = {
  "novedades": { createdAt: "desc" },
  "precio-asc": { price: "asc" },
  "precio-desc": { price: "desc" },
};

const GENDER_LABELS: Record<string, string> = { HOMBRE: "Hombre", MUJER: "Mujer", UNISEX: "Unisex" };

export default async function TiendaPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const categorySlug = typeof params.category === "string" ? params.category : undefined;
  const gender = typeof params.gender === "string" ? params.gender : undefined;
  const size = typeof params.size === "string" ? params.size : undefined;
  const drop = typeof params.drop === "string" ? params.drop : undefined;
  const bestseller = typeof params.bestseller === "string" ? params.bestseller : undefined;
  const q = typeof params.q === "string" ? params.q.trim() : undefined;
  const sort = typeof params.sort === "string" && SORTS[params.sort] ? params.sort : "novedades";

  const where: Prisma.ProductWhereInput = { active: true };
  if (categorySlug) where.category = { slug: categorySlug };
  if (gender && gender in Gender) where.gender = gender as Gender;
  if (drop === "nuevo") where.isNewDrop = true;
  if (bestseller === "1") where.bestSeller = true;
  if (size) where.variants = { some: { size, stock: { gt: 0 } } };
  if (q)
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
    ];

  const [categories, products, distinctSizes] = await Promise.all([
    prisma.category.findMany({ orderBy: { order: "asc" } }),
    prisma.product.findMany({
      where,
      include: { images: { orderBy: { order: "asc" } }, variants: true },
      orderBy: SORTS[sort],
    }),
    prisma.productVariant.findMany({ distinct: ["size"], select: { size: true } }),
  ]);

  const availableSizes = sortSizes(
    Array.from(new Set(distinctSizes.map((v) => v.size))).filter((s) => s !== "Único")
  );

  const buildHref = (overrides: Record<string, string | undefined>) => {
    const next = new URLSearchParams();
    const merged = { category: categorySlug, gender, size, drop, bestseller, q, sort, ...overrides };
    for (const [k, v] of Object.entries(merged)) {
      if (v) next.set(k, v);
    }
    const qs = next.toString();
    return qs ? `/tienda?${qs}` : "/tienda";
  };

  const activeCategory = categories.find((c) => c.slug === categorySlug);

  const chips: { label: string; href: string }[] = [];
  if (q) chips.push({ label: `Búsqueda: "${q}"`, href: buildHref({ q: undefined }) });
  if (categorySlug) chips.push({ label: activeCategory?.name ?? categorySlug, href: buildHref({ category: undefined }) });
  if (gender) chips.push({ label: GENDER_LABELS[gender] ?? gender, href: buildHref({ gender: undefined }) });
  if (size) chips.push({ label: `Talle ${size}`, href: buildHref({ size: undefined }) });
  if (drop === "nuevo") chips.push({ label: "Nuevos Drops", href: buildHref({ drop: undefined }) });
  if (bestseller === "1") chips.push({ label: "Más Vendidos", href: buildHref({ bestseller: undefined }) });

  const pageTitle = q
    ? `Resultados para "${q}"`
    : drop === "nuevo"
      ? "Nuevos Drops"
      : bestseller === "1"
        ? "Más Vendidos"
        : (activeCategory?.name ?? "Toda la Tienda");

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="font-display text-4xl tracking-wide">{pageTitle}</h1>
        <p className="mt-1 text-sm text-muted">{products.length} productos</p>
      </div>

      {chips.length > 0 && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {chips.map((chip) => (
            <Link
              key={chip.label}
              href={chip.href}
              className="flex items-center gap-1.5 border border-border bg-surface px-3 py-1.5 text-xs font-medium hover:border-accent hover:text-accent"
            >
              {chip.label}
              <span aria-hidden>×</span>
            </Link>
          ))}
          <Link href="/tienda" className="text-xs text-muted underline hover:text-accent">
            Limpiar todo
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
        <aside className="space-y-8">
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted">Género</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={buildHref({ gender: undefined })} className={!gender ? "text-accent font-semibold" : "hover:text-accent"}>
                  Todos
                </Link>
              </li>
              <li>
                <Link href={buildHref({ gender: "HOMBRE" })} className={gender === "HOMBRE" ? "text-accent font-semibold" : "hover:text-accent"}>
                  Hombre
                </Link>
              </li>
              <li>
                <Link href={buildHref({ gender: "MUJER" })} className={gender === "MUJER" ? "text-accent font-semibold" : "hover:text-accent"}>
                  Mujer
                </Link>
              </li>
              <li>
                <Link href={buildHref({ gender: "UNISEX" })} className={gender === "UNISEX" ? "text-accent font-semibold" : "hover:text-accent"}>
                  Unisex
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted">Categoría</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={buildHref({ category: undefined })} className={!categorySlug ? "text-accent font-semibold" : "hover:text-accent"}>
                  Todas
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c.id}>
                  <Link
                    href={buildHref({ category: c.slug })}
                    className={categorySlug === c.slug ? "text-accent font-semibold" : "hover:text-accent"}
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted">Talle</h3>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map((s) => (
                <Link
                  key={s}
                  href={buildHref({ size: size === s ? undefined : s })}
                  className={`flex h-8 w-8 items-center justify-center border text-xs font-medium ${
                    size === s ? "border-accent bg-accent text-accent-foreground" : "border-border hover:border-accent"
                  }`}
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted">Colección</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={buildHref({ drop: drop === "nuevo" ? undefined : "nuevo" })} className={drop === "nuevo" ? "text-accent font-semibold" : "hover:text-accent"}>
                  Nuevos Drops
                </Link>
              </li>
              <li>
                <Link href={buildHref({ bestseller: bestseller === "1" ? undefined : "1" })} className={bestseller === "1" ? "text-accent font-semibold" : "hover:text-accent"}>
                  Más Vendidos
                </Link>
              </li>
            </ul>
          </div>
        </aside>

        <div>
          <div className="mb-6 flex justify-end">
            <SortSelect current={sort} />
          </div>

          {products.length === 0 ? (
            <p className="py-24 text-center text-muted">No encontramos productos con esos filtros.</p>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
