import { formatPrice } from "@/lib/format";

export function Price({
  price,
  compareAtPrice,
  size = "md",
}: {
  price: number;
  compareAtPrice?: number | null;
  size?: "sm" | "md" | "lg";
}) {
  const textSize = size === "lg" ? "text-2xl" : size === "sm" ? "text-sm" : "text-base";
  const hasDiscount = !!compareAtPrice && compareAtPrice > price;

  return (
    <span className="flex items-baseline gap-2">
      <span className={`${textSize} font-semibold text-foreground`}>{formatPrice(price)}</span>
      {hasDiscount && (
        <span className="text-sm text-muted line-through">{formatPrice(compareAtPrice!)}</span>
      )}
    </span>
  );
}
