import Link from "next/link";
import { Product } from "@/lib/products";
import { formatPrice } from "@/lib/site-config";
import { ProductImagePlaceholder } from "./ProductImagePlaceholder";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/catalogo/${product.slug}`}
      className="group overflow-hidden rounded-2xl border border-black/10 bg-white transition hover:border-black/20 hover:shadow-lg dark:border-white/10 dark:bg-zinc-900 dark:hover:border-white/20"
    >
      <ProductImagePlaceholder product={product} className="rounded-t-2xl" />
      <div className="flex flex-col gap-1 p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          {product.brand}
        </span>
        <h3 className="font-semibold text-zinc-900 group-hover:underline dark:text-zinc-50">
          {product.name}
        </h3>
        <p className="mt-1 font-semibold text-zinc-900 dark:text-zinc-50">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
