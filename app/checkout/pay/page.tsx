import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import PayClient from "./components/client";
import getOrder from "@/actions/get-order";

interface PayPageProps {
    searchParams: {
        orderId: string,
    };
}

const PayPage: React.FC<PayPageProps> = async ({
    searchParams
}) => {
    const { userId }: { userId: string | null } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const backendUrl = process.env.PUBLIC_STORE_URL;

    const order = await getOrder(
        {
            orderId: searchParams.orderId,
            customerId: userId
        }
    );

    if (!order || !backendUrl || order.orderStatus !== "NOTPAID" || order.paymentMethod !== "ONLINE") {
        redirect("/")
    }

    return (
        <>
            <PayClient
                backendUrl={backendUrl}
                data={order}
                customerId={userId}
            />
        </>
    );
}

export default PayPage;