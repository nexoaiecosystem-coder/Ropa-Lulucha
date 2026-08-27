"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ICON_BUTTON_CLASS } from "@/lib/ui";

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    router.push(`/tienda?q=${encodeURIComponent(q)}`);
    setOpen(false);
  }

  return (
    <div className="flex items-center">
      <form
        onSubmit={handleSubmit}
        className={`overflow-hidden transition-all duration-200 ${open ? "w-36 sm:w-52 opacity-100" : "w-0 opacity-0"}`}
      >
        <input
          ref={inputRef}
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => {
            if (!value) setOpen(false);
          }}
          placeholder="Buscar productos..."
          className="w-full border-b border-border bg-transparent px-1 py-1 text-sm outline-none focus:border-accent"
        />
      </form>
      <button type="button" onClick={() => setOpen((o) => !o)} aria-label="Buscar" className={ICON_BUTTON_CLASS}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
