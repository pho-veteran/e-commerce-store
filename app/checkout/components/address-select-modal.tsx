"use client";

import { useState } from "react";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Address } from "@prisma/client";
import AddressSelectItem from "./address-select-item";
import AddressModalHeader from "./address-modal-header";

interface AddressSelectModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentAddress: Address | null;
    onConfirm: (address: Address) => void;
    addresses: Address[];
}

export const AddressSelectModal: React.FC<AddressSelectModalProps> = ({
    isOpen,
    onClose,
    currentAddress,
    onConfirm,
    addresses,
}) => {
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(currentAddress);

    const formattedAddresses = addresses.reduce<Address[]>((acc, address) => {
        if (address.isDefault) {
            return [address, ...acc];
        }
        return [...acc, address];
    }, []);

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
        >
            <div className="flex flex-col">
                <div className="py-6 space-x-2 flex items-center">
                    <AddressModalHeader />
                    <div className="w-full max-h-96 overflow-y-auto overflow-x-hidden flex flex-col gap-2">
                        {formattedAddresses.map((address) => (
                            <AddressSelectItem
                                key={address.id}
                                address={address}
                                onSelect={setSelectedAddress}
                                isSelected={selectedAddress?.id === address.id}
                            />
                        ))}
                    </div>
                </div>
                <Button
                    variant="default"
                    onClick={() => {
                        if (selectedAddress) {
                            onConfirm(selectedAddress);
                        }
                        onClose();
                    }}
                    className="ml-auto mt-6 mr-2"
                >
                    Confirm
                </Button>
            </div>
        </Modal>
    );
};
