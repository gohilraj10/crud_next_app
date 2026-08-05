import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "n@/api/axios";
import { userKeys } from "n@/queryKeyFactory/userKeys";
import { USER_ROUTES } from "n@/routes/userRoute";
import { UpdateUserPayload, User } from "n@/types/user";

export const updateUser = async ({
  id,
  payload,
}: {
  id: number;
  payload: UpdateUserPayload;
}): Promise<User> => {
  const { data } = await axiosInstance.put<User>(
    USER_ROUTES.userById(id),
    payload
  );

  return data;
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.detail(data.id) });
    },
  });
};
