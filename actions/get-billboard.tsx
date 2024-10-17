import { Billboard } from "@/types";

const URL = `${process.env.PUBLIC_STORE_URL}/billboards`;

const getBillboard = async (id: String): Promise<Billboard> => {
    const res = await fetch(`${URL}/${id}`);

    return res.json();
}

export default getBillboard;