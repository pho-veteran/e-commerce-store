import { Category } from "@/types";

import qs from "query-string"

const URL = `${process.env.PUBLIC_STORE_URL}/categories`;

interface Query {
    name?: string;
}

const getCategories = async (query: Query): Promise<Category[]> => {
    const url = qs.stringifyUrl({
        url: URL,
        query: {
            ...query
        }
    });

    const res = await fetch(url);

    return res.json();
}

export default getCategories;