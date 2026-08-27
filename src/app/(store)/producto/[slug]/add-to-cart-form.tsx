"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
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
  const [justAdded, setJustAdded] = useState(false);
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
          className="text-xs text-muted underline transition-colors hover:text-accent"
        >
          Guía de talles
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {variants.map((v) => (
          <motion.button
            key={v.id}
            type="button"
            disabled={v.stock === 0}
            onClick={() => {
              setSelectedSize(v.size);
              setError(null);
            }}
            whileTap={v.stock > 0 ? { scale: 0.9 } : undefined}
            className={`flex h-11 min-w-11 items-center justify-center border px-3 text-sm font-medium transition-colors ${
              v.stock === 0
                ? "cursor-not-allowed border-border text-muted line-through"
                : selectedSize === v.size
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border hover:border-accent"
            }`}
          >
            {v.size}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-sm text-accent"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        animate={justAdded ? { backgroundColor: "#16a34a" } : { backgroundColor: "var(--accent)" }}
        transition={{ duration: 0.25 }}
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
          setJustAdded(true);
          setTimeout(() => setJustAdded(false), 1200);
        }}
        className="mt-6 w-full py-4 text-sm font-bold uppercase tracking-wide text-accent-foreground"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={justAdded ? "added" : "add"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="inline-block"
          >
            {justAdded ? "Agregado ✓" : "Añadir al carrito"}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
