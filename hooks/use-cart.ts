import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-hot-toast";

import { Product, OrderItem } from "@/types";

interface CartStore {
    items: OrderItem[];
    addItem: (item: Product, quantity: number) => void;
    setQuantity: (id: string, quantity: number) => void;
    removeItem: (id: string) => void;
    removeAll: () => void;
}

const useCart = create(
    persist<CartStore>(
        (set, get) => ({
            items: [],
            addItem: (data: Product, quantity: number) => {
                const currentItems = get().items;
                const existingItem = currentItems.find(
                    (item) => item.product.id === data.id
                );

                if (existingItem) {
                    const updatedItem = {
                        ...existingItem,
                        quantity: existingItem.quantity + quantity,
                    };

                    set({
                        items: [
                            ...currentItems.filter(
                                (item) => item.product.id !== data.id
                            ),
                            updatedItem,
                        ],
                    });
                    toast(`Item added to cart`, { icon: "🛒" });
                    return;
                }

                set({
                    items: [...currentItems, { product: data, quantity: quantity }],
                });
                toast("Item added to cart", { icon: "🛒" });
            },
            setQuantity: (id: string, quantity: number) => {
                set({
                    items: get().items.map((item) =>
                        item.product.id === id
                            ? { ...item, quantity }
                            : item
                    ),
                })
            },
            removeItem: (id: string) => {
                set({
                    items: get().items.filter((item) => item.product.id !== id),
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
