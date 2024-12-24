import WishlistClient from "./components/client";


const WishlistPage = () => {
    const backendUrl = process.env.PUBLIC_STORE_URL;

    if (!backendUrl) {
        throw new Error("Backend URL is not defined");
    }
    
    return (
        <>
            <WishlistClient
                backendUrl={backendUrl}
            />
        </>
    )
}

export default WishlistPage;