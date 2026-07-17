import type { Metadata } from "next";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { buildInstagramLink, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contacto",
};

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="mb-4 text-3xl font-bold tracking-tight">Contacto</h1>
      <p className="mb-8 text-zinc-600 dark:text-zinc-400">
        Todavía no tenemos local físico: por ahora vendemos por WhatsApp e
        Instagram, con envíos a todo Uruguay. Estamos en {siteConfig.city}.
      </p>
      <div className="flex flex-wrap gap-3">
        <WhatsAppButton message="Hola! Quiero hacer una consulta.">
          Escribir por WhatsApp
        </WhatsAppButton>
        <a
          href={buildInstagramLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full border border-black/10 px-6 py-3 text-sm font-semibold transition hover:border-black/30 dark:border-white/10 dark:hover:border-white/30"
        >
          Seguinos en Instagram
        </a>
      </div>
    </div>
  );
}
