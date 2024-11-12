"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CircleCheck } from "lucide-react";

import { Address } from "@prisma/client";
import useAddressModal from "@/hooks/use-address-modal";
import useConfirmModal from "@/hooks/use-confirm-modal";

interface AddressCardProps {
    address: Address;
}

const AddressCard: React.FC<AddressCardProps> = ({
    address,
}) => {
    const addressModal = useAddressModal();
    const confirmModal = useConfirmModal();
    const router = useRouter();
    const formattedAddress = address.streetAddress.concat(", ", address.generalAddress);

    const onDelete = async () => {
        try {
            confirmModal.setLoading(true);
            await axios.delete(
                `/api/addresses/${address.id}`
            );
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            confirmModal.setLoading(false);
            confirmModal.onClose();
        }
    };

    const onSetDefault = async () => {
        try {
            confirmModal.setLoading(true);
            await axios.patch(
                `/api/addresses/${address.id}`,
                {
                    isDefault: true,
                }
            );
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            confirmModal.setLoading(false);
            confirmModal.onClose();
        }
    };

    return (
        <div className="w-full bg-white rounded-md p-4 space-y-2 text-sm">
            <div className="flex items-center gap-x-4">
                <h5
                    className="text-black text-base uppercase"
                >{address.name}</h5>
                {address.isDefault ? (
                    <div className="text-green-400 flex items-center gap-x-1">
                        <CircleCheck size={12} />
                        <span>Default Address</span>
                    </div>
                ) : (
                    <button
                        className="text-neutral-900 ml-auto mr-2 border-gray-300 border-2 rounded-sm px-2 py-1"
                        onClick={() => {
                            confirmModal.onOpen(() => onSetDefault());
                        }}
                    >
                        Set as Default
                    </button>
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
            <div className="flex gap-x-2 mt-2">
                <button
                    className="text-black"
                    onClick={() => {
                        addressModal.onOpen(address);
                    }}
                >
                    Edit
                </button>
                {!address.isDefault && (
                    <button
                        className="text-black"
                        onClick={() => {
                            confirmModal.onOpen(() => onDelete());
                        }}
                    >
                        Remove
                    </button>
                )}
            </div>
        </div>
    );
}

export default AddressCard;