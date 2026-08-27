"use client";

import Link from "next/link";
import { useState } from "react";

type Category = { id: string; name: string; slug: string };

export function MobileNav({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(true)}
        aria-label="Abrir menú"
        className="flex h-10 w-10 items-center justify-center text-foreground"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="relative flex h-full w-72 flex-col overflow-y-auto bg-background border-r border-border p-6">
            <div className="flex items-center justify-between mb-8">
              <span className="font-display text-2xl">LULUCHA</span>
              <button onClick={() => setOpen(false)} aria-label="Cerrar menú">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col gap-4 text-sm font-medium uppercase tracking-wide">
              <Link href="/tienda" onClick={() => setOpen(false)}>
                Todo
              </Link>
              <Link href="/tienda?gender=HOMBRE" onClick={() => setOpen(false)}>
                Hombre
              </Link>
              <Link href="/tienda?gender=MUJER" onClick={() => setOpen(false)}>
                Mujer
              </Link>
              <Link href="/tienda?bestseller=1" onClick={() => setOpen(false)}>
                Más Vendidos
              </Link>
              <Link href="/tienda?drop=nuevo" onClick={() => setOpen(false)}>
                Nuevos Drops
              </Link>
            </nav>

            <div className="mt-8 border-t border-border pt-6">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted">Categorías</p>
              <nav className="flex flex-col gap-4 text-sm font-medium uppercase tracking-wide">
                {categories.map((c) => (
                  <Link key={c.id} href={`/tienda?category=${c.slug}`} onClick={() => setOpen(false)}>
                    {c.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
