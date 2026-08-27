"use client";

import Link from "next/link";
import { useWishlistStore } from "@/lib/wishlist-store";
import { useHydrated } from "@/lib/use-hydrated";
import { Price } from "@/components/ui/price";
import { WishlistButton } from "@/components/ui/wishlist-button";

export default function FavoritosPage() {
  const hydrated = useHydrated();
  const items = useWishlistStore((s) => s.items);

  if (!hydrated) return null;

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-24 text-center">
        <h1 className="font-display text-4xl tracking-wide">Tus Favoritos</h1>
        <p className="text-muted">Todavía no agregaste nada. Tocá el corazón en un producto para guardarlo acá.</p>
        <Link href="/tienda" className="mt-2 bg-accent px-7 py-3 text-sm font-bold uppercase text-accent-foreground">
          Ir a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-4xl tracking-wide">Tus Favoritos</h1>
      <p className="mt-1 text-sm text-muted">{items.length} producto(s)</p>

      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.productId} className="group relative">
            <Link href={`/producto/${item.slug}`} className="block">
              <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                {item.image && (
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                )}
              </div>
              <div className="mt-3 space-y-1">
                <h3 className="text-sm font-medium group-hover:text-accent transition-colors">{item.name}</h3>
                <Price price={item.price} compareAtPrice={item.compareAtPrice} />
              </div>
            </Link>
            <WishlistButton item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
