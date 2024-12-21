import { Order } from "@/types";

const URL = `${process.env.PUBLIC_STORE_URL}/orders`;

interface Query {
    orderId: string;
    customerId: string;
}

const getOrder = async (query: Query): Promise<Order> => {
    const res = await fetch(`${URL}/${query.orderId}?customerId=${query.customerId}`);

    return res.json();
}

export default getOrder;