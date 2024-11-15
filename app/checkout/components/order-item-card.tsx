"use client";

import Image from "next/image";

import Currency from "@/components/ui/currency";
import { OrderItem } from "@/types";

interface OrderItemCardProps {
    data: OrderItem;
}

const OrderItemCard: React.FC<OrderItemCardProps> = ({ data }) => {
    return (
        <li className="flex py-6 border-b">
            <div className="relative h-28 w-28 rounded-md overflow-hidden">
                <Image
                    fill
                    src={data.product.images[0].url}
                    alt=""
                    className="object-cover object-center"
                />
            </div>
            <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div>
                    <p className="text-xl font-semibold text-black">
                        {data.product.name}
                    </p>
                    <p className="text-sm">{data.product.category.name}</p>
                </div>
                <div className="mt-2 flex text-sm">
                    <div className="flex gap-x-2 items-center">
                        <p className="text-gray-500">{data.color.name}</p>
                        <div
                            className="h-4 w-4 rounded-full"
                            style={{ backgroundColor: data.color.value }}
                        ></div>
                    </div>
                    <p className="text-gray-500 ml-4 border-l border-gray-200 pl-4">
                        {data.size.name}
                    </p>
                </div>
                <div className="flex gap-x-8 items-center justify-self-end mt-2">
                    <p className="text-sm text-neutral-400">Qty: {data.quantity}</p>
                    <Currency value={Number(data.product.price) * data.quantity} className="text-base" />
                </div>
            </div>
        </li>
    );
};

export default OrderItemCard;
