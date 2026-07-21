"use client";

import Link from "next/link";
import { useState } from "react";

type NavItem = { href: string; label: string };
type NavSection = { title?: string; items: NavItem[] };

export function MobileNav({ sections }: { sections: NavSection[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label="Abrir menú"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white"
      >
        <span className="sr-only">Menú</span>
        {open ? (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>
      {open && (
        <nav className="absolute inset-x-0 top-full max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-white/10 bg-brand-dark px-6 py-4">
          <div className="flex flex-col gap-6">
            {sections.map((section, index) => (
              <div key={section.title ?? index}>
                {section.title && (
                  <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-white/40">
                    {section.title}
                  </h3>
                )}
                <ul className="flex flex-col gap-3 text-sm font-medium">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block text-white/80 hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
}
