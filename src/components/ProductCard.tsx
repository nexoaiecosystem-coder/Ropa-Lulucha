import Link from "next/link";
import { Product } from "@/lib/products";
import { formatPrice } from "@/lib/site-config";
import { ProductImagePlaceholder } from "./ProductImagePlaceholder";

export function ProductCard({ product }: { product: Product }) {
  const discount = product.originalPrice
    ? Math.round(100 - (product.price / product.originalPrice) * 100)
    : null;

  return (
    <Link
      href={`/catalogo/${product.slug}`}
      className="group overflow-hidden rounded-2xl border border-black/10 bg-white transition hover:border-black/20 hover:shadow-lg dark:border-white/10 dark:bg-zinc-900 dark:hover:border-white/20"
    >
      <div className="relative">
        <ProductImagePlaceholder product={product} className="rounded-t-2xl" />
        {(product.isNew || discount) && (
          <span className="absolute right-3 top-3 rounded bg-brand-accent px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
            {discount ? `-${discount}%` : "Nuevo"}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1 p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          {product.category}
        </span>
        <h3 className="font-semibold text-zinc-900 group-hover:underline dark:text-zinc-50">
          {product.name}
        </h3>
        <p className="mt-1 flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-50">
          {formatPrice(product.price)}
          {product.originalPrice && (
            <span className="text-sm font-normal text-zinc-400 line-through dark:text-zinc-500">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </p>
      </div>
    </Link>
  );
}
