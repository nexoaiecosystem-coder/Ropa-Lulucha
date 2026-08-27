"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Price } from "./price";
import { Badge } from "./badge";
import { WishlistButton } from "./wishlist-button";

export type ProductCardData = {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice: number | null;
  isNewDrop: boolean;
  bestSeller: boolean;
  images: { url: string; alt: string | null }[];
  variants: { stock: number }[];
};

export function ProductCard({ product }: { product: ProductCardData }) {
  const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0);
  const soldOut = totalStock === 0;
  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] ?? primaryImage;
  const hasDiscount = !soldOut && !!product.compareAtPrice && product.compareAtPrice > product.price;
  const percentOff = hasDiscount
    ? Math.round((1 - product.price / product.compareAtPrice!) * 100)
    : 0;

  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}>
      <Link href={`/producto/${product.slug}`} className="group block">
        <div className="relative aspect-[4/5] overflow-hidden bg-surface transition-shadow duration-300 group-hover:shadow-xl">
          {primaryImage && (
            <img
              src={primaryImage.url}
              alt={primaryImage.alt ?? product.name}
              className="absolute inset-0 h-full w-full scale-100 object-cover transition-all duration-500 ease-out group-hover:scale-105 group-hover:opacity-0"
            />
          )}
          {secondaryImage && (
            <img
              src={secondaryImage.url}
              alt={secondaryImage.alt ?? product.name}
              className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100"
            />
          )}
          <div className="absolute left-2 top-2 flex flex-col gap-1">
            {soldOut ? (
              <Badge variant="muted">Agotado</Badge>
            ) : product.isNewDrop ? (
              <Badge variant="accent" pulse>
                Nuevo
              </Badge>
            ) : product.bestSeller ? (
              <Badge variant="default">Más Vendido</Badge>
            ) : null}
            {hasDiscount && (
              <Badge variant="accent" pulse>
                -{percentOff}%
              </Badge>
            )}
          </div>
          <WishlistButton
            item={{
              productId: product.id,
              slug: product.slug,
              name: product.name,
              price: product.price,
              compareAtPrice: product.compareAtPrice,
              image: primaryImage?.url ?? "",
            }}
          />
        </div>
        <div className="mt-3 space-y-1">
          <h3 className="text-sm font-medium text-foreground transition-colors group-hover:text-accent">
            {product.name}
          </h3>
          <Price price={product.price} compareAtPrice={product.compareAtPrice} />
        </div>
      </Link>
    </motion.div>
  );
}
