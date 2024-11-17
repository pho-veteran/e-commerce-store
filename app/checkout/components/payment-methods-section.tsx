import { CreditCard } from "lucide-react";
import PaymentMethodItem from "./payment-method-item";

interface PaymentMethodSectionProps {
    paymentMethod: string;
    setPaymentMethod: (paymentMethod: string) => void;
}

const paymentMethods = [
    {
        value: "COD",
        icon: 
            <img src="/payment-method-imgs/cod.png" alt="Cash on Delivery" className="w-12 h-12" />,
        label: "Cash on Delivery"
    },
    {
        value: "VNPAYEWALLET",
        icon: <img src="/payment-method-imgs/vnpay.png" alt="VNPay EWallet" className="w-12 h-12" />,
        label: "VNPay EWallet"
    },
    {
        value: "CARD",
        icon: 
            <div className="flex gap-x-2 items-center">
                <img src="/payment-method-imgs/credit-card.png" alt="Credit Card" className="w-12 h-12" />
                <span className="text-2xl text-neutral-400">/</span>
                <img src="/payment-method-imgs/atm.png" alt="ATM Card" className="w-12 h-12" />
            </div>,
        label: "Credit Card / ATM Card"
    }
]

const PaymentMethodSection: React.FC<PaymentMethodSectionProps> = ({
    paymentMethod,
    setPaymentMethod
}) => {

    const onClick = (value: string) => {
        setPaymentMethod(value);
    }

    return (
        <div className="bg-white w-full rounded-md">
            <div className="px-6 py-4">
                <div className="flex gap-x-2 items-center">
                    <CreditCard
                        size={24}
                        className="text-primary-500"
                    />
                    <p className="font-semibold text-lg">Select Payment Method</p>
                </div>
                <div
                    className="grid md:grid-cols-3 gap-4 my-8"
                >
                    {paymentMethods.map((method) => (
                        <PaymentMethodItem
                            key={method.value}
                            icon={method.icon}
                            label={method.label}
                            value={method.value}
                            onClick={onClick}
                            isActive={paymentMethod === method.value}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PaymentMethodSection;