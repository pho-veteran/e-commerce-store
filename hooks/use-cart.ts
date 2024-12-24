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
    getQuantity: (productId: string) => number;
    verifyCart: (
        productsStock: {
            id: string;
            stock: number;
        }[]
    ) => boolean;
    removeItemByProductId: (productId: string) => void;
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
                    const updatedItems = currentItems.map((item) => {
                        if (item === existingItem) {
                            const remainStock =
                                item.product.stock -
                                get().getQuantity(item.product.id);
                            if (quantity > remainStock) {
                                toast.error("Quantity exceeds available stock");
                                return item;
                            }
                            return {
                                ...item,
                                quantity: item.quantity + quantity,
                            };
                        }
                        return item;
                    });
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
            getQuantity: (productId: string) => {
                const currentItems = get().items;
                const matchingItems = currentItems.filter(
                    (item) => item.product.id === productId
                );
                return matchingItems.reduce(
                    (total, item) => total + item.quantity,
                    0
                );
            },
            verifyCart: (
                productsStock: {
                    id: string;
                    stock: number;
                }[]
            ) => {
                const currentItems = get().items;
                const updatedItems = currentItems.filter((item) => {
                    const product = productsStock.find(
                        (product) => product.id === item.product.id
                    );
                    if (!product || get().getQuantity(item.product.id) > product.stock) {
                        return false;
                    }
                    return true;
                });
                if (currentItems.length !== updatedItems.length) {
                    toast(
                        `Your cart changed, ${
                            currentItems.length - updatedItems.length
                        } item(s) was removed!`,
                        { icon: "🛒" }
                    );
                    return false;
                }
                set({ items: updatedItems });
                return true;
            },
            removeItemByProductId: (productId: string) => {
                const currentItems = get().items;
                set({
                    items: currentItems.filter(
                        (item) => item.product.id !== productId
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
                    items: currentItems.filter((item) => item !== itemToRemove),
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
