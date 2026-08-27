import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const [orderCount, revenueAgg, productCount, lowStock, recentOrders] = await Promise.all([
    prisma.order.count(),
    prisma.order.aggregate({ _sum: { total: true } }),
    prisma.product.count({ where: { active: true } }),
    prisma.productVariant.findMany({
      where: { stock: { lte: 3 } },
      include: { product: true },
      orderBy: { stock: "asc" },
      take: 6,
    }),
    prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 6 }),
  ]);

  const stats = [
    { label: "Pedidos totales", value: orderCount },
    { label: "Ventas totales", value: formatPrice(revenueAgg._sum.total ?? 0) },
    { label: "Productos activos", value: productCount },
  ];

  return (
    <div>
      <h1 className="font-display text-4xl tracking-wide">Dashboard</h1>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="border border-border bg-surface p-5">
            <p className="text-xs uppercase tracking-widest text-muted">{s.label}</p>
            <p className="mt-2 text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <section>
          <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-muted">
            Pedidos recientes
          </h2>
          <div className="border border-border">
            {recentOrders.length === 0 ? (
              <p className="p-4 text-sm text-muted">Aún no hay pedidos.</p>
            ) : (
              <ul className="divide-y divide-border">
                {recentOrders.map((o) => (
                  <li key={o.id} className="flex items-center justify-between p-4 text-sm">
                    <div>
                      <Link href={`/admin/pedidos/${o.id}`} className="font-medium hover:text-accent">
                        {o.orderNumber}
                      </Link>
                      <p className="text-xs text-muted">{o.customerName}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatPrice(o.total)}</p>
                      <p className="text-xs text-muted">{o.status}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-muted">
            Stock bajo (≤ 3 unidades)
          </h2>
          <div className="border border-border">
            {lowStock.length === 0 ? (
              <p className="p-4 text-sm text-muted">Todo con buen stock.</p>
            ) : (
              <ul className="divide-y divide-border">
                {lowStock.map((v) => (
                  <li key={v.id} className="flex items-center justify-between p-4 text-sm">
                    <div>
                      <Link href={`/admin/productos/${v.productId}`} className="font-medium hover:text-accent">
                        {v.product.name}
                      </Link>
                      <p className="text-xs text-muted">Talle {v.size}</p>
                    </div>
                    <span className={`font-semibold ${v.stock === 0 ? "text-accent" : ""}`}>
                      {v.stock} u.
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
