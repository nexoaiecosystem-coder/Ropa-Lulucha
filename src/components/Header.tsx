import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { MobileNav } from "./MobileNav";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/envios-y-pagos", label: "Envíos y pagos" },
  { href: "/contacto", label: "Contacto" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-black/10 bg-white/90 backdrop-blur dark:border-white/10 dark:bg-black/90">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold tracking-tight">
          {siteConfig.brandName}
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium sm:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-zinc-600 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <MobileNav links={links} />
      </div>
    </header>
  );
}
