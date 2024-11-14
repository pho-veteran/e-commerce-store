import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const CheckoutHeader = () => {
    return (
        <div className="border-b">
            <div>
                <Container>
                    <div className="relative px-4 sm:px-6 lg:px-8 flex h-20 items-center gap-x-4 py-4">
                        <Link href="/">
                            <p className="font-bold text-2xl">VSTORE</p>
                        </Link>
                        <Separator
                            orientation="vertical"
                            className="h-8"
                        />
                        <p className="font-semibold text-xl">Checkout</p>
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default CheckoutHeader;