"use client";

import Link from "next/link";
import { useWishlistStore } from "@/lib/wishlist-store";
import { useHydrated } from "@/lib/use-hydrated";
import { ICON_BUTTON_CLASS } from "@/lib/ui";

export function WishlistNavButton() {
  const hydrated = useHydrated();
  const items = useWishlistStore((s) => s.items);
  const count = hydrated ? items.length : 0;

  return (
    <Link href="/favoritos" aria-label="Ver favoritos" className={ICON_BUTTON_CLASS}>
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path
          d="M12 20.5s-7.5-4.6-10-9.2C.5 8 2 4.5 5.5 4.5c2 0 3.5 1.2 4.5 2.7C11 5.7 12.5 4.5 14.5 4.5 18 4.5 19.5 8 22 11.3c-2.5 4.6-10 9.2-10 9.2Z"
          strokeLinejoin="round"
        />
      </svg>
      {count > 0 && (
        <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
          {count}
        </span>
      )}
    </Link>
  );
}
