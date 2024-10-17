import { Product } from "@/types";

import qs from "query-string"

const URL = `${process.env.PUBLIC_STORE_URL}/products`;

interface Query {
    categoryId?: string;
    colorId?: string;
    sizeId?: string;
    isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise<Product[]> => {
    const url = qs.stringifyUrl({
        url: URL,
        query: {
            ...query
        }
    });

    const res = await fetch(url);

    return res.json();
}

export default getProducts;