import { useEffect, useMemo, useState, type ReactNode } from "react";
import { CartContext, type CartContextValue } from "@/hooks/use-cart";
import type { Product } from "@/data/products";
import { burstConfetti } from "@/lib/confetti";

const STORAGE_KEY = "reveillon31-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartContextValue["items"]>([]);
  const [isOpen, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (Array.isArray(parsed)) setItems(parsed as CartContextValue["items"]);
      }
    } catch {
      /* Stockage local illisible : on démarre avec un panier vide. */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* Quota dépassé ou mode prive : le panier reste valable en memoire. */
    }
  }, [items, hydrated]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      isOpen,
      setOpen,
      addItem: (product: Product, quantity = 1, origin) => {
        setItems((current) => {
          const existing = current.find((item) => item.id === product.id);
          return existing
            ? current.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
              )
            : [...current, { ...product, quantity }];
        });
        burstConfetti({ origin });
        setOpen(true);
      },
      updateQuantity: (id, quantity) =>
        setItems((current) =>
          current.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item,
          ),
        ),
      removeItem: (id) => setItems((current) => current.filter((item) => item.id !== id)),
      clearCart: () => setItems([]),
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    [items, isOpen],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
