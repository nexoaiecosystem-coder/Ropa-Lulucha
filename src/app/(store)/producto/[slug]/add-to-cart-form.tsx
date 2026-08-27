"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cart-store";

type Variant = { id: string; size: string; stock: number };

export function AddToCartForm({
  productId,
  slug,
  name,
  price,
  image,
  variants,
}: {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  variants: Variant[];
}) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const addItem = useCartStore((s) => s.addItem);
  const router = useRouter();

  const selectedVariant = variants.find((v) => v.size === selectedSize);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-widest text-muted">Talle</span>
        <button
          type="button"
          onClick={() => router.push("/guia-de-tallas")}
          className="text-xs text-muted underline hover:text-accent"
        >
          Guía de talles
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {variants.map((v) => (
          <button
            key={v.id}
            type="button"
            disabled={v.stock === 0}
            onClick={() => {
              setSelectedSize(v.size);
              setError(null);
            }}
            className={`flex h-11 min-w-11 items-center justify-center border px-3 text-sm font-medium transition-colors ${
              v.stock === 0
                ? "cursor-not-allowed border-border text-muted line-through"
                : selectedSize === v.size
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border hover:border-accent"
            }`}
          >
            {v.size}
          </button>
        ))}
      </div>

      {error && <p className="mt-2 text-sm text-accent">{error}</p>}

      <button
        type="button"
        onClick={() => {
          if (!selectedVariant) {
            setError("Elige un talle para continuar.");
            return;
          }
          addItem(
            {
              variantId: selectedVariant.id,
              productId,
              name,
              slug,
              size: selectedVariant.size,
              price,
              image,
              maxStock: selectedVariant.stock,
            },
            1
          );
        }}
        className="mt-6 w-full bg-accent py-4 text-sm font-bold uppercase tracking-wide text-accent-foreground hover:opacity-90"
      >
        Añadir al carrito
      </button>
    </div>
  );
}
