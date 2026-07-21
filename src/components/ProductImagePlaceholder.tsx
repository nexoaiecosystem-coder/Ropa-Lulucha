import { Product } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";

// No hay fotos de producto todavía: mientras tanto mostramos un bloque con
// degradé, el nombre de la marca y el producto. Reemplazar por <Image> con
// la foto real cuando exista el catálogo fotográfico.
export function ProductImagePlaceholder({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  return (
    <div
      className={`relative flex aspect-square flex-col items-center justify-center gap-2 bg-gradient-to-br p-6 text-center ${product.accent} ${className}`}
    >
      <span className="absolute left-4 top-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/60">
        {siteConfig.brandName}
      </span>
      <span className="text-sm font-bold uppercase leading-snug tracking-wide text-white">
        {product.name}
      </span>
    </div>
  );
}
