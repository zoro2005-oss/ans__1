import { createContext, useContext } from "react";
import type { Product } from "@/data/products";

export type CartItem = Product & { quantity: number };

export type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  addItem: (product: Product, quantity?: number, origin?: { x: number; y: number }) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  count: number;
  subtotal: number;
};

export const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart doit être utilisé dans CartProvider");
  return value;
}
