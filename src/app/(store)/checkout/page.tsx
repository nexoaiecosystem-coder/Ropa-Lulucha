"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore, cartTotals } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_COST, DEPARTMENTS } from "@/lib/constants";
import { useHydrated } from "@/lib/use-hydrated";

export default function CheckoutPage() {
  const hydrated = useHydrated();
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const router = useRouter();

  const [shippingMethod, setShippingMethod] = useState<"despacho" | "retiro">("despacho");
  const [paymentMethod, setPaymentMethod] = useState<"mercadopago" | "abitab_redpagos" | "transferencia">(
    "mercadopago"
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { subtotal, discountRate, discountAmount, afterDiscount } = cartTotals(items);
  const shippingCost =
    shippingMethod === "retiro" || afterDiscount >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
  const total = afterDiscount + shippingCost;

  if (!hydrated) return null;

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-24 text-center">
        <h1 className="font-display text-4xl tracking-wide">No hay nada que pagar</h1>
        <p className="text-muted">Tu carrito está vacío.</p>
        <Link href="/tienda" className="mt-2 bg-accent px-7 py-3 text-sm font-bold uppercase text-accent-foreground">
          Ir a la tienda
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = new FormData(e.currentTarget);
    const payload = {
      customerName: String(form.get("customerName") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      address: String(form.get("address") ?? ""),
      city: String(form.get("city") ?? ""),
      region: String(form.get("region") ?? ""),
      shippingMethod,
      paymentMethod,
      items: items.map((i) => ({ variantId: i.variantId, quantity: i.quantity })),
    };

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "No se pudo procesar el pedido.");
        setSubmitting(false);
        return;
      }
      clear();
      router.push(`/pedido/${data.orderNumber}`);
    } catch {
      setError("Error de conexión. Intenta nuevamente.");
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-4xl tracking-wide">Checkout</h1>

      <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px]">
        <div className="space-y-8">
          <section>
            <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted">Contacto</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input name="customerName" required placeholder="Nombre completo" className="input" />
              <input name="email" type="email" required placeholder="Email" className="input" />
              <input name="phone" placeholder="Teléfono (opcional)" className="input sm:col-span-2" />
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted">Entrega</h2>
            <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setShippingMethod("despacho")}
                className={`border px-4 py-3 text-left text-sm ${shippingMethod === "despacho" ? "border-accent bg-surface" : "border-border"}`}
              >
                <span className="block font-semibold">Despacho a domicilio</span>
                <span className="text-muted text-xs">3-7 días hábiles a todo Uruguay</span>
              </button>
              <button
                type="button"
                onClick={() => setShippingMethod("retiro")}
                className={`border px-4 py-3 text-left text-sm ${shippingMethod === "retiro" ? "border-accent bg-surface" : "border-border"}`}
              >
                <span className="block font-semibold">Retiro en local</span>
                <span className="text-muted text-xs">Gratis · Pocitos, Montevideo</span>
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                name="address"
                required={shippingMethod === "despacho"}
                placeholder={shippingMethod === "retiro" ? "Dirección (referencial)" : "Dirección"}
                className="input sm:col-span-2"
              />
              <input name="city" required placeholder="Ciudad / Localidad" className="input" />
              <select name="region" required defaultValue="" className="input">
                <option value="" disabled>
                  Departamento
                </option>
                {DEPARTMENTS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted">Pago</h2>
            <div className="space-y-2">
              {[
                { id: "mercadopago", label: "Mercado Pago", hint: "Tarjetas, débito y saldo en cuenta" },
                { id: "abitab_redpagos", label: "Abitab / RedPagos", hint: "Pago en efectivo en cualquier local" },
                { id: "transferencia", label: "Transferencia bancaria", hint: "Confirmación manual" },
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setPaymentMethod(opt.id as typeof paymentMethod)}
                  className={`flex w-full items-center justify-between border px-4 py-3 text-left text-sm ${
                    paymentMethod === opt.id ? "border-accent bg-surface" : "border-border"
                  }`}
                >
                  <span>
                    <span className="block font-semibold">{opt.label}</span>
                    <span className="text-muted text-xs">{opt.hint}</span>
                  </span>
                  <span
                    className={`h-4 w-4 rounded-full border ${paymentMethod === opt.id ? "border-accent bg-accent" : "border-border"}`}
                  />
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted">
              Modo de prueba: el pago se simula automáticamente. Para cobrar de verdad, conecta tus
              credenciales de Mercado Pago o tu integración con Abitab/RedPagos.
            </p>
          </section>
        </div>

        <div className="h-fit border border-border bg-surface p-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted">Resumen</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {items.map((item) => (
              <li key={item.variantId} className="flex justify-between gap-3">
                <span className="text-muted">
                  {item.name} · {item.size} × {item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            {discountRate > 0 && (
              <div className="flex justify-between text-accent">
                <span>Descuento ({Math.round(discountRate * 100)}%)</span>
                <span>-{formatPrice(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted">Envío</span>
              <span>{shippingCost === 0 ? "Gratis" : formatPrice(shippingCost)}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2 text-base font-bold">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          {error && <p className="mt-4 text-sm text-accent">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full bg-accent py-3 text-center text-sm font-bold uppercase text-accent-foreground hover:opacity-90 disabled:opacity-60"
          >
            {submitting ? "Procesando..." : `Pagar ${formatPrice(total)}`}
          </button>
        </div>
      </form>
    </div>
  );
}
