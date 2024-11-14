import axios from "axios";
import qs from "query-string"

const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/shipping-fee`;

interface Query {
    pick_address_id?: number;
    pick_province?: string;
    pick_district?: string;
    pick_ward?: string;
    province: string;
    district: string;
    ward?: string;
    weight?: number;
}

const initialData: Partial<Query> = {
    pick_address_id: 18281008,
    pick_province: "Đà Nẵng",
    pick_district: "Quận Ngũ Hành Sơn",
    pick_ward: "Phường Hòa Quý",
    weight: 500
}

const getShippingFee = async (query: Query) => {
    const mergedQuery = {
        ...initialData,
        ...query
    }

    const url = qs.stringifyUrl({
        url: URL,
        query: mergedQuery
    });

    const res = await axios.get(url);

    return res.data;
}

export default getShippingFee;