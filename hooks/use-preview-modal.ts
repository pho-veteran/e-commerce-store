import { create } from "zustand";

import { Product } from "@/types";

interface PreviewModalStore {
    isOpen: boolean;
    data?: Product;
    backendUrl?: string;
    onOpen: (data: Product, backendUrl: string) => void;
    onClose: () => void;
}

const usePreviewModal = create<PreviewModalStore>((set) => ({
    isOpen: false,
    data: undefined,
    backendUrl: undefined,
    onOpen: (data : Product, backendUrl: string) => set({ isOpen: true, data, backendUrl }),
    onClose: () => set({ isOpen: false }),
}));

export default usePreviewModal;