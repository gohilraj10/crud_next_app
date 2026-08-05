import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "n@/api/axios";
import { productKeys } from "n@/queryKeyFactory/productKeys";
import { PRODUCT_ROUTES } from "n@/routes/productRoute";
import { CreateProductPayload, Product } from "n@/types/product";

export const createProduct = async (
  payload: CreateProductPayload
): Promise<Product> => {
  const { data } = await axiosInstance.post<Product>(
    PRODUCT_ROUTES.PRODUCT_ADD,
    payload
  );

  return data;
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
};
