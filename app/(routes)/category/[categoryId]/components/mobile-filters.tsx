"use client";
import { useState } from "react";

import { Plus, X } from "lucide-react";
import { Dialog, DialogPanel } from "@headlessui/react";

import { Size, Color } from "@/types";
import { Button } from "@/components/ui/button";
import IconButton from "@/components/ui/icon-button";
import Filter from "./variant-filter";
import PriceFilter from "./price-filter";
import NameFilter from "./name-filter";

interface MobileFiltersProps {
    sizes: Size[];
    colors: Color[];
}

const MobileFilters: React.FC<MobileFiltersProps> = ({ sizes, colors }) => {
    const [open, setOpen] = useState(false);

    const onOpen = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button
                className="flex items-center gap-x-2 lg:hidden text-base h-12"
                onClick={onOpen}
            >
                Filters
                <Plus size={20} />
            </Button>

            <Dialog
                open={open}
                onClose={onClose}
                as="div"
                className="relative z-40 lg:hidden"
            >
                <div className="fixed inset-0 bg-black bg-opacity-25" />

                <div className="fixed inset-0 z-40 flex">
                    <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                        <div className="flex items-center justify-end px-4">
                            <IconButton
                                onClick={onClose}
                                icon={<X size={20} />}
                            />
                        </div>
                        <div className="p-4">
                            <NameFilter />
                            <Filter
                                valueKey="sizeId"
                                name="Sizes"
                                data={sizes}
                            />
                            <Filter
                                valueKey="colorId"
                                name="Colors"
                                data={colors}
                            />
                            <PriceFilter />
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
};

export default MobileFilters;
