"use client"

import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { MapPinHouse, NotebookText, Settings2 } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const AccountSidebar = () => {
    const pathName = usePathname();
    const router = useRouter();
    const { user } = useUser();

    const routes = [
        {
            href: "/account",
            label: "Account Settings",
            active: pathName === "/account",
            icon: Settings2
        },
        {
            href: "/account/addresses",
            label: "Addresses",
            active: pathName === "/account/addresses",
            icon: MapPinHouse
        },
        {
            href: "/account/orders",
            label: "Orders History",
            active: pathName === "/account/orders",
            icon: NotebookText
        },
    ]
    return (
        <div className="flex lg:block max-w-56 min-w-fit">
            <div className="gap-x-2 items-center w-full hidden lg:flex">
                <Image
                    src={user?.imageUrl || "/default-image.png"}
                    alt={user?.fullName || "User"}
                    width={48}
                    height={48}
                    className="rounded-full"
                />
                <div className="flex-col flex">
                    <h3 className="text-md font-semibold">{user?.fullName}</h3>
                    <p className="text-neutral-500 text-ellipsis overflow-hidden text-sm">{user?.primaryEmailAddress?.emailAddress}</p>
                </div>
            </div>
            <hr className="my-6 hidden lg:block" />
            <nav className="flex lg:block">
                {routes.map((route) => (
                    <button
                        key={route.label}
                        className={cn("flex items-center gap-x-4 w-full text-sm rounded-md bg-transparent font-normal hover:bg-neutral-200 px-5 py-3", 
                            route.active ? "text-black bg-neutral-200" : "text-neutral-500"
                        )}
                        onClick={() => router.push(route.href)}
                    >
                        <route.icon size={22} />
                        <span>{route.label}</span>
                    </button>
                ))}
            </nav>

        </div>
    );
}

export default AccountSidebar;