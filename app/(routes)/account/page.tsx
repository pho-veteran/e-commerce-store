import { UserProfile } from "@clerk/nextjs";

const AccountPage = () => {
    return (
        <div className="px-2 mx-auto">
            <UserProfile 
                routing="hash"
            />
        </div>
    );
}

export default AccountPage;