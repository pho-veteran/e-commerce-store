"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import qs from "query-string";
import { formatMoneyString, moneyStringToNumber } from "@/lib/utils";
import IconInput from "@/components/ui/icon-input";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

const PriceFilter: React.FC = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const selectedValue = searchParams.get("price");
    const [defaultMin, defaultMax] = selectedValue?.split(",") || [];

    const [minPrice, setMinPrice] = useState(
        Number(defaultMin) ? formatMoneyString(defaultMin) : ""
    );
    const [maxPrice, setMaxPrice] = useState(
        Number(defaultMax) ? formatMoneyString(defaultMax) : ""
    );

    const currentParams = useMemo(() => qs.parse(searchParams.toString()), [searchParams]);

    const updateUrl = (query: Record<string, string | null>) => {
        const url = qs.stringifyUrl(
            {
                url: window.location.href,
                query,
            },
            { skipNull: true }
        );
        router.push(url, { scroll: false });
    };

    const handlePriceChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setter(formatMoneyString(e.target.value));
        };

    const onApplyClick = () => {
        const min = moneyStringToNumber(minPrice) || 0;
        const max = moneyStringToNumber(maxPrice) || 0;

        if (!minPrice && !maxPrice) {
            updateUrl({ ...currentParams, price: null });
            return;
        }

        if (min > max) {
            toast.error("Invalid price range");
            return;
        }

        updateUrl({ ...currentParams, price: `${min},${max}` });
    };

    const onClearClick = () => {
        setMinPrice("");
        setMaxPrice("");
        updateUrl({ ...currentParams, price: null });
    };

    return (
        <div className="mb-8">
            <h3 className="text-lg font-semibold">Prices</h3>
            <hr className="my-4" />
            <div className="flex flex-col gap-y-2 justify-center">
                <div className="text-center text-sm text-gray-400 font-mono">FROM</div>
                <IconInput
                    pattern="[0-9]*"
                    icon={<div className="text-slate-900 h-4 w-4 flex items-center justify-center">₫</div>}
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={handlePriceChange(setMinPrice)}
                />
                <div className="text-center text-sm text-gray-400 font-mono">TO</div>
                <IconInput
                    pattern="[0-9]*"
                    icon={<div className="text-slate-900 h-4 w-4 flex items-center justify-center">₫</div>}
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={handlePriceChange(setMaxPrice)}
                />
            </div>
            <div className="grid grid-cols-2 mt-6">
                <Button
                    className="rounded-md text-sm bg-transparent border-none text-gray-800 text-bold"
                    title="Clear Filter"
                    onClick={onClearClick}
                >
                    Clear
                </Button>
                <Button
                    className="rounded-md text-sm"
                    title="Apply Filter"
                    onClick={onApplyClick}
                >
                    Apply
                </Button>
            </div>
        </div>
    );
};

export default PriceFilter;
