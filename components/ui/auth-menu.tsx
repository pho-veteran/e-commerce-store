import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";

import { CircleUserRound, LogOut } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import IconButton from "./icon-button";

const AuthMenu = () => {
    const router = useRouter();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className="hover:scale-110 transition"
                asChild
            >
                <IconButton
                    icon={<CircleUserRound size={24} />}
                    className="border-none shadow-none"
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
                <SignedIn>
                    <DropdownMenuLabel>
                        My Account
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link
                            href="/account"
                        >
                            Account Settings
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link
                            href="/account/addresses"
                        >
                            Addresses
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link
                            href="/account/orders"
                        >
                            Orders History
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <LogOut size={24} />
                        <SignOutButton />
                    </DropdownMenuItem>
                </SignedIn>

                <SignedOut>
                    <DropdownMenuItem
                        onClick={() => {
                            router.push("/sign-in");
                        }}
                    >
                        Sign in
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => {
                            router.push("/sign-up");
                        }}
                    >
                        Sign up
                    </DropdownMenuItem>
                </SignedOut>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default AuthMenu;