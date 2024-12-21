import { OrderItem } from "@/types";
import { Package } from "lucide-react";
import OrderItemCard from "@/components/ui/order-item-card";
import { Textarea } from "@/components/ui/textarea";

interface OrderItemsSectionProps {
    orderItems: OrderItem[];
    orderMessage: string;
    setOrderMessage: (message: string) => void;
}

const OrderItemsSection: React.FC<OrderItemsSectionProps> = ({
    orderItems,
    orderMessage,
    setOrderMessage
}) => {
    return (
        <div className="bg-white w-full rounded-md">
            <div className="px-6 py-4">
                <div className="flex gap-x-2 items-center">
                    <Package
                        size={24}
                        className="text-primary-500"
                    />
                    <p className="font-semibold text-lg">Package</p>
                </div>
                <ul className="mt-2 max-h-[32rem] overflow-y-auto overflow-x-hidden">
                    {orderItems.map((item, index) => (
                        <OrderItemCard
                            key={index}
                            data={item}
                        />
                    ))}
                </ul>
                <Textarea
                    value={orderMessage}
                    onChange={(e) => setOrderMessage(e.target.value)}
                    placeholder="Message for your order..."
                    className="mt-6 max-h-24"
                />
            </div>
        </div>
    );
}

export default OrderItemsSection;