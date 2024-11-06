"use client";

import Image from "next/image";
import { X } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import { Product } from "@/types";
import useWishlist from "@/hooks/use-wishlist";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";

interface WishlistItemProps {
    data: Product;
}

const WishlistItem: React.FC<WishlistItemProps> = ({ data }) => {
    const router = useRouter();
    const wishlist = useWishlist();

    const onRemove: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        wishlist.removeItem(data.id);
    }

    return (
        <li
            className="flex py-6 border-b sm:max-w-[80%] items-center cursor-pointer"
            onClick={() => {
                router.push(`/product/${data.id}`);
            }}
        >
            <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
                <Image
                    fill
                    src={data.images[0].url}
                    alt=""
                    className="object-cover object-center"
                />
            </div>
            <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div className="absolute z-10 right-0 top-0">
                    <IconButton onClick={onRemove} icon={<X size={16} />} />
                </div>
                <div className="relative pr-9">
                    <p className="text-xl font-semibold text-black hover:underline underline-offset-3">
                        {data.name}
                    </p>
                    <p className="text-sm text-gray-500">{data.category.name}</p>
                    <Currency value={data.price} className="sm:text-lg mt-2 text-base" />
                </div>
            </div>
        </li>
    );
};

export default WishlistItem;
