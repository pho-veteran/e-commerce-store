"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
});

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
        <div className={cn("font-semibold text-2xl text-gray-900", className)}>
            {currencyFormatter.format(Number(value) || 0)}
        </div>
    );
};

export default Currency;
