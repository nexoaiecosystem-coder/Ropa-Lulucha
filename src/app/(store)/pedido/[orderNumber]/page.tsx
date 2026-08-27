import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";

export const revalidate = 0;

const PAYMENT_LABELS: Record<string, string> = {
  mercadopago: "Mercado Pago",
  abitab_redpagos: "Abitab / RedPagos",
  transferencia: "Transferencia bancaria",
};

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;
  const order = await prisma.order.findUnique({
    where: { orderNumber },
    include: { items: true },
  });

  if (!order) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <div className="mb-8 text-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h1 className="font-display mt-4 text-4xl tracking-wide">¡Pedido confirmado!</h1>
        <p className="mt-2 text-muted">
          Pedido <span className="font-semibold text-foreground">{order.orderNumber}</span> · Pagado con{" "}
          {PAYMENT_LABELS[order.paymentMethod] ?? order.paymentMethod}
        </p>
      </div>

      <div className="border border-border bg-surface p-6">
        <ul className="divide-y divide-border">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between py-3 text-sm">
              <span>
                {item.productName} · {item.size} × {item.quantity}
              </span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Subtotal</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Envío</span>
            <span>{order.shippingCost === 0 ? "Gratis" : formatPrice(order.shippingCost)}</span>
          </div>
          <div className="flex justify-between border-t border-border pt-2 text-base font-bold">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 border border-border bg-surface p-6 text-sm">
        <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-muted">
          {order.shippingMethod === "retiro" ? "Retiro en local" : "Envío a"}
        </h2>
        <p>{order.customerName}</p>
        {order.shippingMethod === "despacho" && (
          <p className="text-muted">
            {order.address}, {order.city}, {order.region}
          </p>
        )}
        <p className="text-muted">{order.email}</p>
      </div>

      <div className="mt-8 text-center">
        <Link href="/tienda" className="bg-accent px-7 py-3 text-sm font-bold uppercase text-accent-foreground">
          Seguir comprando
        </Link>
      </div>
    </div>
  );
}
