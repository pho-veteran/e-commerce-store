"use client";

import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import toast from "react-hot-toast";

const Summary = () => {
    const searchParams = useSearchParams();

    const items = useCart((state) => state.items);
    const removeAll = useCart((state) => state.removeAll);

    useEffect(() => {
        if (searchParams.get("success")) {
            toast.success("Order placed successfully");
            removeAll();
        }

        if (searchParams.get("canceled")) {
            toast.error("Order cancelled");
        }
    }, [searchParams, removeAll]);

    const totalPrice = items.reduce((acc, item) => {
        return acc + Number(item.product.price) * item.quantity;
    }, 0)

    const onCheckout = async () => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
            productIds: items.map((item) => (
                {
                    id: item.product.id,
                    quantity: item.quantity,
                }
            )),
        });

        window.location = response.data.url;
    }

    return (
        <div
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Order Summary</h2>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <h2 className="text-base font-medium text-gray-900">
                    Order Total
                </h2>
                <Currency value={totalPrice} />
            </div>
            <Button className="w-full mt-6 text-base" onClick={onCheckout} disabled={items.length === 0}>
                Checkout
            </Button>
        </div>
    );
};

export default Summary;
