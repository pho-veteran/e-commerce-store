"use client";

import NoResults from "@/components/no-result";
import { Order } from "@/types";
import OrderCard from "./order-card";

interface AllTabProps {
    data: Order[];
}

const AllTab: React.FC<AllTabProps> = ({
    data
}) => {
    return (
        <div className="w-full">
            {data.length === 0 &&
                <NoResults
                    message="No orders found."
                    className="h-64 bg-white rounded-md"
                />
            }
            <ul className="space-y-4 pt-2">
                {data.map((order, index) => (
                    <OrderCard key={index} data={order} />
                ))}
            </ul>
        </div>
    );
}

export default AllTab;