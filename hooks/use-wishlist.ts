import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-hot-toast";

import { Product } from "@/types";

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
                    (item) =>
                        item.id === product.id
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
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useWishlist;