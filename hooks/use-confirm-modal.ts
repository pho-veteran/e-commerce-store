import { create } from "zustand";

interface ConfirmModalStore {
    isOpen: boolean;
    loading: boolean;
    onConfirm: () => void;
    onClose: () => void;
    onOpen: (onConfirm: () => void) => void;
    setLoading: (loading: boolean) => void;
}

const useConfirmModal = create<ConfirmModalStore>((set) => ({
    isOpen: false,
    loading: false,
    onConfirm: () => {},
    onClose: () => {
        set({ isOpen: false });
    },
    onOpen: (onConfirm) => {
        set({ isOpen: true, onConfirm });
    },
    setLoading: (loading) => {
        set({ loading });
    },
}));

export default useConfirmModal;