export interface Billboard {
    id: string;
    label: string;
    imageUrl: string;
}

export interface Category {
    id: string;
    name: string;
    billboard: Billboard;
}

export interface Product {
    id: string;
    category: Category;
    name: string;
    price: string;
    isFeatured: boolean;
    productSizes: ProductSize[];
    productColors: ProductColor[];
    images: Image[];
}

export interface Image {
    id: string;
    url: string;
}

export interface Size {
    id: string;
    name: string;
    value: string;
}

export interface Color {
    id: string;
    name: string;
    value: string;
}

export interface ProductColor {
    id: string;
    product: Product;
    color: Color;
}

export interface ProductSize {
    id: string;
    product: Product;
    size: Size;
}

export interface OrderItem {
    product: Product;
    color: Color;
    size: Size;
    quantity: number;
}

export interface Province {
    name: string,
    code: Number,
    codename: string,
    division_type: string,
    phone_code: string,
    districts: District[]
}

export interface District {
    name: string,
    code: Number,
    codename: string,
    division_type: string,
    short_codename: string,
    wards: Ward[]
}

export interface Ward {
    name: string,
    code: Number,
    codename: string,
    division_type: string,
    short_codename: string
}

export interface Order {
    id: string;
    storeId: string;
    customerId: string;
    orderItems: OrderItem[];
    orderMessage: string;
    name: string;
    phone: string;
    address: string;
    addressType: string;
    shippingFee: number,
    paymentMethod: string;
    orderStatus: string;
    createdAt: string;
    updatedAt: string;
}

export interface OrderItem {
    product: Product;
    color: Color;
    size: Size;
    quantity: number;
}