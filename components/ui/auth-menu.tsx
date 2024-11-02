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

const AuthMenu = () => {
    const router = useRouter();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <CircleUserRound size={24} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44">
                <SignedIn>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>History</DropdownMenuItem>
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