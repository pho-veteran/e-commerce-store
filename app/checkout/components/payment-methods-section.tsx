import { CreditCard } from "lucide-react";
import PaymentMethodItem from "./payment-method-item";
import Image from "next/image";

interface PaymentMethodSectionProps {
    paymentMethod: string;
    setPaymentMethod: (paymentMethod: string) => void;
}

const paymentMethods = [
    {
        value: "COD",
        icon: 
            <Image src="/payment-method-imgs/cod.png" alt="Cash on Delivery" width={48} height={48} />,
        label: "Cash on Delivery"
    },
    {
        value: "VNPAYEWALLET",
        icon: <Image src="/payment-method-imgs/vnpay.png" alt="VNPay EWallet" width={48} height={48} />,
        label: "VNPay EWallet"
    },
    {
        value: "CARD",
        icon: 
            <div className="flex gap-x-2 items-center">
                <Image src="/payment-method-imgs/credit-card.png" alt="Credit Card" width={48} height={48} />
                <span className="text-2xl text-neutral-400">/</span>
                <Image src="/payment-method-imgs/atm.png" alt="ATM Card" width={48} height={48} />
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