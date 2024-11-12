import Container from "@/components/ui/container";
import AccountSidebar from "./components/account-sidebar";

const AccountLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <main className="bg-neutral-100">
            <Container>
                <div className="flex gap-x-6 px-4 py-16 sm:px-6 lg:px-8 ">
                    <AccountSidebar />
                    {children}
                </div>
            </Container>
        </main>
    );
}

export default AccountLayout;