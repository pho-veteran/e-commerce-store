import { Address } from "@prisma/client";
import { CircleCheck } from "lucide-react";

interface AddressSelectItemProps {
    address: Address;
    onSelect: (address: Address) => void;
    isSelected: boolean
}

const AddressSelectItem: React.FC<AddressSelectItemProps> = ({
    address,
    onSelect,
    isSelected
}) => {
    const formattedAddress = address.streetAddress.concat(", ", address.generalAddress);
    return (
        <div className="w-full bg-white rounded-md p-4 space-y-2 text-sm mr-4 shadow-sm max-w-2xl">
            <div className="flex items-center gap-x-4">
                <div>
                    <h5
                        className="text-black text-base uppercase font-semibold"
                    >{address.name}</h5>
                    <span className="text-neutral-400 font-mono text-xs">{address.type}</span>
                </div>
                {address.isDefault && (
                    <div className="text-green-400 flex items-center gap-x-1 self-start leading-6">
                        <CircleCheck size={12} />
                        <span>Default Address</span>
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-y-2">
                <p>
                    <span className="text-neutral-400">Address: </span>
                    {formattedAddress}
                </p>
                <p>
                    <span className="text-neutral-400">Phone number: </span>
                    {address.phone}
                </p>
            </div>
            {!isSelected && (
                <button
                    className="text-neutral-900 ml-auto mr-2 border-gray-300 border-2 rounded-sm px-2 py-1 mt-2"
                    onClick={() => {
                        onSelect(address);
                    }}
                >
                    Select Address
                </button>
            )}
        </div>
    );
}

export default AddressSelectItem;