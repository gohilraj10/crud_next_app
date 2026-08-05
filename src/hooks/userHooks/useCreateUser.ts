import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "n@/api/axios";
import { userKeys } from "n@/queryKeyFactory/userKeys";
import { USER_ROUTES } from "n@/routes/userRoute";
import { CreateUserPayload, User } from "n@/types/user";

export const createUser = async (
  payload: CreateUserPayload
): Promise<User> => {
  const { data } = await axiosInstance.post<User>(
    USER_ROUTES.USER_ADD,
    payload
  );

  return data;
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};
