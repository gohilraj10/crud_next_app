import { GetUsersParams } from "n@/types/user";

export const userKeys = {
  all: ["users"] as const,

  lists: () => [...userKeys.all, "list"] as const,

  list: (params: GetUsersParams) => [...userKeys.lists(), params] as const,

  detail: (id: number) => [...userKeys.all, "detail", id] as const,
};
