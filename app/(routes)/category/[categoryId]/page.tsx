import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import getColors from "@/actions/get-colors";
import getCategory from "@/actions/get-category";
import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import VariantFilter from "./components/variant-filter";
import NoResults from "@/components/no-result";
import ProductCard from "@/components/ui/product-card";
import MobileFilters from "./components/mobile-filters";
import CategoryBreadcrumb from "./components/category-breadcrumb";
import PriceFilter from "./components/price-filter";
import { redirect } from "next/navigation";
import NameFilter from "./components/name-filter";

export const revalidate = 0;

interface CategoryPageProps {
    params: {
        categoryId: string;
    };
    searchParams: {
        colorId: string;
        sizeId: string;
        price: string;
        name: string;
    };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
    params,
    searchParams,
}) => {
    let products = await getProducts({
        categoryId: params.categoryId,
        colorId: searchParams.colorId,
        sizeId: searchParams.sizeId,
        name: searchParams.name,
    });

    const [minPrice, maxPrice] = searchParams.price
        ? searchParams.price.split(",")
        : [];

    if (minPrice && maxPrice) {
        const min = parseInt(minPrice);
        const max = parseInt(maxPrice);
        if (isNaN(min) || isNaN(max)) {
            redirect("/404");
        } else {
            products = products.filter((product) => {
                const productPrice = parseInt(product.price);
                return productPrice >= min && productPrice <= max;
            });
        }
    }

    const sizes = await getSizes();
    const colors = await getColors();
    const category = await getCategory(params.categoryId);

    return (
        <div>
            <Container>
                <Billboard data={category.billboard} />
                <CategoryBreadcrumb 
                    data={category}
                />
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-5 lg:gap-x-6">
                        <MobileFilters sizes={sizes} colors={colors} />
                        <div className="hidden lg:block">
                            <NameFilter />
                            <VariantFilter
                                valueKey="sizeId"
                                name="Sizes"
                                data={sizes}
                            />
                            <VariantFilter
                                valueKey="colorId"
                                name="Colors"
                                data={colors}
                            />
                            <PriceFilter />
                        </div>
                        <div className="mt-6 lg:col-span-4 lg:mt-0">
                            {products.length === 0 && <NoResults />}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {products.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        data={product}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default CategoryPage;
