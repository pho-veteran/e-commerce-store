import { Category } from "@/types";

const URL = `${process.env.PUBLIC_STORE_URL}/categories`;

const getCategory = async (id: String): Promise<Category> => {
    const res = await fetch(`${URL}/${id}`);

    return res.json();
}

export default getCategory;