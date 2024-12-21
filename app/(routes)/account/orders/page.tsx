import getOrders from "@/actions/get-orders";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AllTab from "./components/all-tab";
import DeliveredTab from "./components/delivered-tab";
import ToPayTab from "./components/topay-tab";
import ToShipTab from "./components/toship-tab";
import PendingTab from "./components/pending-tab";
import CancelledTab from "./components/cancelled-tab";

export const revalidate = 0;

const OrdersHistoryPage = async () => {
    const { userId }: { userId: string | null } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const orders = await getOrders({
        customerId: userId,
    })

    return (
        <div className="w-full">
            <h1 className="text-black font-bold text-3xl">Orders History</h1>
            <Tabs defaultValue="all" className="w-full my-4">
                <TabsList className="bg-white rounded-sm flex justify-around">
                    <TabsTrigger value="all" className="text-base w-full py-4">All</TabsTrigger>
                    <TabsTrigger value="topay" className="text-base w-full py-4">To Pay</TabsTrigger>
                    <TabsTrigger value="pending" className="text-base w-full py-4">Pending</TabsTrigger>
                    <TabsTrigger value="toship" className="text-base w-full py-4">To Ship</TabsTrigger>
                    <TabsTrigger value="delivered" className="text-base w-full py-4">Delivered</TabsTrigger>
                    <TabsTrigger value="cancelled" className="text-base w-full py-4">Cancelled</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                    <AllTab data={orders} />
                </TabsContent>
                <TabsContent value="topay">
                    <ToPayTab data={orders} />
                </TabsContent>
                <TabsContent value="pending">
                    <PendingTab data={orders} />
                </TabsContent>
                <TabsContent value="toship">
                    <ToShipTab data={orders} />
                </TabsContent>
                <TabsContent value="delivered">
                    <DeliveredTab data={orders} />
                </TabsContent>
                <TabsContent value="cancelled">
                    <CancelledTab data={orders} />
                </TabsContent>
            </Tabs>
        </div>

    );
}

export default OrdersHistoryPage;