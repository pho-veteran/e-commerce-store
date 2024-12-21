import Container from "@/components/ui/container";
import AccountSidebar from "./components/account-sidebar";
import AccountBreadcrumb from "./components/account-breadcrumb";

const AccountLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <main className="bg-neutral-100">
            <Container>
                <AccountBreadcrumb />
                <div className="gap-x-6 px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:flex space-y-6 lg:space-y-0">
                    <AccountSidebar />
                    {children}
                </div>
            </Container>
        </main>
    );
}

export default AccountLayout;