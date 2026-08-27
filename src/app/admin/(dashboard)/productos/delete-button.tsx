"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function DeleteButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(`¿Eliminar "${name}"? Esta acción no se puede deshacer.`)) return;
    setLoading(true);
    setError(null);
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error ?? "No se pudo eliminar.");
      return;
    }
    router.refresh();
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={handleDelete}
        disabled={loading}
        className="text-xs text-muted hover:text-accent disabled:opacity-60"
      >
        {loading ? "Eliminando..." : "Eliminar"}
      </button>
      {error && <p className="max-w-[180px] text-right text-[11px] text-accent">{error}</p>}
    </div>
  );
}
