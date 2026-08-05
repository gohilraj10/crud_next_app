import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "n@/api/axios";
import { productKeys } from "n@/queryKeyFactory/productKeys";
import { PRODUCT_ROUTES } from "n@/routes/productRoute";
import { DeletedProduct } from "n@/types/product";

export const deleteProduct = async (id: number): Promise<DeletedProduct> => {
  const { data } = await axiosInstance.delete<DeletedProduct>(
    PRODUCT_ROUTES.productById(id)
  );

  return data;
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
};
