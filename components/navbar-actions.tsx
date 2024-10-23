"use client";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

import useCart from "@/hooks/use-cart";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import CartHover from "./cart-hover";

const NavbarActions = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const router = useRouter();
    const cart = useCart();

    if (!isMounted) return null;

    return (
        <div className="ml-auto flex items-center gap-x-4">
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
