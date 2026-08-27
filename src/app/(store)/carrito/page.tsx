"use client";

import Link from "next/link";
import { useCartStore, cartTotals } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_COST } from "@/lib/constants";
import { useHydrated } from "@/lib/use-hydrated";

export default function CartPage() {
  const hydrated = useHydrated();
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  if (!hydrated) return null;

  const { subtotal, discountRate, discountAmount, afterDiscount } = cartTotals(items);
  const shipping = afterDiscount >= FREE_SHIPPING_THRESHOLD || afterDiscount === 0 ? 0 : STANDARD_SHIPPING_COST;
  const total = afterDiscount + shipping;

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-24 text-center">
        <h1 className="font-display text-4xl tracking-wide">Tu carrito está vacío</h1>
        <p className="text-muted">Explora los últimos drops y encuentra tu próximo básico.</p>
        <Link href="/tienda" className="mt-2 bg-accent px-7 py-3 text-sm font-bold uppercase text-accent-foreground">
          Ir a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-4xl tracking-wide">Tu Carrito</h1>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px]">
        <ul className="divide-y divide-border border-y border-border">
          {items.map((item) => (
            <li key={item.variantId} className="flex gap-4 py-5">
              <img src={item.image} alt={item.name} className="h-32 w-24 shrink-0 object-cover" />
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link href={`/producto/${item.slug}`} className="font-medium hover:text-accent">
                      {item.name}
                    </Link>
                    <p className="text-sm text-muted">Talle {item.size}</p>
                  </div>
                  <button onClick={() => removeItem(item.variantId)} className="text-muted hover:text-accent" aria-label="Quitar">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center border border-border">
                    <button className="px-3 py-1.5 text-sm" onClick={() => setQuantity(item.variantId, item.quantity - 1)}>
                      −
                    </button>
                    <span className="px-4 text-sm">{item.quantity}</span>
                    <button
                      className="px-3 py-1.5 text-sm"
                      onClick={() => setQuantity(item.variantId, item.quantity + 1)}
                      disabled={item.quantity >= item.maxStock}
                    >
                      +
                    </button>
                  </div>
                  <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="h-fit border border-border bg-surface p-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted">Resumen</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            {discountRate > 0 && (
              <div className="flex justify-between text-accent">
                <span>Descuento por cantidad ({Math.round(discountRate * 100)}%)</span>
                <span>-{formatPrice(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted">Envío</span>
              <span>{shipping === 0 ? "Gratis" : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2 text-base font-bold">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
          <Link
            href="/checkout"
            className="mt-6 block w-full bg-accent py-3 text-center text-sm font-bold uppercase text-accent-foreground hover:opacity-90"
          >
            Continuar a pago
          </Link>
        </div>
      </div>
    </div>
  );
}
