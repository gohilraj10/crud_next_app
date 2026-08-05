export const USER_ROUTES = {
  USERS: "/users",
  USER_SEARCH: "/users/search",
  USER_ADD: "/users/add",
  userById: (id: number) => `/users/${id}`,
} as const;
