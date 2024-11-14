import Navbar from "@/components/navbar";

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <>
            <Navbar />
            {children}
        </>
    );
}