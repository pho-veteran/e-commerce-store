"use client"

import Container from "@/components/ui/container";
import IconButton from "@/components/ui/icon-button";
import { Trash } from "lucide-react";
import useWishlist from "@/hooks/use-wishlist";
import NoResults from "@/components/no-result";
import ProductCard from "@/components/ui/product-card";
import axios from "axios";
import { useEffect, useState } from "react";

interface WishlistClientProps {
    backendUrl: string;
}

const WishlistClient: React.FC<WishlistClientProps> = ({
    backendUrl
}) => {
    const [mounted, setMounted] = useState(false);

    const wishlist = useWishlist();
    const products = wishlist.items;

    useEffect(() => {
        setMounted(true);
    }, []);

    const updateWishlist = async () => {
        try {
            const productsId = wishlist.items.map((item) => item.id);
            const queryIds = productsId.join(",");
            const result = await axios.get(`${backendUrl}/products?ids=${queryIds}`);

            console.log(result.data);
            
            wishlist.replaceWishlist(result.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (mounted) {
            updateWishlist();
        }
    }, [mounted]);

    if (!mounted) return null;

    return (
        <div className="mb-10">
            <Container>
                <div className="flex flex-col px-4 sm:px-6 lg:px-8 py-16">
                    <div className="flex justify-between items-center">
                        <h1 className="text-black font-bold text-3xl">Wishlist</h1>
                        <IconButton
                            icon={<Trash size={24} className="text-white" />}
                            className="border-none shadow-none bg-red-500"
                            onClick={() => {
                                wishlist.removeAll();
                            }}
                        />
                    </div>
                    <div className="mt-12">
                        {products.length === 0 && (
                            <NoResults
                                message="No items in your wishlist."
                                className="h-72"
                            />
                        )}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    data={product}
                                    backendUrl={backendUrl}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default WishlistClient;