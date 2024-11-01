import { create } from "zustand";

interface NavDrawer {
    isOpen: boolean;
    data?: string;
    onOpen: (data: string) => void;
    onClose: () => void;
}

const useNavDrawer = create<NavDrawer>((set) => ({
    isOpen: false,
    data: "",
    onOpen: (data) => set({ isOpen: true, data }),
    onClose: () => set({ isOpen: false }),
}));

export default useNavDrawer;