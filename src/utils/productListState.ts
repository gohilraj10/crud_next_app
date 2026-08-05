import {
  GetProductsParams,
  ProductListState,
  ProductSortField,
} from "n@/types/product";

export const DEFAULT_PRODUCT_LIST_STATE: ProductListState = {
  page: 1,
  limit: 10,
  q: "",
  sortBy: "title",
  order: "asc",
};

const SORT_FIELDS: ProductSortField[] = [
  "title",
  "category",
  "brand",
  "price",
  "rating",
  "stock",
];

const isSortField = (value: string): value is ProductSortField =>
  SORT_FIELDS.includes(value as ProductSortField);

export const parseProductListState = (
  searchParams: URLSearchParams
): ProductListState => {
  const page = Math.max(1, Number(searchParams.get("page") ?? 1) || 1);
  const limit = Math.max(1, Number(searchParams.get("limit") ?? 10) || 10);
  const q = searchParams.get("q") ?? "";
  const sortByParam = searchParams.get("sortBy") ?? DEFAULT_PRODUCT_LIST_STATE.sortBy;
  const sortBy = isSortField(sortByParam)
    ? sortByParam
    : DEFAULT_PRODUCT_LIST_STATE.sortBy;
  const orderParam = searchParams.get("order");
  const order = orderParam === "desc" ? "desc" : "asc";

  return { page, limit, q, sortBy, order };
};

export const buildProductListQueryString = (
  state: ProductListState
): string => {
  const params = new URLSearchParams();

  if (state.page > 1) {
    params.set("page", String(state.page));
  }

  if (state.limit !== DEFAULT_PRODUCT_LIST_STATE.limit) {
    params.set("limit", String(state.limit));
  }

  if (state.q) {
    params.set("q", state.q);
  }

  if (state.sortBy !== DEFAULT_PRODUCT_LIST_STATE.sortBy) {
    params.set("sortBy", state.sortBy);
  }

  if (state.order !== DEFAULT_PRODUCT_LIST_STATE.order) {
    params.set("order", state.order);
  }

  return params.toString();
};

export const buildProductsListPath = (state: ProductListState): string => {
  const query = buildProductListQueryString(state);
  return query ? `/products?${query}` : "/products";
};

export const productListStateToApiParams = (
  state: ProductListState
): GetProductsParams => {
  const params: GetProductsParams = {
    limit: state.limit,
    skip: (state.page - 1) * state.limit,
    sortBy: state.sortBy,
    order: state.order,
  };

  if (state.q.trim()) {
    params.q = state.q.trim();
  }

  return params;
};
