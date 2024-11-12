"use client";
import { Heart, Search, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

import useCart from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import CartHover from "./cart-hover";
import IconButton from "./ui/icon-button";
import useNavDrawer from "@/hooks/use-navbar-drawer";
import AuthMenu from "./ui/auth-menu";
import useWishlist from "@/hooks/use-wishlist";

const NavbarActions = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const router = useRouter();
    const searchParams = useSearchParams();
    const cart = useCart();
    const wishlist = useWishlist()
    const navDrawer = useNavDrawer();

    if (!isMounted) return null;

    return (
        <div className="ml-auto flex items-center gap-x-2">
            <AuthMenu />
            <IconButton
                icon={<Search size={24} />}
                className="border-none shadow-none"
                onClick={() => {
                    navDrawer.onOpen(searchParams.get("name") || "");
                }}
            />
            <div className="relative">
                <IconButton
                    icon={<Heart size={24} />}
                    className="border-none shadow-none"
                    onClick={() => {
                        router.push("/wishlist");
                    }}
                />
                <div className="absolute top-0 right-0 rounded-full text-white text-sm h-[20px] w-[20px] bg-red-500 flex items-center justify-center">{wishlist.items.length}</div>
            </div>
            <CartHover>
                <Button className="flex items-center rounded-full bg-black px-4 py-2" onClick={() => {
                    router.push("/cart");
                }}>
                    <ShoppingBag size={20} color="white" />
                    <span className="text-sm font-medium text-white">
                        {cart.items.length}
                    </span>
                </Button>
            </CartHover>
        </div>
    );
};

export default NavbarActions;
