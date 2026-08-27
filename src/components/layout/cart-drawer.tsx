"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useCartStore, cartTotals } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants";
import { useHydrated } from "@/lib/use-hydrated";

export function CartDrawer() {
  const hydrated = useHydrated();
  const isOpen = useCartStore((s) => s.isOpen);
  const close = useCartStore((s) => s.close);
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  if (!hydrated) return null;

  const { subtotal, discountRate, discountAmount, afterDiscount } = cartTotals(items);
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - afterDiscount, 0);
  const progress = Math.min((afterDiscount / FREE_SHIPPING_THRESHOLD) * 100, 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            className="absolute inset-0 bg-black/60"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.div
            className="relative flex h-full w-full max-w-md flex-col border-l border-border bg-background"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="font-display text-2xl tracking-wide">Tu carrito</h2>
              <button onClick={close} aria-label="Cerrar carrito" className="transition-transform hover:rotate-90">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="border-b border-border px-5 py-3 text-xs">
              {remaining > 0 ? (
                <p>
                  Te faltan <span className="font-bold text-accent">{formatPrice(remaining)}</span> para
                  envío gratis
                </p>
              ) : (
                <p className="font-bold text-accent">¡Envío gratis desbloqueado!</p>
              )}
              <div className="mt-2 h-1.5 w-full overflow-hidden bg-surface-2">
                <motion.div
                  className="h-1.5 bg-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-5 text-center">
                <p className="text-muted">Tu carrito está vacío.</p>
                <Link
                  href="/tienda"
                  onClick={close}
                  className="bg-accent px-6 py-3 text-sm font-bold uppercase text-accent-foreground transition-transform hover:scale-105"
                >
                  Ir a la tienda
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto divide-y divide-border px-5">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={item.variantId}
                        className="flex gap-4 py-4"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, x: 40, height: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <img src={item.image} alt={item.name} className="h-24 w-20 shrink-0 object-cover" />
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <Link href={`/producto/${item.slug}`} onClick={close} className="text-sm font-medium hover:text-accent">
                              {item.name}
                            </Link>
                            <button
                              onClick={() => removeItem(item.variantId)}
                              className="text-muted transition-colors hover:text-accent"
                              aria-label="Quitar"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                              </svg>
                            </button>
                          </div>
                          <span className="text-xs text-muted">Talle {item.size}</span>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center border border-border">
                              <button
                                className="px-2 py-1 text-sm transition-colors hover:bg-surface-2"
                                onClick={() => setQuantity(item.variantId, item.quantity - 1)}
                              >
                                −
                              </button>
                              <motion.span
                                key={item.quantity}
                                className="inline-block px-3 text-sm"
                                initial={{ scale: 1.4, opacity: 0.4 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.2 }}
                              >
                                {item.quantity}
                              </motion.span>
                              <button
                                className="px-2 py-1 text-sm transition-colors hover:bg-surface-2"
                                onClick={() => setQuantity(item.variantId, item.quantity + 1)}
                                disabled={item.quantity >= item.maxStock}
                              >
                                +
                              </button>
                            </div>
                            <span className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                <div className="border-t border-border px-5 py-5">
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-muted">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {discountRate > 0 && (
                    <div className="mb-1 flex items-center justify-between text-sm text-accent">
                      <span>Descuento por cantidad ({Math.round(discountRate * 100)}%)</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="mb-4 flex items-center justify-between text-sm font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(afterDiscount)}</span>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={close}
                    className="block w-full bg-accent py-3 text-center text-sm font-bold uppercase text-accent-foreground transition-transform hover:scale-[1.02] hover:opacity-90"
                  >
                    Ir a pagar
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
