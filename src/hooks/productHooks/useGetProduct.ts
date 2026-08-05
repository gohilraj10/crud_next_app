import { useQuery } from "@tanstack/react-query";
import axiosInstance from "n@/api/axios";
import { productKeys } from "n@/queryKeyFactory/productKeys";
import { PRODUCT_ROUTES } from "n@/routes/productRoute";
import { GetProductsParams, ProductsResponse } from "n@/types/product";

export const getProducts = async (
  params: GetProductsParams
): Promise<ProductsResponse> => {
  const endpoint = params.q
    ? PRODUCT_ROUTES.PRODUCT_SEARCH
    : PRODUCT_ROUTES.PRODUCTS;

  const { data } = await axiosInstance.get<ProductsResponse>(endpoint, {
    params,
  });

  return data;
};

export const useGetProduct = (params: GetProductsParams) => {
  return useQuery({
    queryKey: productKeys.list(params),
    queryFn: () => getProducts(params),
  });
};
