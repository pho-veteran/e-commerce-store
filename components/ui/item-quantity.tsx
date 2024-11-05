"use client"
import { Minus, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

interface ItemQuantityProps {
    data: number;
    onQuantityChange: (quantity: number) => void;
    onRemove: () => void;
}

const ItemQuantity: React.FC<ItemQuantityProps> = ({ 
    data, 
    onQuantityChange, 
    onRemove 
}) => {
    const [quantity, setQuantity] = useState(data);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const value = Number(quantity);
        if (isNaN(value) || value < 1 || value > 2000) {
            setQuantity(1);
            toast.error("Invalid quantity value");
            return;
        }
        onQuantityChange(quantity);
    }, [quantity]);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(e.target.value));
    }

    const onIncrease = () => {
        setQuantity(quantity + 1);
    }

    const onDecrease = () => {
        if (quantity === 1) {
            onRemove();
            return;
        }
        setQuantity(quantity - 1);
    }

    return (
        <div className="flex rounded-sm border-collapse border border-gray-200 h-auto">
            <button className="flex items-center justify-center border-r border-gray-200 w-10" onClick={onDecrease}>
                <Minus size={16} />
            </button>
            <input type="tel" value={quantity} className="px-2 py-1 w-16 text-center" onChange={onInputChange} ref={inputRef}/>
            <button className="flex items-center justify-center border-l border-gray-200 w-10" onClick={onIncrease}>
                <Plus size={16} />
            </button>
        </div>
    );
}

export default ItemQuantity;