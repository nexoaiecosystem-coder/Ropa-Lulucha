import Link from "next/link";
import { getCategories } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";
import { MobileNav } from "./MobileNav";

const shopLinks = [
  { href: "/catalogo", label: "Todo" },
  { href: "/catalogo?genero=Hombre", label: "Hombre" },
  { href: "/catalogo?genero=Mujer", label: "Mujer" },
  { href: "/catalogo?coleccion=mas-vendidos", label: "Más vendidos" },
  { href: "/catalogo?coleccion=nuevos-drops", label: "Nuevos drops" },
];

const infoLinks = [
  { href: "/envios-y-pagos", label: "Envíos y pagos" },
  { href: "/contacto", label: "Contacto" },
];

export function Header() {
  const categories = getCategories();

  return (
    <header className="sticky top-0 z-10 bg-brand-dark text-white">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold tracking-[0.08em] uppercase">
          {siteConfig.brandName}
        </Link>

        <nav className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-wide sm:flex">
          {shopLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-white/70 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <details className="group relative">
            <summary className="cursor-pointer list-none text-white/70 transition hover:text-white [&::-webkit-details-marker]:hidden">
              Categorías
            </summary>
            <div className="absolute left-0 top-full z-20 mt-3 w-56 rounded-md border border-white/10 bg-brand-dark-soft py-2 normal-case shadow-lg">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/catalogo?categoria=${encodeURIComponent(category)}`}
                  className="block px-4 py-2 text-xs font-medium tracking-normal text-white/80 hover:bg-white/5 hover:text-white"
                >
                  {category}
                </Link>
              ))}
            </div>
          </details>
        </nav>

        <div className="hidden items-center gap-5 text-xs font-medium sm:flex">
          {infoLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-white/60 hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>

        <MobileNav links={[...shopLinks, ...infoLinks]} />
      </div>
    </header>
  );
}
