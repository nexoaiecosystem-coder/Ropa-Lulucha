import { buildInstagramLink, buildWhatsAppLink, siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-black/10 py-10 text-sm text-zinc-500 dark:border-white/10 dark:text-zinc-400">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.brandName} · {siteConfig.city}
        </p>
        <div className="flex gap-4">
          <a
            href={buildWhatsAppLink("Hola! Tengo una consulta.")}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-zinc-50"
          >
            WhatsApp
          </a>
          <a
            href={buildInstagramLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-zinc-50"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
