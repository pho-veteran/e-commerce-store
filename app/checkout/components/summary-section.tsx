"use client"

import getShippingFee from "@/actions/get-shipping-fee";
import { Button } from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { OrderItem } from "@/types";
import { useUser } from "@clerk/nextjs";
import { Address } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface SummarySectionProps {
    selectedAddress: Address | null;
    orderMessage: string;
    paymentMethod: string;
    items: OrderItem[];
    backendUrl: string;
}

const SummarySection: React.FC<SummarySectionProps> = ({
    selectedAddress,
    orderMessage,
    paymentMethod,
    items,
    backendUrl
}) => {
    const [shippingFee, setShippingFee] = useState<number | null>(null);
    const { user } = useUser();
    const cart = useCart();

    const subTotal = items.reduce((acc, item) => {
        return acc + Number(item.product.price) * item.quantity;
    }, 0);

    const calculateShippingFee = async () => {
        if (!selectedAddress) return;

        const generalAddressArray = selectedAddress.generalAddress.split(", ");

        const province = generalAddressArray.pop() || "";
        const district = generalAddressArray.pop() || "";
        const ward = generalAddressArray.pop() || undefined;

        try {
            const calShippingFeeRes = await getShippingFee({
                province,
                district,
                ward,
                weight: 500,
            });
            setShippingFee(calShippingFeeRes.fee.fee);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        calculateShippingFee();
    }, [selectedAddress]);

    const onPlaceOrder = async () => {
        try {
            const ipResponse = await axios.get('https://api.ipify.org?format=json');
            const clientIp = ipResponse.data.ip;

            const response = await axios.post(`${backendUrl}/checkout`, {
                address: {
                    name: selectedAddress?.name,
                    phone: selectedAddress?.phone,
                    generalAddress: selectedAddress?.generalAddress,
                    streetAddress: selectedAddress?.streetAddress,
                    type: selectedAddress?.type,
                },
                orderMessage,
                paymentMethod,
                orderItems: items.map((item) => ({
                    productId: item.product.id,
                    colorId: item.color.id,
                    sizeId: item.size.id,
                    quantity: item.quantity,
                })),
                shippingFee: shippingFee || 0,
                customerId: user?.id,
                addressType: selectedAddress?.type,
                clientIp,
            });

            cart.removeAll();

            window.location.href = response.data.url;
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="border-b px-6 sm:px-8 lg:px-10 py-4">
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-black text-lg">Order Summary</h2>
                    <Link
                        href="/cart"
                        className="text-blue-500 hover:underline block text-right"
                    >
                        Change Cart
                    </Link>
                </div>
                <span className="text-neutral-400 text-sm">{items.length} item(s)</span>
            </div>
            <div className="px-6 sm:px-8 lg:px-10 py-4">
                <div className="border-b pb-4 space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-neutral-400">Subtotal</span>
                        <Currency
                            value={subTotal}
                            className="text-base"
                        />
                    </div>
                    {shippingFee ? (
                        <div className="flex justify-between items-center">
                            <span className="text-neutral-400">Delivery</span>
                            <Currency
                                value={shippingFee || 0}
                                className="text-base"
                            />
                        </div>
                    ) : (
                        <span
                            className="text-red-600 text-sm mt-2 block"
                        >Please choose an address to estimate shipping fee!</span>
                    )}
                </div>
                <div className="mt-4">
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">Total</span>
                        <Currency
                            value={subTotal + (shippingFee || 0)}
                            className="text-xl text-red-500"
                        />
                    </div>
                    <p
                        className="text-sm text-right text-neutral-400 mt-2"
                    >(This price includes VAT, packaging, shipping and other incidental charges)</p>
                </div>
                <div className="mt-6">
                    <Button
                        variant={"destructive"}
                        className="w-full text-base h-10"
                        disabled={!selectedAddress || !shippingFee}
                        onClick={onPlaceOrder}
                    >
                        Place Order
                    </Button>
                </div>
            </div>
        </>

    );
}

export default SummarySection;
