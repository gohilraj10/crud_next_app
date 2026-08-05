export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  returnPolicy: string;
  minimumOrderQuantity: number;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export type ProductSortField =
  | "title"
  | "category"
  | "brand"
  | "price"
  | "rating"
  | "stock";

export interface GetProductsParams {
  limit: number;
  skip: number;
  q?: string;
  sortBy?: ProductSortField;
  order?: "asc" | "desc";
}

export interface ProductListState {
  page: number;
  limit: number;
  q: string;
  sortBy: ProductSortField;
  order: "asc" | "desc";
}

export interface CreateProductPayload {
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage?: number;
  stock: number;
  brand?: string;
  sku?: string;
  weight?: number;
  thumbnail?: string;
}

export type UpdateProductPayload = Partial<CreateProductPayload>;

export interface ProductFormValues {
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  stock: number;
  brand: string;
  sku: string;
  weight: number;
  thumbnail: string;
}

export interface DeletedProduct extends Product {
  isDeleted: boolean;
  deletedOn: string;
}
