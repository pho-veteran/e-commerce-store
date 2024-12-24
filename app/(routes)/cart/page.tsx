import CartClient from "./components/client";

const CartPage = () => {
    const backendUrl = process.env.PUBLIC_STORE_URL;
    
    if (!backendUrl) {
        throw new Error("Backend URL is not defined");
    }

    return (
        <>
            <CartClient backendUrl={backendUrl} />
        </>
    )
};

export default CartPage;
