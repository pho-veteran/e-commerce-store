import { Product } from "@/types";
import NoResults from "@/components/no-result";
import ProductCard from "@/components/ui/product-card";

export const revalidate = 0;

interface ProductListProps {
    title: string;
    items: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ title, items }) => {
    const backendUrl = process.env.PUBLIC_STORE_URL;
    
    if (!backendUrl) {
        throw new Error("Backend URL is not defined");
    }

    return (
        <div className="space-y-4">
            <h3 className="font-bold text-2xl md:text-3xl ">{title}</h3>
            {items.length === 0 && <NoResults />}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map((product) => (
                    <div key={product.id}>
                        <ProductCard 
                            key={product.id} 
                            data={product}
                            backendUrl={backendUrl}
                        />
                    </div>    
                ))}
            </div>
        </div>
    );
};

export default ProductList;
