"use client"

import Container from "@/components/ui/container";
import { useState } from "react";
import PaymentMethodSection from "../../components/payment-methods-section";
import { Order } from "@/types";
import ConfirmSection from "./confirm-section";
import BackToOrders from "@/components/ui/back-to-orders";

interface PayClientProps {
    backendUrl: string;
    data: Order;
    customerId: string;
}

const PayClient: React.FC<PayClientProps> = ({
    backendUrl,
    data,
    customerId
}) => {
    const [paymentMethod, setPaymentMethod] = useState<string>("COD");

    return (
        <div className="bg-neutral-100">
            <Container>
                <div className="p-8 space-y-6">
                    <BackToOrders />
                    <PaymentMethodSection
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod}
                    />
                    <ConfirmSection 
                        backendUrl={backendUrl}
                        data={data}
                        customerId={customerId}
                        paymentMethod={paymentMethod}
                    />
                </div>
            </Container>
        </div>

    );
}

export default PayClient;