"use client";
import { useSearchParams, useRouter } from "next/navigation";
import qs from "query-string";

import { Size, Color } from "@/types";
import VariantButtons from "@/components/ui/variant-buttons";

interface VariantFilterProps {
    data: (Size | Color)[];
    name: string;
    valueKey: string;
}
const VariantFilter: React.FC<VariantFilterProps> = ({ data, name, valueKey }) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const selectedValue = searchParams.get(valueKey);

    const onClick = (id: string) => {
        const current = qs.parse(searchParams.toString());

        const query = {
            ...current,
            [valueKey]: id,
        };

        if (current[valueKey] === id) {
            query[valueKey] = null;
        }

        const url = qs.stringifyUrl(
            {
                url: window.location.href,
                query,
            },
            { skipNull: true }
        );

        router.push(url, { scroll: false });
    };

    return (
        <div className="mb-8">
            <h3 className="text-lg font-semibold">{name}</h3>
            <hr className="my-4" />
            <VariantButtons 
                data={data} 
                onClick={onClick} 
                selectedValue={selectedValue}
                type={valueKey === "sizeId" ? "size" : "color"}
            />
        </div>
    );
};

export default VariantFilter;
