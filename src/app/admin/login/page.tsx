"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = new FormData(e.currentTarget);

    const res = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false,
    });

    setLoading(false);
    if (res?.error) {
      setError("Email o contraseña incorrectos.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
      <div className="w-full max-w-sm border border-border bg-surface p-8">
        <h1 className="font-display text-3xl tracking-wide">LULUCHA ADMIN</h1>
        <p className="mt-1 text-sm text-muted">Ingresa tus credenciales de administrador.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input name="email" type="email" required placeholder="admin@lulucha.com.uy" className="input" />
          <input name="password" type="password" required placeholder="Contraseña" className="input" />
          {error && <p className="text-sm text-accent">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent py-3 text-sm font-bold uppercase text-accent-foreground hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}
