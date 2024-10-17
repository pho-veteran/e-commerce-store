import { Product } from "@/types";

const URL = `${process.env.PUBLIC_STORE_URL}/products`;

const getProduct = async (id: String): Promise<Product> => {
    const res = await fetch(`${URL}/${id}`);

    return res.json();
}

export default getProduct;