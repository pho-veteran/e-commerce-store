import axios from "axios";
import { useEffect, useState } from "react";
import { Address } from "@prisma/client";
import { MapPin } from "lucide-react";

import { AddressSelectModal } from "./address-select-modal";
import StatusBadge from "@/components/ui/status-badge";
import { useRouter } from "next/navigation";

interface AddressSectionProps {
    loading: boolean;
    setLoading: (loading: boolean) => void;
    selectedAddress: Address | null;
    setSelectedAddress: (address: Address) => void;
}

const AddressSection: React.FC<AddressSectionProps> = ({
    loading,
    setLoading,
    selectedAddress,
    setSelectedAddress,
}) => {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [changeAddressOpen, setChangeAddressOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/addresses`);
                setAddresses(response.data);
                setSelectedAddress(
                    response.data.find((address: Address) => address.isDefault)
                );
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchAddresses();
    }, []);

    return (
        <div>
            {selectedAddress && (
                <AddressSelectModal
                    isOpen={changeAddressOpen}
                    onClose={() => setChangeAddressOpen(false)}
                    currentAddress={selectedAddress}
                    onConfirm={(address) => setSelectedAddress(address)}
                    addresses={addresses}
                />
            )}
            <div className="bg-white w-full rounded-md">
                <div
                    style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, #6fa6d6, #6fa6d6 33px, transparent 0, transparent 41px, #f18d9b 0, #f18d9b 74px, transparent 0, transparent 82px)',
                        backgroundPositionX: '1px',
                        backgroundSize: '116px 3px',
                    }}
                    className="w-full h-1"
                />
                <div className="px-6 py-4">
                    <div className="flex gap-x-2 items-center">
                        <MapPin
                            size={24}
                            className="text-primary-500"
                        />
                        <p className="font-semibold text-lg">Shipping Address</p>
                    </div>
                    <div className="mt-4">
                        {!selectedAddress ? (
                            <div className="flex space-x-2 items-center">
                                <p className="text-sm text-neutral-400">You don&apos;t have any address!</p>
                                <button
                                    onClick={() => router.push("/account/addresses")}
                                    className="text-blue-500 font-semibold text-sm"
                                >Add Address</button>
                            </div>
                        ) : (
                            <div>
                                <div className="flex items-center gap-x-1">
                                    <p className="font-semibold">{selectedAddress.name}</p>
                                    <p className="ml-2 text-sm">{selectedAddress.phone}</p>
                                </div>
                                <div className="flex mt-2 items-center">
                                    <StatusBadge
                                        data={{
                                            label: selectedAddress.type,
                                            className: "bg-green-100 text-green-600"
                                        }}
                                    />
                                    <p
                                        className="text-neutral-400 ml-2 text-sm"
                                    >{`${selectedAddress.streetAddress}, ${selectedAddress.generalAddress}`}</p>
                                </div>
                                <div className="flex mt-4">
                                    <button
                                        onClick={() =>
                                            setChangeAddressOpen(true)
                                        }
                                        className="text-blue-500 font-semibold text-sm"
                                        disabled={loading}
                                    >Change Address</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default AddressSection;