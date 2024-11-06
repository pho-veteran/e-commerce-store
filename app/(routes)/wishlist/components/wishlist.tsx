"use client"
import NoResults from "@/components/no-result";
import ProductCard from "@/components/ui/product-card";
import useWishlist from "@/hooks/use-wishlist";

const Wishlist = () => {
    const wishlist = useWishlist();
    const products = wishlist.items;

    return (
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
                    />
                ))}
            </div>
        </div>
    );
}

export default Wishlist;