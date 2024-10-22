"use client"
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

import { Product } from "@/types";
import Currency from "@/components/ui/currency";
import Button from "@/components/ui/Button";
import useCart from "@/hooks/use-cart";
import ItemQuantity from "./ui/item-quantity";

interface InfoProps {
    data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
    const cart = useCart();
    const [quantity, setQuantity] = useState(1);

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
            <div className="mt-3 flex items-end justify-between">
                <Currency
                    value={data?.price}
                    className="text-2xl text-gray-900"
                />
            </div>
            <hr className="my-4" />
            <div className="flex flex-col gap-y-6">
                <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black">Size:</h3>
                    <div>{data?.size?.name}</div>
                </div>
                <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black">Color:</h3>
                    <div className="flex gap-x-2">
                        <span>{data?.color?.name}</span>
                        <div
                            className="h-6 w-6 rounded-full border border-gray-600"
                            style={{ backgroundColor: data?.color?.value }}
                        />
                    </div>
                </div>
            </div>
            <div className="mt-10 flex">
                <ItemQuantity
                    data={quantity}
                    onQuantityChange={(quantity) => setQuantity(quantity)}
                    onRemove={() => {}}
                />
            </div>
            <div className="mt-5 flex items-center gap-x-3">
                <Button
                    className="flex items-center gap-x-2"
                    onClick={() => cart.addItem(data, quantity)}
                >
                    Add to Cart
                    <ShoppingCart size={24} />
                </Button>
            </div>
        </div>
    );
};

export default Info;
