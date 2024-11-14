"use client";

import Modal from "@/components/ui/modal";
import useAddressModal from "@/hooks/use-address-modal";

import AddressForm from "../form/address-form";
import { useState } from "react";
import { AddressFormValues } from "@/components/form/schemas/address-schema";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AddressModal = () => {
    const router = useRouter();
    const addressModal = useAddressModal();
    const address = useAddressModal((state) => state.data);

    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: AddressFormValues) => {
        try {
            setLoading(true);

            if (!address) {
                await axios.post(`/api/addresses`, data);
            } else {
                await axios.patch(
                    `/api/addresses/${address.id}`,
                    data
                );
            }
            router.refresh();
            addressModal.onClose();
            
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={addressModal.isOpen} onClose={addressModal.onClose}>
            <AddressForm 
                initialData={address} 
                loading={loading}
                onSubmit={onSubmit}
            />
        </Modal>
    );
};

export default AddressModal;
