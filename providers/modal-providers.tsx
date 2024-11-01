"use client";

import { useState, useEffect } from "react";

import PreviewModal from "@/components/preview-modal";
import SearchDrawer from "@/components/search-drawer";

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
            <SearchDrawer />
        </>
    );
};

export default ModalProvider;
