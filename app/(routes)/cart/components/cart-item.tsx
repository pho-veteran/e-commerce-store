"use client";

import Image from "next/image";
import { X } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { OrderItem } from "@/types";
import ItemQuantity from "@/components/ui/item-quantity";

interface CartItemProps {
    data: OrderItem;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
    const cart = useCart();

    const onRemove = () => {
        cart.removeItem(data.product.id);
    }

    const onQuantityChange = (quantity: number) => {
        cart.setQuantity(data.product.id, quantity);
    }

    return (
        <li className="flex py-6 border-b">
            <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
                <Image
                    fill
                    src={data.product.images[0].url}
                    alt=""
                    className="object-cover object-center"
                />
            </div>
            <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div className="absolute z-10 right-0 top-0 ">
                    <IconButton onClick={onRemove} icon={<X size={16} />} />
                </div>
                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <p className="text-xl font-semibold text-black">
                        {data.product.name}
                    </p>
                    <div className="mt-1 flex text-sm">
                        <div className="flex gap-x-2 items-center">
                            <p className="text-gray-500">{data.product.color.name}</p>
                            <div
                                className="h-4 w-4 rounded-full"
                                style={{ backgroundColor: data.product.color.value }}
                            ></div>
                        </div>
                        <p className="text-gray-500 ml-4 border-l border-gray-200 pl-4">
                            {data.product.size.name}
                        </p>
                    </div>
                    <Currency value={Number(data.product.price) * data.quantity} className="sm:text-xl mt-1 text-base" />
                </div>
                <div className="flex flex-col h-8 justify-between w-fit">
                    <ItemQuantity
                        data={data.quantity}
                        onQuantityChange={onQuantityChange}
                        onRemove={onRemove}
                    />
                </div>
            </div>
        </li>
    );
};

export default CartItem;
