"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { useEffect } from "react";

interface SummaryProps {
    backendUrl: string;
}

const Summary: React.FC<SummaryProps> = ({
    backendUrl
}) => {
    const router = useRouter();
    const cart = useCart();

    const verifyCart = async (): Promise<boolean> => {
        try {
            const productsId = cart.items.map((item) => item.product.id);
            const productsStock = await axios.post(`${backendUrl}/products`, {
                productsId: productsId,
            });
            
            const result = cart.verifyCart(productsStock.data);
            return result;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    useEffect(() => {
        verifyCart();
    }, []);

    const items = useCart((state) => state.items);

    const totalPrice = items.reduce((acc, item) => {
        return acc + Number(item.product.price) * item.quantity;
    }, 0)

    const onCheckout = async () => {
        const validCart = await verifyCart();
        if (!validCart) {
            return;
        }
        router.push("/checkout");
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
            <Button className="w-full mt-6 text-base h-12" onClick={onCheckout} disabled={items.length === 0}>
                Checkout
            </Button>
        </div>
    );
};

export default Summary;
