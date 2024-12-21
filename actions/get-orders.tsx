import { Order } from "@/types";
import qs from "query-string"

const URL = `${process.env.PUBLIC_STORE_URL}/orders`;

interface Query {
    customerId: string;
}

const getOrders = async (query: Query): Promise<Order[]> => {
    const url = qs.stringifyUrl({
        url: URL,
        query: {
            ...query
        }
    });

    const res = await fetch(url);

    return res.json();
}

export default getOrders;