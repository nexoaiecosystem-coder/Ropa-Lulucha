import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";
import { StatusSelect } from "./status-select";

export default async function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await prisma.order.findUnique({ where: { id }, include: { items: true } });
  if (!order) notFound();

  return (
    <div className="max-w-2xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-4xl tracking-wide">{order.orderNumber}</h1>
        <StatusSelect orderId={order.id} status={order.status} />
      </div>

      <div className="border border-border bg-surface p-6">
        <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted">Cliente</h2>
        <p>{order.customerName}</p>
        <p className="text-muted">{order.email}</p>
        {order.phone && <p className="text-muted">{order.phone}</p>}
      </div>

      <div className="mt-4 border border-border bg-surface p-6">
        <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted">
          {order.shippingMethod === "retiro" ? "Retiro en tienda" : "Dirección de envío"}
        </h2>
        {order.shippingMethod === "despacho" ? (
          <p className="text-muted">
            {order.address}, {order.city}, {order.region}
          </p>
        ) : (
          <p className="text-muted">Retiro en local Pocitos, Montevideo</p>
        )}
        <p className="mt-2 text-xs text-muted">Método de pago: {order.paymentMethod}</p>
      </div>

      <div className="mt-4 border border-border">
        <ul className="divide-y divide-border">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between p-4 text-sm">
              <span>
                {item.productName} · {item.size} × {item.quantity}
              </span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="space-y-2 border-t border-border p-4 text-sm">
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
    </div>
  );
}
