import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-start gap-4 px-6 py-24">
      <h1 className="text-3xl font-bold tracking-tight">Página no encontrada</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        El link al que intentaste acceder no existe o cambió de dirección.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
