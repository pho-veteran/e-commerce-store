import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-hot-toast";

import { Product, OrderItem, Size, Color } from "@/types";

interface CartStore {
    items: OrderItem[];
    addItem: (product: Product, size: Size, color: Color, quantity: number) => void;
    setQuantity: (id: string, quantity: number) => void;
    removeItem: (id: string) => void;
    removeAll: () => void;
}

const useCart = create(
    persist<CartStore>(
        (set, get) => ({
            items: [],
            addItem: (product: Product, size: Size, color: Color, quantity: number) => {
                const currentItems = get().items;
                const existingItem = currentItems.find(
                    (item) =>
                        item.product.id === product.id &&
                        item.size.id === size.id &&
                        item.color.id === color.id
                );

                if (existingItem) {
                    const updatedItems = currentItems.map((item) =>
                        item === existingItem
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    );
                    set({ items: updatedItems });
                    toast("Item quantity updated in cart", { icon: "🛒" });
                } else {
                    const newItem: OrderItem = {
                        product,
                        size,
                        color,
                        quantity,
                    };
                    console.log(newItem);
                    set({ items: [...currentItems, newItem] });
                    toast("Item added to cart", { icon: "🛒" });
                }
            },
            setQuantity: (id: string, quantity: number) => {
                const currentItems = get().items;
                set({
                    items: currentItems.map((item) =>
                        item.product.id === id ? { ...item, quantity } : item
                    ),
                });
            },
            removeItem: (id: string) => {
                const currentItems = get().items;
                set({
                    items: currentItems.filter((item) => item.product.id !== id),
                });
                toast("Item removed from cart", { icon: "🗑️" });
            },
            removeAll: () => {
                set({ items: [] });
                toast("All items removed from cart", { icon: "🗑️" });
            },
        }),
        {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useCart;