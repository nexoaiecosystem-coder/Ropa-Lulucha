import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";

export const revalidate = 0;

const STATUS_LABELS: Record<string, string> = {
  PENDIENTE: "Pendiente",
  PAGADO: "Pagado",
  PREPARANDO: "Preparando",
  ENVIADO: "Enviado",
  ENTREGADO: "Entregado",
  CANCELADO: "Cancelado",
};

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="font-display text-4xl tracking-wide">Pedidos</h1>

      <div className="mt-6 border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface text-xs uppercase tracking-widest text-muted">
            <tr>
              <th className="p-3">Pedido</th>
              <th className="p-3">Cliente</th>
              <th className="p-3">Total</th>
              <th className="p-3">Estado</th>
              <th className="p-3">Fecha</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.map((o) => (
              <tr key={o.id}>
                <td className="p-3">
                  <Link href={`/admin/pedidos/${o.id}`} className="font-medium hover:text-accent">
                    {o.orderNumber}
                  </Link>
                </td>
                <td className="p-3 text-muted">{o.customerName}</td>
                <td className="p-3">{formatPrice(o.total)}</td>
                <td className="p-3">{STATUS_LABELS[o.status] ?? o.status}</td>
                <td className="p-3 text-muted">{o.createdAt.toLocaleDateString("es-CL")}</td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td className="p-6 text-center text-muted" colSpan={5}>
                  Aún no hay pedidos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
