import getCategories from "@/actions/get-categories";
import getProducts from "@/actions/get-products";
import NoResults from "@/components/no-result";

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

    const backendUrl = process.env.PUBLIC_STORE_URL;

    if (!backendUrl) {
        throw new Error("Backend URL is not defined");
    }

    return (
        <Container>
            <div className="flex flex-col px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-black font-bold text-3xl">Search Results</h1>

                <Tabs defaultValue="products" className="mt-12">
                    <TabsList>
                        <TabsTrigger
                            value="products"
                        >Products</TabsTrigger>
                        <TabsTrigger value="category">Category</TabsTrigger>
                    </TabsList>
                    <TabsContent value="products">
                        {/* Products */}
                        <h2 className="mt-10 font-semibold">
                            <span>{products.length}</span> products found for <span>&quot;{name}&quot;</span>
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-8">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    data={product}
                                    backendUrl={backendUrl}
                                />
                            ))}
                        </div>
                        {products.length === 0 && (
                            <NoResults />
                        )}
                    </TabsContent>
                    <TabsContent value="category">
                        {/* Category */}
                        <h2 className="mt-10 font-semibold">
                            <span>{categories.length}</span> categories found for <span>&quot;{name}&quot;</span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
                                {categories.map((category) => (
                                    <CategoryCard
                                        key={category.id}
                                        data={category}
                                    />
                                ))}
                            </div>
                            {categories.length === 0 && (
                                <NoResults />
                            )}
                        </h2>
                    </TabsContent>
                </Tabs>
            </div>
        </Container>
    );
}

export default SearchPage;