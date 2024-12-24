"use client"

import { Minus, Plus } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";

interface ItemQuantityProps {
    quantity: number,
    setQuantity: (value: number) => void,
    maxQuantity: number
}

const ItemQuantity: React.FC<ItemQuantityProps> = ({
    quantity,
    setQuantity,
    maxQuantity,
}) => {
    useEffect(() => {
        const value = Number(quantity);
        if (isNaN(value)) {
            setQuantity(1);
            toast.error("Invalid quantity value");
            return;
        }
        if (value < 1 && maxQuantity > 0) {
            setQuantity(1);
        }
        if (value < 1 && maxQuantity === 0) {
            setQuantity(0);
        }
        if (value > maxQuantity) {
            setQuantity(maxQuantity);
            toast.error("Quantity exceeds maximum limit");
        }
    }, [quantity, maxQuantity]);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(e.target.value));
    }

    const onIncrease = () => {
        setQuantity(quantity + 1);
    }

    const onDecrease = () => {
        if (quantity === 1) {
            toast.error("Quantity cannot be less than 1");
            return;
        }
        setQuantity(quantity - 1);
    }

    return (
        <div className="flex rounded-sm border-collapse border border-gray-200 h-auto">
            <button className="flex items-center justify-center border-r border-gray-200 w-10" onClick={onDecrease}>
                <Minus size={16} />
            </button>
            <input type="tel" value={quantity} className="px-2 py-1 w-16 text-center" onChange={onInputChange} />
            <button className="flex items-center justify-center border-l border-gray-200 w-10" onClick={onIncrease}>
                <Plus size={16} />
            </button>
        </div>
    );
}

export default ItemQuantity;