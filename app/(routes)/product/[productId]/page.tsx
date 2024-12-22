import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";

import getCategory from "@/actions/get-category";
import getProducts from "@/actions/get-products";
import getProduct from "@/actions/get-product";
import Container from "@/components/ui/container";
import ProductList from "@/components/product-list";
import Gallery from "@/components/gallery"
import Info from "@/components/info";
import ProductBreadcrumb from "./components/product-breadcrumb";
import SocialShare from "@/components/ui/social-share";
import { Metadata } from "next";

export const revalidate = 0;

interface ProductPageProps {
    params: {
        productId: string;
    };
}

export async function generateMetadata(
    { params }: ProductPageProps
): Promise<Metadata> {
    if (!ObjectId.isValid(params.productId)) {
        redirect("/");
    }

    const product = await getProduct(params.productId);

    return {
        title: `VStore | ${product.name}`,
        description: `Details and purchase options for ${product.name}.`,
        openGraph: {
            title: product.name,
            description: `Explore more about ${product.name}.`,
            images: product.images.map((image: { url: string }) => image.url),
        },
    };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
    if (ObjectId.isValid(params.productId) === false) {
        redirect("/");
    }

    const product = await getProduct(params.productId);
    const category = await getCategory(product.category.id);

    const suggestedProducts = await getProducts({
        categoryId: product?.category?.id,
    });

    return (
        <div className="bg-white mb-10">
            <Container>
                <div className="px-4 py-10 sm:px-6 lg:px-8">
                    <ProductBreadcrumb
                        categoryData={category}
                        productData={product}
                    />
                    <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                        {/* Gallery */}
                        <div className="flex gap-4">
                            <Gallery images={product.images} />
                            <SocialShare
                                mediaUrl={product.images[0].url}
                            />
                        </div>
                        <div
                            className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0"
                        >
                            {/* Info */}
                            <Info
                                data={product}
                            />
                        </div>
                    </div>
                    <hr className="my-10" />
                    <ProductList title="Suggested Products" items={suggestedProducts} />
                </div>
            </Container>
        </div>
    );
};

export default ProductPage;
