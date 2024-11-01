"use client"
import { Category } from "@/types";
import { useRouter } from "next/navigation";

interface CategoryCardProps {
    data: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ data }) => {
    const router = useRouter();
    const billboard = data.billboard;

    return (
        <div
            className="rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => {
                router.push(`/category/${data.id}`);
            }}
        >
            <div
                className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
                style={{ backgroundImage: `url(${billboard?.imageUrl})` }}
            >
                <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
                    <div className="font-bold text-2xl max-w-xs">
                        {billboard?.label}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryCard;