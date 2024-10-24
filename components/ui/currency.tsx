"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

import { currencyFormatter } from "@/lib/utils";

interface CurrencyProps {
    value?: string | number;
    className?: string;
}

const Currency: React.FC<CurrencyProps> = ({ value, className }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className={cn("font-semibold text-xl text-gray-900", className)}>
            {currencyFormatter.format(Number(value) || 0)}
        </div>
    );
};

export default Currency;
