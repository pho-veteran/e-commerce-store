import getCategories from "@/actions/get-categories";
import getCategory from "@/actions/get-category";
import getProducts from "@/actions/get-products";

import CategoryCard from "@/components/ui/category-card";
import Container from "@/components/ui/container";
import ProductCard from "@/components/ui/product-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SearchProps {
    searchParams: {
        name: string;
    };
}

const SearchPage: React.FC<SearchProps> = async ({ searchParams }) => {
    const { name } = searchParams;
    const products = await getProducts({
        name: name,
    });

    const categories = await getCategories({
        name: name,
    });

    return (
        <Container>
            <div className="flex flex-col px-4 sm:px-6 lg:px-8 mt-8">
                <h1 className="text-black font-bold text-2xl">Search Results</h1>

                <Tabs defaultValue="products" className="mt-10">
                    <TabsList>
                        <TabsTrigger
                            value="products"
                        >Products</TabsTrigger>
                        <TabsTrigger value="category">Category</TabsTrigger>
                    </TabsList>
                    <TabsContent value="products">
                        {/* Products */}
                        <h2 className="mt-10 font-semibold">
                            <span>{products.length}</span> products found for <span>"{name}"</span>
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-8">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    data={product}
                                />
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="category">
                        {/* Category */}
                        <h2 className="mt-10 font-semibold">
                            <span>{categories.length}</span> categories found for <span>"{name}"</span>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-8">
                                {categories.map((category) => (
                                    <CategoryCard
                                        key={category.id}
                                        data={category}
                                    />
                                ))}
                            </div>
                        </h2>
                    </TabsContent>
                </Tabs>
            </div>
        </Container>
    );
}

export default SearchPage;