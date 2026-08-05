import { useQuery } from "@tanstack/react-query";
import axiosInstance from "n@/api/axios";
import { productKeys } from "n@/queryKeyFactory/productKeys";
import { PRODUCT_ROUTES } from "n@/routes/productRoute";

export const getProductCategories = async (): Promise<string[]> => {
  const { data } = await axiosInstance.get<string[]>(
    PRODUCT_ROUTES.PRODUCT_CATEGORIES
  );

  return data;
};

export const useGetProductCategories = () => {
  return useQuery({
    queryKey: productKeys.categories(),
    queryFn: getProductCategories,
  });
};
