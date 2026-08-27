import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AnnouncementBar } from "./announcement-bar";
import { CartButton } from "./cart-button";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "./theme-toggle";
import { SearchBar } from "./search-bar";
import { WishlistNavButton } from "./wishlist-nav-button";
import { CategoriesDropdown } from "./categories-dropdown";
import { ICON_BUTTON_CLASS } from "@/lib/ui";
import { WHATSAPP_NUMBER } from "@/lib/constants";

export async function Header() {
  const categories = await prisma.category.findMany({ orderBy: { order: "asc" } });

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
      <AnnouncementBar />
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <MobileNav categories={categories} />
          <Link
            href="/"
            className="font-display text-2xl tracking-wide text-foreground transition-transform duration-200 hover:scale-105 hover:text-accent sm:text-3xl"
          >
            LULUCHA
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium uppercase tracking-wide">
          <Link href="/tienda" className="nav-underline hover:text-accent transition-colors">
            Todo
          </Link>
          <Link href="/tienda?gender=HOMBRE" className="nav-underline hover:text-accent transition-colors">
            Hombre
          </Link>
          <Link href="/tienda?gender=MUJER" className="nav-underline hover:text-accent transition-colors">
            Mujer
          </Link>
          <Link href="/tienda?bestseller=1" className="nav-underline hover:text-accent transition-colors">
            Más Vendidos
          </Link>
          <Link href="/tienda?drop=nuevo" className="nav-underline hover:text-accent transition-colors">
            Nuevos Drops
          </Link>
          <CategoriesDropdown categories={categories} />
        </nav>

        <div className="flex items-center gap-1">
          <SearchBar />
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden sm:flex ${ICON_BUTTON_CLASS}`}
            aria-label="Contacto WhatsApp"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.42 1.26 4.86L2 22l5.32-1.28c1.38.72 2.94 1.13 4.72 1.13 5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm5.8 14.24c-.24.68-1.4 1.3-1.94 1.36-.5.06-1.12.08-1.8-.12-.42-.12-.96-.3-1.66-.6-2.92-1.26-4.82-4.2-4.96-4.4-.14-.2-1.18-1.56-1.18-2.98 0-1.42.74-2.12 1-2.4.26-.28.58-.36.78-.36h.56c.18 0 .42-.02.64.5.24.56.8 1.94.86 2.08.06.14.1.3.02.48-.08.18-.12.3-.24.46-.12.16-.26.36-.36.48-.12.14-.24.28-.1.54.14.26.62 1.02 1.34 1.66.92.82 1.7 1.08 1.96 1.2.26.12.4.1.56-.06.16-.16.68-.78.86-1.06.18-.28.36-.22.6-.14.24.08 1.56.74 1.82.88.26.14.44.2.5.32.06.12.06.68-.18 1.36Z" />
            </svg>
          </a>
          <ThemeToggle />
          <WishlistNavButton />
          <CartButton />
        </div>
      </div>
    </header>
  );
}
