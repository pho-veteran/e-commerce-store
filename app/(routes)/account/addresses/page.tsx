import { auth } from "@clerk/nextjs/server";

import AddAddressButton from "@/components/ui/add-address-button";
import AddressCard from "@/components/ui/address-card";
import { prisma } from "@/lib/prismadb";
import { Address } from "@prisma/client";

const AddressesPage = async () => {
    const { userId } = await auth();
    const addresses = userId ? await prisma.address.findMany({
        where: {
            userId,
        },
    }) : [];

    const formattedAddresses = addresses.reduce<Address[]>((acc, address) => {
        if (address.isDefault) {
            return [address, ...acc];
        }
        return [...acc, address];
    }, []);

    return (
        <div className="w-full">
            <h1 className="text-black font-bold text-3xl">Addresses</h1>
            <div className="my-4 w-full">
                <AddAddressButton />
            </div>
            <div className="space-y-4">
                {formattedAddresses.map((address) => (
                    <AddressCard key={address.id} address={address} />
                ))}
            </div>
        </div>
    );
}

export default AddressesPage;