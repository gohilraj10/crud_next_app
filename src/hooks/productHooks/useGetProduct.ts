import { useQuery } from "@tanstack/react-query";
import axiosInstance from "n@/api/axios";
import { productKeys } from "n@/queryKeyFactory/productKeys";
import { PRODUCT_ROUTES } from "n@/routes/productRoute";
import { ProductsResponse } from "n@/types/product";

export const getProducts = async (): Promise<ProductsResponse> => {
  const { data } = await axiosInstance.get<ProductsResponse>(
    PRODUCT_ROUTES.PRODUCTS
  );

  return data;
};

export const useGetProduct = () => {
  return useQuery({
    queryKey: productKeys.lists(),
    queryFn: () => getProducts(),
  });
};