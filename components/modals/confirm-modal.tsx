"use client";

import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import useConfirmModal from "@/hooks/use-confirm-modal";

export const ConfirmModal: React.FC = () => {
    const confirmModal = useConfirmModal();

    return (
        <Modal
            open={confirmModal.isOpen}
            onClose={confirmModal.onClose}
            className="block"
        >
            <div>
                <h3 className="text-lg font-semibold">Are you sure?</h3>
                <p className="text-gray-500 mt-2">
                    This action cannot be undone.
                </p>
            </div>
            <div className="pt-6 space-x-2 flex items-center justify-end">
                <Button disabled={confirmModal.loading} variant="outline" onClick={confirmModal.onClose}>
                    Cancel
                </Button>
                <Button disabled={confirmModal.loading} onClick={confirmModal.onConfirm} variant={"destructive"}>
                    Confirm
                </Button>
            </div>
        </Modal>
    );
};
