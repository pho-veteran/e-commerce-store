"use client"
import { Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";

import { Product } from "@/types";
import Currency from "@/components/ui/currency";
import Button from "@/components/ui/Button";
import useCart from "@/hooks/use-cart";
import ItemQuantity from "./ui/item-quantity";
import VariantButtons from "./ui/variant-buttons";

interface InfoProps {
    data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
    const cart = useCart();
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState(data?.productSizes[0].size);
    const [color, setColor] = useState(data?.productColors[0].color);

    console.log(data);

    const sizes = data.productSizes.map((size) => size.size);
    const colors = data.productColors.map((color) => color.color);

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
                <div className="flex gap-y-2 flex-col">
                    <h3 className="font-semibold text-black flex gap-x-2">
                        Size:
                        <span className="font-normal">{size.name}</span>
                    </h3>
                    <VariantButtons
                        data={sizes}
                        selectedValue={size?.id || null}
                        onClick={(id) => {
                            const selectedSize = data.productSizes.find((productSize) => productSize.size.id === id);
                            if (selectedSize) {
                                setSize(selectedSize.size);
                            }
                        }}
                        type="size"
                    />
                </div>
                <div className="flex flex-col gap-y-2">
                    <h3 className="font-semibold text-black flex gap-x-2">
                        Color:
                        <span className="font-normal">{color.name}</span>
                    </h3>
                    <VariantButtons
                        data={colors}
                        selectedValue={color?.id || null}
                        onClick={(id) => {
                            const selectedColor = data.productColors.find((productColor) => productColor.color.id === id);
                            if (selectedColor) {
                                setColor(selectedColor.color);
                            }
                        }}
                        type="color"
                    />
                </div>
            </div>
            <div className="mt-10 flex justify-between gap-x-2">
                <ItemQuantity
                    data={quantity}
                    onQuantityChange={(quantity) => setQuantity(quantity)}
                    onRemove={() => { }}
                />
                <Button
                    className="flex items-center gap-x-2 w-full rounded-md justify-center bg-transparent text-black border border-black py-2"
                    onClick={() => {
                        if (size && color) {
                            cart.addItem(data, size, color, quantity);
                        }
                    }}
                >
                    Add to Cart
                    <ShoppingCart size={24} />
                </Button>
            </div>
            <div className="mt-4">
                <Button
                    className="flex items-center gap-x-2 w-full rounded-md justify-center"
                    onClick={() => console.log(data, size, color, quantity)}
                >
                    Add to Wishlist
                    <Heart size={24} />
                </Button>
            </div>
        </div>
    );
};

export default Info;
