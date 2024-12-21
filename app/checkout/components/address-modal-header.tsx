import { useRouter } from "next/navigation";

const AddressModalHeader = () => {
    const router = useRouter();
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Select delivery address</h3>
            <button
                className="text-neutral-900 ml-auto mr-2 border-gray-300 border-2 rounded-sm px-2 py-1 mt-2 text-sm"
                onClick={() => {
                    router.push("/account/addresses");
                }}
            >
                Manage Addresses
            </button>
        </div>
    );
}

export default AddressModalHeader;