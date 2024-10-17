import { Category } from "@/types";

const URL = `${process.env.PUBLIC_STORE_URL}/categories`;

const getCategories = async (): Promise<Category[]> => {
    const res = await fetch(URL);

    return res.json();
}

export default getCategories;