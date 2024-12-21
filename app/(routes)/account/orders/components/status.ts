import { Ban, Banknote, CircleCheck, CircleEllipsis, Package, Truck } from "lucide-react";

export const states = [
    {
        value: "PENDING",
        label: "Pending",
        className: "bg-yellow-100 text-yellow-600",
        message: "Waiting for confirmation",
        icon: CircleEllipsis
    },
    {
        value: "CONFIRMED",
        label: "Confirmed",
        className: "bg-blue-100 text-blue-600",
        message: "Order is confirmed",
        icon: CircleCheck
    },
    {
        value: "SHIPPING",
        label: "Shipping",
        className: "bg-green-100 text-green-600",
        message: "Order is on the way",
        icon: Truck
    },
    {
        value: "DELIVERED",
        label: "Delivered",
        className: "bg-green-100 text-green-600",
        message: "Order is delivered",
        icon: Package
    },
    {
        value: "CANCELLED",
        label: "Cancelled",
        className: "bg-red-100 text-red-600",
        message: "Order is cancelled",
        icon: Ban
    },
    {
        value: "NOTPAID",
        label: "Payment Pending",
        className: "bg-red-100 text-red-600",
        message: "Payment is pending",
        icon: Banknote
    }
]