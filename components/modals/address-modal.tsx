"use client";

import Modal from "@/components/ui/modal";
import useAddressModal from "@/hooks/use-address-modal";
import AddressForm from "../form/address-form";

const AddressModal = () => {
    const addressModal = useAddressModal();
    const address = useAddressModal((state) => state.data);

    return (
        <Modal open={addressModal.isOpen} onClose={addressModal.onClose}>
            <AddressForm initialData={address} />
        </Modal>
    );
};

export default AddressModal;
