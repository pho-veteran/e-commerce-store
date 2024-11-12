import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Category, Product } from "@/types";

interface ProductcrumbProps {
    categoryData: Category;
    productData: Product;
}

const ProductBreadcrumb: React.FC<ProductcrumbProps> = ({ 
    categoryData,
    productData
 }) => {
    return (
        <Breadcrumb className="pb-4 sm:pb-6 lg:pb-8">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink href={`/category/${categoryData.id}`}>{categoryData.name}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink href={`/product/${productData.id}`}>{productData.name}</BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}

export default ProductBreadcrumb;