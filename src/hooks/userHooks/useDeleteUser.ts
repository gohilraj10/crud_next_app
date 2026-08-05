import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "n@/api/axios";
import { userKeys } from "n@/queryKeyFactory/userKeys";
import { USER_ROUTES } from "n@/routes/userRoute";
import { DeletedUser } from "n@/types/user";

export const deleteUser = async (id: number): Promise<DeletedUser> => {
  const { data } = await axiosInstance.delete<DeletedUser>(
    USER_ROUTES.userById(id)
  );

  return data;
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};
