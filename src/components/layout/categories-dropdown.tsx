"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Category = { id: string; name: string; slug: string };

export function CategoriesDropdown({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 hover:text-accent transition-colors"
        aria-expanded={open}
      >
        Categorías
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-3 w-56 border border-border bg-background py-2 shadow-lg">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/tienda?category=${c.slug}`}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm normal-case tracking-normal hover:bg-surface hover:text-accent"
            >
              {c.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
