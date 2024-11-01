'use client'
import { useRouter } from "next/navigation";

import useNavDrawer from "@/hooks/use-navbar-drawer";
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle } from "./ui/drawer";
import SearchInput from "@/components/ui/search-input";

const SearchDrawer = () => {
    const router = useRouter();
    const navDrawer = useNavDrawer();
    const searchString = useNavDrawer((state) => state.data);

    const onSubmit = (searchValue: string) => {
        router.push(`/search?name=${encodeURIComponent(searchValue)}`);
        navDrawer.onClose();
    }

    return (
        <Drawer
            open={navDrawer.isOpen}
            onClose={navDrawer.onClose}
            direction="top"
        >
            <DrawerContent>
                <DrawerTitle className="sr-only">
                    Navigation Drawer
                </DrawerTitle>
                <DrawerDescription className="sr-only">
                    Drawer for navigation bar, include search and some more...
                </DrawerDescription>
                <div className="py-6 flex justify-center">
                    <div className="w-[60%] min-w-max">
                        <SearchInput
                            defaultValue={searchString || ""}
                            onSubmit={onSubmit}
                            type="nav"
                        />
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}

export default SearchDrawer;