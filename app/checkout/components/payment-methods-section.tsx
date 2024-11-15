import { RadioGroup } from "@/components/ui/radio-group";
import { CreditCard } from "lucide-react";
import PaymentMethodItem from "./payment-method-item";

interface PaymentMethodSectionProps {
    paymentMethod: string;
    setPaymentMethod: (paymentMethod: string) => void;
}

const paymentMethods = [
    {
        value: "cod",
        iconUrl: "/payment-method-imgs/cod.png",
        label: "Cash on Delivery"
    },
    {
        value: "qr_code",
        iconUrl: "/payment-method-imgs/vnpay.png",
        label: "VNPay QR"
    },
    {
        value: "credit_card",
        iconUrl: "/payment-method-imgs/credit-card.png",
        label: "Credit Card"
    },
    {
        value: "atm_card",
        iconUrl: "/payment-method-imgs/atm.png",
        label: "ATM Card"
    }
]

const PaymentMethodSection: React.FC<PaymentMethodSectionProps> = ({
    paymentMethod,
    setPaymentMethod
}) => {
    return (
        <div className="bg-white w-full rounded-md">
            <div className="px-6 py-4">
                <div className="flex gap-x-2 items-center">
                    <CreditCard
                        size={24}
                        className="text-primary-500"
                    />
                    <p className="font-semibold text-lg">Payment Method</p>
                </div>
                <RadioGroup
                    value={paymentMethod}
                    onValueChange={(value) => setPaymentMethod(value)}
                    className="flex flex-col gap-y-4 mt-8"
                >
                    {paymentMethods.map((method) => (
                        <PaymentMethodItem
                            key={method.value}
                            value={method.value}
                            iconUrl={method.iconUrl}
                            label={method.label}
                        />
                    ))}
                </RadioGroup>
            </div>
        </div>
    );
}

export default PaymentMethodSection;