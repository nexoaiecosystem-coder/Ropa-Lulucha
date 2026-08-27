import Link from "next/link";
import { auth, signOut } from "@/auth";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="hidden w-56 shrink-0 border-r border-border bg-surface p-6 sm:block">
        <span className="font-display text-2xl tracking-wide">LULUCHA</span>
        <p className="mt-1 text-xs text-muted">Panel admin</p>

        <nav className="mt-8 flex flex-col gap-1 text-sm">
          <Link href="/admin" className="rounded px-3 py-2 hover:bg-surface-2">
            Dashboard
          </Link>
          <Link href="/admin/productos" className="rounded px-3 py-2 hover:bg-surface-2">
            Productos
          </Link>
          <Link href="/admin/pedidos" className="rounded px-3 py-2 hover:bg-surface-2">
            Pedidos
          </Link>
          <Link href="/tienda" className="rounded px-3 py-2 hover:bg-surface-2 text-muted">
            Ver tienda ↗
          </Link>
        </nav>

        <div className="mt-10 border-t border-border pt-4">
          <p className="text-xs text-muted">{session?.user?.email}</p>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button type="submit" className="mt-2 text-xs text-accent hover:underline">
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 p-6 sm:p-10">{children}</main>
    </div>
  );
}
