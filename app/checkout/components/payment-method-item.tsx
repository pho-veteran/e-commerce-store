import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface PaymentMethodItemProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    onClick: (value: string) => void;
    isActive: boolean;
}

const PaymentMethodItem: React.FC<PaymentMethodItemProps> = ({
    icon,
    label,
    value,
    onClick,
    isActive
}) => {
    return (
        <div
            className={cn("flex items-center gap-2 flex-col p-4 bg-transparent border rounded-md cursor-pointer w-full col-span-1 hover:bg-gray-100", 
                isActive ? "border-black border-2" : "border-gray-200"
            )}
            onClick={() => onClick(value)}
        >
            {icon}
            <Label 
                className="text-base font-semibold text-center h-full"
            >{label}</Label>
        </div>

    );
}

export default PaymentMethodItem;