import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";
import { toast } from "react-hot-toast";
import { get, set, del } from "idb-keyval";

import { Product } from "@/types";

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

interface WishlistStore {
    items: Product[];
    addItem: (product: Product) => void;
    removeItem: (id: string) => void;
    removeAll: () => void;
    isWishlist: (id: string) => boolean;
}

const useWishlist = create(
    persist<WishlistStore>(
        (set, get) => ({
            items: [],
            addItem: (product: Product) => {
                const currentItems = get().items;
                const existingItem = currentItems.find(
                    (item) => item.id === product.id
                );

                if (existingItem) {
                    toast("Item already in wishlist");
                } else {
                    set({ items: [...currentItems, product] });
                    toast("Item added to wishlist", { icon: "🌟" });
                }
            },
            removeItem: (id: string) => {
                const currentItems = get().items;
                set({
                    items: currentItems.filter((item) => item.id !== id),
                });
            },
            removeAll: () => {
                set({ items: [] });
                toast("All items removed from wishlist", { icon: "🗑️" });
            },
            isWishlist: (id: string) => {
                const currentItems = get().items;
                return currentItems.some((item) => item.id === id);
            },
        }),
        {
            name: "wishlist-storage",
            storage: createJSONStorage(() => storage),
        }
    )
);

export default useWishlist;
