"use client";
import { Heart, Search, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

import useCart from "@/hooks/use-cart";
import Button from "@/components/ui/Button";
import { useRouter, useSearchParams } from "next/navigation";
import CartHover from "./cart-hover";
import IconButton from "./ui/icon-button";
import useNavDrawer from "@/hooks/use-navbar-drawer";
import AuthMenu from "./ui/auth-menu";

const NavbarActions = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const router = useRouter();
    const searchParams = useSearchParams();
    const cart = useCart();
    const navDrawer = useNavDrawer();

    if (!isMounted) return null;

    return (
        <div className="ml-auto flex items-center gap-x-2">
            <AuthMenu />
            <IconButton
                icon={<Search size={20} />}
                className="border-none shadow-none"
                onClick={() => {
                    navDrawer.onOpen(searchParams.get("name") || "");
                }}
            />
            <IconButton
                icon={<Heart size={20} />}
                className="border-none shadow-none"
                onClick={() => {
                    router.push("/wishlist");
                }}
            />
            <CartHover>
                <Button className="flex items-center rounded-full bg-black px-4 py-2" onClick={() => {
                    router.push("/cart");
                }}>
                    <ShoppingBag size={20} color="white" />
                    <span className="ml-2 text-sm font-medium text-white">
                        {cart.items.length}
                    </span>
                </Button>
            </CartHover>
        </div>
    );
};

export default NavbarActions;
