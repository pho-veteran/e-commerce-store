"use client";

import Image from "next/image";

import Currency from "@/components/ui/currency";

interface OrderItemCardProps {
    data: {
        product: {
            name: string;
            images: { url: string }[];
            price: string | number;
            category: { name: string };
        };
        color: { name: string; value: string };
        size: { name: string };
        quantity: number;
    }
}

const OrderItemCard: React.FC<OrderItemCardProps> = ({ data }) => {
    return (
        <li className="flex py-6 border-b last:border-none">
            <div className="relative">
                <div className="h-28 w-28 rounded-md overflow-hidden">
                    <Image
                        fill
                        src={data.product.images[0].url}
                        alt=""
                        className="object-cover object-center"
                    />
                </div>
                <div className="absolute bottom-0 right-0 rounded-tl-lg text-white text-xs h-6 w-6 bg-black flex items-center justify-center dark:bg-red-500">x{data.quantity}</div>
            </div>
           <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div>
                    <p className="text-xl font-semibold">
                        {data.product.name}
                    </p>
                    <p className="text-sm">{data.product.category.name}</p>
                </div>
                <div className="flex text-sm text-neutral-500 dark:text-white">
                    <div className="flex gap-x-2 items-center ">
                        <p>{data.color.name}</p>
                        <div
                            className="h-4 w-4 rounded-full border border-neutral-600"
                            style={{ backgroundColor: data.color.value }}
                        ></div>
                    </div>
                    <p className="ml-4 border-l border-gray-200 pl-4">
                        {data.size.name}
                    </p>
                </div>
                <Currency
                    value={Number(data.product.price)}
                    className="text-sm"
                />
            </div>
            <div className="flex gap-x-8 items-center justify-self-end mt-2 mr-4">
                <div className="font-semibold text-xl text-gray-900 dark:text-white">
                    <Currency
                        value={Number(data.product.price) * data.quantity || 0}
                    />
                </div>
            </div>
        </li>
    );
};

export default OrderItemCard;
