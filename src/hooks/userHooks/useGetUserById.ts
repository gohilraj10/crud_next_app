import { useQuery } from "@tanstack/react-query";
import axiosInstance from "n@/api/axios";
import { userKeys } from "n@/queryKeyFactory/userKeys";
import { USER_ROUTES } from "n@/routes/userRoute";
import { User } from "n@/types/user";

export const getUserById = async (id: number): Promise<User> => {
  const { data } = await axiosInstance.get<User>(USER_ROUTES.userById(id));

  return data;
};

export const useGetUserById = (id: number | null) => {
  return useQuery({
    queryKey: userKeys.detail(id ?? 0),
    queryFn: () => getUserById(id as number),
    enabled: id !== null && Number.isFinite(id) && id > 0,
  });
};
