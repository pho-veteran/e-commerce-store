"use client";

import NoResults from "@/components/no-result";
import { Order } from "@/types";
import OrderCard from "./order-card";

interface PendingTabProps {
    data: Order[];
}

const PendingTab: React.FC<PendingTabProps> = ({
    data
}) => {
    const filteredData = data.filter((order) => order.orderStatus === "PENDING");

    return (
        <div className="w-full">
            {filteredData.length === 0 &&
                <NoResults
                    message="No orders found."
                    className="h-64 bg-white rounded-md"
                />
            }
            <ul className="space-y-4 pt-2">
                {filteredData.map((order, index) => (
                    <OrderCard key={index} data={order} />
                ))}
            </ul>
        </div>
    );
}

export default PendingTab;