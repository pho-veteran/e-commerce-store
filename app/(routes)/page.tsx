import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";

export const revalidate = 0;

const Store = async () => {
    const products = await getProducts({ isFeatured: true });
    const billboard = await getBillboard("6768101afd3729198ffea18c");
    return (
        <div>
            <Container>
                <div className="space-y-10 mb-10">
                    <Billboard data={billboard} />
                    <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
                        <ProductList
                            title="Featured Products"
                            items={products}
                        />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Store;
