"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

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

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex">
            <motion.div
              className="absolute inset-0 bg-black/60"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.div
              className="relative flex h-full w-72 flex-col overflow-y-auto border-r border-border bg-background p-6"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-display text-2xl">LULUCHA</span>
                <button onClick={() => setOpen(false)} aria-label="Cerrar menú" className="transition-transform hover:rotate-90">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <motion.nav
                className="flex flex-col gap-4 text-sm font-medium uppercase tracking-wide"
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
              >
                {[
                  { href: "/tienda", label: "Todo" },
                  { href: "/tienda?gender=HOMBRE", label: "Hombre" },
                  { href: "/tienda?gender=MUJER", label: "Mujer" },
                  { href: "/tienda?bestseller=1", label: "Más Vendidos" },
                  { href: "/tienda?drop=nuevo", label: "Nuevos Drops" },
                ].map((l) => (
                  <motion.div
                    key={l.href}
                    variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}
                  >
                    <Link href={l.href} onClick={() => setOpen(false)} className="transition-colors hover:text-accent">
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              <div className="mt-8 border-t border-border pt-6">
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted">Categorías</p>
                <motion.nav
                  className="flex flex-col gap-4 text-sm font-medium uppercase tracking-wide"
                  initial="hidden"
                  animate="show"
                  variants={{ show: { transition: { staggerChildren: 0.04, delayChildren: 0.35 } } }}
                >
                  {categories.map((c) => (
                    <motion.div
                      key={c.id}
                      variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}
                    >
                      <Link href={`/tienda?category=${c.slug}`} onClick={() => setOpen(false)} className="transition-colors hover:text-accent">
                        {c.name}
                      </Link>
                    </motion.div>
                  ))}
                </motion.nav>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
