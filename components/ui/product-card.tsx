"use client";

import { MouseEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Expand, Heart, HeartOff } from "lucide-react";

import { Product } from "@/types";
import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import usePreviewModal from "@/hooks/use-preview-modal";
import useWishlist from "@/hooks/use-wishlist";

interface ProductCardProps {
    data: Product;
    backendUrl: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
    data,
    backendUrl, 
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const router = useRouter();
    const previewModal = usePreviewModal();
    const wishlist = useWishlist();

    if (!isMounted) return null;

    const handleClick = () => {
        router.push(`/product/${data?.id}`);
    }

    const onPreview: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        previewModal.onOpen(data, backendUrl);
    }

    const onAddToWishlist: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        wishlist.addItem(data);
    }

    const onRemoveFromWishlist: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        wishlist.removeItem(data.id);
    }

    return (
        <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4" onClick={handleClick}>
            {/* Image, Action */}
            <div className="aspect-square rounded-xl bg-gray-100 relative">
                <Image
                    src={data?.images?.[0]?.url}
                    fill
                    alt="Image"
                    className="aspect-square object-cover rounded-md"
                />
                <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
                    <div className="flex gap-x-6 justify-center">
                        <IconButton
                            onClick={onPreview}
                            icon={
                                <Expand size={20} className="text-gray-600" />
                            }
                        />
                        {wishlist.isWishlist(data.id) ? (
                            <IconButton
                                onClick={onRemoveFromWishlist}
                                icon={
                                    <HeartOff
                                        size={20}
                                        className="text-gray-600"
                                    />
                                }
                            />
                        ) : (
                            <IconButton
                                onClick={onAddToWishlist}
                                icon={
                                    <Heart
                                        size={20}
                                        className="text-gray-600"
                                    />
                                }
                            />
                        )}
                    </div>
                </div>
            </div>
            {/* Desc */}
            <div>
                <p className="font-bold text-lg">{data.name}</p>
                <p className="text-sm text-gray-500">{data.category.name}</p>
            </div>
            {/* Price */}
            <div className="flex items-center justify-start">
                <Currency value={data?.price} />
            </div>
        </div>
    );
};

export default ProductCard;
