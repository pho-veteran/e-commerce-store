"use client";

import { useState, useEffect } from "react";

import PreviewModal from "@/components/modals/preview-modal";
import SearchDrawer from "@/components/search-drawer";
import AddressModal from "@/components/modals/address-modal";
import { ConfirmModal } from "@/components/modals/confirm-modal";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <PreviewModal />
            <AddressModal />
            <ConfirmModal />
            <SearchDrawer />
        </>
    );
};

export default ModalProvider;
