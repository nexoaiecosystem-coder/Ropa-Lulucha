import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";
import { DeleteButton } from "./delete-button";

export const revalidate = 0;

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true, images: { orderBy: { order: "asc" }, take: 1 }, variants: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-4xl tracking-wide">Productos</h1>
        <Link
          href="/admin/productos/nuevo"
          className="bg-accent px-5 py-2.5 text-sm font-bold uppercase text-accent-foreground hover:opacity-90"
        >
          + Nuevo producto
        </Link>
      </div>

      <div className="border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface text-xs uppercase tracking-widest text-muted">
            <tr>
              <th className="p-3">Producto</th>
              <th className="p-3">Categoría</th>
              <th className="p-3">Precio</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Estado</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((p) => {
              const stock = p.variants.reduce((sum, v) => sum + v.stock, 0);
              return (
                <tr key={p.id}>
                  <td className="flex items-center gap-3 p-3">
                    {p.images[0] && (
                      <img src={p.images[0].url} alt={p.name} className="h-12 w-10 object-cover" />
                    )}
                    <Link href={`/admin/productos/${p.id}`} className="font-medium hover:text-accent">
                      {p.name}
                    </Link>
                  </td>
                  <td className="p-3 text-muted">{p.category.name}</td>
                  <td className="p-3">{formatPrice(p.price)}</td>
                  <td className="p-3">
                    <span className={stock === 0 ? "text-accent" : ""}>{stock} u.</span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`text-xs font-bold uppercase ${p.active ? "text-foreground" : "text-muted"}`}
                    >
                      {p.active ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-4">
                      <Link href={`/admin/productos/${p.id}`} className="text-xs text-accent hover:underline">
                        Editar
                      </Link>
                      <DeleteButton id={p.id} name={p.name} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
