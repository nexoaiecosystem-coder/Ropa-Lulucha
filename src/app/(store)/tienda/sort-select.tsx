"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function SortSelect({ current }: { current: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <select
      defaultValue={current}
      onChange={(e) => {
        const next = new URLSearchParams(searchParams.toString());
        next.set("sort", e.target.value);
        router.push(`/tienda?${next.toString()}`);
      }}
      className="border border-border bg-background px-3 py-2 text-sm outline-none"
      aria-label="Ordenar por"
    >
      <option value="novedades">Novedades</option>
      <option value="precio-asc">Precio: menor a mayor</option>
      <option value="precio-desc">Precio: mayor a menor</option>
    </select>
  );
}
