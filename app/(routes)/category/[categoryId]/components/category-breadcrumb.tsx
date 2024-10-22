import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Category } from "@/types";
import Link from "next/link";

interface CategoryBreadcrumbProps {
    data: Category;
}

const CategoryBreadcrumb: React.FC<CategoryBreadcrumbProps> = ({ data }) => {
    return (
        <Breadcrumb className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink href={`/category/${data.id}`}>{data.name}</BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}

export default CategoryBreadcrumb;