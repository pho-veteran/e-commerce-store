"use client"
import { useRouter } from "next/navigation"

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import useCart from "@/hooks/use-cart"
import CartHoverCard from "./ui/cart-hover-card"
import Button from "@/components/ui/Button";

const CartHover = ({
    children
}: {
    children: React.ReactNode
}) => {
    const router = useRouter();
    const cart = useCart();
    const items = cart.items;

    return (
        <HoverCard>
            <HoverCardTrigger>{children}</HoverCardTrigger>
            <HoverCardContent className="w-[24rem]" side="bottom" align="end">
                {items.length === 0 && (    
                    <p className="text-center py-4">Cart is empty</p>
                )}
                <ul>
                    {items.map((item) => {
                        return (
                            <CartHoverCard
                                key={item.product.id}
                                data={item}
                            />
                        )
                    })}
                </ul>
                <Button className="w-full mt-6 rounded-md" onClick={() => {
                    router.push("/cart");
                }} disabled={items.length === 0}>
                    Go to cart
                </Button>
            </HoverCardContent>
        </HoverCard>
    );
}

export default CartHover;