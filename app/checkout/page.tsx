"use client"
import { useEffect, useState } from "react";
import { Address } from "@prisma/client";

import Container from "@/components/ui/container";
import AddressSection from "./components/address-section";
import OrderItemsSection from "./components/order-items-section";
import useCart from "@/hooks/use-cart";
import Link from "next/link";
import SummarySection from "./components/summary-section";
import PaymentMethodSection from "./components/payment-methods-section";

const CheckoutPage = () => {
    const cart = useCart();
    const [loading, setLoading] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const [orderMessage, setOrderMessage] = useState<string>("");
    const [paymentMethod, setPaymentMethod] = useState<string>("cod");

    if (cart.items.length === 0) {
        return (
            <div className="bg-neutral-100">
                <Container>
                    <div className="px-4 sm:px-6 lg:px-8 grid sm:grid-cols-12 gap-8 py-4">
                        <div className="col-span-8 space-y-8">
                            <div className="bg-white rounded-md p-8">
                                <h1 className="text-2xl font-semibold text-black">Your cart is empty</h1>
                                <p className="text-neutral-400 mt-2">Looks like you haven't added anything to your cart yet</p>
                                <Link
                                    href="/"
                                    className="mt-4 text-blue-500 hover:underline block"
                                >Return to store</Link>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="bg-neutral-100">
            <Container>
                <div className="px-4 sm:px-6 lg:px-8 md:grid grid-cols-12 gap-8 py-4 space-y-8">
                    <div className="sm:col-span-8 space-y-8">
                        <AddressSection
                            loading={loading}
                            setLoading={setLoading}
                            selectedAddress={selectedAddress}
                            setSelectedAddress={setSelectedAddress}
                        />
                        <OrderItemsSection
                            orderItems={cart.items}
                            orderMessage={orderMessage}
                            setOrderMessage={setOrderMessage}
                        />
                        <PaymentMethodSection 
                            paymentMethod={paymentMethod}
                            setPaymentMethod={setPaymentMethod}
                        />
                    </div>
                    <div className="sm:col-span-4">
                        <div className="sm:sticky top-10 right-0 bg-white rounded-md w-full">
                            <SummarySection 
                                selectedAddress={selectedAddress}
                                orderMessage={orderMessage}
                                items={cart.items}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default CheckoutPage;
