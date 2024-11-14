import CheckoutHeader from "./components/header";

export default async function CheckoutLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <CheckoutHeader />
            {children}
        </>
    );
}