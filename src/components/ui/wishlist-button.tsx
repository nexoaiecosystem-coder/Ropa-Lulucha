"use client";

import { useWishlistStore, type WishlistItem } from "@/lib/wishlist-store";
import { useHydrated } from "@/lib/use-hydrated";
import { clsx } from "clsx";

export function WishlistButton({
  item,
  variant = "overlay",
}: {
  item: WishlistItem;
  variant?: "overlay" | "inline";
}) {
  const hydrated = useHydrated();
  const has = useWishlistStore((s) => s.has);
  const toggle = useWishlistStore((s) => s.toggle);
  const active = hydrated && has(item.productId);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(item);
      }}
      aria-label={active ? "Quitar de favoritos" : "Agregar a favoritos"}
      aria-pressed={active}
      className={clsx(
        variant === "overlay" &&
          "absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur transition-colors hover:bg-background",
        variant === "inline" && "flex items-center gap-2 text-sm font-medium hover:text-accent"
      )}
    >
      <svg
        width={variant === "overlay" ? 17 : 19}
        height={variant === "overlay" ? 17 : 19}
        viewBox="0 0 24 24"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.8"
        className={active ? "text-accent" : "text-foreground"}
      >
        <path
          d="M12 20.5s-7.5-4.6-10-9.2C.5 8 2 4.5 5.5 4.5c2 0 3.5 1.2 4.5 2.7C11 5.7 12.5 4.5 14.5 4.5 18 4.5 19.5 8 22 11.3c-2.5 4.6-10 9.2-10 9.2Z"
          strokeLinejoin="round"
        />
      </svg>
      {variant === "inline" && <span>{active ? "En tus favoritos" : "Agregar a favoritos"}</span>}
    </button>
  );
}
