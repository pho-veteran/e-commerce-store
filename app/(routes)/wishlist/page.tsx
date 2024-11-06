"use client"
import Container from "@/components/ui/container";
import Wishlist from "./components/wishlist";
import IconButton from "@/components/ui/icon-button";
import { Trash } from "lucide-react";
import useWishlist from "@/hooks/use-wishlist";

const WishlistPage = () => {
    const wishlist = useWishlist();

    return (
        <div>
            <Container>
                <div className="flex flex-col px-4 sm:px-6 lg:px-8 py-16">
                    <div className="flex justify-between items-center">
                        <h1 className="text-black font-bold text-3xl">Wishlist</h1>
                        <IconButton
                            icon={<Trash size={24} className="text-white"/>}
                            className="border-none shadow-none bg-red-500"
                            onClick={() => {
                                wishlist.removeAll();
                            }}
                        />
                    </div>
                    <Wishlist />
                </div>
            </Container>
        </div>
    );
}

export default WishlistPage;