import { GetProductsParams } from "n@/types/product";

export const productKeys = {
  all: ["products"] as const,

  lists: () => [...productKeys.all, "list"] as const,

  list: (params: GetProductsParams) =>
    [...productKeys.lists(), params] as const,

  detail: (id: number) =>
    [...productKeys.all, "detail", id] as const,

  categories: () => [...productKeys.all, "categories"] as const,
};