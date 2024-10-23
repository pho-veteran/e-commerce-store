import Image from "next/image";
import { X } from "lucide-react";

import useCart from "@/hooks/use-cart";
import IconButton from "@/components/ui/icon-button";
import { OrderItem } from "@/types";
import { currencyFormatter } from "@/lib/utils";

interface CartHoverCardProps {
    data: OrderItem;
}

const CartHoverCard: React.FC<CartHoverCardProps> = ({ data }) => {
    const cart = useCart();

    const onRemove = () => {
        cart.removeItem(data.product.id);
    }

    return (
        <li className="flex py-4 border-b items-center">
            <div className="relative h-[4.8rem] w-[4.8rem] rounded-md overflow-hidden">
                <Image
                    fill
                    src={data.product.images[0].url}
                    alt=""
                    className="object-cover object-center"
                />
            </div>
            <div className="relative ml-4 flex flex-col flex-1 justify-between">
                <div className="absolute z-10 right-0 top-1/4">
                    <IconButton onClick={onRemove} icon={<X size={12} />} className="opacity-0 hover:opacity-100 transition" />
                </div>
                <p className="text-lg font-semibold text-black">
                    {data.product.name}
                </p>
                <div className="mt-1 flex text-sm">
                    <div className="flex gap-x-2 items-center">
                        <p className="text-gray-500">{data.product.color.name}</p>
                        <div
                            className="h-4 w-4 rounded-full"
                            style={{ backgroundColor: data.product.color.value }}
                        ></div>
                    </div>
                    <p className="text-gray-500 ml-4 border-l border-gray-200 pl-4">
                        {data.product.size.name}
                    </p>
                </div>
                <p className="text-sm text-neutral-400 mt-2">
                    <span className="text-blue-400">
                        {currencyFormatter.format(Number(data.product.price) || 0)}
                    </span>
                    {` x ${data.quantity}`}
                </p>
            </div>
        </li>
    );
}

export default CartHoverCard;