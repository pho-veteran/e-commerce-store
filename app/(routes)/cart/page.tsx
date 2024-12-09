"use client";

import { useState, useEffect } from "react";

import Container from "@/components/ui/container";
import useCart from "@/hooks/use-cart";
import useWishlist from "@/hooks/use-wishlist";
import CartItem from "./components/cart-item";
import Summary from "./components/summary";
import WishlistItem from "./components/wishlist-item";

const CartPage = () => {
    const [mounted, setMounted] = useState(false);
    const cart = useCart();
    const wishlist = useWishlist();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="bg-white mb-10 pb-10">
            <Container>
                <div className="px-4 py-16 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-black">
                        Shopping Cart
                    </h1>
                    <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
                        <div className="lg:col-span-7">
                            <div>
                                <h2 className="text-2xl font-semibold text-black py-4">Your Cart</h2>
                                {cart.items.length === 0 && (
                                    <p className="text-neutral-500">Your cart is empty.</p>
                                )}
                                <ul>
                                    {cart.items.map((item, index) => (
                                        <CartItem
                                            key={index}
                                            data={item}
                                        />
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-8">
                                <h2 className="text-2xl font-semibold text-black py-4">Wishlist</h2>
                                {wishlist.items.length === 0 && (
                                    <p className="text-neutral-500">Your wishlist is empty.</p>
                                )}
                                <ul>
                                    {wishlist.items.map((item) => (
                                        <WishlistItem
                                            key={item.id}
                                            data={item}
                                        />
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <Summary />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default CartPage;
