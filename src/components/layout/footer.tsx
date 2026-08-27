import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="font-display text-3xl tracking-wide">LULUCHA</span>
            <p className="mt-3 text-sm text-muted max-w-xs">
              Ropa y championes streetwear traídos directamente desde Chile, a la venta en
              Uruguay. Drops limitados, calces boxy y actitud callejera.
            </p>
            <div className="mt-4 flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted hover:text-accent">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.2c3.2 0 3.6 0 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.25.07 1.62.07 4.81 0 3.2 0 3.56-.07 4.81-.15 3.23-1.66 4.77-4.92 4.92-1.25.06-1.62.07-4.85.07-3.2 0-3.56 0-4.81-.07-3.26-.15-4.77-1.7-4.92-4.92-.06-1.25-.07-1.61-.07-4.81 0-3.19 0-3.56.07-4.81.15-3.23 1.67-4.77 4.92-4.92C8.44 2.2 8.8 2.2 12 2.2Zm0 5.4a4.4 4.4 0 1 0 0 8.8 4.4 4.4 0 0 0 0-8.8Zm0 7.26a2.86 2.86 0 1 1 0-5.72 2.86 2.86 0 0 1 0 5.72Zm4.58-7.44a1.03 1.03 0 1 0 0-2.06 1.03 1.03 0 0 0 0 2.06Z" />
                </svg>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-muted hover:text-accent">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.5 2h2.6c.2 1.9 1.3 3.4 3.4 3.9v2.7c-1.3.05-2.5-.3-3.6-1v6.6c0 3.2-2.1 5.6-5.6 5.6-3.2 0-5.6-2.4-5.6-5.6 0-3.1 2.4-5.5 5.6-5.5.4 0 .8 0 1.1.1v2.8c-.3-.1-.7-.2-1.1-.2-1.5 0-2.8 1.2-2.8 2.8 0 1.6 1.3 2.8 2.8 2.8 1.6 0 2.9-1.2 2.9-2.8V2Z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted">Ayuda</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/guia-de-tallas" className="hover:text-accent">Guía de talles</Link></li>
              <li><Link href="/cambios-y-devoluciones" className="hover:text-accent">Cambios y devoluciones</Link></li>
              <li><Link href="/contacto" className="hover:text-accent">Contacto</Link></li>
              <li><Link href="/tienda" className="hover:text-accent">Seguimiento de pedido</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted">Tienda</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/tienda?gender=HOMBRE" className="hover:text-accent">Hombre</Link></li>
              <li><Link href="/tienda?gender=MUJER" className="hover:text-accent">Mujer</Link></li>
              <li><Link href="/tienda?drop=nuevo" className="hover:text-accent">Nuevos Drops</Link></li>
              <li><Link href="/favoritos" className="hover:text-accent">Favoritos</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted">Únete a la fam</h4>
            <p className="mt-3 text-sm text-muted">Entérate antes que nadie de los próximos drops y ofertas.</p>
            <form className="mt-3 flex" action="/api/newsletter" method="post">
              <input
                type="email"
                name="email"
                required
                placeholder="tu@email.com"
                className="w-full border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
              />
              <button className="shrink-0 bg-accent px-4 text-sm font-bold text-accent-foreground">
                OK
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Lulucha. Traído de Chile, vendido en Uruguay.</span>
          <span>Mercado Pago · Abitab · RedPagos · Visa · Mastercard</span>
        </div>
      </div>
    </footer>
  );
}
