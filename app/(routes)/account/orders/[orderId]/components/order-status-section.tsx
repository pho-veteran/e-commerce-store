"use client"

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Order } from "@/types";
import { states } from "../../components/status";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface OrderStatusSectionProps {
    data: Order;
    backendUrl: string;
}

const OrderStatusSection: React.FC<OrderStatusSectionProps> = ({
    data,
    backendUrl
}) => {
    const router = useRouter();
    const { user } = useUser();

    if (!user) {
        return null;
    }

    const state = states.find((state) => state.value === data.orderStatus);

    if (!state) {
        return null;
    }

    const onCancelOrder = async () => {
        try {
            await axios.post(`${backendUrl}/orders/${data.id}`, {
                orderStatus: "CANCELLED",
                customerId: user.id
            });

            router.push("/account/orders");
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    }

    const onProceedToPayment = () => {
        router.push(`/checkout/pay?orderId=${data.id}`);
    }

    return (
        <div className="flex flex-col gap-y-2 flex-1">
            <h2>ORDER STATUS</h2>
            <div className="bg-white p-6 rounded-md w-full flex flex-col items-center h-full justify-center">
                <div className={cn("flex flex-col text-green-600 items-center shrink-0", state.className, "bg-inherit")}>
                    {state.icon && <state.icon size={56} />}
                    <p className="text-sm font-bold mt-2">{state.label}</p>
                    <p className="text-sm">{state.message}</p>
                </div>

                {state.value === "NOTPAID" && (
                    <div className="flex gap-x-2">
                        <Button
                            className="mt-4 w-full"
                            variant="destructive"
                            onClick={onCancelOrder}
                        >Cancel Order</Button>
                        <Button
                            className="mt-4 w-full bg-blue-600 text-white hover:bg-blue-500"
                            onClick={onProceedToPayment}
                        >Proceed to Payment</Button>
                    </div>
                )}

                {state.value === "PENDING" && data.paymentMethod === "COD" && (
                    <Button
                        className="mt-4 w-full"
                        variant="destructive"
                        onClick={onCancelOrder}
                    >Cancel Order</Button>
                )}
            </div>
        </div>
    );
}

export default OrderStatusSection;