import getShippingFee from "@/actions/get-shipping-fee";
import { OrderItem } from "@/types";
import { Address } from "@prisma/client";
import { Package } from "lucide-react";
import { useEffect } from "react";
import OrderItemCard from "./order-item-card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface OrderItemsSectionProps {
    orderItems: OrderItem[];
    selectedAddress: Address | null;
    orderMessage: string;
    setOrderMessage: (message: string) => void;
}

const OrderItemsSection: React.FC<OrderItemsSectionProps> = ({
    orderItems,
    selectedAddress,
    orderMessage,
    setOrderMessage
}) => {

    useEffect(() => {
        if (!selectedAddress) {
            return;
        }

        const generalAddressArray = selectedAddress.generalAddress.split(", ");
        const province = generalAddressArray[generalAddressArray.length - 1];
        const district = generalAddressArray[generalAddressArray.length - 2];
        const ward = generalAddressArray[generalAddressArray.length - 3];

        const calShippingFee = async () => {
            try {
                const calShippingFeeRes = await getShippingFee({
                    province: province,
                    district: district,
                    ward: ward || undefined,
                    weight: 500
                });
                console.log(calShippingFeeRes);
            } catch (error) {
                console.log(error);
            }
        }
        calShippingFee();
    }, [selectedAddress])

    return (
        <div className="bg-white w-full rounded-md">
            <div className="px-6 py-4">
                <div className="flex gap-x-2 items-center">
                    <Package
                        size={24}
                        className="text-primary-500"
                    />
                    <p className="font-semibold text-lg">Your order items</p>
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
                    placeholder="Message for your order"
                    className="mt-6"
                />
            </div>
        </div>
    );
}

export default OrderItemsSection;