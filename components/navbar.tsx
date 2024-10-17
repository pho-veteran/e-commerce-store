import Link from "next/link";

import MainNav from "@/components/mainnav";
import Container from "@/components/ui/container";
import getCategories from "@/actions/get-categories";
import NavbarActions from "./navbar-actions";


const Navbar = async () => {
    const categories = await getCategories();

    return (
        <div className="border-b">
            <div>
                <Container>
                    <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
                        <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
                            <p className="font-bold text-2xl">STORE</p>
                        </Link>
                        <MainNav data={categories}/>
                        <NavbarActions />
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Navbar;
