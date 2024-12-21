"use client"

import Currency from "@/components/ui/currency";
import OrderItemCard from "@/components/ui/order-item-card";
import { Order } from "@/types";

interface OrderItemsSectionProps {
    data: Order;
}

const OrderItemsSection: React.FC<OrderItemsSectionProps> = ({
    data
}) => {
    const subTotal = data.orderItems.reduce((acc, item) => {
        return acc + (Number(item.product.price) * Number(item.quantity));
    }, 0);

    return (
        <div>
            <div className="bg-white p-6 rounded-md w-full">
                <ul>
                    {data.orderItems.map((item, index) => (
                        <OrderItemCard
                            key={index}
                            data={item}
                        />
                    ))}
                </ul>
                <hr className="my-4"/>
                <div className="mt-6 grid-cols-12 grid gap-y-3 items-end">
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
            </div>
        </div>
    );
}

export default OrderItemsSection;