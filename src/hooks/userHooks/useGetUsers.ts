import { useQuery } from "@tanstack/react-query";
import axiosInstance from "n@/api/axios";
import { userKeys } from "n@/queryKeyFactory/userKeys";
import { USER_ROUTES } from "n@/routes/userRoute";
import { GetUsersParams, UsersResponse } from "n@/types/user";

export const getUsers = async (
  params: GetUsersParams
): Promise<UsersResponse> => {
  const endpoint = params.q ? USER_ROUTES.USER_SEARCH : USER_ROUTES.USERS;

  const { data } = await axiosInstance.get<UsersResponse>(endpoint, {
    params,
  });

  return data;
};

export const useGetUsers = (params: GetUsersParams) => {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: () => getUsers(params),
  });
};
