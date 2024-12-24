"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import { Heart, HeartOff, ShoppingCart } from "lucide-react";

import { Product } from "@/types";
import Currency from "@/components/ui/currency";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import ItemQuantity from "./ui/item-quantity";
import VariantButtons from "./ui/variant-buttons";
import useWishlist from "@/hooks/use-wishlist";
import toast from "react-hot-toast";

interface InfoProps {
    data: Product;
    backendUrl: string;
}

const Info: React.FC<InfoProps> = ({ 
    data,
    backendUrl,
}) => {
    const [mounted, setMounted] = useState(false);
    
    const cart = useCart();
    const wishlist = useWishlist();
    const [quantity, setQuantity] = useState(0);
    const [maxQuantity, setMaxQuantity] = useState(data.stock);

    const [size, setSize] = useState(data?.productSizes[0].size);
    const [color, setColor] = useState(data?.productColors[0].color);

    useEffect(() => {
        setMounted(true);
        if (cart.getQuantity(data.id) > maxQuantity) {
            cart.removeItemByProductId(data.id);
        }
    }, []);

    const sizes = data.productSizes.map((size) => size.size);
    const colors = data.productColors.map((color) => color.color);

    const onAddToCart = async () => {
        if (size && color) {
            try {
                const response = await axios.post(`${backendUrl}/products`, {
                    productsId: [data.id],
                });
                const storeStock = response.data[0].stock;
                const cartQuantity = cart.getQuantity(data.id); 
                
                const availableStock = storeStock - cartQuantity;
                
                if (quantity > availableStock) {
                    toast.error("Quantity exceeds available stock.");
                    setQuantity(availableStock);  
                    setMaxQuantity(storeStock); 
                    return;
                }
                
                wishlist.removeItem(data.id);
    
                cart.addItem(data, size, color, quantity);
    
                setQuantity(availableStock === 0 ? 0 : 1);
                setMaxQuantity(storeStock);
            } catch (error) {
                console.error("Error fetching store stock:", error);
                toast.error("Failed to add to cart. Please try again.");
            }
        }
    };

    const onQuantityChange = (value: number) => {
        setQuantity(value);
    }

    const availableStock = maxQuantity - cart.getQuantity(data.id);

    if (!mounted) return null;
    
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
            <div className="mt-10">
                <p className="text-sm text-gray-500">
                    <span className="text-black">{data.stock}</span> products in stock, <span className="text-black">{cart.getQuantity(data.id)}</span> in cart!
                </p>
            </div>
            <div className="mt-2 flex justify-between gap-x-2">
                <ItemQuantity
                    quantity={quantity}
                    setQuantity={onQuantityChange}
                    maxQuantity={availableStock}
                />
                <Button
                    className="flex items-center gap-x-2 w-full rounded-md justify-center bg-transparent text-black border border-black py-2 text-base hover:bg-neutral-100 h-10"
                    onClick={onAddToCart}
                    disabled={availableStock === 0}
                >
                    Add to Cart
                    <ShoppingCart size={24} />
                </Button>
            </div>
            <div className="mt-4">
                {wishlist.isWishlist(data.id) ? (
                    <Button
                        className="flex items-center gap-x-2 w-full rounded-md justify-center text-base h-10"
                        onClick={() => {
                            wishlist.removeItem(data.id);
                        }}
                    >
                        Remove from Wishlist
                        <HeartOff size={24} />
                    </Button>
                ) : (
                    <Button
                        className="flex items-center gap-x-2 w-full rounded-md justify-center text-base h-10"
                        onClick={() => {
                            wishlist.addItem(data);
                        }}
                    >
                        Add to Wishlist
                        <Heart size={24} />
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Info;
