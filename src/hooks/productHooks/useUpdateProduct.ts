import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "n@/api/axios";
import { productKeys } from "n@/queryKeyFactory/productKeys";
import { PRODUCT_ROUTES } from "n@/routes/productRoute";
import { Product, UpdateProductPayload } from "n@/types/product";

export const updateProduct = async ({
  id,
  payload,
}: {
  id: number;
  payload: UpdateProductPayload;
}): Promise<Product> => {
  const { data } = await axiosInstance.put<Product>(
    PRODUCT_ROUTES.productById(id),
    payload
  );

  return data;
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      queryClient.invalidateQueries({ queryKey: productKeys.detail(data.id) });
    },
  });
};
