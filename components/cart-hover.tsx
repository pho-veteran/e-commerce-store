"use client"
import { useRouter } from "next/navigation"

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import useCart from "@/hooks/use-cart"
import CartHoverCard from "./ui/cart-hover-card"
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react"
import Currency from "./ui/currency"
import { cn } from "@/lib/utils"

const CartHover = ({
    children
}: {
    children: React.ReactNode
}) => {
    const router = useRouter();
    const cart = useCart();
    const items = cart.items;

    const subTotal = items.reduce((acc, item) => {
        return acc + Number(item.product.price) * item.quantity;
    }, 0);


    return (
        <HoverCard>
            <HoverCardTrigger>{children}</HoverCardTrigger>
            <HoverCardContent className="w-[24rem]" side="bottom" align="end">
                <h2 className="text-xl font-bold mt-2">Your Cart</h2>
                {items.length === 0 && (
                    <p className="text-center py-4">Cart is empty</p>
                )}
                <ul>
                    {items.slice(0, 3).map((item, index) => {
                        return (
                            <CartHoverCard
                                key={index}
                                data={item}
                            />
                        )
                    })}
                </ul>
                {items.length > 3 && (
                    <div className="flex justify-center py-2 border-b">
                        <Ellipsis size={20} className="text-neutral-400" />
                    </div>
                )}

                <div className="flex justify-center items-center mt-4 gap-x-2">
                    <p className="text-black">Cart total: </p>
                    <Currency
                        value={subTotal}
                        className="text-base text-blue-400"
                    />
                </div>

                <Button
                    className="w-full mt-4 rounded-md text-base h-10"
                    onClick={() => {
                        router.push("/checkout");
                    }} 
                    disabled={items.length === 0}
                >
                    Checkout
                </Button>
            </HoverCardContent>
        </HoverCard>
    );
}

export default CartHover;