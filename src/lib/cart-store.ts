"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { discountRateForCount } from "@/lib/constants";

export type CartItem = {
  variantId: string;
  productId: string;
  name: string;
  slug: string;
  size: string;
  price: number;
  image: string;
  quantity: number;
  maxStock: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (variantId: string) => void;
  setQuantity: (variantId: string, quantity: number) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      addItem: (item, quantity = 1) => {
        const existing = get().items.find((i) => i.variantId === item.variantId);
        if (existing) {
          const nextQty = Math.min(existing.quantity + quantity, existing.maxStock);
          set({
            items: get().items.map((i) =>
              i.variantId === item.variantId ? { ...i, quantity: nextQty } : i
            ),
          });
        } else {
          set({
            items: [...get().items, { ...item, quantity: Math.min(quantity, item.maxStock) }],
          });
        }
        set({ isOpen: true });
      },
      removeItem: (variantId) =>
        set({ items: get().items.filter((i) => i.variantId !== variantId) }),
      setQuantity: (variantId, quantity) =>
        set({
          items: get()
            .items.map((i) =>
              i.variantId === variantId
                ? { ...i, quantity: Math.max(1, Math.min(quantity, i.maxStock)) }
                : i
            )
            .filter((i) => i.quantity > 0),
        }),
      clear: () => set({ items: [] }),
    }),
    { name: "lulucha-cart" }
  )
);

export function cartCount(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}

export function cartSubtotal(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.quantity * i.price, 0);
}

export function cartTotals(items: CartItem[]) {
  const subtotal = cartSubtotal(items);
  const count = cartCount(items);
  const discountRate = discountRateForCount(count);
  const discountAmount = Math.round(subtotal * discountRate);
  return { subtotal, count, discountRate, discountAmount, afterDiscount: subtotal - discountAmount };
}
