import { create } from "zustand";

import { Address } from "@prisma/client";

interface AddressModalStore {
    isOpen: boolean;
    data?: Address;
    onOpen: (data?: Address) => void;
    onClose: () => void;
}

const useAddressModal = create<AddressModalStore>((set) => ({
    isOpen: false,
    data: undefined,
    onOpen: (data?: Address) => set({ isOpen: true, data }),
    onClose: () => set({ isOpen: false }),
}));

export default useAddressModal;