"use client"
import useAddressModal from "@/hooks/use-address-modal";
import { Plus } from "lucide-react";

const AddAddressButton = () => {
    const addressModal = useAddressModal();

    return (
        <button 
            className="w-full h-16 flex items-center justify-center gap-x-2 bg-white border-dashed border-gray-300 border-2 rounded-sm"
            onClick={() => {
                addressModal.onOpen()
            }}
        >
            <Plus size={24} />
            <span>Add New Address</span>
        </button>
    );
}

export default AddAddressButton;