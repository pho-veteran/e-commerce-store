import { Order } from "@/types";
import { states } from "./status";
import StatusBadge from "@/components/ui/status-badge";
import OrderItemCard from "@/components/ui/order-item-card";
import Currency from "@/components/ui/currency";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface OrderCardProps {
    data: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({
    data
}) => {
    const router = useRouter();
    const state = states.find((state) => state.value === data.orderStatus);

    const totalCost = data.orderItems.reduce((acc, item) => {
        return acc + (Number(item.product.price) * Number(item.quantity));
    }, 0) + data.shippingFee;

    return (
        <div
            className="w-full bg-white p-4 rounded-md cursor-pointer"
            onClick={() => router.push(`/account/orders/${data.id}`)}
        >
            <div className="flex gap-x-4 items-center">
                <div className="text-neutral-400 flex items-center gap-x-2">
                    {state?.icon && <state.icon />}
                    <span>{state?.message}</span>
                </div>
                <StatusBadge
                    data={state}
                />
                <StatusBadge
                    data={{
                        label: data.paymentMethod === "COD" ? "Cash on Delivery" : "Online Payment",
                        className: "bg-blue-100 text-blue-600"
                    }}
                />
            </div>
            <hr className="mt-4" />
            <ul>
                {data.orderItems.slice(0, 2).map((item, index) => (
                    <OrderItemCard
                        key={index}
                        data={item}
                    />
                ))}
            </ul>
            {data.orderItems.length > 2 && (
                <div className="text-neutral-400 ml-auto text-right pb-4">+{data.orderItems.length - 2} more items</div>
            )}
            <hr className="mb-4" />
            <div>
                <div className="text-neutral-400 ml-auto pb-4 flex items-center justify-end gap-x-2">
                    <span>Order Total: </span>
                    <Currency
                        value={totalCost}
                        className="font-semibold"
                    />
                </div>
                <div className="flex gap-x-2 justify-end">
                    {data.orderStatus === "NOTPAID" && (
                        <Button
                            variant="default"
                            className="text-sm shadow-none"
                            onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/checkout/pay?orderId=${data.id}`);
                            }}
                        >Process Payment</Button>
                    )}
                    <Button
                        variant={state?.value !== "NOTPAID" ? "default" : "outline"}
                        className={cn("text-sm shadow-none", state?.value === "NOTPAID" && "border-2")}
                        onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/account/orders/${data.id}`);
                            router.refresh();
                        }}
                    >View Details</Button>
                </div>
            </div>
        </div>
    );
}

export default OrderCard;