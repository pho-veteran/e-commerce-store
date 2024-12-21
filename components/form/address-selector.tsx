"use client"

import axios from "axios";
import { forwardRef, useEffect, useState } from "react";

import { District, Province, Ward } from "@/types";
import SearchableSelector from "@/components/ui/searchable-selector";

interface AddressSelectorProps {
    defaultValue?: string;
    onValueChange: (value: string) => void;
    loading: boolean;
}

const AddressSelector = forwardRef<HTMLButtonElement, AddressSelectorProps>(({
    defaultValue,
    onValueChange,
    loading,
    ...props
}, ref) => {
    const [defaultWard, defaultDistrict, defaultProvince] = (defaultValue?.split(", ") ?? ["", "", ""]);

    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);

    const [province, setProvince] = useState<string>(defaultProvince);
    const [district, setDistrict] = useState<string>(defaultDistrict);
    const [ward, setWard] = useState<string>(defaultWard);

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const res = await axios.get("/api/provinces");
                setProvinces(res.data);
            } catch (error) {
                console.error("Failed to fetch provinces:", error);
            }
        };
        fetchProvinces();
    }, [])

    useEffect(() => {
        if (defaultProvince) {
            const currentProvince = provinces.find((p) => p.name === defaultProvince);
            if (currentProvince) {
                setDistricts(currentProvince.districts);
            }

            if (defaultDistrict) {
                const currentDistrict = currentProvince?.districts.find((d) => d.name === defaultDistrict);
                if (currentDistrict) {
                    setWards(currentDistrict.wards);
                }
            }
        }
    }, [defaultProvince, defaultDistrict, provinces]);

    return (
        <div className="grid sm:grid-cols-3 w-full gap-4">
            {/* Province Selector */}
            <SearchableSelector
                options={provinces.map((province) => province.name)}
                onValueChange={(e) => {
                    setProvince(e);
                    setDistricts(provinces.find((p) => p.name === e)?.districts ?? []);
                    setWards([]);
                    setDistrict("");
                    setWard("");
                }}
                defaultValue={defaultProvince}
                placeholder="Select a province"
                disabled={loading}
                value={province}
                ref={ref}
                {...props}
            />
            {/* District Selector */}
            <SearchableSelector
                options={districts.map((district) => district.name)}
                onValueChange={(e) => {
                    setDistrict(e);
                    setWards(districts.find((d) => d.name === e)?.wards ?? []);
                    setWard("");
                    onValueChange([e, province].join(", "));
                }}
                defaultValue={defaultDistrict}
                placeholder="Select a district"
                disabled={loading || !province}
                value={district}
                ref={ref}
                {...props}
            />
            {/* Ward Selector */}
            <SearchableSelector
                options={wards.map((ward) => ward.name)}
                onValueChange={(e) => {
                    setWard(e);
                    onValueChange([e, district, province].join(", "));
                }}
                defaultValue={defaultWard}
                placeholder="Select a ward"
                disabled={loading || !district}
                value={ward}
                ref={ref}
                {...props}
            />
        </div>
    );
});

AddressSelector.displayName = "AddressSelector";

export default AddressSelector;