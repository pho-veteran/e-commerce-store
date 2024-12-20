import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";
import { toast } from "react-hot-toast";
import { get, set, del } from "idb-keyval";

import { Product, OrderItem, Size, Color } from "@/types";

const storage: StateStorage = {
    getItem: async (name: string): Promise<string | null> => {
        return (await get(name)) || null;
    },
    setItem: async (name: string, value: string): Promise<void> => {
        await set(name, value);
    },
    removeItem: async (name: string): Promise<void> => {
        await del(name);
    },
};

interface CartStore {
    items: OrderItem[];
    addItem: (
        product: Product,
        size: Size,
        color: Color,
        quantity: number
    ) => void;
    setQuantity: (
        productId: string,
        colorId: string,
        sizeId: string,
        quantity: number
    ) => void;
    removeItem: (productId: string, colorId: string, sizeId: string) => void;
    removeAll: () => void;
}

const useCart = create(
    persist<CartStore>(
        (set, get) => ({
            items: [],
            addItem: (
                product: Product,
                size: Size,
                color: Color,
                quantity: number
            ) => {
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
                    return;
                }
                const newItem: OrderItem = {
                    product,
                    size,
                    color,
                    quantity,
                };
                set({ items: [...currentItems, newItem] });
                toast("Item added to cart", { icon: "🛒" });
            },
            setQuantity: (
                productId: string,
                colorId: string,
                sizeId: string,
                quantity: number
            ) => {
                const currentItems = get().items;
                set({
                    items: currentItems.map((item) =>
                        item.product.id === productId &&
                        item.size.id === sizeId &&
                        item.color.id === colorId
                            ? { ...item, quantity }
                            : item
                    ),
                });
            },
            removeItem: (
                productId: string,
                colorId: string,
                sizeId: string
            ) => {
                const currentItems = get().items;
                const itemToRemove = currentItems.find(
                    (item) =>
                        item.product.id === productId &&
                        item.size.id === sizeId &&
                        item.color.id === colorId
                );
                set({
                    items: currentItems.filter(
                        (item) => item !== itemToRemove
                    ),
                });
                toast("Item removed from cart", { icon: "🗑️" });
            },
            removeAll: () => {
                if (get().items.length === 0) {
                    return;
                }
                set({ items: [] });
            },
        }),
        {
            name: "cart-storage",
            storage: createJSONStorage(() => storage),
        }
    )
);

export default useCart;
