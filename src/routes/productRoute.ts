export const PRODUCT_ROUTES = {
  PRODUCTS: "/products",
  PRODUCT_SEARCH: "/products/search",
  PRODUCT_ADD: "/products/add",
  PRODUCT_CATEGORIES: "/products/category-list",
  productById: (id: number) => `/products/${id}`,
} as const;
