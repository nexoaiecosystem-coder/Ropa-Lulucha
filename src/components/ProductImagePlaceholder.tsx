import { Product } from "@/lib/products";

// No hay fotos de producto todavía: mientras tanto mostramos un bloque con
// degradé y el nombre de la marca. Reemplazar por <Image> con la foto real
// cuando exista el catálogo fotográfico.
export function ProductImagePlaceholder({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  return (
    <div
      className={`flex aspect-square items-center justify-center bg-gradient-to-br ${product.accent} ${className}`}
    >
      <span className="text-center text-sm font-semibold uppercase tracking-widest text-white/90">
        {product.brand}
      </span>
    </div>
  );
}
