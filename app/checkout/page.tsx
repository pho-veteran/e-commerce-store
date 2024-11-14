"use client"
import { useEffect, useState } from "react";
import { Address } from "@prisma/client";

import Container from "@/components/ui/container";
import AddressSection from "./components/address-section";
import OrderItemsSection from "./components/order-items-section";
import useCart from "@/hooks/use-cart";
import getShippingFee from "@/actions/get-shipping-fee";

const CheckoutPage = () => {
    const cart = useCart();
    const [loading, setLoading] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const [orderMessage, setOrderMessage] = useState<string>("");

    return (
        <div className="bg-neutral-100">
            <Container>
                <div className="px-4 sm:px-6 lg:px-8 grid sm:grid-cols-12 gap-8 py-4">
                    <div className="col-span-8 space-y-8">
                        {/* Addresses Section */}
                        <AddressSection 
                            loading={loading} 
                            setLoading={setLoading} 
                            selectedAddress={selectedAddress} 
                            setSelectedAddress={setSelectedAddress}
                        />
                        {/* Order Items Section */}
                        <OrderItemsSection 
                            selectedAddress={selectedAddress}
                            orderItems={cart.items}
                            orderMessage={orderMessage}
                            setOrderMessage={setOrderMessage}
                        />
                        {/* Payment Method Section */}
                    </div>
                    <div className="col-span-4">
                        <div
                            className="sticky top-10 right-0 bg-white rounded-md"
                        >Product List Section</div>
                    </div>
                </div>
            </Container>
        </div >
    );
}

export default CheckoutPage;