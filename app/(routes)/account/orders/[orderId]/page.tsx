import getOrder from "@/actions/get-order";
import { MapPin, Phone } from "lucide-react";
import BackToOrders from "@/components/ui/back-to-orders";
import { states } from "../components/status";
import StatusBadge from "@/components/ui/status-badge";
import OrderItemsSection from "./components/order-items-section";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import OrderStatusSection from "./components/order-status-section";

export const revalidate = 0;

interface OrderPageProps {
    params: {
        orderId: string;
    };
}

const OrderPage: React.FC<OrderPageProps> = async ({
    params
}) => {
    const { userId }: { userId: string | null } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const backendUrl = process.env.PUBLIC_STORE_URL;

    const order = await getOrder(
        {
            orderId: params.orderId,
            customerId: userId,
        }
    );

    if (!order || !backendUrl) {
        redirect("/")
    }

    const formattedDate = new Date(order.createdAt).toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });

    const state = states.find((state) => state.value === order.orderStatus);

    if (!state) {
        redirect("/account/orders");
    }

    return (
        <div className="w-full">
            <BackToOrders />
            <div className="space-y-2 mt-6">
                <div className="md:flex items-center md:space-x-4 space-y-2 md:space-y-0">
                    <h1
                        className="text-2xl font-semibold tracking-tight"
                    >Order #{order.id}</h1>
                    <div className="flex gap-x-2 items-center">
                        <StatusBadge
                            data={state}
                        />
                        <StatusBadge
                            data={{
                                label: order.paymentMethod === "COD" ? "Cash on Delivery" : "Online Payment",
                                className: "bg-blue-100 text-blue-600"
                            }}
                        />
                    </div>
                </div>
                <p className="text-neutral-400 text-sm">{formattedDate}</p>
            </div>
            <div className="mt-6 space-y-4">
                <div className="flex flex-col gap-4 w-full justify-between items-stretch md:flex-row">
                    <OrderStatusSection
                        data={order}
                        backendUrl={backendUrl}
                    />
                    <div className="flex-1 flex flex-col gap-y-2">
                        <h2>SHIPPING ADDRESS</h2>
                        <div className="bg-white p-4 rounded-md h-full flex flex-col gap-y-2">
                            <div className="space-y-1 pb-2">
                                <p className="font-bold">{order.name.toUpperCase()}</p>
                                <StatusBadge
                                    data={{
                                        label: order.addressType,
                                        className: "bg-green-100 text-green-600"
                                    }}
                                />
                            </div>
                            <div className="flex gap-x-2">
                                <div className="shrink-0 mt-1">
                                    <MapPin size={16} />
                                </div>
                                <p className="text-sm">{" " + order.address}</p>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <Phone size={16} />
                                <p className="text-sm">{order.phone}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-y-2">
                        <h2>ORDER MESSAGE</h2>
                        <div className="bg-white p-4 rounded-md h-full">
                            <p>{order?.orderMessage ? order.orderMessage : "No note."}</p>
                        </div>
                    </div>
                </div>
                <OrderItemsSection data={order} />
            </div>
        </div>
    );
}

export default OrderPage;