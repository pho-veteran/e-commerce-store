"use client"

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackToOrders = () => {
    const router = useRouter();

    return (
        <div
            className="flex gap-x-2 items-center text-neutral-500 cursor-pointer hover:text-neutral-600"
            onClick={() => router.push("/account/orders")}
        >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Orders History</span>
        </div>
    );
}

export default BackToOrders;