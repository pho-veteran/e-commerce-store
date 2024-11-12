import { UserProfile } from "@clerk/nextjs";

const AccountPage = () => {
    return (
        <div className="px-8">
            <UserProfile 
                routing="hash"
            />
        </div>
    );
}

export default AccountPage;