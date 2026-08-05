import { useQuery } from "@tanstack/react-query";
import axiosInstance from "n@/api/axios";
import { productKeys } from "n@/queryKeyFactory/productKeys";
import { PRODUCT_ROUTES } from "n@/routes/productRoute";
import { Product } from "n@/types/product";

export const getProductById = async (id: number): Promise<Product> => {
  const { data } = await axiosInstance.get<Product>(
    PRODUCT_ROUTES.productById(id)
  );

  return data;
};

export const useGetProductById = (id: number) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => getProductById(id),
    enabled: Number.isFinite(id) && id > 0,
  });
};
