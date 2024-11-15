import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";

interface PaymentMethodItemProps {
    value: string;
    iconUrl: string;
    label: string;
}

const PaymentMethodItem: React.FC<PaymentMethodItemProps> = ({
    value,
    iconUrl,
    label
}) => {
    return (
        <div className="flex items-center gap-2">
            <RadioGroupItem
                value={value} />
            <img src={iconUrl} alt={label} className="w-8 h-8" />
            <Label className="text-black text-sm ml-2">{label}</Label>
        </div>

    );
}

export default PaymentMethodItem;