"use client";
import { useSearchParams, useRouter } from "next/navigation";
import qs from "query-string";

import { Size, Color } from "@/types";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

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

        router.push(url);
    };

    return (
        <div className="mb-8">
            <h3 className="text-lg font-semibold">{name}</h3>
            <hr className="my-4" />
            <div className="flex flex-wrap gap-2">
                {data.map((item) => (
                    <div key={item.id} className="flex items-center">
                        <Button
                            className={cn(
                                "rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300 flex gap-x-2",
                                selectedValue === item.id &&
                                    "bg-black text-white"
                            )}
                            onClick={() => onClick(item.id)}
                        >
                            <span>{item.name}</span>
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VariantFilter;
