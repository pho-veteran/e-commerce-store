"use client"

import { Button } from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import { Order } from "@/types";
import axios from "axios";

interface ConfirmSectionProps {
    backendUrl: string;
    data: Order;
    customerId: string;
    paymentMethod: string;
}

const ConfirmSection: React.FC<ConfirmSectionProps> = ({
    backendUrl,
    data,
    customerId,
    paymentMethod
}) => {
    const subTotal = data.orderItems.reduce((acc, item) => {
        return acc + (Number(item.product.price) * Number(item.quantity));
    }, 0);

    const onConfirm = async () => {
        try {
            const ipResponse = await axios.get('https://api.ipify.org?format=json');
            const clientIp = ipResponse.data.ip;

            const response = await axios.post(`${backendUrl}/checkout/createPayment`, {
                paymentMethod,
                orderId: data.id,
                clientIp,
                customerId
            });

            window.location.href = response.data.url;
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="bg-white w-full rounded-md">
            <div className="p-6">
                <div className="grid-cols-12 grid gap-y-3 items-end">
                    <p className="md:text-right col-span-9 text-neutral-400">Subtotal</p>
                    <Currency
                        className="md:text-right col-span-3 text-base"
                        value={subTotal}
                    />

                    <p className="md:text-right col-span-9 text-neutral-400">Shipping</p>
                    <Currency
                        className="md:text-right col-span-3 text-base"
                        value={data.shippingFee}
                    />

                    <p className="md:text-right col-span-9 text-neutral-400">Total</p>
                    <Currency
                        className="md:text-right col-span-3 text-red-500"
                        value={Number(subTotal) + Number(data.shippingFee)}
                    />
                </div>
                <div className="mt-6 flex w-full justify-end">
                    <Button
                        variant="destructive"
                        className="px-8 py-6 text-lg"
                        onClick={onConfirm}
                    >
                        Confirm
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmSection;