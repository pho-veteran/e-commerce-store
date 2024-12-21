import { redirect } from "next/navigation";
import CheckoutClient from "./components/client";
import { auth } from "@clerk/nextjs/server";

const CheckoutPage = async () => {
    const { userId }: { userId: string | null } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }
    
    const backendUrl = process.env.PUBLIC_STORE_URL;

    if (!backendUrl) {
        redirect("/");
    }

    return (
        <>
            <CheckoutClient 
                backendUrl={backendUrl}
            />
        </>
    );
};

export default CheckoutPage;
